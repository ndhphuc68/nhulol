import { reactive, computed } from 'vue';
import store from '@/store';
// import i18n from '@/i18n'
// const { t } = i18n.global
//
// const pageType = process.env.VUE_APP_PAGE_TYPE;

const modals = reactive({});
const confirmPayload = reactive({});
const confirmPasswordPayload = reactive({});
//const popupNoticePayload = reactive({});

const totalMenus = [
    "login",
    "signup",
    "writeHelp",
    "bankSelect",
    "userInfo",
    "coupon",
    "depositRequest",
    "withdrawRequest",
    "depositHistory",
    "withdrawHistory",
    "letter",
    "helpCenter",
    "topic",
    "faq",
    "event",
    "gameGuide",
    "partnership",
    "game",
    'liveCasino',
    'slotGame',
    'miniGame',
    'confirm',
    'history',
    'confirmPassword',
    /*'popupNotice'*/
    /*"partner",*/
];

const confirmShow = (payload) => {
    confirmPayload.value = payload;
    toggleShow('confirm');
    activeModal.value = payload.flag;
}
const confirmPasswordShow = (payload) => {
    //console.log('confirmPasswordShow key : ' + payload.key);
    confirmPasswordPayload.value = payload;
    //console.log('confirmPasswordShow confirmPasswordPayload.value : ' + confirmPasswordPayload.value.key);
    toggleShow('confirmPassword');
    //activeModal.value = 'confirmPassword';
   }

   /*
const popupNoticeShow = (payload) => {
    //console.log('confirmPasswordShow key : ' + payload.key);
    popupNoticePayload.value = payload;
    //console.log('confirmPasswordShow confirmPasswordPayload.value : ' + confirmPasswordPayload.value.key);
    toggleShow('popupNotice');
    //activeModal.value = 'confirmPassword';
}*/

const toggleShow = (modalKey) => {
    if(!totalMenus.includes(modalKey))
        return;
    if(modalKey != 'signup' && modalKey != 'topic' && modalKey != 'event' && modalKey != 'faq' && modalKey != 'gameGuide' && modalKey != 'login' && modalKey != 'bankSelect' && modalKey != 'partnership' && modalKey != 'popupNotice'&& !store.getters['user/getSessionId']){
        modals['login'] = true;
        return;
    }

    modals[modalKey] = modals?.[modalKey] ? !modals[modalKey] : true;
}
const activeModal = computed(() => {
    return Object.entries(modals).find(v => v[0] != 'confirm' && v[1] == true)?.[0] || undefined;
});

export {
    modals,
    toggleShow,
    confirmShow,
    activeModal,
    confirmPayload,
    confirmPasswordShow,
    confirmPasswordPayload,
    /*popupNoticeShow,
    popupNoticePayload*/
}

