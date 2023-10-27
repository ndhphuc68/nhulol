<template>
  <section class="py-4">
    <div class="container text-start">
      <div class="footer-top row pb-4">
        <article class="col-12 col-lg-4">
          <div class="footer_logo">
            <img
              :src="
                customPage?.logo_image
                  ? customPage.logo_image
                  : require('@/assets/CasinoClub/footer/logo.png')
              "
              alt="logo"
              width="50"
            />
          </div>
          <div class="copyright mt-3">
            {{ $t("footer-description-fscasino") }}
          </div>
        </article>
        <article class="col-12 col-lg-4 mt-lg-0 text-center">
          <div class="title text-start">{{ $t("helpcenter") }}</div>
          <div class="row mt-4">
            <div class="help col">
              <img src="@/assets/CasinoClub/footer/hotline.png" alt="hotline" />
              <div class="help-center mt-2">FAQs</div>
            </div>
            <div class="help col">
              <img src="@/assets/CasinoClub/footer/cooperation.png" alt="cooperation" />
              <div class="help-center mt-2">{{ $t("partnership") }}</div>
            </div>
          </div>
        </article>
        <article class="col-12 row mt-5 col-lg-4 mt-lg-0">
          <div class="col-4">
            <div class="title">{{ $t("sitemap") }}</div>
            <div class="col mt-3">
              <div class="div-cus p-2" @click="router.push({name:'Home'})">
                {{ $t("home") }}
              </div>
              <div class="div-cus p-2" @click="router.push({name:'Casino'})">
                {{ $t("casino") }}
              </div>
              <div class="div-cus p-2" @click="router.push({name:'Slot'})">
                {{ $t("slot") }}
              </div>
            </div>
          </div>
          <div class="col-8 pe-0">
            <div class="title">{{ $t("best-rule") }}</div>
            <div class="row mt-3">
              <div
                v-for="(item, index) in gameGuideTabs.titles"
                :key="index"
                @click="handleSelectRule(index)"
                class="div-cus col-6 p-2"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="footer_bottom row">
        <div class="companies mt-3">
          <div class="company-item" v-for="(i, index) in 14" :key="index">
            <img
              src="@/assets/CasinoClub/footer/company.png"
              alt="logo"
              class="logo-company"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
// import {computed } from 'vue'
// import { useStore } from "vuex";
// const store = useStore();
const router = useRouter();


const gameGuideTabs = {
  titles: [
    "Baccarat",
    "Blackjack",
    "Roulette",
    "Sicbo",
    "Dragontiger",
    "Bullfight",
    "Mahjong",
    "Holdem",
  ],
  tabs: [],
};
</script>

<style lang="scss" scoped>
section {
  background: var(--bg-color);
  color: var(--white-color);
  .footer-top {
    border-bottom: 1px solid #fff;
    .footer_logo img {
      width: 70%;
    }
    .copyright {
      font-size: 12px;
      color: #a1a1aa;
      padding: 0.5rem 0;
    }
    .help {
      &:hover {
        cursor: pointer;
      }

      .help-center {
        font-size: 14px;
        color: #a1a1aa;
      }
    }
    .title {
      font-size: 24px;
    }
    .div-cus {
      cursor: pointer;
    }
  }
  .footer_bottom {
    .companies {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      .company-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 85px;
        background: #fff;
        border-radius: 8px;
        .logo-company {
          width: 120px;
          height: 70px;
        }
      }
    }
  }
}

// media responsive

@media (max-width: 1300px) {
  .companies {
    grid-template-columns: repeat(5, 1fr) !important;
  }
}
@media (max-width: 1100px) {
  .companies {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}
@media (max-width: 991px) {
  .footer_logo img {
    width: 45% !important;
  }
  .title {
    font-size: 24px;
  }
}
@media (max-width: 768px) {
  .companies {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 576px) {
  .companies {
    padding: 0 10px;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
