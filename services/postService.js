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
}

module.exports = {
    createPost,
    getAllPosts
};