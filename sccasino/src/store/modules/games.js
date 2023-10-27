// import {getListGameCompany, getListGameProvider, getListGameRequest, playGame} from "@/api/games/request"
// import {sortListGameCasino} from "@/utils";

const state = {
    listGame: [],
    tabGameActivate: 0,
    listGameProvider: [],
    gameKey: "",
    tab: null,
    timer: null
}

// const getters = {
//     getListGame(state) {
//         return state.listGame
//     },
//     getListGameCasino(state) {
//         if (state.listGameProvider.length > 0) {
//             let listCompanyGame = state.listGameProvider.filter(e => e.category === 'casino').sort(function (a, b) {
//                 let nameA = a.key.toUpperCase();
//                 let nameB = b.key.toUpperCase();
//
//                 if (nameA < nameB) {
//                     return -1;
//                 }
//                 if (nameA > nameB) {
//                     return 1;
//                 }
//                 return 0;
//             });
//
//             listCompanyGame = listCompanyGame.filter(e => e.key.split('_')[0] !== "bota")
//             listCompanyGame = listCompanyGame.filter(e => e.key !== "microgaming_casino_fghub")
//             return sortListGameCasino(listCompanyGame)
//         } else {
//             return []
//         }
//     },
//     getListGameCasinoDoesNotMatch(state) {
//         if (state.listGameProvider.length > 0) {
//             const listCasino = state.listGameProvider.filter(e => e.category === 'casino').sort(function (a, b) {
//                 let nameA = a.key.toUpperCase();
//                 let nameB = b.key.toUpperCase();
//
//                 if (nameA < nameB) {
//                     return -1;
//                 }
//                 if (nameA > nameB) {
//                     return 1;
//                 }
//                 return 0;
//             });
//             let listReturn = []
//             listCasino.forEach(e => {
//                 if (listReturn.length > 0) {
//                     const check = listReturn.find(val => e.key.split('_')[0] === val.key.split('_')[0])
//                     if (!check) {
//                         listReturn.push(e)
//                     }
//                 } else {
//                     listReturn.push(e)
//                 }
//             })
//
//             listReturn = listReturn.filter(e => e.key.split('_')[0] !== "bota")
//
//             return sortListGameCasino(listReturn)
//         } else {
//             return []
//         }
//     },
//     getListGameSlot(state) {
//         let listGameSlot = state.listGameProvider.filter(e => e.category === 'slot')
//
//         listGameSlot = listGameSlot.filter(e => e.key !== 'microgaming_slot_fghub')
//
//         let ps = listGameSlot.find(e => e.key.split('_')[0] === 'ps')
//         if (ps) {
//             let indexps = listGameSlot.indexOf(ps);
//             listGameSlot.splice(indexps, 1);
//             listGameSlot.unshift(ps);
//         }
//
//         let nettent = listGameSlot.find(e => e.key.split('_')[0] === 'netent')
//         if (nettent) {
//             let indexnettent = listGameSlot.indexOf(nettent);
//             listGameSlot.splice(indexnettent, 1);
//             listGameSlot.unshift(nettent);
//         }
//         let playngo = listGameSlot.find(e => e.key.split('_')[0] === 'playngo')
//         if (playngo) {
//             let indexplayngo = listGameSlot.indexOf(playngo);
//             listGameSlot.splice(indexplayngo, 1);
//             listGameSlot.unshift(playngo);
//         }
//         let cq9 = listGameSlot.find(e => e.key.split('_')[0] === 'cq9')
//         if (cq9) {
//             let indexcq9 = listGameSlot.indexOf(cq9);
//             listGameSlot.splice(indexcq9, 1);
//             listGameSlot.unshift(cq9);
//         }
//         let gameart = listGameSlot.find(e => e.key.split('_')[0] === 'gameart')
//         if (gameart) {
//             let indexgameart = listGameSlot.indexOf(gameart);
//             listGameSlot.splice(indexgameart, 1);
//             listGameSlot.unshift(gameart);
//         }
//         let booongo = listGameSlot.find(e => e.key.split('_')[0] === 'booongo')
//         if (booongo) {
//             let indexbooongo = listGameSlot.indexOf(booongo);
//             listGameSlot.splice(indexbooongo, 1);
//             listGameSlot.unshift(booongo);
//         }
//         let pgsoft = listGameSlot.find(e => e.key.split('_')[0] === 'pgsoft')
//         if (pgsoft) {
//             let indexpgsoft = listGameSlot.indexOf(pgsoft);
//             listGameSlot.splice(indexpgsoft, 1);
//             listGameSlot.unshift(pgsoft);
//         }
//         let ag = listGameSlot.find(e => e.key.split('_')[0] === 'ag')
//         if (ag) {
//             let indexAg = listGameSlot.indexOf(ag);
//             listGameSlot.splice(indexAg, 1);
//             listGameSlot.unshift(ag);
//         }
//         let microgaming = listGameSlot.find(e => e.key.split('_')[0] === 'microgaming')
//         if (microgaming) {
//             let indexmicrogaming = listGameSlot.indexOf(microgaming);
//             listGameSlot.splice(indexmicrogaming, 1);
//             listGameSlot.unshift(microgaming);
//         }
//         let habanero = listGameSlot.find(e => e.key.split('_')[0] === 'habanero')
//         if (habanero) {
//             let indexHabanero = listGameSlot.indexOf(habanero);
//             listGameSlot.splice(indexHabanero, 1);
//             listGameSlot.unshift(habanero);
//         }
//         let evo = listGameSlot.find(e => e.key.split('_')[0] === 'evolution')
//         if (evo) {
//             let indexEvo = listGameSlot.indexOf(evo);
//             listGameSlot.splice(indexEvo, 1);
//             listGameSlot.unshift(evo);
//         }
//         let pra = listGameSlot.find(e => e.key.split('_')[0] === 'pragmatic')
//         if (pra) {
//             let indexPra = listGameSlot.indexOf(pra);
//             listGameSlot.splice(indexPra, 1);
//             listGameSlot.unshift(pra);
//         }
//         return listGameSlot
//     }
// }

const mutations = {
    handleUpdateListGameProvider(state, payload) {
        state.listGameProvider = [...payload]
    },
    handleUpdateListGame(state, payload) {
        state.listGame = [...payload]
    },
    handleUpdateTabGame(state, payload) {
        state.tabGameActivate = payload
    },
    handleUpdateGameKey(state, payload) {
        state.gameKey = payload
    },
    handleUpdateTab(state, payload) {
        state.tab = payload
    },
    handleUpdateTimer(state, payload) {
        state.timer = payload
    },
}

const actions = {
    // async getListGameProviderActions({commit}) {
    //     const res = await getListGameProvider()
    //     if (res?.is_success || res?.Data?.code === 0) {
    //         commit("handleUpdateListGameProvider", res?.Data?.vendors)
    //         commit("handleUpdateGameKey", res?.Data?.vendors.filter(e => e.category === 'slot')[0].key)
    //     } else {
    //         /*alert(res?.message)*/
    //     }
    // },
    // async getListGameCompanyActions({commit}, data) {
    //     const res = await getListGameCompany(data)
    //     if (res?.code === 0) {
    //         return res.games
    //     } else {
    //         return null
    //     }
    // },
    // async getPlayGameSelect({commit}, data) {
    //     const res = await playGame(data)
    //     if (res) {
    //         return res
    //     }
    // }
    // async getListGameAction({commit}, data) {
    //     const res = await getListGameRequest(data)
    //     if (res?.is_success) {
    //         commit("handleUpdateListGame", res?.list)
    //     } else {
    //         /*alert(res?.message)*/
    //     }
    // }
}

export default {
    state,
    // getters,
    mutations,
    actions
}