import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import modal from "@/store/modules/modal";

const store = createStore({
    state() {
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        auth,
        modal
    }
})

export default store