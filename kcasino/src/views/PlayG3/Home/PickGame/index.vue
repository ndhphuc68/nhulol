<script setup></script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 d-flex align-items-center align-items-md-start flex-column">
        <img src="@/assets/PlayG3/logo/slotimage.png" alt="slot" />
        <span class="my-2"> {{ $t("slotgame") }}</span>
        <span class="my-2 title">
          {{ $t("slotBannerTitle") }}
        </span>
        <router-link class="btn-hover" :to="{ name: 'Slot' }"
          >{{ $t("playnow") }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.0007 33.6663C26.2054 33.6663 33.6673 26.2044 33.6673 16.9997C33.6673 7.79493 26.2054 0.333008 17.0007 0.333008C7.79591 0.333008 0.333984 7.79493 0.333984 16.9997C0.333984 26.2044 7.79591 33.6663 17.0007 33.6663ZM19.5519 11.1161L24.5519 16.1161C25.04 16.6043 25.04 17.3957 24.5519 17.8839L19.5519 22.8839C19.0637 23.372 18.2722 23.372 17.7841 22.8839C17.2959 22.3957 17.2959 21.6043 17.7841 21.1161L20.6502 18.25H10.3346C9.64428 18.25 9.08464 17.6904 9.08464 17C9.08464 16.3096 9.64428 15.75 10.3346 15.75L20.6502 15.75L17.7841 12.8839C17.2959 12.3957 17.2959 11.6043 17.7841 11.1161C18.2722 10.628 19.0637 10.628 19.5519 11.1161Z"
              fill="#41BD5C"
            />
          </svg>
        </router-link>
      </div>
      <div class="col-12 col-sm-6 d-flex flex-column align-items-center align-items-md-start">
        <img src="@/assets/PlayG3/logo/casinoimage.png" alt="casino" />
        <span class="my-2"> {{ $t("live") }}</span>
        <span class="my-2 title">
          {{ $t("liveBannerTitle") }}
        </span>
        <router-link class="btn-hover" :to="{ name: 'Casino' }"
          >{{ $t("playnow") }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.0007 33.6663C26.2054 33.6663 33.6673 26.2044 33.6673 16.9997C33.6673 7.79493 26.2054 0.333008 17.0007 0.333008C7.79591 0.333008 0.333984 7.79493 0.333984 16.9997C0.333984 26.2044 7.79591 33.6663 17.0007 33.6663ZM19.5519 11.1161L24.5519 16.1161C25.04 16.6043 25.04 17.3957 24.5519 17.8839L19.5519 22.8839C19.0637 23.372 18.2722 23.372 17.7841 22.8839C17.2959 22.3957 17.2959 21.6043 17.7841 21.1161L20.6502 18.25H10.3346C9.64428 18.25 9.08464 17.6904 9.08464 17C9.08464 16.3096 9.64428 15.75 10.3346 15.75L20.6502 15.75L17.7841 12.8839C17.2959 12.3957 17.2959 11.6043 17.7841 11.1161C18.2722 10.628 19.0637 10.628 19.5519 11.1161Z"
              fill="#41BD5C"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
  @media (max-width: 375px) {
    font-size: 16px;
  }
}

span {
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
  @media (max-width: 375px) {
    font-size: 16px;
  }
}

.title {
  color: #a1a1aa;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  height: 32px;
  margin-bottom: 1rem !important;
  
  @media (max-width: 375px) {
    font-size: 12px;
  }
}

img {
  width: 300px;
  height: 300px;
  
  @media (max-width: 375px) {
    width: 150px;
    height: 150px;
  }
}
</style>
