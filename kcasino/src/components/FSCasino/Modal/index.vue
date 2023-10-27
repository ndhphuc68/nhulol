<script setup>
import Modal from "@/components/FSCasino/Modal/Modal.vue";
import Login from "@/views/FSCasino/home/modals/Login";
import SignUp from "@/views/FSCasino/home/modals/Signup";
import UserInfo from "@/views/FSCasino/home/modals/User";
import HelpCenter from "@/views/FSCasino/home/modals/Helpcenter";
import CreateHelp from "@/views/FSCasino/home/modals/Helpcenter/CreateHelpCenter";
import Deposit from "@/views/FSCasino/home/modals/Deposit";
import Withdraw from "@/views/FSCasino/home/modals/Withdraw";
import GameGuide from "@/views/FSCasino/home/modals/GameGuide";
import Event from "@/views/FSCasino/home/modals/Event";
import Message from "@/views/FSCasino/home/modals/Message";
import DepositHistory from "@/views/FSCasino/home/modals/DepositHistory";
import WithdrawHistory from "@/views/FSCasino/home/modals/WithdrawHistory";
import NoticeAndFAQ from "@/views/FSCasino/home/modals/NoticeAndFAQ";
import Partnership from "@/views/FSCasino/home/modals/Partnership";
import BettingHistory from "@/views/FSCasino/home/modals/BettingHistory";
import {useStore} from "vuex";
import {computed} from "vue";
import {Icons} from "@/const/Icons";
import {Images} from "@/const/Image";

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);
const customPage = computed(() => store.state.customPage.styles);

const styleModalLogin = {
  width: "905px",
  height: "545px",
};

const styleModalSignUp = {
  width: "1128px",
  height: "810px",
};

const styleModalUser = {
  width: "1128px",
  height: "793px",
};
const styleModalHelpCenter = {
  width: "1128px",
  height: "715px",
};

const styleModalDeposit = {
  width: "1128px",
  height: "900px"
}
const styleModalWithdraw = {
  width: "1128px",
  height: "820px"
}

const styleModalDepositHistory = {
  width: "1128px",
  height: "850px"
}


</script>

<template>
  <Modal
    :padding="null"
    key="login"
    :modal="'login'"
    :styles="styleModalLogin"
    v-if="modalView['login']"
  >
    <Login/>
  </Modal>
  <Modal
    :padding="null"
    key="signUp"
    :modal="'signUp'"
    :styles="styleModalSignUp"
    v-if="modalView['signUp']"
  >
    <SignUp/>
  </Modal>
  <Modal
    :isIcon="true"
    key="user"
    :modal="'user'"
    :icon="Icons.iconUser"
    :styles="styleModalUser"
    :title="$t('userinfo')"
    v-if="modalView['user']"
  >
    <UserInfo/>
  </Modal>
  <Modal
    :isIcon="true"
    key="helpCenter"
    :modal="'helpCenter'"
    :icon="Icons.iconHelpCenter"
    :styles="styleModalHelpCenter"
    :title="$t('helpCenter')"
    v-if="modalView['helpCenter']"
  >
    <HelpCenter/>
  </Modal>
  <Modal
    :padding="null"
    key="createHelp"
    :modal="'createHelp'"
    :styles="styleModalHelpCenter"
    v-if="modalView['createHelp']"
  >
    <CreateHelp/>
  </Modal>
  <Modal
    :isIcon="true"
    key="deposit"
    :modal="'deposit'"
    :icon="Icons.iconDeposit"
    :styles="styleModalDeposit"
    :title="$t('deposit')"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
    v-if="modalView['deposit']"
  >
    <Deposit/>
  </Modal>
  <Modal
    :isIcon="true"
    key="withdraw"
    :modal="'withdraw'"
    :icon="Icons.iconWithdraw"
    :styles="styleModalWithdraw"
    :title="$t('withdraw')"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
    v-if="modalView['withdraw']"
  >
    <Withdraw/>
  </Modal>
  <Modal
    :isIcon="true"
    key="gameGuide"
    :modal="'gameGuide'"
    :icon="Icons.iconGameGuide"
    :styles="styleModalUser"
    :title="$t('gameGuide')"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
    v-if="modalView['gameGuide']"
  >
    <GameGuide/>
  </Modal>
  <Modal
    :padding="null"
    key="event"
    :modal="'event'"
    :styles="styleModalUser"
    v-if="modalView['event']"
  >
    <Event/>
  </Modal>
  <Modal
    :isIcon="true"
    key="message"
    :modal="'message'"
    :icon="Icons.iconMessage"
    :styles="styleModalUser"
    :title="$t('message')"
    v-if="modalView['message']"
  >
    <Message/>
  </Modal>
  <Modal
    :isIcon="true"
    key="depositHistory"
    :modal="'depositHistory'"
    :icon="Icons.iconDepositHistory"
    :styles="styleModalDepositHistory"
    :title="$t('depositHistory')"
    v-if="modalView['depositHistory']"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
  >
    <DepositHistory/>
  </Modal>
  <Modal
    :isIcon="true"
    key="withdrawHistory"
    :modal="'withdrawHistory'"
    :icon="Icons.iconWithdrawHistory"
    :styles="styleModalDepositHistory"
    :title="$t('withdrawHistory')"
    v-if="modalView['withdrawHistory']"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
  >
    <WithdrawHistory/>
  </Modal>
  <Modal
    :isIcon="true"
    key="notice"
    :modal="'notice'"
    :styles="styleModalUser"
    :padding="'modal-content px-lg-5 mt-4 px-2'"
    v-if="modalView['notice']"
  >
    <NoticeAndFAQ/>
  </Modal>
  <Modal
    :isIcon="true"
    key="partnership"
    :modal="'partnership'"
    :image=" customPage?.logo_image
                  ? customPage.logo_image : Images.logoFS"
    :styles="styleModalUser"
    v-if="modalView['partnership']"
  >
    <Partnership/>
  </Modal>
  <Modal
    :isIcon="true"
    key="bettingHistory"
    :modal="'betting'"
    :icon="Icons.iconDepositHistory"
    :styles="styleModalUser"
    :title="$t('bettingHistory')"
    v-if="modalView['betting']"
  >
    <BettingHistory/>
  </Modal>
</template>

<style scoped></style>
