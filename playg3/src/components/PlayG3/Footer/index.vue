<script setup>
import { useStore } from "vuex";
import { gameGuideTabs } from "@/utils/PlayG3/datas";
import { useRouter } from "vue-router";
import IconFaq from "@/assets/PlayG3/icon/common/Faq.vue";
import IconPartnerShip from "@/assets/PlayG3/icon/common/PartnerShip.vue";

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
  router.push({ name: "GameGuide" });
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    store.commit("handleActiveGameGuide", index);
  }, [700]);
};

const handleClickService = (key) => {
  store.commit("handleToggle", key);
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
              src="@/assets/PlayG3/logo/logo.png"
              alt="logo-do-play"
              class="logo"
            />
            <p class="text">
              COPYRIGHT 2023, Play G3. ALL RIGHTS RESERVED. GAMBLING CAN BE
              ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON
              SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE
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
                    :key="key"
                    @click="handleSelectRule(key)"
                    v-for="(item, key) in gameGuideTabs.titles"
                    class="btn-about-us w-50"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div>
            <div class="col">
              <h3 class="about-title font-weight-bold text-left">
                {{ $t("sitemap") }}
              </h3>
              <div class="d-flex flex-column">
                <router-link
                  :to="{ name: 'Casino' }"
                  @click="scrollTop"
                  class="btn-about-us"
                  >{{ $t("casino") }}
                </router-link>
                <router-link
                  :to="{ name: 'Slot' }"
                  @click="scrollTop"
                  class="btn-about-us"
                  >{{ $t("slot") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-12 col-lg-4">
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
        <div class="companies row align-center">
          <div
            v-for="(company, index) in companies"
            :key="index"
            class="col col-6 col-lg-2 text-left company"
          >
            <img
              :src="require(`@/assets/PlayG3/logo/footer/${company}`)"
              alt="company"
              class=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      width: 50px;
      text-align: center;
      margin-bottom: 0;
      margin-left: 5px;
      line-height: 16px;
    }

    /* &:not(:last-child) { */
    /* padding-bottom: 3rem; */
    /* } */

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
    padding: 0;

    .company {
      margin: 10px 0;
      cursor: pointer;
    }
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
      padding: 0;
    }

    .company {
      margin: 12px 0;
    }
  }
}

@media (max-width: 541px) {
  .wrapper-footer .item-service {
    width: 50%;
  }
}
</style>
