// 글로벌 에러 핸들러 (모든 오류를 처리)
const errorHandler = (err, req, res, next) => {
    console.log('서버 오류 발생', err);

    res.status(err.status || 500).render('errors/500', {
        message : err.message || '서버 내부 오류',
        stack : process.env.NODE_ENV === 'development' ? err.stack :null
    });
};

module.exports = errorHandler;