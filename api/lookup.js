const { getPhoneInfo } = require('../lib/scanner');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: 'Nomor HP wajib diisi ngab!' });
    }

    try {
        const info = await getPhoneInfo(number);
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
