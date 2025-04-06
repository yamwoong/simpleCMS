function renderPostDetailView(post) {
    const container = document.querySelector('.container');
    if(!container) {
        console.error("❌ .container 엘리먼트를 찾을 수 없습니다.");
        return;
    }

    container.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>작성자: ${post.author.username} | 조회수: ${post.views} | ${new Date(post.createdAt).toLocaleDateString()}</small>
        <br />
        <a href="/posts" id="back-to-list">← 목록으로 돌아가기</a>
    `;
}

export {
    renderPostDetailView
}