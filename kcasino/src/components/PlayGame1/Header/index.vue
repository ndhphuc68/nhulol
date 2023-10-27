<template>
  <div
    class="wrapper-header"
    id="wrapper-header"
    :style="customPage?.form_pos === '1' ? 'flex-direction: row-reverse' : ''"
  >
    <slot></slot>
    <div class="wrapper-tabs d-none d-xl-flex">
      <button
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: location.path === '/' + item?.href }"
        class="tab-item"
        @click="handleNavigate(item?.href)"
      >
        <component :is="item.icon" class="icon-item mr-2" />
        <span class="text-item"> {{ $t(item.text) }}</span>
      </button>
    </div>
    <AuthGroup />
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted } from "vue";
import { tabs } from "./data";
import AuthGroup from "@/components/PlayGame1/AuthGroup/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);
const router = useRouter();
const location = useRoute();
defineProps({
  isOpenSidebar: Boolean,
  isMobile: Boolean,
});

onMounted(() => {
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("wrapper-header").style.top = "0";
    } else {
      document.getElementById("wrapper-header").style.top =
        "-120px"; /* adjust this value to the height of your header */
    }
    prevScrollpos = currentScrollPos;
  };
});

const handleNavigate = (href) => {
  router.push(href);
};
</script>

<style lang="scss" scoped>
.wrapper-header {
  padding: 0 2rem;
  height: 6rem;
  border-bottom: 1px solid #e4e4e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  background: var(--bg);
  top: 0;
  z-index: 3;
  max-width: 1440px;
  transition: all 0.4s ease;
  .wrapper-tabs {
    display: flex;

    .tab-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0.001em;
      text-align: left;
      color: var(--neutral);

      svg {
        margin-right: 4px;
      }

      &:first-child {
        margin-right: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}
</style>
