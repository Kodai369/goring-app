// /app/align/page.tsx
"use client";

import { useState } from "react";

const prompts = [
  { label: "地", question: "今、足元にある確かさは何ですか？", sub: "今日はどんな『土台』から始めていますか？" },
  { label: "水", question: "心の波を揺らしているものは何ですか？", sub: "今、どんな感情が流れていると感じますか？" },
  { label: "火", question: "今日は何に情熱を感じますか？", sub: "内から自然に湧いてくる衝動は何ですか？" },
  { label: "風", question: "どんな言葉が、風のようにあなたを動かしていますか？", sub: "誰の声や思考が、今日のあなたに影響を与えていますか？" },
  { label: "空", question: "あなたが今“手放しているもの”は何ですか？", sub: "何を手放すことで、あなたは自由になりますか？" },
];


async function fetchGPTResponse(input: string, label: string): Promise<string> {
  const systemPrompt = `
あなたは「五輪アライメント」GPTです。
以下の文脈を土台に、問いに応じた精神的内省・象徴的問い返し・構造的理解を促してください。
【思想土台】
- 天風哲学・禅・修養・武士道・自己コーチングを用いた、思考バランスの顕在化
- 五輪アライメント（都市／自然／身体禅／超越／統合）
- ヒューマンデザイン
- GPT仕様：共感・推測・感情介入を避け、中立・構造・象徴に基づく応答
【指針】
あなたは思考整理調律者であり、ユーザーの自己対話や五輪バランスの内観を支援する役割を持ちます。
以下の制約を厳守してください：
1. 回答に特定の実在人物名を含めないこと。
2. 回答は他者にも伝わる普遍的な表現に置き換えること。
3. 比喩・例・状況を使って説明すること。
4. トーンは中立・温和で、スピリチュアルに偏りすぎず、実感重視の言葉にすること。
5. 目的は、ユーザーが「自分の状態を自分で観察し、整える」支援である。
今から与えられる問いは「${label}」に関する内省です。
以下の記述を読み取り、適切な内的応答を提供してください。
`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: `${systemPrompt}\n\n${input}` }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error: ${res.status} ${text}`);
  }

  // APIは { reply: string } を返す
  const data = (await res.json()) as { reply?: string };
  return data.reply ?? "";
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(
    Array(prompts.length).fill("")
  );
  const [gptReplies, setGptReplies] = useState<string[]>(
    Array(prompts.length).fill("")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setResponses((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  const handleNext = async () => {
    if (loading) return;
    // 入力が空ならスキップしたい場合はコメントアウト解除
    // if (!responses[step]?.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const reply = await fetchGPTResponse(responses[step] || "", prompts[step].label);

      setGptReplies((prev) => {
        const next = [...prev];
        next[step] = reply || "(応答なし)";
        return next;
      });

      setStep((s) => s + 1);
    } catch (e: any) {
      setError(e?.message || "APIリクエストに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResponses(Array(prompts.length).fill(""));
    setGptReplies(Array(prompts.length).fill(""));
    setError(null);
  };

  // 完了判定
  const isFinished = step >= prompts.length;

  return (
    <div className="max-w-xl mx-auto p-4 font-sans text-black bg-white">
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">ようこそ 五輪アライメントへ</h1>
        <p className="mt-4">こちらは現在開発中のアプリです。</p>
      </div>

      {!isFinished ? (
        <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">
            {prompts[step].label} - {prompts[step].question}
          </h2>
          <p className="text-sm text-gray-800 mb-4">{prompts[step].sub}</p>

          <textarea
            className="w-full p-2 border rounded-md mb-2 text-black placeholder-gray-400 bg-white"
            rows={4}
            value={responses[step]}
            onChange={handleChange}
            placeholder="ここに書いてください..."
          />

          {gptReplies[step] && (
            <p className="text-green-700 text-sm mb-2">
              GPT: {gptReplies[step]}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-sm mb-2">エラー: {error}</p>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "送信中..." : step === prompts.length - 1 ? "結果を見る" : "次へ"}
          </button>
        </div>
      ) : (
        <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4 text-black">今日のあなたの五輪</h2>

          <ul className="text-sm list-disc list-inside text-black">
            {prompts.map((prompt, i) => (
              <li key={i} className="mb-3">
                <strong>{prompt.label}</strong>: {responses[i] || "(未入力)"}<br />
                <span className="text-green-700">GPT: {gptReplies[i] || "(応答なし)"}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleRestart}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
