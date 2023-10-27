<script setup>
import {computed, ref, onMounted} from "vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n()
const currentLang = computed(() => locale?.value);

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "banner_home_1_ko.png" : "banner_home_1.png",
    name: "Luck game",
  },
  {
    img: currentLang.value === "ko" ? "banner_home_2_ko.png" : "banner_home_2.png",
    name: "main_banner2_02.png",
  },
  {
    img: currentLang.value === "ko" ? "banner_home_3_ko.png" : "banner_home_3.png",
    name: "main_banner3_02.png",
  },
]);

const cover = ref(true);
const height = ref('350');
onMounted(()=> {
  if (window.innerWidth < 1120) {
    cover.value = false;
    height.value = 'auto'

  } else {
    cover.value = true;
    height.value = '350'

  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1120) {
      cover.value = false;
      height.value = 'auto'

    }
    else {
      cover.value = true;
      height.value = '350'

    }
  });
})
</script>

<template>
  <section class="slider-banner-td my-5">
    <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        class="custom"
        :height="height"

    >
      <v-carousel-item :cover="cover" class="item-slide" v-for="(slide, i) in slides" :key="i"
                       :src="require(`@/assets/Play4G/banner/${slide.img}`)">
      </v-carousel-item>
    </v-carousel>
  </section>

</template>

<style scoped lang="scss">
.slider-banner-td {
  //max-width: 1440px;
  margin: 0 auto;
}

.item-slide {
  background-color: var(--primaryPlayG3)
}
</style>
<style lang="scss">
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
      display: flex;
    }
  }

  @media (max-width: 630px) {
    .v-carousel__controls {
      display: none
    }
    button.v-window__right, button.v-window__left {
      width: 20px;
      height: 20px;
    }
  }

}
</style>