<template>
  <div
    @click.self="handleCloseModal(props.modal)"
    class="modal_container d-flex justify-content-center align-items-center"
  >
    <div class="modal_main" :style="props.styles && props.styles">
      <div
        v-if="props.isIcon"
        class="d-flex flex-row justify-content-between w-100 align-items-center modal_header px-lg-5 px-3 mt-4 mt-lg-5"
      >
        <div
          v-if="props.image === ''"
          class="d-flex justify-content-start align-items-center"
        >
          <img
            class="icon-modal"
            :src="props.icon"
            alt="icon"
            v-if="props.icon"
          />
          <span class="modal-header-title ms-3">{{ props.title }}</span>
        </div>
        <div
          v-if="props.image !== ''"
          class="d-flex justify-content-start align-items-center"
        >
          <img class="image-modal" :src="props.image" alt="icon" />
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <button @click="handleCloseModal(props.modal)">
<!--            <img class="icon-close" :src="Icons.close" alt="close" />-->
            <i class="pi pi-times" style="font-size: 1.5rem"></i>
          </button>
        </div>
      </div>
      <div
        class="w-100 modal_body row"
        :class="[
          props.padding,
          // props.modal === 'event' && height <= 460
          //   ? 'modal-content-v3'
          //   : height <= 460
          //   ? 'modal-content-v2'
          //   : '',
        ]"
        :style="props.isIcon ? 'max-height: calc(100% - 140px);':'max-height: 100%'"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { handleCloseModal } from "@/utils";

const props = defineProps({
  styles: {
    type: Object,
    default: () => {},
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
    default: "px-lg-5 mt-lg-4 mt-2 px-1",
  },
  image: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.modal_container {
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 55;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .modal_main {
    background-color: var(--bgPlay4G);
    margin: auto 0;
    position: relative;
    max-height: 90%;
    max-width: 95%;
    overflow: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    //@media (max-width: 992px) {
    //  height: 95% !important;
    //}

    .modal_header {
      .icon-close {
        width: 30px;
        height: 30px;
      }

      .icon-modal {
        width: 50px;
        height: 50px;
        @media (max-width: 992px) {
          width: 30px;
          height: 30px;
        }
      }

      //.image-modal {
      //  //width: 50px;
      //  height: 100px;
      //}

      .modal-header-title {
        color: var(--light-gradient);
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        @media (max-width: 992px) {
          font-size: 23px;
        }
      }
    }

    .modal_body {
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;
      height:100%;

      &::-webkit-scrollbar {
        display: none;
      }

      //@media (max-width: 768px) {
      //  & {
      //    height: 100% !important;
      //    justify-content: center;
      //  }
      //}
    }

    .modal-content {
      //max-height: 80%;
    }

    .modal-content-v2 {
      max-height: 55% !important;
    }

    .modal-content-v3 {
      max-height: 70% !important;
    }
  }
}
</style>
