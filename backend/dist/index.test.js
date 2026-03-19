"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest")); // supertest を使用して HTTP リクエストをテスト
const index_1 = __importDefault(require("./index")); // バックエンドのエントリーポイントをインポート
(0, vitest_1.describe)("Gakuchika API Test", () => {
    (0, vitest_1.test)("GET / は正常に動作するか", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/"); // supertest を使ってリクエストを送信
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.text).toBe("Gakuchika Log API is running!");
    }));
});
