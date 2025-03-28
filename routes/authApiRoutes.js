const express = require('express');
const passport = require("passport"); // ✅ passport 추가
const authController = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");



const router = express.Router();


/**************************************회원가입 API**************************************/
router.post('/register', authController.registerUser); // 회원가입
/****************************************************************************************/

/**************************************로그인 API**************************************/
router.post('/login', authController.loginUser); // 로그인
/****************************************************************************************/

/**************************************로그아웃 API**************************************/
router.post('/logout', authController.logoutUser); // 로그아웃
/****************************************************************************************/

/**************************************Google 로그인 콜백*********************************/
router.get('/google/callback', authMiddleware.googleAuthMiddleware, authController.googleAuthCallback );
/****************************************************************************************/


module.exports = router;