<template>
  <section class="mt-3">
<!--    <Carousel :showIndicators="true" :showNavigators="true" :circular="true" :autoplayInterval="5000"-->
<!--              :value="products" :numVisible="1"-->
<!--              :numScroll="1" :responsiveOptions="responsiveOptions">-->
<!--      <template #item="slotProps">-->
<!--        <div class="">-->
<!--          <img :src="slotProps.data" alt=".."/>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Carousel>-->
    <div class="slider-banner-td">
      <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          class="custom dots-banner"
          height="auto"
      >
        <v-carousel-item class="item-slide" v-for="(slide, i) in slides" :key="i"
                         :src="require(`@/assets/SCCasino/banner/${slide.img}`)">
        </v-carousel-item>
      </v-carousel>
    </div>
  </section>
</template>

<script setup>
import Carousel from 'primevue/carousel';
import {useI18n} from "vue-i18n";
import {computed} from "vue";

// const products = [require('@/assets/SCCasino/banner_1.png'), require('@/assets/SCCasino/banner_2.png'), require('@/assets/SCCasino/banner_3.png')]
//
// const responsiveOptions = [
//   {
//     breakpoint: '1199px',
//     numVisible: 1,
//     numScroll: 1
//   },
//   {
//     breakpoint: '991px',
//     numVisible: 1,
//     numScroll: 1
//   },
//   {
//     breakpoint: '767px',
//     numVisible: 1,
//     numScroll: 1
//   }
// ]

const {locale} = useI18n()
const currentLang = computed(() => locale?.value);

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "banner-sc-ko.png" : "banner-sc.png",
  },
  {
    img: currentLang.value === "ko" ? "banner2-sc-ko.png" : "banner2-sc.png",
  },
  {
    img: currentLang.value === "ko" ? "banner3-sc-ko.png" : "banner3-sc.png",
  },
]);
</script>

<style>
.p-carousel-content {
  position: relative !important;
}

.p-highlight button {
  background-color: var(--primarySCCasino) !important;
  z-index: 2;
}

.p-carousel-indicators.p-reset {
  position: absolute !important;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  bottom: 0;
  z-index: 2;
}

@media (max-width: 767.98px) {
  .p-carousel-indicators.p-reset {
    display: none
  }
}

.p-carousel-container {
  position: relative !important;
}

.p-carousel-next {
  position: absolute !important;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  right: 10px;
  z-index: 1;
}

.p-carousel-prev {
  position: absolute !important;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  left: 10px;
  z-index: 1;
}

</style>

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