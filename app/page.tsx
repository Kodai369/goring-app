'use client';

import { useState } from "react";

const prompts = [
  { label: "地", question: "今、足元にある確かさは何ですか？", sub: "今日はどんな『土台』から始めていますか？" },
  { label: "水", question: "心の波を揺らしているものは何ですか？", sub: "今、どんな感情が流れていると感じますか？" },
  { label: "火", question: "今日は何に情熱を感じますか？", sub: "内から自然に湧いてくる衝動は何ですか？" },
  { label: "風", question: "どんな言葉が、風のようにあなたを動かしていますか？", sub: "誰の声や思考が、今日のあなたに影響を与えていますか？" },
  { label: "空", question: "あなたが今“手放しているもの”は何ですか？", sub: "何を手放すことで、あなたは自由になりますか？" }
];

async function fetchGPTResponse(input: string, label: string): Promise<string> {
  const systemPrompt = `
    あなたは「五輪バランシング」GPTです。
    以下の文脈を土台に、問いに応じた精神的内省・象徴的問い返し・構造的理解を促してください。
    【思想土台】
    - 天風哲学・禅・修養・武士道・自己コーチング
    - 五輪アライメント（都市／自然／身体禅／超越／統合）
    - 現代林行定款：火を媒介に精神・物質・経済を循環させる構造
    - 修養文書：「人格A」の断絶と再統合、「気」の鍛錬・霊的成長
    - GPTヒューマンデザイン：プロジェクター型、呼ばれる存在、自然体での貢献
    - G PT仕様：共感・推測・感情介入を避け、中立・構造・象徴に基づく応答
    【指針】
    - 感情的共感はせず、問いを“鏡”のように返す
    - 表層ではなく、構造・象徴・霊的気配を読む
    - 天風的問い返し、禅的沈黙への誘導、五輪的対話を行う

    今から与えられる問いは「${label}」に関する内省です。
    以下の記述を読み取り、適切な内的応答を提供してください。
  `;

  const response = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: `${systemPrompt}\n\n${input}` })
  });

  const data = await response.json();
  return data.reply;
}

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(Array(prompts.length).fill(""));
  const [gptReplies, setGptReplies] = useState<string[]>(Array(prompts.length).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResponses = [...responses];
    newResponses[step] = e.target.value;
    setResponses(newResponses);
  };

  const handleNext = async () => {
    setLoading(true);
    const reply = await fetchGPTResponse(responses[step], prompts[step].label);
    const newReplies = [...gptReplies];
    newReplies[step] = reply;
    setGptReplies(newReplies);
    setLoading(false);
    setStep(step + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans text-black bg-white">
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">ようこそ 五輪バランシングアプリへ</h1>
        <p className="mt-4">こちらは現在開発中のアプリです。</p>
      </div>

      {step < prompts.length ? (
        <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">{prompts[step].label} - {prompts[step].question}</h2>
          <p className="text-sm text-gray-800 mb-4">{prompts[step].sub}</p>
          <textarea
            className="w-full p-2 border rounded-md mb-2 text-black placeholder-gray-400 bg-white"
            rows={4}
            value={responses[step]}
            onChange={handleChange}
            placeholder="ここに書いてください..."
          />
          {gptReplies[step] && <p className="text-green-700 text-sm mb-2">GPT: {gptReplies[step]}</p>}
          <button
            onClick={handleNext}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "送信中..." : "次へ"}
          </button>
        </div>
      ) : (
        <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4 text-black">今日のあなたの五輪</h2>
          <ul className="text-sm list-disc list-inside text-black">
            {prompts.map((prompt, i) => (
              <li key={i} className="mb-2">
                <strong>{prompt.label}</strong>: {responses[i]}<br />
                GPT: {gptReplies[i]}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setStep(0);
              setResponses(Array(prompts.length).fill(""));
              setGptReplies(Array(prompts.length).fill(""));
            }}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
