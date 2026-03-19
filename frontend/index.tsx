"use client";

import { useState } from "react";
import { Sparkles, Send, GraduationCap, ArrowRight } from "lucide-react";

// AI解析結果の型を定義
type AnalysisResult = {
  strength: string;
  es_ready_text: string;
};

export default function GakuchikaPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null); // 型を明確に指定

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "dummy-id", content: text }),
      });
      const data = await response.json();
      setResult(data.analysis); // `data.analysis` の型が `AnalysisResult` に一致することを期待
    } catch (e) {
      alert("エラーが発生しました。バックエンドが起動しているか確認してね！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* ナビゲーション */}
      <nav className="p-6 max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-2xl text-indigo-600">
          <GraduationCap size={32} />
          <span>Gakuchika Log</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        {/* ヒーローセクション */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">
            あなたの日常を、<span className="text-indigo-600">「武器」</span>
            に変える。
          </h2>
          <p className="text-slate-500 text-lg">
            今日やった何気ないことを書くだけ。AIがあなたの強みを言語化します。
          </p>
        </section>

        {/* 入力フォーム */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-indigo-50">
          <textarea
            className="w-full h-40 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 text-lg resize-none placeholder:text-slate-400"
            placeholder="例：バイトのシフト調整で、みんなが納得する案を出した。サークルの新歓で10人と話した。"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !text}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            {loading ? "AIが深掘り中..." : "強みを見つける"}
            <Sparkles size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* 結果表示（AI解析後） */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8 rounded-3xl shadow-lg">
              <span className="text-indigo-200 font-bold text-sm uppercase tracking-widest">
                Your Strength
              </span>
              <h3 className="text-3xl font-black mt-2">{result.strength}</h3>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-400 text-sm mb-4 flex items-center gap-2">
                <ArrowRight size={16} /> エントリーシート文章案
              </h4>
              <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                {result.es_ready_text}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
