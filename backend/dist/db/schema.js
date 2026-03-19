"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiAnalyses = exports.logs = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ユーザー情報
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    targetJob: (0, pg_core_1.varchar)("target_job", { length: 100 }), // 志望職種（AIの変換精度を上げるため）
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// 日記ログ
exports.logs = (0, pg_core_1.pgTable)("logs", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)("user_id")
        .references(() => exports.users.id, { onDelete: "cascade" })
        .notNull(),
    content: (0, pg_core_1.text)("content").notNull(), // 「今日やったこと」
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
// AI解析結果（1つのログに対して1つの解析）
exports.aiAnalyses = (0, pg_core_1.pgTable)("ai_analyses", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    logId: (0, pg_core_1.uuid)("log_id")
        .references(() => exports.logs.id, { onDelete: "cascade" })
        .notNull()
        .unique(),
    strength: (0, pg_core_1.varchar)("strength", { length: 50 }), // 例: 「リーダーシップ」「粘り強さ」
    esReadyText: (0, pg_core_1.text)("es_ready_text"), // ESにそのまま使える文章案
    followUpQuestions: (0, pg_core_1.text)("follow_up_questions"), // 面接で深掘りされそうな質問
    generatedAt: (0, pg_core_1.timestamp)("generated_at").defaultNow().notNull(),
});
