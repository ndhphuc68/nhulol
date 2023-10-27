<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const tabGameCurrent = ref(store.state.games.tabGameActivate);
const customPage = computed(() => store.state.customPage.styles);
const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isLogo: {
    type: Boolean,
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

<template>
  <div class="modal-wrapper" @click.self="handleToggle(props.modal)">
    <div class="box-modal" :style="props.styles">
      <div class="btn-close" @click="handleToggle(props.modal)">
        <img alt="" src="@/assets/icon/close-icon.png" height="24" width="24" />
      </div>
      <div class="header-modal" v-if="isLogo">
        <img
          class="logo"
          :src="
            customPage.logo_image
              ? customPage.logo_image
              : require('@/assets/logo/sidebar/kcasino.png')
          "
          alt="logo"
        />
      </div>
      <div
        class="content-modal"
        :style="isLogo ? 'max-height: calc(100% - 7rem);' : 'max-height: 98%;'"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9;
}
.box-modal {
  background: #fff;
  width: 1128px;
  height: 900px;
  max-height: 95vh !important;
  max-width: 95% !important;
  overflow: hidden;
  position: relative;
  @media (max-width: 1024px) {
    max-height: 85vh !important;
  }

  .btn-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
  }
  .header-modal {
    padding: 1.5rem 2rem;
    height: 6rem;
    @media (max-width: 768px) {
      padding: 1.5rem 1rem;
    }

    .logo {
      object-fit: contain;
      height: 100%;
      @media (max-width: 300px) {
        width: 150px;
        object-fit: contain;
      }
    }
  }
  .content-modal {
    padding: 0.5rem 2rem;
    overflow-y: auto;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
}
</style>
