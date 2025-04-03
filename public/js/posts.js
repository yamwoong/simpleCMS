document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM 로드 완료! fetchPosts 실행"); // 🛠 디버깅용 로그 추가
    fetchPosts('latest'); // 기본값 : 최신순 조회
});

// 게시글 목록 불러오기
async function fetchPosts(sortBy) {
    try {
        console.log(`📡 [AJAX 요청] /api/posts?sortBy=${sortBy}`); // ✅ 요청 URL 확인
        const response = await fetch(`/api/posts?sortBy=${sortBy}`);
        const data = await response.json();

        console.log("📩 [응답 데이터]", data); // ✅ 응답 확인

        if(!data.success) throw new Error(data.message);

        renderPosts(data.posts); // 게시글 목록 렌더링
    } catch(error) {
        console.error("❌ 게시글 불러오기 실패:", error);
    }
}

// 게시글 목록을 화면에 렌더링
function renderPosts(posts) {
    const postContainer = document.getElementById('post-list');
    postContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>작성자: ${post.author.username} | 조회수: ${post.views} | ${new Date(post.createdAt).toLocaleDateString()}</small>
        `;
        postContainer.appendChild(postElement);
    });
}

// 정렬 버튼 이벤트
document.getElementById('sort-latest').addEventListener('click', () => fetchPosts('latest'));
document.getElementById('sort-popular').addEventListener('click', () => fetchPosts('popular'));
document.getElementById('sort-oldest').addEventListener('click', () => fetchPosts('oldest'));
