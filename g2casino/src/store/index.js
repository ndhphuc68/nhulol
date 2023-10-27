import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import modal from "@/store/modules/modal";
import deposit from "@/store/modules/deposit"
import notice from "@/store/modules/notice";
import withdrawal from "@/store/modules/withdrawal";

const store = createStore({
    state() {
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        auth,
        modal,
        deposit,
        notice,
        withdrawal
    }
})

export default store