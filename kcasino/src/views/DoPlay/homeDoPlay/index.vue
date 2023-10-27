<script setup>
import AuthGroup from "@/components/DoPlay/AuthGroup";
import images from "@/assets";
import banners from "@/assets/Doplay/banners";
import Line from "@/views/DoPlay/homeDoPlay/Components/Line";
import Games from "@/views/DoPlay/homeDoPlay/Components/Games.vue";
import NoticeBox from "@/views/DoPlay/homeDoPlay/Components/NoticeListBox";
import FeedbackList from "@/views/DoPlay/homeDoPlay/Components/FeedbackList.vue";
import { getCookie } from "@/utils/cookie";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
import { getPingRequest } from "@/api/getPing";
import ModalStart from "@/views/EDGames/modals/ModalStart";
import { useI18n } from "vue-i18n";

const userInfor = computed(() => store.state.user.userInfor);
const store = useStore();
const notice = computed(() => store.state.notice.list);
const layout = computed(() => store.state.customPage.styles);
const dataPopUp = computed(() => store.getters.lengthPopup);
watch(dataPopUp, (val) => {
  val !== 0
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : getCookie("mIdx")
  ? getCookie("mIdx")
  : null;

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
//
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
  store.commit("handleToggle", "personal");
  store.commit("handleActiveContent", 0);
  store.commit("handleActiveMenu", 0);
  store.commit("handleActiveSidebar", 3);
};

onMounted(async () => {
  store.commit("handleUpdateLoading", true);
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
  store.commit("handleUpdateLoading", false);
  await store.dispatch("getListGameProviderActionsV4");
});

const { locale } = useI18n();
const currentLang = computed(() => locale?.value);

const slides = computed(() => [
  {
    img: currentLang.value === "ko" ? "banner-do-ko.png" : "banner-do.png",
  },
  {
    img: currentLang.value === "ko" ? "banner2-do-ko.png" : "banner2-do.png",
  },
  {
    img: currentLang.value === "ko" ? "banner3-do-ko.png" : "banner3-do.png",
  },
]);

const cover = ref(true);
const height = ref("350");
onMounted(() => {
  if (window.innerWidth < 1120) {
    cover.value = false;
    height.value = "auto";
  } else {
    cover.value = true;
    height.value = "350";
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1120) {
      cover.value = false;
      height.value = "auto";
    } else {
      cover.value = true;
      height.value = "350";
    }
  });
});
</script>

<template>
  <ModalStart
    :image-logo="
      customPage.logo_image
        ? customPage.logo_image
        : require('@/assets/logos/logo.png')
    "
    v-if="dataPopUp !== 0"
  />
  <div class="container">
    <div v-if="layout.nav_pos !== '1'" class="top-home">
      <div class="d-flex align-center" @click="handleOpenNotice">
        <img :src="images.announcement" alt="noti" class="announcement-icon" />
        <div class="noti">
          <Vue3Marquee :pause-on-hover="true" class="marquee">
            {{ notice ? notice[0]?.no_subject : "" }}
          </Vue3Marquee>
        </div>
      </div>
      <div class="auth">
        <AuthGroup />
      </div>
    </div>
    <Line :class="'d-md-block d-none'">
      <img :src="images.logo" alt="logo" class="logo" />
    </Line>
    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      class="custom dots-banner"
      :height="height"
    >
      <v-carousel-item
        :cover="cover"
        class="item-slide"
        v-for="(slide, i) in slides"
        :key="i"
        :src="require(`@/assets/Doplay/banners/home/${slide.img}`)"
      >
      </v-carousel-item>
    </v-carousel>
    <!--    <div class="home-item">-->
    <!--      <img :src="banners.banner1" alt="banner" class="home-banner" />-->
    <!--    </div>-->
    <Line>
      <span class="home-title">DOPlay GAME LIST</span>
    </Line>
    <div class="container">
      <Games />
    </div>
    <NoticeBox />
    <FeedbackList />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
}

.top-home {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-icon {
  width: 48px;
  height: 48px;
}

.noti {
  position: relative;
  width: 300px;
  height: 20px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}

.noti .marquee {
  font-weight: 700;
  overflow-x: visible !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 20px;
}

@media (max-width: 1024px) {
  .top-home {
    display: none;
  }
  .container {
    padding: 5px;
  }
}

@keyframes scrollText {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.home-item {
  margin: 24px 0;
}

.home-banner {
  width: 100%;
  height: 500px;
}

.logo {
  height: 48px;
}

.home-title {
  color: var(--primaryDoplay);
  font-size: 36px;
  font-weight: 800;
}

.home-item img.banned {
  width: 1165px;
  min-width: 100%;
  height: 500px;

  @media (max-width: 768px) {
    height: 100%;
  }
}

@media (max-width: 1024px) {
  .home-banner {
    height: 350px;
    object-fit: contain;
  }

  .home-title {
    font-size: 24px;
  }

  .custom {
    height: unset !important;
  }
}

@media (max-width: 575.98px) {
  .home-banner {
    height: 200px;
    object-fit: contain;
  }
}

@media (max-width: 280px) {
  .home-title {
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.custom .v-carousel__controls .v-btn {
  color: #cdccc7 !important;
  background-color: transparent !important;
}

.custom .v-btn--active {
  color: #6d6d6d !important;
  /*border: 1px solid #ffff !important;*/
  background-color: #cfcdcd !important;
}

.slider-banner-td {
  .carousel {
    height: 200px !important;
  }

  .mdi-chevron-right,
  .mdi-chevron-left {
    color: #333;
  }

  @media (max-width: 1000px) {
    button.v-window__right,
    button.v-window__left {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 630px) {
    .v-carousel__controls {
      display: none;
    }
  }
}
@media (max-width: 375px) {
  .v-btn--icon.v-btn--density-default {
    width: 25px;
    height: 25px;
  }
}
</style>
