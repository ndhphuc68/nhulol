<template>
  <div class="bankWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img src="@/assets/logo/body/metag-logo.png"/>
      </div>
    </div>
    <div class="BankFormWrap">
      <div class="BankInnerFormWrap">
        <span class="bankSelectTitle">{{ t('bankSelect') }}</span>
        <div class="bankButtonGroup">
          <button class="bankButton" v-for="(menu, idx) in bankMenu" @click.stop="selectBank(idx)">
            <div style="height: 50px; display: flex; justify-content: center;">
              <img :src="getIcon(idx)"/>
            </div>
            <span>{{t(menu)}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleShow } from "@/utils/modals";
import { data } from "@/views/signup/signup.js";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const bankMenu = [
  "bank_kb",
  "bank_kakao",
  "bank_nhbank",
  "bank_nh",
  "bank_sh",
  "bank_wr",
  "bank_hn",
  "bank_sc",
  "bank_ibk",
  "bank_bnk",
  "bank_dgb",
  "bank_pb",
  "bank_kjb",
  "bank_mg",
  "bank_kbank",
  "bank_sbi",
  "bank_keb",
  "bank_citi",
  "bank_cnh",
  "bank_cu",
];

const getIcon = (idx) => {
  return require("@/assets/bank/banklogo_" + (idx + 1) + ".png")
}

const emits = defineEmits(['hide']);

const hide = () => {
  emits('hide');
}

const selectBank = (idx) => {
  toggleShow('bankSelect');
  data.frm.bank_name = t(bankMenu[idx]);
}

</script>
<style>
.bankWrap2 .logoWrap {
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
.bankWrap2 .logoInnerWrap {
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
.bankWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.bankWrap2 .BankFormWrap {
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
.bankWrap2 .BankInnerFormWrap {
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
.bankWrap2 .bankSelectTitle{
  background-image: linear-gradient(to top, rgba(199, 199, 199, 1), rgba(255, 255, 255, 1), #97a7b3), linear-gradient(to top, #22dcfd, #1c91e2, #5865b9), linear-gradient(to bottom, #d3ba8f, #d3ba8f);
  font-size: 18px;
  font-weight: bold;
  color: #d3ba8f;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 15px;
}

.bankWrap2 .bankButton{
  width: 109px;
  height: 78px;
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
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.bankWrap2 .bankButtonGroup{
  display: flex;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

@media (max-width: 1024px) {
  .bankWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .bankWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .bankWrap2 .BankFormWrap {
    width: 100%;
    height: 100%;
  }
  .bankWrap2 .BankInnerFormWrap {
    width: calc(100% - 2px);
    height:calc(100% - 2px);
  }
  .bankWrap2 .bankButton{
    width: 31.4%;
  }
  .bankWrap2 .bankButtonGroup{
    padding-left: 5%;
    padding-right: 5%;
  }
}
</style>