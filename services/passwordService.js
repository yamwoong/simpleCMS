const User = require('../models/User');
const hashUtils = require('../utils/hashUtils');
const {sendemail} = require('./emailService');
const {asyncWrapper} = require('../utils/asyncHandler');
const { generateResetTokenForUser } = require("../utils/tokenUtils");

/**
 * 비밀번호 변경 함수
 * @param {string} userId - 사용자 ID
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise<object>} - 변경 결과
 */

const updatePassword = asyncWrapper(async(userId, newPassword) => {
    
    // 유저 존재 여부 확인 후 업데이트 진행
    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        {password : newPassword},
        {new : true} // 변경된 문서 반환환
    );

    if(!updatedUser) throw new Error('사용자 정보를 찾을 수 없습니다');

    return {
        success : true,
        message : `${updatedUser.username}님의 비밀번호가 성공적으로 변경되었습니다.` };
});

/**
 * 비밀번호 재설정 요청 (이메일 전송)
 * @param {string} identifier - 사용자 입력 (이메일 또는 아이디)
 * @returns {Promise<object>} - 성공 메시지
 */
const requestPasswordReset = asyncWrapper(async(identifier) => {
    // 사용자 조회 (이메일 또는 아이디 기반 검색)
    const user = await User.findOne({
        $or : [{email : identifier}, {username : identifier}]
    });

    if(!user) throw new Error('존재하지 않는 계정입니다');

    // 비밀번호 재설정 토큰 생성 & 사용자 객체에 저장
    const resetToken = generateResetTokenForUser(user);
    await user.save();

    // 비밀번호 재설정 이메일 전송
    await sendResetEmail(user.email, resetToken);

    return { success: true, message: "비밀번호 재설정 링크를 이메일로 보냈습니다." };
})

module.exports = {
    updatePassword,
    requestPasswordReset
};