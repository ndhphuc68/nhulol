import axios from 'axios';
import store from "@/store";
import qs from 'qs';
import { errCodeMsg } from '@/const/err';
import { fn } from '@/views/login/login';

import i18n from '@/i18n'
import {notify} from "@kyvg/vue3-notification";
const { t } = i18n.global

const CancelToken = axios.CancelToken;

/**
 * @name: axios 기본설정
 */
const metagAxios = axios.create({
    baseURL: process.env.VUE_APP_META_API_URL,
    timeout: 30000,
    withCredentials: true,
    transformRequest: [(data, headers) => {
        if(store.getters['user/getSessionId']){
            data['memberIdx'] = store.getters['user/getSessionId'];
        }
        if(store.getters['user/getUserInfo']) {
            data['mInviteCode'] = store.getters['user/getUserInfo'].me_invite_code;
            data['mNickName'] = store.getters['user/getUserInfo'].me_nickname;
        }
        return qs.stringify(data);
    }]
});

const axiosErrorHandle = (error) => {
  /* const erredReq = store.getters['request/getCallStack'].find(stack => stack.url == error.config.url);
    erredReq.cancel();
   store.commit('request/setStackStatus', error.config);*/
}

metagAxios.interceptors.request.use((req) => {
    return req;
}, (error) => {
    console.error(error);
});

metagAxios.interceptors.response.use((res) => {
    if((res.data?.is_logined == true || res.data?.is_success == true && res.data?.error_code == 0) && res.config?.$useStore){
        res.config.$useStore(res.data, res);
    }

    if(res.data?.message) {
        if (!res.data?.message && res.data.message.toLowerCase().indexOf('success') != -1) {
            alert( res.data?.message);
            /*notify({
                title: t('warning'),
                text: res.data?.message,
                type: 'error', // success warn error  default
            });*/
        }
    }
    //if(res.data.message && res.data.message.toLowerCase().indexOf('success') == -1 && (res.data?.error_code || res.data.ErrorCode != '-200001')){
    //    let msg = errCodeMsg?.[res.data?.error_code || res.data.ErrorCode] ? t(errCodeMsg[res.data?.error_code || res.data.ErrorCode]) :  res.data.message;
    //    alert(msg);
    //    throw Promise.reject(msg);
    //}

    return res.data;
}, (error) => {
    console.error(error);
});

export {
    metagAxios
}