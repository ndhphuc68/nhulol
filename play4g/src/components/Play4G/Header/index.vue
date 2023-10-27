<template>
  <div
      class="wrapper-header"
      id="wrapper-header"
      :style="customPage?.form_pos === '1' ? 'flex-direction: row-reverse' : ''"
  >
    <slot></slot>
    <AuthGroup />
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted } from "vue";
import { tabs } from "./data";
import AuthGroup from "@/components/Play4G/AuthGroup";
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
  padding: 0 5rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  background: var(--bg-headerPlay4G);
  top: 0;
  z-index: 3;
  //max-width: 1440px;
  transition: all 0.4s ease;
  
  @media (max-width: 1200px ) {
    justify-content: space-between;
    padding: 0 3rem;
  }
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
      
      span{
        color: var(--text-menuPlay4G);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}
</style>
