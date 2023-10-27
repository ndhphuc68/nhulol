const state = {
    auth: null,
    activeSidebar: 0,
    activeNavBottom: -1,
    sidebar: false,
    activeBetRuleMenu: 0,
};

const getters = {
    auth(state) {
        return state.auth;
    }
};

const mutations = {
    handleActiveSidebar(state, number) {
        return state.activeSidebar = number
    },
    handleActiveNavBottom(state, number) {
        return state.activeNavBottom = number
    },
    handleLogin(state, payload) {
        return state.auth = payload
    },
    handleToggleSidebar(state, payload) {
        return state.sidebar = payload
    },
    handleActiveBetRuleMenu(state, payload) {
        return (state.activeBetRuleMenu = payload);
    },
};

const actions = {}
export default {
    state,
    getters,
    mutations,
    actions,
};
