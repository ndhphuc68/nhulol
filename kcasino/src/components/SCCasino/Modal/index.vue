<script setup>
import Modal from "@/components/SCCasino/Modal/Modal.vue";
import Login from "@/views/SCCasino/modals/Login";
import Signup from "@/views/SCCasino/modals/Signup";
import Deposit from "@/views/SCCasino/modals/Deposit";
import Withdraw from "@/views/SCCasino/modals/Withdraw";
import NoticeEventFAQ from "@/views/SCCasino/modals/NoticeFAQEvent";
import Profile from "@/views/SCCasino/modals/Profile";
import { useStore } from "vuex";
import { computed } from "vue";
import BetRule from "@/views/SCCasino/modals/BetRule";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import ServiceCenter from "@/views/SCCasino/modals/ServiceCenter";
import Message from "@/views/SCCasino/modals/Message";
import Partnership from "@/views/SCCasino/modals/Partnership";
import BettingHistory from "@/views/SCCasino/modals/BettingHistory";

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

const styleModalSignup = {
  height: "700px",
  width: "900px",
  padding: 0,
};
const styleModalLogin = {
  height: "700px",
  padding: "0",
  width: "700px",
};

const styleModalUser = {
  width: "1128px",
  height: "900px",
};
const styleModalBetting = {
  height: "900px",
  width: "1128px",
};

const styleModalBetRule = {
  width: "1128px",
  height: "900px",
};

const styleModalDeposit = {
  width: "1128px",
  height: "900px",
};
</script>
<template>
  <Modal
    key="deposit"
    :modal="'deposit'"
    :title="$t('deposit')"
    v-if="modalView['deposit']"
    :styles="styleModalDeposit"
    :navigate="true"
  >
    <Deposit />
  </Modal>
  <Modal
    key="withdraw"
    :modal="'withdraw'"
    :title="$t('withdraw')"
    v-if="modalView['withdraw']"
    :styles="styleModalDeposit"
    :navigate="true"
  >
    <Withdraw />
  </Modal>
  <Modal
    key="noticeEventFAQ"
    :modal="'noticeEventFAQ'"
    title=" "
    v-if="modalView['noticeEventFAQ']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <NoticeEventFAQ />
  </Modal>
  <Modal
    key="profile"
    :modal="'profile'"
    :title="$t('profile')"
    v-if="modalView['profile']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Profile />
  </Modal>
  <Modal
    padding="height: 100%"
    key="login"
    :modal="'login'"
    :styles="styleModalLogin"
    v-if="modalView['login']"
  >
    <Login />
  </Modal>
  <Modal
    :styles="styleModalSignup"
    padding="height: 100%"
    key="signUp"
    :modal="'signUp'"
    v-if="modalView['signUp']"
  >
    <Signup />
  </Modal>
  <Modal
    key="gameGuide"
    :modal="'gameGuide'"
    :title="$t('betrule')"
    v-if="modalView['gameGuide']"
    :styles="styleModalBetRule"
    :navigate="true"
  >
    <BetRule />
  </Modal>
  <Modal
    key="serviceCenter"
    :modal="'serviceCenter'"
    :title="$t('serviceCenter')"
    v-if="modalView['serviceCenter']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <ServiceCenter />
  </Modal>
  <Modal
    key="message"
    :modal="'message'"
    :title="$t('message')"
    v-if="modalView['message']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Message />
  </Modal>
  <Modal
    key="betting"
    :modal="'betting'"
    :title="$t('bettingHistory')"
    v-if="modalView['betting']"
    :styles="styleModalBetting"
    :navigate="true"
  >
    <BettingHistory />
  </Modal>
  <Modal
    key="partnership"
    :modal="'partnership'"
    :title="$t('partnership')"
    v-if="modalView['partnership']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Partnership />
  </Modal>
  <ConfirmDialog />
  <Toast
    :pt="{
      root: { style: { opacity: 1 }, class: 'toast-message-wrapper' },
    }"
  />
</template>
<style>
@media (max-width: 400px) {
  .toast-message-wrapper {
    max-width: 90vw;
  }
}
</style>
