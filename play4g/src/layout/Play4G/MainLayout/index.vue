<template>
  <div
      class="wrapper-layout"
      :style="`background-color: ${customPage?.bg_color} ; background-image:url(${customPage?.bg_image}`"
  >
    <div
        :class="
        customPage.nav_pos === '1' && ' flex-column justify-center align-center'
      "
        class="wrapper-main"
        :style="customPage.nav_pos === '2' ? 'flex-direction: row-reverse;' : ''"
    >
      <div
          class="sidebar-wrapper"
          v-if="customPage.nav_pos !== '1'"
          :class="{ off: !isOpenSidebar }"
      >
        <Sidebar
            @handleCloesSibarMobile="handleCloesSibarMobile"
            class="sidebar"
        />
        <div class="overlay" @click="isOpenSidebar = false"></div>
      </div>
      <div
          class="sidebar-wrapper d-xl-none"
          v-if="customPage.nav_pos === '1'"
          :class="{ off: !isOpenSidebar }"
      >
        <Sidebar
            @handleCloesSibarMobile="handleCloesSibarMobile"
            class="sidebar"
        />
        <div class="overlay" @click="isOpenSidebar = false"></div>
      </div>
      <div v-if="customPage.nav_pos === '1'" class="w-100 d-none d-xl-block">
        <SidebarHoriontal />
      </div>
      <div class="main">
        <Header>
          <div class="group-toggle-menu">
            <button v-if="!isOpenSidebar" @click="isOpenSidebar = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
                <path d="M4.16699 5H15.8337" stroke="#67707B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16699 15H15.8337" stroke="#67707B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16699 10H15.8337" stroke="#67707B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="wrapper-logo" @click="() => router.push('/')">
              <img
                  :src="
                  customPage.logo_image ? customPage.logo_image : images.logo
                "
                  alt="logo-do-play"
                  class="logo w-100 h-100"
              />
            </button>
          </div>
        </Header>
        <div
            v-if="isPartner && customPage.nav_pos === '1'"
            class="isPartner mb-2 mt-2 align-items-center d-flex justify-end"
        >
          <div class="d-flex flex-column mb-2">
            <div class="d-flex">
              <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M10.875 8H11.25V11.75H10.875C10.3777 11.75 9.90081 11.5525 9.54918 11.2008C9.19755 10.8492 9 10.3723 9 9.875C9 9.37772 9.19755 8.90081 9.54918 8.54917C9.90081 8.19754 10.3777 8 10.875 8ZM13.875 13.25H12.75V17H13.875C14.3723 17 14.8492 16.8025 15.2008 16.4508C15.5525 16.0992 15.75 15.6223 15.75 15.125C15.75 14.6277 15.5525 14.1508 15.2008 13.7992C14.8492 13.4475 14.3723 13.25 13.875 13.25ZM21.75 12.5C21.75 14.4284 21.1782 16.3134 20.1068 17.9168C19.0355 19.5202 17.5127 20.7699 15.7312 21.5078C13.9496 22.2458 11.9892 22.4389 10.0979 22.0627C8.20656 21.6865 6.46928 20.7579 5.10571 19.3943C3.74215 18.0307 2.81355 16.2934 2.43735 14.4021C2.06114 12.5108 2.25422 10.5504 2.99218 8.76884C3.73013 6.98726 4.97982 5.46451 6.58319 4.39317C8.18657 3.32183 10.0716 2.75 12 2.75C14.585 2.75273 17.0634 3.78084 18.8913 5.60872C20.7192 7.43661 21.7473 9.91498 21.75 12.5ZM17.25 15.125C17.25 14.2299 16.8944 13.3715 16.2615 12.7385C15.6286 12.1056 14.7701 11.75 13.875 11.75H12.75V8H13.125C13.6223 8 14.0992 8.19754 14.4508 8.54917C14.8025 8.90081 15 9.37772 15 9.875C15 10.0739 15.079 10.2647 15.2197 10.4053C15.3603 10.546 15.5511 10.625 15.75 10.625C15.9489 10.625 16.1397 10.546 16.2803 10.4053C16.421 10.2647 16.5 10.0739 16.5 9.875C16.5 8.97989 16.1444 8.12145 15.5115 7.48851C14.8786 6.85558 14.0201 6.5 13.125 6.5H12.75V5.75C12.75 5.55109 12.671 5.36032 12.5303 5.21967C12.3897 5.07902 12.1989 5 12 5C11.8011 5 11.6103 5.07902 11.4697 5.21967C11.329 5.36032 11.25 5.55109 11.25 5.75V6.5H10.875C9.9799 6.5 9.12145 6.85558 8.48852 7.48851C7.85558 8.12145 7.5 8.97989 7.5 9.875C7.5 10.7701 7.85558 11.6285 8.48852 12.2615C9.12145 12.8944 9.9799 13.25 10.875 13.25H11.25V17H10.5C10.0027 17 9.52581 16.8025 9.17418 16.4508C8.82255 16.0992 8.625 15.6223 8.625 15.125C8.625 14.9261 8.54599 14.7353 8.40533 14.5947C8.26468 14.454 8.07392 14.375 7.875 14.375C7.67609 14.375 7.48533 14.454 7.34467 14.5947C7.20402 14.7353 7.125 14.9261 7.125 15.125C7.125 16.0201 7.48058 16.8785 8.11352 17.5115C8.74645 18.1444 9.6049 18.5 10.5 18.5H11.25V19.25C11.25 19.4489 11.329 19.6397 11.4697 19.7803C11.6103 19.921 11.8011 20 12 20C12.1989 20 12.3897 19.921 12.5303 19.7803C12.671 19.6397 12.75 19.4489 12.75 19.25V18.5H13.875C14.7701 18.5 15.6286 18.1444 16.2615 17.5115C16.8944 16.8785 17.25 16.0201 17.25 15.125Z"
                    fill="#254ee0"
                />
              </svg>
              <span class="text-dark title-commission">{{
                  $t("commission")
                }}</span>
            </div>
            <div class="money-content text-center">
              <span class="text-dark">
                ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
              </span>
            </div>
          </div>
          <button
              @click="doPartnerConvert()"
              class="text-center me-3 ms-3 text-uppercase"
          >
            {{ $t("partnerPage") }}
          </button>
          <button @click="doSettlement()" class="text-center text-uppercase">
            {{ $t("settlement") }}
          </button>
        </div>
        <div class="page">
          <router-view />
          <Footer />
        </div>
      </div>
<!--      <NavbarMobile class="navbar-mobile" />-->
    </div>
    <ModalPage />
  </div>
</template>
<script setup>
import Sidebar from "@/components/Play4G/Sidebar";
import SidebarHoriontal from "@/components/Play4G/Sidebar/SidebarHoriontal.vue";
import Header from "@/components/Play4G/Header";
import Footer from "@/components/Play4G/Footer";
import { ref } from "vue";
import images from "@/assets/Play4G";
import { useRouter } from "vue-router";
// import NavbarMobile from "@/components/Play4G/NavbarMobile";
import ModalPage from "@/components/Play4G/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/css/Play4G/common.scss"
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getCookie } from "@/utils/cookie";
import { getPingRequest } from "@/api/getPing";
import { convertMoney } from "@/utils";
import { useI18n } from "vue-i18n";
import { SSRRequest } from "@/api/axios";

const isOpenSidebar = ref(false);

const { t } = useI18n();
const store = useStore();
const router = useRouter();
const customPage = computed(() => store.state.customPage.styles);
const mIdx = localStorage.getItem("mIdx")
    ? localStorage.getItem("mIdx")
    : getCookie("mIdx")
        ? getCookie("mIdx")
        : null;
const userInfor = computed(() => store.state.user.userInfor);
const isPartner = computed(() =>
    store.state.user.userInfor.me_partnership_code ? true : false
);
const handleGetMe = async () => {
  await store.dispatch("getMeAction", {
    memberIdx: mIdx,
  });
};

const doPartnerConvert = () => {
  let config = "width=1200, height=800";

  let url =
      process.env.VUE_APP_META_API_URL +
      `/admin/partner/check_login/${userInfor?.value.me_account}?frontLogin=true`;
  window.open(url, "partner", config);
};

const doSettlement = async () => {
  if (userInfor?.value.partnerSettleAmount == 0) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("no_commission"),
    });
    return;
  }

  let dataFrm = [];

  dataFrm.partnerCode = userInfor?.value.me_partnership_code;
  dataFrm.memberIdx = userInfor?.value.me_idx;
  dataFrm.account = userInfor?.value.me_account;

  const res = await SSRRequest({
    url: "/api/partnership/settlement",
    method: "POST",
    dataFrm,
  });

  if (res?.error == false) {
    if (res.data.transactionMoney == 0) {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("no_commission"),
      });
    } else {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("settlement_error"),
      });
    }
  } else {
    await store.dispatch("showAlert", {
      type: "success",
      message: t("settlement_success"),
    });
  }
};

const handleCloesSibarMobile = () => {
  isOpenSidebar.value = false;
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
  await store.dispatch("depositListRealTimeAction");
  await store.dispatch("withdrawListRealTimeAction");
  await store.dispatch("getStylesAction");
  await store.dispatch("getPartnershipAction");
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
  await store.dispatch("getListGameProviderActionsV2");
});
</script>
<style lang="scss">
//.wrapperPlayG1-layout {
//  font-family: "Inter";
//}
</style>

<style scoped lang="scss">
.isPartner {
  padding: 0 20px;
  button {
    border-radius: 4px;
    background: #254ee0;
    color: var(--bgPlay4G);
    height: 45px;
    font-weight: 600;
    font-size: 14px;
    padding: 5px 20px;
  }
  .title-commission {
    font-size: 16px;
  }
  .money-content {
    font-size: 16px;
    font-weight: bold;
  }
}
.wrapper-main {
  display: flex;
  //max-width: 1440px;
  margin: auto;
}

.main {
  width: 100%;
  overflow: hidden;
  background-color: var(--bgPlay4G);

  .wrapper-logo {
    width: 150px;
    margin-left: 5px;
  }
}

.page {
  overflow: hidden;
}

.icon-item {
  width: 24px;
  height: 24px;
}

@media (max-width: 1199.98px) {
  .sidebar-wrapper {
    .sidebar {
      transition: all linear 0.2s;
      opacity: 1;
    }

    .overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 4;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      opacity: 1;
      transition: all linear 0.2s;
    }

    &.off {
      .sidebar {
        width: 0;
        opacity: 0;
      }

      .overlay {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  .group-toggle-menu {
    display: flex;
    align-items: center;
  }

  .main {
    margin-bottom: 88px;
  }

  .navbar-mobile {
    display: flex;
  }
}

@media (min-width: 1200px) {
  .group-toggle-menu {
    display: none;
  }

  .navbar-mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 10px 10px 0 10px;
  }
}
</style>

<style lang="scss">
table.custom {
  .in-mobile {
    display: none;
  }

  tr {
    border-bottom: 1px solid #e4e4e7;
  }

  th,
  td {
    padding: 32px 24px;
    font-size: 0.875rem;
    text-align: center;
  }

  td {
    &.complete {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #f0fdf4;
        color: #15803d;
        text-align: center;
      }
    }

    &.failed {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #fef2f2;
        color: #b91c1c;
        text-align: center;
      }
    }

    &.pending {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #fffbeb;
        color: #b45309;
        text-align: center;
      }
    }

    .value {
      display: flex;
      justify-content: center;

      span {
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

@media (max-width: 768px) {
  table.custom {
    border-collapse: separate;
    border-spacing: 0 1em;

    .in-mobile {
      display: block;
    }

    .in-desktop {
      display: none;
    }

    .table-titles {
      display: none;
    }

    tr {
      border: unset;
      box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    }

    td {
      display: flex;
      padding: 12px 10px;
    }

    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 5px;

      .value {
        justify-content: space-between;

        span {
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          max-width: 150px;
          white-space: nowrap;
        }
      }
    }

    td:nth-child(even) {
      border-radius: 4px;
      background: #fafafa;
    }

    td:nth-child(1) {
      .cell {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          top: 90%;
          left: 0;
          border-bottom: 1px solid #e4e4e7;
        }
      }
    }
  }
}
</style>
