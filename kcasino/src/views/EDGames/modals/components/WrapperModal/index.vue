<template>
  <div class="wrapper">
    <div>
      <div class="top-modal">
        <img
          class="logo"
          :src="
            customPage.logo_image
              ? customPage.logo_image
              : require('@/assets/logo/sidebar/kcasino.png')
          "
          alt="logo"
        />
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);
</script>
<style scoped>
.wrapper {
  padding: 25px 48px;
  background-color: var(--bg);
}
.logo {
  width: 191px;
  height: 53px;
}
@media (max-width: 1024px) {
  .wrapper {
    padding: 40px 20px;
  }
}
@media (max-width: 426px) {
  .wrapper {
    padding: 20px 20px;
  }
}
@media (max-width: 280px) {
  .logo {
    width: 140px;
  }
}
</style>
