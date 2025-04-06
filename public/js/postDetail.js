import { renderPostDetailView } from './views/postDetailView.js';
// 특정 게시글의 상세 정보를 서버에서 불러와서 페이지에 렌더링하는 파일일

// 게시글 상세 조회 함수수
async function loadPostDetail(postId) {
    try {
        console.log(`📡 [AJAX 요청] /api/posts/${postId}`);
        const response = await fetch(`/posts/${postId}`);
        const data = await response.json();

        console.log("📩 [응답 데이터]", data);

        if (!data.success) throw new Error(data.message);

        renderPostDetailView(data.post); // 뷰 렌더링
        attachBackToListEvent(); // 목록 돌아가기 이벤트 바인딩
    } catch (error) {
        console.error("❌ 게시글 상세 조회 실패:", error);
        const container = document.querySelector(".container");
        if (container) {
            container.innerHTML = "<p>게시글을 불러오는 데 실패했습니다.</p>";
        }
    }
}


// 목록으로 돌아가기 클릭 시 처리
function attachBackToListEvent() {
    const backLink = document.getElementById('back-to-list');
    backLink?.addEventListener('click', async(e) => {
        e.preventDefault();

        history.pushState(null, null, '/posts');

        const {fetchPosts} = await import('./fetchPosts.js');
        fetchPosts('latest');
    });
}

export {
    loadPostDetail
}