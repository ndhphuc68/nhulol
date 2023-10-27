<script setup>
import images from "@/assets/PlayGame1";
import { useStore } from "vuex";
import { computed } from "vue";
import { gameGuideTabs } from "@/utils/datas";
import { useRouter } from "vue-router";

const customPage = computed(() => store.state.customPage.styles);
const store = useStore();
const router = useRouter();

const listCompany = () => {
  if (customPage.value.footer_banners) {
    return JSON.parse(customPage.value.footer_banners).filter(
      (cp) => cp.onoff == 1
    );
  } else return [];
};

const handleSelectRule = (index) => {
  store.commit("handleActiveGuideMenu", index);
  router.push(`/Game-guide`);
};
</script>
<template>
  <div class="wrapper-footer row">
    <div class="col col-12 col-lg-4">
      <h4 class="play-title">등대</h4>
      <div class="row">
        <div class="col col-6">
          <div
            class="item-service d-flex align-center flex-column justify-content-center"
            @click="() => store.commit('handleToggle', 'faq')"
          >
            <img
              alt="service center"
              class="icon-service"
              src="../../../assets/PlayGame1/icon/footer/headphone.png"
            />
            <span>{{ $t("FAQs") }}</span>
          </div>
        </div>
        <div class="col col-6">
          <div
            class="item-service d-flex align-center flex-column justify-content-center"
            @click="() => store.commit('handleToggle', 'partnership')"
          >
            <img
              alt="franchise"
              class="icon-service"
              src="../../../assets/PlayGame1/icon/footer/friend.png"
            />
            <span>{{ $t("partnership") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-12 col-lg-4 footer-center">
      <div class="row">
        <div class="col">
          <h3 class="about-title font-weight-bold text-center">
            {{ $t("betrule") }}
          </h3>
          <div class="list-ruler">
            <button
              :key="key"
              @click="handleSelectRule(key)"
              v-for="(item, key) in gameGuideTabs.titles"
              class="btn-about-us btn-hover"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div class="col">
          <h3 class="about-title font-weight-bold text-center">
            {{ $t("sitemap") }}
          </h3>
          <div class="d-flex flex-column align-center">
            <router-link to="/casino" class="btn-hover btn-about-us"
              >{{ $t("casino") }}
            </router-link>
            <router-link to="/slot" class="btn-hover btn-about-us"
              >{{ $t("slot") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-12 col-lg-4 wrapper-logo">
      <img
          src="../../../assets/PlayGame1/logo/logo.png"
        class="logo"
      />
      <p class="text">
        COPYRIGHT 2023, 등대. ALL RIGHTS RESERVED. GAMBLING CAN BE
        ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT
        TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE.
      </p>
    </div>
    <div class="companies">
      <div class="company-item" v-for="item in listCompany()" :key="item.key">
        <img
          :src="require(`@/assets/logo/logo-footer/${item.key}.png`)"
          alt="logo"
          class="logo-company"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-footer {
  width: calc(100% + 64px);
  margin-left: -32px;
  padding: 32px 0;
  background-color: #353c4a;
  color: #fff;
  margin-top: 2rem;

  .play-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .item-service {
    border-radius: 4px;
    border: 1px solid #fff;
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

    .icon-service {
      width: 24px;
      height: 24px;
    }
  }

  .btn-about-us {
    padding: 8px 0;
    text-align: left;
    text-decoration: none;
    color: #fff;

    @media (max-width: 768px) {
      & {
        text-align: center;
      }
    }
  }

  .wrapper-logo {
    .text {
      font-size: 0.8rem;
      font-weight: 400;
    }

    .logo {
      height: 27px;
      margin-bottom: 12px;
    }
  }

  .about-title {
    font-size: 18px;
  }

  .list-ruler {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.2rem 1rem;
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
  .wrapper-footer {
    width: calc(100% + 40px);
    margin-left: -20px;
    padding: 16px;
  }
  .footer-center {
    margin: 40px 0;
  }
  .companies {
    grid-template-columns: repeat(3, 1fr) !important;
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
