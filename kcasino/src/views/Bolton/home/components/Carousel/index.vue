<template>
  <section class="mt-3">
    <Carousel
      :showIndicators="true"
      :showNavigators="true"
      :circular="true"
      :autoplayInterval="5000"
      :value="slides"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div class="">
          <img :src="slotProps.data.img" alt=".." />
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from "primevue/carousel";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLang = computed(() => locale?.value);

const products = [
  require("@/assets/FSCasino/banner/banner1.png"),
  require("@/assets/FSCasino/banner/banner2.png"),
  require("@/assets/FSCasino/banner/banner3.png"),
];

const slides = computed(() => [
  {
    img:
      currentLang.value === "ko"
        ? require("@/assets/Bolton/banner/banner1-fs-ko.png")
        : require("@/assets/Bolton/banner/banner1-fs.png"),
  },
  {
    img:
      currentLang.value === "ko"
        ? require("@/assets/Bolton/banner/banner2-fs-ko.png")
        : require("@/assets/Bolton/banner/banner2-fs.png"),
  },
  {
    img:
      currentLang.value === "ko"
        ? require("@/assets/Bolton/banner/banner3-fs-ko.png")
        : require("@/assets/Bolton/banner/banner3-fs.png"),
  },
]);

const responsiveOptions = [
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "991px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
];
</script>

<style>
.p-carousel-content {
  position: relative !important;
}

.p-highlight button {
  background-color: var(--primaryFSCasino) !important;
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
    display: none;
  }

  .p-carousel .p-carousel-content .p-carousel-prev {
    z-index: 1;
  }

  .p-carousel .p-carousel-content .p-carousel-next {
    z-index: 0;
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
  z-index: 2;
}

.p-carousel-prev {
  position: absolute !important;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  left: 10px;
  z-index: 22;
}
</style>
