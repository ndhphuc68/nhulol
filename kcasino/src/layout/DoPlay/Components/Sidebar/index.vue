<script setup>
import images from "@/assets";
import { menus } from "./data";
import { useStore } from "vuex";
import RealtimeMoney from "@/layout/DoPlay/Components/Sidebar/Components/RealtimeMoney";
import Button from "@/components/DoPlay/Customs/Button";
import { convertMoney } from "@/utils";
import { computed, defineProps } from "vue";
import { SSRRequest } from "@/api/axios";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const idxActiveSidebar = computed(() => store.state.auth.activeSidebar);
const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);
const auth = computed(() => store.state.auth.auth);
const userInfo = computed(() => store.state.user.userInfor);
const customPage = computed(() => store.state.customPage.styles);

const props = defineProps({
  handleToggleSidebar: {
    type: Function,
  },
});

function handleClickMenu({ idxSidebar, idxTab, modalKey }) {
  if (modalKey) {
    if (modalKey !== "game") {
      if (
        auth.value ||
        modalKey === "event" ||
        modalKey === "notice" ||
        modalKey === "gameGuide"
      ) {
        store.commit("handleToggle", modalKey);
        store.commit("handleActiveMenu", idxTab);
        store.commit("handleActiveSidebar", idxSidebar);
      } else {
        store.commit("handleToggle", "login");
      }
    } else {
      const element = document.getElementById("tabGame");
      element.scrollIntoView({ behavior: "smooth" });
      store.commit("handleUpdateTabGame", idxTab);
      store.commit("handleActiveSidebar", idxSidebar);
    }
    props?.handleToggleSidebar();
  }
}

const doPartnerConvert = () => {
  let config = "width=1550, height=800";

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
};

const handleClickLogo = () => location.reload();
</script>

<template>
  <div class="sidebar">
    <h1 class="ms-5 mb-2 d-md-none">Menu</h1>
    <slot />
    <div
      class="sidebar-menu"
      :style="
        customPage.logo_pos === '1' ? 'flex-direction: column-reverse' : ''
      "
    >
      <img
        :src="customPage.logo_image && customPage.logo_image"
        class="logo"
        v-if="customPage.logo_pos !== '2'"
        @click="handleClickLogo"
      />
      <div>
        <div class="money-group pt-3" v-if="auth">
          <h4 class="money_title">{{ $t("total-balance") }}</h4>
          <div class="money-content d-flex py-3">
            <img class="money-icon" src="@/assets/icon/sidebars/diamond.png" />
            <h4 class="money_total">₩ {{ convertMoney(userInfo.me_money) }}</h4>
          </div>
          <h4 v-if="isPartner" class="money_title">{{ $t("commission") }}</h4>
          <div v-if="isPartner" class="money-content">
            <h4 class="money_total">
              ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
            </h4>
          </div>
          <Button
            variant="contained"
            class="btn-betting m-2"
            @click="handleClickMenu({ modalKey: 'betting' })"
          >
            {{ $t("bettingHistory") }}
          </Button>
          <Button
            variant="contained"
            class="btn-partner mt-2"
            v-if="isPartner"
            @click="doPartnerConvert()"
            >{{ $t("partnerPage") }}
          </Button>
          <Button
            variant="contained"
            class="btn-partner mt-2"
            v-if="isPartner"
            @click="doSettlement()"
            >{{ $t("settlement") }}
          </Button>
        </div>
        <div
          v-for="(item, index) in menus"
          :key="index"
          :class="{ active: index === idxActiveSidebar }"
          class="sidebar-item d-flex align-center pa-2 my-8"
          @click="
            handleClickMenu({
              idxSidebar: index,
              idxTab: item.idxTab,
              modalKey: item?.modalKey,
            })
          "
        >
          <component :is="item.icon" class="icon-item mr-2" />
          <span class="text-item"> {{ $t(item.key) }}</span>
        </div>
      </div>
    </div>
    <RealtimeMoney />
    <div
      class="d-flex justify-center align-center my-2"
      v-if="customPage.logo_pos === '2'"
    >
      <img
        :src="customPage.logo_image ? customPage.logo_image : images.logo"
        alt="logo-do-play"
        class="logo"
        @click="handleClickLogo"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-betting,
.btn-partner {
  width: 160px;
}

.sidebar {
  width: 241px;
  padding: 10px 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  overflow-y: scroll;
}

.sidebar-menu {
  padding: 0 26px;
  display: flex;
  flex-direction: column;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar-item {
  cursor: pointer;

  &:hover,
  &.active {
    color: var(--primaryDoplay);
  }
}

.logo {
  width: 184px;
  height: 48px;
}

.logo:hover {
  cursor: pointer;
  transform: scale(0.97);
  transition: transform linear 0.2s;
}

.money-content {
  align-items: center;

  img {
    margin-right: 15px;
  }

  .money_total {
    font-size: 24px;
    color: #e592ed;
    font-weight: 600;
  }
}
</style>

<style lang="scss">
.sidebar-item.active svg.stroke path,
.sidebar-item:hover svg.stroke path {
  stroke: var(--primaryDoplay);
}

.sidebar-item.active svg.fill path,
.sidebar-item:hover svg.fill path {
  fill: var(--primaryDoplay);
}
</style>
