<template>
  <section id="banner">
    <!--    <div class="image">-->
    <!--      <img src="@/assets/Duri777/banner/banner-home.png" alt="banner" />-->
    <!--      <div class="overlay" />-->
    <!--    </div>-->
    <div class="slider-banner-td">
      <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          class="custom dots-banner"
          :height="height"
      >
        <v-carousel-item :cover="cover" class="item-slide" v-for="(slide, i) in slides" :key="i"
                         :src="require(`@/assets/Duri777/banner/${slide.img}`)">
        </v-carousel-item>
<!--        <v-carousel-item :cover="cover" v-for="(slide, i) in slides" :key="i">-->
<!--          <div class="display-3 image">-->
<!--            <img-->
<!--                alt="banned"-->
<!--                class="banned"-->
<!--                :src="require(`@/assets/Duri777/banner/${slide.img}`)"-->
<!--            />-->
<!--            &lt;!&ndash;            <div class="overlay"/>&ndash;&gt;-->
<!--          </div>-->
<!--        </v-carousel-item>-->
      </v-carousel>
    </div>
    <!--    <div class="description">-->
    <!--      <div class="title">-->
    <!--        {{ $t("titleBanner1") }} <span>200%</span> {{ $t("titleBanner2") }}-->
    <!--      </div>-->
    <!--      <div class="wrap-button d-flex justify-center">-->
    <!--        <RouterLink to="/signup" class="signup" v-if="!auth">{{-->
    <!--            $t("signupNow")-->
    <!--          }}-->
    <!--        </RouterLink>-->
    <!--        &lt;!&ndash;        <RouterLink to="/" class="discover">{{ $t("discoverNow") }}</RouterLink>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>
<script setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";

const store = useStore()
const auth = computed(() => store.state.auth.auth)

const {locale} = useI18n()
const currentLang = computed(() => locale?.value);

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "banner-duri-ko.png" : "banner-duri.png",
  },
  {
    img: currentLang.value === "ko" ? "banner2-duri-ko.png" : "banner2-duri.png",
  },
  {
    img: currentLang.value === "ko" ? "banner3-duri-ko.png" : "banner3-duri.png",
  },
]);

const cover = ref(true);
const height = ref('350');
onMounted(() => {
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

    } else {
      cover.value = true;
      height.value = '350'

    }
  });
})
</script>
<style scoped lang="scss">
//#banner {
//  position: relative;
//
//  .image {
//    position: relative;
//    top: 0;
//    z-index: 0;
//
//    img.banned {
//      width: 100%;
//      object-fit: cover;
//      @media (max-width: 1280px) {
//        height: unset;
//        max-height: 450px;
//        min-height: 150px;
//      }
//    }
//
//    .overlay {
//      background: rgba(0, 0, 0, 0.5);
//      position: absolute;
//      width: 100%;
//      height: 100%;
//      top: 0;
//      left: 0;
//    }
//  }
//
//  .description {
//    position: absolute;
//    z-index: 1;
//    width: 100%;
//    top: 50%;
//    left: 50%;
//    transform: translate(-50%, -50%);
//
//    .title {
//      width: 1200px;
//      margin: 0 auto;
//      color: #fff;
//      text-align: center;
//      font-size: 60px;
//      font-weight: 700;
//      text-transform: uppercase;
//      line-height: 70px;
//      letter-spacing: -4px;
//
//      span {
//        color: #254ee0;
//      }
//    }
//
//    .wrap-button {
//      margin-top: 50px;
//
//      a {
//        padding: 12px 24px;
//        font-size: 16px;
//        font-weight: 700;
//        border: none;
//        text-decoration: none;
//        background: #fff;
//        color: #000;
//      }
//
//      .signup {
//        margin-right: 24px;
//        background: #254ee0;
//        color: #fff;
//      }
//    }
//  }
//
//  @media (max-width: 1200px) {
//    .description {
//      .title {
//        width: 700px;
//        font-size: 40px;
//        line-height: 42px;
//      }
//
//      .wrap-button {
//        margin-top: 30px;
//
//        a {
//          padding: 8px 16px;
//          font-size: 14px;
//        }
//      }
//    }
//  }
//
//  @media (max-width: 991px) {
//    .custom {
//      height: unset !important;
//    }
//  }
//
//  @media (max-width: 768px) {
//    .description {
//      .title {
//        width: 500px;
//        font-size: 24px;
//        line-height: 24px;
//        letter-spacing: -1px;
//      }
//
//      .wrap-button {
//        margin-top: 20px;
//
//        a {
//          padding: 4px 8px;
//          font-size: 12px;
//        }
//      }
//
//      .signup {
//        margin-right: 12px !important;
//      }
//    }
//  }
//
//  @media (max-width: 580px) {
//    .description {
//      .title {
//        width: 320px;
//        font-size: 16px;
//        line-height: 18px;
//        letter-spacing: 0px;
//      }
//
//      .wrap-button {
//        margin-top: 10px;
//
//        button {
//          padding: 4px 8px;
//          font-size: 12px;
//        }
//      }
//    }
//  }
//}
</style>

<!--<style>-->
<!--.dots-banner.v-carousel&#45;&#45;hide-delimiter-background .v-carousel__controls {-->
<!--  display: none !important;-->
<!--}-->

<!--.v-window__container .v-btn&#45;&#45;icon.v-btn&#45;&#45;density-default {-->
<!--  display: none;-->

<!--  @media (max-width: 541px) {-->
<!--    width: calc(var(&#45;&#45;v-btn-height));-->
<!--    height: calc(var(&#45;&#45;v-btn-height));-->
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