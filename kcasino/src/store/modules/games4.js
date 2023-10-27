import {
  getListGameCompany,
  getListGameProvider,
  playGame,
} from "@/api/games/request";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  listGameProviderCasino: [],
  listGameProviderSlot: [],
  listGameDetailProviderCasino: [],
  listGameDetailProviderSlot: [],
  gameProviderEvolution: [
    // {
    //   id: 999999,
    //   company_id: 999999,
    //   vendor_id: 999999,
    //   key: 999999,
    //   name: "Evolution",
    //   logo: "https://contents.slotsdiamond.com/public/uploads/provider/Evolution.png",
    //   category: "casino",
    //   module: 0,
    // },
  ],
  gameKey: null,
  tab: null,
  timer: null,
  loadingCheck: true,
  onWeb: true,
  typeGamejs: "evolution",
  companySelect: null,
};

const getters = {
  getListGameV4(state) {
    return state.listGame;
  },
  getListGameCasinoV4(state) {
    return state.listGameProviderCasino.filter(
      (e) => e.key !== "25" && e.key !== "8" && e.key !== "35"
    );
  },
  getListGameSlotV4(state) {
    const newObjects = state.listGameProviderSlot.reduce((acc, object) => {
      if (acc.some((item) => item.key === object.key)) {
        return acc;
      }
      acc.push(object);
      return acc;
    }, []);
    return newObjects;
  },
  listGameDetailProviderCasinoV4(state) {
    return state.listGameDetailProviderCasino;
  },
  listGameDetailProviderSlotV4(state) {
    return state.listGameDetailProviderSlot;
  },
  getGameEvolutionV4(state) {
    return state.gameProviderEvolution;
  },
};

const mutations = {
  handleUpdateListGameProviderV4(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGameProviderCasinoV4(state, payload) {
    state.listGameProviderCasino = [
      ...state.listGameProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameProviderSlotV4(state, payload) {
    state.listGameProviderSlot = [...state.listGameProviderSlot, ...payload];
  },
  handleUpdateListGameDetailProviderCasinoV4(state, payload) {
    state.listGameDetailProviderCasino = [
      ...state.listGameDetailProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderSlotV4(state, payload) {
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
  handleUpdateGameKeyV4(state, payload) {
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
  handleUpdateCompanySelect(state, payload) {
    state.companySelect = payload;
  },
};

const actions = {
  async getListGameProviderActionsV4({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      // commit("handleUpdateListGameProviderV4", res?.Data?.vendors);
      let check = true;
      if (check) {
        if (res?.Data?.vendors) {
          let gameEvolution = res?.Data?.vendors[0].data;
          let dataGame = res?.Data?.vendors[2].data;
          let dataGame2 = res?.Data?.vendors[1].data;

          commit("handleUpdateLoadingCheck", true);

          if (gameEvolution) {
            commit("handleUpdateGameProviderEvolution", gameEvolution);
          }

          if (dataGame2.length > 0) {
            let eve = dataGame2.find((e) => e.key === "25");
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
            if (eve) {
              eve.name = "Evolution Gaming";
            }
            // commit("handleUpdateGameProviderEvolution", [eve]);

            for (const e of dataGame) {
              if (e.category === "casino") {
                commit("handleUpdateListGameProviderCasinoGameJs", [e]);
                // await getListGameCompany({ provider_id: e.key, module: 2 })
                //   .then((res) => {
                //     if (res) {
                //       if (res.games) {
                //         commit(
                //           "handleUpdateListGameDetailProviderCasinoGameJs",
                //           [
                //             {
                //               key: e.key,
                //               game: res.games,
                //             },
                //           ]
                //         );
                //         commit("handleUpdateListGameProviderCasinoGameJs", [e]);
                //       }
                //     }
                //   })
                //   .catch((e) => {
                //     console.log(e);
                //   });
              } else {
                commit("handleUpdateListGameProviderSlotGameJs", [e]);
                // await getListGameCompany({ provider_id: e.key, module: 2 })
                //   .then((res) => {
                //     if (res) {
                //       if (res.games) {
                //         commit("handleUpdateListGameDetailProviderSlotGameJs", [
                //           {
                //             key: e.key,
                //             game: res.games,
                //           },
                //         ]);
                //         commit("handleUpdateListGameProviderSlotGameJs", [e]);
                //       }
                //     }
                //   })
                //   .catch((e) => {
                //     console.log(e);
                //   });
              }
            }

            for (const e of dataGame2) {
              await getListGameCompany({ provider_id: e.key, module: 1 })
                .then((res) => {
                  if (res) {
                    if (res?.games) {
                      let checkCasino = res?.games.filter(
                        (val) =>
                          val.names.type === "casino" ||
                          val.names.type === "Live Casino"
                      );
                      if (checkCasino.length > 0) {
                        commit("handleUpdateListGameDetailProviderCasinoV4", [
                          {
                            key: e.key,
                            game: checkCasino,
                          },
                        ]);
                        commit("handleUpdateListGameProviderCasinoV4", [e]);
                      }
                      let checkSlot = res?.games.filter(
                        (val) => val.names.type === "slot"
                      );
                      if (checkSlot.length > 0) {
                        commit("handleUpdateListGameDetailProviderSlotV4", [
                          {
                            key: e.key,
                            game: checkSlot,
                          },
                        ]);
                        commit("handleUpdateListGameProviderSlotV4", [e]);
                        if (state.gameKey === null) {
                          commit("handleUpdateGameKeyV4", e);
                        }
                      }
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }

            commit("handleUpdateLoadingCheck", false);
          }
        }
      }
    } else {
      /*alert(res?.message)*/
    }
  },
  async getListGameCompanyActionsV4({ commit }, data) {
    const res = await getListGameCompany(data);
    if (res?.code === 0) {
      return res.games;
    } else {
      return null;
    }
  },
  async getPlayGameSelectV4({ commit }, data) {
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
