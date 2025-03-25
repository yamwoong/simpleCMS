const express = require('express');
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

/**************************************대시보드 페이지************************************/
router.get('/dashboard', dashboardController.renderDashboard); // 회원가입 페이지 렌더링
/****************************************************************************************/

module.exports = router;