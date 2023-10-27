import { getMeRequest, changeProfileRequest } from "@/api/user/request";
import { convertMoney } from "@/utils";
import { SSRRequest } from "@/api/axios";
import i18n from "@/locales/i18n";
import {deleteCookie} from "@/utils/cookie";

const state = {
  userInfor: {},
};

const getters = {
  getUserInfor(state) {
    return state.userInfor;
  },
};

const mutations = {
  async updateUserInfor(state, payload) {

    let tempMoney = 0;

    if(state?.userInfor?.partnerSettleAmount && state.userInfor.partnerSettleAmount > 0)
    {
      tempMoney = state.userInfor.partnerSettleAmount;
    }

    state.userInfor = payload;
    if(tempMoney > 0)
    {
      state.userInfor.partnerSettleAmount = tempMoney;
    }

    if (state.userInfor.me_partnership_code != null) {
      let result = await getSettlementInfo();
      state.userInfor.partnerSettleAmount = result;
    }
  },
  resetUser(state) {
    state.userInfor = {};
  },
};

const actions = {
  async getMeAction({ commit,dispatch }, data) {
    const res = await getMeRequest(data);
    if (res?.is_success) {
      // if (res.member.me_money == 0) {
        let amount = res?.member?.all_games_amount.reduce(
          (a, b) => a + b.mg_money,
          0
        );
        res.member.me_money += amount;
      // }
      commit("updateUserInfor", res?.member);
    } else {
      if(res?.error_code === 900001) {
        await dispatch("showAlert", {
          type: "error",
          message: i18n.global.t("귀하의 계정이 차단되었습니다"),
        });
        localStorage.removeItem("_slg");
        localStorage.removeItem("mIdx");
        sessionStorage.clear();
        deleteCookie("MDS");
        deleteCookie("CID");
        deleteCookie("mIdx");
        location.reload();
      }
      /*alert(res?.message)*/
    }
  },
  async changeProfileAction({ dispatch }, data) {
    const res = await changeProfileRequest(data);
    if (res?.is_success) {
      dispatch("showAlert", {
        type: "success",
        message: i18n.global.t("changeProfileSuccess"),
      });
      await dispatch("getMeAction");
    } else {
      // console.log(res?.error_code)
      switch (res?.error_code.toString()) {
        case "-10000012" || "-10000008":
          dispatch("showAlert", {
            type: "error",
            message: i18n.global.t("errorCode-10000008"),
          });
          break;
        case "-10000006":
          dispatch("showAlert", {
            type: "error",
            message: i18n.global.t("errorCode-10000006"),
          });
          break;
        case "-100000009":
          dispatch("showAlert", {
            type: "error",
            message: i18n.global.t("errorCode-10000009"),
          });
          break;
        default:
          dispatch("showAlert", {
            type: "error",
            message: i18n.global.t("errorCode-10000007"),
          });
      }
    }
    return res;
  },
};

const getSettlementInfo = async () => {
  let res = undefined;
  try {
    res = await SSRRequest({
      url: "/api/partnership/settlement_info",
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }

  let _amount = 0;

  if (res?.data == undefined) {
    return 0;
  }

  let n_casino_bets_amount = res?.data.targetPartner.n_casino_bets_amount;
  let n_casino_win_amount = res?.data.targetPartner.n_casino_win_amount;
  let n_casino_lose_amount = res?.data.targetPartner.n_casino_lose_amount;
  let n_slot_bets_amount = res?.data.targetPartner.n_slot_bets_amount;
  let n_slot_win_amount = res?.data.targetPartner.n_slot_win_amount;
  let n_slot_lose_amount = res?.data.targetPartner.n_slot_lose_amount;

  _amount =
    Number(n_casino_bets_amount) +
    Number(n_casino_win_amount) +
    Number(n_casino_lose_amount) +
    Number(n_slot_bets_amount) +
    Number(n_slot_win_amount) +
    Number(n_slot_lose_amount);

  return _amount;
};

export default {
  state,
  getters,
  mutations,
  actions,
};
