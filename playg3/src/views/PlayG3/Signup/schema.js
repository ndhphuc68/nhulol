import * as yup from "yup";
import i18n from "@/locales/i18n.js";

export const schemaSignup = yup.object().shape({
  account: yup
    .string()
    .required(i18n.global.t("signuperroraccount"))
    .min(4, i18n.global.t("signuperrorAmore4")),
  nickName: yup
    .string()
    .required(i18n.global.t("signuperrornickname"))
    .min(4, i18n.global.t("signuperrorAmore4")),
  // phone: yup
  //   .string()
  //   .required(i18n.global.t("signuperrorphone"))
  //   .matches(
  //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //     "Invalid phone number"
  //   ),
  password: yup
    .string()
    .required(i18n.global.t("signuperrorpassword"))
    .min(6, i18n.global.t("signuperrorPamore6")),
  confirmPassword: yup
    .string()
    .required(i18n.global.t("signuperrorpassword"))
    .oneOf(
      [yup.ref("password"), null],
      i18n.global.t("signuppasswordincorrect")
    ),
  // withdrawPassword: yup
  //   .string()
  //   .required(i18n.global.t("signuperrorpassword"))
  //   .min(6, i18n.global.t("signuperrorPamore6")),
  accountHolder: yup
    .string()
    .required(i18n.global.t("signuperroraccount"))
    .min(4, i18n.global.t("signuperrorAmore4")),
  bankNumber: yup
    .number()
    .required(i18n.global.t("signuperroraccountnumber")),
  bankName: yup
    .string()
    .required(i18n.global.t("signuperrorbankname")),
  partnerCode: yup
    .string()
});
