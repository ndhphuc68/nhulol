import {
  getListGameCompany,
  getListGameProvider,
  playGame,
} from "@/api/games/request";
import store from "@/store";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  listGameProviderCasino: [],
  listGameProviderSlot: [],
  listGameDetailProviderCasino: [],
  listGameDetailProviderSlot: [],
  gameProviderEvolution: [],
  gameKey: null,
  tab: null,
  timer: null,
  loadingCheck: true,
  onWeb: true,
  typeGamejs: "evolution",
};

const getters = {
  getListGameV2(state) {
    return state.listGame;
  },
  getListGameCasinoV2(state) {
    return state.listGameProviderCasino.filter((e) => e.key !== 999999);
  },
  getListGameSlotV2(state) {
    return state.listGameProviderSlot;
  },
  listGameDetailProviderCasinoV2(state) {
    return state.listGameDetailProviderCasino;
  },
  listGameDetailProviderSlotV2(state) {
    return state.listGameDetailProviderSlot;
  },
  getGameEvolution(state) {
    return state.gameProviderEvolution;
  },
};

const mutations = {
  handleUpdateListGameProviderV2(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGameProviderCasinoV2(state, payload) {
    state.listGameProviderCasino = [
      ...state.listGameProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameProviderSlotV2(state, payload) {
    state.listGameProviderSlot = [...state.listGameProviderSlot, ...payload];
  },
  handleUpdateListGameDetailProviderCasinoV2(state, payload) {
    state.listGameDetailProviderCasino = [
      ...state.listGameDetailProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderSlotV2(state, payload) {
    state.listGameDetailProviderSlot = [
      ...state.listGameDetailProviderSlot,
      ...payload,
    ];
  },
  handleUpdateListGame(state, payload) {
    state.listGame = [...payload];
  },
  handleUpdateTabGame(state, payload) {
    state.tabGameActivate = payload;
  },
  handleUpdateGameKeyV2(state, payload) {
    state.gameKey = payload;
  },
  handleUpdateTab(state, payload) {
    state.tab = payload;
  },
  handleUpdateTimer(state, payload) {
    state.timer = payload;
  },
  handleUpdateLoadingCheck(state, payload) {
    state.loadingCheck = payload;
  },
  handleUpdateOnWeb(state, payload) {
    state.onWeb = payload;
  },
  handleUpdateGameProviderEvolution(state, payload) {
    state.gameProviderEvolution = payload;
  },
  handleUpdateTypeGameJs(state, payload) {
    state.typeGamejs = payload;
  },
};

const actions = {
  async getListGameProviderActionsV2({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      commit("handleUpdateListGameProviderV2", res?.Data?.vendors);
      let check = true;
      if (check) {
        if (res?.Data?.vendors.length > 0) {
          let dataGame = res?.Data?.vendors.filter((e) => e.module === 1);
          let dataGame2 = res?.Data?.vendors.filter((e) => e.module === 0);
          commit("handleUpdateLoadingCheck", true);

          if (dataGame2.length === 0) {
            let eve = res?.Data?.vendors.find((e) => e.key === 999999);
            if (eve) {
              let index = res?.Data?.vendors.indexOf(eve);
              res?.Data?.vendors.splice(index, 1);
              res?.Data?.vendors.unshift(eve);
            }

            for (const e of res?.Data?.vendors) {
              await getListGameCompany({ provider_id: e.key })
                .then((res) => {
                  if (res) {
                    let checkCasino = res?.games.filter(
                      (val) =>
                        val.names.type === "casino" ||
                        val.names.type === "Live Casino"
                    );
                    if (checkCasino.length > 0) {
                      if (e.key === 999999) {
                        e.name = "Evolution Gaming";
                      }
                      commit("handleUpdateListGameDetailProviderCasinoV2", [
                        {
                          key: e.key,
                          game: checkCasino,
                        },
                      ]);
                      commit("handleUpdateListGameProviderCasinoV2", [e]);
                    }
                    let checkSlot = res?.games.filter(
                      (val) => val.names.type === "slot"
                    );
                    if (checkSlot.length > 0) {
                      if (state.gameKey === null) {
                        commit("handleUpdateGameKeyV2", e);
                      }
                      commit("handleUpdateListGameDetailProviderSlotV2", [
                        {
                          key: e.key,
                          game: checkSlot,
                        },
                      ]);
                      commit("handleUpdateListGameProviderSlotV2", [e]);
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
            commit("handleUpdateLoadingCheck", false);
          }

          if (dataGame2.length > 0) {
            let eve = dataGame2.find((e) => e.key === 999999);
            if (eve) {
              let index = dataGame2.indexOf(eve);
              dataGame2.splice(index, 1);
              dataGame2.unshift(eve);
            }
            let pragmatic2 = dataGame2.find((e) => e.key === "54");
            if (pragmatic2) {
              let indexps2 = dataGame2.indexOf(pragmatic2);
              dataGame2.splice(indexps2, 1);
              dataGame2.unshift(pragmatic2);
            }
            let pragmatic = dataGame2.find((e) => e.key === "9");
            if (pragmatic) {
              let indexps = dataGame2.indexOf(pragmatic);
              dataGame2.splice(indexps, 1);
              dataGame2.unshift(pragmatic);
            }
            commit("handleUpdateGameProviderEvolution", [eve]);

            for (const e of dataGame2) {
              await getListGameCompany({ provider_id: e.key })
                .then((res) => {
                  if (res) {
                    let checkCasino = res?.games.filter(
                      (val) =>
                        val.names.type === "casino" ||
                        val.names.type === "Live Casino"
                    );
                    if (checkCasino.length > 0) {
                      if (e.key === 999999) {
                        e.name = "Evolution Gaming";
                      }
                      commit("handleUpdateListGameDetailProviderCasinoV2", [
                        {
                          key: e.key,
                          game: checkCasino,
                        },
                      ]);
                      commit("handleUpdateListGameProviderCasinoV2", [e]);
                    }
                    let checkSlot = res?.games.filter(
                      (val) => val.names.type === "slot"
                    );
                    if (checkSlot.length > 0) {
                      commit("handleUpdateListGameDetailProviderSlotV2", [
                        {
                          key: e.key,
                          game: checkSlot,
                        },
                      ]);
                      commit("handleUpdateListGameProviderSlotV2", [e]);
                      if (state.gameKey === null) {
                        commit("handleUpdateGameKeyV2", e);
                      }
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }

            // for (const e of dataGame) {
            //   if (e.category === "casino") {
            //     commit("handleUpdateListGameProviderCasinoGameJs", [e]);
            //     await getListGameCompany({ provider_id: e.key })
            //       .then((res) => {
            //         if (res) {
            //           commit("handleUpdateListGameDetailProviderCasinoGameJs", [
            //             {
            //               key: e.key,
            //               game: res.games,
            //             },
            //           ]);
            //         }
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //       });
            //   } else {
            //     await getListGameCompany({ provider_id: e.key })
            //       .then((res) => {
            //         if (res) {
            //           commit("handleUpdateListGameDetailProviderSlotGameJs", [
            //             {
            //               key: e.key,
            //               game: res.games,
            //             },
            //           ]);
            //         }
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //       });
            //     commit("handleUpdateListGameProviderSlotGameJs", [e]);
            //   }
            // }
            commit("handleUpdateLoadingCheck", false);
          }
        }
      }
    } else {
      /*alert(res?.message)*/
    }
  },
  async getListGameCompanyActionsV2({ commit }, data) {
    const res = await getListGameCompany(data);
    if (res?.code === 0) {
      return res.games;
    } else {
      return null;
    }
  },
  async getPlayGameSelectV2({ commit }, data) {
    const res = await playGame(data);
    if (res) {
      return res;
    }
  },
  // async getListGameAction({commit}, data) {
  //     const res = await getListGameRequest(data)
  //     if (res?.is_success) {
  //         commit("handleUpdateListGame", res?.list)
  //     } else {
  //         /*alert(res?.message)*/
  //     }
  // }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
