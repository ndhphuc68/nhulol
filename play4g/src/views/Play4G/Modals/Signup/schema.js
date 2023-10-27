import * as yup from "yup";
import i18n from "@/locales/i18n.js";
import { computed } from "vue";

export const schemaSignupInfo = computed(() => yup.object().shape({
  account: yup
    .string()
    .required(i18n.global.t("signuperroraccount"))
    .min(4, i18n.global.t("signuperrorAmore4"))
    .max(20, i18n.global.t("signuperrorAmore20"))
    .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
  nickName: yup
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
  password: yup
    .string()
    .required(i18n.global.t("signuperrorpassword"))
    .min(6, i18n.global.t("signuperrorPamore6"))
    .max(16, i18n.global.t("signuperrorPamore6"))
    .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
  confirmPassword: yup
    .string()
    .required(i18n.global.t("signuperrorpassword"))
    .oneOf(
      [yup.ref("password"), null],
      i18n.global.t("signuppasswordincorrect")
    )
}));

export const schemaSignupBank = computed(() => yup.object().shape({
  accountHolder: yup
      .string()
      .required(i18n.global.t("signuperroraccount"))
      .min(2, i18n.global.t("signuperrorbankaccountnamelength"))
      .max(5, i18n.global.t("signuperrorbankaccountnamelength")),
  bankNumber: yup
      .string()
      .required(i18n.global.t("signuperroraccountnumber"))
      .matches(
          /^(([0-9]{1,1})[ \\-]*)*?[0-9]{1,1}?[ \\-]*[0-9]{1,1}?$/,
          i18n.global.t("signuperroraccountnumber")
      ),
  bankName: yup.string().required(i18n.global.t("signuperrorbankname")),
  partnerCode: yup.string(),
}));
