const state = {
    auth: null,
    activeSidebar: 0,
    activeNavBottom: -1,
    sidebar: false,
    activeGameGuide: 0,
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
        state.sidebar = payload
    },
    handleActiveGameGuide(state, payload) {
        return state.activeGameGuide = payload;
    },
};

const actions = {}
export default {
    state,
    getters,
    mutations,
    actions,
};
