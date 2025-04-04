const initRouter = ({loadPostDetail, fetchPosts}) => {
    window.addEventListener('popstate', () => {
        console.log("🔙 [popstate 발생] URL 변경 감지:", window.location.pathname);

        const postId = window.location.pathname.split('/posts/')[1];

        if(postId) {
            loadPostDetail(postId);
        } else {
            document.querySelector(".container").innerHTML = `
                <h1>📌 게시글 목록</h1>
                <div id="post-list"></div>
            `;
            fetchPosts("latest");
        }
    });
};

export {
    initRouter 
}