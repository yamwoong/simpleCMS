import {fetchPosts} from './posts.js';
import {loadPostDetail} from './postDetail.js';
import {initRouter} from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('페이지 로드됨');

    // 현재 URL을 확인하고 적절한 페이지 로드
    const path = window.location.pathname;
    if(path.startsWith('/posts/')) {
        const postId = path.split('/posts/')[1];
        loadPostDetail(postId);
    } else {
        fetchPosts('latest');
    }

    // 라우터 초기화 (뒤로가기 이벤트 감지)
    initRouter({loadPostDetail, fetchPosts});
});