import { encryptDataV2, decryptData } from "@/utils/encrypt";

const setCookie = (name, value, exp) => {
    deleteCookie(name);
    let date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + encryptDataV2(value) + ';expires=' + date.toUTCString() + ';path=/';
};

const getCookie = (name, noDecrypt) => {
    if(!document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')){
        return;
    }
    let value = noDecrypt ? document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')[2] : decryptData(document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')[2]);
    return value;
};


const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
}

export {
    setCookie,
    getCookie,
    deleteCookie,
}