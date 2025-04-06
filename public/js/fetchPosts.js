// 게시글 목록을 서버에서 불러와서 화면에 렌더링

// 📌 게시글 목록 뷰 렌더링 함수
function renderPostListView({ postList, sortButtons, createBtn, container }) {
    container.innerHTML = '';
  
    if (sortButtons) container.appendChild(sortButtons);
    if (createBtn) container.appendChild(createBtn);
    if (postList) container.appendChild(postList);
  }
  

async function fetchPosts(sort = 'latest') {
    try {
        console.log(`📄 게시글 목록 불러오기: ${sort}`);

        const response = await fetch(`/api/posts?sortBy=${sort}`, {
            headers : {
                "X-Requested-With": "XMLHttpRequest" // AJAX 요청임을 명시
            }
        });

        const html = await response.text();

        // HTML 파싱 (문자열 => DOM)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 필요한 내용만 선택
        const postList = doc.querySelector('#post-list');
        const sortButtons = doc.querySelector('#sort-buttons');
        const createBtn = doc.querySelector('#create-post-button');
        const container = document.querySelector('.container');

        if(postList && container) {
            renderPostListView({ postList, sortButtons, createBtn, container });
            attachSortEvents(); // 정렬 버튼 이벤트 바인딩
            attachCreateEvent(); // 글쓰기 버튼 이벤트 바인딩
        }
    } catch(err) {
        console.error("❌ 게시글 목록 로드 실패", err);
    }
}

function attachSortEvents() {
    document.querySelector("#sort-latest")?.addEventListener("click", () => fetchPosts("latest"));
    document.querySelector("#sort-popular")?.addEventListener("click", () => fetchPosts("popular"));
    document.querySelector("#sort-oldest")?.addEventListener("click", () => fetchPosts("oldest"));
}
  
function attachCreateEvent() {
    document.querySelector("#create-post-button")?.addEventListener("click", async (e) => {
      e.preventDefault();
      const { loadNewForm } = await import("./newForm.js");
      history.pushState(null, "", "/posts/new");
      loadNewForm();
    });
}

export { fetchPosts };