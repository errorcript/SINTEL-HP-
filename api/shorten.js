const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL required' });

    try {
        const response = await axios.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
        return res.status(200).json(response.data);
    } catch (e) {
        return res.status(500).json({ error: 'Shortening failed', shorturl: url });
    }
};
