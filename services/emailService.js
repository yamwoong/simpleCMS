const { createTransporter } = require("../utils/transporter");
const { emailConfig } = require("../config/config");
const debug = require("debug")("emailService"); // ✅ debug 모듈 사용

/**
 * 비밀번호 재설정 이메일 옵션 생성 함수
 */
const createMailOptions = (to, resetToken) => ({
    from: `"MyProject Support" <${emailConfig.EMAIL_USER}>`,
    to,
    subject: "🔒 비밀번호 재설정 요청",
    html: `http://localhost:3000/reset-password?token=${resetToken}`,
});

/**
 * 비밀번호 재설정 이메일 전송 함수
 */
const sendPasswordResetEmail = async (to, resetToken) => {
    try {
        console.log('sendPasswordResetEmail / resetToken', resetToken);
        const transporter = await createTransporter();
        const mailOptions = createMailOptions(to, resetToken);

        const result = await transporter.sendMail(mailOptions);
        debug("이메일 전송 성공: %O", result);
        return result;
    } catch (error) {
        debug("이메일 전송 실패: %s", error.message);
        throw new Error(`이메일 전송 실패 (${error.code || "Unknown"}): ${error.message}`);
    }
};

module.exports = { sendPasswordResetEmail };
