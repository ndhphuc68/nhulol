<template>
  <div
    class="d-flex flex-row justify-content-evenly align-center w-100 pt-4 sidebar-horiontal"
  >
    <div class="d-flex flex-row justify-content-evenly align-center w-100">
      <img
        v-if="customPage.logo_pos === '' || customPage.logo_pos === '0'"
        @click="() => router.push('/')"
        :src="images.logo"
        alt="logo-do-play"
        class="image-logo"
      />
      <div
        v-for="(item, index) in menuSidebar"
        :key="index"
        :class="
          item.key === 'logo' && customPage.logo_pos !== '1'
            ? 'd-none'
            : { active: location.path === '/' + item?.href }
        "
        class="d-flex flex-column align-center sidebar-item"
        @click="
          () => {
            handleClickSidebar(item?.idx, item?.href);
          }
        "
      >
        <img
          v-if="item.key === 'logo' && customPage.logo_pos === '1'"
          @click="() => router.push('/')"
          :src="images.logo"
          alt="logo-do-play"
          class="image-logo"
        />
        <component
          v-if="item.key !== 'logo'"
          :is="item.icon"
          class="icon-item"
        />
        <span v-if="item.key !== 'logo'" class="text-item">
          {{ $t(item.key) }}</span
        >
      </div>
      <img
        v-if="customPage.logo_pos === '2'"
        :src="images.logo"
        @click="() => router.push('/')"
        alt="logo-do-play"
        class="image-logo"
      />
    </div>
    <AuthMobile class="d-block d-md-none" />
    <slot />
  </div>
</template>

<script setup>
import images from "@/assets/Duri";
import { menuSidebar } from "./data";
import { useRouter, useRoute } from "vue-router";
import AuthMobile from "./AuthMobile/index.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const location = useRoute();
const store = useStore();

const customPage = computed(() => store.state.customPage.styles);
const handleClickSidebar = (idxSidebar, href) => {
  router.push(`/${href}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.sidebar-horiontal {
  height: fit-content;
  padding: 30px 20px;
  margin: 10px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

  .image-logo {
    height: 50px;
    cursor: pointer;
  }

  .sidebar-item {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.active {
  .icon-item {
    path {
      fill: var(--primaryPlayG1);
    }
  }
}
</style>
