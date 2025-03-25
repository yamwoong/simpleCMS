/**
 * 대시보드 페이지 렌더링
 * - 로그인한 사용자만 접근 가능
 */
const renderDashboard = (req, res) => {
    res.render('dashboard');
};

module.exports = {
    renderDashboard
};