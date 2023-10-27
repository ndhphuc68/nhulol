import store from '@/store';
import { reactive } from 'vue';
import { toggleShow } from "@/utils/modals";
import { fn as listFn } from "@/views/list/list.js";
import {notify} from "@kyvg/vue3-notification";
import {themeUtils} from "@/const/themeData";
import i18n from '@/i18n'
const { t } = i18n.global;

const data = {
    frm: {
        UserQuestion: ''
    }
}

const fn = {
    submitWriteForm: async (payload) => {
        console.log('submitWriteForm');
        const res = await store.dispatch('request/call', { flag: 'writeHelp', params: data.frm });

        toggleShow('writeHelp');
        await listFn.getList('helpList');

        themeUtils.ShowMessagePopup(res.message);
       /* notify({
            title: t('notice'),
            text: res.message,
            type: 'default', // success warn error  default
        });*/

        data.frm.UserQuestion = '';
        //search start
        await listFn.searchNewListHelp();
    },
}

export {
    data,
    fn
}