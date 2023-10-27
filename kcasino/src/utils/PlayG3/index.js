import moment from "moment";

export const converTime = (timestamp, type) => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  if (type) {
    return `${moment(timestamp * 1000).format("MM.DD.YY")}`;
  } else {
    return `${moment(timestamp * 1000).format("MM.DD.YY")} ${formattedTime}`;
  }
};

export const convertMoney = (money) => {
  return parseInt(money ?? 0).toLocaleString("en");
};

export const formatDate = (dateString) => {
  const formattedDate = moment(dateString).format("MM.DD.YY");
  return formattedDate;
}

export const formatDayMonth = (dateString) => {
  const formattedDate = moment(dateString).format("MM/DD");
  return formattedDate;
};
export const addIndexDataTable = (data) => {
  const newData = data.map((item, index) => {
    return {
      ...item,
      index: index + 1,
      de_created: converTime(item.de_created),
      de_money: convertMoney(item.de_money),
    };
  });
  return newData;
};
