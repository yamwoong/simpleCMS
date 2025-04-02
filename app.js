const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const passport = require("./config/passport");

const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');
const globalVars = require('./middlewares/globalVars');
const authMiddleware = require('./middlewares/authMiddleware');

const authUiRoutes = require('./routes/authUiRoutes');
const authApiRoutes = require('./routes/authApiRoutes');

const passwordUiRoutes = require('./routes/passwordUiRoutes');
const passwordApiRoutes = require('./routes/passwordApiRoutes');

const dashboardUiRoutes = require('./routes/dashboardUiRoutes');

const postApiRoutes = require('./routes/postApiRoutes');
const postUiRoutes = require('./routes/postUiRoutes');


// 환경 변수 로드 (.env)
dotenv.config();

const app = express();


/************************************공통 미들웨어(DB 연결 전)*****************************/

app.use(helmet()); // 보안 헤더 자동 설정
app.use(cors()); // CORS 설정 (기본은 모든 도메인 허용)

app.use(express.urlencoded({extended : true})); // 폼 데이터 파싱
app.use(express.json()); // JSON 요청 처리
app.use(methodOverride('_method')); // HTML 폼에서 PUT, DELETE 사용
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정


/****************************************************************************************/

/************************************MongoDB 연결****************************************/

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB 연결 성공');

        startServer();
    } catch(err) {
        console.error('MongoDB 연결 실패 :', err);
        process.exit(1);// 연결 실패 시 서버 종료
    }
}
connectDB();

/************************************DB 기반 미들웨어(DB 연결 후)**************************/


app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false,
    saveUninitialized : true,
    store : MongoStore.create({mongoUrl : process.env.MONGO_URI}), // DB에 세션 저장
    cookie : {secure : false, httpOnly : true, maxAge : 1000 * 60 * 60}

}));

//Passport 초기화 & 세션 설정 (세션 이후에 위치해야함)
app.use(passport.initialize());
app.use(passport.session());

// 전역 변수 미들웨어 등록 (passport.session() 이후에 실행해야 함!)
app.use(globalVars); // 세션 미들웨어를 먼저 등록한 후 globalVars를 실행해야함

// 특정 경로 보호
app.use('/dashboard', authMiddleware.requireAuth); // 세션 미들웨어를 먼저 등록한 후 실행

/****************************************************************************************/


/************************************라우터 설정(미들웨어 설정 후)*************************/

/************************************ API 라우트 (JSON 응답) ******************************/
app.use('/api/auth', authApiRoutes);
app.use('/api/password', passwordApiRoutes);
app.use('/api/posts', postApiRoutes);
/******************************************************************************************/

/************************************ UI 라우트 (EJS 렌더링) ******************************/
app.use('/', authUiRoutes);
app.use('/', passwordUiRoutes);
app.use('/', postUiRoutes);
/******************************************************************************************/

/************************************ 특정 경로 보호 (인증 필요) **************************/
app.use('/', dashboardUiRoutes); 
/****************************************************************************************/

/************************************에러 핸들링 미들웨어(가장 마지막)*********************/

app.use(notFoundHandler);
app.use(errorHandler);

/****************************************************************************************/

/************************************서버 실행********************************************/

const startServer = () => {
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
}

/****************************************************************************************/

