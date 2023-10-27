<script setup>
import {computed} from "vue"
import {useStore} from "vuex";
import Modal from '@/components/PlayGame1/modal/Modal.vue'
import Login from "@/views/PlayGame1/modals/Login/index.vue";
import SignUp from "@/views/PlayGame1/modals/Signup/index.vue";
import Partnership from "@/views/PlayGame1/modals/Partnership/index.vue";
import Confirm from "@/components/PlayGame1/modal/Confirm.vue";
import Notice from "@/views/PlayGame1/modals/Notice"
import Event from "@/views/PlayGame1/modals/Event"
import FAQ from "@/views/PlayGame1/modals/FAQ"

const store = useStore();
const toggle = computed(() => store.state.modal.toggleShow)

</script>
<template>
    <Modal
        v-if="toggle['login']"
        :modal="'login'"
        :styles="{ width: '1036px', height: '600px', border: 'none', margin: '20px' }">
        <Login/>
    </Modal>
    <Modal
        v-if="toggle['signUp']"
        :modal="'signUp'"
        :styles="{ width: '1036px', height: '790px', border: 'none', margin: '20px' }">
        <SignUp/>
    </Modal>
    <Modal
        v-if="toggle['partnership']"
        :modal="'partnership'"
        :styles="{ width: '1036px', height: '600px',
                     border: 'none' }"
    >
        <Partnership/>
    </Modal>
  <Modal
      v-if="toggle['notice']"
      :modal="'notice'"
      :styles="{ width: '1036px', height: '670px', border: 'none'}">
    <Notice/>
  </Modal>
  <Modal
      v-if="toggle['event']"
      :modal="'event'"
      :styles="{ width: '1036px', height: '670px', border: 'none'}">
    <Event/>
  </Modal>
  <Modal
      v-if="toggle['faq']"
      :modal="'faq'"
      :styles="{ width: '1036px', height: '670px', border: 'none'}">
    <FAQ/>
  </Modal>
    <Confirm  />
</template>

<style></style>
