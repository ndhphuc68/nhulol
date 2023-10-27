<template>
  <div class="depositWrap2">
    <div class="infoBox">
      <span>{{ t('warning') }}</span>
      <span>{{ t('transactionWarning') }}</span>
    </div>
    <div class="formWrap">
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('totalBalance') }}
        </label>
        <div class="inputWrap">
          <div class="commonInputBG">
            <span class="flexCenter commonInput">{{getTotalMoney()}}</span>
          </div>
        </div>
      </div>
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('depositAmount') }}
        </label>
        <div class="inputWrap">
          <div class="commonInputBG">
            <span class="flexCenter commonInput" v-numberFormat="data.frm.Money"></span>
            <input class="commonInput" type="hidden" v-model="data.frm.Money"/>
          </div>
        </div>
      </div>
      <div class="buttonWrap">
        <button v-for="(amount, idx) in data.buttons"
                @click="fn.clickAmountBtn(amount, store.getters['cms/getConfigData'].DEPOSIT_MAX_MONEY)"
                :key="idx"
                v-numberFormat="amount.value"></button>
        <button class="zero" @click="fn.clickAmountBtn({value: 0}, store.getters['cms/getConfigData'].DEPOSIT_MAX_MONEY)">
          {{ t('amount8') }}
        </button>
      </div>
      <span>{{ t('availableAmount') }} {{ utils.setNumberFormat(store.getters['cms/getConfigData'].DEPOSIT_MIN_MONEY) }} ~ {{ utils.setNumberFormat(store.getters['cms/getConfigData'].DEPOSIT_MAX_MONEY) }} </span>
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('depositName') }}
        </label>
        <div class="depositNameWrap">
          <div class="commonInputBG">
            <input class="commonInput" v-model="data.frm.Name"/>
          </div>
        </div>
      </div>
      <!--  <div class="inputWrap">
            <label>
                <span><img src="@/assets/circle/goldCircle.png" width="9"/></span>
                {{ t('phone') }}
            </label>
            <div class="inputWrap">
                <input class="commonInput" v-model=""/>
            </div>
        </div>-->
      <div class="requestButtonWrap">
        <button class="requestButton" @mouseup="fn.deposit()">{{ t('depositRequest') }}</button>
      </div>
    </div>
    <notifications
            group="transaction"
            position="top center"
            :speed="500"
            :width="300"
    />
  </div>
</template>
<script setup>
import { data, fn } from '@/views/transaction/transaction.js';
import { useI18n } from 'vue-i18n';
import { utils } from "@/utils/common";
import { useStore } from 'vuex';
import {onBeforeUnmount} from "vue";
const { t } = useI18n();

const store = useStore();

onBeforeUnmount(() => {
  fn.initDataFrm();
})

const getTotalMoney = () => {
  let tx = Number(store.getters['user/getUserInfo']?.me_money) + Number(store.getters['user/getUserInfo']?.game_amount);
  const cn1 = utils.setNumberFormat(tx);
  return cn1;
}
</script>
<style>
.depositWrap2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.depositWrap2 .infoBox {
  background-color: #2d2d2d;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  text-align: center;
  margin-bottom: 20px;
  flex-direction: column;
}
.depositWrap2 .infoBox span:first-child {
  margin-bottom: 10px;
}
.depositWrap2 .infoBox span {
  color: #bbb8b6;
  font-size: 14px;
}
.depositWrap2 .formWrap {
  display: flex;
  font-size: 14px;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  gap: 17px;
}
.depositWrap2 .formWrap .inputWrap {
  background-image: none;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 300px;
}
.depositWrap2 .formWrap .inputWrap label, .depositWrap2 .formWrap .inputWrap div {
  width: 181px;
  white-space: nowrap;
}
.depositWrap2 .formWrap .depositNameWrap div {
  margin-left: -15px;
  white-space: nowrap;
}
.depositWrap2 .formWrap .buttonWrap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 6px;
}
.depositWrap2 .formWrap .buttonWrap button {
  width: auto;
  max-width: 100px;
  height: 32px;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.depositWrap2 .formWrap .buttonWrap button {
  background-image: linear-gradient(to bottom, #0678b6, #064f8f, #02346e), linear-gradient(to bottom, #020a13, #020a13);
}
.depositWrap2 .formWrap .buttonWrap button.zero {
  background-image: linear-gradient(to top, #2d2d2d, #2d2d2d, #2d2d2d);
}
.depositWrap2 .commonInputBG{
  width: 181px;
  height: 30px;
  border: unset;
  background-image: linear-gradient(to bottom, #0678b6, #064f8f, #02346e), linear-gradient(to bottom, #020a13, #020a13);
  display: flex;
  justify-content: center;
  align-items: center;
}
.depositWrap2 .commonInput{
  width: 179px;
  height: 28px;
  border: unset;
  background-image: unset;
}
.depositWrap2 .requestButton{
  width: 20% !important;
  color: #ffffff;
  border: unset;
  background-image: url("../../assets/box/blueInputBox2.png");
  background-size: 100% 100%;
}
.depositWrap2  span img {
  margin-right: 6px;
}

@media (max-width: 1024px) {
  .depositWrap2{
    height: 100vh;
    justify-content: start !important;
  }
  .depositWrap2 .formWrap{
    width: 90% !important;
    height: 100%;
  }
  .depositWrap2 .infoBox span{
    width: 90% !important;
  }
  .depositWrap2 .formWrap .inputWrap{
    flex-direction: column;
    gap: 20px !important;
  }
  .depositWrap2 .formWrap .buttonWrap button{
    width: 30% !important;
  }
}
</style>