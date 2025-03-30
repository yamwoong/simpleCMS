const nodemailer = require('nodemailer');
const {getAccessToken} = require('./oauthUtils');
const {emailConfig} = require('../config/config');

/**
 * Nodemailer Transporter 생성 함수
 */
const createTransporter = async () => {
    try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
            throw new Error("OAuth2 액세스 토큰을 가져오지 못했습니다.");
        }

        return nodemailer.createTransport({
            service: "gmail",   // Gmail 서비스 사용
            auth: {
                type: "OAuth2", // OAuth2 인증 방식 사용
                user: emailConfig.EMAIL_USER,   // 발신자 이메일
                clientId: emailConfig.EMAIL_CLIENT_ID,  // 필수 (OAuth2 사용 시)
                clientSecret: emailConfig.EMAIL_CLIENT_SECRET,  // 필수 (OAuth2 사용 시)
                refreshToken: emailConfig.EMAIL_REFRESH_TOKEN,  // 필수 (OAuth2 사용 시)
                accessToken,    // 필수 (OAuth2 사용 시)
            },
        });
    } catch (error) {
        console.error("❌ Transporter 생성 실패:", error.message);
        throw new Error("이메일 전송을 위한 Transporter 생성 실패");
    }
};

module.exports = { createTransporter };