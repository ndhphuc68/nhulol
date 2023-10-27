<template>
  <div class="partnershipWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img src=""/>
      </div>
    </div>
    <div class="partnershipFormWrap">
      <div class="partnershipInnerFormWrap">
        <span class="partnershipSelectTitle">{{ t('partner') }}</span>
        <div class="partnershipButtonGroup">
          <div class="partnershipButton" v-for="(menu, idx) in messengerMenu" :key="getMessenger(menu)">
            <div style="height: 50px; display: flex; justify-content: center;">
              <img style="margin-left: 10px;" :src="getIcon(idx)"/>
            </div>
            <div style="display: flex; width: calc(100% - 60px); flex-direction: column; align-items: center;">
              <span style="color: #158cd6">{{t(menu)}}</span>
              <span>{{getMessenger(menu)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleShow } from "@/utils/modals";
import { data } from "@/views/signup/signup.js";
import store from '@/store';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const messengerMenu = [
  "skype",
  "line",
  "wechat",
  "telegram",
  "kakaotalk",
];

const getIcon = (idx) => {
  return require("@/assets/messenger/messenger_" + (idx + 1) + ".png")
}

const emits = defineEmits(['hide']);

const hide = () => {
  emits('hide');
}

const getMessenger = (key) => {
  if(key == 'skype')
  {
    return store.getters['cms/getConfigData'].SKYPE_ID;
  }
  else if(key == 'line')
  {
    return store.getters['cms/getConfigData'].LINE_ID;
  }
  else if(key == 'wechat')
  {
    return store.getters['cms/getConfigData'].WECHAT_ID;
  }
  else if(key == 'telegram')
  {
    return store.getters['cms/getConfigData'].TELEGRAM_ID;
  }
  else if(key == 'kakaotalk')
  {
    return store.getters['cms/getConfigData'].KAKAO_TALK_ID;
  }
}

</script>
<style>
.partnershipWrap2 .logoWrap {
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
.partnershipWrap2 .logoInnerWrap {
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
.partnershipWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.partnershipWrap2 .partnershipFormWrap {
  position: relative;
  width: 100%;
  height: calc(100% - 68px);
  margin: 0 auto;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.partnershipWrap2 .partnershipInnerFormWrap {
  width: 492px;
  height: 500px;
  margin: 0 auto;
  background-color: black;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
}
.partnershipWrap2 .partnershipSelectTitle{
  background-image: linear-gradient(to bottom, rgba(199, 199, 199, 1), rgba(255, 255, 255, 1), #97a7b3), linear-gradient(to bottom, #22dcfd, #1c91e2, #5865b9), linear-gradient(to bottom, #d3ba8f, #d3ba8f);
  font-size: 18px;
  font-weight: bold;
  color: #d3ba8f;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 15px;
}

.partnershipWrap2 .partnershipButton{
  width: 215px;
  height: 98px;
  object-fit: contain;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to top, #2684b5, #1c91e2, #5865b9);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #101326, #101326), linear-gradient(to top, #2684b5, #1c91e2, #5865b9);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.partnershipWrap2 .partnershipButtonGroup{
  display: flex;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

@media (max-width: 1024px) {
  .partnershipWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .partnershipWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .partnershipWrap2 .partnershipFormWrap {
    width: 100%;
    height: 100%;
  }
  .partnershipWrap2 .partnershipInnerFormWrap {
    width: calc(100% - 2px);
    height:calc(100% - 2px);
  }
  .partnershipWrap2 .partnershipButton{
    width: 48%;
  }
  .partnershipWrap2 .partnershipButtonGroup{
    padding-left: 2%;
    padding-right: 2%;
    gap: 10px;
  }
}
</style>