const state = {
    alerts: [],
};

const getters = {
    alerts(state) {
        return state.alerts;
    },
};

const mutations = {
    SET_ALERT(state, alert) {
        alert.idTimeout = setTimeout(() => {
            this.commit('REMOVE_ALERT', alert)
        }, alert.duration || 3000)
        state.alerts.push(alert);
    },
    REMOVE_ALERT(state, alert) {
        clearTimeout(alert.idTimeout);
        state.alerts.splice(state.alerts.indexOf(alert), 1);
    }
};

const actions = {
    showAlert({commit}, alert) {
        commit('SET_ALERT', alert);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
// alert {
//     type: 'info', 'error', 'success',
//     message,
//     duration
// }