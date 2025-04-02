const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User');
const {config} = require('../config/config');
const argon2 = require('argon2');
const {v4 : uuidv4} = require('uuid');
const { verifyPassword } = require('../utils/hashUtils');

console.log("Passport 인증 설정 시작");

// [1] 로컬 로그인 전략 (이메일 + 비밀번호)
passport.use(
    new LocalStrategy(
        {usernameField : 'identifier'}, // username을 기반으로 인증
        async(identifier, password, done) => {
            try{
                console.log("🔹 [로컬 로그인 시도] 유저네임:", identifier);

                // 🔹 이메일인지 사용자명인지 확인
                const user = await User.findOne({
                    $or: [{ email: identifier }, { username: identifier }],
                }).select('+password'); // 비밀번호 필드 포함

                if (!user) {
                    console.warn("❌ [로그인 실패] 이메일 또는 사용자명이 존재하지 않음");
                    return done(null, false, { message: "이메일 또는 사용자명을 확인하세요." });
                }

                const isValidPassword = await verifyPassword(user.password, password);

                if (!isValidPassword) {
                    console.warn(`❌ [로그인 실패] 비밀번호 불일치 (입력한 이메일: ${email})`);
                    return done(null, false, { message: "비밀번호가 올바르지 않습니다." });
                }

                return done(null, user);
            } catch(err) {
                return done(err);
            }
        }
    )
);


// 🔹 [1] Google OAuth 전략 설정 (사용자 인증 처리)
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID, // Google 클라이언트 ID
            clientSecret: config.GOOGLE_CLIENT_SECRET, // Google 클라이언트 Secret
            callbackURL: config.GOOGLE_REDIRECT_URI, // OAuth 콜백 URL (Google 로그인 후 리디렉트)
            scope : ['profile', 'email']            // 사용자 프로필 및 이메일 요청청
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("✅ [Google 로그인 요청 성공]");
                console.log("🔹 Google 프로필 정보:", profile);

                // 이메일이 존재하는지 확인
                const email = profile.emails?.[0]?.value || null;
                if (!email) {
                    return done(new Error("Google 계정에서 이메일을 가져올 수 없습니다."), null);
                }

                // 🔹 [2] 이메일 기반으로 기존 사용자 찾기
                let user = await User.findOne({ email });

                if (!user) {
                    console.log("🆕 [신규 사용자 발견] Google 계정으로 회원가입 진행");

                    // 🔹 [3] 신규 사용자 회원가입 (최초 로그인)
                    const sanitizedUsername = profile.displayName.replace(/\s+/g, '_').replace(/[^\w]/g, '');
                    user = new User({
                        username: `${sanitizedUsername}_${uuidv4().slice(0, 8)}`, // 랜덤 문자열 추가하여 중복 방지 / Google 프로필 이름 사용
                        email,                          // Google 이메일 저장
                        authProvider: 'google',         // 로그인 제공자 (google)
                        googleId: profile.id,           // Google 계정 고유 ID 저장
                    });

                    await user.save();
                    console.log("✅ [회원가입 완료] 새 사용자 저장됨");
                } else {
                    console.log("🔹 [기존 사용자 로그인] 데이터베이스에서 사용자 찾음");
                }

                return done(null, user); // 인증 성공 시 사용자 정보 반환
            } catch (err) {
                console.error("❌ [Google 로그인 오류]:", err);
                return done(err, null);
            }
        }
    )
);

// 🔹 [4] 사용자 정보를 세션에 저장 (로그인 상태 유지)
passport.serializeUser((user, done) => {
    console.log("📝 [세션 저장] 사용자 ID:", user.id);
    done(null, user.id);
});

// 🔹 [5] 세션에서 사용자 정보 복원 (요청마다 실행)
passport.deserializeUser(async(id, done) => {
    console.log("♻ [세션 복원] 사용자 ID:", id);
    
    try {
        const user = await User.findById(id);
        if(user) {
            console.log("✅ [세션 복원 성공] 사용자 정보:", user);
        } else {
            console.warn("⚠ [세션 복원 실패] 사용자 정보 없음");
        }
        done(null, user);
    } catch (err) {
        console.error("❌ [세션 복원 오류]:", err);
        done(err, null);
    }
});

module.exports = passport;