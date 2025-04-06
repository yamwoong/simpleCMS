const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireAuth } = require('../middlewares/authMiddleware'); 

// 게시글 UI Page
/**************************************전체 게시글 목록 페이지*************************/
router.get('/posts', postController.renderPostList);
/************************************************************************************/

/**************************************새 글 작성 페이지******************************/
router.get('/posts/new', requireAuth, postController.renderNewPost);
/************************************************************************************/

/**************************************개별 게시글 상세 페이지*************************/
router.get('/posts/:id', postController.getPostDetail);
/************************************************************************************/

/**************************************수정 페이지************************************/
// router.get('/:id/edit', requireAuth, postController.renderEditPost);
/************************************************************************************/

module.exports = router;