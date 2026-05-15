export default async function handler(req, res) {

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbzbzL0GlyAiIjpuyKBgqtFhd3KCIJ3qyHKwq2kiKHz3f9NwSyUB-gm5vyzW09Wb8Tha/exec";

  const activityType =
    req.query.activityType || "";

  const url =
    `${GAS_URL}?action=getActivityConfig&activityType=${activityType}`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error: "Failed",
    });

  }
}