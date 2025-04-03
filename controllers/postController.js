const postService = require('../services/postService');
const {asyncWrapper} = require('../utils/asyncHandler');

/**
 * 게시글 작성 페이지 렌더링
 * @route GET /posts/new (UI)
 */

const renderNewPost = (req, res) => {
    console.log('renderNewPost / req.user', req.user);
    res.render('posts/new');
};

/**
 * 게시글 작성 컨트롤러
 * @route POST /posts (API)
 */

const createPost = asyncWrapper(async(req, res) => {
    console.log("📌 현재 로그인한 사용자:", req.user); // Debugging

    // if(!req.user) {
    //     return res.status(401).json({error : '로그인이 필요합니다'});
    // }

    const { title, content } = req.body;

    const post = await postService.createPost({
        title,
        content,
        author : req.user._id
    });

    console.log(`✅ 게시글 작성 성공: ${post.title}`);

    res.redirect("/posts"); // 게시글 목록으로 리다이렉트
});

/**
 * 게시글 목록 페이지 렌더링
 */
const renderPostList = (req, res) => {
    res.render('posts/index')
};

/**
 * 전체 게시글 목록 조회 컨트롤러
 * AJAX 요청을 받아 게시글을 JSON 형태로 응답
 * 정렬 옵션을 쿼리 스트링에서 받아서 처리
 */
const getAllPosts = asyncWrapper(async(req, res) => {
    const sortBy = req.query.sortBy || 'latest'; // 기본 정렬 : 최신순
    const posts = await postService.getAllPosts(sortBy);
    res.json({success : true, posts}); // JSON 형식으로 응답
});


module.exports = {
    createPost,
    renderNewPost,
    renderPostList,
    getAllPosts
};