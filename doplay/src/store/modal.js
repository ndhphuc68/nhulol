import store from "@/store";

const state = {
    modals: []
}

const getters = {}

const mutations = {
    closeModal: (state, payload) => {
        const {modalKey} = payload;
        state.modals = state.modals.filter((modal) => {
            return modal.modalKey !== modalKey;
        })
        store.commit('handleActiveSidebar', 0)
    },
    openModal: (state, payload) => {
        const {modalKey, component} = payload;
        state.modals.push({
            modalKey, component
        })
    }

}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}