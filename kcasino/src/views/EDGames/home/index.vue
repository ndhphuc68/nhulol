<template>
  <div id="scroll"></div>
  <div class="w-100 d-flex justify-center">
    <ModalStart
      :image-logo="
        customPage?.logo_image
          && customPage.logo_image
      "
      v-if="dataPopUp !== 0"
    />
    <div class="lobbyWrap2">
      <div>
        <div
          v-if="customPage.nav_pos !== '1'"
          class="top-home"
          :style="
            customPage?.form_pos == 2 ? 'flex-direction: row-reverse' : ''
          "
        >
          <div class="notification-top" @click="handleOpenNotice">
            <img alt="banned" src="@/assets/icon/loudspeaker-icon.png" />
            <div class="noti-content">
              <Vue3Marquee :pause-on-hover="true" class="marquee">{{
                notice ? notice[0]?.no_subject : ""
              }}</Vue3Marquee>
            </div>
          </div>
          <AuthGroup />
        </div>
        <div class="home-content slide-edgame">
          <v-carousel
            cycle
            height="350"
            hide-delimiter-background
            show-arrows-on-hover
            class="custom"
          >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">
                    <img
                      alt="banned"
                      class="banned"
                      :src="require(`@/assets/banner/${slide.img}`)"
                    />
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <div class="home-list-item">
            <PickGame />
            <NoticeListBox />
            <FeedbackList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthGroup from "@/components/EDGames/AuthGroup";
import { computed, onMounted, watch } from "vue";
import FeedbackList from "./components/FeedbackList";
import NoticeListBox from "./components/NoticeListBox";
import ModalStart from "../modals/ModalStart";
import PickGame from "./components/PickGame";
import ListCompanies from "./components/ListCompanies.vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { getCookie } from "@/utils/cookie";
import { getPingRequest } from "@/api/getPing";
import { utils } from "@/utils/common";

const store = useStore();
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : getCookie("mIdx")
  ? getCookie("mIdx")
  : null;
const userInfor = computed(() => store.state.user.userInfor);
const customPage = computed(() => store.state.customPage.styles);
const dataPopUp = computed(() => store.getters.lengthPopup);
watch(dataPopUp, (val) => {
  val !== 0
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});
const notice = computed(() => store.state.notice.list);

const { locale } = useI18n();
const currentLang = computed(() => locale?.value);

const handleGetMe = async () => {
  await store.dispatch("getMeAction", {
    memberIdx: mIdx,
  });
};

const handleGetListDeponsit = async () => {
  await store.dispatch("getListDepositAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};

const handleGetListWithDraw = async () => {
  await store.dispatch("getListWithDrawAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};

const handleGetListMessage = async () => {
  await store.dispatch("getListMessageAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};

const handleGetListHelp = async () => {
  await store.dispatch("getListHelpAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};

const handleFetchLogin = async () => {
  await handleGetMe();
  await handleGetListDeponsit();
  await handleGetListWithDraw();
  await handleGetListMessage();
  await handleGetListHelp();
};

const handleOpenNotice = () => {
  store.commit("handleToggle", "notice");
  store.commit("handleActiveMenu", 0);
  store.commit("handleActiveContent", 0);
};

onMounted(async () => {
  if (mIdx) {
    await handleFetchLogin();
    const myInterval = setInterval(handleFetchLogin, 10000);
    const intervalPing = setInterval(
      () => getPingRequest(userInfor.value.me_idx),
      5000
    );
    await store.dispatch("startIntervalAction", myInterval);
    await store.dispatch("startIntervalPingAction", intervalPing);
  }
});

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "banner1_ko.png" : "banner1.png",
    name: "Luck game",
  },
  {
    img: currentLang.value === "ko" ? "banner2_ko.png" : "banner2.png",
    name: "main_banner2_02.png",
  },
  {
    img: currentLang.value === "ko" ? "banner3_ko.png" : "banner3.png",
    name: "main_banner3_02.png",
  },
]);
</script>
<style>
.custom .v-carousel__controls .v-btn {
  color: #cdccc7 !important;
  background-color: transparent !important;
}

.custom .v-btn--active {
  color: #6d6d6d !important;
  /*border: 1px solid #ffff !important;*/
  background-color: #cfcdcd !important;
}
</style>
<style scoped>
.top-home {
  display: flex;
  justify-content: space-between;
}

.auth-action {
  display: flex;
}

.line {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.logo-home {
  margin-right: 50px;
  width: 193px;
  height: 48px;
}

.line-home {
  width: 100%;
  height: 0;
}

.noti-content {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.005em;
}

.home-content {
  margin-top: 5px;
}

.home-content .banned {
  width: calc(100vw - 300px);
  max-width: 100%;
  height: 100%;
}

.lobbyWrap2 {
  display: flex;
  padding: 0 32px;
  max-width: 100rem;
  flex-direction: column;
  /*background-color: #00a6fc;*/
}

/* Hide scrollbar for Chrome, Safari and Opera */
.lobbyWrap2::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.lobbyWrap2 {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.lobbyWrap2 .topMostWrap span {
  font-size: 14px;
  color: #83888f;
}

.lobbyWrap2 .topWrap {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}

.lobbyWrap2 .middleButtonsWrap button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 85px;
  height: 84px;
  background-image: unset;
}

.lobbyWrap2 .middleButtonsWrap button:hover {
  background-image: linear-gradient(to bottom, #0678b6, #064f8f, #02346e);
  background-size: 100% 100%;
  animation: none;
  opacity: 1;
}

.lobbyWrap2 .middleButtonsWrap button:hover span:first-child {
  color: #00deff;
}

.lobbyWrap2 .middleButtonsWrap button img,
.lobbyWrap2 .middleButtonsWrap button div {
  flex: 1;
}

.lobbyWrap2 .middleButtonsWrap button div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.notification-top {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.noti-content {
  margin-left: 10px;
  position: relative;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.noti-content .marquee {
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 100%;
  white-space: nowrap;
}

@keyframes scrollText {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.notification-top img {
  width: 48px;
  height: 48px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

@keyframes circle {
  0% {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg);
    -moz-transform: rotateX(360deg);
    -ms-transform: rotateX(360deg);
    -o-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}

.lobbyWrap2 .rotate {
  -webkit-animation: circle 0.5s infinite linear;
  -moz-animation: circle 0.5s infinite linear;
  -ms-animation: circle 0.5s infinite linear;
  -o-animation: circle 0.5s infinite linear;
  animation: circle 0.5s infinite linear;
}

@keyframes table-hover {
  0% {
    filter: blur(5px);
  }
  100% {
    filter: blur(0px);
  }
}

.lobbyWrap2 .boxs .box h5 {
  color: #efdda2;
}

.lobbyWrap2 .bigBannerWrap img {
  margin: 2px;
}

/* .lobbyWrap2 .snsBanners .banner .box .infos span {
} */

.lobbyWrap2 .snsBanners .banner .box .infos span:first-child {
  font-size: 0.813rem;
  color: #979797;
}

.lobbyWrap2 .snsBanners .banner .box .infos span:last-child {
  font-size: 1.375rem;
  color: #f1f1f1;
  display: flex;
  flex-direction: row;
}

.lobbyWrap2 .copyrightWrap {
  width: 100%;
  height: 6.25rem;
  /*background-image: url("../../assets/background/copyrightFrame.png");*/
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.813rem;
  color: #979797;
}

.lobbyWrap2 .bigBannerWrap2 .bannerInfo p {
  white-space: pre-line;
  color: white;
  font-size: 14px;
}

.lobbyWrap2 .jackpotText2 span {
  font-family: "H2hdrM", sans-serif;
  background-image: linear-gradient(to top, #c9ced4, #fff, #c9ced4),
    linear-gradient(to bottom, #175384, #175384);
  font-size: 5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 100%;
  letter-spacing: normal;
  text-align: center;
  color: #175384;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobbyWrap2 .inputWrap input {
  background-color: #020c15;
  font-size: 12px;
  height: 38px;
}

.lobbyWrap2 .inputWrap .form-group select {
  background-color: #020c15;
  font-size: 12px;
  color: #979797;
  width: 218px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.selectGame input {
  width: 178px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.couponWarning input {
  width: 268px;
  height: 32px;
}

@media (max-width: 1440px) {
  .lobbyWrap2 {
    max-width: 78.75rem;
  }
}

/* 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (max-width: 1024px) {
  .lobbyWrap2 {
    width: 100% !important;
  }

  .lobbyWrap2 .topWrap,
  .lobbyWrap2 .snsBanners,
  .lobbyWrap2 .bigBannerWrap2,
  .lobbyWrap2 .copyrightWrap {
    width: 100%;
  }

  .lobbyWrap2 .middleButtonsWrap button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    width: 360px;
    height: 170px;
    background-image: unset;
  }

  .lobbyWrap2 .snsBanners .banner .box div {
    height: 60%;
  }

  .lobbyWrap2 .snsBanners .banner .box div img {
    display: unset;
    margin-top: 1rem;
    height: 100%;
  }

  .lobbyWrap2 .snsBanners .banner .box .infos span:first-child {
    font-size: 2.5rem;
  }

  .lobbyWrap2 .snsBanners .banner .box .infos span:last-child {
    font-size: 3.5rem;
  }

  .lobbyWrap2 .bigBannerWrap2 .gameButton img {
    transform: scale(2.5);
  }

  .lobbyWrap2 .copyrightWrap {
    font-size: 2rem;
  }
}

@keyframes scrollRow {
  0% {
    transform: translateY(0%);
    top: 0%;
  }
  5% {
    transform: translateY(0%);
    top: 0%;
  }
  6% {
    transform: translateY(calc(-2.5rem * 1));
    top: calc(-2.5rem * 1);
  }
  10% {
    transform: translateY(calc(-2.5rem * 1));
    top: calc(-2.5rem * 1);
  }
  11% {
    transform: translateY(calc(-2.5rem * 2));
    top: calc(-2.5rem * 2);
  }
  15% {
    transform: translateY(calc(-2.5rem * 2));
    top: calc(-2.5rem * 2);
  }
  16% {
    transform: translateY(calc(-2.5rem * 3));
    top: calc(-2.5rem * 3);
  }
  20% {
    transform: translateY(calc(-2.5rem * 3));
    top: calc(-2.5rem * 3);
  }
  21% {
    transform: translateY(calc(-2.5rem * 4));
    top: calc(-2.5rem * 4);
  }
  25% {
    transform: translateY(calc(-2.5rem * 4));
    top: calc(-2.5rem * 4);
  }
  26% {
    transform: translateY(calc(-2.5rem * 5));
    top: calc(-2.5rem * 5);
  }
  30% {
    transform: translateY(calc(-2.5rem * 5));
    top: calc(-2.5rem * 5);
  }
  31% {
    transform: translateY(calc(-2.5rem * 6));
    top: calc(-2.5rem * 6);
  }
  35% {
    transform: translateY(calc(-2.5rem * 6));
    top: calc(-2.5rem * 6);
  }
  36% {
    transform: translateY(calc(-2.5rem * 7));
    top: calc(-2.5rem * 7);
  }
  40% {
    transform: translateY(calc(-2.5rem * 7));
    top: calc(-2.5rem * 7);
  }
  41% {
    transform: translateY(calc(-2.5rem * 8));
    top: calc(-2.5rem * 8);
  }
  45% {
    transform: translateY(calc(-2.5rem * 8));
    top: calc(-2.5rem * 8);
  }
  46% {
    transform: translateY(calc(-2.5rem * 9));
    top: calc(-2.5rem * 9);
  }
  50% {
    transform: translateY(calc(-2.5rem * 9));
    top: calc(-2.5rem * 9);
  }
  51% {
    transform: translateY(calc(-2.5rem * 10));
    top: calc(-2.5rem * 10);
  }
  55% {
    transform: translateY(calc(-2.5rem * 10));
    top: calc(-2.5rem * 10);
  }
  56% {
    transform: translateY(calc(-2.5rem * 11));
    top: calc(-2.5rem * 11);
  }
  60% {
    transform: translateY(calc(-2.5rem * 11));
    top: calc(-2.5rem * 11);
  }
  61% {
    transform: translateY(calc(-2.5rem * 12));
    top: calc(-2.5rem * 12);
  }
  65% {
    transform: translateY(calc(-2.5rem * 12));
    top: calc(-2.5rem * 12);
  }
  66% {
    transform: translateY(calc(-2.5rem * 13));
    top: calc(-2.5rem * 13);
  }
  70% {
    transform: translateY(calc(-2.5rem * 13));
    top: calc(-2.5rem * 13);
  }
  71% {
    transform: translateY(calc(-2.5rem * 14));
    top: calc(-2.5rem * 14);
  }
  75% {
    transform: translateY(calc(-2.5rem * 14));
    top: calc(-2.5rem * 14);
  }
  76% {
    transform: translateY(calc(-2.5rem * 15));
    top: calc(-2.5rem * 15);
  }
  80% {
    transform: translateY(calc(-2.5rem * 15));
    top: calc(-2.5rem * 15);
  }
  81% {
    transform: translateY(calc(-2.5rem * 16));
    top: calc(-2.5rem * 16);
  }
  85% {
    transform: translateY(calc(-2.5rem * 16));
    top: calc(-2.5rem * 16);
  }
  86% {
    transform: translateY(calc(-2.5rem * 17));
    top: calc(-2.5rem * 17);
  }
  90% {
    transform: translateY(calc(-2.5rem * 17));
    top: calc(-2.5rem * 17);
  }
  91% {
    transform: translateY(calc(-2.5rem * 18));
    top: calc(-2.5rem * 18);
  }
  95% {
    transform: translateY(calc(-2.5rem * 18));
    top: calc(-2.5rem * 18);
  }
  96% {
    transform: translateY(calc(-2.5rem * 19));
    top: calc(-2.5rem * 19);
  }
  97% {
    transform: translateY(0);
    top: 0%;
  }
}

@keyframes textLoop {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-70%, 0, 0);
    transform: translate3d(-70%, 0, 0);
  }
}

/*Reposive */
@media (min-width: 576px) {
  .lobbyWrap2 {
    width: 100%;
    box-sizing: border-box;
  }
}

/*Tablet*/
@media (max-width: 1280px) {
  .line {
    display: none;
  }

  /* .home-list-item {
  } */
  .home-content .banned {
    height: unset;
    /* max-height: 450px;
    min-height: 150px; */
    width: 100%;
    margin-top: 25px;
  }
}

/* Mobile */
@media screen and (max-width: 1024px) {
  .home-content {
    margin-top: 0;
  }

  .top-home {
    display: none;
  }

  .lobbyWrap2 {
    padding: 0;
  }

  .custom {
    height: unset !important;
  }
}

@media (max-width: 425px) {
  .home-list-item {
    padding: 0;
  }
}
</style>
<style lang="scss">
.slide-edgame {
  @media (max-width: 1000px) {
    button.v-window__right,
    button.v-window__left {
      width: 24px;
      height: 24px;
      display: flex;
    }
  }

  @media (max-width: 630px) {
    .v-carousel__controls {
      display: none;
    }

    button.v-window__right,
    button.v-window__left {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
