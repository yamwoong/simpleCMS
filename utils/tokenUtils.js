const { v4: uuidv4 } = require("uuid");

/**
 * 비밀번호 재설정 토큰 생성 유틸
 * @param {Object} user - 사용자 객체
 * @returns {Object} - { resetToken, expires }
 */

const generateResetTokenForUser = (user) => {
    console.log('user', user);
    if(!user) throw new Error('Invalid user object provided for password reset');

    const resetToken = uuidv4(); // UUID 기반 토큰 생성
    const expires = Date.now() + 1000 * 60 * 30; // 30분 후 만료

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expires;
    return {resetToken, expires};
};

module.exports  = {
    generateResetTokenForUser
}