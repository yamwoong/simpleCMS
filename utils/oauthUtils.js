const {google} = require('googleapis');
const {emailConfig} = require('../config/config');

console.log('emailConfig.EMAIL_CLIENT_ID', emailConfig.EMAIL_CLIENT_ID);

/**
 * OAuth2 클라이언트 설정
 * - Gmail API 사용을 위한 OAuth2 인증 객체 생성
 */
const OAuth2Client = new google.auth.OAuth2(
    emailConfig.EMAIL_CLIENT_ID,     // Google 클라이언트 ID
    emailConfig.EMAIL_CLIENT_SECRET, // Google 클라이언트 Secret
    emailConfig.EMAIL_REDIRECT_URI   // OAuth 리디렉션 URI
);

// Refresh Token 설정
OAuth2Client.setCredentials({refresh_token : emailConfig.EMAIL_REFRESH_TOKEN});

/**
 * OAuth2 엑세스 토큰 가져오는 함수
 */

const getAccessToken = async () => {
    try {
        const accessTokenResponse = await OAuth2Client.getAccessToken();
        if (!accessTokenResponse || !accessTokenResponse.token) {
            throw new Error("OAuth2 액세스 토큰을 가져올 수 없습니다.");
        }
        return accessTokenResponse.token; // 최신 액세스 토큰 반환
    } catch (error) {
        console.error("엑세스 토큰 가져오기 실패:", error.message);
        throw new Error("OAuth2 액세스 토큰 가져오기 실패");
    }
};

module.exports = {
    OAuth2Client,
    getAccessToken
}