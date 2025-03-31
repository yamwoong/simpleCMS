const validateEmailAndToken = (req, res, next) => {
    console.log('validateIdentifier => req.body', req.body);
    
    // identifier가 없으면 username 또는 email을 사용
    const identifier = req.body.identifier || req.body.username || req.body.email;

    console.log('validateIdentifier => identifier', identifier);

    if (!identifier) {
        return res.status(400).json({ message: '아이디 또는 이메일을 입력해주세요.' });
    }

    // 검증 통과 시, 다음 미들웨어로 이동
    next();
};

module.exports = {
    validateEmailAndToken
};
