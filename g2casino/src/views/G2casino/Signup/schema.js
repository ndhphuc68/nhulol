import * as yup from "yup";
import i18n from "@/locales/i18n.js";

export const schemaSignup = yup.object().shape({
    email: yup.string().required(i18n.global.t('signuperroraccount')).min(4, i18n.global.t('signuperrorAmore4')),
    nickname: yup.string().required(i18n.global.t('signuperrornickname')).min(4, i18n.global.t('signuperrorAmore4')),
    phone: yup.string().required(i18n.global.t('signuperrorphone')).min(10, i18n.global.t('signuperrorPmore10')).matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid phone number'),
    password: yup.string().required(i18n.global.t('signuperrorpassword'))
        .min(6, i18n.global.t('signuperrorPamore6')),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], i18n.global.t('signuppasswordincorrect'))
});
