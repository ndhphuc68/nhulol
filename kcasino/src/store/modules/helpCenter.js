import {
  getListHelpRequest,
  deleteHelpCenterRequest,
} from "@/api/helpCenter/request";
import store from "@/store";
import i18n from "@/locales/i18n";

const state = {
  listHelp: null,
  check: false,
};

const getters = {};

const mutations = {
  handleUpdateListHelp(state, payload) {
    if (state.listHelp != null && state.listHelp?.length && payload) {
      state.listHelp.forEach((e) => {
        const check = payload?.find(
          (val) => val.cu_idx === e.cu_idx && val.cu_status !== e.cu_status
        );
        if (check) {
          state.check = true;
          store.dispatch("showAlert", {
            type: "success",
            message: i18n.global.t("helpCenterRequest"),
          });
        }
      });
    }
    state.listHelp = [...payload];
  },
  handleHelpCenterCheck(state) {
    state.check = false;
  },
  clearHelpCenter(state) {
    state.listHelp = null;
  },
};

const actions = {
  async getListHelpAction({ commit }, data) {
    const res = await getListHelpRequest(data);
    if (res?.is_success) {
      commit("handleUpdateListHelp", res?.list);
    } else {
      commit("handleUpdateListHelp", []);
      /*alert(res?.message)*/
    }
  },
  async deleteHelpCenterAction({ dispatch }, { idx, data }) {
    const res = await deleteHelpCenterRequest(idx, data);
    if (res?.is_success) {
      dispatch("getListHelpAction", data);
    } else {
      console.log(res?.message);
    }
    return res;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
