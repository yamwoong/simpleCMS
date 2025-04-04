import { initRouter } from './router.js';
import { loadPostDetail } from './postDetail.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM 로드 완료! fetchPosts 실행");
    fetchPosts("latest"); // 기본값: 최신순 정렬
    initRouter({ fetchPosts, loadPostDetail });
});

// 📌 게시글 목록 불러오기
async function fetchPosts(sortBy) {
    try {
        console.log(`📡 [AJAX 요청] /api/posts?sortBy=${sortBy}`);
        const response = await fetch(`/api/posts?sortBy=${sortBy}`);
        const data = await response.json();

        console.log("📩 [응답 데이터]", data);

        if (!data.success) throw new Error(data.message);

        renderPosts(data.posts); // 📌 게시글 목록 렌더링 실행
    } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
    }
}

// 📌 게시글 목록을 화면에 렌더링 (이벤트 위임 방식 적용)
function renderPosts(posts) {
    const postContainer = document.getElementById("post-list");
    if (!postContainer) {
        console.error("❌ post-list 컨테이너를 찾을 수 없음!");
        return;
    }

    postContainer.innerHTML = ""; // 기존 목록 초기화

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-item");
        postElement.innerHTML = `
            <h3>
                <a href="/posts/${post._id}" class="post-title" data-id="${post._id}">${post.title}</a>
            </h3>
            <p>${post.content}</p>
            <small>작성자: ${post.author.username} | 조회수: ${post.views} | ${new Date(post.createdAt).toLocaleDateString()}</small>
        `;

        postContainer.appendChild(postElement);
    });
}

// 📌 제목 클릭 이벤트 (이벤트 위임 방식)
document.getElementById("post-list").addEventListener("click", event => {
    if (event.target.classList.contains("post-title")) {
        event.preventDefault();
        const postId = event.target.dataset.id;
        window.history.pushState({}, "", `/posts/${postId}`);
        loadPostDetail(postId);
    }
});


// 📌 정렬 버튼 이벤트
document.getElementById("sort-latest").addEventListener("click",  () => fetchPosts("latest"));
document.getElementById("sort-popular").addEventListener("click", () => fetchPosts("popular"));
document.getElementById("sort-oldest").addEventListener("click",  () => fetchPosts("oldest"));