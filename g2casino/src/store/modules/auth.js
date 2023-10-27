const state = {
    auth: null,
    activeGuideMenu: 0,
    activePickGame: 0,
};

const getters = {};

const mutations = {
    handleLogin (state,payload) {
        return    state.auth = payload
    },
    handleActiveGuideMenu(state, number) {
        return (state.activeGuideMenu = number);
    },
    handleActivePickGame(state, number) {
        return (state.activePickGame = number);
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions,
    getters
};