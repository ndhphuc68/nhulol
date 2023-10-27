<template>
  <div class="navbar-menu">
    <div
      v-for="(item, index) in menuNavbar"
      :key="index"
      :class="{
        active:
          //   location.path === '/' + item?.href ||
          //   (location.path === '/' && item?.key === 'home'),
          (location.path === item.href &&
            checkActiveGameBottom === item.activeGame) ||
          (location.path === item.href &&
            checkActiveGameBottom === 3 &&
            item.activeGame === 3),
      }"
      class="sidebar-item"
      @click="
        () => {
          handleClickSidebar(item);
        }
      "
    >
      <component :is="item.icon" class="icon-item" />
      <span class="text-item"> {{ $t(item.key) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { menuNavbar } from "./data";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const location = useRoute();
const router = useRouter();
const store = useStore();
const checkActiveGameBottom = ref(3);
const handleClickSidebar = (item) => {
  if (item.key === "casino" || item.key === "slot") {
    const element = document.getElementById("tabGame");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
    checkActiveGameBottom.value = item.activeGame;
    store.commit("handleUpdateTabGame", item.key === "casino" ? 0 : 1);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
    checkActiveGameBottom.value = 3;
  }

  if (item.key === "home") {
    store.commit("handleUpdateTabGame", 0);
  }
  router.push(item.href);
};
</script>

<style scoped lang="scss">
.navbar-menu {
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 20px;
  bottom: 0;
  z-index: 3;
  width: 100%;
  background: #fafafa;
  border-top: 1px solid rgba(228, 228, 231, 1);

  .sidebar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .text-item {
      color: var(--text-second);
    }

    &.active {
      .text-item {
        color: var(--text);
      }
    }
  }
}
</style>
<style>
.navbar-menu {
  .active svg path {
    fill: var(--primaryG2Casino);
  }
}
</style>
