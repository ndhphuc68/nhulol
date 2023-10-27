import * as yup from "yup";
import i18n from "@/locales/i18n.js";
import { computed } from "vue";

export const schemaSignup = computed(() => yup.object().shape({
  account: yup
    .string()
    .required(i18n.global.t("signuperroraccount"))
    .min(4, i18n.global.t("signuperrorAmore4"))
    .max(20, i18n.global.t("signuperrorAmore20"))
    .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
  nickname: yup
    .string()
    .required(i18n.global.t("signuperrornickname"))
    .min(4, i18n.global.t("signuperrorNmore4"))
    .max(20, i18n.global.t("signuperrorNmore20")),
  phone: yup
    .string()
    .required(i18n.global.t("signuperrorphone"))
    .matches(
      /^(([0-9]{1,1})[ \\-]*)*?[0-9]{1,1}?[ \\-]*[0-9]{1,1}?$/,
      i18n.global.t("signuperrorphone")
    ),
  accountHolder: yup
    .string()
    .min(2, i18n.global.t("signuperrorbankaccountnamelength"))
    .max(5, i18n.global.t("signuperrorbankaccountnamelength"))
    .required(i18n.global.t("signuperrorbankaccountname")),
  bankName: yup.string().required(i18n.global.t("signuperrorbankname")),
  bankNumber: yup
  .string()
  .matches(
    /^(([0-9]{0,1})[ \\-]*)*?[0-9]{0,1}?[ \\-]*[0-9]{0,1}?$/,
    i18n.global.t("signuperroraccountnumber")
  ),
  password: yup
    .string()
    .required(i18n.global.t("signuperrorpassword"))
    .min(6, i18n.global.t("signuperrorPamore6"))
    .max(16, i18n.global.t("signuperrorPamore6"))
    .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      i18n.global.t("signuppasswordincorrect")
    ),
}));
