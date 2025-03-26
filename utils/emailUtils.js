const nodemailer = require('nodemailer');
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


