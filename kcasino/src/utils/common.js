// import CryptoJS from "crypto-js";
// import pako     from "pako";

/**
 * 윈도우 크기에 맞게 사이즈 조절.
 *
 * @ param window 이벤트 type
 * @ param 사이즈 조절 할 대상
 * @ return 없음
 * @ exception
 */
const windowSetScale = (event, resizeObject) => {
    let scaleSize = 1;
    let clientAspectRatio = 1920 / 1080;
    let innerWidth = event.target.innerWidth;
    let innerHeight = event.target.innerHeight;

    if(innerHeight * clientAspectRatio <= innerWidth)
    {
        scaleSize = innerHeight / 1080;
    }
    else
    {
        scaleSize = innerWidth / 1920;
    }
    if(resizeObject.value){
        resizeObject.value.style.transform = `scale(${scaleSize})`;
    }
}

const decompression = (uncompressed) => {
    if(!uncompressed){
        return;
    }
    const _atob          = atob(uncompressed);
    const array          = _atob.split("").map(x => x.charCodeAt(0));
    const byteArray      = new Uint8Array(array);
    const inflate        = pako.inflate(byteArray);
    const byteArrayAscii = String.fromCharCode.apply(null, new Uint16Array(inflate));
    return btoa(byteArrayAscii);
};

/**
 * 모바일인지 웹인지 판단하는 함수
 *
 * @ return 모바일 true / 웹 false
 * @ exception
 */
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 문자열의 공백,영어, 특수기호 등을 제거 후 숫자로만 반환해주는 함수
 *
 * @ param any
 * @ return Number
 * @ exception NaN, null, undefined 등은 0으로 반환 / 특수기호 . 이 두개이상일경우 0으로 반환됨.
 */
const setOnlyNumber = (value) => {
    if(!value) return 0;
    const CHECK_SPACE = /\s+/;
    const CHECK_ENGLISH = /[a-zA-Z]/;
    const CHECK_SPECIAL_SYMBOLS = /[~!@#\#$%<>^&*,]/;

    if(!CHECK_SPACE.test(value) && !CHECK_ENGLISH.test(value) && !CHECK_SPECIAL_SYMBOLS.test(value)) return Number(value);
    let splitStr = [...value];

    splitStr.map((str, idx) => {
        if(CHECK_SPACE.test(str) || CHECK_ENGLISH.test(str) || CHECK_SPECIAL_SYMBOLS.test(str)) {
            return splitStr[idx] = '';
        }else {
            return str;
        }
    })

    let _value = splitStr.join('');

    if(checkNaN_Infinity(_value)) return Number(_value);
    else return 0;
}

/**
 * param 이 NaN이거나 InFinity인 지 체크하는 함수
 *
 * @ param any
 * @ return Number or 0
 * @ exception NaN이거나 InFinity일 경우 0 / 그렇지 않으면 Number 반환
 */
const checkNaN_Infinity = (data) => Number.isNaN(Number(data)) === true || Number.isFinite(Number(data)) === false ? 0 : Number(data);

/**
 * param 첫 글자만 대문자로 바꿔주는 함수
 *
 * @ param String
 * @ return String
 * @ exception
 */
const capitalizeString = (string) => {
    if(!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const getMoneySymbol = (num) => {
    let digits = 2;
    let si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const setNumberFormat = (value) => {
    if (!/^[-0-9]/g.test(value)) {
        return value;
    }
    let str = '';
    let amount = '';
    let decimal = '';

    if(String(value).indexOf('.') > -1){
        amount = String(value).split('.')[0].replace(/[^\d]+/g, "").replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
        decimal = String(value).split('.')[1];
        str = `${amount}.${decimal}`
    } else if(String(value).indexOf('-') > -1){
        str = `-${String(value).replace(/[^\d]+/g, "").replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")}`;
    } else {
        str = String(value).replace(/[^\d]+/g, "").replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    }

    return str;
}

const sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
}
// eslint-disable-line camelcase
//  discuss at: https://locutus.io/php/array_pad/
// original by: Waldo Malqui Silva (https://waldo.malqui.info)
//   example 1: array_pad([ 7, 8, 9 ], 2, 'a')
//   returns 1: [ 7, 8, 9]
//   example 2: array_pad([ 7, 8, 9 ], 5, 'a')
//   returns 2: [ 7, 8, 9, 'a', 'a']
//   example 3: array_pad([ 7, 8, 9 ], 5, 2)
//   returns 3: [ 7, 8, 9, 2, 2]
//   example 4: array_pad([ 7, 8, 9 ], -5, 'a')
//   returns 4: [ 'a', 'a', 7, 8, 9 ]
let pad = []
const fillArray = (input, padSize, padValue) => {
    const newArray = []
    let newLength
    let diff = 0
    let i = 0
    if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
        newLength = ((padSize < 0) ? (padSize * -1) : padSize)
        diff = newLength - input.length
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                newArray[i] = padValue
            }
            pad = ((padSize < 0) ? newArray.concat(input) : input.concat(newArray))
        } else {
            pad = input
        }
    }
    return pad
}
const setStrPad = (input, padLength, padString, padType) => {
    let half = ''
    let padToGo
    const _strPadRepeater = function (s, len) {
        let collect = ''
        while (collect.length < len) {
            collect += s
        }
        collect = collect.substr(0, len)
        return collect
    }
    input += ''
    padString = padString !== undefined ? padString : ' ';
    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
        padType = 'STR_PAD_RIGHT'
    }
    if ((padToGo = padLength - input.length) > 0) {
        if (padType === 'STR_PAD_LEFT') {
            input = _strPadRepeater(padString, padToGo) + input
        } else if (padType === 'STR_PAD_RIGHT') {
            input = input + _strPadRepeater(padString, padToGo)
        } else if (padType === 'STR_PAD_BOTH') {
            half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
            input = half + input + half
            input = input.substr(0, padLength)
        }
    }
    return input
};

const decryptUrlData = (_plaintext) => {
    if (!_plaintext) {
        return "null";
    }
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

// 팝업창 옵션
var getPopOptions2 = function (width, height, num) {
    var rtnVal;
    var nWidth = width;
    var nHeight = height;
    let nLeft = (document.body.offsetWidth / 2) - (width / 2);
    let nTop = (document.body.offsetHeight / 2) - (height / 2);

    nLeft +=  (window.screenLeft + (width * (num-1)));

    var strOption = '';
    strOption += 'left=' + nLeft + 'px,';
    strOption += 'top=' + nTop + 'px,';
    strOption += 'width=' + nWidth + 'px,';
    strOption += 'height=' + nHeight + 'px,';
    strOption += 'toolbar=no, status=no, menubar=no, resizable=yes, location=no scrollbars=yes';

    rtnVal = strOption;
    return rtnVal;
};

const getPopupFooter = (id) => {
    return `<div style="display: flex; gap: 10px; margin-bottom: 10px; position: absolute; bottom: 0;">
            <button id="cookieBtn${id}">1일동안 안보기</button>
            <button id="btn${id}">닫기</button>
        </div>`
}



const utils = {
    windowSetScale,
    isMobile,
    setOnlyNumber,
    setNumberFormat,
    getMoneySymbol,
    capitalizeString,
    sleep,
    fillArray,
    decompression,
    decryptUrlData,
    getPopOptions2,
    getPopupFooter,
}


export {
    utils
}