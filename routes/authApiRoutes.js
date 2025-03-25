const express = require('express');
const authController = require('../controllers/authController');

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


module.exports = router;