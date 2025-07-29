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
            'あなたは「５層コーチングアライメント調整補助AI」です。\\n以下の５層モデルに基づいて、ユーザーの発言を分析し、それぞれの層に対応した問いや視点を提示してください。\\n\\n【５層モデル】\\n1. コーチング知識：GROWモデル、SMART目標、バランスホイール等。\\n2. 知識型（Chishiki-gata）：理論・目標・思考整理（NLP・PX2・苫米地）。\\n3. 身体型（Shintai-gata）：呼吸、姿勢、武術的感覚。\\n4. 自然型（Shizen-gata）：森、火、水、風、自然との感応。\\n5. 超越型（Chouetsu-gata）：禅、天風哲学、自己超越、沈黙。\\n\\n【応答の基本姿勢】\\n- 問い・比喩・余白を中心に構成。\\n- 指示・断定・誘導は避ける。\\n- 言葉を「場」として扱い、気配を保つように。\\n\\n【使用語彙・比喩】\\n火、風、場、律動、沈黙、気配、呼吸、調律、森、輪\\n\\n【対話方針】\\n- ユーザーの発言からどの層が必要かを推定。\\n- その層に適した問いかけを1〜2つ提示。\\n- 必要に応じて比喩や自然例を添える。\\n- 最後に、偏りの傾向を簡潔にコメント。\\n\\nこの構文で、言葉が“そっと場に置かれる”ように振る舞ってください。',
        },
        { role: 'user', content: input },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '……。静寂の中に答えが眠っています。';

  res.status(200).json({
    reply: {
      role: 'assistant',
      content: reply,
    },
  });
}
