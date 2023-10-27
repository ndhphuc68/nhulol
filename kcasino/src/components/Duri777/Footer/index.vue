<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { gameGuideTabs } from "@/utils/datas";
import { useRouter } from "vue-router";
import { handleCloseModal } from "@/utils";

// const customPage = computed(() => store.state.customPage.styles);
const store = useStore();
const router = useRouter();
const customPage = computed(() => store.state.customPage.styles);

const listCompany = () => {
  if (customPage.value.footer_banners) {
    return JSON.parse(customPage.value.footer_banners).filter(
      (cp) => cp.onoff == 1
    );
  } else return [];
};

const handleSelectCasinoOrSlot = (idx) => {
  store.commit("handleUpdateTabGame", idx);
  router.push("/");
};

const handleSelectRule = (index) => {
  store.commit("handleActiveGuideMenu", index);
  router.push({ name: "GameGuide" });
};
</script>
<template>
  <div class="wrapper-footer">
    <div class="container">
      <div class="row justify-content-between pb-5 pb-lg-0">
        <div class="col col-12 col-md-6 wrapper-logo">
          <div class="text-left">
            <img
              :src="
                customPage.logo_image
                  ? customPage.logo_image : require('@/assets/Duri777/logo/logo-g2.png')
              "
              class="logo"
            />
            <p class="text">
              COPYRIGHT 2023, {{ customPage?.front_title ? customPage?.front_title :'DURI' }}. ALL RIGHTS RESERVED. GAMBLING CAN BE
              ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT
              TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE.
            </p>
          </div>
          <div class="d-flex flex-wrap">
            <div
              class="item-service d-flex align-items-center"
              @click="handleCloseModal('faqs')"
            >
              <img
                alt="service center"
                class="icon-service mr-2"
                src="@/assets/Duri777/logo/footer/Headset.png"
              />
              <span>{{ $t("faqs") }}</span>
            </div>
            <div
              class="item-service d-flex align-items-center"
              @click="handleCloseModal('partnership')"
            >
              <img
                alt="franchise"
                class="icon-service mr-2"
                src="@/assets/Duri777/logo/footer/Users.png"
              />
              <span>{{ $t("partnership") }}</span>
            </div>
          </div>
        </div>
        <div class="col col-12 col-md-6 footer-center">
          <div class="row">
            <div class="col">
              <h3 class="about-title font-weight-bold text-left">
                {{ $t("betrule") }}
              </h3>
              <div class="list-bet-rule">
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
              <h3 class="about-title font-weight-bold text-left">
                {{ $t("sitemap") }}
              </h3>
              <div class="d-flex flex-column">
                <span @click="handleSelectCasinoOrSlot(0)" class="btn-about-us"
                  >{{ $t("casino") }}
                </span>
                <span
                  href=""
                  @click="handleSelectCasinoOrSlot(1)"
                  class="btn-about-us"
                  >{{ $t("slot") }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="companies">
          <div
            class="company-item btn-hover"
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

<style lang="scss" scoped>
.wrapper-footer {
  padding: 32px 0;
  background-color: #233d69;
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
    color: #a1a1aa;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .wrapper-logo {
    .text {
      font-size: 0.8rem;
      font-weight: 400;
      text-align: left;

      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .logo {
      height: 70px;
      margin-bottom: 24px;
    }
  }

  .about-title {
    font-size: 18px;
  }

  .footer-center {
    .list-bet-rule {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0.5rem;
    }
  }

  .companies {
    margin: 15px 0;

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

@media (max-width: 768px) {
  .footer-center {
    margin: 40px 0;
  }
  .companies {
    grid-template-columns: repeat(3, 1fr) !important;
    margin: -10px 0 30px 0 !important;
  }

  .company {
    margin: 12px 0;
  }
}

@media (max-width: 576px) {
  .companies {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-gap: 16px !important;
  }
}
</style>
