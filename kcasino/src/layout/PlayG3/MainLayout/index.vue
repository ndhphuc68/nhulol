<script setup>
import "@/css/PlayG3/common.scss";
import Header from "@/components/PlayG3/Header";
import Footer from "@/components/PlayG3/Footer";
import ModalPage from "@/components/PlayG3/Modal/ModalPage.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { getCookie } from "@/utils/cookie";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getPingRequest } from "@/api/getPing";
// import { usePrimeVue } from "primevue/config";
// import { useI18n } from "vue-i18n";
import ModalStart from "@/views/EDGames/modals/ModalStart";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);

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
  // handleChangeCalender(i18n.locale.value);
  store.commit("handleUpdateLoading", true);
  await store.dispatch("depositListRealTimeAction");
  await store.dispatch("withdrawListRealTimeAction");
  await store.dispatch("getPartnershipAction");
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
  await store.dispatch("getListGameProviderActionsV5");
});
</script>

<template>
  <ModalStart
    :image-logo="customPage.logo_image && customPage.logo_image"
    v-if="dataPopUp !== 0"
  />
  <div
    class="layout"
    :style="`background-color: ${customPage?.bg_color} ; background-image:url(${customPage?.bg_image}`"
  >
    <Header />
    <div class="page">
      <router-view />
    </div>
    <Footer />
  </div>
  <ModalPage />
</template>

<style scoped lang="scss">
* {
  font-family: Manrope, sans-serif;
  @media (max-width: 375px) {
    font-size: 12px;
  }
}

.layout {
  background-color: var(--bgPlayG3);
  background-repeat: repeat;
  background-size: contain;
}

.page {
  background-color: var(--bgPlayG3);
}
</style>
