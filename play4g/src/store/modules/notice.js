import { getNotifyMessageRequest } from "@/api/notifyMessage/request";
import { getCookie } from "@/utils/cookie";

const state = {
  list: null,
  idxActiveContent: null,
  activeTab:0
};

const getters = {
  getNotice: (state) =>
    state.list?.filter((item) => item?.no_type === "NOTICE_SITE"),
  getFAQ: (state) =>
    state.list?.filter((item) => item?.no_type === "NOTICE_FAQ"),
  getEvent: (state) =>
    state.list?.filter((item) => item?.no_type === "NOTICE_EVENT"),
  getPopup: (state) =>
    state.list?.filter((item) => item?.no_type === "NOTICE_POPUP"),
  lengthPopup: function (state) {
    const dataPopUp = state.list?.filter(
      (item) => item?.no_type === "NOTICE_POPUP" && item?.no_status === "ACTIVE"
    );
    if (dataPopUp && dataPopUp.length > 0) {
      const dataCookie = getCookie("MDS");
      // check cookies if there are any popups to show by day
      if (dataCookie) {
        let count = 0;
        dataPopUp.forEach((e) => {
          const check = dataCookie.find((val) => val.no_idx === e.no_idx);
          if (check) {
            return new Date() > check.dataCreate && count++;
          } else {
            count++;
          }
        });
        return count;
      } else {
        return dataPopUp.length;
      }
    } else {
      return 0;
    }
  },
};

const mutations = {
  handleUpdateListNotice(state, payload) {
    state.list = [...payload];
  },
  handleActiveContent(state, payload) {
    state.idxActiveContent = payload;
  },
  handleActiveTab(state, payload) {
    state.activeTab = payload;
  },
  handleUpdateNoticeListPopUp(state, payload) {
    state.list = [...payload];
  },
};

const actions = {
  // async getPartnershipAction({ commit }) {
  //   const res = await getNotifyMessageRequest();
  //   if (res?.is_success) {
  //     commit("handleUpdateListNotice", res?.list);
  //   } else {
  //     console.log(res?.message);
  //     commit("handleUpdateListNotice", []);
  //   }
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};