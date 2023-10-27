import { reactive } from 'vue';
import store from '@/store';
import { toggleShow } from "@/utils/modals";
import {notify} from "@kyvg/vue3-notification";
import i18n from '@/i18n'
import {themeUtils} from "@/const/themeData";
const { t } = i18n.global;


const signUpForm = () => {
    return {
        account: '',
        password: '',
        nickname: '',
        phone: '',
        domain_info: '',
        bank_name: '',
        bank_account: '',
        bank_number: '',
        voter_account: '',
        withdraw_pass: ''
        /*JoinSmsNumber: 0*/
    }
}

const data = {
    frm: reactive(signUpForm())
}

const fn = {
    signup: async () => {
        const res = await store.dispatch('request/call', { flag: 'signup', params: data.frm });
      //  console.log(res);
      //  if(res.is_success == true && res.error_code == 0){
      //      toggleShow('signup');
      //  }

        if(res?.is_success == false)
        {
            themeUtils.ShowMessagePopup(res.message);
            /*notify({
                title: t('notice'),
                text: res.message,
                type: 'warn', // success warn error  default
            });*/
        }
        else
        {
            themeUtils.ShowMessagePopup(t('singup_completed_msg'));
            /*notify({
                title: t('notice'),
                text: t('singup_completed_msg'),
                type: 'success', // success warn error  default
            });*/
            toggleShow('signup');
        }
    },
    initData: () => {
        data.frm = reactive(signUpForm());
    }
}

export {
    data,
    fn
}