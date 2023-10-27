<template>
  <Modal2
    :isLogo="true"
    :modal="'login'"
    :styles="{ width: '940px', height: '640px', border: 'none' }"
    v-if="toggle['login']"
  >
    <Login />
  </Modal2>
  <Modal2
    :isLogo="true"
    :modal="'personal'"
    v-if="toggle['personal']"
    :styles="{
      width: '1128px',
      height: '900px',
    }"
  >
    <Personal />
  </Modal2>
  <Modal2
    :isLogo="true"
    :modal="'signUp'"
    :styles="{
      width: '960px',
      height: '870px',
      border: 'none',
      overflowY: 'hidden',
    }"
    v-if="toggle['signUp']"
  >
    <SignUp />
  </Modal2>
  <!--  <Modal-->
  <!--    :modal="'personal'"-->
  <!--    :styles="{-->
  <!--      maxWidth: '100vw',-->
  <!--      maxHeight: '90vh',-->
  <!--      width: '1128px',-->
  <!--      height: '900px',-->
  <!--      border: 'none',-->
  <!--    }"-->
  <!--    v-if="toggle['personal']"-->
  <!--  >-->
  <!--    <Personal />-->
  <!--  </Modal>-->
  <Modal2
    :isLogo="true"
    :modal="'notice'"
    :styles="{ width: '1128px', height: '800px', border: 'none' }"
    v-if="toggle['notice']"
  >
    <Notice />
  </Modal2>
  <Modal2
    :isLogo="true"
    :modal="'gameGuide'"
    :styles="{
      width: '1128px',
      height: '900px',
      // maxWidth: '1128px',
      // maxHeight: '900px',
      //border: 'none',
    }"
    v-if="toggle['gameGuide']"
  >
    <GameGuide />
  </Modal2>
  <Modal2
    :isLogo="true"
    :modal="'partnership'"
    :styles="{ width: '1128px', height: '700px', border: 'none' }"
    v-if="toggle['partnership']"
  >
    <Partnership />
  </Modal2>
  <Modal2
    :modal="'betting'"
    :styles="{ width: '1128px', height: '700px', border: 'none' }"
    v-if="toggle['betting']"
  >
    <Betting />
  </Modal2>
  <Modal2
    :isLogo="true"
    :modal="'betting1'"
    :styles="{ width: '1128px', height: '700px', border: 'none' }"
    v-if="toggle['betting1']"
  >
    <Betting1 />
  </Modal2>
  <ConfirmDialog />
</template>
<script setup>
import { useStore } from "vuex";
import Modal from "@/components/EDGames/modal/Modal";
import Modal2 from "@/components/EDGames/modal/Modal2.vue";
import Login from "@/views/EDGames/modals/login/Login";
import SignUp from "@/views/EDGames/modals/signup/SignUp";
import Personal from "@/views/EDGames/modals/Personal";
import Notice from "@/views/EDGames/modals/Notice";
import GameGuide from "@/views/EDGames/modals/GameGuide";
import Partnership from "@/views/EDGames/modals/Partnership";
import Betting from "@/views/EDGames/modals/Betting";
import Betting1 from "@/views/EDGames/modals/Betting/Betting1";
import ConfirmDialog from "primevue/confirmdialog";

const store = useStore();

const toggle = store.state.modal.toggleShow;
</script>
<style></style>
