export default async function handler(req, res) {
  const { email, password } = req.query;

  const GAS_URL = "https://script.google.com/macros/s/AKfycbzbzL0GlyAiIjpuyKBgqtFhd3KCIJ3qyHKwq2kiKHz3f9NwSyUB-gm5vyzW09Wb8Tha/exec";

  const url = `${GAS_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  try {
    const response = await fetch(url);

    const text = await response.text(); // 👈 IMPORTANT
    console.log("RAW RESPONSE:", text);

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON from GAS",
        raw: text,
      });
    }

  } catch (error) {
    return res.status(500).json({ error: "Fetch failed" });
  }
}