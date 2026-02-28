const { parsePhoneNumberWithError } = require('libphonenumber-js');
const truecallerjs = require('truecallerjs');
const getHLR = require('./hlr');
const { getWaProfile } = require('./whatsapp');
const { checkBankScam } = require('./bank');

async function getPhoneInfo(number) {
    try {
        const phoneNumber = parsePhoneNumberWithError(number, 'ID');
        let truecallerData = null;

        // Coba narik nama pakai Truecaller (Butuh process.env.TC_INSTALLATION_ID di Vercel nanti)
        if (process.env.TC_INSTALLATION_ID) {
            try {
                const searchData = {
                    number: phoneNumber.formatInternational(),
                    countryCode: phoneNumber.country,
                    installationId: process.env.TC_INSTALLATION_ID
                };
                const tcResult = await truecallerjs.search(searchData);
                if (tcResult && tcResult.data && tcResult.data[0]) {
                    truecallerData = tcResult.data[0].name || 'Tidak ditemukan nama asli';
                }
            } catch (err) {
                // Jangan error out kalau truecaller gagal
                truecallerData = 'Gagal mengambil data dari Truecaller';
            }
        } else {
            truecallerData = 'TC_INSTALLATION_ID belum diset (skip doxxing otomatis)';
        }

        // Prediksi Wilayah Asal Nomor (HLR)
        const hlrRegion = getHLR(number);

        // Fetch WhatsApp Profile
        const waInfo = await getWaProfile(number);

        // Check Scam DBs
        const scamInfo = await checkBankScam(number);

        return {
            valid: phoneNumber.isValid(),
            formatted: phoneNumber.formatInternational(),
            country: phoneNumber.country,
            carrier: phoneNumber.carrier || 'Unknown',
            type: phoneNumber.getType() || 'Unknown',
            hlrRegion: hlrRegion,
            truecallerName: truecallerData,
            whatsapp: waInfo,
            scamStatus: scamInfo
        };
    } catch (e) {
        return { valid: false, error: e.message };
    }
}

async function searchScamDB(number) {
    // Dork search automation logic.
    // Nanti kalau di Vercel ini tinggal balikin array of dorks.
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const dorks = [
        `" ${cleanNumber} " penipu OR scam`,
        `site:kredibel.co.id "${cleanNumber}"`,
        `site:facebook.com "${cleanNumber}" penipu`,
        `site:twitter.com "${cleanNumber}" penipu`,
        `" ${cleanNumber} " (laporan OR kasus OR transfer)`
    ];
    return dorks;
}

module.exports = {
    getPhoneInfo,
    searchScamDB
};
