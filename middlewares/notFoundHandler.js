// 404 에러 핸들러
const notFoundHandler = (req, res, next) => {
    res.status(404).render('errors/404', {url : req.originalUrl});
};

module.exports = notFoundHandler;