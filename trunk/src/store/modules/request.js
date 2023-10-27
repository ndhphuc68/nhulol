import { metagAxios } from '@/plugins/axios/axios';
import { endPoints } from "@/repository/repository";
import store from '@/store';

const state = {
    callStack: []
}

const mutations = {
    setStackRequest: (state, payload) => {
        let findRequest = state.callStack.find(stack => stack.url == payload.url);
        if(findRequest){
            findRequest.error = undefined;
            findRequest.success = false;
            findRequest.pending = true;
        } else {
            state.callStack.push(payload);
        }
    },
    setStackStatus: (state, payload) => {
        let findRequest = state.callStack.find(stack => stack.url == payload.url);
        findRequest.error = undefined;
        findRequest.success = true;
        findRequest.pending = false;
    }
}

const getters = {
    getCallStack: (state) => {
        return state.callStack;
    }
}

const actions = {
    call: async ({ state }, payload = { flag: undefined, params: {}, headers: {}, payload: {} }) => {
        if(!payload.flag){
            return;
        }

        let ep = typeof endPoints[payload.flag] == 'function' ? endPoints[payload.flag](payload.fnConfig.flag, payload.fnConfig.data) : endPoints[payload.flag];
        const res = await metagAxios.post(ep.url, payload.params, {
            headers: {
                'Content-Type': ep?.$setting?.contentType || 'application/x-www-form-urlencoded'
            },
            ...ep?.$setting
        });

        return res;
    },
    get: async ({ state }, payload = { flag: undefined, endpoint: '', headers: {}, payload: {} }) => {
        if(!payload.flag){
            return;
        }
        const res = await metagAxios.get(`${endPoints[payload.flag].url}${payload.endpoint}`, {
            headers: {
                'Content-Type': endPoints[payload.flag]?.$setting?.contentType || 'application/x-www-form-urlencoded'
            },
            ...endPoints[payload.flag]?.$setting
        });

        return res;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}