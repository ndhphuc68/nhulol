import {
  getListGameCompany,
  getListGameCompanyV3,
  getListGameProvider,
  getListGameProviderGGE,
  getListGameRequest,
  playGame,
  playGameV3,
} from "@/api/games/request";
import { sortListGameCasino } from "@/utils";

const state = {
  listGame: [],
  tabGameActivate: 0,
  listGameProvider: [],
  gameKey: "",
  tab: null,
  timer: null,
  module: "",
};

const getters = {
  getListGameCompanyCasinoV3(state) {
    let newArr = state.listGameProvider?.filter(
      (e) => e.vendorType === "CASINO"
    );
    let idx = newArr?.findIndex((item) => item.vendorCode === "Evolution");
    if (idx) {
      newArr.unshift(newArr[idx]);
      newArr.splice(idx + 1, 1);
    }
    return newArr;
  },
  getListGameCompanyCasinoBoltonV3(state) {
    let newArr = state.listGameProvider?.filter(
      (e) => e.vendorType === "CASINO"
    );
    let idx = newArr?.findIndex((item) => item.vendorCode === "Evolution");
    if (idx) {
      newArr.unshift(newArr[idx]);
      newArr.splice(idx + 1, 1);
    }
    const dataBolton = {
      vendorCode: "bolton",
      vendorName: "bolton",
      vendorType: "CASINO",
    };
    return newArr.length > 0 ? [dataBolton, ...newArr] : [];
  },
  getListGameCompanySlotV3(state) {
    let newArr = state.listGameProvider?.filter(
      (e) =>
        e.vendorType === "SLOT" &&
        e.vendorCode !== "Gamzix" &&
        e.vendorCode !== "Evoplay"
    );
    let idx = newArr?.findIndex((item) => item.vendorCode === "pragmatic");
    if (idx) {
      newArr.unshift(newArr[idx]);
      newArr.splice(idx + 1, 1);
    }
    return newArr;
  },
};

const mutations = {
  handleUpdateListGameProviderV3(state, payload) {
    state.listGameProvider = [...payload];
  },
  handleUpdateListGame(state, payload) {
    state.listGame = [...payload];
  },
  handleUpdateTabGame(state, payload) {
    state.tabGameActivate = payload;
  },
  handleUpdateGameKeyV3(state, payload) {
    state.gameKey = payload;
  },
  handleUpdateTab(state, payload) {
    state.tab = payload;
  },
  handleUpdateTimer(state, payload) {
    state.timer = payload;
  },
};

const actions = {
  async getListGameProviderActionsV3({ commit }) {
    const res = await getListGameProviderGGE();
    if (res?.is_success || res?.IsSuccess) {
      commit("handleUpdateListGameProviderV3", res?.Data);
      let newArr = res?.Data?.filter((e) => e.vendorType === "SLOT");
      let idx = newArr?.findIndex((item) => item.vendorCode === "pragmatic");
      if (idx) {
        newArr.unshift(newArr[idx]);
        newArr.splice(idx + 1, 1);
      }
      commit("handleUpdateGameKeyV3", newArr[0].vendorCode);
    } else {
      /*alert(res?.message)*/
    }
  },
  async getListGameCompanyActionsV3({ commit }, data) {
    const res = await getListGameCompanyV3(data);
    if (res?.IsSuccess) {
      const dataHide = [
        "CQC-777",
        "ELK-hitithard",
        "RTG-shelltasticwins",
        "RTG-threekingdomwars ",
        "NGE-aladdinschest",
        "RTG-threekingdomwars ",
        "NE-cupcakes",
        "NLC-teslajolt",
        "RED-cakeicecream",
        "RED-doggyrichesmegaways",
        "MNP-goldendragon2",
        "BNG-godstempledeluxe",
        "BPG-diamondmineboost",
        "BPG-divinelinks",
        "BTG-extrachilimegaways",
        "SWC-christmasluck",
        "SPR-seasonsautumn",
        "SHS-mightyfruits",
        "SHS-romanslegionsofgold",
        "IDS-astronewtsmegaways",
        "IDS-bloodqueen",
        "IDS-richieinvegas",
        "WAZ-9coinsxmasedition",
        "WAZ-luckyreels",
        "WAZ-magicspinsxmasedition",
        "WAZ-poghadesfootballedition",
        "KGL-atlantisthunder",
        "KGL-bangkokdreams",
        "KGL-bigbountybill",
        "KGL-burningdiamonds",
        "KGL-caribbeananne",
        "KGL-crystalcavern",
        "KGL-fireeagle",
        "KGL-hongbao",
        "KGL-jokermax",
        "KGL-jokersupreme",
        "KGL-mammothchase",
        "KGL-operationdiamondhunt",
        "KGL-pyropixie",
        "KGL-rubyhunter",
        "KGL-templeofheroes",
        "KGL-wildmine",
        "KGL-wildmine",
        "KGL-zombiequeen",
        "QS-cashtruckxmasdelivery",
        "QS-thewildchase",
        "TPG-ruyisroyalloveinthepalace",
        "PP-halLinsday",
        "CQC-fruitkingii",
        "CQC-muaythai",
        "CQC-sherlockholmes",
        "QS-thewildchase",
        "IDS-astronewtsmegaways",
        "SHS-romanslegionsofgold ",
        "NLC-teslajolt",
      ];
      let game = [];
      res.Data.forEach((e) => {
        let check = dataHide.find(
          (val) => val.toString().trim() === e.gameCode.toString().trim()
        );
        if (!check) {
          game.push(e);
        }
      });
      return game;
    } else {
      return null;
    }
  },
  async getPlayGameSelectV3({ commit }, data) {
    const res = await playGameV3(data);
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
