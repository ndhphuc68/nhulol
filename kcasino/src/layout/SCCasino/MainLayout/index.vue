<script setup>
import "@/assets/SCCasino/css/common.scss";
import Header from "@/components/SCCasino/Header";
import Sidebar from "@/components/SCCasino/Sidebar";
import Modal from "@/components/SCCasino/Modal";
import Footer from "@/components/SCCasino/Footer";
import NavbarMobile from "@/components/SCCasino/NavbarMobile";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { getCookie } from "@/utils/cookie";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getPingRequest } from "@/api/getPing";
import { usePrimeVue } from "primevue/config";
import { useI18n } from "vue-i18n";
import ModalStart from "@/views/EDGames/modals/ModalStart";

const i18n = useI18n();
const primevue = usePrimeVue();
const customPage = computed(() => store.state.customPage.styles);
const store = useStore();
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : getCookie("mIdx")
  ? getCookie("mIdx")
  : null;
const userInfor = computed(() => store.state.user.userInfor);
const openSidebar = computed(() => store.state.auth.sidebar);
const dataPopUp = computed(() => store.getters.lengthPopup);
watch(dataPopUp, (val) => {
  val !== 0
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});
const handleToggleSidebar = (status) => {
  store.commit("handleToggleSidebar", status);
};

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

const handleChangeCalender = (key) => {
  switch (key) {
    case "ko": {
      primevue.config.locale.dayNamesMin = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
      ];
      primevue.config.locale.dayNamesShort = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
      ];
      primevue.config.locale.monthNames = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
      primevue.config.locale.monthNamesShort = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
      break;
    }
    case "th": {
      primevue.config.locale.dayNamesMin = [
        "อา",
        "จ",
        "อ",
        "พ",
        "พฤ",
        "ศ",
        "ส",
      ];
      primevue.config.locale.dayNamesShort = [
        "อา",
        "จ",
        "อ",
        "พ",
        "พฤ",
        "ศ",
        "ส",
      ];
      primevue.config.locale.monthNamesShort = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      primevue.config.locale.monthNames = [
        "ม.ค",
        "ก.พ",
        "มี.ค",
        "เม.ย",
        "พ.ค",
        "มิ.ย",
        "ก.ค",
        "ส.ค",
        "ก.ย",
        "ต.ค",
        "พ.ย",
        "ธ.ค",
      ];
      break;
    }
    case "en": {
      primevue.config.locale.dayNamesMin = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
      ];
      primevue.config.locale.dayNamesShort = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];
      primevue.config.locale.monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      primevue.config.locale.monthNamesShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      break;
    }
    case "mon": {
      primevue.config.locale.dayNamesMin = [
        "Ня",
        "Да",
        "Мя",
        "Лх",
        "Пү",
        "Ба",
        "Бя",
      ];
      primevue.config.locale.dayNamesShort = [
        "Ня",
        "Да",
        "Мя",
        "Лх",
        "Пү",
        "Ба",
        "Бя",
      ];
      primevue.config.locale.monthNames = [
        "1 дугаар сар",
        "2 дугаар сар",
        "3 дугаар сар",
        "4 дугаар сар",
        "5 дугаар сар",
        "6 дугаар сар",
        "7 дугаар сар",
        "8 дугаар сар",
        "9 дугаар сар",
        "10 дугаар сар",
        "11 дугаар сар",
        "12 дугаар сар",
      ];
      primevue.config.locale.monthNamesShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      break;
    }
  }
};

watch(i18n.locale, (val) => {
  handleChangeCalender(val);
});

onMounted(async () => {
  handleChangeCalender(i18n.locale.value);
  store.commit("handleUpdateLoading", true);
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
    :image-logo="
      customPage.logo_image
        ? customPage.logo_image
        : require('@/assets/SCCasino/logo/logo.png')
    "
    v-if="dataPopUp !== 0"
  />
  <div
    class="layout"
    :style="`background-color: ${customPage?.bg_color} ; background-image:url(${customPage?.bg_image}`"
  >
    <Header @handleToggleSidebar="handleToggleSidebar" />
    <div class="layout-content">
      <div
        class="sidebar-group"
        :class="{ open: openSidebar }"
        @click.self="handleToggleSidebar(!openSidebar)"
      >
        <Sidebar />
      </div>
      <div class="page">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
  <Modal />
</template>

<style scoped lang="scss">
* {
  font-family: Poppins, sans-serif;
  @media (max-width: 375px) {
    font-size: 12px;
  }
}

.layout-content {
  max-width: 1440px;
  display: flex;
  margin-top: calc(var(--header-height-SCCasino) + 1.25rem);
  padding: 0 1.25rem;
  margin-left: auto;
  margin-right: auto;

  .page {
    flex: 1;
    padding: 0 1rem;
    overflow: hidden;
  }

  .sidebar-group {
    width: var(--sidebar-width-SCCasino);
    position: sticky;
    top: calc(var(--header-height-SCCasino) + 1.25rem);
    height: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 1024px) {
  .header-mobile {
    margin-top: calc(var(--header-height-SCCasino) + 1.25rem);
  }
  .layout-content {
    padding: 0;

    .page {
      padding: 0;
    }

    .sidebar-group {
      position: fixed;
      background: var(--bgSCCasino);
      top: 0;
      left: 0;
      width: 0;
      padding: 0;
      overflow: hidden;
      transition: all linear 0.2s;
      opacity: 0;
      z-index: 5;

      &::after {
        content: "";
        position: fixed;
        opacity: 0;
        transition: all linear 0.2s;
      }

      &.open {
        width: var(--sidebar-width-SCCasino);
        opacity: 1;
        z-index: 9999;

        &::after {
          inset: 0;
          z-index: 4;
          background-color: rgba(0, 0, 0, 0.4);
          cursor: pointer;
          opacity: 1;
          transition: all linear 0.2s;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.primary-button {
  border-radius: 8px;
  background: var(--primarySCCasino);
  color: var(--bgSCCasino);
  padding: 8px 40px;
  transition: all linear 0.2s;

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
    transition: all linear 0.2s;
  }
}
</style>
