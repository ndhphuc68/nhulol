import { createStore } from 'vuex'
import request from '@/store/modules/request';
import user from '@/store/modules/user';
import cms from '@/store/modules/cms';

import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        err: undefined
    },
    mutations: {
        setErr: (state, payload) => {
            state.err = payload
            setTimeout(() => {
                state.err = undefined
            }, 3000);
        }
    },
    getters: {
        getErr: (state) => {
            return state.err;
        }
    },
    actions: {
    },
    modules: {
        request, user, cms
    },
    plugins: [
        createPersistedState({
            paths: ["user"]
        }),
        createPersistedState({
            paths: ["cms"]
        })
    ]
})
