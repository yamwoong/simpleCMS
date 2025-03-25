const util = require("util");
/**
 * 로그인 시 세션에 사용자 정보 저장
 * @param {Object} req - Express 요청 객체
 * @param {Object} user - 사용자 정보 객체
 */
const setUserSession = (req, user) => {
    req.session.user = {
        id : user.id,
        username : user.username,
        email : user.email
    };
};

/**
 * 세션에서 사용자 정보 가져오기
 * @param {Object} req - Express 요청 객체
 * @param {Object || null} - 사용자 정보 (없으면 null)
 */

const getUserSession = (req) => {
    return req.session.user || null;
};

/**
 * 사용자 세션 삭제 유틸 (비동기 방식)
 * @param {Object} req - Express 요청 객체
 * @returns {Promise<void>} - 세션 삭제 처리
 */

const clearUserSession = async (req) => {
    const destroySession = util.promisify(req.session.destroy).bind(req.session);

    try {
        await destroySession();
    } catch(err) {
        console.error("세션 삭제 실패:", err);
        throw new Error("세션 삭제 중 오류가 발생했습니다.");
    }
};

module.exports = {
    setUserSession,
    getUserSession,
    clearUserSession
}