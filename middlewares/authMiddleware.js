const passport = require('passport');

/**
 * 로그인 확인 미들웨어
 * 
 * 로그인된 사용자만 특정 페이지에 접근할 수 있도록 제한하는 역할
 * 로그인하지 않은 사용자는 로그인 페이지로 리디렉트
 * 대시보드등 인증이 필요한 페이지에서 사용 
 */

const requireAuth = (req, res, next) => {
    // 세션에 'user' 정보가 있는지 확인 (로그인 여부 체크)
    if(!req.isAuthenticated()){
        return res.redirect("/login"); // 로그인하지 않은 경우 → 로그인 페이지로 이동
    }

    next();
};

/**
 * Google 로그인 인증 미들웨어
 */
const googleAuthMiddleware = passport.authenticate("google", { failureRedirect: "/login" });


module.exports = {
    requireAuth,
    googleAuthMiddleware
};