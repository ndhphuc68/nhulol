<template>
  <section class="py-5">
    <div class="container text-start">
      <div class="footer-top row pb-5">
        <article class="col-12 col-lg-4">
          <div class="d-flex align-items-center">
            <img
              :src="
                customPage.logo_image
                  ? customPage.logo_image
                  : require('@/assets/FSCasino/footer/logo-footer.png')
              "
              alt="logo"
              class="logo-image"
            />
            <span class="title-section ms-3" v-if="!customPage.logo_image">FSCasino</span>
          </div>
          <div class="copyright mt-3">
            COPYRIGHT 2023, {{ customPage?.front_title ? customPage?.front_title : "FSCasino" }}. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE.
          </div>
        </article>
        <article class="col-12 text-center mt-5 col-lg-4 mt-lg-0">
          <div class="title text-start">{{ $t("helpcenter") }}</div>
          <div class="row mt-4">
            <div
              @click="
                handleCloseModal('notice');
                store.commit('handleActiveTab', 1);
              "
              class="help col"
            >
              <img src="@/assets/FSCasino/footer/hotline.png" alt="hotline" />
              <div class="help-center mt-2">FAQs</div>
            </div>
            <!--            <div class="help col">-->
            <!--              <img src="@/assets/FSCasino/footer/download.png" alt="down" />-->
            <!--              <div class="help-center mt-2">Download App</div>-->
            <!--            </div>-->
            <div @click="handleCloseModal('partnership')" class="help col">
              <img
                src="@/assets/FSCasino/footer/cooperation.png"
                alt="cooperation"
              />
              <div class="help-center mt-2">{{ $t("partnership") }}</div>
            </div>
          </div>
        </article>
        <article class="col-12 row mt-5 col-lg-4 mt-lg-0">
          <div class="col-4">
            <div class="title">{{ $t("sitemap") }}</div>
            <div class="col mt-3 btn-list">
              <div class="div-cus p-2" @click="router.push('/')">
                {{ $t("home") }}
              </div>
              <div class="div-cus p-2" @click="router.push('/casino')">
                {{ $t("casino") }}
              </div>
              <div class="div-cus p-2" @click="router.push('/slot')">
                {{ $t("slot") }}
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="title">{{ $t("best-rule") }}</div>
            <div class="row mt-3 btn-list">
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
      <div class="footer-bot row">
        <div class="companies mt-3">
          <div
            class="company-item"
            v-for="company in listCompany()"
            :key="company.key"
          >
            <img
              :src="require(`@/assets/logo/logo-footer/${company.key}.png`)"
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
//import { listCompany } from "./data";
import { useRouter } from "vue-router";
import { handleCloseModal } from "@/utils";
import { gameGuideTabs } from "@/utils/datas";
import { useStore } from "vuex";
import { computed } from "vue";
import { companies } from "@/utils/datas";

const router = useRouter();
const store = useStore();
const customPage = computed(() => store.state.customPage.styles);

const listCompany = () => {
  if (customPage.value.footer_banners) {
    return JSON.parse(customPage.value.footer_banners).filter(
      (cp) => cp.onoff == 1
    );
  } else return [];
};
// const scrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth", // Sử dụng smooth scrolling
//   });
// };

const handleSelectRule = (index) => {
  handleCloseModal("gameGuide");
  store.commit("handleActiveGuideMenu", index);
};
</script>

<style scoped lang="scss">
section {
  background: #18181b;
  color: var(--white);

  .logo-image {
    height: 60px;
  }

  .title-section {
    color: var(--pink);
  }

  .copyright {
    font-size: 12px;
    color: #a1a1aa;
    padding: 0.5rem 0;
  }

  .title {
    font-size: 24px;

    @media (max-width: 992px) {
      font-size: 20px;
    }
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

  .footer-top {
    border-bottom: 1px solid #fff;
  }
  .btn-list {
    font-size:14px;
    @media(max-width: 375px) {
      font-size:12px;
    }
  }

  .div-cus {
    cursor: pointer;
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
