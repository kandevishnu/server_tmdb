// File: /api/tmdb.js or /pages/api/tmdb.js

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    res.status(204).end(); // No content for preflight
    return;
  }

  // Extract TMDB path
  const { path } = req.query;
  if (!path) {
    res.status(400).json({ error: 'Missing path query parameter' });
    return;
  }

  const decodedPath = decodeURIComponent(path);
  const tmdbUrl = `https://api.themoviedb.org/3/${decodedPath}`;

  try {
    const tmdbResponse = await fetch(tmdbUrl, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`, // Your token in Vercel environment
      },
    });

    const data = await tmdbResponse.json();

    // CORS headers for actual response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from TMDB' });
  }
}
