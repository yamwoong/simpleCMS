const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireAuth } = require('../middlewares/authMiddleware'); // 로그인 체크

// 게시글 CRUD API
/**************************************게시글 작성************************************/
router.post('/', requireAuth, postController.createPost);

/************************************************************************************/

/**************************************특정 게시글 조회*******************************/
// router.get('/:id', postController.getPostById);
/***********************************************************************************/

/**************************************게시글 수정************************************/
// router.put('/:id', requireAuth, postController.updatePost);
/************************************************************************************/

/**************************************게시글 삭제************************************/
// router.delete('/:id', requireAuth, postController.deletePost);
/************************************************************************************/

module.exports = router;