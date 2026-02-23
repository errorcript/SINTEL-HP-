module.exports = function getHLR(number) {
    if(!number.startsWith('08') && !number.startsWith('628')) return "Unknown";
    let num = number.replace('+62', '0');
    if(num.startsWith('62')) num = '0' + num.substring(2);
    
    // Very basic HLR guessing for Telkomsel/Indosat based on common Indo prefixes
    const prefix = num.substring(0, 5);
    const p6 = num.substring(0, 6);
    
    // Telkomsel (0812, 0813, 0821, 0822)
    if(num.startsWith('0812') || num.startsWith('0813') || num.startsWith('0821') || num.startsWith('0822')) {
        if(p6 >= '081210' && p6 <= '081219') return 'DKI Jakarta / Banten';
        if(p6 >= '081220' && p6 <= '081229') return 'Jawa Barat';
        if(p6 >= '081230' && p6 <= '081239') return 'Jawa Timur / Bali / Nusra';
        if(p6 >= '081240' && p6 <= '081249') return 'Sulawesi / Maluku / Papua';
        if(p6 >= '081280' && p6 <= '081289') return 'DKI Jakarta';
        if(p6 >= '081310' && p6 <= '081319') return 'DKI Jakarta / Banten';
        if(p6 >= '081320' && p6 <= '081329') return 'Jawa Barat / Jawa Tengah';
        if(prefix === '08211' || prefix === '08212') return 'Jawa & Bali';
        if(prefix === '08213' || prefix === '08214') return 'Jawa Timur / Nusra';
        return 'Indonesia (Telkomsel Umum)';
    }

    // Indosat (0814, 0815, 0816, 0855, 0856, 0857, 0858)
    if(num.startsWith('0815') || num.startsWith('0856') || num.startsWith('0857')) {
        if(p6 >= '085610' && p6 <= '085619') return 'DKI Jakarta';
        if(p6 >= '085620' && p6 <= '085629') return 'Jawa Barat';
        if(p6 >= '085630' && p6 <= '085639') return 'Jawa Timur';
        if(p6 >= '085640' && p6 <= '085649') return 'Jawa Tengah / DIY';
        if(p6 >= '081510' && p6 <= '081519') return 'DKI Jakarta';
        if(p6 >= '081520' && p6 <= '081529') return 'Jawa Barat';
        return 'Indonesia (Indosat Umum)';
    }

    // XL / Axis (0817, 0818, 0819, 0859, 0877, 0878)
    if(num.startsWith('0817') || num.startsWith('0818') || num.startsWith('0819') || num.startsWith('0877') || num.startsWith('0878')) {
        if(prefix === '08171' || prefix === '08172') return 'DKI Jakarta';
        if(prefix === '08180') return 'General / Jakarta';
        return 'Indonesia (XL/Axis Umum)';
    }

    // Tri (0895, 0896, 0897, 0898, 0899)
    if(num.startsWith('089')) {
        return 'Indonesia (Tri Umum)';
    }

    // Smartfren (0881, 0882, 0883...)
    if(num.startsWith('088')) {
        return 'Indonesia (Smartfren Umum)';
    }

    return "Tidak Ditemukan Detail Wilayah";
}
