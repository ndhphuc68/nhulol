import CryptoJS from "crypto-js";

const encryptDataV1 = (plaintext) => {
    let _plaintext = plaintext.toString();
    const iv       = CryptoJS.enc.Utf8.parse("0123456789012345");
    const key      = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901");
    const cipher   = CryptoJS.AES.encrypt(_plaintext, key, {
        iv      : iv,
        mode    : CryptoJS.mode.CBC,
        keySize : 256 / 32,
        padding : CryptoJS.pad.Pkcs7,
    });
    return cipher.toString();
}

const encryptDataV2   = (plaintext) => {
    let _plaintext = typeof plaintext == 'object' ? JSON.stringify(plaintext) : plaintext.toString();
    const iv       = CryptoJS.enc.Hex.parse("0000000000000000");
    const key      = CryptoJS.enc.Utf8.parse("q2CboW862kuTrBwLl8xmUwXXXXXXXX==");
    const cipher   = CryptoJS.AES.encrypt(_plaintext, key, {
        iv      : iv,
        mode    : CryptoJS.mode.CBC,
        keySize : 256 / 32,
        padding : CryptoJS.pad.Pkcs7,
    });
    // console.log(cipher.toString());
    return cipher.toString();
};

const decryptData = (_plaintext) => {
    const iv  = CryptoJS.enc.Hex.parse("0000000000000000");
    const key = CryptoJS.enc.Utf8.parse("q2CboW862kuTrBwLl8xmUwXXXXXXXX==");
    const cipher        = CryptoJS.AES.decrypt(_plaintext, key, {
        iv      : iv,
        mode    : CryptoJS.mode.CBC,
        keySize : 256 / 32,
        padding : CryptoJS.pad.Pkcs7,
    });
    let decryptedUtf8 = null;
    try{
        decryptedUtf8 = cipher.toString(CryptoJS.enc.Utf8);
    }catch (e){
        console.error(e)
    }
    try {
        return JSON.parse(decryptedUtf8);
    } catch (e) {
        return decryptedUtf8;
    }
}

const decryptDataV2 = (_plaintext) => {
    const iv  = CryptoJS.enc.Hex.parse("0000000000000000");
    const key = CryptoJS.enc.Utf8.parse("q2CboW862kuTrBwLl8xmUwXXXXXXXX==");
    const cipher        = CryptoJS.AES.decrypt(_plaintext, key, {
        iv      : iv,
        mode    : CryptoJS.mode.CBC,
        keySize : 256 / 32,
        padding : CryptoJS.pad.Pkcs7,
    });
    let decryptedUtf8 = null;
    try{
        decryptedUtf8 = cipher.toString(CryptoJS.enc.Utf8);
    }catch (e){
        console.error(e)
    }
    try {
        return JSON.parse(decryptedUtf8);
    } catch (e) {
        return decryptedUtf8;
    }
}


const decryptUrlData = (_plaintext) => {
    if (!_plaintext) {
        return "null";
    }
    // eslint-disable-next-line
    _plaintext = setStrPad(_plaintext.replaceAll('-', '+').replaceAll('_','/'),_plaintext.length % 4, '=', 'STR_PAD_RIGHT');
    const iv     = CryptoJS.enc.Hex.parse("0000000000000000");
    const key    = CryptoJS.enc.Utf8.parse("C105E791-F4F8-48C8-AC83-B550B3871C8A".slice(0, 32));
    const cipher = CryptoJS.AES.decrypt(_plaintext, key, {
        iv      : iv,
        mode    : CryptoJS.mode.CBC,
        keySize : 256 / 32,
        padding : CryptoJS.pad.Pkcs7,
    });
    let decryptedUtf8 = null;
    try {
        decryptedUtf8 = cipher.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        decryptedUtf8 = JSON.parse(decryptedUtf8);
    }
    return decryptedUtf8;
}

export {
    encryptDataV1,
    encryptDataV2,
    decryptData,
    decryptDataV2,
    decryptUrlData
}