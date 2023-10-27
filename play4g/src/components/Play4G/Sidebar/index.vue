<template>
  <div
    class="sidebar"
    :style="
      customPage?.logo_pos === '2'
        ? 'flex-direction: column-reverse ;  justify-content: flex-end;'
        : ''
    "
  >
    <div>
      <div class="wrapper-logo d-flex align-items-center justify-content-between">
        <img
          :src="customPage.logo_image ? customPage.logo_image : images.logo"
          alt="logo-play-4g"
          class="logo w-60"
          @click="handleClicklogo"
        />
        <div class="" @click="handleClickClose">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 5.91016L6 18.0901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 5.91016L18 18.0901" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="sidebar-menu">
        <div class="mb-3">
          <div
              v-for="(item, index) in menuSidebargame"
              :key="index"
              :class="
            item.key === 'logo'
              ? 'd-none'
              : { active: location.path === '/' + item?.href }
          "
              class="sidebargame-item"
              @click="
            () => {
              handleClickSidebar(item?.idx, item?.href);
            }
          "
          >
            <component :is="item.icon" class="icon-item" />
            <span class="text-item"> {{ $t(item.key) }}</span>
          </div>
        </div>
        <div
          v-for="(item, index) in menuSidebar"
          :key="index"
          :class="
            item.key === 'logo'
              ? 'd-none'
              : { active: location.path === '/' + item?.href }
          "
          class="sidebar-item"
          @click="
            () => {
              handleClickSidebar(item?.idx, item?.href);
            }
          "
        >
          <component :is="item.icon" class="icon-item" />
          <span class="text-item"> {{ $t(item.key) }}</span>
        </div>
        <div v-if="isPartner" class="isPartner mb-2 d-flex flex-column">
          <div class="d-flex align-center flex-column mb-2">
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
            <div class="money-content">
              <span class="text-dark">
                ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
              </span>
            </div>
          </div>
          <button @click="doPartnerConvert()" class="text-center text-uppercase">
            {{ $t("partnerPage") }}
          </button>
          <button @click="doSettlement()" class="text-center text-uppercase">
            {{ $t("settlement") }}
          </button>
        </div>
      </div>
      <slot />
    </div>
    <AuthMobile class="d-flex align-items-center d-xl-none" />
  </div>
</template>

<script setup>
import images from "@/assets/Play4G";
import { menuSidebar, menuSidebargame } from "./data";
import { useRouter, useRoute } from "vue-router";
import AuthMobile from "./AuthMobile/index.vue";
import { useStore } from "vuex";
import { computed, defineEmits } from "vue";
import { convertMoney } from "@/utils";
import { useI18n } from "vue-i18n";
import { SSRRequest } from "@/api/axios";
import {deleteCookie} from "@/utils/cookie";
import {logoutRequest} from "@/api/auth/request";

const { t } = useI18n();
const store = useStore();
const router = useRouter();
const location = useRoute();
const customPage = computed(() => store.state.customPage.styles);
const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);

const userInfo = computed(() => store.state.user.userInfor);

const $emits = defineEmits(["handleCloesSibarMobile"]);
const handleClickSidebar = (idxSidebar, href) => {
  $emits("handleCloesSibarMobile");
  router.push(`/${href}`);
};

const handleClicklogo = () => {
  $emits("handleCloesSibarMobile");
  router.push(`/`);
  window.scrollTo({top: 0, behavior: "smooth"});
}

const handleClickClose = () => {
  $emits("handleCloesSibarMobile");
}

const doPartnerConvert = () => {
  let config = "width=1200, height=800";

  let url =
    process.env.VUE_APP_META_API_URL +
    `/admin/partner/check_login/${userInfo?.value.me_account}?frontLogin=true`;
  window.open(url, "partner", config);
};

const doSettlement = async () => {
  if (userInfo?.value.partnerSettleAmount == 0) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("no_commission"),
    });
    return;
  }

  store.commit("handleUpdateLoading", true);

  let dataFrm = [];

  dataFrm.partnerCode = userInfo?.value.me_partnership_code;
  dataFrm.memberIdx = userInfo?.value.me_idx;
  dataFrm.account = userInfo?.value.me_account;

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
  store.commit("handleUpdateLoading", false);
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  overflow-y: scroll;
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: var(--bg-headerPlay4G);
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px){
    justify-content: space-between;
  }

  @media (max-width: 541px) {
    width: 100%;
  }

  .wrapper-logo {
    height: 6rem;
    padding: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    svg{
      display: none;
      
      @media (max-width: 1200px){
        display: block;
      }
    }
  }

  .isPartner {
    padding: 0 20px;
    button {
      border-radius: 4px;
      background: #254ee0;
      color: var(--bg);
      font-weight: 600;
      font-size: 14px;
      padding: 10px;
      margin-bottom: 10px;
    }
    .title-commission {
      font-weight: bold;
      font-size: 18px;
    }
    .money-content {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .sidebar-item {
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding: 0 20px;
    margin: 0 10px;
    font-weight: 600;
    font-size: 14px;
    color: var(--text-menu);
    background-color: #24262B;
    cursor: pointer;
    position: relative;

    svg {
      margin-right: 8px;
    }

    &:hover{
      background-color: #2D3035;

      &:before {
        content: "";
        width: 4px;
        height: 48px;
        background: var(--primaryPlayG1);
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        position: absolute;
        left: 0;
      }
    }

    &.active{
      background-color: #fff;
    }
  }

  .sidebargame-item{
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding: 0 20px;
    margin: 0 10px 5px 10px;
    font-weight: 600;
    font-size: 14px;
    color: var(--text-menu);
    background-color: #24262B;
    cursor: pointer;
    position: relative;

    svg {
      margin-right: 8px;
    }
  }
}

@media (max-width: 1199.98px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>

<style lang="scss">
.active {
  .icon-item {
    path {
      fill: #fff;
    }
  }
}
</style>
