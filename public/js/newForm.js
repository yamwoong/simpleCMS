// 글쓰기 폼을 서버에서 불러와서 화면에 렌더링

async function loadNewForm() {
    console.log("📝 글쓰기 폼 로딩");

    try {
        
        const response = await fetch('/posts/new', {
            headers : {
                "X-Requested-With": "XMLHttpRequest" // AJAX 요청임을 알림
            }
        });


        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
        }

        const html = await response.text();
        console.log("✅ 글쓰기 폼 HTML 로드 성공"); // ✅ HTML 정상 로드 여부 확인

        const container = document.querySelector('#content');
        console.log("📦 container: ", container);
        if (container) {
            container.innerHTML = html;
            attachFormEvent(); // ✨ 폼 제출 이벤트도 꼭 붙여줘야 해!
        } else {
            console.warn("⚠️ #content 요소를 찾을 수 없습니다.");
        }
    } catch(err) {
        console.error("❌ 글쓰기 폼 로드 실패", err);
    }
}

// 글 작성 이벤트 바인딩 함수
function attachFormEvent() {
    const form = document.querySelector('#new-post-form');
    form?.addEventListener('submit', async(e) => {
        e.preventDefault();

        const title = form.querySelector("input[name='title']").value;
        const content = form.querySelector("input[name='content']").value;

        console.log("✍️ 폼 제출됨 - 제목:", title, ", 내용:", content);

        try {
            const response = await fetch('/api/posts', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            const data = await response.json();

            console.log("✅ POST /api/posts 요청 성공");
            console.log("📦 생성된 게시글 ID:", data.post._id);

            if (!data.success) throw new Error(data.message);

            history.pushState(null, '', `/posts/${data.post._id}`);
            const {loadPostDetail} = await import('./postDetail.js');
            loadPostDetail(data.post._id);
        } catch(err) {
            console.error("❌ 게시글 작성 실패", err);
        }
    });
}


export {
    loadNewForm
}