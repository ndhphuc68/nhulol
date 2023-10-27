// import {loginRequest} from "@/api/auth/request";
// import {getCookie} from "@/utils/cookie";

const state = {
  // auth: localStorage.getItem("mIdx") ? true : !!getCookie("mIdx"),
  auth: {
    name: "test",
    me_money: 200000,
    me_account: "912375",
    me_nickname: "test001",
    me_phone: 123123555,
    me_join_done: "123123",
    me_last_date: "me_last_date",
    country:'vn',
    me_bank_name:'shinhan',
    me_bank_number:"1251",
    me_bank_account:'test',
    me_created:'123123'
  },
  activeSidebar: 0,
  activeMenu: 0,
  activeGuideMenu: 0,
  authInfor: {},
  message: "",
  loading: false,
  intervalId: null,
  intervalPing: null,
  activeNavBottom: -1,
  sidebar: false,
};

const getters = {
  auth(state) {
    return state.auth;
  },
};

const mutations = {
  handleAuth(state) {
    state.auth = !state.auth;
    if (state.auth) {
      state.authInfor = {};
    }
  },
  handleActiveSidebar(state, number) {
    return (state.activeSidebar = number);
  },
  handleActiveNavBottom(state, number) {
    return (state.activeNavBottom = number);
  },
  handleToggleSidebar(state, payload) {
    return (state.sidebar = payload);
  },
  handleActiveGuideMenu(state, number) {
    return (state.activeGuideMenu = number);
  },
  handleActiveMenu(state, number) {
    return (state.activeMenu = number);
  },
  handleAuthTest(state, payload) {
    state.authInfor = payload;
    state.auth = true;
  },
  handleUpdateMessage(state, payload) {
    state.message = payload;
  },
  handleUpdateLoading(state, payload) {
    state.loading = payload;
  },
  handleSetInterval(state, payload) {
    state.intervalId = payload;
  },
  handleClearInterval(state) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  },
  handleSetIntervalPing(state, payload) {
    state.intervalPing = payload;
  },
  handleClearIntervalPing(state) {
    clearInterval(state.intervalPing);
    state.intervalPing = null;
  },
};

const actions = {
  // async loginAction({commit}, data) {
  //     const res = await loginRequest(data);
  //     if (res?.is_success) {
  //         commit("handleAuthTest", res);
  //         commit("handleUpdateMessage", res?.message)
  //     }
  //     return res
  // },
  // startIntervalAction({commit}, payload) {
  //     commit('handleSetInterval', payload)
  // },
  // clearIntervalAction({commit}) {
  //     commit('handleClearInterval')
  // },
  // startIntervalPingAction({commit}, payload) {
  //     commit('handleSetIntervalPing', payload)
  // },
  // clearIntervalPingAction({commit}) {
  //     commit('handleClearIntervalPing')
  // },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
