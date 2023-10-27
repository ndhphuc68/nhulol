import store from "@/store";
import router from "@/router";
import moment from "moment";
import { ElNotification } from "element-plus";

export const handleCloseModal = (modal) => {
  if (modal === "home" || modal === "liveCasino" || modal === "slotGame") {
    router.push(`/${modal}`);
  } else {
    store.commit("handleToggle", modal);
  }
};

//format date
export const formatDate = (date, typeDate) => {
  if (!typeDate) {
    typeDate = "DD.MM.YYYY";
  }
  return moment(date).format(typeDate);
};

//format money
export const convertMoney = (money) => {
  return parseInt(money).toLocaleString("en");
};

// show notification success
export const showNotificationSuccess = (message) => {
  ElNotification({
    title: "Success",
    message: message,
    type: "success",
    duration: 3000,
  });
};

// show notification error
export const showNotificationError = (message) => {
  ElNotification({
    title: "Error",
    message: message,
    type: "error",
    duration: 3000,
  });
};

// add index data table

export const addIndexDataTable = data => {
  const newData = data.map((item,index) => {
    return {...item, index: index+1}
})
return newData
}
