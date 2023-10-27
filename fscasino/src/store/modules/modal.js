const state = {
  toggleShow: {
    login: false,
    signup: false,
    bank: false,
    user: false,
    helpCenter: false,
    createHelp: false,
    deposit: false,
    withdraw:false,
    gameGuide:false,
    event: false,
    message: false,
    depositHistory: false,
    withdrawHistory:false
  },
};

const getters = {};

const mutations = {
  handleToggle(state, payload) {
    state.toggleShow[payload] = !state.toggleShow[payload];
    const check = Object.values(state.toggleShow).filter((e) => e);
    if (check.length === 0) {
      document.querySelector("html").style.overflowY = "scroll";
    } else {
      document.querySelector("html").style.overflowY = "hidden";
    }
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
