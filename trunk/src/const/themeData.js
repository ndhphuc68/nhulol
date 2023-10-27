
import { notify } from "@kyvg/vue3-notification";
import i18n from "@/i18n";
const { t } = i18n.global;
import { useToast } from "vue-toastification";
import store from "@/store";
// Get toast interface
const toast = useToast();

const pageType = process.env.VUE_APP_PAGE_TYPE;


/*require("@/assets/logo/body/test.png");*/
const themes = [
    { key: "LH", src: '', logo_border: "#19e1a4",  },
];


const getLogoImage = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).src;
}
const getLogoBorder = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).logo_border;
}
const getLogoBack = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).logo_back;
}
const getContentsBorder = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).contents_border;
}
const getContentsBack = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).contents_back;
}
const getCategoryBorder = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).category_border;
}
const getCategoryBack = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).category_back;
}
const getMiddleButtonsBack = () => {
    return themes.find(v => v.key == process.env.VUE_APP_PAGE_TYPE).middle_buttons_back;
}

const refresh = () => {
    // 선택 방법 [1] : 화면 새로고침
    //location.href = location.href;
    // 선택 방법 [2] : 화면 새로고침
    // history.go(0);
    // 선택 방법 [3] : 화면 새로고침
    location.reload();
}

const isXBtnType1 = () => {
    let btnType1 =false;
    return btnType1;
}

const ShowMessagePopup = (txt, type=0) => {
    if(pageType == 'LH') {
        notify({
            title: t('notice'),
            text: txt,
            type: 'default',
        });
    }
    else {
        // or with options
        /*toast.success("My toast content", {
            timeout: 2000
        });*/

        if(type == 0){
            toast.info(txt);
        }
        else if(type == 1){
            toast.success(txt);
        }
        else if(type == 2){
            toast.error(txt);
        }
        else if(type == 3){
            toast.warning(txt);
        }
       // toast(txt);
        //toast.info("Info toast");
        //toast.success("Success toast");
        // toast.error("Error toast");
        // toast.warning("Warning toast");
    }
}

const isDepositBlock = () => {
    const status = store.getters['cms/getConfigData'].DEPOSIT_BLOCK;
    //console.log(status);
    if(status == 'NO'){
        return 1;
    }
    else{
        return 0;
    }
}

const isWithdrawBlock = () => {
    const statusWit = store.getters['cms/getConfigData'].WITHDRAW_BLOCK;
    //console.log(statusWit);
    if(statusWit == 'NO'){
        return 1;
    }
    else{
        return 0;
    }
}

const themeUtils = {
    getLogoImage,
    getLogoBorder,
    getLogoBack,
    getContentsBorder,
    getContentsBack,
    getCategoryBorder,
    getCategoryBack,
    refresh,
    isXBtnType1,
    getMiddleButtonsBack,
    ShowMessagePopup,
    isDepositBlock,
    isWithdrawBlock
}


export { themes, themeUtils };
