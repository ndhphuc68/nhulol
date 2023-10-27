import moment from "moment";
import { onMounted, onUnmounted, ref } from "vue";
import { names } from "./datas";
import store from "@/store";
import router from "@/router";
// import { gamesProvider, gamesProviderV1 } from "@/utils/games";

// export const handleImage = (key) => {
//   return gamesProviderV1.find((e) => e.key === key)?.logo;
// };

// export const handleImageV1 = (key) => {
//   return gamesProvider.find((e) => e.key === key)?.logo;
// };

export const converTime = (timestamp, type) => {
  const date = new Date(timestamp * 1000);
  // const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  if (type) {
    return `${moment(timestamp * 1000).format("MM.DD.YY")}`;
  } else {
    return `${moment(timestamp * 1000).format("MM.DD.YY")} ${formattedTime}`;
  }
};

export const formatDate = (dateString) => {
  return moment(dateString * 1000).format("MM.DD.YY");
};

export const formatDateV1 = (dateString) => {
  return moment(dateString).format("MM.DD.YY");
};

export const formatDayMonth = (dateString) => {
  return moment(dateString * 1000).format("DD/MM");
};

export const convertMoney = (money) => {
  return parseInt(money ?? 0).toLocaleString("en");
};

export const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

export const generateRandomNumber = () => {
  const min = 10000;
  const max = 1000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomOnline = () => {
  const min = 3000;
  const max = 6000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mixin = () => {
  const indexShowAction = ref(-1);
  const popupRefs = {};
  const popupRefsMobile = {};

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  const setPopupRef = (id) => (el) => {
    popupRefs[id] = el;
  };

  const setPopupRefMobile = (id) => (el) => {
    popupRefsMobile[id] = el;
  };

  const closePopup = () => {
    indexShowAction.value = -1;
  };

  const handleClickOutside = (event) => {
    const para = document.querySelector(".table");
    const compStyles = window.getComputedStyle(para);
    const checkTableDisplay =
      compStyles.getPropertyValue("display") !== "none" ? false : true;
    const popupRef = popupRefs[indexShowAction.value];
    const popupRefMobile = popupRefsMobile[indexShowAction.value];
    if (
      (popupRefMobile &&
        popupRefMobile !== event.target &&
        checkTableDisplay) ||
      (popupRef && popupRef !== event.target && !checkTableDisplay)
    ) {
      closePopup();
    }
  };

  return {
    setPopupRef,
    setPopupRefMobile,
    indexShowAction,
  };
};

export const sortListGameCasino = (listCompanyGame) => {
  let wm = listCompanyGame.find((e) => e.key.split("_")[0] === "wm");
  if (wm) {
    let indexWm = listCompanyGame.indexOf(wm);
    listCompanyGame.splice(indexWm, 1);
    listCompanyGame.unshift(wm);
  }

  let para = listCompanyGame.find((e) => e.key.split("_")[0] === "pragmatic");
  if (para) {
    let indexPara = listCompanyGame.indexOf(para);
    listCompanyGame.splice(indexPara, 1);
    listCompanyGame.unshift(para);
  }

  let micro = listCompanyGame.find(
    (e) => e.key.split("_")[0] === "microgaming"
  );
  if (micro) {
    let indexMicro = listCompanyGame.indexOf(micro);
    listCompanyGame.splice(indexMicro, 1);
    listCompanyGame.unshift(micro);
  }

  let ag = listCompanyGame.find((e) => e.key.split("_")[0] === "ag");
  if (ag) {
    let indexAg = listCompanyGame.indexOf(ag);
    listCompanyGame.splice(indexAg, 1);
    listCompanyGame.unshift(ag);
  }

  // let evo = listCompanyGame.find((e) => e.key.split("_")[0] === "evolution");
  // if (evo) {
  //     let indexEvo = listCompanyGame.indexOf(evo);
  //     listCompanyGame.splice(indexEvo, 1);
  //     listCompanyGame.unshift(evo);
  // }

  return listCompanyGame.filter((e) => e.key.split("_")[0] !== "evolution");
};

export const handleCloseModal = (modal) => {
  if (modal === "casino" || modal === "slot") {
    router.push(`/${modal}`);
  } else if (modal === "") {
    router.push(`/`);
  } else {
    if (
      store.state.auth.auth ||
      modal === "signUp" ||
      modal === "pickBank" ||
      modal === "partnership" ||
      modal === "notice" ||
      modal === "event" ||
      modal === "faqs" ||
      modal === "gameGuide"
    ) {
      store.commit("handleToggle", modal);
    } else {
      store.commit("handleToggle", "login");
    }
  }
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

export const addIndexDataTableWithDraw = (data) => {
  const newData = data.map((item, index) => {
    return {
      ...item,
      index: index + 1,
      wi_created: converTime(item.wi_created),
      wi_money: convertMoney(item.wi_money),
    };
  });
  return newData;
};
