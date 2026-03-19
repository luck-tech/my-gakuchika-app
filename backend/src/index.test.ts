import { expect, test, describe } from "vitest";
import request from "supertest"; // supertest を使用して HTTP リクエストをテスト
import app from "./index"; // バックエンドのエントリーポイントをインポート

describe("Gakuchika API Test", () => {
  test("GET / は正常に動作するか", async () => {
    const res = await request(app).get("/"); // supertest を使ってリクエストを送信
    expect(res.status).toBe(200);
    expect(res.text).toBe("Gakuchika Log API is running!");
  });
});
