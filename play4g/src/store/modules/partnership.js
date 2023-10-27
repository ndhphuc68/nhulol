import { getPartnershipRequest } from "@/api/partnership/request"

const state = {
    data: {}
}

const getters = {
    getDepositMax(state) {
        return Number(state.data?.DEPOSIT_MAX_MONEY) || 9999999999
    },
    getDepositMin(state){
        return Number(state.data?.DEPOSIT_MIN_MONEY) || 10000
    },
    getWithdrawMax(state) {
        return Number(state.data?.WITHDRAW_MAX_MONEY) || 9999999999
    },
    getWithdrawMin(state){
        return Number(state.data?.WITHDRAW_MIN_MONEY) || 10000
    },
}

const mutations = {
    handleUpdatePartnership(state, payload) {
        state.data = payload
    }
}

const actions = {
    async getPartnershipAction({commit}) {
        const res = await getPartnershipRequest()
        if(res?.is_success) {
            commit("handleUpdatePartnership", res)
        }
        else {
            console.log(res?.message)
        }
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}