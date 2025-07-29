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
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">五輪アライメント</h1>
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-4">
        <div className="space-y-4 mb-4 max-h-[50vh] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-100 rounded p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">
                {msg.role === 'user' ? 'あなた' : '五輪アライメント'}
              </div>
              <div className="whitespace-pre-wrap text-gray-800">{msg.content}</div>
            </div>
          ))}
          {loading && <div className="text-gray-400 italic">応答中…</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="問いかけを入力..."
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            disabled={loading}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
