import store from '@/store';
import { modals, toggleShow } from '@/utils/modals';
import { getCookie } from '@/utils/cookie';
import { fn } from '@/views/login/login.js';
import { decryptUrlData } from "@/utils/encrypt";

const launchFilter = async (to, from, next) => {
    let isInvalid = false;
    if(to.query.token){
        let userInfo = JSON.parse(decryptUrlData(to.query.token));
        if(!userInfo){
            throw "Unknown User Infomation";
        } else {
            localStorage.token = 'token';
            isInvalid = true;
            await fn.login({ userId: userInfo.user_id, pass: userInfo.password });
        }
    }
    if(isInvalid) next('/lobby');
    else next();
}

export {
    launchFilter
}