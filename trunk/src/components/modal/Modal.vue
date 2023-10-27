<template>
  <div class="modalWrap" :class="{ 'mobile': utils.isMobile() }">
    <div class="bgBox" @click.stop="hide()" :class="{ 'loginBg': modals['login'] }"></div>
    <div class="modalBox" :style="props.styles">
      <div v-if="props.title != 'login'">

        <div v-if="themeUtils.isXBtnType1()">
              <div class="modalCloseBtn" @click.stop="hide()">
                <img src="@/assets/icon/x-button.png" alt="닫기이미지"/>
              </div>
        </div>
        <div v-else>
          <div class="outer" @click.stop="hide()">
            <div class="inner">
              <label>X</label>
            </div>
          </div>
        </div>

      </div>

      <div v-if="props.title" class="modalHeader">
        <span class="title">{{ t(props.title) }}</span>
      </div>
      <div class="modalContents" :class="{ 'useScroll': props.title }">
        <div class="modalCategory" v-if="props.title && props.modalType == 'normal'">
          <swiper :slides-per-view="$route.meta.isMobile ? 3 : 6"
                  :scrollbar="{ draggable: true }"
                  navigation
                  :space-between="2">
            <swiper-slide v-for="(cate, idx) in modalMenus">
              <button class="category"
                      @click.stop="tabClick(cate.key)"
                      :key="idx"
                      :class="{'on': cate.key == props.title }">
                <img :src="cate.icon" :alt="cate.key"/>
                <span>
									{{ t(cate.key) }}
								</span>
              </button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="modalCategory" v-if="props.title && props.modalType == 'community'">
          <swiper :slides-per-view="$route.meta.isMobile ? 3 : communityModalMenus.length"
                  :scrollbar="{ draggable: true }"
                  navigation
                  :space-between="2">
            <swiper-slide v-for="(cate, idx) in communityModalMenus">
              <button class="category"
                      @click.stop="tabClick(cate.key)"
                      :key="idx"
                      :class="{'on': cate.key == props.title }">
                <img :src="cate.icon" :alt="cate.key"/>
                <span>
									{{ t(cate.key) }}
								</span>
              </button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="modalInner">
          <slot></slot>
        </div>
      </div>
      <div v-if="!$route.meta.isMobile && props.title">
        <div class="frameBottomLeft"><img src="@/assets/frame/1.png"/></div>
        <div class="frameBottomLogo"><img src="@/assets/logo/modalBottomLogo.png"/></div>
        <div class="frameBottomRight"><img src="@/assets/frame/2.png"/></div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { modals, activeModal, toggleShow } from '@/utils/modals';
import { menus, modalMenus, communityModalMenus } from "@/const/menu";
import { useI18n } from "vue-i18n";
import { utils } from "@/utils/common";
import { ref, watch } from "vue";
import { themes, themeUtils } from "@/const/themeData";

const { t } = useI18n();
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
  emits('hide');
}

const tabClick = (key) => {
  hide();
  toggleShow(key);
}


</script>
<style scoped>

.modalWrap .frameBottomLeft, .modalWrap .frameBottomRight, .modalWrap .frameBottomLogo {
  position: absolute;
  z-index: 10;
  bottom: 0px;
}
.modalWrap .frameBottomRight {
  right: 0;
}
.frameBottomLogo {
  width: 100%;
  text-align: center;
  margin-bottom: 31px;
}

.modalWrap {
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

.bgBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.modalBox {
  position: relative;
  width: auto;
  height: auto;
  color: #decb95 !important;
  border: 2px solid transparent;
  border-image: linear-gradient(to top, #5c5448, #958c7a, #988f7b, #776e5f, #4f483e);
  border-image-slice: 1;
  background-image: url("../../assets/background/modalBodyBg.png");
  background-size: 100% 100%;
  overflow: hidden;
  z-index: 3;
  border-radius: 8px;
}

.modalBox .modalHeader {
  height: 40px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/background/modal-header-bg.png.png");
  background-size: cover;
}
.modalBox .modalHeader .title {
  font-size: 14px;
  position: relative;
  top: 3px;
  line-height: 0;
  color: #decb95 !important;
}

.modalCloseBtn {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 10px;
  right: 15px;
}

.modalCloseBtn img{
  cursor: pointer;
}

.modalContents {
  width: 100%;
  height: inherit;
  margin: 0 auto;
}

.modalContents .modalCategory {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(to top, #030406, #131a29, #030406);
}
.modalContents .modalCategory .category {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-image: url("../../assets/box/modal-tab-on.png");
  background-size: 100% 100%;
  width: 116px;
  height: 83px;
  gap: 3px;
  transform: scale(0.98);
}
.modalContents .modalCategory .category.on {
  background-image: url("../../assets/box/modal-tab-off.png");
  background-size: 100% 100%;
}

.modalContents .modalCategory .category.on span {
  color: #ffdd40 !important;
}

.modalContents.useScroll {
  height: calc(100% - 40px);
}

.modalInner {
  width: auto;
  height: 100%;
  overflow-y: auto;
}

/*@media (max-width: 1024px) {*/
@media (max-width: 640px) {
  .modalBox {
    width: 100vw !important;
    height: 100vh !important;
  }
}


.outer {
  /*width: 13px;
  height: 13px;*/
  position: absolute;
  top: 10px;
  right: 15px;

  /*position: relative;*/
  margin: auto;
  width: 24px;
  /*margin-top: 200px;*/
  cursor: pointer;
}

.inner {
  width: inherit;
  text-align: center;
}
label {
  font-size: .8em;
  line-height: 2em;
  text-transform: uppercase;
  color: #ffffff;
  transition: all .3s ease-in;
  opacity: 0;
  cursor: pointer;
}

.inner:before, .inner:after {
  position: absolute;
  content: '';
  height: 1px;
  width: inherit;
  background: #ff0023;
  left: 0;
  transition: all .3s ease-in;
}

.inner:before {
  top: 50%;
  transform: rotate(45deg);
}

.inner:after {
  bottom: 50%;
  transform: rotate(-45deg);
}

.outer:hover label {
  opacity: 1;
}

.outer:hover .inner:before,
.outer:hover .inner:after {
  transform: rotate(0);
}

.outer:hover .inner:before {
  top: 0;
}

.outer:hover .inner:after {
  bottom: 0;
}

</style>