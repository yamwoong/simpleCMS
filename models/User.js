const mongoose = require('mongoose');
const hashUtils = require('../utils/hashUtils');
const userSchema = new mongoose.Schema({
    username: { 
        type : String, 
        required : true,
        unique : true, 
        trim: true 
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, "올바른 이메일 형식을 입력하세요"] // 이메일 검증
    },
    password : {
        type : String,
        required : false,
        select : false
    }, // 보안 강화를 위해 기본 조회에서 제외
    createdAt: {
        type : Date,
        default : Date.now,
        immutable: true // 생성 이후 변경 불가능
    },
    resetPasswordToken : {type : String, default: null }, // 비밀번호 재설정 토큰
    resetPasswordExpires : {type : Date, default: null } // 토큰 만료 시간
}, { timestamps: true }); // 자동으로 createdAt, updatedAt 추가);

/**
 * 비밀번호 해싱(저장 전에 실행)
 * `pre(save)` 훅을 사용하여 자동으로 비밀번호 암호화
 */

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); // 비밀번호가 변경된 경우에만 해싱 실행
    
    try {
        this.password = await hashUtils.hashPassword(this.password);
        next();
    } catch(err) {
        next(err);
    }
});

/**
 * `findOneAndUpdate()` 사용 시 비밀번호 해싱 처리
 * → `findOneAndUpdate()`는 `pre("save")`가 적용되지 않음!
 */
userSchema.pre('findOneAndUpdate', async function(next){
    const update = this.getUpdate();

    //비밀번호가 변경될 경우만 해싱
    if(update.password){
        update.password = await hashUtils.hashPassword(update.password);
    }

    next();
});



module.exports = mongoose.model("User", userSchema);
