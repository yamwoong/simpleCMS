// 브라우저의 뒤로가기/ 앞으로가기 동작을 감지해서 SPA처럼 처리하는 라우터

// 라우터 초기화 함수
const initRouter = ({loadPostDetail, fetchPosts, loadNewForm}) => {
    // popstate : 뒤로가기 / 앞으로가기 시 발생하는 이벤트트
    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        console.log("🔙 popstate 이벤트 감지:");

        if(path === '/posts') {
            fetchPosts('latest')// 목록 다시 렌더링
        } else if(path.startsWith("/posts/") && !path.endsWith("/edit")) {

            const postId = path.split('/posts/')[1];

            loadPostDetail(postId); // 상세 페이지 렌더링
        } else if(path === "/posts/new") {
            loadNewForm(); // 글쓰기 폼 렌더링
        }
    });
};

export {
    initRouter 
}