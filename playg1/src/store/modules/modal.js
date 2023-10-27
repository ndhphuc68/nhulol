const state = {
    toggleShow: {
        login: false,
        signUp: false,
        partnership: false,
    },
    confirmDialog : null
}

const getters = {}

const mutations = {
    handleToggle(state, payload) {
        state.toggleShow[payload] = !state.toggleShow[payload];
    },
    showConfirm(state, payload){
        const { title, message, callback } = payload;
        state.confirmDialog = { title, message, callback }
    },
    closeConfirm (state) {
        state.confirmDialog = null
    }
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}