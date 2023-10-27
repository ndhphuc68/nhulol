<template>
  <div
    @click.self="handleCloseModal(props.modal)"
    class="modal_container d-flex justify-content-center align-items-center"
  >
    <div class="modal_main" :style="props.styles && props.styles">
      <div
        v-if="props.title"
        class="d-flex flex-row justify-content-betweet align-items-center modal_header px-lg-5 px-3 mt-4 mt-lg-5"
      >
        <div class="title-desktop">
          <img
            alt="logo"
            src="@/assets/SCCasino/logo/logo.png"
            height="54"
            width="215"
          />
          <div class="d-flex justify-content-end align-items-center">
            <button @click="handleCloseModal(props.modal)">
              <img class="icon-close" :src="Icons.close" alt="close" />
            </button>
          </div>
        </div>
        <div class="title-mobile">
          <button @click="handleToggleSidebar" class="more">
            <i class="pi pi-align-justify" style="font-size: 1.5rem"></i>
          </button>
          <div class="title">{{ props.title }}</div>
        </div>
      </div>
      <div class="modal_body row" :class="props.padding">
        <slot></slot>
      </div>
    </div>
  </div>
  <div v-if="navigate" class="nav-bottom">
    <NavbarMobile />
  </div>
</template>

<script setup>
import { Icons } from "@/const/SCCasino/Icons";
import { defineProps } from "vue";
import { handleCloseModal } from "@/utils/SCCasino";
import { useStore } from "vuex";
import NavbarMobile from "@/components/SCCasino/NavbarMobile";

const store = useStore();

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
    default: "px-lg-5 mt-lg-4 mt-2 h-75 px-1",
  },
  image: {
    type: String,
    default: "",
  },
  navigate: {
    type: Boolean,
    default: false,
  },
});

const handleToggleSidebar = () => {
  store.commit("handleToggleSidebar", true);
};
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

  .modal_header {
    width: 95%;
    min-height: 50px;
    display: flex;
    background: #fff;

    .title-desktop {
      width: 100%;
      display: flex;
    }

    .title-mobile {
      display: none;
    }
  }

  .modal_main {
    background-color: var(--bgSCCasino);
    margin: auto 0;
    max-width: 1440px;

    position: relative;

    @media (max-width: 992px) {
      /* height: 95% !important; */
    }
    @media (max-width: 768px) {
      height: 100% !important;
      padding: 0 !important;
    }

    .modal_header {
      margin-bottom: 10px;

      .icon-close {
        width: 30px;
        height: 30px;

        position: absolute;
        top: 25px;
        right: calc(2.5% + 20px);
      }

      .icon-modal {
        width: 50px;
        height: 50px;
        @media (max-width: 992px) {
          width: 30px;
          height: 30px;
        }
      }

      .image-modal {
        //width: 50px;
        height: 100px;
      }

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
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      margin: 0 !important;
      padding: 0 !important;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .modal-content {
      max-height: 80%;
    }
  }

  @media (max-width: 768px) {
    .modal_main {
      width: 100% !important;
      height: 100%;
      margin: 50px 0;
    }

    .modal_header {
      width: 100%;
      margin: 0 !important;
      padding: 10px 0 !important;
      position: fixed;
      left: 0;
      z-index: 1;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);

      .title-desktop {
        display: none !important;
      }

      .title-mobile {
        display: flex !important;
        width: 100%;

        .title {
          width: 100%;
          color: var(--500, #2196f3);
          text-align: center;
          font-size: 20px;
          font-weight: 700;
        }

        .more {
          position: absolute;
          left: 24px;
          top: 14px;
        }
      }
    }
    .modal_body {
      height: 100% !important;
    }
  }
}

.nav-bottom {
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  z-index: 1111;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}
</style>
