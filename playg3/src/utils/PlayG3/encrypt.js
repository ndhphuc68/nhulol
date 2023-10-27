import CryptoJS from "crypto-js";

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