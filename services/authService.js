const User = require('../models/User');
const hashUtils = require('../utils/hashUtils');
const {asyncWrapper} = require('../utils/asyncHandler');
const sessionUtils  = require("../utils/sessionUtils");


/**
 * 회원가입 서비스
 * @param {Object} userData - 가입할 사용자 정보 (username, email, password)
 * @returns {Promise<Object>} - 저장된 사용자 정보 반환환
 */

const registerUser = asyncWrapper(async({username, email, password}) => {
    // 이메일 중복 체크
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error('이미 가입된 이메일입니다');

    // 비밀번호 저장 (Mongoose `pre('save')` 훅에서 자동 해쉬)
    const newUser = new User({
                                username,
                                email,
                                password,
                                authProvider: 'local' // 로컬 회원가입 유저로 명시
                            });

    await newUser.save();
    console.log(`회원가입 성공: ${username} (${email})`); // 로그 추가

    return newUser;
});

/**
 * 로그인 서비스
 * @param {string} identifier - 사용자 입력 (이메일 또는 사용자명)
 * @param {string} password - 사용자가 입력한 비밀번호
 * @return {Promise<Object} - 인증된 사용자 정보 반환
 */

const authenticateUser = asyncWrapper(async(identifier, password) => {
    // 이메일 또는 사용자명으로 사용자 조회 (비밀번호 포함)
    const user = await User.findOne({
        $or : [{email : identifier}, {username : identifier}] // 이메일 or 사용자명 체크
    }).select('+password'); // 비밀번호 필드 포함

    if(!user) {
        console.warn(`⚠️ 로그인 실패 (사용자 없음): ${identifier}`);
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다');
    };

    // 비밀번호 검증
    const isMatch = await hashUtils.verifyPassword(user.password, password);
    if(!isMatch) {
        console.warn(`⚠️ 로그인 실패 (비밀번호 불일치): ${identifier}`);
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다');
    }


    console.log(`✅ 로그인 성공: ${user.username} (${user.email}) (${user.authProvider})`); // 로그 추가

    return {
        id : user._id,
        username : user.username,
        email : user.email
    }; // 사용자 정보만 반환 (비밀번호 제외외)
});

/**
 * 🔒 사용자 로그아웃 서비스
 * @param {Object} req - Express 요청 객체
 * @returns {Promise<void>} - 세션 삭제 처리
 */
const logoutUser = async(req) => {
    console.log('req', req);
    await sessionUtils.clearUserSession(req);
}



module.exports = {
    registerUser,
    authenticateUser,
    logoutUser 
};