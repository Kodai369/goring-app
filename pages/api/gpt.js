export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input } = req.body;

  try {
    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "あなたは禅僧のようなGPTです。短く、詩的に、優しく、質問に応えます。"
          },
          {
            role: "user",
            content: input
          }
        ]
      }),
    });

    const data = await gptResponse.json();
    const reply = data.choices?.[0]?.message?.content || "応答が得られませんでした。";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "GPTとの通信に失敗しました。" });
  }
}
