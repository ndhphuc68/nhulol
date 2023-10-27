import {
  getListGameCompany,
  getListGameProvider,
  playGame,
} from "@/api/games/request";
import {
  gameModule117,
  gameTypeModule17,
} from "@/utils/game/dataGameModule1vs7";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  listGameProviderCasino: [],
  listGameProviderSlot: [],
  listGameDetailProviderCasino: [],
  listGameDetailProviderSlot: [],
  // gameProviderEvolution: [
  //   {
  //     id: 999999,
  //     company_id: 999999,
  //     vendor_id: 999999,
  //     key: 999999,
  //     name: "Evolution",
  //     logo: "https://contents.slotsdiamond.com/public/uploads/provider/Evolution.png",
  //     category: "casino",
  //     module: 0,
  //   },
  // ],
  gameKey: gameTypeModule17.slot[0],
  tab: null,
  timer: null,
  loadingCheck: true,
  onWeb: true,
  typeGamejs: "evolution",
  module: null,
};

const getters = {
  getListGameV8(state) {
    return state.listGame;
  },
  getListGameCasinoV8(state) {
    // return state.listGameProviderCasino;
    return state.listGameProviderCasino.filter(
      (e) => e.key !== "8" && e.key !== "35"
    );
  },
  getListGameSlotV8(state) {
    return state.listGameProviderSlot.filter((e) => e.key !== "993");
  },
  listGameDetailProviderCasinoV8(state) {
    return state.listGameDetailProviderCasino;
  },
  listGameDetailProviderSlotV8(state) {
    return state.listGameDetailProviderSlot;
  },
  // getGameEvolution(state) {
  //   return state.gameProviderEvolution;
  // },
};

const mutations = {
  handleUpdateListGameProviderV8(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGameProviderCasinoV8(state, payload) {
    state.listGameProviderCasino = [
      ...state.listGameProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameProviderSlotV8(state, payload) {
    state.listGameProviderSlot = [...state.listGameProviderSlot, ...payload];
  },
  handleUpdateListGameDetailProviderCasinoV8(state, payload) {
    state.listGameDetailProviderCasino = [
      ...state.listGameDetailProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderSlotV8(state, payload) {
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
  handleUpdateGameKeyV8(state, payload) {
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
  // handleUpdateGameProviderEvolution(state, payload) {
  //   state.gameProviderEvolution = payload;
  // },
  handleUpdateTypeGameJs(state, payload) {
    state.typeGamejs = payload;
  },
  handleUpdateModule(state, payload) {
    state.module = payload;
  },
};

const actions = {
  async getListGameProviderActionsV8({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      let check = true;
      if (check) {
        if (res?.Data) {
          // let dataGame7 = res?.Data?.vendors[10].data;
          // let gameSlotWazdan = null;
          // if (dataGame7) {
          //   gameSlotWazdan = dataGame7.find((e) => e.key === 999991);
          //   gameSlotWazdan.name = "Pragmatic";
          // }
          let dataGame2 = res?.Data?.vendors[10].data;
          commit("handleUpdateLoadingCheck", false);

          if (dataGame2.length > 0) {
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

            // if (gameSlotWazdan) {
            //   dataGame2.unshift(gameSlotWazdan);
            // }

            // dataGame2.unshift({
            //   id: 999999,
            //   company_id: 999999,
            //   vendor_id: 999999,
            //   key: 999999,
            //   name: "Evolution",
            //   logo: "https://contents.slotsdiamond.com/public/uploads/provider/Evolution.png",
            //   category: "casino",
            //   module: 0,
            // });

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
                      let listDetailCasino =
                        gameModule117.listGameDetailProviderCasino;
                      let saveCasino = [];
                      let casino = listDetailCasino.find(
                        (a) => a.key === e.key
                      );
                      if (casino) {
                        checkCasino.forEach((value) => {
                          let check = casino.game.find(
                            (game) => game.key === value.key
                          );
                          if (!check) {
                            saveCasino.push(value);
                          }
                        });
                      } else {
                        commit("handleUpdateListGameDetailProviderCasinoV8", [
                          {
                            key: e.key,
                            game: checkCasino,
                          },
                        ]);
                      }
                      if (saveCasino.length > 0) {
                        commit("handleUpdateListGameDetailProviderCasinoV8", [
                          {
                            key: e.key,
                            game: saveCasino,
                          },
                        ]);
                      }
                      // if (e.key === 25) {
                      //   e.name = "Evolution Gaming";
                      // }
                      // commit("handleUpdateListGameDetailProviderCasinoV8", [
                      //   {
                      //     key: e.key,
                      //     game: checkCasino,
                      //   },
                      // ]);
                      commit("handleUpdateListGameProviderCasinoV8", [e]);
                    }

                    let checkSlot = res?.games.filter(
                      (val) =>
                        val.names?.type === "slot" || val.category === "slot"
                    );
                    if (checkSlot.length > 0) {
                      let listDetailSlot =
                        gameModule117.listGameDetailProviderSlot;
                      let saveSlot = [];
                      let slot = listDetailSlot.find((a) => a.key === e.key);

                      if (slot) {
                        checkSlot.forEach((value) => {
                          let check = slot.game.find(
                            (game) => game.key === value.key
                          );
                          if (!check) {
                            saveSlot.push(value);
                          }
                        });
                      } else {
                        commit("handleUpdateListGameDetailProviderSlotV8", [
                          {
                            key: e.key,
                            game: checkSlot,
                          },
                        ]);
                      }
                      if (saveSlot.length > 0) {
                        commit("handleUpdateListGameDetailProviderSlotV8", [
                          {
                            key: e.key,
                            game: saveSlot,
                          },
                        ]);
                      }
                      // commit("handleUpdateListGameDetailProviderSlotV8", [
                      //   {
                      //     key: e.key,
                      //     game: checkSlot,
                      //   },
                      // ]);
                      commit("handleUpdateListGameProviderSlotV8", [e]);
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
  async getListGameCompanyActionsV8({ commit }, data) {
    const res = await getListGameCompany(data);
    if (res?.code === 0) {
      return res.games;
    } else {
      return null;
    }
  },
  async getPlayGameSelectV8({ commit }, data) {
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
