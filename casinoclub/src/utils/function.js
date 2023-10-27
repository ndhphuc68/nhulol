import moment from "moment";

export const formatDate = (dateString) => {
    return moment(dateString, 'DD/MM/YYYY').format("YY/MM/DD");
}
export const convertMoney = (money) => {
    return parseInt(money).toLocaleString('en')
}

export const convertTime = (timestamp, type) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    if (type) {
        return `${moment(timestamp * 1000).format("DD.MM.YY")}`
    } else {
        return `${formattedDate} ${formattedTime}`
    }
}