<template>
  <div class="modalWrap2" :class="{ 'mobile': utils.isMobile() }">
    <div class="bgBox" @click.stop="hide()" :class="{ 'loginBg': modals['login'] }"></div>
    <div class="modalBox" :style="props.styles">
      <div class="modalCloseBtn" @click.stop="hide()">
        <img src="@/assets/icon/x-button.png" alt="닫기이미지"/>
      </div>
      <div class="modalHeader" :class="[props.modalType]">
        <div class="modalInerHeader" :class="[props.modalType]">
            <img src="" alt="logo"/>
        </div>
      </div>
      <div class="modalContentsBG">
        <div class="modalContents" :class="[{ 'useScroll': props.title }, props.modalType]">
          <div class="modalInner">
            <div class="title">
              <span class="historyTitle">{{ t('betting_history') }}</span>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { modals, activeModal, toggleShow } from '@/utils/modals';
import { modalMenus, communityModalMenus } from "@/const/menu";
import { useI18n } from "vue-i18n";
import { utils } from "@/utils/common";
import { ref, watch } from "vue";
import {data as listData} from "@/views/list/list";
import {data, fn as transactionFn } from '@/views/transaction/transaction.js';
import {useStore} from "vuex";
const { t } = useI18n();
const store = useStore();
const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: undefined
  },
  modalType: {
    type: String,
    default: undefined
  }
});

const emits = defineEmits(['hide']);

const hide = () => {
  toggleShow('history');
}
</script>
<style scoped>

.modalWrap2 .frameBottomLeft, .modalWrap2 .frameBottomRight, .modalWrap2 .frameBottomLogo {
  position: absolute;
  z-index: 10;
  bottom: 0px;
}
.modalWrap2 .frameBottomRight {
  right: 0;
}
.modalWrap2 .frameBottomLogo {
  width: 100%;
  text-align: center;
  margin-bottom: 31px;
}

.modalWrap2 {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}

.modalWrap2 .bgBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.modalWrap2 .modalBox {
  position: relative;
  width: auto;
  height: auto;
  color: #decb95 !important;
  background-color: black;
  background-size: 100% 100%;
  overflow: hidden;
  z-index: 3;
}

.modalWrap2 .modalBox .modalHeader {
  height: 68px;
  width: 1022px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_box.png");
  background-size: cover;
}

.modalWrap2 .modalBox .modalHeader.community {
  height: 68px;
  width: 494px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_box.png");
  background-size: cover;
}
.modalWrap2 .modalBox .modalInerHeader {
  height: 66px;
  width: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_innerbox_big.png");
  background-size: cover;
}
.modalWrap2 .modalBox .modalInerHeader.community {
  height: 66px;
  width: 492px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_innerbox.png");
  background-size: cover;
}
.modalWrap2 .modalBox .modalHeader .title {
  font-size: 14px;
  position: relative;
  top: 3px;
  line-height: 0;
  color: #decb95 !important;
}

.modalWrap2 .modalCloseBtn {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 10px;
  right: 15px;
}

.modalWrap2 .modalCloseBtn img{
  cursor: pointer;
}

.modalWrap2 .modalContentsBG
{
  position: relative;
  width: 100%;
  height: 660px;
  margin: 0 auto;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalWrap2 .modalContents {
  width: 1020px;
  height: 658px;
  margin: 0 auto;
  background-color: black;
  background-size: 100% 100%;
}

.modalWrap2 .modalContents.community {
  width: 492px;
  height: 560px;
  margin: 0 auto;
  background-color: black;
  background-size: 100% 100%;
}

.modalWrap2 .modalContents .modalCategory {
  display: flex;
  width: 100%;
  height: 3.125rem;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/modal/modal_header_frame.png");
}
.modalWrap2 .modalContents .modalInnerCategory {
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: start;
  align-items: center;
  background-image: url("../../assets/modal/modal_header_innerframe.png");
}
.modalWrap2 .modalContents .modalCategory .category.normal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-image: url("../../assets/box/modal-tab-on.png");
  background-size: 100% 100%;
  width: 7.813rem;
  height: 2.813rem;
  gap: 0.188rem;
  transform: scale(0.98);
}
.modalWrap2 .modalContents .modalCategory .category.community {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-image: url("../../assets/box/modal-tab-on.png");
  background-size: 100% 100%;
  width: 162px;
  height: 45px;
  gap: 3px;
  transform: scale(0.98);
}
.modalWrap2 .modalContents .modalCategory .category.on {
  background-image: url("../../assets/box/modal-tab-off.png");
  background-size: 100% 100%;
}

.modalWrap2 .modalContents .modalCategory .category.on span {
  color: #00ccfc !important;
}

.modalWrap2 .modalInner {
  width: auto;
  height: 100%;
  overflow-y: auto;
}

.modalWrap2 button {
  background: unset !important;
}

.modalWrap2 .title{
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalWrap2 .historyTitle{
  background-image: linear-gradient(to bottom, rgba(199, 199, 199, 1), rgba(255, 255, 255, 1), #97a7b3), linear-gradient(to bottom, #d3ba8f, #d3ba8f);
  font-size: 30px;
  font-weight: bold;
  color: #d3ba8f;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 1024px) {
  .modalWrap2 .modalBox {
    width: 100% !important;
    height: 100vh !important;
  }

  .modalWrap2 .modalBox .modalHeader, .modalWrap2 .modalBox .modalHeader.community {
    height: 68px;
    width: 100%;
  }
  .modalWrap2 .modalBox .modalInerHeader, .modalWrap2 .modalBox .modalInerHeader.community {
    height: 66px;
    width: calc(100% - 2px);
  }

  .modalWrap2 .modalContents, .modalWrap2 .modalContents, .modalWrap2 .modalContents.community {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 0 auto;
    background-color: black;
    background-size: 100% 100%;
  }

  .modalWrap2 .modalContents .modalCategory.normal{
    height: 6.25rem;
  }

  .modalWrap2 .modalContents .modalInnerCategory.normal{
    flex-wrap: wrap;
    height: 6.125rem;
  }

  .modalWrap2 .modalContents .modalInnerCategory div{
    width: 25%;
  }
  .modalWrap2 .modalContents .modalInnerCategory.community div{
    width: 33%;
  }

  .modalWrap2 .modalContents .modalCategory .category.normal{
    width: 100%;
  }
}


</style>