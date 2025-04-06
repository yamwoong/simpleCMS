const postService = require('../services/postService');
const {asyncWrapper} = require('../utils/asyncHandler');

/**
 * 게시글 작성 페이지 렌더링
 * @route GET /posts/new (UI)
 */

const renderNewPost = (req, res) => {
    const isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';

    console.log(`📝 글쓰기 폼 요청 - AJAX 여부: ${isAjax}`);
    
    if (isAjax) {
        // AJAX 요청이면 partial만 렌더링
        return res.render('posts/_newForm', { user: req.user });
    }

    // 일반 요청이면 전체 페이지 렌더링
    res.render('posts/new', { user: req.user });
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

    const isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest'; 
    console.log("📦 요청 수신, isAjax:", isAjax);

    if (isAjax) {
        console.log("📦 AJAX 요청 → 부분 렌더링");
        // AJAX 요청인 경우 → 부분 뷰만 렌더링
        return res.render('posts/_list', { posts });
    }

    console.log("🌐 일반 요청 → 전체 페이지 렌더링");
    // 일반 요청인 경우 → 전체 페이지 렌더링
    res.render('posts/index', { posts });
});

/**
 * 게시글 상세 조회 컨트롤러 (조회수 증가)
 */

const getPostById = asyncWrapper(async(req, res) => {
    const {id} = req.params;
    const post = await postService.getPostById(id);

    if(!post) {
        return res.status(404).json({success : false, message : '게시글을 찾을 수 없습니다'});
    }

    res.json({success : true, post}); // 조회된 게시글 JSON 응답
});

// 게시글 상세 보기 컨트롤러
const getPostDetail = asyncWrapper(async (req, res) => {
    const postId = req.params.id;

    const post = await postService.getPostById(postId);
    
    if (!post) {
        return res.status(404).send("Post not found");
    }

    if (req.xhr) {
        // AJAX 요청이라면 → 상세 뷰 일부만 렌더링
        return res.render('posts/_detail', { post });
    }

    // 일반 전체 페이지 렌더링
    res.render('posts/detail', { post });
});


module.exports = {
    createPost,
    renderNewPost,
    renderPostList,
    getAllPosts,
    getPostById,
    getPostDetail
};