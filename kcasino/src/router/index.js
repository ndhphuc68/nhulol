import { createRouter, createWebHistory } from "vue-router";
import { paths } from "./path/path";
import store from "@/store";
import { getCustomPage } from "@/api/customPage/request";

let rt;
let res = null;
try {
  res = await getCustomPage();
  rt = paths[res.data.templete];
} catch (error) {
  rt = paths["EDGames"];
}

// rt = paths["PlayG1"];
rt = paths["Lighthouse"];
// rt = paths["Duri"];
// rt = paths["FSCasino"];
// rt = paths["EDGames"];
// rt = paths["DoPlay"];
// rt = paths["G2Casino"];
// rt = paths["Duri777"];
// rt = paths["SCCasino"];
// rt = paths["TDGames"];
// rt = paths["Bolton"];

const routes = rt;

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

router.onError((error) => {
  if (/ChunkLoadError:.*failed./i.test(error.message)) {
    window.location.reload();
  } else if (/Loading.*chunk.*failed./i.test(error.message)) {
    window.location.reload();
  }
});

router.beforeEach((to, from, next) => {
  document.title = res.data?.front_title || res.data?.templete || "EDGames";
  const link = document.querySelector("[rel='icon']");
  link.setAttribute("href", to.meta.icon);
  if (to.meta.requiresAuthModal) {
    // Kiểm tra điều kiện và điều hướng
    if (store.state.auth.auth) {
      next(); // Cho phép truy cập
    } else {
      // next("/"); // Chuyển hướng đến trang đăng nhập
      store.commit("handleToggle", "login");
    }
  } else {
    if (to.meta.checkAuth) {
      if (store.state.auth.auth) {
        next({ name: "Home" });
      } else next();
    } else {
      if (to.meta.requiresAuthPage) {
        if (store.state.auth.auth) {
          next();
        } else {
          next({ name: "Login" });
        }
      } else {
        next(); // Cho phép truy cập
      }
    }
  }
});

export default router;
