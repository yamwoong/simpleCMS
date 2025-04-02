/**
 * 전역 변수 미들웨어
 * 
 * 모든 EJS 템플릿에서 `user` 변수를 사용할 수 있도록 설정하는 미들웨어.
 * Passport를 사용하여 `req.user`를 자동으로 `res.locals.user`에 저장하여 
 * 템플릿에서 사용자 정보를 쉽게 접근할 수 있도록 함.
 * @param {Object} req - Express 요청 객체 (`req.user` 포함)
 * @param {Object} res - Express 응답 객체 (`res.locals` 설정 가능)
 * @param {Function} next - 다음 미들웨어로 이동
 */

const globalVars = (req, res, next) => {
    // 현재 로그인된 사용자의 정보를 전역 변수로 설정
    // Passport가 자동으로 세션에서 `req.user`를 채우므로 바로 사용 가능
    res.locals.user = req.user || null;

    // 기본적으로 오류 메시지를 표시하지 않도록 설정
    res.locals.error = null;

    // 성공 메시지가 있으면 가져오고, 한 번 표시 후 삭제
    res.locals.success = req.session.success || null; 
    delete req.session.success; // 메시지 한 번 표시 후 삭제
    
    next();
};

module.exports = globalVars;