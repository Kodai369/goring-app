'use client';

import { useState } from "react";

// ...（prompts や fetchGPTResponse のコードはそのままでOK）

export default function Home() { // ← ここが HomePage になっていると NG
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
