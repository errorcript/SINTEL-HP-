const axios = require('axios');
const cheerio = require('cheerio');

async function getWaProfile(number) {
    // Convert to international format if starts with 0
    let cleanNum = number.replace(/[^0-9]/g, '');
    if (cleanNum.startsWith('0')) cleanNum = '62' + cleanNum.substring(1);

    try {
        const url = `https://api.whatsapp.com/send?phone=${cleanNum}`;
        const res = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
            },
            timeout: 5000
        });

        const $ = cheerio.load(res.data);
        const ogImage = $('meta[property="og:image"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content');

        // WhatsApp metadata usually displays the name/status in title
        return {
            exists: true,
            profilePic: ogImage || null,
            about: ogTitle || 'Tidak ada info publik'
        };
    } catch (e) {
        return { exists: false, error: 'Gagal fetch metadata WA' };
    }
}

module.exports = { getWaProfile };
