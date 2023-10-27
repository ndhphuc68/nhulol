import {
  getListGameCompany,
  getListGameProvider,
  playGame,
} from "@/api/games/request";
import { sortListGameCasino } from "@/utils";
import {
  gameModuleSunShine,
  gameTypeModuleSunShine,
} from "@/utils/game/gameSunShine";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  listGameProviderCasinoGameJs: [],
  listGameProviderSlotGameJs: [],
  listGameDetailProviderCasinoGameJs: [],
  listGameDetailProviderSlotGameJs: [],
  gameKey: gameTypeModuleSunShine.slot[0],
  tab: null,
  timer: null,
  module: "",
};

const getters = {
  getListGame(state) {
    return state.listGame;
  },
  getListGameDetailProviderCasinoGameJs(state) {
    return state.listGameDetailProviderCasinoGameJs;
  },
  getListGameDetailProviderSlotGameJs(state) {
    return state.listGameDetailProviderSlotGameJs;
  },
  getListGameProviderSlotGameJs(state) {
    return state.listGameProviderSlotGameJs ?? [];
  },
  getListGameProviderCasinoGameJs(state) {
    if (state.listGameProviderCasinoGameJs.length > 0) {
      let listCompanyGame = state.listGameProviderCasinoGameJs.sort(function (
        a,
        b
      ) {
        let nameA = a.key.toUpperCase();
        let nameB = b.key.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      listCompanyGame = listCompanyGame.filter(
        (e) => e.key.split("_")[0] !== "bota"
      );
      listCompanyGame = listCompanyGame.filter(
        (e) => e.key !== "microgaming_casino_fghub"
      );
      return sortListGameCasino(listCompanyGame);
    } else {
      return [];
    }
  },
  getListGameCasino(state) {
    if (state.listGameProvider.length > 0) {
      let listCompanyGame = state.listGameProvider
        .filter((e) => e.category === "casino")
        .sort(function (a, b) {
          let nameA = a.key.toUpperCase();
          let nameB = b.key.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

      listCompanyGame = listCompanyGame.filter(
        (e) => e.key.split("_")[0] !== "bota"
      );
      listCompanyGame = listCompanyGame.filter(
        (e) => e.key !== "microgaming_casino_fghub"
      );
      return sortListGameCasino(listCompanyGame);
    } else {
      return [];
    }
  },
  getListGameCasinoDoesNotMatch(state) {
    if (state.listGameProvider.length > 0) {
      const listCasino = state.listGameProvider
        .filter((e) => e.category === "casino")
        .sort(function (a, b) {
          let nameA = a.key.toUpperCase();
          let nameB = b.key.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      let listReturn = [];
      listCasino.forEach((e) => {
        if (listReturn.length > 0) {
          const check = listReturn.find(
            (val) => e.key.split("_")[0] === val.key.split("_")[0]
          );
          if (!check) {
            listReturn.push(e);
          }
        } else {
          listReturn.push(e);
        }
      });

      listReturn = listReturn.filter((e) => e.key.split("_")[0] !== "bota");

      return sortListGameCasino(listReturn);
    } else {
      return [];
    }
  },
  getListGameSlot(state) {
    let listGameSlot = state.listGameProvider.filter(
      (e) => e.category === "slot"
    );

    listGameSlot = listGameSlot.filter(
      (e) => e.key !== "microgaming_slot_fghub"
    );

    let ps = listGameSlot.find((e) => e.key.split("_")[0] === "ps");
    if (ps) {
      let indexps = listGameSlot.indexOf(ps);
      listGameSlot.splice(indexps, 1);
      listGameSlot.unshift(ps);
    }

    let nettent = listGameSlot.find((e) => e.key.split("_")[0] === "netent");
    if (nettent) {
      let indexnettent = listGameSlot.indexOf(nettent);
      listGameSlot.splice(indexnettent, 1);
      listGameSlot.unshift(nettent);
    }
    let playngo = listGameSlot.find((e) => e.key.split("_")[0] === "playngo");
    if (playngo) {
      let indexplayngo = listGameSlot.indexOf(playngo);
      listGameSlot.splice(indexplayngo, 1);
      listGameSlot.unshift(playngo);
    }
    let cq9 = listGameSlot.find((e) => e.key.split("_")[0] === "cq9");
    if (cq9) {
      let indexcq9 = listGameSlot.indexOf(cq9);
      listGameSlot.splice(indexcq9, 1);
      listGameSlot.unshift(cq9);
    }
    let gameart = listGameSlot.find((e) => e.key.split("_")[0] === "gameart");
    if (gameart) {
      let indexgameart = listGameSlot.indexOf(gameart);
      listGameSlot.splice(indexgameart, 1);
      listGameSlot.unshift(gameart);
    }
    let booongo = listGameSlot.find((e) => e.key.split("_")[0] === "booongo");
    if (booongo) {
      let indexbooongo = listGameSlot.indexOf(booongo);
      listGameSlot.splice(indexbooongo, 1);
      listGameSlot.unshift(booongo);
    }
    let pgsoft = listGameSlot.find((e) => e.key.split("_")[0] === "pgsoft");
    if (pgsoft) {
      let indexpgsoft = listGameSlot.indexOf(pgsoft);
      listGameSlot.splice(indexpgsoft, 1);
      listGameSlot.unshift(pgsoft);
    }
    let ag = listGameSlot.find((e) => e.key.split("_")[0] === "ag");
    if (ag) {
      let indexAg = listGameSlot.indexOf(ag);
      listGameSlot.splice(indexAg, 1);
      listGameSlot.unshift(ag);
    }
    let microgaming = listGameSlot.find(
      (e) => e.key.split("_")[0] === "microgaming"
    );
    if (microgaming) {
      let indexmicrogaming = listGameSlot.indexOf(microgaming);
      listGameSlot.splice(indexmicrogaming, 1);
      listGameSlot.unshift(microgaming);
    }
    let habanero = listGameSlot.find((e) => e.key.split("_")[0] === "habanero");
    if (habanero) {
      let indexHabanero = listGameSlot.indexOf(habanero);
      listGameSlot.splice(indexHabanero, 1);
      listGameSlot.unshift(habanero);
    }
    let evo = listGameSlot.find((e) => e.key.split("_")[0] === "evolution");
    if (evo) {
      let indexEvo = listGameSlot.indexOf(evo);
      listGameSlot.splice(indexEvo, 1);
      listGameSlot.unshift(evo);
    }
    let pra = listGameSlot.find((e) => e.key.split("_")[0] === "pragmatic");
    if (pra) {
      let indexPra = listGameSlot.indexOf(pra);
      listGameSlot.splice(indexPra, 1);
      listGameSlot.unshift(pra);
    }
    let gaming = listGameSlot.find((e) => e.key.split("_")[0] === "1X2Gaming");
    if (gaming) {
      let indexgaming = listGameSlot.indexOf(gaming);
      listGameSlot.splice(indexgaming, 1);
      listGameSlot.unshift(gaming);
    }
    return listGameSlot;
  },
};

const mutations = {
  handleUpdateListGameProvider(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGame(state, payload) {
    state.listGame = [...payload];
  },
  handleUpdateTabGame(state, payload) {
    state.tabGameActivate = payload;
  },
  handleUpdateGameKey(state, payload) {
    state.gameKey = payload;
  },
  handleUpdateTab(state, payload) {
    state.tab = payload;
  },
  handleUpdateTimer(state, payload) {
    state.timer = payload;
  },
  handleUpdateListGameProviderCasinoGameJs(state, payload) {
    state.listGameProviderCasinoGameJs = [
      ...state.listGameProviderCasinoGameJs,
      ...payload,
    ];
  },
  handleUpdateListGameProviderSlotGameJs(state, payload) {
    state.listGameProviderSlotGameJs = [
      ...state.listGameProviderSlotGameJs,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderCasinoGameJs(state, payload) {
    state.listGameDetailProviderCasinoGameJs = [
      ...state.listGameDetailProviderCasinoGameJs,
      ...payload,
    ];
  },
  handleUpdateListGameDetailProviderSlotGameJs(state, payload) {
    state.listGameDetailProviderSlotGameJs = [
      ...state.listGameDetailProviderSlotGameJs,
      ...payload,
    ];
  },
  handleUpdateModuleGame(state, payload) {
    state.module = payload;
  },
};

const actions = {
  async getListGameProviderActions({ commit }) {
    const res = await getListGameProvider();
    if (res?.is_success || res?.Data?.code === 0) {
      commit("handleUpdateListGameProvider", res?.Data?.vendors);
      for (const value of res?.Data?.vendors) {
        if (value.module === 1) {
          if (value.category === "slot") {
            commit("handleUpdateListGameProviderSlotGameJs", [value]);
          } else if (value.category === "casino") {
            commit("handleUpdateListGameProviderCasinoGameJs", [value]);
          }
        }
      }
      for (const value of res?.Data?.vendors) {
        if (value.module === 1) {
          if (value.category === "slot") {
            console.log(value.key);
            const res = await getListGameCompany({
              provider_id: value.key,
              module: value.module,
            });

            let listDetailSlot = gameModuleSunShine.listGameDetailProviderSlot;
            let saveSlot = [];
            let slot = listDetailSlot.find((a) => a.key === value.key);
            console.log("slot", slot);
            if (slot) {
              res?.games.forEach((value) => {
                let check = slot.game.find((game) => game.key === value.key);
                console.log(check);
                if (!check) {
                  console.log(123232);
                  saveSlot.push(value);
                }
              });
            } else {
              commit("handleUpdateListGameDetailProviderSlotGameJs", [
                {
                  key: value.key,
                  game: res?.games,
                },
              ]);
            }
            if (saveSlot.length > 0) {
              commit("handleUpdateListGameDetailProviderSlotGameJs", [
                {
                  key: value.key,
                  game: saveSlot,
                },
              ]);
            }
          } else if (value.category === "casino") {
            const res = await getListGameCompany({
              provider_id: value.key,
              module: value.module,
            });
            let listDetailCasino =
              gameModuleSunShine.listGameDetailProviderCasino;
            let saveCasino = [];
            let casino = listDetailCasino.find((a) => a.key === value.key);
            if (casino) {
              res?.games.forEach((value) => {
                let check = casino.game.find((game) => game.key === value.key);
                if (!check) {
                  saveCasino.push(value);
                }
              });
            } else {
              commit("handleUpdateListGameDetailProviderCasinoGameJs", [
                {
                  key: value.key,
                  game: res?.games,
                },
              ]);
            }
            if (saveCasino.length > 0) {
              commit("handleUpdateListGameDetailProviderCasinoGameJs", [
                {
                  key: value.key,
                  game: saveCasino,
                },
              ]);
            }
          }
        }
      }
    } else {
      /*alert(res?.message)*/
    }
  },
  async getListGameCompanyActions({ commit }, data) {
    const res = await getListGameCompany(data);
    if (res?.code === 0) {
      return res.games;
    } else {
      return null;
    }
  },
  async getPlayGameSelect({ commit }, data) {
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
