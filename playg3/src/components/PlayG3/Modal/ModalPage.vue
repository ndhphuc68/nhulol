<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
// import Notice from "@/views/PlayG3/Modals/Notice";
// import FAQ from "@/views/PlayG3/Modals/FAQ";
// import Event from "@/views/PlayG3/Modals/Event";
import Modal from "@/components/PlayG3/Modal/Modal";
import Partnership from "@/views/PlayG3/Home/Modals/Partnership";
import NoticeEventFAQ from "@/views/PlayG3/Home/Modals/NoticeAndFAQ";

const store = useStore();
const toggle = computed(() => store.state.modal.toggleShow);
const modalView = computed(() => store.state.modal.toggleShow);
const styleModalUser = {
  height: "80vh",
};

const styleModalService = {
  width: "95%",
  height: "80vh",
};
</script>
<template>
  <!--    <Modal-->
  <!--        v-if="toggle['login']"-->
  <!--        :modal="'login'"-->
  <!--        :styles="{ width: '1036px', height: 'auto', border: 'none', margin: '20px' }">-->
  <!--        <
    />-->
  <!--    </Modal>-->
  <!--  <Modal-->
  <!--    v-if="toggle['notice']"-->
  <!--    :modal="'notice'"-->
  <!--    :styles="{-->
  <!--      width: '1036px',-->
  <!--      height: '700px',-->
  <!--      border: 'none',-->
  <!--      margin: '20px',-->
  <!--    }"-->
  <!--  >-->
  <!--    <Notice />-->
  <!--  </Modal>-->
  <!--  <Modal-->
  <!--    v-if="toggle['event']"-->
  <!--    :modal="'event'"-->
  <!--    :styles="{-->
  <!--      width: '1036px',-->
  <!--      height: '700px',-->
  <!--      border: 'none',-->
  <!--      margin: '20px',-->
  <!--    }"-->
  <!--  >-->
  <!--    <Event />-->
  <!--  </Modal>-->
  <!--  <Modal-->
  <!--    v-if="toggle['faqs']"-->
  <!--    :modal="'faqs'"-->
  <!--    :styles="{-->
  <!--      width: '1036px',-->
  <!--      height: '700px',-->
  <!--      border: 'none',-->
  <!--      margin: '20px',-->
  <!--    }"-->
  <!--  >-->
  <!--    <FAQ />-->
  <!--  </Modal>-->
  <!--  <Modal-->
  <!--    v-if="toggle['partnership']"-->
  <!--    :modal="'partnership'"-->
  <!--    :styles="{-->
  <!--      width: '1036px',-->
  <!--      height: 'auto',-->
  <!--      minHeight: '70vh',-->
  <!--      padding: '20px',-->
  <!--      border: 'none',-->
  <!--    }"-->
  <!--  >-->
  <!--    <Partnership />-->
  <!--  </Modal>-->
  <!--  <ConfirmDialog />-->
  <!--  <Toast-->
  <!--    :pt="{-->
  <!--      root: { style: { opacity: 1 } },-->
  <!--    }"-->
  <!--  />-->
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
  <Modal
    key="noticeEventFAQ"
    :modal="'noticeEventFAQ'"
    title=" "
    v-if="modalView['noticeEventFAQ']"
    :styles="styleModalService"
    :navigate="true"
  >
    <NoticeEventFAQ />
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
