<template>
  <div class="modal-wrapper" @click.self="handleToggle(props.modal)">
    <div :style="props.styles" class="modalBox">
      <div class="modal-top d-flex align-center justify-content-between">
        <button class="button-close" @click="handleToggle(props.modal)">
          <i class="pi pi-times" style="font-size: 1.5rem; color: #969494"></i>
        </button>
        <img
          alt="logo"
          :src="
            customPage?.logo_image
              ? customPage?.logo_image
              : require('@/assets/PlayG3/logo/logo.png')
          "
          class="logo"
        />
      </div>
      <div class="content-modal">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const customPage = computed(() => store.state.customPage?.styles);
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
  if (!props?.handleClose) {
    store.commit("handleToggle", modal);
  } else {
    props.handleClose();
  }
};

onMounted(() => {
  document.documentElement.style.overflowY = "hidden";
});
onUnmounted(() => {
  document.documentElement.style.overflowY = "auto";
});
</script>

<style scoped lang="scss">
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
  max-width: 1100px;
  max-height: 90% !important;
  //width: auto; //height: 10; //overflow-y: auto; overflow: hidden; z-index: 3; border: 1px solid #ffff !important;
  border-radius: 8px;
  background: #24262b;
  margin-top: 0;
  padding: 50px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 30px;
  }

  .content-modal {
    height: 100%;
    overflow-y: auto;
  }
}

.modalBox::-webkit-scrollbar {
  display: none;
}

.button-close {
  font-weight: 200;
  font-size: 20px;
  z-index: 9;
}

.modal-top {
  flex-direction: row-reverse;
  /* margin: 44px 50px 0; */

  @media (max-width: 768px) {
    /* margin: 44px 20px 0; */
  }
}

.logo {
  height: 60px;

  @media (max-width: 375px) {
    height: 35px;
  }
}

@media (max-width: 991px) {
  .modalBox {
    width: 90% !important;
    padding: 4rem 1rem;
  }
}
</style>
<style></style>
