<template>
  <section class="py-5">
    <div class="container text-start">
      <div class="footer-top row pb-5">
        <article class="col-12 col-lg-4">
          <div class="d-flex align-items-center">
            <img src="@/assets/footer/logo-footer.png" alt="logo" width="50" />
            <span class="title-section ms-3">FSCasino</span>
          </div>
          <div class="copyright mt-3">
            COPYRIGHT 2020, KCASINO. ALL RIGHTS RESERVED. GAMBLING CAN BE
            ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT
            TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE
          </div>
        </article>
        <article class="col-12 text-center mt-5 col-lg-4 mt-lg-0">
          <div class="title text-start">Help Center</div>
          <div class="row mt-4">
            <div class="help col">
              <img src="@/assets/footer/hotline.png" alt="hotline" />
              <div class="help-center mt-2">Hotline</div>
            </div>
            <div class="help col">
              <img src="@/assets/footer/download.png" alt="down" />
              <div class="help-center mt-2">Download App</div>
            </div>
            <div class="help col">
              <img src="@/assets/footer/cooperation.png" alt="cooperation" />
              <div class="help-center mt-2">Cooperation</div>
            </div>
          </div>
        </article>
        <article class="col-12 row mt-5 col-lg-4 mt-lg-0">
          <div class="title">Sitemap</div>
          <div class="col mt-3">
            <div class="p-2" @click="scrollToTop">HomePage</div>
            <div class="p-2">Live Casino</div>
            <div class="p-2">Slots</div>
          </div>
          <div class="col mt-3">
            <div class="p-2">Mini Game</div>
            <div class="p-2">Promotions</div>
            <div class="p-2">My Page</div>
          </div>
        </article>
      </div>
      <div class="footer-bot row">
        <div
          class="col-6 mt-5 col-lg-2"
          v-for="item in listCompany"
          :key="item.id"
        >
          <img :src="item.urlImage" alt="company" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { listCompany } from "./data";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Sử dụng smooth scrolling
  });
};
</script>

<style scoped lang="scss">
section {
  background: var(--black);
  color: var(--white);
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
}
</style>
