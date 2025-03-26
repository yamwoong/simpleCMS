const { v4: uuidv4 } = require("uuid");

/**
 * 🔑 비밀번호 재설정 토큰 생성 유틸
 * @returns {Object} - { resetToken, expires }
 */

const generateResetTokenForUser = () => {
    const resetToken = uuidv4(); // UUID 기반 토큰 생성
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30분 후 만료
    return resetToken;
};

module.exports  = {
    generateResetTokenForUser
}