import { createStore} from "vuex";
import modal from "@/store/modules/modal";
import auth from "@/store/modules/auth";
import notice from "@/store/modules/notice";
import games from "@/store/modules/games"
const store = createStore({
  state () {},
  mutations: {
  },
  getters: {},
  actions: {},
  modules: {
      modal,
      auth,
      notice,
      games
  }
})

export default store