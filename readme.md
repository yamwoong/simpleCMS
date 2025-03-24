# simpleCMS Simple Content Management System
#     (인증 + 게시글 CRUD 시스템)

## 프로젝트 개요
- **프로젝트 이름** : simpleCMS  
- **주요 기능**     :  
  - 사용자 회원가입, 로그인, 로그아웃 (인증 기능)  
  - 게시글 CRUD (게시글 작성, 조회, 수정, 삭제)  
- **기술 스택**
  - Backend         : Node.js, Express
  - Database        : MongoDB, Mongoose
  - Authentication  : express-session, argon2
  - View Engine     : EJS
  - Styling         : CSS
  - Email           : Nodemailer (OAuth2 Gmail API)


---

## 📌 프로젝트 구조  


my-project/
│── models/          # Mongoose 스키마 관리 (User.js, Post.js)
│── routes/          # API 라우터 (authRoutes.js, postRoutes.js)
│── controllers/     # 컨트롤러 (authController.js, postController.js)
│── services/        # 서비스 로직 (authService.js, postService.js)
│── middlewares/     # 미들웨어 (authMiddleware.js, errorHandler.js)
│── views/           # EJS 템플릿 (홈, 로그인, 게시글)
│── public/          # 정적 파일 (CSS, JS)
│── app.js           # 메인 서버 파일
│── package.json     # npm 패키지 정보
│── .env             # 환경 변수
│── README.md        # 프로젝트 설명


---

## 구현 순서  
**데이터 흐름을 고려하여 아래 순서대로 개발**  
1. **모델 (Model)**     - 사용자 및 게시글 데이터 구조 정의  
2. **라우트 (Route)**   - 인증 및 게시글 관련 API 개발  
3. **템플릿 (View)**    - EJS를 사용하여 UI 페이지 구현  

---

## ✅ 개발 체크리스트  

### **1️⃣ 프로젝트 기본 설정**  
- [X] `npm init`으로 프로젝트 초기화  
- [X] Express 설치 및 기본 서버 구축  
- [X] MongoDB 연결 설정 (`mongoose`)  
- [X] `.env` 파일을 이용한 환경 변수 설정 (`dotenv` 패키지 사용)  
- [X] 보안 강화를 위해 `helmet`, `cors` 추가  

---

### **2️⃣ 사용자 인증 (Auth) 기능 개발**  
- [X] `User` 모델 생성 (이메일, 비밀번호 해싱)  
- [ ] 회원가입 기능 (`/register`)  
  - [ ] 이메일 중복 체크 기능 추가  
- [ ] 로그인 기능 (`/login`) - 세션 기반 인증  
  - [ ] 로그인 실패 시 일정 횟수 초과하면 제한 (예: 5회 실패 시 10분 차단)  
- [ ] 로그아웃 기능 (`/logout`)  
- [ ] 로그인된 사용자만 접근 가능한 `dashboard` 페이지 
- [ ] **비밀번호 변경 (현재 비밀번호 검증 + 새 비밀번호 설정)**
- [ ] **OAuth 소셜 로그인 추가 (Google 로그인)**  

---

### **3️⃣ 게시글 CRUD 기능 개발**  
- [ ] `Post` 모델 생성 (제목, 내용, 작성자, 생성일)  
- [ ] 게시글 작성 기능 (`/posts/new`)  
- [ ] 게시글 조회 기능 (`/posts`)  
  - [ ] **조회수 증가 기능 (`views` 필드 추가, 조회 시 증가)**  
  - [ ] **정렬 기능 (최신순 / 인기순 / 오래된 순)**  
- [ ] 게시글 수정 기능 (`/posts/:id/edit`)  
  - [ ] **본인 작성 여부 확인 (다른 사용자 수정 방지)**  
- [ ] 게시글 삭제 기능 (`/posts/:id`)  
  - [ ] **본인 작성 여부 확인 (다른 사용자 삭제 방지)**  
- [ ] **이미지 업로드 기능 (multer 사용, 게시글에 이미지 추가)**  

---

### **4️⃣ 보안 및 최적화**  
- [ ] 비밀번호 재설정 기능 (비밀번호 찾기)   
  - [ ] **OAuth2 + Nodemailer 연동 (Gmail API 사용)**  
  - [ ] 이메일 전송 후 비밀번호 재설정 링크 제공  
  - [ ] 비밀번호 재설정 (토큰 검증 후 새 비밀번호 저장)  
- [ ] 게시글 작성/수정 시 본인 여부 확인  
- [ ] **페이지네이션 기능 (`?page=1&limit=10`으로 데이터 나누기)**  


---

## 🚀 추가 기능 (개발 완료 후 확장 가능)  

### **5️⃣ 사용자 경험 개선 (UX/UI)**
- [ ] **반응형 디자인 적용** (모바일, 태블릿 최적화)  
- [ ] **다크 모드 추가** (사용자 설정 가능)  
- [ ] **알림 시스템 (Flash Messages)** (게시글 작성/삭제/로그인 시 알림 표시)  
- [ ] **에러 메시지 및 폼 검증 강화** (클라이언트 측 유효성 검사 추가)  

---

### **6️⃣ 고급 인증 및 보안 강화**  
- [ ] **JWT 토큰 인증 추가** (현재 세션 기반 -> JWT로 확장)  
- [ ] **이중 인증(2FA)** (Google Authenticator 또는 이메일 인증 코드 추가)  
- [ ] **비밀번호 변경 기능** (로그인된 사용자만 변경 가능)  
- [ ] **관리자 대시보드 추가** (관리자 계정이 유저 관리 가능)  
- [ ] **로그인 기록 저장** (IP 및 접속 시간 저장)  

---

### **7️⃣ 고급 CRUD 및 게시판 기능 추가**  
- [ ] **댓글 기능** (게시글에 댓글 달기)  
- [ ] **대댓글 기능** (댓글에 답글 가능)  
- [ ] **좋아요 및 북마크 기능** (게시글에 좋아요/즐겨찾기 추가)  
- [ ] **태그 기능** (게시글에 태그 추가, 태그별 검색 가능)  
- [ ] **검색 기능** (제목, 내용, 작성자로 검색 가능)  
- [ ] **게시글 신고 기능** (유저가 부적절한 게시글 신고 가능)  
- [ ] **게시글 임시 저장 기능** (작성 중 저장 후 나중에 수정 가능)  

##  다음 프로젝트에 모듈 시스템 안내 (ESM 사용)
본 프로젝트는 **ECMAScript Modules(ESM)**을 사용합니다.

### 1. ESM을 사용하는 이유  
- 최신 JavaScript 표준을 따르고, 해외 실무에서 더 선호됨.  
- `import/export` 문법을 사용하여 가독성과 유지보수성을 향상.  
- Tree shaking(필요 없는 코드 제거) 최적화 지원.

---

## 기능 목록  
- ✅ **사용자 인증**
  - 회원가입 (폼 페이지 + 저장)  
  - 로그인 (폼 페이지 + 인증 처리)  
  - 로그아웃  
  - 인증된 사용자만 볼 수 있는 대시보드 페이지  
  - 비밀번호 재설정 (이메일 인증)  

- ✅ **게시글 CRUD**
  - 게시글 목록 조회  
  - 게시글 상세 조회  
  - 새 게시글 작성 (폼 페이지 + 저장)  
  - 게시글 수정 (폼 페이지 + 업데이트)  
  - 게시글 삭제  

---

## API 라우트 정의  
| Method | Route       | 설명                         | 인증 필요 |
|--------|------------|----------------------------|----------|
| GET    | /register  | 회원가입 폼 렌더링         | ❌       |
| POST   | /register  | 회원가입 요청 처리         | ❌       |
| GET    | /login     | 로그인 폼 렌더링           | ❌       |
| POST   | /login     | 로그인 요청 처리           | ❌       |
| POST   | /logout    | 로그아웃 처리              | ✅       |
| GET    | /dashboard | 대시보드 페이지            | ✅       |
| GET    | /posts     | 모든 게시글 조회           | ❌       |
| GET    | /posts/new | 게시글 작성 폼 렌더링      | ✅       |
| POST   | /posts     | 새 게시글 저장             | ✅       |
| GET    | /posts/:id | 특정 게시글 상세 조회      | ❌       |
| GET    | /posts/:id/edit | 게시글 수정 폼 렌더링 | ✅       |
| PUT    | /posts/:id | 게시글 수정                | ✅       |
| DELETE | /posts/:id | 게시글 삭제                | ✅       |

---

## 사용된 npm 패키지  

### **서버 및 프레임워크**  
- `express` → 경량 Node.js 웹 프레임워크  

### **데이터베이스**  
- `mongoose` → MongoDB와 연결하는 ODM 라이브러리  

### **템플릿 엔진**  
- `ejs` → 서버 사이드 렌더링을 위한 템플릿 엔진  

### **인증 및 보안**  
- `argon2` → 비밀번호 해싱 (bcrypt 대신 사용)  
- `express-session` → 세션 기반 로그인 구현  
- `connect-mongo` → Express 세션을 MongoDB에 저장  
- `uuid` → 비밀번호 찾기 토큰 생성  

### **유틸리티 & 기타**  
- `dotenv` → 환경 변수 관리  
- `method-override` → HTML 폼에서 PUT, DELETE 사용 가능  
- `nodemailer` → 이메일 전송을 위한 라이브러리  
- `googleapis` → OAuth2 인증을 위해 필요  

---
