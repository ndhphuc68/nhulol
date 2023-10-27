<template>
  <ModalStart
    :image-logo="customPage.logo_image && customPage.logo_image"
    v-if="dataPopUp !== 0"
  />
  <div
    class="FSCasino-wrapper container-fluid"
    :style="`background-color: ${customPage?.bg_color} ; background-image:url(${customPage?.bg_image}`"
  >
    <Header />
    <Navbar />
    <slot>
      <router-view />
    </slot>
    <Footer />
    <Modal />
  </div>
</template>

<script setup>
import Header from "@/components/FSCasino/Header";
import Navbar from "@/components/FSCasino/Navbar";
import Footer from "@/components/FSCasino/Footer";
import Modal from "@/components/FSCasino/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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
  }
};

watch(i18n.locale, (val) => {
  handleChangeCalender(val);
});

onMounted(async () => {
  handleChangeCalender(i18n.locale.value);
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
  await store.dispatch("getListGameProviderActionsV5");
});
</script>

<style lang="scss">
* {
  font-family: Poppins, sans-serif;
  @media (max-width: 375px) {
    font-size: 12px;
  }
}

.container-fluid,
.container,
.row,
.col {
  padding: 0;
  margin: 0;
  margin: auto;
}

.row,
.col {
  height: fit-content;
}

ol,
ul {
  padding: 0;
}

.FSCasino-wrapper {
  font-family: "NotoSansKR", sans-serif;
  background-size: contain;
  background-repeat: repeat;
}

.title-section {
  font-family: "NotoSansKR", serif;
  font-size: 32px;
  font-weight: 900;
  color: #545454;
  @media (max-width: 992px) {
    font-size: 20px;
    font-weight: 700;
  }
}

.primary-button {
  border-radius: 100px;
  background: #de6777;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  color: var(--white);
  padding: 8px 48px;
}

.default-button {
  border-radius: 100px;
  border: 1px solid #a6a6a6;
  background: var(--white);
  color: #a6a6a6;
  padding: 8px 48px;
}
</style>
