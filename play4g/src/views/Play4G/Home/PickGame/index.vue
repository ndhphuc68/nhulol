<script setup>
</script>

<template>
  <section class="pickgame my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 d-flex align-items-center align-items-md-start flex-column">
          <img src="@/assets/Play4G/logos/casinoimage.png" alt="casino" />
          <router-link class="btn-hover d-flex align-items-center justify-content-between" :to="{ }">
            <span class="my-2"> {{ $t("casino") }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g filter="url(#filter0_d_268_4264)">
                <path d="M10 7L14 12L10 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_d_268_4264" x="-2" y="-2" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="2" dy="2"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_268_4264"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_268_4264" result="shape"/>
                </filter>
              </defs>
            </svg>
          </router-link>
          <span class="my-2 title">{{ $t("liveBannerTitleG4") }}</span>

        </div>
        <div class="col-12 col-sm-6 d-flex flex-column align-items-center align-items-md-start">
          <img src="@/assets/Play4G/logos/slotimage.png" alt="slot" />
          <router-link class="btn-hover d-flex align-items-center justify-content-between" :to="{ }">
            <span class="my-2"> {{ $t("slotgame") }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g filter="url(#filter0_d_268_4264)">
                <path d="M10 7L14 12L10 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_d_268_4264" x="-2" y="-2" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="2" dy="2"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_268_4264"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_268_4264" result="shape"/>
                </filter>
              </defs>
            </svg>
          </router-link>
          <span class="my-2 title">{{ $t("slotBannerTitleG4") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 70%;

  span {
    color: #fff;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  svg{
    margin-top: .5rem;
  }
}

.title {
  color: #a1a1aa;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin-bottom: 1rem !important;
  width: 70%;
}

img {
  width: 300px;
  height: 300px;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
}
</style>
