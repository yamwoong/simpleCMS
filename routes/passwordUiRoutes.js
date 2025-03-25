const express = require('express');
const passwordController = require('../controllers/passwordController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 비밀번호 변경 페이지 (로그인한 사용자만 접근 가능)
router.get('/change-password', authMiddleware.requireAuth, passwordController.renderChangePasswordPage);

// 비밀번호 찾기 페이지 (사용자가 아이디 입력)
// router.get("/forgot-password", passwordController.renderForgotPasswordPage);

// 비밀번호 재설정 페이지 (토큰을 포함한 URL)
// router.get('/reset-password/:token', passwordController.renderResetPasswordPage);

module.exports = router;