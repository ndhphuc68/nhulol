<script setup>
import { useStore } from "vuex";
import { gameGuideTabs } from "@/utils/PlayG3/datas";
import { useRouter } from "vue-router";
import IconFaq from "@/assets/PlayG3/icon/common/Faq.vue";
import IconPartnerShip from "@/assets/PlayG3/icon/common/PartnerShip.vue";
import { computed } from "vue";

const store = useStore();
const router = useRouter();
const customPage = computed(() => store.state.customPage.styles);

const listCompany = () => {
  if (customPage?.value.footer_banners) {
    return JSON.parse(customPage.value.footer_banners).filter(
      (cp) => cp.onoff == 1
    );
  } else return [];
};

const handleSelectRule = (index) => {
  router.push({ name: "GameGuide" });
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    store.commit("handleActiveGuideMenu", index);
  }, [700]);
};

const handleClickService = (key) => {
  store.commit("handleToggle", key);
  if (key === "noticeEventFAQ") {
    store.commit("handleActiveTab", 2);
  }
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="wrapper-footer">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col col-12 col-md-4 wrapper-logo">
          <div class="text-left">
            <img
              :src="
                customPage.logo_image
                 && customPage.logo_image
              "
              class="logo"
            />
            <p class="text">
              COPYRIGHT 2023, {{ customPage?.front_title ? customPage?.front_title : "TDGames" }}. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE.
            </p>
          </div>
        </div>
        <div class="col col-12 col-md-6 col-xl-4 footer-center">
          <div class="row">
            <div class="col">
              <h3 class="about-title font-weight-bold text-left">
                {{ $t("betrule") }}
              </h3>
              <div class="row">
                <div class="d-flex flex-row flex-wrap">
                  <button
                    :key="index"
                    @click="handleSelectRule(index)"
                    v-for="(item, index) in gameGuideTabs.titles"
                    class="btn-about-us w-50 btn-hover game-rule"
                    :class="[item]"
                  >
                    {{ (item) }}
                  </button>
                </div>
              </div>
            </div>
            <div class="col-4">
              <h3 class="about-title font-weight-bold text-left">
                {{ $t("sitemap") }}
              </h3>
              <div class="d-flex flex-column">
                <router-link
                  :to="{ name: 'Casino' }"
                  @click="scrollTop"
                  class="btn-about-us btn-hover"
                  >{{ $t("casino") }}
                </router-link>
                <router-link
                  :to="{ name: 'Slot' }"
                  @click="scrollTop"
                  class="btn-about-us btn-hover"
                  >{{ $t("slot") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-12 col-md-4">
          <div class="d-flex justify-content-between flex-wrap">
            <div
              class="item-service"
              @click="handleClickService('noticeEventFAQ')"
            >
              <IconFaq />
              <p>FAQs</p>
            </div>
            <div
              class="item-service"
              @click="handleClickService('partnership')"
            >
              <IconPartnerShip />
              <p>{{ $t("partnership") }}</p>
            </div>
          </div>
        </div>
        <div class="companies">
          <div
            class="company-item"
            v-for="item in listCompany()"
            :key="item.key"
          >
            <img
              :src="require(`@/assets/logo/logo-footer/${item.key}.png`)"
              alt="logo"
              class="logo-company"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//.game-rule {
//  display: none;
//}
//
//.game-rule.Holdem {
//  display: unset;
//}

.wrapper-footer {
  padding: 32px 0;
  background-color: #0f172a;
  color: #ffffff;

  .play-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .item-service {
    border-radius: 4px;
    cursor: pointer;
    width: calc(100% / 2);

    display: flex;
    align-items: center;

    p {
      text-align: center;
      margin-bottom: 0;
      margin-left: 5px;
      line-height: 16px;
    }

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
    color: #a1a1aa;
    font-size: 0.8rem;
  }

  /*  .coppyright-group {
    @media (max-width: 1000px) {
      flex-wrap: wrap;
    }
  }*/

  .wrapper-logo {
    .text {
      font-size: 0.8rem;
      font-weight: 400;
      width: 90%;
      text-align: left;
    }

    .logo {
      height: 45px;
      margin-bottom: 24px;
      /*      margin-right: 20px;*/
    }
  }

  .about-title {
    font-size: 18px;
    @media (max-width: 375px) {
      font-size: 14px;
    }
  }

  .companies {
    margin: 15px 0;
    padding: 0;

    .company {
      margin: 10px 0;
      cursor: pointer;
    }
  }

  .companies {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
  }

  .company-item {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 85px;
    background: #fff;
    border-radius: 8px;
  }

  .logo-company {
    width: 120px;
    height: 70px;
    
    @media (max-width: 375px) {
      width: 100px;
      height: 60px;
    }
  }
}

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
  .wrapper-footer {
    .wrapper-logo .text {
      width: 100%;
    }

    .item-service {
      padding: 1rem 0 !important;
    }
  }
}

@media (max-width: 768px) {
  .wrapper-footer {
    padding: 80px 0;

    .footer-center {
      margin: 40px 0;
    }

    .companies {
      padding: 10px;
      grid-template-columns: repeat(3, 1fr) !important;
    }

    .company {
      margin: 12px 0;
    }
  }
}

@media (max-width: 576px) {
  .wrapper-footer {
    padding: 16px 0;

    .item-service {
      width: 50%;
    }
    .companies {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
}
</style>
