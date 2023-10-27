<template>
  <div class="loginWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <!--<img src="@/assets/loginpopup/bluehole-logo.png"/>-->
        <img :src="themeUtils.getLogoImage()" style="height: 80%; cursor: pointer;" @click="themeUtils.refresh()"/>
      </div>
    </div>
    <div class="loginFormWrap">
      <div class="loginInnerFormWrap">
        <div class="loginWarning" style="font-size: 18px; margin-top: 30px;">
          {{ t('pleaseLogin') }}
        </div>
        <div class="loginInputWrap2" style="margin-top: 22px;">
          <div class="loginInputInnerWrap2">
            <img src="@/assets/loginpopup/id_icon.png"/>
            <img src="@/assets/loginpopup/line.png"/>
            <input v-model="data.frm.account" :placeholder="t('userId')" @keyup.enter="login()"/>
          </div>
        </div>
        <div class="loginInputWrap2" style="margin-top: 12px;">
          <div class="loginInputInnerWrap2">
            <img src="@/assets/loginpopup/pw_icon.png"/>
            <img src="@/assets/loginpopup/line.png"/>
            <input type="password" v-model="data.frm.password" :placeholder="t('password')" @keyup.enter="login()"/>
          </div>
        </div>
        <div class="buttonWrap2" style="margin-top: 20px;">
          <button @click="login()">{{ t('login') }}</button>
        </div>
        <div class="signupText" style="margin-top: 18px;" @click="toggleShow('signup')">{{ t('signup') }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleShow } from "@/utils/modals";
import { data, fn } from "@/views/login/login.js";
import { useI18n } from 'vue-i18n';
import {notify} from "@kyvg/vue3-notification";
import { themes, themeUtils } from "@/const/themeData";
const { t } = useI18n();

const login = async () => {
  const res = await fn.login();
  if(!res?.is_success){
    //errMsg.value = t('invalidIdPass');

    return;
  }
  toggleShow('login');
}

const notificationBase =  async () => {

  notify({
    title: 'notice',
    text: 'login_sucess',
    type: 'success', // success warn error default
  });

}

</script>
<style>
.loginWrap2 .logoWrap {
  width: 400px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_box.png");
  background-size: 100% 100%;
}
.loginWrap2 .logoInnerWrap {
  width: 398px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_innerbox.png");
  background-size: 100% 100%;
}
.loginWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.loginWrap2 .loginFormWrap {
  display: flex;
  width: 400px;
  height: 290px;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/loginpopup/login_box.png");
  background-size: 100% 100%;
}
.loginWrap2 .loginInnerFormWrap {
  display: flex;
  width: 398px;
  height: 288px;
  background-image: url("../../assets/loginpopup/login_innerbox.png");
  background-size: 100% 100%;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
.loginWrap2 .loginInputWrap2 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  width: 290px;
  height: 40px;
}
.loginWrap2 .loginInputInnerWrap2{
  width: 288px;
  height: 38px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex: unset !important;
  flex-direction: row;
  align-items: center;
  justify-content: start !important;
  gap: 10px !important;
  background-color: black;
}
.loginWrap2 .buttonWrap2 button{
  background-image: url("../../assets/box/blueInputBox2.png");
  width: 290px;
  height: 40px;
  font-size: 14px;
  color: #eaf1fb;
}
.loginWrap2 .signupText{
  font-size: 14px;
  color: #a2a5aa;
  cursor: pointer;
}
.loginWrap2 .signupText:hover{
  color: #ffffff;
}
.loginWrap2 .loginTx {
  color: #ffd668;
}
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

@media (max-width: 1024px) {
  .loginWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .loginWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .loginWrap2 .loginFormWrap {
    width: 100%;
    height: calc(100% - 68px);
  }
  .loginWrap2 .loginInnerFormWrap {
    width: calc(100% - 2px);
    height:calc(100% - 2px);
  }

  .loginWrap2 .loginInputWrap2{
    width: 90%;
  }

  .loginWrap2 .loginInnerFormWrap div div{
    min-width: unset;
    width: calc(100% - 2px);
  }
}
</style>