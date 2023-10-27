<template>
  <div
      @click.self="handleCloseModal(props.modal)"
      class="modal_container d-flex justify-content-center align-items-center"
  >
    <div class="modal_main" :style="props.styles && props.styles">
      <div
          v-if="props.isIcon"
          class="d-flex flex-row justify-content-between align-items-center modal_header px-lg-5 px-3 mt-5"
      >
        <div class="d-flex justify-content-start align-items-center">
          <img class="icon-modal" :src="props.icon" alt="icon"/>
          <span class="modal-header-title ms-3">{{ props.title }}</span>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <button @click="handleCloseModal(props.modal)">
            <img class="icon-close" :src="Icons.close" alt="close"/>
          </button>
        </div>
      </div>
      <div class="w-100 modal_body row" :class="props.padding">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icons} from "@/const/Icons";
import {defineProps} from "vue";
import {handleCloseModal} from "@/utils";

const props = defineProps({
  styles: {
    type: Object,
    default: () => {
    },
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  modal: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  padding: {
    type: String,
    default: "px-lg-5 mt-lg-4 mt-2 h-75 px-1",
  },
});
</script>

<style scoped lang="scss">
.modal_container {
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .modal_main {
    background-color: var(--white);
    margin: auto 0;

    .modal_header {
      .icon-close {
        width: 30px;
        height: 30px;
      }

      .icon-modal {
        width: 50px;
        height: 50px;
      }

      .modal-header-title {
        color: var(--light-gradient);
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }

    .modal_body {
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .modal-content {
      max-height: 80%;
    }
  }
}
</style>
