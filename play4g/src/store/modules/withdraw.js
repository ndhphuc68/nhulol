import {
    getListWithDrawRequest,
    withdrawListRealTime,
    withdrawRequest,
    deleteWithDrawRequest
} from "@/api/withdraw/request"
import {convertMoney, generateRandomName, generateRandomNumber} from '../../utils'
import store from "@/store";
import i18n from "@/locales/i18n";

const state = {
    listWithDraw: null,
    listWithDrawRealTime: [],
    check: false
}

const getters = {
    getListWithDrawRealTime(state) {
        // if (state.listWithDrawRealTime.length > 0) {
            while (state.listWithDrawRealTime.length < 35) {
                state.listWithDrawRealTime.push({
                    wi_member_nickname: generateRandomName(),
                    wi_created: new Date(),
                    wi_money: convertMoney(generateRandomNumber())
                })
            }
            if (state.listWithDrawRealTime.length % 2 === 0) {
                state.listWithDrawRealTime.push({
                    wi_member_nickname: generateRandomName(),
                    wi_created: new Date(),
                    wi_money: convertMoney(generateRandomNumber())
                })
            }
        // }
        return state.listWithDrawRealTime
    },
    totalAmountWithDraw(state) {
        let total = 0
        state.listWithDraw?.forEach(e => total = total + e.wi_money)
        return total
    }
}

const mutations = {
    handleUpdateListWithDraw(state, payload) {
        if (state.listWithDraw != null && state.listWithDraw?.length) {
            if ((state.listWithDraw[0].wi_idx === payload[0]?.wi_idx) && (state.listWithDraw[0].wi_status !== payload[0]?.wi_status)) {
                payload[0]?.wi_status === 'COMPLETED' ? store.dispatch('showAlert', {
                    type: 'success',
                    message: i18n.global.t('withdrawRequestApproved'), //WITHDRAW REQUEST Approved
                }) : store.dispatch('showAlert', {
                    type: 'error',
                    message: i18n.global.t('withdrawRequestCanceled'), //WITHDRAW REQUEST CANCELED
                })

                state.check = true;
            }
        }
        state.listWithDraw = [...payload];
    },
    handleUpdateListWithDrawRealTime(state, payload) {
        state.listWithDrawRealTime = [...payload]
    },
    handleWithDrawCheck(state) {
        state.check = false
    }
}

const actions = {
    async getListWithDrawAction({commit}, data) {
        const res = await getListWithDrawRequest(data)
        if (res?.is_success) {
            commit("handleUpdateListWithDraw", res?.list)
        } else {
            /*alert(res?.message)*/
            commit("handleUpdateListWithDraw", [])
        }
    },
    async withdrawAction({commit}, data) {
        const res = await withdrawRequest(data)
        return res
    },
    async withdrawListRealTimeAction({commit}) {
        const res = await withdrawListRealTime();
        if (res?.is_success) {
            commit("handleUpdateListWithDrawRealTime", res.list);
        } else {
            console.log(res?.message);
        }
    },
    async deleteWithdrawAction({dispatch}, {idx, data}) {
        const res = await deleteWithDrawRequest(idx, data)
        if (res?.is_success) {
            dispatch('getListWithDrawAction', data)
        } else {
            console.log(res?.message)
        }
        return res
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}