import {createStore} from "vuex";
import modal from "@/store/modal";
import auth from "@/store/auth"
import toast from '@/store/toast'

const store = createStore({
    state() {
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        modal,
        auth,
        toast
    }
})

export default store