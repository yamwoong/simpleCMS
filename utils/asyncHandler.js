// 유틸 함수용 (비밀번호 해싱, DB 조회등)
const asyncWrapper = (fn) => async(...args) => {
    try {
        return await fn(...args);
    } catch(err) {
        console.error('에러 발생 : ', err);
        throw new Error(err.message || '알 수 없는 에러가 발생했습니다');
    }
};

// Express 컨트롤러용 (req, res, next 사용)
const asyncHandler = (fn) => async(req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    asyncWrapper,
    asyncHandler
}