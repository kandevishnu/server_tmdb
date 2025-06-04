const axios = require('axios');

module.exports = async (req, res) => {
  const { path, ...query } = req.query;

  if (!path) return res.status(400).json({ error: 'Path is required' });

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: query,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
