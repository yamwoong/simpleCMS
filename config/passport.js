const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User');
const {config} = require('../config/config');

console.log("🔍 Google OAuth Config:", config);

// 🔹 [1] Google OAuth 전략 설정 (사용자 인증 처리)
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID, // Google 클라이언트 ID
            clientSecret: config.GOOGLE_CLIENT_SECRET, // Google 클라이언트 Secret
            callbackURL: config.GOOGLE_REDIRECT_URI, // OAuth 콜백 URL (Google 로그인 후 리디렉트)
            scope : ['profile', 'email']
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
                    user = new User({
                        username: profile.displayName,  // Google 프로필 이름 사용
                        email,                          // Google 이메일 저장
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
    try {
        console.log("♻ [세션 복원] 사용자 ID:", id);
        const user = await User.findById(id);
        if(user) {
            console.log("✅ [세션 복원 성공] 사용자 정보:", user.username);
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