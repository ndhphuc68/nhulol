import router from "@/router/index";
import store from "@/store";

const activeRoundVar = () => {
    return {
        "serial": 0,
        "id": 0,
        "binggo": undefined,
        "betClose": 0,
        "timesClose": 0,
        "betCloseLimitTime": 0,
        "betTotalCount": 0,
        "winTotalCount": 0,
        "betTotalAmount": 0,
        "winTotalAmount": 0,
        "commission": undefined,
        "betCloseTime": undefined,
        "timesCloseTime": undefined,
        "adjustmentStatus": 0,
        "adjustmentTime": undefined,
        "regDt": undefined,
        'status': undefined,
    }
}

const state = () => ({
    activeRound: activeRoundVar()
});

const mutations = {
    setActiveRound: (state, payload) => {
        state.activeRound = JSON.parse(JSON.stringify({
            ...payload,
            status: payload?.betClose == 1 ? 'open' : 'end'
        }));
    },
    initActiveRound: (state) => {
        state.activeRound = activeRoundVar();
    }
}

const getters = {
    getActiveRound: (state) => {
        return state.activeRound;
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