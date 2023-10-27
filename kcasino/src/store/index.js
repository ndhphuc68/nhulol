import { createStore } from "vuex";
import modal from "@/store/modules/modal";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import games from "@/store/modules/games";
import games2 from "@/store/modules/games2";
import games3 from "@/store/modules/games3";
import games4 from "@/store/modules/games4";
import games5 from "@/store/modules/games5";
import games6 from "@/store/modules/games6";
import games7 from "@/store/modules/games7";
import games8 from "@/store/modules/games8";
import deposit from "@/store/modules/deposit";
import withdraw from "@/store/modules/withdraw";
import message from "@/store/modules/message";
import helpCenter from "@/store/modules/helpCenter";
import toast from "@/store/modules/toast";
import partnership from "@/store/modules/partnership";
import notice from "@/store/modules/notice";
import customPage from "@/store/modules/customPage";
import coupon from "@/store/modules/coupon";
import bank from "@/store/modules/bank";

const store = createStore({
  state() {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    modal,
    auth,
    user,
    coupon,
    games,
    games2,
    games3,
    games4,
    games5,
    games6,
    games7,
    games8,
    deposit,
    withdraw,
    message,
    helpCenter,
    toast,
    partnership,
    notice,
    customPage,
    bank,
  },
});

export default store;
