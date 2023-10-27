import {
  getListMessageRequest,
  deleteMessageRequest,
  readMessageRequest,
} from "@/api/message/request";
import store from "@/store";
import i18n from "@/locales/i18n";

const state = {
  listMessage: [],
  check: false,
};

const getters = {
  countMessage(state) {
    return state.listMessage.length;
  },
};

const mutations = {
  handleUpdateListMessage(state, payload) {
    if (state.listMessage != null && state.listMessage?.length) {
      if (
        state.listMessage.length < payload.length &&
        payload[0]?.mm_read_date === 0
      ) {
        store.dispatch("showAlert", {
          type: "success",
          message: i18n.global.t("messageCheck"), //MESSAGE CHECK
        });
      }
    }
    const checkMes = payload?.filter((e) => e.mm_read_date === 0);
    if (checkMes.length > 0) {
      state.check = true;
    }
    state.listMessage = [...payload];
  },
  handleMessageCheck(state) {
    state.check = false;
  },
};

const actions = {
  async getListMessageAction({ commit }, data) {
    const res = await getListMessageRequest(data);
    if (res?.is_success) {
      commit("handleUpdateListMessage", res?.list);
    } else {
      commit("handleUpdateListMessage", []);
      /*alert(res?.message)*/
    }
  },
  async deleteMessageAction({ dispatch }, { idx, data }) {
    const res = await deleteMessageRequest(idx, data);
    if (res?.is_success) {
      dispatch("getListMessageAction", data);
    } else {
      console.log(res?.message);
    }
    return res;
  },
  async readMessageAction({ dispatch }, { idx, data }) {
    const res = await readMessageRequest(idx, data);
    if (res?.is_success) {
      dispatch("getListMessageAction", data);
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
