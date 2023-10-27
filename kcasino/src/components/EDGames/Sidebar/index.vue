<template>
  <nav
    class="sidebar"
    :class="props.classLayout"
    :style="
      customPage?.logo_pos === '2' ? 'flex-direction: column-reverse' : ''
    "
  >
    <div class="mobile-group" v-if="props.isMobile">
      <button class="btn-close-menu" @click="props.handleToggleSidebar">
        <img alt="" src="@/assets/icon/close-icon.png" />
      </button>
      <h4>{{ $t("menu") }}</h4>
    </div>
    <button
      v-if="!isMobile && customPage.logo_pos !== '1'"
      class="logo"
      @click="reloadPage"
    >
      <img
        :src="
          customPage.logo_image
           && customPage.logo_image
        "
      />
    </button>
    <div
      class="sidebar-content"
      :style="customPage?.form_pos == 1 ? 'flex-direction: column-reverse' : ''"
    >
      <div class="auth-group">
        <AuthGroup
          v-if="isMobile"
          :isMobile="isMobile"
          :handleToggleSidebar="props.handleToggleSidebar"
        />
      </div>
      <div class="sidebar-group menu1">
        <div class="money-group d-flex flex-column" v-if="auth">
          <h4 class="money_title">{{ $t("total-balance") }}</h4>
          <div class="money-content">
            <img class="money-icon" src="@/assets/icon/sidebar/diamond.png" />
            <h4 class="money_total">₩{{ convertMoney(userInfo.me_money) }}</h4>
          </div>
          <h4 v-if="isPartner" class="money_title">{{ $t("commission") }}</h4>
          <div v-if="isPartner" class="money-content">
            <h4 class="money_total">
              ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
            </h4>
          </div>
          <button
            class="btn-betting"
            @click="handleOnLickMenu({ modalKey: 'betting1', idxTab: 0 })"
          >
            {{ $t("betting-btn") }}
          </button>
          <button
            class="btn-partner"
            style="margin-top: 5px"
            v-if="isPartner"
            @click="doPartnerConvert()"
          >
            {{ $t("partnerPage") }}
          </button>
          <button
            class="btn-partner"
            style="margin-top: 5px"
            v-if="isPartner"
            @click="doSettlement()"
          >
            {{ $t("settlement") }}
          </button>
        </div>
        <div
          class="sidebar-item"
          v-for="(item, index) in menus1"
          :class="{ active: indexActive === index }"
          :key="index"
          @click="
            () => {
              if (item?.onClick) {
                item.onClick();
              }
              handleOnLickMenu({
                idxSidebar: index,
                key: item.key,
                modalKey: item?.modalKey,
                idxTab: item?.idx,
              });
            }
          "
        >
          <component class="icon-item" :is="item.icon" />
          <span class="text-item"> {{ $t(item.key) }}</span>
          <span class="check" :class="check[item.key] ? 'show' : ''"></span>
        </div>
      </div>
      <hr v-if="!isMobile" />
      <div
        v-if="!isMobile && customPage.logo_pos === '1'"
        class="logo"
        @click="reloadPage"
      >
        <img
          alt="logo"
          :src="
            customPage.logo_image
              ? customPage.logo_image
              : require('../../../assets/logo/sidebar/kcasino.png')
          "
        />
      </div>
      <div v-if="!isMobile" class="submenu" :class="{ active: openMenu2 }">
        <div class="daily-group">
          <RealtimeMoney />
        </div>
      </div>

      <button @click="toggleMenu2" class="toggle-more-menu">
        <img
          class="icon-item"
          alt="icon"
          src="@/assets/icon/sidebar/menu.png"
        />
      </button>
    </div>
  </nav>
</template>
<script setup>
import { computed, ref, defineProps, reactive } from "vue";
import { useStore } from "vuex";
import AuthGroup from "@/components/EDGames/AuthGroup";
import { menus1 } from "@/utils/menus";
import RealtimeMoney from "./RealtimeMoney";
import { convertMoney } from "@/utils";
import { SSRRequest } from "@/api/axios";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  handleToggleSidebar: {
    type: Function,
  },
  isMobile: {
    type: Boolean,
  },
  classLayout: {
    type: String,
  },
});

const store = useStore();
const indexActive = ref(computed(() => store.state.auth.activeSidebar));
const auth = computed(() => store.state.auth.auth);
const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);
const userInfo = computed(() => store.state.user.userInfor);
const openMenu2 = ref(false);
const customPage = computed(() => store.state.customPage.styles);
const check = reactive({
  depositHistory: computed(() => store.state.deposit.check),
  withdrawalHistory: computed(() => store.state.withdraw.check),
  message: computed(() => store.state.message.check),
  helpcenter: computed(() => store.state.helpCenter.check),
});

const handleOnLickMenu = ({ idxSidebar, modalKey, key, idxTab }) => {
  store.commit("handleActiveSidebar", idxSidebar);
  if (props.isMobile) {
    props.handleToggleSidebar();
  }

  if (modalKey) {
    handleOpenModal(modalKey, idxTab);
  }
  if (key === "casino" || key === "slots") {
    store.commit("handleUpdateTabGame", idxTab);
  }
};

const handleOpenModal = (modalKey, idx) => {
  if (store.state.auth.auth || modalKey === "notice") {
    store.commit("handleToggle", modalKey);
    store.commit("handleActiveMenu", idx);
  } else store.commit("handleToggle", "login");
};

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

function reloadPage() {
  window.location.reload();
}
</script>
<style scoped>
.sidebar {
  background-color: var(--bg);
  padding: 10px 0;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
}

.sidebar.horizontal .sidebar-content {
  display: flex;
  align-items: center;
}

.sidebar.horizontal .sidebar-group.menu1 {
  flex-direction: row;
  align-items: flex-start;
  padding: 0 20px;
}

.sidebar.horizontal .submenu {
  display: none;
}

.sidebar.horizontal .submenu.active {
  display: flex;
  position: absolute;
  top: 80px;
  background-color: var(--bg);
  right: 0;
  box-shadow: #c2c2c2 1px 4px 0px;
  border-radius: 5px;
  overflow-y: scroll;
  max-height: 70vh;
  min-width: 241px;
  padding: 10px 20px;
}

.daily-group {
  margin: 0 auto;
  width: 100%;
}

.toggle-more-menu {
  display: none;
}

.sidebar.horizontal .toggle-more-menu {
  display: block;
}

.sidebar.horizontal hr {
  display: none;
}

.sidebar .logo {
  padding: 10px 15px;
  margin: 0 auto;
}
.sidebar .logo:hover {
  transform: scale(0.97);
  transition: transform linear 0.2s;
}

.sidebar .logo img {
  height: 6rem;
}

.sidebar-content {
  margin-top: 24px;
  position: relative;
}

.sidebar .icon-item {
  width: 24px;
  height: 24px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 5px;
}

.check {
  display: none;
}

.check.show {
  display: block;
  background: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 7px;
  margin-top: 3px;
}

.title-item h6 {
  color: var(--bg);
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.item-daily p {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--text-second);
}

.text-item {
  color: var(--text-second);
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
}

hr {
  width: 193px;
  height: 0px;
  border: 1px solid #e4e4e7;
  margin: 32px auto;
  margin-top: 20px;
}

.sidebar .sidebar-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
}

.sidebar .sidebar-item:hover {
  cursor: pointer;
  color: var(--primary);
  opacity: 0.8;
}

.sidebar .sidebar-item:hover span,
.sidebar-item.active span {
  color: var(--primary);
}

.sidebar .sidebar-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}

.submenu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}

.mobile-group {
  margin-left: 28px;
  margin-top: 5px;
}

.mobile-group h4 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
}

.btn-close-menu {
  width: 24px;
  height: 24px;
  margin-bottom: 24px;
}

.money-group {
  padding: 10px 20px;
  margin-bottom: 10px;
}

.money_title {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--text);
}

.money_total {
  color: var(--primary);
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
}

.money-content {
  display: flex;
  align-items: center;
  margin: 22px 0;
}

.money-content .money-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}

.btn-betting {
  width: 172px;
  height: 46px;
  background: var(--primary);
  color: var(--bg);
  border-radius: 4px;
  text-transform: uppercase;
}

.btn-partner {
  width: 172px;
  height: 46px;
  background: #28a59f;
  color: var(--bg);
  border-radius: 4px;
  text-transform: uppercase;
}

.btn-betting:hover,
.btn-partner:hover {
  opacity: 0.8;
  color: var(--bg);
}

.auth-group {
  margin: 0 10px;
}
@media (max-width: 768px) {
  .sidebar {
    width: 241px;
  }
}
</style>
<style>
/*.sidebar-item path {*/
/*  fill: var(--text-second);*/
/*}*/
.sidebar-item.active svg.stroke path,
.sidebar-item:hover svg.stroke path {
  stroke: var(--primary);
}

.sidebar-item.active svg.fill path,
.sidebar-item:hover svg.fill path {
  fill: var(--primary);
}
</style>
