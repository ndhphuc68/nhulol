import store from '@/store';
import { modals, toggleShow } from '@/utils/modals';
import { getCookie } from '@/utils/cookie';
import {encryptDataV2} from "@/utils/encrypt";
import { fn } from "@/views/login/login";

const loginFilter = async (to, from, next) => {
    if(!store.getters['login/getLoginUser']?.sessionData){
        let loginInfo = getCookie('CID');
        if(loginInfo){
            try {

                //await fn.logout();

               // console.log('refresh');
               // console.log(store.getters['login/getLoginUser']?.sessionData);
               // console.log(loginInfo);

                //if(!loginInfo)
                //   await fn.loginData(JSON.parse(loginInfo.payload));


            } catch(e) {
                console.error(e);
            }
        }
    }
    if(to.meta.checkUserId && !store.getters["login/getLoginUser"]?.sessionData) next('/');
    next();
}

export {
    loginFilter
}