<script setup>
import Modal from "@/components/Play4G/Modal/Modal.vue";
import Login from "@/views/Play4G/Modals/Login";
import SignUp from "@/views/Play4G/Modals/Signup";
import Partnership from "@/views/Play4G/Home/Modals/Partnership";
import NoticeEventFAQ from "@/views/Play4G/Home/Modals/NoticeAndFAQ";
import {useStore} from "vuex";
import {computed} from "vue";
import {Images} from "@/const/Play4G/Images"

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

const styleModalLogin = {
  width: "486px",
  height: "520px",
  borderRadius:'10px',
  padding: '32px'
};

const styleModalSignUp = {
  width: "486px",
  borderRadius:'10px',
  padding: '32px',
  height: "830px",
};

const styleModalUser = {
  height: "80vh",
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
      key="noticeEventFAQ"
      :modal="'noticeEventFAQ'"
      :image="Images.logo4G"
      title=" "
      v-if="modalView['noticeEventFAQ']"
      :styles="{ width: '1036px', height: '700px', border: 'none', margin: '20px' }"
      :navigate="true"
  >
    <NoticeEventFAQ />
  </Modal>
  <Modal
      :isIcon="true"
      key="partnership"
      :modal="'partnership'"
      :image="Images.logo4G"
      :styles="styleModalUser"
      v-if="modalView['partnership']"
  >
    <Partnership/>
  </Modal>
</template>

<style scoped></style>
