const argon2 = require('argon2');
const {asyncWrapper} = require('./asyncHandler');

/**
 * 비밀번호 해싱 함수
 * @param {Promise<string>} - 해싱된 비밀번호 반환
 * 
 * Argon2 알고리즘을 사용하여 비밀번호를 안전하게 암호화
 * 보안성을 위해 충분한 메모리 & 연산 비용 설정
 */
const hashPassword  = asyncWrapper(async(password){
    return await argon2.hash(password, {
        type : argon2.argon2id, // 가장 강력한 Argon2 알고리즘 사용
        memoryCost : 2 ** 16,   // 64MB 메모리 사용 (보안 강화)
        timeCost : 3,           // 연산 반복 횟수
        parallelism : 1         // 병렬 처리 개수 (기본 1)
    });
});

/**
 * 비밀번호 검증 함수
 * @param {string} hashedPassword - 저장된 해싱된 비밀번호
 * @param {string} inputPassword - 사용자가 입력한 비밀번호
 * @returns {Promise<boolean>} - 검증 결과 (true: 일치, false: 불일치)
 * 
 * 사용자가 입력한 비밀번호와 저장된 해싱 비밀번호를 비교
 * Argon2의 내부 알고리즘을 활용하여 보안 강화
 */
const verifyPassword = asyncWrapper(async(hashedPassword, inputPassword) => {
    return await argon2.verify(hashedPassword, inputPassword);
})

module.exports = {
    hashPassword,
    verifyPassword
};