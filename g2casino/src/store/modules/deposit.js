// import {
//     depositListRealTime,
//     depositRequest,
//     getListDepositRequest,
//     deleteDepositRequest,
// } from "@/api/deposit/request";
import {convertMoney, generateRandomName, generateRandomNumber} from "@/utils";
import store from "@/store";
import i18n from "@/locales/i18n";

const state = {
    listDeposit: null,
    listDepositRealTime: [],
    check: false
}
// const getters = {
//     getListDepositRealTime(state) {
//         while (state.listDepositRealTime.length < 35) {
//             state.listDepositRealTime.push({
//                 de_member_nickname: generateRandomName(),
//                 de_created: new Date(),
//                 de_money: convertMoney(generateRandomNumber())
//             })
//         }
//         if (state.listDepositRealTime.length % 2 === 0) {
//             state.listDepositRealTime.push({
//                 de_member_nickname: generateRandomName(),
//                 de_created: new Date(),
//                 de_money: convertMoney(generateRandomNumber())
//             })
//         }
//         return state.listDepositRealTime
//     },
//     totalAmountDeposit(state) {
//         let total = 0
//         state.listDeposit?.forEach(e => total = total + e.de_money)
//         return total
//     }
// };

const mutations = {
    handleUpdateListDeposit(state, payload) {
        if (state.listDeposit != null && state.listDeposit?.length) {
            if ((state.listDeposit[0].de_idx === payload[0]?.de_idx) && (state.listDeposit[0].de_status !== payload[0]?.de_status)) {
                payload[0]?.de_status === 'COMPLETED' ? store.dispatch('showAlert', {
                    type: 'success',
                    message: i18n.global.t('depositRequestApproved'), //DEPOSIT REQUEST SUCCESS
                }) : store.dispatch('showAlert', {
                    type: 'error',
                    message: i18n.global.t('depositRequestCanceled'), //DEPOSIT REQUEST CANCELED
                })
                state.check = true;
            }
        }
        state.listDeposit = [...payload];
    },
    handleUpdateListDepositRealTime(state, payload) {
        state.listDepositRealTime = [...payload];
    },
    handleDepositCheck(state) {
        state.check = false
    }
}

// const actions = {
//     async getListDepositAction({commit}, data) {
//         const res = await getListDepositRequest(data);
//         if (res?.is_success) {
//             commit("handleUpdateListDeposit", res?.list);
//         } else {
//             commit("handleUpdateListDeposit", []);
//         }
//     },
//     async depositAction({commit}, data) {
//         const res = await depositRequest(data);
//         return res
//     },
//     async depositListRealTimeAction({commit}) {
//         const res = await depositListRealTime();
//         if (res?.is_success) {
//             commit("handleUpdateListDepositRealTime", res.list);
//         } else {
//             console.log(res?.message);
//         }
//     },
//     async deleteDepositAction({dispatch}, {idx, data}) {
//         const res = await deleteDepositRequest(idx, data)
//         if (res?.is_success) {
//             dispatch('getListDepositAction', data)
//         } else {
//             console.log(res?.message)
//         }
//         return res
//     }
// }

export default {
    state,
    // getters,
    mutations,
    // actions,
};
