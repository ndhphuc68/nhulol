<template>
  <div
    class="DoPlay-Wrapper Wrapper-fluid"
    :style="`background-color: ${customPage?.bg_color} ; background-image:url(${customPage?.bg_image}`"
  >
    <div
      :class="layoutSidebar"
      class="layoutWrap"
      :style="
        customPage?.nav_pos === '2'
          ? 'flex-direction: row-reverse'
          : customPage?.nav_pos === '1'
          ? '  flex-direction: column'
          : ''
      "
    >
      <SidebarHoriontal v-if="customPage?.nav_pos == 1" />
      <Sidebar
        v-if="customPage?.nav_pos == 2 || customPage?.nav_pos == 0"
        :handleToggleSidebar="toggleSideMenu"
        class="sidebar sidebar-desktop"
      >
        <AuthGroup class="d-none d-sm-block d-md-none auth-group" />
      </Sidebar>
      <div v-if="isOpenSidebar" class="sidebar-mobile">
        <Sidebar :handleToggleSidebar="toggleSideMenu" class="sidebar">
          <AuthGroup class="auth-group" />
        </Sidebar>
        <div class="overlay" @click="toggleSideMenu"></div>
      </div>
      <div class="page overflow-x-hidden">
        <div class="top-mobile px-3">
          <button class="btn-toggle-menu" @click="toggleSideMenu">
            <img
              alt="logo-menu"
              class="menu-icon"
              src="@/assets/icon/commonsDoplay/menu.png"
            />
          </button>
          <div class="logo-group">
            <img
              class="logo-icon"
              :src="customPage.logo_image && customPage.logo_image"
            />
          </div>
        </div>
        <Home />
        <Footer />
      </div>
    </div>
  </div>
  <ModalDoPlayPage />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Sidebar from "@/layout/DoPlay/Components/Sidebar";
import Footer from "@/components/DoPlay/Footer";
import Home from "@/views/DoPlay/homeDoPlay";
import AuthGroup from "@/components/DoPlay/AuthGroup";
import ModalDoPlayPage from "@/components/DoPlay/Modal/ModalPage.vue";
import SidebarHoriontal from "@/layout/DoPlay/Components/Sidebar/SidebarHoriontal.vue";
import { useStore } from "vuex";

const store = useStore();
const layoutSidebar = ref("vertical-left");
const isOpenSidebar = ref(false);
const customPage = computed(() => store.state.customPage.styles);

const toggleSideMenu = () => {
  isOpenSidebar.value = !isOpenSidebar.value;
};

onMounted(async () => await store.dispatch("getStylesAction"));
</script>
<style lang="scss">
.DoPlay-Wrapper {
  font-family: Manrope, sans-serif;
  background-repeat: repeat;
  background-size: contain;
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
</style>
<style scoped lang="scss">
.layoutWrap {
  margin: 0 auto;
  max-width: 1440px;
  position: relative;
  width: 100%;
  background-color: var(--bg);
  color: var(--text);
  /*background: url("../assets/background/bg1.jpg") no-repeat;*/
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  overflow: visible;
}

.sidebar {
  position: sticky;
  top: 0;
  bottom: 0;
  height: 100vh;
  overflow-y: scroll;
}

.page {
  flex: 1;
  margin: 10px 0;
}

.sidebar-mobile {
  display: none;
}

.top-mobile {
  display: none;
}

.auth-group {
  margin: 20px;
}

@media (max-width: 1024px) {
  .sidebar-desktop {
    display: none;
  }

  .sidebar-mobile {
    display: block;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: var(--bg);
    z-index: 2;
    height: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    //z-index: 666;
    background-color: #1c2529;
    opacity: 0.5;
  }

  .top-mobile {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .btn-toggle-menu {
    justify-self: start;
  }

  .logo-group {
    justify-self: center;
  }

  .menu-icon {
    width: 26px;
    height: 26px;
  }

  .logo-icon {
    height: 50px;
  }

  .auth-group {
    margin: 5px;
  }
}
</style>
