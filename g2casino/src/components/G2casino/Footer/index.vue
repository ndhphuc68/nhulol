<script setup>
import images from "@/assets/G2casino/data";
import { useStore } from "vuex";
import { computed } from "vue";
import { gameGuideTabs } from "@/utils/datas";
import { useRouter } from "vue-router";

// const customPage = computed(() => store.state.customPage.styles);
const companies = [
  "img_0.png",
  "img_1.png",
  "img_2.png",
  "img_3.png",
  "img_4.png",
  "img_5.png",
];
const store = useStore();
const router = useRouter();

const handleSelectRule = (index) => {
  store.commit("handleActiveGuideMenu", index);
  router.push(`/Game-guide`);
};
</script>
<template>
  <div class="wrapper-footer">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col col-12 col-md-6 wrapper-logo">
          <div class="text-left">
            <img src="@/assets/G2casino/logo/logog2-footer.png" alt="logo-do-play" class="logo"/>
            <p class="text">
              COPYRIGHT 2020, Play G2. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE,
              PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE
              VISIT OUR RESPONSIBLE GAMBLING PAGE
            </p>
          </div>
          <div class="d-flex justify-content-between flex-wrap">
            <div class="item-service">
              <img alt="service center" class="icon-service" src="@/assets/G2casino/logo/footer/serviceCenter.png"/>
            </div>
            <div class="item-service">
              <img alt="franchise" class="icon-service" src="@/assets/G2casino/logo/footer/coperation.png"/>
            </div>
            <div class="item-service">
              <img alt="franchise" class="icon-service" src="@/assets/G2casino/logo/footer/download_app.png"/>
            </div>
          </div>
        </div>
        <div class="col col-12 col-md-4 footer-center">
          <div class="row">
            <div class="col">
              <h3 class="about-title font-weight-bold text-left">{{ $t("betrule") }}</h3>
              <div class="d-flex flex-column">
                <button
                    :key="key"
                    @click="handleSelectRule(key)"
                    v-for="(item, key) in gameGuideTabs.titles"
                    class="btn-about-us"
                >
                  {{ item }}
                </button>
              </div>
            </div>
            <div class="col">
              <h3 class="about-title font-weight-bold text-left">{{ $t("sitemap") }}</h3>
              <div class="d-flex flex-column">
                <router-link to="/" class="btn-about-us">{{
                    $t("casino")
                  }}</router-link>
                <router-link to="/" class="btn-about-us">{{
                    $t("slot")
                  }}</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="companies row align-center">
          <div
              v-for="(company, index) in companies"
              :key="index"
              class="col col-6 col-lg-2 text-left company"
          >
            <img
                :src="require(`@/assets/G2casino/logo/footer/${company}`)"
                alt="company"
                class=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-footer {
  padding: 32px 0;
  background-color: #0F172A;
  color: #ffffff;

  .play-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .item-service {
    border-radius: 4px;
    margin: 10px 0;
    padding: 34px 12px;
    cursor: pointer;
    max-height: 105px;

    &:hover {
      transform: scale(0.98);
      opacity: 0.8;
    }

    span {
      font-size: 0.8rem;
      text-align: center;
    }
  }

  .btn-about-us {
    padding: 8px 0;
    text-align: left;
    text-decoration: none;
    color: #A1A1AA;
    font-size: .8rem;
  }

  .wrapper-logo {
    .text {
      font-size: 0.8rem;
      font-weight: 400;
      width: 60%;
      text-align: left;
    }

    .logo {
      height: 33px;
      margin-bottom: 24px;
    }
  }

  .about-title {
    font-size: 18px;
  }

  .companies {
    margin: 15px 0;

    .company {
      margin: 10px 0;
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  .wrapper-footer{
    padding: 80px 0;

    .footer-center {
      margin: 40px 0;
    }
    .companies {
      padding: 0;
    }
    .company {
      margin: 12px 0;
    }
  }
}
</style>
