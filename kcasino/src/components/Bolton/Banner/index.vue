<script setup>
import { Icons } from "@/const/Icons";
import { defineProps } from "vue";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="container-fluid banner-game-main">
    <div class="w-100 position-relative">
      <img class="banner-slot w-100" :src="props.image" alt="banner" />
      <div
        class="container d-flex flex-row align-items-center item-banner justify-content-between"
      >
        <div class="d-lg-flex flex-row align-items-center d-none title">
          <img class="icon-game" :src="Icons.game" alt="game" />
          <span class="ms-2">{{ $t(title) }}</span>
        </div>
        <div class="input-search position-relative w-25">
          <!--        <img :src="Icons.search" alt="search" />-->
          <!--        <input type="text" class="form-control" />-->
        </div>
      </div>
    </div>
    <div class="w-100 mt-3 ps-3 ms-lg-0 d-lg-none container title">
      <div class="d-flex flex-row align-items-center">
        <img class="icon-game" :src="Icons.game" alt="game" />
        <span class="ms-2">{{ $t(title) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner-game-main {
  position: relative;
  .icon-game {
    width: 40px;
    height: 40px;
  }

  .title {
    position: absolute;
    bottom: 20px;
    left: 0;

    span {
      color: #fafafa;
      font-family: Poppins;
      font-size: 32px;
      font-weight: 700;
    }
  }

  .banner-slot {
    /* height: 500px; */
    object-fit: cover;
    padding: 0;

    @media (max-width: 1199.98px) {
      height: 400px;
    }

    @media (max-width: 991.98px) {
      height: 300px;
    }

    @media (max-width: 575.98px) {
      height: 200px;
    }
  }

  .item-banner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: 0 auto;

    span {
      color: #fafafa;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
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

  @media (max-width: 992px) {
    .title {
      position: relative !important;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      span {
        color: #545454;
        font-size: 24px;
      }
    }
  }
}
</style>
