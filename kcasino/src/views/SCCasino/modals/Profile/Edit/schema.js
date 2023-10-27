import * as yup from "yup";
import i18n from "@/locales/i18n.js";
import { computed } from "vue";

export const schema = computed(() =>
  yup.object().shape({
    nickName: yup
      .string()
      .required(i18n.global.t("signuperrornickname"))
      .min(4, i18n.global.t("signuperrorAmore4"))
      .max(20, i18n.global.t("signuperrorAmore20"))
      .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
    phone: yup
      .string()
      .required(i18n.global.t("signuperrorphone"))
      .matches(
        /^(([0-9]{1,1})[ \\-]*)*?[0-9]{1,1}?[ \\-]*[0-9]{1,1}?$/,
        i18n.global.t("signuperrorphone")
      ),
    password: yup.string(),
    // .required(i18n.global.t("signuperrorpassword"))
    // .min(6, i18n.global.t("signuperrorPamore6"))
    // .max(16, i18n.global.t("signuperrorPamore6")),
    confirmPassword: yup
      .string()
      // .required(i18n.global.t("signuperrorpassword"))
      .oneOf(
        [yup.ref("password"), null],
        i18n.global.t("signuppasswordincorrect")
      ),
    bankAccount: yup
      .string()
      .required(i18n.global.t("signuperroraccount"))
      .min(2, i18n.global.t("signuperrorbankaccountnamelength"))
      .max(5, i18n.global.t("signuperrorbankaccountnamelength"))
      .matches(/^(\S+$)/g, i18n.global.t("signuperrorSpace")),
    bankNumber: yup
      .string()
      .required(i18n.global.t("signuperroraccountnumber"))
      .matches(
          /^(([0-9]{0,1})[ \\-]*)*?[0-9]{0,1}?[ \\-]*[0-9]{0,1}?$/,
        i18n.global.t("signuperroraccountnumber")
      ),
    bankName: yup.string().required(i18n.global.t("signuperrorbankname")),
  })
);
