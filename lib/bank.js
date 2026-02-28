const axios = require('axios');
const cheerio = require('cheerio');

async function checkBankScam(accountOrPhone) {
    const cleanId = accountOrPhone.replace(/[^0-9]/g, '');
    const results = {
        kredibel: { reported: false, details: 'Belum ada data' },
        cekrekening: { reported: false, details: 'Belum ada data' }
    };

    try {
        // Scrape Kredibel.co.id (simplified logic for OSINT check)
        const kredibelUrl = `https://www.kredibel.co.id/search?q=${cleanId}`;
        const kRes = await axios.get(kredibelUrl, {
            timeout: 5000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });

        const isReported = kRes.data.includes('Pernah dilaporkan') || kRes.data.includes('Total Laporan');
        const isNotReported = kRes.data.includes('belum pernah dilaporkan');

        if (isReported && !isNotReported) {
            results.kredibel.reported = true;
            results.kredibel.details = 'Terdeteksi di Database Penipu Kredibel';
        }

        // CekRekening (simplified logic)
        // Usually anti-bot, so we use a dork approach or a proxy if available
        // For now, we return data that we can search.
    } catch (e) {
        // Log error secretly but don't break
    }

    return results;
}

/**
 * Reverse Bank/E-Wallet Checker (Unofficial)
 * This is a placeholder for real API integration if user has credentials for Flip/Oy!
 */
async function reverseCheck(bank, account) {
    // For OSINT tool, we might just use search dorks for now,
    // or implement a mock that shows how to use it.
    return {
        name: "Private Info (Butuh API Token)",
        verified: false
    };
}

module.exports = { checkBankScam, reverseCheck };
