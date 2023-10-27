<template>
  <section
    class="container"
    :style="customPage.form_pos === '1' ? 'flex-direction: row-reverse' : ''"
  >
    <article class="notification-top" @click="handleOpenNotice">
      <img alt="banned" src="@/assets/icon/loudspeaker-icon.png" width="40" />
      <div class="noti-content">
        <Vue3Marquee :pause-on-hover="true" class="marquee">{{
          notice ? notice[0]?.no_subject : ""
        }}</Vue3Marquee>
      </div>
    </article>
    <article>
      <AuthGroup />
    </article>
  </section>
  <section
    class="partnership container d-flex justify-space-between align-center py-1 px-1"
    v-if="isPartner"
  >
    <div></div>
    <div class="d-flex align-center">
      <div>
        <div class="commission">{{ $t("commission") }}</div>
        <div class="money-partner">
          ₩ {{ convertMoney(userInfo?.partnerSettleAmount) }}
        </div>
      </div>
      <div class="list-btn-partner d-flex align-center">
        <div>
          <button class="btn-partner mx-2 mx-sm-4" @click="doPartnerConvert()">
            {{ $t("partnerPage") }}
          </button>
        </div>
        <div>
          <button class="btn-partner" @click="doSettlement()">
            {{ $t("settlement") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AuthGroup from "@/components/FSCasino/AuthGroup";
import { useStore } from "vuex";
import { computed } from "vue";
import { convertMoney } from "@/utils";
import { SSRRequest } from "@/api/axios";
import { useI18n } from "vue-i18n";

const store = useStore();
const notice = computed(() => store.getters.getNotice);
const customPage = computed(() => store.state.customPage.styles);
const { t } = useI18n();
const userInfo = computed(() => store.state.user.userInfor);
const isPartner = computed(
  () => !!store.state.user.userInfor.me_partnership_code
);
const handleOpenNotice = () => {
  store.commit("handleToggle", "notice");
  store.commit("handleActiveMenu", 0);
  store.commit("handleActiveContent", 0);
};

const doPartnerConvert = () => {
  let config = "width=1550, height=800";

  let url =
      process.env.VUE_APP_META_API_URL +
      `/admin/partner/check_login/${userInfo?.value.me_account}?frontLogin=true`;
  window.open(url, "partner", config);
};

const doSettlement = async () => {
  store.commit("handleUpdateLoading", true);
  if (userInfo?.value.partnerSettleAmount == 0) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("no_commission"),
    });
    store.commit("handleUpdateLoading", false);
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
  store.commit("handleUpdateLoading", false);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 0.3rem;
  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
  .notification-top {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
  }
}
.noti-content {
  margin-left: 10px;
  position: relative;
  width: 300px;
  height: 18px;
  overflow: hidden;
  @media (max-width: 1200px) {
    width: 200px;
  }
  @media (max-width: 576px) {
    width: 180px;
    font-size: 14px;
  }
  @media (max-width: 375px) {
    width: 100px;
    font-size: 12px;
  }
}
.noti-content .marquee {
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 100%;
  overflow-x: visible !important;
}

@keyframes scrollText {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

button {
  font-weight: 600;
  background: var(--white);
  padding: 0 1.5rem;

  &:hover {
    color: var(--pink);
  }

  &:first-child {
    border-right: 2px solid #000;
  }
}

input {
  width: 100%;
  padding: 0.5rem 3rem;
  border: none;
  border-radius: 20px;
  background: #f2f2f2;
  color: #7a7a7a;
}

.search {
  position: absolute;
  top: 0.5rem;
  left: 1.2rem;
}

.form-select {
  border: none;

  &:hover {
    cursor: pointer;
  }
}
.list-btn-partner {
  @media (max-width: 375px) {
    flex-direction: column;
  }
}
.btn-partner {
  border: none !important;
  padding: 0.5rem 2rem;
  background: #28a59f;
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  @media (max-width: 576px) {
    font-size: 13px;
    padding: 0.5rem;
  }
  @media (max-width: 375px) {
    width: 7rem;
    padding: 0.3rem;
    margin: 0.2rem 0;
  }
}
.commission {
  font-size: 13px;
  @media (max-width: 576px) {
    font-size: 12px;
  }
}
.money-partner {
  text-align: center;
  font-weight: 600;
  color: var(--primaryFSCasino);
  font-size: 18px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>
