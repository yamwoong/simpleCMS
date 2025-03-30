const nodemailer = require("nodemailer");
const { sendPasswordResetEmail } = require("../utils/emailUtils");
const { emailConfig } = require("../config/config");

// ✅ OAuth2 관련 유틸 함수를 Mocking
jest.mock("../utils/oauthUtils", () => ({
    getAccessToken: jest.fn().mockResolvedValue("mock-access-token"),
}));

// ✅ Jest의 모킹 기능을 사용하여 Nodemailer를 모킹(mock)함
jest.mock("nodemailer");

describe("sendPasswordResetEmail", () => {
    let mockSendMail;

    // 🔹 테스트 실행 전마다 새로운 mock 함수 생성
    beforeEach(() => {
        // sendMail을 모의(mock)하여 항상 성공 응답을 반환하도록 설정
        mockSendMail = jest.fn().mockResolvedValue({ messageId: "test-message-id" });

        // 📌 Nodemailer의 createTransport 메서드를 가짜(mock)로 대체
        nodemailer.createTransport.mockReturnValue({
            sendMail: mockSendMail, // 실제 sendMail 대신 mockSendMail 사용
        });
    });

    // ✅ 정상적인 이메일 전송이 수행되는지 확인
    it("✅ 이메일이 정상적으로 전송되는지 확인", async () => {
        // 테스트용 이메일과 비밀번호 재설정 토큰 준비
        const testEmail = "test@example.com";
        const testToken = "mock-reset-token";

        // 📌 테스트 대상 함수 실행
        const result = await sendPasswordResetEmail(testEmail, testToken);

        // 🔹 sendMail 함수가 정확히 1번 호출되었는지 확인
        expect(mockSendMail).toHaveBeenCalledTimes(1);

        // 📌 sendMail이 올바른 매개변수와 함께 호출되었는지 검증
        expect(mockSendMail).toHaveBeenCalledWith({
            from: `"MyProject Support" <${emailConfig.EMAIL_USER}>`, // 발신자 이메일
            to: testEmail, // 수신자 이메일
            subject: "🔒 비밀번호 재설정 요청", // 이메일 제목
            html: expect.stringContaining(testToken), // 📌 토큰 포함 여부 확인
        });

        // 🔹 반환된 결과값이 올바른지 확인
        expect(result).toHaveProperty("messageId", "test-message-id");
    });

    // ❌ 이메일 전송 실패 시 예외 처리 확인
    it("❌ 이메일 전송 실패 시 에러를 던지는지 확인", async () => {
        // sendMail이 에러를 발생시키도록 설정
        mockSendMail.mockRejectedValue(new Error("SMTP 서버 오류"));

        // 📌 sendPasswordResetEmail이 에러를 던지는지 검증
        await expect(sendPasswordResetEmail("test@example.com", "mock-reset-token"))
            .rejects.toThrow("이메일 전송 실패");
    });
});
