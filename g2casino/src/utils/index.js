import moment from "moment";
import {names} from "@/utils/datas";

export const formatDate = (dateString,type) => {
    const formattedDate = moment(dateString).format(type ? type : "YY.MM.DD");
    return formattedDate;
}
export const converTime = (timestamp, type) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    if (type) {
        return `${moment(timestamp * 1000).format("DD.MM.YY")}`
    } else {
        return `${formattedDate} ${formattedTime}`
    }
}
export const convertMoney = (money) => {
    return parseInt(money ?? 0).toLocaleString('en')
}

// export const generateRandomName = () => {
//     const randomIndex = Math.floor(Math.random() * names.length);
//     return names[randomIndex];
// }
//
// export const generateRandomNumber = () => {
//     const min = 10000;
//     const max = 1000000;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// export const generateRandomOnline = () => {
//     const min = 3000;
//     const max = 6000;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }