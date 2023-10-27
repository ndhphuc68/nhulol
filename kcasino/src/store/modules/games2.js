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
  gameProviderEvolution: [
    {
      id: 999999,
      company_id: 999999,
      vendor_id: 999999,
      key: 999999,
      name: "Evolution",
      logo: "https://contents.slotsdiamond.com/public/uploads/provider/Evolution.png",
      category: "casino",
      module: 0,
    },
  ],
  gameKey: null,
  tab: null,
  timer: null,
  loadingCheck: true,
  onWeb: true,
  typeGamejs: "evolution",
  module: null,
};

const getters = {
  getListGameV2(state) {
    return state.listGame;
  },
  getListGameCasinoV2(state) {
    // return state.listGameProviderCasino;
    return state.listGameProviderCasino.filter(
      (e) => e.key !== "8" && e.key !== "35"
    );
  },
  getListGameSlotV2(state) {
    return state.listGameProviderSlot.filter((e) => e.key !== "993");
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
  handleUpdateModule(state, payload) {
    state.module = payload;
  },
};

const actions = {
  async getListGameProviderActionsV2({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      let check = true;
      if (check) {
        if (res?.Data) {
          let dataGame6 = res?.Data?.vendors[6].data;
          let gameSlotWazdan = null;
          if (dataGame6) {
            gameSlotWazdan = dataGame6.find((e) => e.key === "Wazdan");
          }
          let dataGame2 = res?.Data?.vendors[1].data;
          commit("handleUpdateLoadingCheck", true);

          if (dataGame2.length > 0) {
            if (gameSlotWazdan) {
              dataGame2.push(gameSlotWazdan);
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

            let eve = dataGame2.find((e) => e.key === "25");
            if (eve) {
              let index = dataGame2.indexOf(eve);
              dataGame2.splice(index, 1);
              dataGame2.unshift(eve);
            }

            if (eve) {
              eve.name = "Evolution Gaming";
            }
            dataGame2 = dataGame2.filter((e) => e.id !== "25");

            dataGame2.unshift({
              id: 999999,
              company_id: 999999,
              vendor_id: 999999,
              key: 999999,
              name: "Evolution",
              logo: "https://contents.slotsdiamond.com/public/uploads/provider/Evolution.png",
              category: "casino",
              module: 0,
            });

            for (const e of dataGame2) {
              await getListGameCompany({
                provider_id: e.key,
                module: e.key === 999999 ? 0 : e.module,
              })
                .then((res) => {
                  if (res) {
                    let checkCasino = res?.games.filter(
                      (val) =>
                        val.names?.type === "casino" ||
                        val.names?.type === "Live Casino"
                    );
                    if (checkCasino.length > 0) {
                      if (e.key === 25) {
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
                      (val) =>
                        val.names?.type === "slot" || val.category === "slot"
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
