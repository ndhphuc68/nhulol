<script setup>
import {computed} from "vue"
import {useStore} from "vuex";
import Modal from "@/components/Modal/Modal.vue";

const store = useStore();
const modals = computed(() => store.state.modal.modals)
</script>
<template>
  <div>
    <Modal
        v-for="({modalKey, component }) in modals"
        :key="modalKey"
        :isLogo="true"
        :modalKey="modalKey">
      <div>
        <component :is="component()"/>
      </div>
    </Modal>
  </div>
</template>

<style></style>
