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

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

const styleModalSignup = {
  height: "90vh",
};
const styleModalLogin = {
  height: "80vh",
};

const styleModalUser = {
  width: "95%",
  height: "80vh",
  padding: "0 50px",
};

const styleModalBetRule = {
  width: "95%",
  height: "80%",
  overflowY: "hidden",
  padding: "0 50px",
};
</script>
<template>
  <Modal
    :padding="'h-75'"
    key="deposit"
    :modal="'deposit'"
    :title="$t('deposit')"
    v-if="modalView['deposit']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Deposit />
  </Modal>
  <Modal
    :padding="'h-75'"
    key="withdraw"
    :modal="'withdraw'"
    :title="$t('withdraw')"
    v-if="modalView['withdraw']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Withdraw />
  </Modal>
  <Modal
    :padding="'h-75'"
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
    :padding="'h-75'"
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
    padding="h-100"
    key="login"
    :modal="'login'"
    :styles="styleModalLogin"
    v-if="modalView['login']"
  >
    <Login />
  </Modal>
  <Modal
    :styles="styleModalSignup"
    padding="h-100"
    key="signUp"
    :modal="'signUp'"
    v-if="modalView['signUp']"
  >
    <Signup />
  </Modal>
  <Modal
    :padding="'h-75'"
    key="betrule"
    :modal="'betrule'"
    :title="$t('betrule')"
    v-if="modalView['betrule']"
    :styles="styleModalBetRule"
    :navigate="true"
  >
    <BetRule />
  </Modal>
  <Modal
    :padding="'h-75'"
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
    :padding="'h-75'"
    key="message"
    :modal="'message'"
    :title="$t('message')"
    v-if="modalView['message']"
    :styles="styleModalUser"
    :navigate="true"
  >
    <Message />
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
