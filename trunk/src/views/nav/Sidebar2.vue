<template>
  <div class="sidebarForm2">
    <header class="pcHeader headerForm">
      <div class="formWrap" v-if="store.getters['user/getSessionId']">
        <span class="welcome" style="font-size: 18px; margin-top: 29px;">{{ t('welcome') }}</span>
        <div class="inputWrap" style="margin-top: 20px;">
          <span style="font-size: 14px;">{{ store.getters['user/getUserInfo'].me_nickname }} {{ t('sir') }}</span>
        </div>
        <div class="inputWrap totalBalance" style="margin-top: 1px;">
          <div class="totalBalanceBox">
            <span class="welcome" style="font-size: 14px; height: 22px; line-height: 22px;">{{ t('totalBalance') }} </span>
            <span style="font-size: 14px; height: 22px; line-height: 22px;"> {{ getTotalMoney() }}</span>
          </div>
        </div>
        <div class="inputWrap signup">
          <button style="font-size: 14px;" @click.stop="toggleShow('history')">{{ t('betting_history') }}</button>
        </div>
        <!--<div class="inputWrap totalBalance" style="margin-top: 1px;">
          <div class="totalBalanceBox">
            <span class="welcome" style="font-size: 14px; height: 22px; line-height: 22px;">{{ t('serviceBalance') }} </span>
            <span style="font-size: 14px; height: 22px; line-height: 22px;"> {{ getServiceMoney() }}</span>
          </div>
        </div>-->
        <div class="inputWrap signin">
          <button style="font-size: 14px;" @click.stop="fn.logout(true)">{{ t('logout') }}</button>
        </div>
      </div>
      <div class="formWrap" v-else>
        <span class="welcome" style="font-size: 18px; margin-top: 29px;">{{ t('memberLogin') }}</span>
        <div class="inputWrap" style="margin-top: 20px;">
          <div class="loginInputInnerWrap2">
            <img src="@/assets/loginpopup/id_icon.png"/>
            <img src="@/assets/loginpopup/line.png"/>
            <input v-model="data.frm.account" :placeholder="t('userId')" @keyup.enter="fn.login()"/>
          </div>
        </div>
        <div class="inputWrap">
          <div class="loginInputInnerWrap2">
            <img src="@/assets/loginpopup/pw_icon.png"/>
            <img src="@/assets/loginpopup/line.png"/>
            <input type="password" v-model="data.frm.password" :placeholder="t('password')" @keyup.enter="fn.login()"/>
          </div>
        </div>
        <div class="inputWrap signin" style="margin-top: 10px;">
          <button @click.stop="fn.login()">{{ t('login') }}</button>
        </div>
        <div class="inputWrap signup">
          <button @click.stop="toggleShow('signup')">{{ t('signup') }}</button>
        </div>
      </div>
      <div class="inputWrap locale" style="margin-top: 10px;">
        <div class="localeButtonBG">
          <button class="hoverEvent" @click.stop="isLocaleShow = !isLocaleShow">
            <img :src="locale[selectLocaleIdx].icon">
            <span style="width: unset; line-height:34px;" :class="{ 'selected': $i18n.locale == locale[selectLocaleIdx].key }">{{ t(locale[selectLocaleIdx].key) }}</span>
          </button>
        </div>
        <div v-if="isLocaleShow" class="localeDropDown">
          <div class="localeButtonBG" v-for = "(menu, idx) in locale">
            <button class="hoverEvent" @click.stop="clickLocaleButton(idx)">
              <img :src="locale[idx].icon">
              <span style="width: unset; line-height:34px;" :class="{ 'selected': $i18n.locale == locale[idx].key }">{{ t(locale[idx].key) }}</span>
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <div class="tabInfoWrapBG" style="margin-top: 30px; margin-bottom: 0px;">
        <div class="tabInfoWrap" style="margin: 0px; top: 30px;">
          <div class="topicInfo">
            <span>{{t('topic')}}</span>
          </div>
          <div class="botLineWrap" v-for="(cons, cIdx) in topic" :key="cIdx">
            <div class="row hoverEvent" @click.stop="toggleShow('topic')">
              <span>
                {{ cons.no_subject }}
              </span>
            </div>
            <div class="line" v-if="cIdx > -1"></div>
          </div>
        </div>
      </div>
      <div class="tabInfoWrapBG">
        <div class="tabInfoWrap">
          <Tab class="tabInfo LH" :tabs="listTab" @clickTab="clickTab"/>
          <div class="botLineWrap" v-for="(row, i) in transData.realTimeList[listTab[selectTabIdx].tx]" :key="i" :class="{'show': toggleRowShow }">
            <div class="line" v-if="i > 0"></div>
            <div class="row">
              <span>
                {{ row?.wi_member_nickname || row?.de_member_nickname }} [{{ moment(row?.wi_created || row?.de_created).format('YYYY-MM-DD')}}]
              </span>
              <span>
              {{ row?.wi_money || row?.de_money }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <header class="mobileHeader">
      <img class="mobileHeaderIcon" src=""/>
      <div class="inputWrap locale" style="margin-top: 10px;">
        <div class="localeButtonBG">
          <button class="hoverEvent" @click.stop="isLocaleShow = !isLocaleShow">
            <img :src="locale[selectLocaleIdx].icon">
            <span style="width: unset; line-height:34px;" :class="{ 'selected': $i18n.locale == locale[selectLocaleIdx].key }">{{ t(locale[selectLocaleIdx].key) }}</span>
          </button>
        </div>
        <div v-if="isLocaleShow" class="localeDropDown">
          <div class="localeButtonBG" v-for = "(menu, idx) in locale">
            <button class="hoverEvent" @click.stop="clickLocaleButton(idx)">
              <img :src="locale[idx].icon">
              <span style="width: unset; line-height:34px;" :class="{ 'selected': $i18n.locale == locale[idx].key }">{{ t(locale[idx].key) }}</span>
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <button class="mobileHeaderButton" @click.stop="clickViewSidebar()">
        <img style="height: 100%;" src="@/assets/icon/h_btn.png"/>
      </button>
      <div class="mobileHeaderLogin" v-if="isMobileSidebarView">
        <div class="formWrap" v-if="store.getters['user/getSessionId']">
          <span class="welcome" @click.stop="clickViewSidebar()" style="font-size: 18px; margin-top: 29px;">{{ t('welcome') }}</span>
          <div class="inputWrap" style="margin-top: 20px;">
            <span style="font-size: 14px;">{{ store.getters['user/getUserInfo'].me_nickname }} {{ t('sir') }}</span>
          </div>
          <div class="inputWrap totalBalance" style="margin-top: 1px;">
            <div class="totalBalanceBox">
              <span class="welcome" style="font-size: 14px; height: 22px; line-height: 22px;">{{ t('totalBalance') }} </span>
              <span style="font-size: 14px; height: 22px; line-height: 22px;"> {{ getTotalMoney() }}</span>
            </div>
          </div>
          <div class="inputWrap signup">
            <button style="font-size: 14px;" @click.stop="toggleShow('history')">{{ t('betting_history') }}</button>
          </div>
          <div class="inputWrap signup">
            <button style="font-size: 14px;" @click.stop="fn.logout(true)">{{ t('logout') }}</button>
          </div>
        </div>
        <div class="formWrap" v-else>
          <span class="welcome" style="font-size: 18px; margin-top: 29px;">{{ t('memberLogin') }}</span>
          <div class="inputWrap" style="margin-top: 20px;">
            <div class="loginInputInnerWrap2">
              <img src="@/assets/loginpopup/id_icon.png"/>
              <img src="@/assets/loginpopup/line.png"/>
              <input v-model="data.frm.account" :placeholder="t('userId')" @keyup.enter="fn.login()"/>
            </div>
          </div>
          <div class="inputWrap">
            <div class="loginInputInnerWrap2">
              <img src="@/assets/loginpopup/pw_icon.png"/>
              <img src="@/assets/loginpopup/line.png"/>
              <input type="password" v-model="data.frm.password" :placeholder="t('password')" @keyup.enter="fn.login()"/>
            </div>
          </div>
          <div class="inputWrap signin" style="margin-top: 10px;">
            <button @click.stop="fn.login()">{{ t('login') }}</button>
          </div>
          <div class="inputWrap signup">
            <button @click.stop="toggleShow('signup')">{{ t('signup') }}</button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'CustomName',
  inheritAttrs: false,
  customOptions: {},
}
</script>

<script setup>

import { data, fn } from '@/views/login/login';
import { toggleShow } from "@/utils/modals";
import Tab from '@/components/tab/Tab';

import {onBeforeUnmount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { getCookie } from '@/utils/cookie';
import moment from "moment/moment";
import {utils} from "@/utils/common";
import {fn as listFn} from "@/views/list/list";
import {data as transData, fn as transactionFn} from "@/views/transaction/transaction";
const { t } = useI18n();
const store = useStore();
const i18n = ref(useI18n());

const isLocaleShow = ref(false);
const selectLocaleIdx = ref(0);
const toggleRowShow = ref(false);
const listTab = [{ tx: 'dailyDeposit'},{ tx: 'dailyWithdraw'}];
const selectTabIdx = ref(0);
const isMobileSidebarView = ref(false);
const topic = ref(false);

const locale = [
  {
    'key': 'ko',
    'icon': require('@/assets/flag/flag_ko.png')
  },
  {
    'key': 'en',
    'icon': require('@/assets/flag/flag_en.png')
  },
  {
    'key': 'th',
    'icon': require('@/assets/flag/flag_th.png')
  },
/*  {
    'key': 'vi',
    'icon': require('@/assets/flag/flag_vi.png')
  },*/
  /*{
  'key': 'ja',
  'icon': require('@/assets/flag/flag_ja.png')
  },*/
  /* {
     'key': 'cn',
     'icon': require('@/assets/flag/flag_cn.png')
   },*/
  /* {
    'key': 'hi',
    'icon': require('@/assets/flag/flag_hi.png')
  },*/
  /* {
    'key': 'sp',
    'icon': require('@/assets/flag/flag_sp.png')
  },*/
]

onMounted(async () => {
  await listFn.getList('topicList', true);
  topic.value = listFn.filterList('topicList');
  await fn.logout();
  if(store.getters['user/getSessionId'] != undefined)
  {
    setInterval(async () => {
      await store.dispatch('request/call', { flag: 'balance', params: {} });
    }, 5000);
  }
  else
  {
    let loginInfo = getCookie('CID');
    if(loginInfo){
      try {
        await fn.login(loginInfo);
        setInterval(async () => {
          await store.dispatch('request/call', { flag: 'balance', params: {} });
        }, 5000);
      } catch(e) {
        console.error(e);
      }
    }
  }
});

onUnmounted(async () => {
  await fn.logout();
})

const getTotalMoney = () => {
  let tx = Number(store.getters['user/getUserInfo']?.me_money) + Number(getGameMoney());
  const cn1 = utils.setNumberFormat(tx);
  return cn1;
}

const getServiceMoney = () => {
  let tx = Number(store.getters['user/getUserInfo']?.me_service_money);
  const cn1 = utils.setNumberFormat(tx);
  return cn1;
}

const getGameMoney = () => {
  let tx = store.getters['user/getUserInfo']?.game_amount;
  return tx;
}

const getLastLoginDate = () => {
  let tx = store.getters['user/getUserInfo']?.me_last_date;
  return tx;
}

const clickLocaleButton = (idx) => {
  i18n.value.locale = locale[idx].key;
  selectLocaleIdx.value = idx;
  isLocaleShow.value = false;
}

const clickTab = (tab) => {
  selectTabIdx.value = listTab.findIndex(v => v.tx == tab.tx);
}

const clickViewSidebar = () => {
  isMobileSidebarView.value = !isMobileSidebarView.value;
}

</script>
<style scoped>
.sidebarForm2 span.welcome {
  background-image: linear-gradient(to top, #22dcfd, #1c91e2, #5865b9), linear-gradient(to bottom, #158cfa, #158cfa);
  color: #158cfa;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebarForm2 .topicInfo{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-image: url("../../assets/box/blueInputBox.png");
}

.sidebarForm2 .topicInfo span{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebarForm2 .mobileHeader {
  display: none;
  flex-direction: unset;
}
.sidebarForm2 header {
  position: relative;
  top: 0;
  width: 15.625rem;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;
}
.sidebarForm2 header .formWrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  color: white;
}
.sidebarForm2 .inputWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  width: 220px;
  height: 40px;
}

.sidebarForm2 .inputWrap.locale{
  width: 220px;
  height: unset;
  background-image: unset;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.sidebarForm2 .localeDropDown{
  margin-top: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 2px;
}

.sidebarForm2 .localeButtonBG button{
  background-color: #020c15;
  width: 218px;
  font-size: 12px;
  height: 38px;
}

.sidebarForm2 .inputWrap input{
  background: unset;
  width: 170px;
  font-size: 12px;
  height: 38px;
}

.sidebarForm2 .inputWrap span{
  background-color: #020c15;
  width: 218px;
  font-size: 12px;
  height: 38px;
  text-align: center;
  line-height: 38px;
}

.sidebarForm2 .inputWrap.signup button{
  width: 218px;
  font-size: 14px;
  height: 38px;
}
.sidebarForm2 .inputWrap.signin button {
  color: #eaf1fb;
  background-color: #020c15;
  font-weight: bold;
  font-size: 14px;
  position: relative;
  width: 218px;
  height: 38px;
}
.sidebarForm2 .inputWrap.signup, .sidebarForm2 .inputWrap.signin{
  background-image: url("../../assets/box/blueInputBox2.png");
  width: 220px;
  height: 40px;
}
.sidebarForm2 .inputWrap.totalBalance{
  background-image: url("../../assets/box/blueInputBox2.png");
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
}
.sidebarForm2 .inputWrap.totalBalance .totalBalanceBox{
  background-color: #020c15;
  width: 218px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sidebarForm2 .localeButtonBG {
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  width: 220px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebarForm2 .inputWrap.signup button, .sidebarForm2 .localeButtonBG button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 218px;
  height: 38px;
}
.sidebarForm2 .localeButtonBG button span {
  position: relative;
  top: 1px;
}
.sidebarForm2 .inputWrap button {
  color: #eaf1fb;
  font-size: 14px;
}
.sidebarForm2 .localeButtonBG button span {
  background-color: unset;
  color: #eaf1fb;
  font-size: 14px;
}

.sidebarForm2 .loginInputInnerWrap2{
  width: 218px;
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

.sidebarForm2 .tabInfoWrapBG{
  width: 220px;
  height: 296px;
  margin: 30px auto;
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebarForm2 .tabInfoWrap {
  width: 218px;
  height: 294px;
  margin: 30px auto;
  background-color: black;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.sidebarForm2 .botLineWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  /*    opacity: 0;
      transform: rotateX(-90deg);
      transition: all 0.5s cubic-bezier(.36,-0.64,.34,1.76);*/
}
.sidebarForm2 .botLineWrap.show {
  /*    opacity: 1;
      transform: none;
      transition: all 0.5s cubic-bezier(.36,-0.64,.34,1.76);*/
}
.sidebarForm2 .botLineWrap span:last-child {
  color: #efdda2 !important;
}
.sidebarForm2 .botLineWrap .row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
}
.sidebarForm2 .botLineWrap .line {
  height: 2px;
  width: 90%;
  margin: 0 auto;
  background-color: #34507a;
}

.sidebarForm2 .mobileHeaderIcon{
  flex: 0 1 auto;
  height: 90%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.sidebarForm2 .mobileHeaderButton{
  flex: 0 1 auto;
  height: 50%;
  margin-left: 10rem;
  margin-right: 1.25rem;
}

.sidebarForm2 .mobileHeaderLogin{
  position: absolute;
  top: 100%;
  right: 0;
  width: 70rem;
  height: 80rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;
}
.sidebarForm2 .mobileHeader .formWrap{
  margin-top: 40%;
  transform: scale(4);
  margin-left: auto !important;
}

@media all and (max-width:1023px) {
  .sidebarForm2 .mobileHeader {
    position: relative;
    display: flex;
    justify-content: start;
    width: 100%;
    height: 200px;
  }
  .sidebarForm2 .inputWrap.locale{
    flex: 0 1 auto;
    height: 30%;
    margin-left: auto;
    margin-right: 1.25rem;
    transform: scale(2);
  }
  .sidebarForm2 .localeButtonBG{
    height: 60px;
  }
  .sidebarForm2 .localeButtonBG button{
    height: 58px;
  }
  .sidebarForm2 .localeButtonBG button img{
    height: 38px;
  }
  .sidebarForm2 .localeButtonBG button span{
    font-size: 28px;
  }
  .sidebarForm2 .pcHeader {
    display: none;
  }
  .sidebarForm2 .formWrap {
    margin-left: 30px !important;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}
.sidebarForm2 ul {
  position: relative;
  padding-top: 18px;
  width: 420px;
}

.sidebarForm2 li {
  display: block;
  margin-top: 8px;
  padding: 8px 12px;
  width: 100%;
  background-color: #e5e5e5;
}

.sidebarForm2 .list-enter-active,
.sidebarForm2 .list-leave-active,
.sidebarForm2 .list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.sidebarForm2 .list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.sidebarForm2 .list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.sidebarForm2 .list-leave-active {
  position: absolute;
}

.sidebarForm2 .list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

</style>



