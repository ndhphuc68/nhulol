<script setup>
import {defineProps} from 'vue'
import {useStore} from "vuex";

const store = useStore();

const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isLogo: Boolean,
  handleClose: Function,
  modalKey: String
});

function handleCloseModal() {
  store.commit("closeModal", {modalKey: props.modalKey});
  if (props.handleClose) {
    props.handleClose()
  }
}
</script>

<template>
  <div class="modal-wrapper" @click.self="handleCloseModal">
    <div :style="props.styles" class="modalBox">
      <div class="modal-top d-flex align-center justify-space-between">
        <button class="btn-close" @click="handleCloseModal">
          <img alt="close-icon" height="24" src="../../assets/icon/commons/close-icon.png" width="24"/>
        </button>
        <img v-if="props.isLogo" alt="logo" class="logo" src="@/assets/logos/logo.png"/>
      </div>
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
}

.modalBox {
  position: relative;
  width: auto;
  height: auto;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  z-index: 3;
  border: 1px solid #ffff !important;
  border-radius: 8px;
  background: var(--bg);
}

.modal-content {
  flex: 1;
  overflow: auto;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.modalBox::-webkit-scrollbar {
  display: none;
}

.btn-close {
  font-weight: 200;
  font-size: 30px;
  z-index: 9;
}

.modal-top {
  flex-direction: row-reverse;
  margin: 10px 20px 0;
}

.logo {
  height: 40px;
}
</style>
