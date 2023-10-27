// import { getCustomPage } from "@/api/customPage/request";

const state = {
  styles: {
    bg_color: "",
    bg_image: "",
    chat_yn: "0",
    footer_banners: null,
    form_pos: "",
    logo_image: null,
    logo_pos: "",
    nav_pos: "0",
    template: "",
    game_vendors: null,
  },
  //     {
  //     "bg_color": "#211f1f11",
  //     "bg_image": "",
  //     "logo_pos": "0",
  //     "logo_image": null,
  //     "nav_pos": "1",
  //     "form_pos": "0",
  //     "footer_banners": null,
  //     "chat_yn": "0"
  // }
};

const getters = {};

const mutations = {
  // handleUpdateStyles(state, payload) {
  //   state.styles = payload;
  // },
};

const actions = {
  // async getStylesAction({ commit }) {
  //   const res = await getCustomPage();
  //   try {
  //     commit("handleUpdateStyles", res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
