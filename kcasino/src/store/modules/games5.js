// dùng cho chạy ED,FS,TD chạy có module

import {
  getListGameCompany,
  getListGameProvider,
  playGame,
} from "@/api/games/request";
import { gameModule6, gameTypeModule6 } from "@/utils/game/dataGameList";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  listGameProviderCasino: [],
  listGameProviderSlot: [],
  listGameDetailProviderCasino: [],
  listGameDetailProviderSlot: [],
  // gameProviderEvolutionV5: [
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
  gameKey: gameTypeModule6.slot[0],
  tab: null,
  timer: null,
  loadingCheck: true,
  onWeb: true,
  typeGamejs: "evolution",
};

const getters = {
  getListGameV5(state) {
    return state.listGame;
  },
  getListGameCasinoV5(state) {
    // return state.listGameProviderCasino;
    return state.listGameProviderCasino.filter(
      (e) => e.key !== "8" && e.key !== "35"
    );
  },
  getListGameSlotV5(state) {
    return state.listGameProviderSlot;
  },
  listGameDetailProviderCasinoV5(state) {
    return state.listGameDetailProviderCasino;
  },
  listGameDetailProviderSlotV5(state) {
    return state.listGameDetailProviderSlot;
  },
};

const mutations = {
  handleUpdateListGameProviderV5(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGameProviderCasinoV5(state, payload) {
    state.listGameProviderCasino = [
      ...state.listGameProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameProviderSlotV5(state, payload) {
    state.listGameProviderSlot = [...state.listGameProviderSlot, ...payload];
  },
  handleUpdateListGameDetailProviderCasinoV5(state, payload) {
    state.listGameDetailProviderCasino = [
      ...state.listGameDetailProviderCasino,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderSlotV5(state, payload) {
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
  handleUpdateGameKeyV5(state, payload) {
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
  handleUpdateTypeGameJs(state, payload) {
    state.typeGamejs = payload;
  },
};

const actions = {
  async getListGameProviderActionsV5({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      let check = true;
      if (check) {
        if (res?.Data) {
          let dataGame2 = res?.Data?.vendors[6].data;
          commit("handleUpdateLoadingCheck", false);

          if (dataGame2.length > 0) {
            let pragmatic2 = dataGame2.find((e) => e.key === "pragmatic");
            if (pragmatic2) {
              let indexps2 = dataGame2.indexOf(pragmatic2);
              dataGame2.splice(indexps2, 1);
              dataGame2.unshift(pragmatic2);
            }

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
              if (e.category === "casino") {
                commit("handleUpdateListGameProviderCasinoV5", [e]);
              } else {
                // if (state.gameKey === null) {
                //   commit("handleUpdateGameKeyV5", e);
                // }
                commit("handleUpdateListGameProviderSlotV5", [e]);
              }
            }
            for (const e of dataGame2) {
              await getListGameCompany({
                provider_id: e.key,
                module: e.key === 999999 ? 0 : 6,
              })
                .then((res) => {
                  if (res) {
                    //casino
                    let checkCasino = res?.games.filter(
                      (val) =>
                        val.category !== "slot" && val.names?.type !== "slot"
                    );
                    if (checkCasino.length > 0) {
                      let listDetailCasino =
                        gameModule6.listGameDetailProviderCasino;
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
                        commit("handleUpdateListGameDetailProviderCasinoV5", [
                          {
                            key: e.key,
                            game: checkCasino,
                          },
                        ]);
                      }
                      if (saveCasino.length > 0) {
                        commit("handleUpdateListGameDetailProviderCasinoV5", [
                          {
                            key: e.key,
                            game: saveCasino,
                          },
                        ]);
                      }
                    }

                    //slot
                    let checkSlot = res?.games.filter(
                      (val) => val.category === "slot"
                    );
                    if (checkSlot.length > 0) {
                      let listDetailSlot =
                        gameModule6.listGameDetailProviderSlot;
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
                        commit("handleUpdateListGameDetailProviderSlotV5", [
                          {
                            key: e.key,
                            game: checkSlot,
                          },
                        ]);
                      }
                      if (saveSlot.length > 0) {
                        commit("handleUpdateListGameDetailProviderSlotV5", [
                          {
                            key: e.key,
                            game: saveSlot,
                          },
                        ]);
                      }
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
            // commit("handleUpdateLoadingCheck", false);
          }
        }
      }
    } else {
      /*alert(res?.message)*/
    }
  },
  async getListGameCompanyActionsV5({ commit }, data) {
    const res = await getListGameCompany(data);
    if (res?.code === 0) {
      return res.games;
    } else {
      return null;
    }
  },
  async getPlayGameSelectV5({ commit }, data) {
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
