import { reactive } from 'vue';
import store from '@/store';
import {confirmPasswordShow, toggleShow} from "@/utils/modals";
import {notify} from "@kyvg/vue3-notification";
import {utils} from "@/utils/common";
import { fn as listFn  } from '@/views/list/list.js'
import i18n from '@/i18n'
import {themeUtils} from "@/const/themeData";
const { t } = i18n.global;

let intervalDeposit, intervalFirstCheckDeposit;
let intervalWithdraw, intervalFirstCheckWithdraw;

const transactionForm = () => {
    return {
        Money: 0,
        Name: '',
        IsAndroid: true,
        WidthDrawPass: ''
    }
}

const data = {
    frm: reactive(transactionForm()),
    buttons: [
        { key: 'amount1', value: 10000 },
        { key: 'amount2', value: 30000 },
        { key: 'amount3', value: 50000 },
        { key: 'amount4', value: 100000 },
        { key: 'amount5', value: 300000 },
        { key: 'amount6', value: 500000 },
        { key: 'amount7', value: 1000000 },
    ],
    realTimeList: reactive({
        dailyDeposit: [],
        dailyWithdraw: []
    }),
    setList: reactive({
        dailyDeposit: [],
        dailyWithdraw: []
    }),
    requestList: reactive({
        requestDeposit: [],
        requestWithdraw: []
    }),
    newMessage: reactive({
        deposit: false,
        withdraw: false,
    }),
    buttons_cn: [
        { key: 'amount1', value: 50 },
        { key: 'amount2', value: 100 },
        { key: 'amount3', value: 500 },
        { key: 'amount4', value: 1000 },
        { key: 'amount5', value: 3000 },
        { key: 'amount6', value: 5000 },
        { key: 'amount7', value: 10000 },
    ],
}

const fn = {
    deposit: async () => {
        const res = await store.dispatch('request/call', { flag: 'deposit', params: data.frm });
       if(res?.is_success == false){
           themeUtils.ShowMessagePopup(res.message);
           /*notify({
               group: 'transaction',
               title: t('notice'),
               text: res.message,
               position: "bottom center",
               type: 'warn', // success warn error  default
           });*/
       }
       else{
           themeUtils.ShowMessagePopup(t('request_deposit_msg1'));
          /* notify({
               group: 'transaction',
               title:  t('notice'),
               text: t('request_deposit_msg1'),
               type: 'default', // success warn error  default
               position:'top center',
           });*/
           clearInterval(intervalDeposit);
           fn.getDepositListRequest();
       }
    },
    withdraw: async () => {
        if(data.frm.Name.length <= 0){
            themeUtils.ShowMessagePopup(t('withdrawNoName'));
            /*notify({
                group: 'transaction',
                title:  t('notice'),
                text: t('withdrawNoName'),
                type: 'warn', // success warn error  default
                position:'top center',
            });*/
            return;
        }

        const listRes = await store.dispatch('request/call', { flag: 'withdrawList', params: {} });
        if(listRes.list != 'undefined'){
            data.requestList.requestWithdraw = listRes.list;
            //REQUEST,  PROCESS, COMPLETED,  ADMIN_CANCEL
            if(data.requestList.requestWithdraw != null ) {
                if (data.requestList.requestWithdraw[0].wi_status == 'REQUEST') {
                    themeUtils.ShowMessagePopup(t('withdraw_error'));
                    /*notify({
                        group: 'transaction',
                        title: t('notice'),
                        text: t('withdraw_error'),
                        type: 'warn', // success warn error  default
                        position: 'top center',
                    });*/
                    return;
                }
            }
        }

        const res = await store.dispatch('request/call', { flag: 'withdraw', params: data.frm });
        if(res?.is_success == false){
            themeUtils.ShowMessagePopup(res.message);
            /*notify({
                group: 'transaction',
                title:  t('notice'),
                text: res.message,
                type: 'warn', // success warn error  default
                position:'top center',
            });*/
        }
        else{
            themeUtils.ShowMessagePopup(t('request_withdraw_msg1'));
           /* notify({
                group: 'transaction',
                title:  t('notice'),
                text: t('request_withdraw_msg1'),
                type: 'default', // success warn error  default
                position:'top center',
            });*/
            clearInterval(intervalWithdraw);
            fn.getWithdrawListRequest();
            await store.dispatch('request/call', { flag: 'balance', params: {} });
        }
    },
    getDepositListRealTime: async () => {
        const res = await store.dispatch('request/call', { flag: 'depositListRealTime', params: {} });
        data.realTimeList.dailyDeposit = res.list;

        if(data.setList.dailyDeposit.length > 0)
        {
            const length = 20;
            for(let i=0; i<length; ++i){
                let clone = JSON.parse(JSON.stringify(data.setList.dailyDeposit[i]));
                clone.de_idx = i+1;
                clone.de_member_nickname = "user****";
                data.realTimeList.dailyDeposit.push( clone );
            }
        }
    },
    setDepositList: async () => {
        if(data.realTimeList.dailyDeposit == null || data.realTimeList.dailyDeposit.length <= 0)
            return;

        const length = 20;
        for(let i=0; i<length; ++i){
            let clone = JSON.parse(JSON.stringify(data.realTimeList.dailyDeposit[0]));
            clone.de_idx = i+1;
            clone.de_member_nickname = "user****";
            let temp = Math.floor(Math.random() * 1000000) + 3000;
            temp = utils.setNumberFormat(Math.floor(temp/10000) * 10000);
            clone.de_money = temp;
            data.setList.dailyDeposit.push( clone );
            data.realTimeList.dailyDeposit.push( clone );
        }
    },
    getWithdrawListRealTime: async () => {
        const res = await store.dispatch('request/call', { flag: 'withdrawListRealTime', params: {} });
        data.realTimeList.dailyWithdraw = res.list;

        if(data.setList.dailyWithdraw.length > 0)
        {
            const length = 20;
            for(let i=0; i<length; ++i){
                let clone = JSON.parse(JSON.stringify(data.setList.dailyWithdraw[i]));
                clone.wi_idx = i+1;
                clone.wi_member_nickname = "user****";
                data.realTimeList.dailyWithdraw.push( clone );
            }
        }
    },
    setWithdrawList: async () => {
        if(data.realTimeList.dailyWithdraw == null || data.realTimeList.dailyWithdraw.length <= 0)
            return;

        const length = 20;
        for(let i=0; i<length; ++i){
            let clone = JSON.parse(JSON.stringify(data.realTimeList.dailyWithdraw[0]));
            clone.wi_idx = i+1;
            clone.wi_member_nickname = "user****";
            let temp = Math.floor(Math.random() * 1000000) + 3000;
            temp = utils.setNumberFormat(Math.floor(temp/10000) * 10000);
            clone.wi_money = temp;
            data.setList.dailyWithdraw.push( clone );
            data.realTimeList.dailyWithdraw.push( clone );
        }
    },
    clickAmountBtn: (payload, enableAmount) => {
        data.frm.Money = payload.value == 0 ? 0 : data.frm.Money + payload.value;

        //console.log("enableAmount : " +  Number(enableAmount));
        //console.log("data.frm.Money : " + Number(data.frm.Money));

        if(Number(data.frm.Money) > Number(enableAmount))
        {
            data.frm.Money = enableAmount;
        }
    },
    initDataFrm: () => {
        data.frm = reactive(transactionForm());
    },

    //**로그인 후  입금 요청리스트에  request 상태가 있으면 작동**
    checkDepositListRequest: async () => {
        const resCheck = await store.dispatch('request/call', {flag: 'depositList', params: {}});

        if(void 0 === resCheck?.list || resCheck?.list== null)
            return;

        if( resCheck.list[0].de_status == 'REQUEST' ){
            intervalFirstCheckDeposit = setInterval(async () => {
                if(store.getters['user/getSessionId'] == undefined){
                    clearInterval(intervalFirstCheckDeposit);
                    return;
                }
                const res = await store.dispatch('request/call', {flag: 'depositList', params: {}});
                data.requestList.requestDeposit = res.list;
                if(data.requestList.requestDeposit[0].de_status == 'COMPLETED'  ){
                    clearInterval(intervalFirstCheckDeposit);
                    themeUtils.ShowMessagePopup(t('deposit_result_completed'));
                    /*notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('deposit_result_completed'),
                        type: 'success', // success warn error  default
                        position:'top center',
                    });*/
                    data.newMessage.deposit = true;
                    await store.dispatch('request/call', { flag: 'balance', params: {} });
                }
                else if(data.requestList.requestDeposit[0].de_status == 'ADMIN_CANCEL'){
                    clearInterval(intervalFirstCheckDeposit);
                    themeUtils.ShowMessagePopup(t('deposit_result_cancel'));
                    /*notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('deposit_result_cancel'),
                        type: 'error', // success warn error  default
                        position:'top center',
                    });*/
                    data.newMessage.deposit = true;
                }
            }, 5000);
        }
    },
    //**로그인 후  출금 요청리스트에  request 상태가 있으면 작동**
    checkWithdrawListRequest: async () => {
        const resCheck = await store.dispatch('request/call', { flag: 'withdrawList', params: {} });
        if(void 0 === resCheck?.list || resCheck?.list== null)
        //if(resCheck.list == 'undefined' || resCheck.list== null)
            return;

        if( resCheck.list[0].wi_status == 'REQUEST' ) {
            intervalFirstCheckWithdraw = setInterval(async () => {
                if(store.getters['user/getSessionId'] == undefined){
                    clearInterval(intervalFirstCheckWithdraw);
                    return;
                }
                const res = await store.dispatch('request/call', {flag: 'withdrawList', params: {}});
                data.requestList.requestWithdraw = res.list;
                if (data.requestList.requestWithdraw[0].wi_status == 'COMPLETED') {
                    clearInterval(intervalFirstCheckWithdraw);
                    themeUtils.ShowMessagePopup(t('withdraw_result_completed'));
                    /*notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('withdraw_result_completed'),
                        type: 'success', // success warn error  default
                        position: 'top center',
                    });*/
                    data.newMessage.withdraw = true;
                    await store.dispatch('request/call', { flag: 'balance', params: {} });
                    //list 갱신
                    //await listFn.getList('withdrawList');
                } else if (data.requestList.requestWithdraw[0].wi_status == 'ADMIN_CANCEL') {
                    clearInterval(intervalFirstCheckWithdraw);
                    themeUtils.ShowMessagePopup(t('withdraw_result_cancel'));
                    /*notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('withdraw_result_cancel'),
                        type: 'error', // success warn error  default
                        position: 'top center',
                    });*/
                    data.newMessage.withdraw = true;
                   //await listFn.getList('withdrawList');
                }
            }, 5000);
        }
    },

    getDepositListRequest: () => {
        intervalDeposit = setInterval(async () => {
            if(store.getters['user/getSessionId'] == undefined){
                clearInterval(intervalDeposit);
                return;
            }

            const res = await store.dispatch('request/call', {flag: 'depositList', params: {}});
            if(res.list == 'undefined')
                return;

            data.requestList.requestDeposit = res.list;
                        //REQUEST,  PROCESS, COMPLETED,  ADMIN_CANCEL
            if(data.requestList.requestDeposit[0].de_status == 'COMPLETED'  ){
                    clearInterval(intervalDeposit);
                themeUtils.ShowMessagePopup(t('deposit_result_completed'));
                   /* notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('deposit_result_completed'),
                        type: 'success', // success warn error  default
                        position:'top center',
                    });*/
                    data.newMessage.deposit = true;
                    await listFn.getList('depositList');
                    await store.dispatch('request/call', { flag: 'balance', params: {} });
            }
            else if(data.requestList.requestDeposit[0].de_status == 'ADMIN_CANCEL'){
                    clearInterval(intervalDeposit);
                themeUtils.ShowMessagePopup(t('deposit_result_cancel'));
                   /* notify({
                        group: 'transaction',
                        title:  t('notice'),
                        text: t('deposit_result_cancel'),
                        type: 'error', // success warn error  default
                        position:'top center',
                    });*/
                    data.newMessage.deposit = true;
                    await listFn.getList('depositList');
                }
        }, 5000);
    },

    getWithdrawListRequest: () => {
        intervalWithdraw = setInterval(async () => {
            if(store.getters['user/getSessionId'] == undefined){
                clearInterval(intervalWithdraw);
                return;
            }

            const res = await store.dispatch('request/call', { flag: 'withdrawList', params: {} });
            if(res.list == 'undefined')
                return;

            data.requestList.requestWithdraw = res.list;
                 //REQUEST,  PROCESS, COMPLETED,  ADMIN_CANCEL
            if(data.requestList.requestWithdraw[0].wi_status == 'COMPLETED'  ){
                clearInterval(intervalWithdraw);
                themeUtils.ShowMessagePopup(t('withdraw_result_completed'));
                /*notify({
                    group: 'transaction',
                    title:  t('notice'),
                    text: t('withdraw_result_completed'),
                    type: 'success', // success warn error  default
                    position:'top center',
                });*/
                data.newMessage.withdraw = true;
                await listFn.getList('withdrawList');
                await store.dispatch('request/call', { flag: 'balance', params: {} });
            }
            else if(data.requestList.requestWithdraw[0].wi_status == 'ADMIN_CANCEL'){
                clearInterval(intervalWithdraw);
                themeUtils.ShowMessagePopup(t('withdraw_result_cancel'));
                /*notify({
                    group: 'transaction',
                    title:  t('notice'),
                    text: t('withdraw_result_cancel'),
                    type: 'error', // success warn error  default
                    position:'top center',
                });*/
                data.newMessage.withdraw = true;
                await listFn.getList('withdrawList');
            }
        }, 5000);
    },

    checkWithdrawPassword: async () => {
        if(data.frm.Name.length <= 0){
            themeUtils.ShowMessagePopup(t('withdrawNoName'));
            /*notify({
                group: 'transaction',
                title:  t('notice'),
                text: t('withdrawNoName'),
                type: 'warn', // success warn error  default
                position:'top center',
            });*/
            return;
        }

        data.frm.WidthDrawPass = fn.getWithdrawPass();

        confirmPasswordShow({key: 'withdrawPass', data: data.frm.WidthDrawPass});
    },

    getWithdrawPass:  () => {
        return store.getters['user/getUserInfo']?.me_bank_number;
    }
}


export {
    data,
    fn
}