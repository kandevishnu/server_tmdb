export default async function handler(req, res) {
  // Allow requests from any origin (for development)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests (for CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path, ...query } = req.query;

  const queryString = new URLSearchParams(query).toString();
  const fullUrl = `https://api.themoviedb.org/3/${path}?${queryString}`;

  try {
    const tmdbRes = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        accept: 'application/json',
      },
    });

    const data = await tmdbRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TMDB data" });
  }
}
