const state = {
    toggleShow: {
        login: false,
        signUp: false,
        personal:false,
        notice: false,
        gameGuide: false,
        partnership: false,
        loading: false,
        betting : false,
        betting1: false,
        pickBank:false,
        event:false,
        faq:false,
        deposit: false,
        withdraw: false,
        noticeEventFAQ: false,
        betrule: false,
        serviceCenter: false,
        message: false
    },
    confirmDialog : null
}

const getters = {}

const mutations = {
    showConfirm(state, payload){
        const { title, message, callback } = payload;
        state.confirmDialog = { title, message, callback }
    },
    closeConfirm (state) {
        state.confirmDialog = null
    },
    handleToggle(state, payload) {
        state.toggleShow[payload] = !state.toggleShow[payload];
        const check = Object.values(state.toggleShow).filter((e) => e);
        if (check.length === 0) {
            document.querySelector("html").style.overflowY = "scroll";
        } else {
            document.querySelector("html").style.overflowY = "hidden";
        }
    },
    handleCloseAllModal(state) {
        state.toggleShow = {};
        document.documentElement.style.overflowY = "scroll";
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}