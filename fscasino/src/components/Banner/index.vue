<script setup>
import { Icons } from "@/const/Icons";
import { defineProps } from "vue";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="container-fluid banner-game-main position-relative">
    <img class="banner-slot w-100" :src="props.image" alt="banner" />
    <div
      class="container d-flex flex-row align-items-center item-banner justify-content-between"
    >
      <div class="d-flex flex-row align-items-center">
        <img class="icon-game" :src="Icons.game" alt="game" />
        <span class="ms-2">Slots</span>
      </div>
      <div class="input-search position-relative w-25">
        <img :src="Icons.search" alt="search" />
        <input type="text" class="form-control" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner-game-main {
  .item-banner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: 0 auto;

    .icon-game {
      width: 40px;
      height: 40px;
    }

    span {
      color: #fafafa;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .banner-slot {
      max-height: 700px;
      object-fit: cover;
      padding: 0;
    }

    .input-search {
      img {
        position: absolute;
        top: 10px;
        left: 10px;
      }

      input {
        padding-left: 35px;
        border-radius: 20px;
        background: #f2f2f2;
      }
    }
  }
}
</style>
