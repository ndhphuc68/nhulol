<template>
  <section id="header">
    <div
      class="container d-flex align-items-center h-100 justify-space-between"
    >
      <div class="d-block d-lg-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 25"
          fill="none"
          @click="handleShowSidebar"
        >
          <path
            d="M7 8.5H17M7 12.5H17M7 16.5H17"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="logo">
        <img src="@/assets/CasinoClub/logo/logo.png" />
        <img src="@/assets/CasinoClub/gif/gif-logo.gif" class="gif" />
      </div>
      <Auth />
    </div>
  </section>
</template>
<script setup>
import Auth from "@/components/CasinoClub/Auth";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const sidebar = computed(() => store.state.auth.sidebar);

const handleShowSidebar = () => {
  store.commit("handleToggleSidebar", !sidebar.value);
};
</script>
<style scoped lang="scss">
#header {
  height: 75px;
  background: var(--bg-color);

  svg {
    cursor: pointer;
  }

  .logo {
    position: relative;
    z-index: 1;
  }

  .gif {
    position: absolute;
    width: 281px;
    height: 60px;
    left: 0;
    z-index: 0;
  }
}

@media (max-width: 992px) {
  img {
    height: 30px;
  }

  .gif {
    width: 175px !important;
    top: -10px !important;
  }
}
</style>
