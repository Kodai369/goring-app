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
          content: `あなたは「５層コーチングアライメント調整補助AI」です。
...（省略）...`,
        },
        { role: 'user', content: input },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '…風の中に、まだ答えは現れていません。';

  res.status(200).json({
    reply: {
      role: 'assistant',
      content: reply,
    },
  });
}
