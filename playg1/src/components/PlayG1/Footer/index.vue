<script setup>
import images from "@/assets/PlayG1";

const companies = [
  "img_0.png",
  "img_1.png",
  "img_2.png",
  "img_3.png",
  "img_4.png",
  "img_5.png",
];
</script>
<template>
  <div class="wrapper-footer row">
    <div class="col col-12 col-md-4">
      <h4 class="play-title">SUNSHINE GAMES</h4>
      <div class="row">
        <div class="col col-6">
          <div
            class="item-service d-flex align-center flex-column justify-content-center"
          >
            <img
              alt="service center"
              class="icon-service"
              src="../../../assets/PlayG1/icon/footer/headphone.png"
            />
            <span>{{ $t("servicecenter") }}</span>
          </div>
        </div>
        <div class="col col-6">
          <div
            class="item-service d-flex align-center flex-column justify-content-center"
          >
            <img
              alt="downloadapp"
              class="icon-service"
              src="../../../assets/PlayG1/icon/footer/download.png"
            />
            <span>{{ $t("downloadapp") }}</span>
          </div>
        </div>
        <div class="col col-6">
          <div
            class="item-service d-flex align-center flex-column justify-content-center"
          >
            <img
              alt="franchise"
              class="icon-service"
              src="../../../assets/PlayG1/icon/footer/friend.png"
            />
            <span>{{ $t("franchise") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-4 footer-center">
      <div class="row">
        <div class="col d-none d-lg-block">
          <h4 class="about-title">{{ $t("aboutus") }}</h4>
        </div>
        <div class="col">
          <h4 class="about-title">{{ $t("betrule") }}</h4>
          <div>
            <button class="btn-about-us">{{ $t("casino") }}</button>
            <button class="btn-about-us">{{ $t("slot") }}</button>
            <button class="btn-about-us">{{ $t("livesports") }}</button>
            <button class="btn-about-us">{{ $t("european") }}</button>
            <button class="btn-about-us">{{ $t("minigame") }}</button>
            <button class="btn-about-us">{{ $t("virtual") }}</button>
          </div>
        </div>
        <div class="col">
          <h4 class="about-title">{{ $t("sitemap") }}</h4>
          <div>
            <button class="btn-about-us">{{ $t("casino") }}</button>
            <button class="btn-about-us">{{ $t("slot") }}</button>
            <button class="btn-about-us">{{ $t("livesports") }}</button>
            <button class="btn-about-us">{{ $t("european") }}</button>
            <button class="btn-about-us">{{ $t("minigame") }}</button>
            <button class="btn-about-us">{{ $t("virtual") }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-4 wrapper-logo">
      <img :src="images.logo" alt="logo-do-play" class="logo" />
      <p class="text">
        COPYRIGHT 2020, SUNSHINE GAMES. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE,
        PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE
        VISIT OUR RESPONSIBLE GAMBLING PAGE
      </p>
    </div>
    <div class="companies row">
      <div
        v-for="(company, index) in companies"
        :key="index"
        class="col col-6 col-lg-2 company"
      >
        <img
          :src="require(`@/assets/PlayG1/logo/footer/${company}`)"
          alt="company"
          class="w-100"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-footer {
  padding: 32px 0;

  .play-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .item-service {
    border-radius: 4px;
    border: 1px solid var(--neutral-600, #52525b);
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
  }

  .wrapper-logo {
    .text {
      font-size: 0.8rem;
      font-weight: 400;
    }

    .logo {
      height: 33px;
      margin-bottom: 24px;
    }
  }

  .about-title {
    font-size: 0.9rem;
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
</style>