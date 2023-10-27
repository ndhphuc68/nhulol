const state = {
    toggleShow: {
        notice: false,
        faqs: false,
        event: false
    },
    confirmDialog: null
}

const getters = {}

const mutations = {
    handleToggle(state, payload) {
        state.toggleShow[payload] = !state.toggleShow[payload];
    }
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}