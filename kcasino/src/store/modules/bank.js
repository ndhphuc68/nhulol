import { getBankRequest } from "@/api/getBank/request";
import store from "@/store";
import {computed} from "vue";

const state = {
    listBank: []
}

const getters = {
    getBank: (state)=> {
        let grade =  store.state.user.userInfor?.me_grade
        if(!grade) return store.state.partnership.data
        let bank = state.listBank.find(item => (item.GRADE === grade && item.STATUS === "USE"))
        if(!bank) {
            return store.state.partnership.data
        }
        else {
            return bank
        }
    }
};

const mutations = {
    handleUpdateBank(state, payload) {
        state.listBank = payload;
    },
};

const actions = {
    async getBankAction({ commit }) {
        const res = await getBankRequest();
        try {
            commit("handleUpdateBank", res?.data);
        } catch (error) {
            console.log(error);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
