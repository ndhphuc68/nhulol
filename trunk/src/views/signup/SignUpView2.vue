<template>
  <div class="signupWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img alt="" src=""/>
      </div>
    </div>
    <div class="loginFormWrap">
      <div class="loginInnerFormWrap">
        <span class="signupTitle">{{ t('signup') }}</span>
        <div>
          <div>{{ t('userId') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="account" v-model="data.frm.account"/>
            </div>
          </div>
          <div class="warn" :class="{'fail' : data.frm.account.length < 4 || data.frm.account.length > 20}">{{ t('userIdWarn') }}</div>
        </div>
        <div>
          <div>{{ t('nickname') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="nickname" v-model="data.frm.nickname"/>
            </div>
          </div>
          <div class="warn" :class="{'fail' : data.frm.nickname.length < 4 || data.frm.nickname.length > 20}">
            {{ t('nickNameWarn') }}
          </div>
        </div>
        <div>
          <div>{{ t('password') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="password" type="password" v-model="data.frm.password"/>
            </div>
          </div>
          <div class="warn" :class="{'fail' : data.frm.password.length < 6 || data.frm.password.length > 16}">{{ t('passwordWarn1') }}</div>
        </div>
        <div>
          <div>{{ t('reEnterPassword') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="Confirm Password" type="password" v-model="reEnterPw"/>
            </div>
          </div>
          <div v-if="reEnterPw !== data.frm.password && reEnterPw !== undefined" style="color: #ff0000" class="warn">{{ t('passwordWarn2') }}</div>
          <div v-else></div>
        </div>
        <div>
          <div>{{ t('phone') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="Phone" v-model="data.frm.phone" :placeholder="t('phoneWarn')" type="number"/>
            </div>
          </div>
          <!--<div><button class="redButton">{{ t('authPhone') }}</button></div>-->
          <div></div>
        </div>
        <div>
          <div>{{ t('bankAccountHolder') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="Bank account" v-model="data.frm.bank_account"/>
            </div>
          </div>
          <div class="warn" :class="{'fail' : data.frm.bank_account.length < 2 || data.frm.bank_account.length > 5}">{{ t('bankAccountNameWarn') }}</div>
        </div>
        <div>
          <div>{{ t('bankName') }}</div>
          <div class="loginInputWrap2">
            <button class="loginInputInnerWrap2" @click.stop="
              toggleShow('bankSelect')">
              <span v-if="data.frm.bank_name.length === 0" style="justify-content: start; color: rgba(175, 192, 211, 0.5); padding-left: 22px;">{{t('bankWarn')}}</span>
              <span v-else style="justify-content: start; color: rgba(175, 192, 211, 0.5); padding-left: 22px;">{{data.frm.bank_name}}</span>
            </button>
          </div>
          <div></div>
        </div>
        <div>
          <div>{{ t('bankAccount') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="bank number" v-model="data.frm.bank_number" :placeholder="t('phoneWarn')" type="number"/>
            </div>
          </div>
          <div></div>
        </div>
        <!--
        <div>
          <div>{{ t('withdrawPassword') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input v-model="data.frm.withdraw_pass" :placeholder="t('withdrawPassword')" type="password"/>
            </div>
          </div>
          <div class="warn" :class="{'fail' : data.frm.withdraw_pass.length < 6 || data.frm.withdraw_pass.length > 16}">{{ t('passwordWarn1') }}</div>
        </div>
        -->
        <div>
          <div>{{ t('partnerCode') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2">
              <input aria-label="Voter account" v-model="data.frm.voter_account" :placeholder="t('partnerCode')" type="text"/>
            </div>
          </div>
          <div></div>
        </div>
        <!--<div>
          <div>{{ t('domain_info') }}</div>
          <div class="loginInputWrap2">
            <div class="loginInputInnerWrap2" style="justify-content: center !important;">
              <div style="justify-content: center; color: rgba(175, 192, 211, 0.5);">{{getDomainInfo()}}</div>
            </div>
          </div>
          <div></div>
        </div>-->

        <div class="buttonWrap">
          <button @click="signup()" :class="{'fail' : checkSignUp() === false}">{{ t('signup') }}</button>
        </div>

        <div v-if="!checkSignUp()" style="font-size: 14px; color: red; margin-top: 15px;">{{t('signupWarn')}}</div>
        <div style="font-size: 14px; color: #0f9ec5;">{{t('signupTitle1')}}</div>
        <!--<div style="font-size: 14px; color: #617188;">{{t('signupTitle2')}}</div>-->
      </div>
    </div>
  </div>
</template>
<script setup>
import { data, fn } from "@/views/signup/signup.js";
import {ref, onBeforeUnmount} from "vue";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const reEnterPw = ref(undefined);

onBeforeUnmount(() => {
  fn.initData();
})

const signup = () => {
  if(checkSignUp() === false)
    return;

  fn.signup();
}

// const getDomainInfo = () => {
//   let domain = window.location.href.replace('http://', '');
//   return domain.replace('/lobby', '');
// }

const checkSignUp = () => {


  if(data.frm.account.length < 4 || data.frm.account.length > 20)
    return false;
  if(data.frm.nickname.length < 4 || data.frm.nickname.length > 20)
    return false;
  if(reEnterPw.value !== data.frm.password)
    return false
  if(data.frm.password.length < 6 || data.frm.password.length > 16)
    return false;
  if(data.frm.bank_account.length < 2 || data.frm.bank_account.length > 5)
    return false;
  if(data.frm.bank_name.length < 1 || data.frm.phone.length < 1 || data.frm.bank_number.length < 1)
    return false;

/*  if(data.frm.withdraw_pass.length < 6 || data.frm.withdraw_pass.length > 16)
    return false;*/

  return true;
}

</script>
<style>
.signupWrap2 {
  width: 100%;
  height: 100%;
}
.signupWrap2 .logoWrap{
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_box.png");
  background-size: 100% 100%;
}
.signupWrap2 .logoInnerWrap {
  width: 800px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_signup_innerbox.png");
  background-size: 100% 100%;
}
.signupWrap2 .loginFormWrap {
  width: 100%;
  height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 9px;
  background-image: url("../../assets/loginpopup/login_box.png");
  background-size: 100% 100%;
}
.signupWrap2 .loginInnerFormWrap {
  display: flex;
  width: 800px;
  height: 718px;
  background-image: url("../../assets/loginpopup/login_innerbox.png");
  background-size: 100% 100%;
  gap: 10px;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
/*.signupWrap2 .loginInputWrap {*/
/*  width: 264px;*/
/*  height: 34px;*/
/*}*/
.signupWrap2 .loginInputWrap2 {
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  width: 278px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signupWrap2 .loginInputInnerWrap2{
  background-color: black;
  width: 276px;
  height: 38px;
}
.signupWrap2 .loginInnerFormWrap div {
  display: flex;
  gap: 23px;
  align-items: center;
}
.signupWrap2 .loginInnerFormWrap div div {
  flex: unset;
  white-space: nowrap;
  min-width: 200px;
  display: flex;
  color: #e8e8e8;
  font-size: 14px;
}
.signupWrap2 .loginInnerFormWrap div div:first-child {
  justify-content: flex-end;
}
.signupWrap2 .loginInnerFormWrap div div.warn {
  color: rgba(175, 192, 211, 0.5);
  font-size: 14px;
}
/*.signupWrap2 .loginInnerFormWrap div div.warn.fail {*/
/*  color: red;*/
/*}*/
.signupWrap2 .loginInputWrap input, .signupWrap2 .loginInputWrap select {
  display: flex;
  align-items: center;
  background-color: #101821;
  border: 1px solid #7c838c;
  width: inherit;
  height: inherit;
}
/*.signupWrap2 .loginTx {*/
/*  color: #ffd668;*/
/*}*/
.signupWrap2 .buttonWrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.signupWrap2 .buttonWrap button {
  width: 735px;
  height: 41px;
  color: #ffffff;
  background-image: url("../../assets/loginpopup/signupButton_on.png");
}
/*.signupWrap2 .buttonWrap button.fail {*/
/*  width: 735px;*/
/*  height: 41px;*/
/*  color: #ffffff;*/
/*  background-image: url("../../assets/loginpopup/signupButton_off.png");*/
/*}*/
.signupWrap2 .signupTitle{
  background-image: linear-gradient(to bottom, rgba(199, 199, 199, 1), rgba(255, 255, 255, 1), #97a7b3), linear-gradient(to bottom, #22dcfd, #1c91e2, #5865b9), linear-gradient(to bottom, #d3ba8f, #d3ba8f);
  font-size: 24px;
  font-weight: bold;
  color: #d3ba8f;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 15px;
  margin-bottom: 15px;
}
/*.signupWrap2 .redButton{*/
/*  background-image: unset !important;*/
/*  box-shadow: unset !important;*/
/*  background-color: #cc001b;*/
/*}*/

@media (max-width: 1024px) {
  .signupWrap2{
    height: 100%;
  }
  .signupWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .signupWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .signupWrap2 .loginFormWrap {
    width: 100%;
    height: calc(100% - 68px);
    overflow-y: auto;
  }

  .signupWrap2 .loginInnerFormWrap {
    width: calc(100% - 2px);
    height:calc(100% - 2px);
    gap: 50px;
    overflow-y: auto;
  }

  .signupWrap2 .loginInnerFormWrap div {
    width: 90%;
    flex-direction: column;
    gap: 10px;
  }

  .signupWrap2 .loginInnerFormWrap div div {
    min-width: unset;
    width: calc(100% - 2px);
  }

  .signupWrap2 .loginInnerFormWrap div div input{
    width: 80%;
    padding-left: 0;
  }

  .signupWrap2 .signupTitle{
    margin-bottom: 0;
  }

  .signupWrap2 .loginInputInnerWrap2{
    width: calc(100% - 2px);
    justify-content: center !important;
  }

  /*.signupWrap2 .buttonWrap button, .signupWrap2 .buttonWrap button.fail {*/
  /*  width: 100%;*/
  /*}*/
}
</style>