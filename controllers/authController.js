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

    try {
        const user = await authService.authenticateUser(identifier, password); // 서비스 호출

        // 로그인 성공 시 세션에 사용자 정보 저장
        sessionUtils.setUserSession(req, user);

        res.redirect('/dashboard');
    } catch(err) {
        // 5️⃣ 로그인 실패 시 다시 로그인 페이지로 (에러 메시지 포함)
        return res.status(400).render("auth/login", {
            error: err.message || "❌ 로그인에 실패했습니다. 다시 시도해주세요."
        });
    }

    
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

/*****************************Google OAuth 로그인 성공 후 처리****************************/
/**
 * ✅ Google OAuth 로그인 성공 후 처리
 * @route GET /auth/google/callback
 */
const googleAuthCallback = (req, res) => {
    try {
        console.log("✅ [Google 로그인 성공]:", req.user);

        // 🔹 세션 저장
        sessionUtils.setUserSession(req, req.user);

        // ✅ 세션 값 확인 (콘솔 출력)
        console.log("🔍 [세션 데이터]:", req.session.user);

        res.redirect('/dashboard');
    } catch(err) {
        console.error("❌ [Google 로그인 콜백 오류]:", err);
        res.status(500).render("auth/login", { error: "로그인 처리 중 오류가 발생했습니다." });
    }
};

/****************************************************************************************/



module.exports = {
    renderRegisterPage,
    registerUser,
    renderLoginPage,
    loginUser,
    logoutUser,
    googleAuthCallback
}