<template>
<!--  <div class="slide">-->
<!--    <v-carousel-->
<!--      :show-arrows="false"-->
<!--      class="custom"-->
<!--      cycle-->
<!--      delimiter-icon="'$delimiter'"-->
<!--      height="auto"-->
<!--      hide-delimiter-background-->
<!--    >-->
<!--      <v-carousel-item-->
<!--        v-for="(banner, index) in banners"-->
<!--        :key="index"-->
<!--        class="cssClass"-->
<!--      >-->
<!--        <v-sheet height="100%">-->
<!--          <div>-->
<!--            <img :src="banner.img" alt="banned" class="banned" />-->
<!--          </div>-->
<!--        </v-sheet>-->
<!--      </v-carousel-item>-->
<!--    </v-carousel>-->
<!--  </div>-->
  <div class="slider-banner-td">
    <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        class="custom dots-banner"
        height="auto"
    >
      <v-carousel-item  class="item-slide" v-for="(slide, i) in slides" :key="i"
                       :src="require(`@/assets/Duri/banner/newbanner/${slide.img}`)">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { banners } from "@/views/Duri/Home/Components/Slide/data";

import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n()
const currentLang = computed(() => locale?.value);

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "3.png" : "6.png",
  },
  {
    img: currentLang.value === "ko" ? "2.png" : "1.png",
  },
  {
    img: currentLang.value === "ko" ? "4.png" : "5.png",
  },
]);

</script>

<style lang="scss" scoped>
//.slide {
//  .custom {
//    width: 100%;
//
//    .v-window {
//      height: auto !important;
//    }
//
//    .banned {
//      width: 100%;
//      max-height: 510px;
//      border-radius: 8px;
//
//      @media (max-width: 768px) {
//        border-radius: 0;
//      }
//    }
//
//    .v-carousel__controls {
//      background: red !important;
//
//      .v-btn--icon {
//        background: red;
//      }
//    }
//  }
//
//  @media (max-width: 768px) {
//    width: calc(100% + 40px);
//    margin-left: -20px;
//    margin-top: -20px;
//  }
//}
</style>

<!--<style lang="scss">-->
<!--.custom {-->
<!--  .v-carousel__controls {-->
<!--    .v-btn {-->
<!--      background-color: #e4e4e7 !important;-->
<!--      width: 10px;-->
<!--      height: 10px;-->
<!--      margin-right: 10px;-->
<!--    }-->

<!--    .v-btn&#45;&#45;active {-->
<!--      color: #000000 !important;-->
<!--      background-color: #000000 !important;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
<style lang="scss">
.custom .v-carousel__controls .v-btn {
  color: #cdccc7 !important;
  background-color: transparent !important;
}

.custom .v-btn--active {
  color: #6d6d6d !important;
  /*border: 1px solid #ffff !important;*/
  background-color: #cfcdcd !important;
}

.slider-banner-td {
  .carousel {
    height: 200px !important;
  }

  .mdi-chevron-right, .mdi-chevron-left {
    color: #333;
  }

  @media (max-width: 1000px) {
    button.v-window__right, button.v-window__left {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 630px) {
    .v-carousel__controls {
      display: none
    }
  }

}
</style>
