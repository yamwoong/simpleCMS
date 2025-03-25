const authService = require('../services/authService');
const { asyncWrapper, asyncHandler } = require("../utils/asyncHandler");
const sessionUtils = require('../utils/sessionUtils');

/*******************************************회원가입 페이지 렌더링*************************/
/**
 * 회원가입 페이지 렌더링 (GET)
 */
const renderRegisterPage = (req, res) => {
    res.render('auth/register');
};

/****************************************************************************************/


/*******************************************회원가입 처리*********************************/
/**
 * 회원가입 처리 (POST)
 */

const registerUser = asyncWrapper(async(req, res) => {
    console.log('req.body', req.body);
    const {username, email, password} = req.body;

    await authService.registerUser({username, email, password});

    // 성공 메시지를 세션에 저장 → `globalVars.js`에서 `res.locals.success`로 자동 관리됨
    req.session.success = "회원가입이 완료되었습니다! 로그인해주세요.";

    res.redirect('/login');
})

/****************************************************************************************/

/*******************************************로그인  페이지 렌더링*************************/
/**
 * 로그인 페이지 렌더링 (GET)
 */
const renderLoginPage = (req, res) => {
    res.render('auth/login');
};

/****************************************************************************************/

/*******************************************로그인 처리**********************************/
/**
 * 로그인 처리 (POST)
 */
const loginUser = asyncWrapper(async(req, res) => {
    const {identifier, password} = req.body; // 사용자 입력

    const user = await authService.authenticateUser(identifier, password); // 서비스 호출

    // 로그인 성공 시 세션에 사용자 정보 저장
    sessionUtils.setUserSession(req, user);

    res.redirect('/dashboard')
});

/****************************************************************************************/

/*******************************************로그아웃 처리*********************************/
/**
 * 로그인 아웃 (POST)
 */
const logoutUser = asyncHandler(async(req, res) => {
    await authService.logoutUser(req);
    res.redirect('/login');
});

/****************************************************************************************/


module.exports = {
    renderRegisterPage,
    registerUser,
    renderLoginPage,
    loginUser,
    logoutUser
}