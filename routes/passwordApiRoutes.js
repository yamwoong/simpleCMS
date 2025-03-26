const express = require('express');
const passwordController = require('../controllers/passwordController');
const authMiddleware = require('../middlewares/authMiddleware');
const validatePasswordChange = require("../middlewares/validatePasswordChange");


const router = express.Router();

// 비밀번호 변경 (로그인한 사용자만 접근 가능)
router.post('/change-password', authMiddleware.requireAuth, validatePasswordChange.validatePasswordChange, passwordController.changePassword);

// 비밀번호 찾기 요청 (이메일로 비밀번호 재설정 링크 전송)
// router.post("/forgot-password", passwordController.forgotPassword);

// 비밀번호 재설정 (토큰 검증 후 새 비밀번호 저장)
// router.post('/reset-password', passwordController.resetPassword);

module.exports = router;