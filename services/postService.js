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

module.exports = {
    createPost
};