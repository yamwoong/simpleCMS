const User = require('../models/User');
const {asyncHandler} = require('../utils/asyncHandler'); 

/**
 * 비밀번호 재설정 토큰 검증 미들웨어
 */
 
const validateResetTokenFromQuery = asyncHandler(async (req, res, next) => {
    const { token } = req.query; // GET 요청에서는 query에서 가져옴

    if (!token) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: '유효하지 않거나 만료된 링크입니다.' });
    }

    req.user = user;
    next();
});


const validateResetTokenFromBody = asyncHandler(async (req, res, next) => {
    const { token } = req.body; // POST 요청에서는 body에서 가져옴

    if (!token) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: '유효하지 않거나 만료된 링크입니다.' });
    }

    req.user = user;
    next();
});

module.exports = { 
    validateResetTokenFromQuery,
    validateResetTokenFromBody
};
