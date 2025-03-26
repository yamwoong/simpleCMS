/**
 * 비밀번호 변경 검증 미들웨어
 * @desc 현재 비밀번호, 새 비밀번호, 비밀번호 확인 입력 값 검증
 */

const validatePasswordChange = (req, res, next) => {
    const {newPassword, confirmPassword} = req.body;

    // 필수 입력값 확인
    if (!newPassword || !confirmPassword) {
        return res.status(400).render("password/changePassword", { error: "모든 필드를 입력해주세요." });
    }

    // 2️⃣ 새 비밀번호 & 확인 비밀번호 일치 여부 확인
    if (newPassword !== confirmPassword) {
        return res.status(400).render("password/changePassword", { error: "비밀번호가 일치하지 않습니다." });
    }

    next();
}

module.exports = {
    validatePasswordChange
    };
