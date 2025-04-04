// 📌 AJAX로 상세 페이지 로드
async function loadPostDetail(postId) {
    try {
        console.log(`📡 [AJAX 요청] /api/posts/${postId}`);
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();

        console.log("📩 [응답 데이터]", data);

        if (!data.success) throw new Error(data.message);

        document.querySelector(".container").innerHTML = `
            <h2>${data.post.title}</h2>
            <p>${data.post.content}</p>
            <small>작성자: ${data.post.author.username} | 조회수: ${data.post.views} | ${new Date(data.post.createdAt).toLocaleDateString()}</small>
            <a href="/posts">← 목록으로 돌아가기</a>
        `;
    } catch (error) {
        console.error("❌ 게시글 상세 조회 실패:", error);
    }
}

export {
    loadPostDetail
}