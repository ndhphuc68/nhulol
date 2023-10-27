<template>
  <div class="depositWrap2">
    <div class="infoBox">
      <span>{{ t('warning') }}</span>
      <span>{{ t('transactionWarning2') }}</span>
    </div>
    <div class="formWrap">
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('withdrawEnableBalane') }}
        </label>
        <div class="inputWrap">
          <div class="commonInputBG">
            <span class="flexCenter commonInput">{{getEnableMoney()}}</span>
          </div>
        </div>
      </div>
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('withdrawAmount') }}
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
                @click.stop="fn.clickAmountBtn(amount, getWithdrawMaxMoney())"
                :key="idx"
                v-numberFormat="amount.value"></button>
        <button class="zero" @click="fn.clickAmountBtn({value: 0}, getWithdrawMaxMoney())">{{ t('amount8') }}</button>
      </div>
      <span>{{ t('availableAmount2') }} {{ utils.setNumberFormat(store.getters['cms/getConfigData'].WITHDRAW_MIN_MONEY) }} ~ {{ utils.setNumberFormat(store.getters['cms/getConfigData'].WITHDRAW_MAX_MONEY) }} </span>
      <div class="inputWrap">
        <label>
          <span><img src="@/assets/circle/blueCircle.png" width="9"/></span>
          {{ t('withdrawName') }}
        </label>
        <div class="withdrawNameWrap">
          <div class="commonInputBG">
            <input class="commonInput" v-model="data.frm.Name"/>
          </div>
        </div>
      </div>
      <!-- <div class="inputWrap">
           <label>
               <span><img src="@/assets/circle/goldCircle.png" width="9"/></span>
               {{ t('bankAccount') }}
           </label>
           <div class="inputWrap">
               <input class="commonInput"/>
           </div>
       </div>-->
      <div class="requestButtonWrap" @mouseup="fn.withdraw()">
      <!--<div class="requestButtonWrap" @mouseup="fn.checkWithdrawPassword()">-->
        <button class="requestButton">{{ t('withdrawRequest') }}</button>
      </div>
    </div>
    <notifications
            group="transaction"
            position="top center"
            :speed="500"
            :width="300"
            :z-index="3"
    />
  </div>
</template>
<script setup>

import { onBeforeUnmount } from 'vue';

import { data, fn } from '@/views/transaction/transaction.js';
import { useI18n } from 'vue-i18n';
import { utils } from "@/utils/common";
import { useStore } from 'vuex';
const { t } = useI18n();

const store = useStore();

onBeforeUnmount(() => {
  fn.initDataFrm();
})

const getEnableMoney = () => {
  //let tx = Number(store.getters['user/getUserInfo']?.me_money) + Number(store.getters['user/getUserInfo']?.game_amount) - Number(store.getters['user/getUserInfo']?.me_service_money);
  let tx = Number(store.getters['user/getUserInfo']?.me_money) + Number(store.getters['user/getUserInfo']?.game_amount);
  const cn1 = utils.setNumberFormat(tx);
  return cn1;
}

const getWithdrawMaxMoney = () => {
  let enableMoney = Number(store.getters['user/getUserInfo']?.me_money) + Number(store.getters['user/getUserInfo']?.game_amount);
  //let enableMoney = Number(store.getters['user/getUserInfo']?.me_money) + Number(store.getters['user/getUserInfo']?.game_amount) - Number(store.getters['user/getUserInfo']?.me_service_money);

  if(Number(store.getters['cms/getConfigData'].WITHDRAW_MAX_MONEY) > Number(enableMoney))
    return Number(enableMoney);
  else
    return Number(store.getters['cms/getConfigData'].WITHDRAW_MAX_MONEY);
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
.depositWrap2 .formWrap .withdrawNameWrap div {
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
.depositWrap2 span img {
  margin-right: 6px;
}
</style>