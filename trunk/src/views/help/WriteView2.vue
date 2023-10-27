<template>
  <div class="writeWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
          <img src="" alt="logo"/>
      </div>
    </div>
    <div class="textAreaFormBG">
      <div class="textAreaForm">
        <div class="captionBG">
          <div class="flexCenter caption" style="color: #ffffff">
            {{ t('writeHelp') }}
          </div>
        </div>
        <span style="font-size: 14px; color: #00ccfc; margin-top: 10px; margin-left: 20px;">{{ t('content') }}</span>
        <textarea class="textAreaForm" v-model="data.frm.UserQuestion" :placeholder="t('writeHelp')"/>
        <div class="requestButtonWrap">
          <button class="requestButton" @click="fn.submitWriteForm">{{ t('submit') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { data, fn } from '@/views/help/write.js';
import { useI18n } from "vue-i18n";
const { t } = useI18n();

</script>
<style>
.writeWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 494px;
  height: 610px;
}
.writeWrap2 .logoWrap {
  height: 68px;
  width: 494px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_box.png");
  background-size: cover;
}
.writeWrap2 .logoInnerWrap {
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

.writeWrap2 .textAreaFormBG{
  width: 494px;
  height: 542px;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
}

.writeWrap2 .textAreaForm {
  width: 492px;
  height: 540px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #010509;
  gap: 10px;
}
.writeWrap2 .textAreaForm ht {
  margin-top: 10px;
}
.writeWrap2 .textAreaForm textarea {
  width: 452px;
  height: 360px;
  border: 1px solid #2d2d2d;
  padding: 10px;
  resize: none;
  background-color: #111111;
  color: white;
}

.writeWrap2 .captionBG{
  height: 50px;
  width: 492px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: cover;
}

.writeWrap2 .captionBG .flexCenter{
  height: 48px;
  width: 492px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: unset;
  background-color: #111111;
}

.writeWrap2 .requestButtonWrap {
  width: 100%;
  height: 41px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px !important;
}
.writeWrap2 .requestButton {
  width: 141px !important;
  height: 41px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border: 2px solid transparent;
  background-image: linear-gradient(to bottom, #00a6fc, #006cd5, #133085), linear-gradient(to bottom, #020a13, #020a13);
  border: unset !important;
  color: #decb95;
}

@media (max-width: 1024px) {
  .writeWrap2{
    width: 100%;
    height: 100%;
  }
  .writeWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .writeWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .writeWrap2 .textAreaFormBG {
    width: 100%;
    height: calc(100% - 68px);
  }
  .writeWrap2 .textAreaForm {
    width: calc(100% - 2px);
    height: 92.1%;
    padding: 10px;
  }
  .writeWrap2 .captionBG{
    width: 100%;
  }
}

</style>