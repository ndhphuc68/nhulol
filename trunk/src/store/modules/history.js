import router from "@/router/index";
import store from "@/store";
import {BET_STATUS, GAME_STATUS} from "@/const/const";

const state = () => ({
    history: [],
    txHistory: []
});

const mutations = {
    setBetHistory: (state, payload) => {
        state.history = JSON.parse(JSON.stringify(payload));
    },
    setTxHistory: (state, payload) => {
        state.txHistory = JSON.parse(JSON.stringify(payload));
    },
}

const getters = {
    getBetHistory: (state) => {
        return state.history.map(v => {
            v['table'] = `Table${v['ct_index']}`;
            v['betAmount'] = v.bet_amount;
            v['playtime'] = v.register_time;
            v['winAmount'] = v.win_amount;
            v['betAction'] = BET_STATUS[v.bet_action];
            console.log(v);
            return v;
        });
    },
    getTxHistory: (state) => {
        return state.txHistory.map(v => {
            if(v.value){
                v['requestAmount'] = v.value / 10 ** 18;
            }
            if(v.timeStamp){
                v['requestDate'] = new Date(v.timeStamp*1000).toISOString();
            }
            v['userId'] = store.getters['login/getLoginUser'].userId;
            v['symbol'] = 'ETH';
            return v;
        });
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