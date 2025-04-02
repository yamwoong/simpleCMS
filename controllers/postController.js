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

    res.status(201).json({ message: '게시글이 등록되었습니다.', post });
});

module.exports = {
    createPost,
    renderNewPost
};