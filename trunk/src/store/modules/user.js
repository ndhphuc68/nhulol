const loginUserVar = () => {
    return {
        userInfo: {},
        sessionId: undefined
    }
}

const state = () => (loginUserVar());

const mutations = {
    setSessionId: (state, payload) => {
        state.sessionId = payload;
    },
    setUserInfo: (state, payload) => {
        state.userInfo = payload;
        //console.log('setUserInfo');
        //console.log(state.userInfo);
    },
    setInitUserInfo: (state, payload) => {
        Object.entries(loginUserVar()).forEach(v => {
            state[v[0]] = v[1];
        });
    }
}

const getters = {
    getSessionId: (state) => {
        return state.sessionId;
    },
    getUserInfo: (state) => {
        return state.userInfo?.member || {};
    },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
