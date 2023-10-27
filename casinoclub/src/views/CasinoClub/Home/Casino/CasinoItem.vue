<template>
  <article class="content w-100 h-100">
    <img
      :src="require(`@/assets/CasinoClub/logo-companies/${liveItem.key}.png`)"
      alt="logo"
      class="logo-companies"
    />
    <img
      :src="require(`@/assets/CasinoClub/lives/${liveItem.key}.png`)"
      alt="logo"
      class="image-live"
    />
  </article>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  liveItem: Object,
});
</script>

<style lang="scss" scoped>
.content {
  &:hover {
    .logo-companies {
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }
  }
}
.image-live {
  width: 160px;
  height: 130px;
  position: absolute;
  left: 15%;
  bottom: 0;
}

.logo-companies {
  width: 95px;
  height: 35px;
  position: absolute;
  right: 20px;
  top: calc(50% - 17px);
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

@media (max-width: 1200px) {
  .image-live {
    left: 5% !important;
  }
}

@media (max-width: 992px) {
  .logo-companies {
    width: 75px !important;
    height: 28px !important;
    top: 10px !important;
    right: 10px !important;
  }
}

@media (max-width: 768px) {
  .image-live {
    height: 120px;
    left: 5px !important;
  }
}

@media (min-width: 320px) and (max-width: 414px) {
  .image-live {
    width: 110px;
    height: 100px;
  }
}
</style>
