import moment from "moment";

export const formatDate = (dateString,type) => {
    const formattedDate = moment(dateString).format(type ? type : "YY.MM.DD");
    return formattedDate;
}
export const convertMoney = (money) => {
    return parseInt(money).toLocaleString('en')
}
