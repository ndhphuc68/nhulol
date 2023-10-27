<template>
  <div class="modal-wrapper" @click.self="handleToggle(props.modal)">
    <div class="modalBox" :style="props.styles">
      <button class="btn-close" @click="handleToggle(props.modal)">
        <img alt="" src="@/assets/icon/close-icon.png" height="24" width="24" />
      </button>
            <slot></slot>
    </div>
  </div>
</template>

<script setup>
// export default {
//   name: "ModalView",
//   components: {},
//   props: ["styles", "modal"],
//   methods: {
//     handleToggle(modal) {
//       this.$store.commit("handleToggle", modal);
//     },
//   },
// };
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const tabGameCurrent = ref(store.state.games.tabGameActivate);
const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {};
    },
  },
  modal: {
    type: String,
    default: "",
  },
  modalType: {
    type: String,
    default: undefined,
  },
  handleClose: Function,
});

const handleToggle = (modal) => {
  store.commit("handleActiveSidebar", tabGameCurrent.value);
  if (!props?.handleClose) {
    store.commit("handleToggle", modal);
  } else {
    props.handleClose();
  }
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  overflow: hidden;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
}
.modalBox {
  position: relative;
  max-height: 90%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 3;
  border: 1px solid #ffff !important;
  border-radius: 8px;
  background: #fff;
  margin-top: 0;
}
.modalBox::-webkit-scrollbar {
  display: none;
}
.btn-close {
  font-weight: 200;
  font-size: 30px;
  position: absolute;
  top: 40px;
  right: 48px;
  z-index: 9;
}
@media (max-width: 768px) {
  .modalBox {
    overflow: scroll;
  }
}
</style>
