const {createTransporter} = require('./transporter');
const {emailConfig} = require('../config/config');

/**
 * 비밀번호 재설정 미메일 전송 함수
 */

const sendPasswordResetEmail = async(to, resetToken) => {
    try {
        const transporter = await createTransporter();

        const mailOptions = {
            from: `"MyProject Support" <${emailConfig.EMAIL_USER}>`,
            to,
            subject: "🔒 비밀번호 재설정 요청",
            html: `
                <h2>비밀번호 재설정 요청</h2>
                <p>아래 링크를 클릭하여 비밀번호를 재설정하세요:</p>
                <a href="${emailConfig.APP_URL}/reset-password?token=${encodeURIComponent(resetToken)}" target="_blank">
                    비밀번호 재설정하기
                </a>
                <p>이 링크는 30분 후 만료됩니다.</p>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('이메일 전송 성공 : ', result);
        return result;
    } catch(error) {
        console.log('이메일 전송 실패 : ', error.message);
        throw new Error(`이메일 전송 실패: ${error.message}`);
    }
};

module.exports = { sendPasswordResetEmail };