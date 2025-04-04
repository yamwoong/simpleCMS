const Post = require('../models/Post');

/**
 * 개시글 생성 서비스
 * @param {Object} postData - 게시글 데이터 (title, content, author)
 * @returns {Promise<Object>} - 생성된 게시글 반환
 */

const createPost = async({title, content, author}) => {
    if(!title || !content) {
        throw new Error('제목과 내용을 입력해주세요.')
    }

    const newPost = new Post({
        title,
        content,
        author
    });

    return await newPost.save();
};

/**
 * 전체 게시글 조회 서비스
 * 정렬 옵션 포함 (최신순, 인기순, 오래된 순)
 */

const getAllPosts = async(sortBy = 'latest') => {
    let sortOption = {createdAt : -1}; // 기본값 : 최신순

    if(sortBy == 'popular') {
        sortOption = {views : -1}; // 조회수 높은 순
    } else if (sortBy == 'oldest') {
        sortOption = {createdAt : 1}; // 오래된 순
    }

    return await Post.find().populate('author', 'username').sort(sortOption);
};

/**
 * 게시글 상세 조회 (조회수 증가 포함)
 * @param {string} postId - 조회할 게시글 ID
 * @returns {Promise<Object|null>} - 조회된 게시글 (없으면 null) 
 */

const getPostById = async(postId) => {
    return await Post.findByIdAndUpdate(
        postId,
        {$inc : {views : 1}}, // 조회수 +1 증가
        {new : true} // 업데이트된 데이터 반환
    ).populate('author', 'username'); // 작성자 정보 포함
};




module.exports = {
    createPost,
    getAllPosts,
    getPostById
};