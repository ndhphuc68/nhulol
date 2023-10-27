import { app } from "@/main";
import i18n from "@/locales/i18n";

const configToast = {
  summary: "Message",
  life: 3000,
};
export const toastMessage = {
  success: (message) => {
    app.config.globalProperties.$toast.add({
      severity: "success",
      detail: message,
      ...configToast,
    });
  },
  info: (message) => {
    app.config.globalProperties.$toast.add({
      severity: "info",
      detail: message,
      ...configToast,
    });
  },
  warning: (message) => {
    app.config.globalProperties.$toast.add({
      severity: "warn",
      detail: message,
      ...configToast,
    });
  },
  error: (message) => {
    app.config.globalProperties.$toast.add({
      severity: "error",
      detail: message,
      ...configToast,
    });
  },
};

export const confirm = (message, callback, header) => {
  app.config.globalProperties.$confirm.require({
    message: message || "Do you want to delete this record?",
    header: header || i18n.global.t("confirmation1"),
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    rejectLabel: i18n.global.t("no"),
    acceptLabel: i18n.global.t("yes"),
    accept: () => {
      callback && callback();
    },
    reject: () => {},
  });
};
export default toastMessage;
