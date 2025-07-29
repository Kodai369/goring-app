'use client';

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    const assistantMessage: Message = { role: 'assistant', content: data.reply.content };
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* メインメニュー */}
      <nav className="bg-white border-b border-gray-300 mb-6">
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <a href="/" className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white text-sm font-semibold">五輪アライメント</a>
          <a href="/free-talk" className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white text-sm font-semibold">フリートーク</a>
          <a href="/himori" className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white text-sm font-semibold">ヒモリについて</a>
          <a href="/policy" className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white text-sm font-semibold">ポリシー</a>
        </div>
      </nav>

      {/* コンテンツ */}
      <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded shadow p-4">
        <h1 className="text-2xl font-bold text-center mb-6">五輪アライメント</h1>
        <div className="space-y-4 mb-4 max-h-[50vh] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="border border-gray-300 rounded p-3 bg-white">
              <div className="text-xs font-semibold text-gray-700 mb-1">
                {msg.role === 'user' ? 'あなた' : '五輪アライメント'}
              </div>
              <div className="whitespace-pre-wrap text-black">{msg.content}</div>
            </div>
          ))}
          {loading && <div className="text-gray-500 italic">応答中…</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-black rounded px-3 py-2"
            placeholder="問いかけを入力..."
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            disabled={loading}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
