import store from '@/store';

const state = () => ({
    cmsInfo: [],
    redisData: {},
    configData: {}
});

const mutations = {
    setCmsInfo: (state, data) => {
        state.activeRound = data;
    },
    setRedisData: (state, data) => {
        state.redisData = data;
    },
    setConfigData: (state, data) => {
        state.configData = data;
    }
}

const getters = {
    getRedisData: (state) => {
        return state.redisData;
    },
    getConfigData: (state) => {
        return state.configData;
    }
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