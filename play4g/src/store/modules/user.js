import {getMeRequest, changeProfileRequest} from "@/api/user/request";
import { convertMoney } from "@/utils";
import {SSRRequest} from "@/api/axios";
import i18n from "@/locales/i18n";

const state = {
    userInfor:{}
}

const getters = {
    getUserInfor(state) {
        return state.userInfor
    }
}

const mutations = {
    async updateUserInfor(state,payload) {
        state.userInfor = payload;

        if(state.userInfor.me_partnership_code != null)
        {
            let result = await  getSettlementInfo();
            state.userInfor.partnerSettleAmount = 0;
            state.userInfor.partnerSettleAmount = convertMoney(result);
        }
    },
    resetUser(state) {
        state.userInfor = {}
    }
}

const actions = {
    async getMeAction({commit},data) {
        const res = await getMeRequest(data)
        if(res?.is_success) {
            if(res.member.me_money == 0){
                let amount = res?.member?.all_games_amount.reduce((a, b) => a + b.mg_money, 0);
                res.member.me_money = amount;
            }
            commit("updateUserInfor", res?.member)
        }
        else {
            /*alert(res?.message)*/
        }
    },
    async changeProfileAction({dispatch}, data) {
        const res = await changeProfileRequest(data)
        if(res?.is_success) {
            dispatch("showAlert",{
                type:"success",
                message: i18n.global.t("changeProfileSuccess"),
            })
            await dispatch("getMeAction")
        }
        else {
            // console.log(res?.error_code)
            switch (res?.error_code.toString()) {
                case ("-10000012"||"-10000008") :
                    dispatch("showAlert",{
                        type:"error",
                        message: i18n.global.t("errorCode-10000008"),
                    })
                    break;
                case "-10000006":
                    dispatch("showAlert",{
                        type:"error",
                        message: i18n.global.t("errorCode-10000006"),
                    })
                    break;
                case "-100000009":
                    dispatch("showAlert",{
                        type:"error",
                        message: i18n.global.t("errorCode-10000009"),
                    })
                    break;
                default:
                    dispatch("showAlert",{
                        type:"error",
                        message: i18n.global.t("errorCode-10000007"),
                    })
            }
        }
        return res
    }
}

const getSettlementInfo = async () => {
    const res = await SSRRequest({
        url: '/api/partnership/settlement_info',
        method: 'POST'
    });

    let _amount = undefined;

    if(res?.data == undefined){
        return 0;
    }

    let  n_casino_bets_amount = res?.data.targetPartner.n_casino_bets_amount;
    let  n_casino_lose_amount = res?.data.targetPartner.n_casino_lose_amount;
    let  n_slot_bets_amount = res?.data.targetPartner.n_slot_bets_amount;
    let  n_slot_lose_amount = res?.data.targetPartner.n_slot_lose_amount;

    _amount = n_casino_bets_amount + n_casino_lose_amount +  n_slot_bets_amount + n_slot_lose_amount;

    return _amount;
}


export default {
    state,
    getters,
    mutations,
    actions
}