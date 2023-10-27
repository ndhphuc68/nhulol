<script setup>
import { computed, defineProps } from "vue";
import { navList } from "@/components/PlayG3/Header/data";
import DropdownLang from "@/components/PlayG3/AuthGroup/DropdownLang.vue";
import LogoutSidebar from "@/assets/PlayG3/icon/header/logout-sidebar.vue";
import { useRoute, useRouter } from "vue-router";
import Close from "@/assets/PlayG3/icon/header/close.vue";
import { useStore } from "vuex";
import { deleteCookie } from "@/utils/cookie";
import { logoutRequest } from "@/api/auth/request";

const location = useRoute();
defineProps({ isViewToggle: Boolean, handleToggleSidebar: Function });
const store = useStore();
const auth = computed(() => store.state.auth.auth);
const customPage = computed(() => store.state.customPage.styles);
const router = useRouter();

const handleLogout = async () => {
  store.commit("handleAuth");
  localStorage.removeItem("_slg");
  localStorage.removeItem("mIdx");
  sessionStorage.clear();
  await store.dispatch("clearIntervalAction");
  await store.dispatch("clearIntervalPingAction");
  deleteCookie("MDS");
  deleteCookie("CID");
  deleteCookie("mIdx");
  await logoutRequest();
  await router.push("/");
  window.location.reload();
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <router-link
        @click="handleToggleSidebar"
        :to="{ name: 'Home' }"
        class="logo-group d-block ms-4"
      >
        <img :src="customPage.logo_image && customPage.logo_image" />
      </router-link>
      <button class="btn-menu mt-2" @click="handleToggleSidebar">
        <component :is="Close" />
      </button>
      <div class="mt-3">
        <span class="menu"> {{ $t("menu") }} </span>
      </div>
      <nav>
        <RouterLink
          class="nav-item"
          v-for="(nav, index) in navList"
          :to="{ name: nav?.name }"
          :class="{ active: location?.name === nav?.name }"
          :key="index"
          @click="handleToggleSidebar"
        >
          <component class="nav-icon me-2" :is="nav?.icon" />
          <span>
            {{ $t(nav?.text) }}
          </span>
        </RouterLink>
      </nav>
      <div class="sidebar-bottom d-flex align-center justify-content-between">
        <DropdownLang />
        <div v-if="auth">
          <button class="btn-hover" @click="handleLogout">
            {{ $t("logout") }}
            <component :is="LogoutSidebar" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="isViewToggle" @click="handleToggleSidebar" class="overlay"></div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  background-color: var(--bgPlayG3);
  left: 0;
  top: 0;
  z-index: 3;
  width: 240px;
  bottom: 0;
  padding: 2rem 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .sidebar-container {
    height: 100%;
    margin: 0 2rem;
    position: relative;
    z-index: 3;

    .logo-group {
      width: 100px;

      img {
        width: 100%;
      }
    }

    .menu {
      font-size: 1.5rem;
    }

    nav {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      .nav-item {
        padding: 1.2rem 0;
        color: var(--textSecondPlayG3);
        text-decoration: none;
        display: flex;
        align-items: center;

        &:hover,
        &.active {
          color: var(--primaryPlayG3);
        }
      }
    }
  }

  .sidebar-bottom {
    flex-wrap: wrap;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 2;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
<style lang="scss">
.nav-item {
  svg {
    path {
      fill: var(--textSecondPlayG3);
    }
  }

  &:hover,
  &.active {
    color: var(--primaryPlayG3);

    svg {
      path {
        fill: #41bd5c;
      }
    }
  }
}
</style>
