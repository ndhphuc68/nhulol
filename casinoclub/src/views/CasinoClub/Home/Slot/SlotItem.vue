<template>
  <article class="item-slot">
    <img
      :src="require(`@/assets/CasinoClub/slot/${slotItem.img}.png`)"
      class="banner"
      alt="slot"
    />
    <div class="bottom px-3 px-lg-0 w-100">
      <div class="me-2 me-md-5">
        <img
          :src="
            require(`@/assets/CasinoClub/logo-companies/${slotItem.key}.png`)
          "
          alt="logo"
          class="logo-company"
        />
      </div>
      <div class="mf-2 mf-md-5 d-flex align-items-center">
        <button></button>
      </div>
    </div>
  </article>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  slotItem: Object,
});
</script>
<style scoped lang="scss">
article {
  position: relative;
  background: transparent;
  transition: all 0.3s ease;
  padding: 0;
  height: fit-content;

  .banner {
    width: 100%;
  }
  .disable-item {
    cursor: not-allowed !important;
    filter: grayscale(100%);
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-company {
    height: 35px;
    width: 95px;
    object-fit: contain;
  }

  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url("@/assets/CasinoClub/slot/button-play.png") no-repeat;
    background-size: 130% 130%;
    background-position: center;
  }

  &:hover {
    cursor: pointer;
    scale: 1.02;

    .banner {
      box-shadow: 0px 4px 30px 8px rgba(0, 0, 0, 0.2);
    }

    button {
      background: url("@/assets/CasinoClub/slot/button-play-hover.png")
        no-repeat;
      background-size: 130% 130%;
      background-position: center;
    }
  }
}

@media (max-width: 576px) {
  .bottom {
    bottom: 0 !important;
  }
  .logo-company {
    height: 28px !important;
    width: 75px !important;
  }
}
</style>
