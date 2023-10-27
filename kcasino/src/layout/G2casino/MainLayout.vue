<script setup>
import "@/assets/G2casino/css/common.scss";
import Header from "@/components/G2casino/Header";
import Footer from "@/components/G2casino/Footer";
import ModalPage from "@/components/G2casino/Modal/ModalPage";
import NavbarMobile from "@/components/G2casino/NavbarMobile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useStore } from "vuex";
import { getPingRequest } from "@/api/getPing";
import { getCookie } from "@/utils/cookie";
import { onMounted, computed, watch } from "vue";
import ModalStart from "@/views/EDGames/modals/ModalStart";

const customPage = computed(() => store.state.customPage.styles);
const store = useStore();
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : getCookie("mIdx")
  ? getCookie("mIdx")
  : null;
const userInfor = computed(() => store.state.user.userInfor);
const dataPopUp = computed(() => store.getters.lengthPopup);

watch(dataPopUp, (val) => {
  val !== 0
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});

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

onMounted(async () => {
  store.commit("handleUpdateLoading", true);
  await store.dispatch("getPartnershipAction");
  await store.dispatch("depositListRealTimeAction");
  await store.dispatch("withdrawListRealTimeAction");
  await store.dispatch("getStylesAction");
  if (mIdx) {
    await handleFetchLogin();
    store.commit("handleUpdateLoading", false);
    const myInterval = setInterval(handleFetchLogin, 10000);
    const intervalPing = setInterval(
      () => getPingRequest(userInfor.value.me_idx),
      5000
    );
    await store.dispatch("startIntervalAction", myInterval);
    await store.dispatch("startIntervalPingAction", intervalPing);
  }
  setInterval(async () => {
    await store.dispatch("depositListRealTimeAction");
    await store.dispatch("withdrawListRealTimeAction");
  }, 20000);
  store.commit("handleUpdateLoading", false);
  await store.dispatch("getListGameProviderActionsV4");
});
</script>

<template>
  <ModalStart
    :check-icon="false"
    :bg-color="'#040816'"
    :image-logo="
      customPage.logo_image
        ? customPage.logo_image
        : require('@/assets/G2casino/logo/logo.png')
    "
    v-if="dataPopUp !== 0"
  />
  <div
    class="wrapper-main"
    :style="`background-color: ${customPage?.bg_color} ; background:url(${customPage?.bg_image}`"
  >
    <div class="page">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
  <ModalPage />
  <NavbarMobile class="navbar-mobile" />
</template>

<style lang="scss">
.wrapper-main {
  font-family: "Inter", sans-serif;
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
</style>
<style scoped>
.navbar-mobile {
  display: none;
}

@media (max-width: 768px) {
  .navbar-mobile {
    display: flex;
  }
}
</style>
