import { createStore} from "vuex";
import auth from "@/store/modules/auth";
import modal from "@/store/modules/modals";
import notice from "@/store/modules/notice";
import partnership from "@/store/modules/partnership";
const store = createStore({
  state () {},
  mutations: {
  },
  getters: {},
  actions: {},
  modules: {
    modal,
    auth,
    // user,
    // games,
    // deposit,
    // withdraw,
    // message,
    // helpCenter,
    // toast,
    partnership,
    notice,
    // customPage
  }
})

export default store