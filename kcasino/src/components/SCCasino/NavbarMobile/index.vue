<script setup>
import { menuNavbar } from "./data";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const activeNavBottom = computed(() => store.state.auth.activeNavBottom);
const handleClickSidebar = (idx, key) => {
  store.commit("handleCloseAllModal");
  store.commit("handleActiveNavBottom", -1);
  store.commit("handleActiveSidebar", 0);
  if (key === "casino" || key === "slot") {
    const element = document.getElementById("tabGame");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
    store.commit("handleUpdateTabGame", key === "casino" ? 0 : 1);
  }
  if (key === "profile") {
    store.commit("handleActiveNavBottom", idx);
    store.commit("handleToggle", "profile");
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<template>
  <div class="navbar-menu">
    <div
      v-for="(item, index) in menuNavbar"
      :key="index"
      class="sidebar-item"
      :class="{ active: activeNavBottom === index }"
      @click="
        () => {
          handleClickSidebar(index, item?.key);
        }
      "
    >
      <component :is="item.icon" class="icon-item" />
      <span class="text-item"> {{ $t(item.key) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar-menu {
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 15px 40px;
  bottom: 0;
  z-index: 3;
  width: 100%;
  background: #fafafa;

  @media (max-width: 375px) {
    padding: 15px;
  }

  .sidebar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .text-item {
      color: var(--text-second);
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }

    &.active {
      .text-item {
        color: var(--text);
        @media (max-width: 375px) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style>
.navbar-menu {
  .active svg path {
    fill: var(--primarySCCasino);
  }

  .sidebar-item:hover svg path {
    fill: var(--primarySCCasino);
  }
}
</style>
