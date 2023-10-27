import * as yup from "yup";
import i18n from "@/locales/i18n.js";

export const schemaSignupInfo = yup.object().shape({
    id: yup.string().required(i18n.global.t('signuperroraccount')).min(4, i18n.global.t('signuperrorAmore4')),
    phone: yup.string().required(i18n.global.t('signuperrorphone')),
    password: yup.string().required(i18n.global.t('signuperrorpassword')).min(6, i18n.global.t('signuperrorPamore6')),
    confirm_password: yup.string().required(i18n.global.t('signuperrorpassword')).oneOf([yup.ref('password'), null], i18n.global.t('signuppasswordincorrect')),
    withdraw_password: yup.string().required(i18n.global.t('signuperrorpassword')).min(6, i18n.global.t('signuperrorPamore6'))
});

export const schemaSignupBank = yup.object().shape({
    holder: yup.string().required(i18n.global.t('signuperroraccount')).min(4, i18n.global.t('signuperrorAmore4')),
    bank_name: yup.string().required(i18n.global.t('signuperroraccount')).min(4, i18n.global.t('signuperrorAmore4')),
    account_number: yup.string().required(i18n.global.t('signuperroraccount')).min(4, i18n.global.t('signuperrorAmore4')),
    ref_code:yup.string()
})
