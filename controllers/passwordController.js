/*******************************************비밀번호 변경 페이지 렌더링***********************/
/**
 * 비밀번호 변경 페이지 렌더링 (GET)
 */
const renderChangePasswordPage = (req, res) => {
    res.render('password/changePassword');
};

/****************************************************************************************/

module.exports = { 
    renderChangePasswordPage 
};