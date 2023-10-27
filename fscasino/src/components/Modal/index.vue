<script setup>
import Modal from "@/components/Modal/Modal.vue";
import Login from "@/views/home/modals/Login";
import SignUp from "@/views/home/modals/Signup";
import UserInfo from "@/views/home/modals/User";
import HelpCenter from "@/views/home/modals/Helpcenter";
import CreateHelp from "@/views/home/modals/Helpcenter/CreateHelpCenter";
import Deposit from "@/views/home/modals/Deposit";
import Withdraw from "@/views/home/modals/Withdraw";
import GameGuide from "@/views/home/modals/GameGuide";
import Event from "@/views/home/modals/Event";
import Message from "@/views/home/modals/Message";
import DepositHistory from "@/views/home/modals/DepositHistory";
import WithdrawHistory from "@/views/home/modals/WithdrawHistory";
import { useStore } from "vuex";
import { computed } from "vue";
import { Icons } from "@/const/Icons";

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

const styleModalLogin = {
  width: "905px",
  height: "535px",
};

const styleModalSignUp = {
  width: "1128px",
  height: "920px",
};

const styleModalUser = {
  width: "1128px",
  height: "793px",
};
</script>

<template>
  <Modal
    :padding="null"
    key="login"
    :modal="'login'"
    :styles="styleModalLogin"
    v-if="modalView['login']"
  >
    <Login />
  </Modal>
  <Modal
    :padding="null"
    key="signup"
    :modal="'signup'"
    :styles="styleModalSignUp"
    v-if="modalView['signup']"
  >
    <SignUp />
  </Modal>
  <Modal
    :isIcon="true"
    key="user"
    :modal="'user'"
    :icon="Icons.iconUser"
    :styles="styleModalUser"
    :title="'User Information'"
    v-if="modalView['user']"
  >
    <UserInfo />
  </Modal>
  <Modal
    :isIcon="true"
    key="helpCenter"
    :modal="'helpCenter'"
    :icon="Icons.iconHelpCenter"
    :styles="styleModalUser"
    :title="'Help Center'"
    v-if="modalView['helpCenter']"
  >
    <HelpCenter />
  </Modal>
  <Modal
    :padding="'px-5'"
    key="createHelp"
    :modal="'createHelp'"
    :styles="styleModalUser"
    v-if="modalView['createHelp']"
  >
    <CreateHelp />
  </Modal>
  <Modal
    :isIcon="true"
    key="deposit"
    :modal="'deposit'"
    :icon="Icons.iconHelpCenter"
    :styles="styleModalUser"
    :title="'Deposit'"
    :padding="'modal-content px-5 mt-4'"
    v-if="modalView['deposit']"
  >
    <Deposit />
  </Modal>
  <Modal
    :isIcon="true"
    key="withdraw"
    :modal="'withdraw'"
    :icon="Icons.iconHelpCenter"
    :styles="styleModalUser"
    :title="'Withdraw'"
    :padding="'modal-content px-5 mt-4'"
    v-if="modalView['withdraw']"
  >
    <Withdraw />
  </Modal>
  <Modal
    :isIcon="true"
    key="gameGuide"
    :modal="'gameGuide'"
    :icon="Icons.iconGameGuide"
    :styles="styleModalUser"
    :title="'Game Guide'"
    :padding="'modal-content px-5 mt-4'"
    v-if="modalView['gameGuide']"
  >
    <GameGuide />
  </Modal>
  <Modal
    :padding="null"
    key="event"
    :modal="'event'"
    :styles="styleModalUser"
    v-if="modalView['event']"
  >
    <Event />
  </Modal>
  <Modal
    :isIcon="true"
    key="message"
    :modal="'message'"
    :icon="Icons.iconMessage"
    :styles="styleModalUser"
    :title="'Message'"
    v-if="modalView['message']"
  >
    <Message />
  </Modal>
  <Modal
    :isIcon="true"
    key="depositHistory"
    :modal="'depositHistory'"
    :icon="Icons.iconDepositHistory"
    :styles="styleModalUser"
    :title="'depositHistory'"
    v-if="modalView['depositHistory']"
  >
    <DepositHistory />
  </Modal>
  <Modal
    :isIcon="true"
    key="withdrawHistory"
    :modal="'withdrawHistory'"
    :icon="Icons.iconWithdrawHistory"
    :styles="styleModalUser"
    :title="'Withdraw History'"
    v-if="modalView['withdrawHistory']"
  >
    <WithdrawHistory />
  </Modal>
</template>

<style scoped></style>
