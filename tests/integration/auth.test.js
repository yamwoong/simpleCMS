const request = require("supertest");
const app = require("../../app"); // Express 앱을 가져옴
const { sendPasswordResetEmail } = require("../../services/emailService");

// Jest의 모킹 기능을 사용하여 실제 이메일 전송을 막음
jest.mock("../../services/emailService");

describe("POST /api/auth/reset-password", () => {
    beforeAll(() => {
        // 필요하면 앱 초기화 로직 추가 가능
    });

    afterAll(async () => {
        // 필요하면 테스트 종료 시 리소스 정리
    });

    it("✅ 이메일이 정상적으로 전송되면 200 응답을 반환해야 함", async () => {
        sendPasswordResetEmail.mockResolvedValue({ messageId: "mock-message-id" });

        const response = await request(app)
            .post("/api/auth/reset-password")
            .send({ email: "test@example.com", token: "mock-reset-token" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "비밀번호 재설정 이메일이 전송되었습니다." });
    });

    it("❌ 이메일 또는 토큰이 없으면 400 응답을 반환해야 함", async () => {
        const response = await request(app)
            .post("/api/auth/reset-password")
            .send({ email: "" }); // 토큰 없음

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "이메일과 토큰이 필요합니다.");
    });

    it("❌ 이메일 전송이 실패하면 500 응답을 반환해야 함", async () => {
        sendPasswordResetEmail.mockRejectedValue(new Error("이메일 전송 실패"));

        const response = await request(app)
            .post("/api/auth/reset-password")
            .send({ email: "test@example.com", token: "mock-reset-token" });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message", "이메일 전송 실패");
    });
});
