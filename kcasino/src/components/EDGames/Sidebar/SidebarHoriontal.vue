<template>
  <div
    class="top-home"
    :style="customPage?.form_pos == 2 ? 'flex-direction: row-reverse' : ''"
  >
    <div class="notification-top" @click="handleOpenNotice">
      <img alt="banned" src="@/assets/icon/loudspeaker-icon.png" />
      <div class="noti-content">
        <div>{{ notice ? notice[0]?.no_subject : "" }}</div>
      </div>
    </div>
    <AuthGroup />
  </div>
  <nav class="sidebar horizontal">
    <div class="sidebar-content">
      <div
        class="sidebar-group menu1"
        :style="
          customPage?.logo_pos === '2' ? 'flex-direction: row-reverse' : ''
        "
      >
        <button
          class="logo"
          @click="reloadPage"
          v-if="customPage.logo_pos != 1"
        >
          <img
            class="logo-ed"
            alt="logo"
            :src="
              customPage.logo_image
                ? customPage.logo_image
                : require('../../../assets/logo/sidebar/kcasino.png')
            "
          />
        </button>
        <div class="list-item">
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 0 }"
            @click="
              () => {
                if (menus1[0].onClick) {
                  menus1[0].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[0].key,
                  modalKey: menus1[0]?.modalKey,
                  idxTab: menus1[0]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[0].icon" />
            <span class="text-item"> {{ $t(menus1[0].key) }}</span>
            <span
              class="check"
              :class="check[menus1[0].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 1 }"
            @click="
              () => {
                if (menus1[1].onClick) {
                  menus1[1].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[1].key,
                  modalKey: menus1[1]?.modalKey,
                  idxTab: menus1[1]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[1].icon" />
            <span class="text-item"> {{ $t(menus1[1].key) }}</span>
            <span
              class="check"
              :class="check[menus1[1].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 2 }"
            @click="
              () => {
                if (menus1[2].onClick) {
                  menus1[2].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[2].key,
                  modalKey: menus1[2]?.modalKey,
                  idxTab: menus1[2]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[2].icon" />
            <span class="text-item"> {{ $t(menus1[2].key) }}</span>
            <span
              class="check"
              :class="check[menus1[2].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 3 }"
            @click="
              () => {
                if (menus1[3].onClick) {
                  menus1[3].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[3].key,
                  modalKey: menus1[3]?.modalKey,
                  idxTab: menus1[3]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[3].icon" />
            <span class="text-item"> {{ $t(menus1[3].key) }}</span>
            <span
              class="check"
              :class="check[menus1[3].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 4 }"
            @click="
              () => {
                if (menus1[4].onClick) {
                  menus1[4].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[4].key,
                  modalKey: menus1[4]?.modalKey,
                  idxTab: menus1[4]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[4].icon" />
            <span class="text-item"> {{ $t(menus1[4].key) }}</span>
            <span
              class="check"
              :class="check[menus1[4].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 5 }"
            @click="
              () => {
                if (menus1[5].onClick) {
                  menus1[5].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[5].key,
                  modalKey: menus1[5]?.modalKey,
                  idxTab: menus1[5]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[5].icon" />
            <span class="text-item"> {{ $t(menus1[5].key) }}</span>
            <span
              class="check"
              :class="check[menus1[5].key] ? 'show' : ''"
            ></span>
          </div>
          <div class="sidebar-item" v-if="customPage.logo_pos == 1">
            <button @click="reloadPage">
              <img
                class="logo-ed"
                alt="logo"
                :src="
                  customPage.logo_image
                    ? customPage.logo_image
                    : require('../../../assets/logo/sidebar/kcasino.png')
                "
              />
            </button>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 6 }"
            @click="
              () => {
                if (menus1[6].onClick) {
                  menus1[6].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[6].key,
                  modalKey: menus1[6]?.modalKey,
                  idxTab: menus1[6]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[6].icon" />
            <span class="text-item"> {{ $t(menus1[6].key) }}</span>
            <span
              class="check"
              :class="check[menus1[6].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 7 }"
            @click="
              () => {
                if (menus1[7].onClick) {
                  menus1[7].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[7].key,
                  modalKey: menus1[7]?.modalKey,
                  idxTab: menus1[7]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[7].icon" />
            <span class="text-item"> {{ $t(menus1[7].key) }}</span>
            <span
              class="check"
              :class="check[menus1[7].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 8 }"
            @click="
              () => {
                if (menus1[8].onClick) {
                  menus1[8].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[8].key,
                  modalKey: menus1[8]?.modalKey,
                  idxTab: menus1[8]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[8].icon" />
            <span class="text-item"> {{ $t(menus1[8].key) }}</span>
            <span
              class="check"
              :class="check[menus1[8].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 9 }"
            @click="
              () => {
                if (menus1[9].onClick) {
                  menus1[9].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[9].key,
                  modalKey: menus1[9]?.modalKey,
                  idxTab: menus1[9]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[9].icon" />
            <span class="text-item"> {{ $t(menus1[9].key) }}</span>
            <span
              class="check"
              :class="check[menus1[9].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 10 }"
            @click="
              () => {
                if (menus1[10].onClick) {
                  menus1[10].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[10].key,
                  modalKey: menus1[10]?.modalKey,
                  idxTab: menus1[10]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[10].icon" />
            <span class="text-item"> {{ $t(menus1[10].key) }}</span>
            <span
              class="check"
              :class="check[menus1[10].key] ? 'show' : ''"
            ></span>
          </div>
          <div
            class="sidebar-item"
            :class="{ active: indexActive === 11 }"
            @click="
              () => {
                if (menus1[11].onClick) {
                  menus1[11].onClick();
                }
                handleOnLickMenu({
                  idxSidebar: index,
                  key: menus1[11].key,
                  modalKey: menus1[11]?.modalKey,
                  idxTab: menus1[11]?.idx,
                });
              }
            "
          >
            <component class="icon-item" :is="menus1[11].icon" />
            <span class="text-item"> {{ $t(menus1[11].key) }}</span>
            <span
              class="check"
              :class="check[menus1[11].key] ? 'show' : ''"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="v-row w-100 mt-2 mb-2">
      <div class="v-col-4">
        <div class="d-flex flex-row justify-space-evenly align-center">
          <div>
            <div class="d-flex flex-column align-center">
              <h4 class="money_title">{{ $t("total-balance") }}</h4>
              <div class="d-flex flex-row justify-space-evenly align-center">
                <img
                  alt="money"
                  class="money-icon"
                  src="@/assets/icon/sidebar/diamond.png"
                />
                <h5 class="money_total">
                  ₩{{ convertMoney(userInfo.me_money) }}
                </h5>
              </div>
            </div>
            <div class="d-flex flex-column align-center mt-5">
              <h4 v-if="isPartner" class="money_title">
                {{ $t("commission") }}
              </h4>
              <h5 class="money_total" v-if="isPartner">
                ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
              </h5>
            </div>
          </div>
          <div class="d-flex flex-column justify-center align-center">
            <button
              class="btn-betting"
              @click="handleOnLickMenu({ modalKey: 'betting', idxTab: 0 })"
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
        </div>
      </div>
      <div class="v-col-8 w-100 d-flex align-center">
        <RealtimeMoney />
      </div>
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
const userInfo = computed(() => store.state.user.userInfor);
const auth = computed(() => store.state.auth.auth);
const notice = computed(() => store.state.notice.list);

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
const customPage = computed(() => store.state.customPage.styles);
const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);
const check = reactive({
  depositHistory: computed(() => store.state.deposit.check),
  withdrawalHistory: computed(() => store.state.withdraw.check),
  message: computed(() => store.state.message.check),
});

const handleOpenNotice = () => {
  store.commit("handleToggle", "notice");
  store.commit("handleActiveMenu", 0);
  store.commit("handleActiveContent", 0);
};

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
.money_total {
  color: var(--primary);
  font-weight: 600;
  font-size: 20px;
}

.btn-betting {
  width: 150px;
  height: 40px;
  background: var(--primary);
  color: var(--bg);
  border-radius: 4px;
  text-transform: uppercase;
}

.btn-partner {
  width: 150px;
  height: 40px;
  background: #28a59f;
  color: var(--bg);
  border-radius: 4px;
  text-transform: uppercase;
}

.money-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}

.top-home {
  display: flex;
  justify-content: space-between;
  padding: 0 9rem;
  /* //max-width: 1440px; */
}

.noti-content {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.005em;
  margin-left: 10px;
  position: relative;
  width: 300px;
  height: 100%;
  overflow: hidden;
}

.noti-content div {
  font-weight: 700;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 100%;
  white-space: nowrap;
  animation: scrollText 5s infinite linear;
}

@keyframes scrollText {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.notification-top {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.notification-top img {
  width: 48px;
  height: 48px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.sidebar {
  background-color: var(--bg);
  padding: 10px 0;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.5);
  height: 100%;
  margin: 15px 0;
  border-radius: 6px;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar.horizontal {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}
@media (max-width: 1024px) {
  .top-home {
    display: none;
  }
  .sidebar.horizontal {
    display: none;
  }
}

.logo {
  margin: 14px;
}
.logo-ed {
  width: 200px;
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
  align-items: center;
}

.list-item {
  display: flex;
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

.sidebar.horizontal hr {
  display: none;
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
  position: absolute;
  display: block;
  background: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 2px;
  margin-top: -3px;
}

.title-item h6 {
  color: var(--bg);
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.text-item {
  color: var(--text-second);
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
}

.sidebar .sidebar-item {
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  margin: 0 5px;
  flex-wrap: wrap;
  position: relative;
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

.sidebar-item span {
  margin-top: 5px;
}

.sidebar .sidebar-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
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
