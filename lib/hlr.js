module.exports = function getHLR(number) {
    let result = { region: "Tidak Ditemukan Detail Wilayah", provider: "Unknown" };
    if (!number.startsWith('08') && !number.startsWith('628')) return result;

    let num = number.replace('+62', '0');
    if (num.startsWith('62')) num = '0' + num.substring(2);

    const prefix = num.substring(0, 5);
    const p6 = num.substring(0, 6);

    // Telkomsel
    if (num.startsWith('0812') || num.startsWith('0813') || num.startsWith('0821') || num.startsWith('0822')) {
        result.provider = "Telkomsel";
        if (p6 >= '081210' && p6 <= '081219') result.region = 'DKI Jakarta / Banten';
        else if (p6 >= '081220' && p6 <= '081229') result.region = 'Jawa Barat';
        else if (p6 >= '081230' && p6 <= '081239') result.region = 'Jawa Timur / Bali / Nusra';
        else if (p6 >= '081240' && p6 <= '081249') result.region = 'Sulawesi / Maluku / Papua';
        else if (p6 >= '081280' && p6 <= '081289') result.region = 'DKI Jakarta';
        else result.region = 'Indonesia (Telkomsel Umum)';
        return result;
    }

    // Indosat
    if (num.startsWith('0815') || num.startsWith('0856') || num.startsWith('0857')) {
        result.provider = "Indosat Ooredoo";
        if (p6 >= '085610' && p6 <= '085619') result.region = 'DKI Jakarta';
        else if (p6 >= '085620' && p6 <= '085629') result.region = 'Jawa Barat';
        else result.region = 'Indonesia (Indosat Umum)';
        return result;
    }

    // XL / Axis
    if (num.startsWith('0817') || num.startsWith('0818') || num.startsWith('0819') || num.startsWith('0877') || num.startsWith('0878') || num.startsWith('0831') || num.startsWith('0838')) {
        result.provider = num.startsWith('083') ? "Axis" : "XL Axiata";
        result.region = "Indonesia (XL/Axis Umum)";
        return result;
    }

    // Tri
    if (num.startsWith('089')) {
        result.provider = "Hutchison Tri";
        result.region = 'Indonesia (Tri Umum)';
        return result;
    }

    // Smartfren
    if (num.startsWith('088')) {
        result.provider = "Smartfren";
        result.region = 'Indonesia (Smartfren Umum)';
        return result;
    }

    return result;
}
