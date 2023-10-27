import {app} from '@/main';

const configToast = {
    summary: 'Message',
    life: 3000
}
export const toastMessage = {
    success: (message) => {
        app.config.globalProperties.$toast.add({severity: 'success', detail: message, ...configToast});
    },
    info: (message) => {
        app.config.globalProperties.$toast.add({severity: 'info', detail: message, ...configToast});
    },
    warning: (message) => {
        app.config.globalProperties.$toast.add({severity: 'warn', detail: message, ...configToast});
    },
    error: (message) => {
        app.config.globalProperties.$toast.add({severity: 'error', detail: message, ...configToast});
    }
};

export const confirm = (message, callback) => {
    app.config.globalProperties.$confirm.require({
        message: message || 'Do you want to delete this record?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
            callback && callback()
        },
        reject: () => {

        }
    });
};
export default toastMessage