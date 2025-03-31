const passwordService = require("../services/passwordService");
const { asyncWrapper } = require("../utils/asyncHandler");
const sessionUtils= require("../utils/sessionUtils");
const {requestPasswordReset} = require("../services/passwordService");


/*******************************************비밀번호 변경 페이지 렌더링***********************/
/**
 * 비밀번호 변경 페이지 렌더링 (GET)
 */
const renderChangePasswordPage = (req, res) => {
    res.render('password/changePassword');
};

/****************************************************************************************/

/*******************************************비밀번호 변경*********************************/
/**
 * 비밀번호 변경 (POST)
 */
const changePassword  = asyncWrapper(async(req, res) => {

    const user = sessionUtils.getUserSession(req); // 세션에서 사용자 정보 가져오기

    console.log('user', user);

    console.log('user.id', user.id);


    // 비밀번호 업데이트 실행 (서비스 호출)
    await passwordService.updatePassword(user.id, req.body.newPassword);

    res.redirect('/dashboard');
});

/****************************************************************************************/

/*******************************************비밀번호 찾기 페이지 렌더링***********************/
/**
 * 비밀번호 찾기 페이지 렌더링 (GET)
 */
const renderForgotPasswordPage = (req, res) => {
    res.render('password/forgotPassword');
};

/****************************************************************************************/

/*******************************************비밀번호 재설정 이메일 전송********************/
/**
 * 비밀번호 변경 (POST)
 */
const sendResetEmail = asyncWrapper(async(req, res) => {
    console.log('✅ sendResetEmail / req.body:', req.body);

    const identifier = req.body.username;

    console.log('✅ sendResetEmail / identifier:', identifier);
    
    await requestPasswordReset(identifier);

    res.status(200).json({message : '비밀번호 재설정 이메일이 전송되었습니다'});
});

/****************************************************************************************/



module.exports = { 
    renderChangePasswordPage,
    changePassword,
    renderForgotPasswordPage,
    sendResetEmail
};