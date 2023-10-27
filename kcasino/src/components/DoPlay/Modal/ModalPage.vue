<template>
    <Modal
        :modal="'login'"
        :styles="{ width: '940px', maxHeight: '95%', border: 'none' }"
        v-if="toggle['login']"
    >
        <Login/>
    </Modal>
    <Modal
        :modal="'signUp'"
        :styles="{
      width: '1128px',
      height:'850px',
       maxHeight: '95%',
      overflowY: 'hidden',
    }"
        :isLogo="true"
        v-if="toggle['signUp']"
    >
        <SignUp/>
    </Modal>
    <Modal
        :modal="'personal'"
        :styles="{
      width: '1128px',
      height: '850px',
      border: 'none',
      overflowY: 'hidden',
    }"
        :isLogo="true"
        v-if="toggle['personal']"
    >
        <Personal/>
    </Modal>
    <Modal
        :modal="'betting'"
        :styles="{ width: '1128px', height: '80%', border: 'none' , overflowY: 'hidden'}"
        v-if="toggle['betting']"
        :isLogo="true"
    >
        <Betting/>
    </Modal>
    <Modal
        :modal="'event'"
        :styles="{ width: '1128px', height: '800px', border: 'none' ,overflowY: 'hidden'}"
        v-if="toggle['event']"
        :isLogo="true"
    >
        <Event/>
    </Modal>
    <Modal
        :modal="'faq'"
        :styles="{ width: '1128px', height: '800px', border: 'none',overflowY: 'hidden', }"
        v-if="toggle['faq']"
        :isLogo="true"
    >
        <FAQ/>
    </Modal>
    <Modal
        :modal="'partnership'"
        :styles="{ width: '1128px', height: '700px', border: 'none' ,overflowY: 'hidden' }"
        v-if="toggle['partnership']"
        :isLogo="true"
    >
        <Partnership/>
    </Modal>
    <Modal
        :modal="'notice'"
        :styles="{ width: '1128px', height: '850px', border: 'none' ,overflowY: 'hidden',}"
        v-if="toggle['notice']"
        :isLogo="true"
    >
        <Notice/>
    </Modal>
    <Modal
        :modal="'gameGuide'"
        :styles="{ width: '1128px', height: '95%', border: 'none',  overflowY: 'hidden', }"
        v-if="toggle['gameGuide']"
        :isLogo="true"
    >
        <BetRule/>
    </Modal>

</template>
<script setup>
import {useStore} from "vuex";
import Modal from "@/components/DoPlay/Modal/Modal";
import Login from "@/views/DoPlay/modalsDoPlay/Login";
import SignUp from "@/views/DoPlay/modalsDoPlay/SignIn";
import Personal from "@/views/DoPlay/modalsDoPlay/Personal";
import Event from "@/views/DoPlay/modalsDoPlay/Event";
import FAQ from "@/views/DoPlay/modalsDoPlay/FAQ";
import Partnership from "@/views/DoPlay/modalsDoPlay/Partnership";
import Betting from "@/views/DoPlay/modalsDoPlay/Betting";
import Notice from "@/views/DoPlay/modalsDoPlay/Notice";
import BetRule from "@/views/DoPlay/modalsDoPlay/BetRule";
// import Betting1 from "@/views/modalsDoPlay/Betting/Betting1";

const store = useStore();

const toggle = store.state.modal.toggleShow;
</script>
<style></style>
