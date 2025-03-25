const sessionUtils= require("../utils/sessionUtils"); // 올바르게 불러오기


/**
 * 전역 변수 미들웨어
 * 모든 EJS 템플릿에서 `user` 변수를 사용할 수 있도록 설정하는 미들웨어
 * - 로그인 여부에 따라 `res.locals.user` 값이 자동으로 설정됨
 * - 모든 EJS 템플릿에서 `user` 변수를 사용할 수 있음
 * - `navbar.ejs` 같은 곳에서 `if (user)` 조건문 사용 가능
 * @param {Object} req - Express 요청 객체 (세션 정보 포함)
 * @param {Object} res - Express 응답 객체 (`res.locals` 설정 가능)
 * @param {Function} next - 다음 미들웨어로 이동
 */

const globalVars = (req, res, next) => {
    // ✅ 로그인된 사용자 정보 전역 변수 설정
    res.locals.user = sessionUtils.getUserSession(req); // 세션에서 사용자 정보 가져오기

    // 모든 페이지에서 `error` 기본값을 null로 설정
    res.locals.error = null;

    // 성공 메시지를 한 번만 표시하도록 설정정
    res.locals.success = req.session.success || null; 
    delete req.session.success; // 메시지 한 번 표시 후 삭제
    
    next();
};

module.exports = globalVars;