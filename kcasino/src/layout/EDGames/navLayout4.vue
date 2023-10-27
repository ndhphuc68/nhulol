<template>
  <div class="EDGames-Wrapper">
    <div
      class="w-100 scroll-main"
      :style="`background-color: ${layout?.bg_color} ; background-image:url(${layout?.bg_image}`"
    >
      <div
        class="layoutWrap"
        ref="layoutWrap"
        :style="
          layout?.nav_pos == 2
            ? ` display: flex;
  justify-content: space-between; flex-direction: row-reverse; `
            : layout?.nav_pos == 1
            ? `display: flex; flex-direction: column; justify-content: center;`
            : `display: flex;`
        "
      >
        <!--          <div class="layoutWrap" :class="layoutSidebar" ref="layoutWrap">-->
        <div
          v-show="layout?.nav_pos == 2 || layout?.nav_pos == 0"
          class="sidebar-desktop"
        >
          <Sidebar
            v-if="layoutSidebar !== 'horizontal'"
            :classLayout="layoutSidebar"
          />
        </div>
        <SidebarHoriontal v-if="layout?.nav_pos == 1" />
        <div class="sidebar-mobile">
          <div class="side-mobile">
            <button @click="toggleSideMenu">
              <img class="menu" src="@/assets/icon/sidebar/menu.png" />
            </button>
            <button class="logo-group ml-5">
              <img
                :src="
                  layout?.logo_image
                    && layout?.logo_image
                "
              />
            </button>
          </div>
        </div>
        <div class="sidebar-main" v-if="isShowSideMenu">
          <Sidebar
            class="not-in-overlay"
            :isMobile="isShowSideMenu"
            :handleToggleSidebar="toggleSideMenu"
          />
        </div>
        <div
          class="overlay"
          v-if="isShowSideMenu"
          @click="toggleSideMenu"
        ></div>
        <div class="page overflow-x-hidden">
          <Home />
          <Footer />
        </div>
      </div>
    </div>
    <ModalPage />
  </div>
</template>
<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Sidebar from "@/components/EDGames/Sidebar";
import SidebarHoriontal from "@/components/EDGames/Sidebar/SidebarHoriontal.vue";
import Footer from "@/components/EDGames/Footer";
import ModalPage from "@/components/EDGames/modal/ModalPage";
import Home from "@/views/EDGames/home";

const store = useStore();
const isShowSideMenu = ref(false);
//vertical-left vertical-right horizontal
const layoutSidebar = ref("vertical-left");
const layout = computed(() => store.state.customPage.styles);
const partnershipData = computed(() => store.state.partnership.data);

/*if(layout.value.chat_yn == 1){
  window.__lc = window.__lc || {};
  window.__lc.license = 15648339;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
 setTimeout(() => {

 }, 2000)

}*/

watch(
  layout.value.chat_yn,
  (val) => {
    if (val == 1) {
      let liveChatCode = partnershipData.value["LIVE_CHAT_CODE"];

      window.__lc = window.__lc || {};
      window.__lc.license = String(liveChatCode)
        .split("license = ")[1]
        .split(";\r");
      (function (n, t, c) {
        function i(n) {
          return e._h ? e._h.apply(null, n) : e._q.push(n);
        }

        var e = {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function () {
            i(["on", c.call(arguments)]);
          },
          once: function () {
            i(["once", c.call(arguments)]);
          },
          off: function () {
            i(["off", c.call(arguments)]);
          },
          get: function () {
            if (!e._h)
              throw new Error(
                "[LiveChatWidget] You can't use getters before load."
              );
            return i(["get", c.call(arguments)]);
          },
          call: function () {
            i(["call", c.call(arguments)]);
          },
          init: function () {
            var n = t.createElement("script");
            (n.async = !0),
              (n.type = "text/javascript"),
              (n.src = "https://cdn.livechatinc.com/tracking.js"),
              t.head.appendChild(n);
          },
        };
        !n.__lc.asyncInit && e.init(),
          (n.LiveChatWidget = n.LiveChatWidget || e);
      })(window, document, [].slice);
    }
  }
);

const toggleSideMenu = () => {
  // isShowSideMenu.value = window.innerWidth > 1024 ? true : !isShowSideMenu.value;
  isShowSideMenu.value = !isShowSideMenu.value;
};

onMounted(async () => {
  await store.dispatch("getStylesAction");
});
</script>
<style>
.EDGames-Wrapper {
  font-family: Manrope;
}

@media (max-width: 375px) {
  .EDGames-Wrapper {
    font-size: 12px !important;
  }
}
</style>
<style scoped>
.w-100 {
  background-size: contain;
  background-repeat: repeat;
}

.layoutWrap {
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  width: 100%;
  background-color: transparent;
  color: var(--text);
  /*background: url("../assets/background/bg1.jpg") no-repeat;*/
  /*background-size: cover;*/
  /*background-repeat: no-repeat;*/
}

.layoutWrap.horizontal {
  flex-direction: column;
  align-items: center;
}

.layoutWrap.vertical-right {
  flex-direction: row-reverse;
}

.layoutWrap .rootWrap {
  width: 100%;
  transform-origin: top;
}

.sub-sidebar {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.contact-button {
  position: fixed;
  bottom: 70px;
  right: 50px;
  display: flex;
  align-items: center;
}

.sidebar-desktop {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: scroll;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 300px;
}

.sidebar-desktop::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.scroll-main::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.sidebar-mobile,
.sidebar-main,
.overlay {
  display: none;
}

.contact-button img {
  width: 50px;
  height: 50px;
  padding-right: 5px;
}

.page {
  overflow-y: scroll;
  width: 100%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.page::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.page {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media (max-width: 1024px) {
  .sidebar-desktop {
    display: none;
  }

  .sidebar-mobile {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    height: 70px;
    width: 100%;
    background-color: var(--bg);
    z-index: 3;
  }

  .side-mobile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20px;
  }

  .sidebar-main {
    width: 240px;
    display: block;
    position: sticky;
    top: 0;
    overflow-y: scroll;
    max-height: 100vh;
    z-index: 777;
  }

  .overlay {
    display: block;
    cursor: pointer;
  }

  .side-mobile .menu {
    width: 24px;
    height: 24px;
  }

  .side-mobile .logo-group {
    width: 65%;
    text-align: left;
    display: flex;
    justify-content: center;
  }

  .side-mobile .logo-group img{
    height: 50px;
  }

  .side-mobile .logo {
    width: 189px;
    height: 45px;
  }

  .contact-button {
    bottom: 30px;
    right: 30px;
  }

  .page {
    margin-top: 60px;
  }

  .not-in-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 666;
    background-color: #1c2529;
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .page {
    flex: unset;
  }
}
</style>
