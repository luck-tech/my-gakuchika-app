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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeGakuchika = void 0;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const analyzeGakuchika = (content, targetJob) => __awaiter(void 0, void 0, void 0, function* () {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    あなたはプロの就活キャリアアドバイザーです。
    大学生の何気ない日記から、企業が求める「強み」を見つけ出し、エントリーシート（ES）の種を作成してください。

    【学生の日記】
    ${content}

    【志望職種（もしあれば）】
    ${targetJob || "未定"}

    【出力形式】
    以下のJSON形式だけで出力してください。
    {
      "strength": "一言で表す強み（例：課題解決力、継続力）",
      "es_ready_text": "このエピソードをガクチカ風に変換した300文字程度の文章",
      "follow_up_questions": "面接で聞かれそうな深掘り質問3つ"
    }
  `;
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    return JSON.parse(response.text()); // JSONとしてパースして返す
});
exports.analyzeGakuchika = analyzeGakuchika;
