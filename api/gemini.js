export default async function handler(req, res) {
  // Only allow POST requests from your website
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Send the request to Gemini securely using your hidden API key in Vercel
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: req.body.message }] }]
      })
    });

    const data = await response.json();
    
    // Extract the AI's response and send it back to your HTML frontend
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reach Gemini' });
  }
}
