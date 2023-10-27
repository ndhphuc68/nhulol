import { createStore } from "vuex";
import modal from "@/store/modules/modal";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import games from "@/store/modules/games";
import games2 from "@/store/modules/games2";
import games3 from "@/store/modules/games3";
import deposit from "@/store/modules/deposit";
import withdraw from "@/store/modules/withdraw";
import message from "@/store/modules/message";
import helpCenter from "@/store/modules/helpCenter";
import toast from "@/store/modules/toast";
import partnership from "@/store/modules/partnership";
import notice from "@/store/modules/notice";
import customPage from "@/store/modules/customPage";

const store = createStore({
  state() {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    modal,
    auth,
    user,
    games,
    games2,
    games3,
    deposit,
    withdraw,
    message,
    helpCenter,
    toast,
    partnership,
    notice,
    customPage,
  },
});

export default store;
