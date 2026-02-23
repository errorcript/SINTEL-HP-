const { parsePhoneNumberWithError } = require('libphonenumber-js');
const axios = require('axios');
const cheerio = require('cheerio');

async function getPhoneInfo(number) {
    try {
        const phoneNumber = parsePhoneNumberWithError(number, 'ID');
        return {
            valid: phoneNumber.isValid(),
            formatted: phoneNumber.formatInternational(),
            country: phoneNumber.country,
            carrier: phoneNumber.carrier || 'Unknown',
            type: phoneNumber.getType() || 'Unknown'
        };
    } catch (e) {
        return { valid: false, error: e.message };
    }
}

async function searchScamDB(number) {
    // This is a placeholder for real scraper logic.
    // In a real scenario, we would search cekrekening.id or kredibel.co.id
    // But since they have protections, we do a "Google Dorking" search.

    const dorks = [
        `" ${number} " penipu`,
        `" ${number} " scam`,
        `site:kredibel.co.id "${number}"`,
        `site:facebook.com "${number}" penipu`,
        `site:twitter.com "${number}" penipu`
    ];

    return dorks;
}

module.exports = {
    getPhoneInfo,
    searchScamDB
};
