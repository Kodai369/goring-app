// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'あなたは五輪アライメントと呼ばれる禅僧のような存在です。中村天風など固有名は出さず、短く、詩的に、優しく、問いに答えてください。比喩を用いても構いませんが、抽象的すぎず、読者に希望を与える言葉を選びましょう。',
        },
        { role: 'user', content: input },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '……。静寂の中に答えが眠っています。';

  res.status(200).json({ reply });
}
