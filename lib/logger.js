const axios = require('axios');

async function createTrackingLink(destinationUrl) {
    // We can use bitly or a similar service to make it look legit, 
    // but Grabify is the standard for tracking.
    // Since we don't have an API key for specialized services, 
    // we provide a manual generation helper.

    return {
        grabify: `https://grabify.link/track/${Buffer.from(destinationUrl).toString('base64').substring(0, 8)}`,
        suggestion: "Kirim link ini ke penipu dengan alasan 'Bukti Transfer' atau 'Cek Alamat Paket'."
    };
}

module.exports = {
    createTrackingLink
};
