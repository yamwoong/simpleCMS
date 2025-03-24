const User = require('../models/User');
const hashUtils = require('../utils/hashUtils');
const {asyncWrapper} = require('../utils/asyncHandler');

/**
 * 비밀번호 변경 함수
 * @param {string} userId - 사용자 ID
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise<object>} - 변경 결과
 */

const updatePassword = asyncWrapper(async(userId, newPassword) => {
    const hashedPassword = await hashUtils.hashPassword(newPassword); // 해싱 유틸 사용
    
    // 유저 존재 여부 확인 후 업데이트 진행
    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        {password : hashedPassword},
        {new : true} // 변경된 문서 반환환
    );

    if(!updatedUser) throw new Error('사용자 정보를 찾을 수 없습니다');

    return {
        success : true,
        message : `${updatedUser.username}님의 비밀번호가 성공적으로 변경되었습니다.` };
});

module.exports = {
    updatePassword
};