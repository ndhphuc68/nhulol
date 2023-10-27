import store from '@/store';
import { reactive } from 'vue';
import {notify} from "@kyvg/vue3-notification";
import i18n from '@/i18n'
import { confirmShow } from "@/utils/modals";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {themeUtils} from "@/const/themeData";
const { t } = i18n.global;

const data = reactive({
    selectedFlag:'',
    list: [],
    newMessage: reactive({
        letter: false,
        help: false,
        coupon: false,
    }),
})

let intervalList, intervalHelpList, intervalCouponList;
let prevLetterCount = 0;
let prevCouponCount = 0;
const dataLetters = reactive({
    list: []
})
const dataHelp = reactive({
    list: []
})
const dataCoupon = reactive({
    list: []
})


const fn = {
    getList: async (flag, isNoticeAllView) => {
        const noticeLists = ['topicList', 'faqList', 'eventList', 'onelineList'];

        if(!noticeLists.includes(flag) && data.selectedFlag != flag)
            return;

        const res = await store.dispatch('request/call', { flag: flag, params: {} });
        data.list = res?.list ? res.list.map(v => {
            return {
                ...v,
                detl: false,
                custom_idx: 0
            }
        }) : [];

        for(let i = 0; i < data.list.length ; i++){
            data.list[i].custom_idx = data.list.length - i;
        }

        if(!isNoticeAllView && noticeLists.includes(flag)){
            data.list = fn.filterList(flag);
        }
    },
    getHistoryList: async (flag, pageIdx) => {
        if(data.selectedFlag != flag)
            return;

        let domain;

        if (process.env.NODE_ENV == "development") {
            domain = location.origin;
        } else {
            domain = process.env.VUE_APP_META_API_URL;
        }

        const res = await fetch(`${domain}/game_history/get/${(pageIdx * 15)}`, {
            credentials: "include",
            method: "GET",
        }).then(res => res.json());

        if(res?.list?.game_history?.length > 0)
        {
            data.list = res?.list?.game_history ? res.list.game_history.map(v => {
                return {
                    ...v,
                    detl: false,
                    custom_idx: 0
                }
            }) : [];
        }

        for(let i = 0; i < data.list.length ; i++){
            data.list[i].custom_idx = pageIdx + data.list.length - i;
        }
        //console.log(data.list);

        return res?.list?.game_history?.length;
    },
    filterList: (flag) => {
        const noticeTypeFilter = {
            topicList: 'NOTICE_SITE',
            faqList: 'NOTICE_FAQ',
            eventList: 'NOTICE_EVENT',
            onelineList: 'NOTICE_ONELINE',
            popList:'NOTICE_POPUP'
        }
        return data.list.filter(v => v.no_status == 'ACTIVE' && v.no_type == noticeTypeFilter[flag]);
    },
    deleteRow: async (flag, data) => {
        confirmShow({key: 'delete', flag: flag, data: data});
    },
    confirmDeleteRow: async (flag, data) => {
                let res = await store.dispatch('request/call', { flag: 'deleteRow', params: {}, fnConfig: { flag: flag, data: data?.de_idx || data?.mm_idx || data?.wi_idx || data?.mc_idx } });
                await store.dispatch('request/call', { flag: flag, params: {} });

                if(res.is_success == true)
                {
                    let detailIdx = data?.de_idx || data?.wi_idx || data?.mm_idx || data?.mc_idx || data?.cu_idx || data?.no_idx;
                    document.querySelector(`.detailView${detailIdx}`)?.remove();
                    await fn.getList(flag);
                }

                return res;
    },
    useCoupon: async (flag, data) => {
        if(data?.mc_status == 'USED'){
            themeUtils.ShowMessagePopup(t('couponUsed'));
        }
        else{
            if(data?.mc_idx){
                const res = await store.dispatch('request/call', { flag: 'useCoupon', params: {}, fnConfig: { flag: 'use', data: data?.mc_idx } });
                //유효기간지난 쿠폰 체크 및 메세지 팝업
                if(res.memo.error_message.indexOf('사용기간이 지났음') > -1){
                    themeUtils.ShowMessagePopup('res.memo.error_message');
                }
                else{
                    themeUtils.ShowMessagePopup(t('couponUseComplete'));

                    await fn.getList(flag);
                    await store.dispatch('request/call', { flag: 'balance', params: {} });
                }
            }
        }
    },
    detailView: async (flag, data, evtTarget, rIdx, column = false) => {
        if(flag == 'depositList' || flag == 'withdrawList')
            return;

        if(flag == 'historyList')
        {
            let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=600, height=800, top=0,left=0";
            window.open(process.env.VUE_APP_META_API_URL +`/messenger/game_detail_history/${data.mgr_idx}/${data.mgr_game_code}/${data.mgr_game_name.toLowerCase()}`, 'history', config);

        }
        else
        {
            if(data?.mm_idx){
                await store.dispatch('request/call', { flag: 'detailView', params: {}, fnConfig: { flag: flag, data: data?.mm_idx } });
            }

            let detailIdx = data?.de_idx || data?.wi_idx || data?.mm_idx || data?.mc_idx || data?.cu_idx || data?.no_idx;
            if(document.querySelector(`.detailView${detailIdx}`) != undefined){
                document.querySelector(`.detailView${detailIdx}`).remove();
            } else {
                let detailList = document.querySelectorAll(`.detailView`);
                detailList[0]?.remove();

                let pNode = undefined;
                if(column == false)
                {
                    pNode = document.querySelector(`.row${rIdx}`).closest('.rows');
                }
                else
                {
                    pNode = document.querySelector(`.column${rIdx}`).closest('.columns');
                }

                if(data?.no_content_txt)
                {
                    pNode.insertAdjacentHTML('afterend',
                        `

                        <div style="display: flex; flex-direction: column; justify-content: start; align-items: start;" class="detailView detailView${detailIdx}">
                            ${data?.de_content || data?.wi_content || data?.mm_content || data?.mc_content || data?.cu_answer || data?.no_content_txt || '-'}
                         <img style="margin-top:20px;" src="data:image/png;base64,${data?.no_img_base64}"/>
                            </div>`);
                }
                else{
                    pNode.insertAdjacentHTML('afterend', `<div style="display: flex; flex-direction: column; justify-content: start; align-items: start;" class="detailView detailView${detailIdx}">${data?.de_content || data?.wi_content || data?.mm_content || data?.mc_content || data?.cu_answer || data?.no_content || '-'}</div>`);
                }
            }
        }
    },
    getTemplateCardDom: (arr) => {
        let dom = '';
        if(arr[0] != '-'){
            dom += `<img src="${fn.getHistoryCard(arr[0])}"/>`;
        }
        if(arr[1] != '-'){
            dom += `<img src="${fn.getHistoryCard(arr[1])}"/>`;
        }
        if(arr[2] != '-'){
            dom += `<img src="${fn.getHistoryCard(arr[2])}"/>`;
        }
        return dom;
    },
    //**letter, 1:1 help, coupon list check
    searchNewListLetter: async () => {
        //**check letter**

            clearInterval(intervalList);
            intervalList = setInterval(async () => {
                if(store.getters['user/getSessionId'] == undefined ){
                    clearInterval(intervalList);
                    return;
                }
                const res = await store.dispatch('request/call', { flag: 'letterList', params: {} });
                dataLetters.list = res?.list ? res.list.map(v => {
                    return {
                        ...v,
                        detl: false
                    }
                }) : [];
                if(prevLetterCount > 0 && prevLetterCount < dataLetters.list.length) {
                    themeUtils.ShowMessagePopup(t('letter_new'));
                    /*notify({
                        title: t('notice'),
                        text: t('letter_new'),
                        type: 'default', // success warn error  default
                    });*/
                    data.newMessage.letter = true;
                    //update list
                    await fn.getList('letterList');
                }
                prevLetterCount = dataLetters.list.length;
            }, 5000);

    },
    searchNewListHelp: async () => {
        //**check help**

            const resCheck = await store.dispatch('request/call', { flag: 'helpList', params: {} });
            //console.log(resCheck);

            if(void 0 === resCheck?.list || resCheck?.list== null)return;

            if(resCheck.list[0].cu_completed > 0 ){
                return;
            }
            clearInterval(intervalHelpList);
            intervalHelpList = setInterval(async () => {
                if(store.getters['user/getSessionId'] == undefined){
                    clearInterval(intervalHelpList);
                    return;
                }

                const res = await store.dispatch('request/call', { flag: 'helpList', params: {} });
                dataHelp.list = res?.list ? res.list.map(v => {
                    return {
                        ...v,
                        detl: false
                    }
                }) : [];

                for(let i=0; i<dataHelp.list.length; i++){
                    if(i == 0){
                        //console.log(dataHelp.list[i].cu_completed);
                        if(dataHelp.list[i].cu_completed > 0 ) {
                            themeUtils.ShowMessagePopup(t('help_answer_new'));
                            /*notify({
                                title: t('notice'),
                                text: t('help_answer_new'),
                                type: 'success', // success warn error  default
                            });*/
                            data.newMessage.help = true;
                            clearInterval(intervalHelpList);
                            //console.log(dataHelp.list[i].cu_completed);
                            //update list
                            await fn.getList('helpList');
                        }
                        break;
                    }
                }
            }, 5000);


    },
    searchNewListCoupon: async () => {
        //**check coupon**
        clearInterval(intervalCouponList);
        intervalCouponList = setInterval(async () => {
            if(store.getters['user/getSessionId'] == undefined ){
                clearInterval(intervalCouponList);
                return;
            }
            const res = await store.dispatch('request/call', { flag: 'couponList', params: {} });
            dataCoupon.list = res?.list ? res.list.map(v => {
                return {
                    ...v,
                    detl: false
                }
            }) : [];
            if(prevCouponCount > 0 && prevCouponCount < dataCoupon.list.length) {
                themeUtils.ShowMessagePopup(t('coupon_new'));
                /*notify({
                    title: t('notice'),
                    text: t('coupon_new'),
                    type: 'default', // success warn error  default
                });*/
                data.newMessage.coupon = true;
                //update list
                await fn.getList('couponList');
            }
            prevCouponCount = dataCoupon.list.length;
        }, 5000);
    },
    getHistoryCard: (cardIdx) => {
        return require('@/assets/card/' + cardIdx + '.png');
    }
}

export {
    data,
    fn
}