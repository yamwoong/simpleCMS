require('dotenv').config(); // .env 파일 로드

const config = Object.freeze({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
});

const emailConfig = Object.freeze({
    EMAIL_USER: process.env.EMAIL_USER,  // 발신자 이메일 주소
    EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,  // OAuth 클라이언트 ID
    EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,  // OAuth 클라이언트 Secret
    EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,  // 갱신 토큰
    EMAIL_REDIRECT_URI: process.env.EMAIL_REDIRECT_URI,  // OAuth 리디렉트 URI
})

module.exports = {
    config,
    emailConfig
};