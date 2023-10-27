<template>
  <div class="myPageWrap2">
    <div class="caption flexCenter">
      {{ t('myPageInfo') }}
    </div>
    <div class="formWrap">
      <div class="flexCenter myinfo" v-for="(frm, idx) in forms" :key="idx">
        <div class="myinfoWrap">
          <div>
            <img :src="frm.icon" style="width: 25px;"/>
            <span style="width: 90px; color: #a2a5aa; font-size: 14px;">{{ t(frm.key) }}</span>
          </div>
          <div v-if="frm.objKey != 'me_last_domain'" class="commonViewBox flexCenter myinfo" style="color: #a2a5aa; font-size: 14px;">
            {{ store.getters['user/getUserInfo'][frm.objKey] }}
          </div>
          <div v-else class="commonViewBox flexCenter myinfo" style="color: #a2a5aa; font-size: 14px;">
            {{ getLastDomain }}
          </div>
        </div>
      </div>
    </div>
    <div class="caption flexCenter">
      {{ t('bankAccountInfo') }}
    </div>
    <div class="formWrap">
      <div class="flexCenter myinfo" v-for="(frm, idx) in bankForms" :key="idx">
        <div class="myinfoWrap bank">
          <div style="width: 121px; color: #a2a5aa; font-size: 14px;">
            {{ t(frm.key) }}
          </div>
          <div v-if="frm.objKey != 'me_total_money'" class="commonViewBox flexCenter myinfo" style="color: #a2a5aa; font-size: 14px;">
            {{ store.getters['user/getUserInfo'][frm.objKey] }}
          </div>
          <div v-else class="commonViewBox flexCenter myinfo" style="color: #a2a5aa; font-size: 14px;">
            {{ getTotalMoney() }}
          </div>
        </div>
      </div>
    </div>
    <div class="warningWrap" style="margin-top: 20px;">
      <div>{{ t('changeWarning') }}</div>
      <div>{{ t('helpCenterPhoneNumber') }}</div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import {computed} from "vue";
import {communityModalMenus} from "@/const/menu";
import {activeModal} from "@/utils/modals";
import {utils} from "@/utils/common";

const { t } = useI18n();
const store = useStore();

const forms = [
  { key: 'id', icon: require('@/assets/icon/icon_user.png'), objKey: 'me_account' },
  { key: 'regDate', icon: require('@/assets/icon/icon_datejoin.png'), objKey: 'me_created' },
  { key: 'nickName', icon: require('@/assets/icon/icon_nickname.png'), objKey: 'me_nickname' },
  { key: 'regIp', icon: require('@/assets/icon/icon_join.png'), objKey: 'me_join_ip' },
  { key: 'phone', icon: require('@/assets/icon/icon_phone.png'), objKey: 'me_phone' },
  { key: 'recentDate', icon: require('@/assets/icon/icon_door.png'), objKey: 'me_last_date' },
  { key: 'regInfo', icon: require('@/assets/icon/icon_reg.png'), objKey: 'me_join_done' },
  { key: 'recentIp', icon: require('@/assets/icon/icon_ip.png'), objKey: 'me_last_domain' },
  { key: 'connectInfo', icon: require('@/assets/icon/icon_connect.png'), objKey: 'me_join_done' },
  { key: 'country', icon: require('@/assets/icon/icon_nation.png'), objKey: 'country' }
]

const bankForms = [
  { key: 'bankName', icon: '', objKey: 'me_bank_name' },
  { key: 'bankAccount', icon: '', objKey: 'me_bank_number' },
  { key: 'bankAccountHolder', icon: '', objKey: 'me_bank_account' },
  { key: 'totalBalance', icon: '', objKey: 'me_total_money' },
]

const getLastDomain = computed(() => {

  let originLastDomain = store.getters['user/getUserInfo']['me_last_domain'];
  if( originLastDomain == null){
    return originLastDomain;
  }
  else {
    let portIndex = originLastDomain.indexOf(':');
    return originLastDomain.substring(0, portIndex != -1 ? portIndex : originLastDomain.length);
  }
});

const getTotalMoney = () => {
  let tx = Number(store.getters['user/getUserInfo']?.me_money) + Number(getGameMoney());
  const cn1 = utils.setNumberFormat(tx);
  return cn1;
}

const getGameMoney = () => {
  let tx = store.getters['user/getUserInfo']?.game_amount;
  return tx;
}

</script>
<style>
.myPageWrap2 {
  padding: 20px;
  width: 100%;
}
.myPageWrap2 .formWrap {
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  row-gap: 10px;
  column-gap: 54px;
  padding: 20px;
}
.myPageWrap2 .formWrap .flexCenter div {
  display: flex;
  gap: 6px;
  color: #d2d2d2;
  font-size: 14px;
  align-items: center;
  justify-content: start;
}
.myPageWrap2 .formWrap .flexCenter div img, .myPageWrap2 .formWrap .flexCenter div span{
  display: flex;
  max-width: 100px;
  gap: 20px;
}
.myPageWrap2 .warningWrap {
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.myPageWrap2 .warningWrap div:first-child {
  color: #0f9ec5;
  font-weight: bold;
  font-size: 14px;
}
.myPageWrap2 .warningWrap div:last-child {
  color: #617188;
  font-size: 14px;
}
.myPageWrap2 .caption{
  color: white;
}
.myPageWrap2 .commonViewBox.flexCenter.myinfo{
  background: unset;
  box-shadow: none;
}
.myPageWrap2 .flexCenter.myinfo{
  width: 18.125rem;
  height: 2.5rem;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.myPageWrap2 .myinfoWrap{
  width: 288px;
  height: 38px;
  background-color: #020c15;
  padding: 10px;
}
@media (max-width: 1024px) {
  .myPageWrap2 .flexCenter.myinfo{
    width: 80vw;
  }
  .myPageWrap2 .myinfoWrap{
    width: calc(100% - 2px);
  }
  .myPageWrap2 .formWrap {
    grid-template-columns: repeat(1, auto);
    justify-items: center;
  }
}
</style>