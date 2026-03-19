"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// CORS設定
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
}));
// JSONボディの解析
app.use(express_1.default.json());
// サンプルルート
app.get("/", (req, res) => {
    res.send("Gakuchika Log API is running!");
});
app.post("/logs", (req, res) => {
    console.log(req.body);
    res.json({
        analysis: {
            strength: "Example Strength",
            es_ready_text: "Example ES Text",
        },
    });
});
// サーバー起動
const PORT = 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Backend is running on http://localhost:${PORT}`);
    });
}
exports.default = app; // テスト用にエクスポート
