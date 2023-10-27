<template>
  <div class="lobbyWrap2">
    <notifications
            group="full-width"
            width="100%"
    />
    <notifications
            group="foo-velocity"
            position="bottom right"
            animation-type="velocity"
            :speed="500"
    />
    <notifications
            group="transaction"
            position="top center"
            :speed="500"
            :width="300"
    />
    <div class="topWrap">
      <div class="topLeftWrap">
        <div  class="topMostWrap">
          <div class="topMostLeftWrap">
            <div class="movetext">
              {{noitceOnelineText}}
            </div>
            <!--
            <div v-for="(menu, idx) in topMostLeftMenus" :key="idx" @mouseover="overMouse = idx, isLeftTopMenu = true" @mouseleave="overMouse = undefined, isLeftTopMenu = false" @click="toggleShow(menu.key)" style="width: 20px; height: 20px;   cursor: pointer;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div>
                  <img :src="menu.src"/>
                </div>
                <div v-if="(overMouse == idx) && (isLeftTopMenu == true)" class="topMostLeftMenuName">
                  <span style="color: #158cd6; opacity: 1;">{{t(menu.key)}}</span>
                </div>
              </div>
            </div>
            -->
          </div>
          <div class="topMostRightWrap">
            <button v-for="(menu, idx) in topMostRightMenus" :key="idx" @mouseover="overMouse = idx" @mouseleave="overMouse = undefined" @click="toggleShow(menu.key)">
              <div>
                <span>{{ t(menu.title) }}</span>
              </div>
            </button>
            <button class="gameButton" style="height: 20px;" v-if="LoginData.isPartner.value" @click="LoginFn.doPartnerConvert()">파트너페이지</button>
            <button class="gameButton" style="height: 20px;" v-if="LoginData.isPartner.value" @click="LoginFn.doSettlement()">정산신청</button>
          </div>
        </div>
        <!--@slideChange="onSlideChange"-->
        <div class="middleButtonsWrap">
          <img class="middleButtonLogo" style="width: 130px;" src="" />
          <!--<button v-for="(menu, idx) in frameMenus" :key="idx" @mouseover="overMouse = idx" @mouseleave="overMouse = undefined" @click="toggleShow(menu.key)">-->
          <button v-for="(menu, idx) in frameMenus" :key="idx" @mouseover="overMouse = idx" @mouseleave="overMouse = undefined" @click="clickMenu(menu.key)">
            <div>
              <span class="middleButtonTitle">{{ t(menu.mainTitle) }} <img v-if="getNewMessage(idx) == true" src="@/assets/icon/new_icon.png"/> </span>
              <span class="middleButtonSubTitle">{{ menu.title }}</span>
            </div>
          </button>
        </div>
        <div class="movetext_mobile">
          {{noitceOnelineText}}
        </div>
        <div class="swiperWrap">
          <swiper
              ref="swiperRef"
              :modules="swipeOpt.modules" :observer="true" :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }" @swiper="onSwiper">
            <swiper-slide>
              <img src="../../assets/banner/main_banner2.png" style="width: 100%; position: relative"/>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/banner/main_banner2_02.png" style="width: 100%; position: relative"/>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/banner/main_banner2_03.png" style="width: 100%; position: relative"/>
            </swiper-slide>
            <span class="swiper-pagination"> </span>
          </swiper>
          <button class="bannerLeftArrow" @click.stop="prevBanner()">
            <img src="../../assets/banner/banner_arrow_left.png"/>
          </button>
          <button class="bannerRightArrow" @click.stop="nextBanner()">
            <img src="../../assets/banner/banner_arrow_right.png"/>
          </button>
        </div>
        <button class="gameButton" style="margin-top: 10px; position: relative;" @click="toggleShow('liveCasino')">
          <img class="banner" style="width: 100%;" src="../../assets/banner/main_banner.png" />
          <div class="bannerText">
            <span class="bannerTextTitle">{{ t('liveCasino') }}</span>
            <span class="bannerTextDesc">{{ t('liveCasinoDesc') }}</span>
          </div>
        </button>
        <button class="gameButton" style="margin-top: 10px; position: relative;" @click="toggleShow('slotGame')">
          <img class="banner" style="width: 100%;" src="../../assets/banner/jackpot-banner.png" />
          <div class="bannerText">
            <span class="bannerTextTitle">{{ t('slotGame') }}</span>
            <span class="bannerTextDesc">{{ agentName }}&nbsp;{{ t('slotDesc') }}</span>
          </div>
          <span class="jackpotText2">
            <number
                ref="number1"
                :from="100000000"
                :to="500000000"
                :format="theFormat"
                :duration="6000"
                easing="Power0.easeOut"
                @complete="completed"/>
          </span>
        </button>
        <div class="gridWrap" style="margin-top: 10px; position: relative;">
          <!--      <button v-for="(game, idx) in data.list" class="gameButton">
                    <span class="gameTitle">{{ game.ga_name }}</span>
                    <img class="banner" :src="getGameImage(7)" />
                </button>-->
          <button v-for="i in 2" class="gameButton" @click="clickGame(i)">
            <img class="banner" style="width: 100%;" :src="getGameImage(i)" />
            <div v-if="i == 1" class="bannerText">
              <span class="bannerTextTitle">{{ t('pokerGame') }}</span>
            </div>
            <div v-if="i == 2" class="bannerText">
              <span class="bannerTextTitle">{{ t('miniGame') }}</span>
            </div>
          </button>
        </div>
        <!--<div class="infoBoxWrap">
            <div class="infoBox" v-for="i in 2" :key="i">
                <div class="infoTitle">
                    {{ t('dailyDepositWithdraw') }}
                </div>
                <div class="boxs">
                    <div class="box">
                        <h5>DEPOSIT</h5>
                    </div>
                    <div class="box">
                        <h5>WITHDRAW</h5>
                    </div>
                </div>
                <button class="allView">
                    {{ t('allView') }}
                </button>
            </div>
            <div class="bannerBox">
                <button class="banner" v-for="(banner, idx) in banners" :key="idx">
                    <img :src="banner.src" />
                </button>
            </div>
        </div>-->
        <button class="gameButton" @click="toggleShow('event')">
          <img class="banner" style="width: 100%;" src="../../assets/background/eventFrame.png" />
        </button>
        <div class="infoBoxWrap" style="margin-top: 10px;">
          <div class="boxWrap hoverEvent" v-for="(info, idx) in infoTitles" :key="idx">
            <div class="box" @click.stop="toggleShow(info.key)">
              <div class="boxTitle">
                <div class="fooColor">{{ t(info.mainTitle) }}</div>
                <div v-if="idx == 0" class="fooColor2">{{ t('allView') }}</div>
              </div>
              <div v-if="idx == 0">
                <div class="cons" v-for="(cons, cIdx) in infoCons[info.key]" :key="cIdx" :class="{'odd' : cIdx % 2 == 1, 'even' : cIdx % 2 == 0}">
                  <span style="color: #979797;">{{ moment(cons.update).format('YYYY-MM-DD') }}</span>
                  <span style="color: #979797;">{{ cons.no_subject }}</span>
                </div>
              </div>
              <div v-if="idx != 0" style="overflow-y: hidden;">
                <div class="row mainList">
                  <div class="cons" v-for="(row, i) in data.realTimeList[infoTitles[idx].key]" :key="i" :class="['around', {'odd' : i % 2 == 1, 'even' : i % 2 == 0}]">
                    <span style="color: #979797;">
                      {{ moment(row?.wi_created || row?.de_created).format('YYYY-MM-DD')}}
                    </span>
                    <span style="color: #158bd5;">
                      {{ row?.wi_money || row?.de_money }}
                    </span>
                    <span style="color: #979797; margin-left: auto">
                      {{ row?.wi_member_nickname || row?.de_member_nickname }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar
          :style="{'display': 'block'}"
          ref="sidebarWrap"
          />
    </div>
    <div class="snsBanners">
      <div class="banner" v-for="(banner, idx) in snsBanners" :key="idx">
        <button class="box" @click.stop="toggleShow(banner.key)">
          <div style="min-width: 50px;">
            <img :src="banner.src" />
          </div>
          <div class="infos">
            <span v-for="(con, idx) in banner['cons']" :key="idx" :class="banner.key" style="text-align: start;">
              {{ t(con) }}
            </span>
            <span :class="banner.key"> {{ t(banner.mainTitle) }} <span v-if="banner?.key2">&nbsp{{ banner.key2 }}</span> </span>
          </div>
        </button>
        <img v-if="idx != snsBanners.length - 1" style="position: relative; height: 3.75rem; " src="../../assets/line/snsLine.png"/>
      </div>
    </div>
    <div class="bigBannerWrap2">
      <button v-for="i in 42" class="gameButton">
        <img class="footer" :src="getFooterIcon(i)" />
      </button>
    </div>
    <div class="copyrightWrap">
      Copyright 2022 <p style="color: #158cd6; font-weight: bold;">&nbsp; {{ agentName }}&nbsp;</p> Casino All rights reserved.
    </div>
  </div>
</template>

<script setup>
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/vue";
import Sidebar from '@/views/nav/Sidebar2';

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { ref, onMounted, reactive } from "vue";
import { toggleShow } from "@/utils/modals";
import { data, fn as transactionFn } from '@/views/transaction/transaction.js';
import { data as listData, fn as listFn } from '@/views/list/list.js';

import moment from 'moment';
import { useI18n } from "vue-i18n";
import store from "@/store";
const { t } = useI18n();
//import VueNumber from 'vue-number-animation'
import { utils } from "@/utils/common";
import {fn as gameFn} from "@/views/game/game";
import { data as LoginData, fn as LoginFn } from "@/views/login/login";

const agentName = process.env.VUE_APP_PAGE_TYPE;
const overMouse = ref(undefined);
const isLeftTopMenu = ref(false);
const bannerSwiper = ref(false);
const swiperRef = ref(undefined);
const couponIdx = ref(undefined);
const swipeOpt = reactive({
  modules: [Navigation, Pagination, Scrollbar, A11y],
  autoDelay: {}
})
const noitceOneline = ref(undefined);
const noitceOnelineText = ref(undefined);

onMounted(async () => {
  await listFn.getList('topicList', true);
  infoCons.topic = listFn.filterList('topicList');
  infoCons.faq = listFn.filterList('faqList');
  infoCons.event = listFn.filterList('eventList');
  noitceOneline.value = listFn.filterList('onelineList');
  if(noitceOneline.value.length >= 1 )
    noitceOnelineText.value = noitceOneline.value[0].no_content;

  await transactionFn.getDepositListRealTime();
  await transactionFn.getWithdrawListRealTime();
  await transactionFn.setDepositList();
  await transactionFn.setWithdrawList();

  if(store.getters['user/getSessionId'] != undefined)
  {
    await store.dispatch('request/call', { flag: 'balance', params: {} });
  }

  setInterval(async () => {
    await transactionFn.getDepositListRealTime();
    await transactionFn.getWithdrawListRealTime();
    if(store.getters['user/getSessionId'] != undefined)
    {
      await store.dispatch('request/call', { flag: 'balance', params: {} });
    }
    /*await listFn.getList('topicList', true);
    noitceOneline.value = listFn.filterList('onelineList');
    if(noitceOneline.value.length >= 1 )
      noitceOnelineText.value = noitceOneline.value[0].no_content;*/
  }, 30000);
  await store.dispatch('request/call', { flag: 'adminConfig', params: {} });

  await gameFn.gameList();
  await gameFn.slotGameCompanyList();
  await gameFn.allSlotGameList();
});

const completed =() =>{
  //console.log('ani completed');
  //console.log("Animation ends!");
  //this.$refs.number1.scaleClass = true;
  playAnimation();
}

const theFormat = (number) => {
  let temp = number.toFixed(0);
  const cn1 = utils.setNumberFormat(temp);
  return cn1;
}

const playAnimation = () => {
  //console.log("Animation starts!");
  //this.$refs.number1.scaleClass = false;
  //this.$refs.number1.play();
}

let i = 0;
const onSwiper = (swiper) => {
  setInterval(() => {
    if(i == banners.length){
      i = 0;
    } else {
      i++;
    }
    swiper.slideTo(i, 1000);
  }, 3000);
  bannerSwiper.value = swiper;
};
/*    const onSlideChange = () => {
        console.log("slide change");
    };*/
const toggles = ref(new Array(8).fill(false));

const getGameImage = (i) => {
  return require(`@/assets/gamelist/bluehole-game-${i}.png`);
};
const clickGame = (i) => {
  if(i == 1)
    toggleShow('miniGame');
  else if(i == 2)
    toggleShow('miniGame')
}
const infoTitles = [
  { key: "topic", title: "NOTICE", mainTitle: "topic" },
  { key: "dailyDeposit", title: "DEPOSIT HISTORY", mainTitle: "dailyDeposit" },
  { key: "dailyWithdraw", title: "WITHDRAWAL HISTORY", mainTitle: "dailyWithdraw" },
];
const infoCons = reactive({
  topic: [],
  faq: [],
  event: [],
});

const frameMenus = [
  { key: "userInfo", title: "MY PAGE", mainTitle: "myPage" },
  { key: "depositRequest", title: "DEPOSIT", mainTitle: "depositRequest" },
  { key: "withdrawRequest", title: "WITHDRAWAL", mainTitle: "withdrawRequest" },
  //{ key: "depositHistory", title: "DEPOSIT HISTORY" },
  //{ key: "withdrawHistory", title: "WITHDRAWAL HISTORY" },
  { key: "topic", title: "NOTICE", mainTitle: "topic" },
  { key: "event", title: "EVENT", mainTitle: "event" },
  { key: "coupon", title: "COUPON", mainTitle: "coupon" },
  { key: "letter", title: "MESSAGE", mainTitle: "letter" },
  { key: "helpCenter", title: "CUSTOMER", mainTitle: "helpCenter" },
  { key: "gameGuide", title: "RULES", mainTitle: "gameGuide"},
];

const topMostRightMenus = [
  { key: "faq", title: "faqKor"},
  { key: "partnership", title: "partner2"},
];

const topMostLeftMenus = [
  { key: "facebook", title: "facebook", src: require("@/assets/icon/top_facebook.png")},
  { key: "twitter", title: "twitter", src: require("@/assets/icon/top_twitter.png")},
  //{ key: "google", title: "google", src: require("@/assets/icon/top_google.png")},
  { key: "letter", title: "letter", src: require("@/assets/icon/top_custumer.png")},
  { key: "coupon", title: "coupon", src: require("@/assets/icon/top_coupon.png")},
];

const banners = [{ src: require("@/assets/banner/1_4.png") }, { src: require("@/assets/banner/2_3.png") }, { src: require("@/assets/banner/3_2.png") }];

const snsBanners = [
  { src: require("@/assets/icon/icon_partnership.png"), cons: ["partnerInfo"], key: "partnership", mainTitle: "partner"},
  { src: require("@/assets/icon/faq-icon.png"), cons: ["helpDeskInfo"], key: "faq", mainTitle: "faqKor"},
  { src: require("@/assets/icon/bluehole_telegram1.png"), cons: ["telegram2"], key: "telegram", mainTitle: "telegram", key2: store.getters['cms/getConfigData'].TELEGRAM_ID },
  { src: require("@/assets/icon/bluehole_telegram2.png"), cons: ["telegram1"], key: "kakaotalk", mainTitle: "kakaotalk", key2: store.getters['cms/getConfigData'].KAKAO_TALK_ID },
];

const getFooterIcon = (idx) => {
  let iconIdx = String(idx).padStart(2, '0');
  return require("@/assets/footer/footer-" + iconIdx + ".png")
}

const useCoupon = async (couponIdx) => {
  let res = await store.dispatch('request/call', { flag: 'couponUse', params: {}, fnConfig: { flag: 'coupon', data: couponIdx } });
}


const clickMenu = async (key) => {
  if(store.getters['user/getSessionId'] != undefined) {
    switch(key){
      case 'coupon':
        listData.newMessage.coupon = false;        break;
      case 'letter':
        listData.newMessage.letter = false;        break;
      case 'helpCenter':
        listData.newMessage.help = false;        break;
    }
  }

  toggleShow(key);
}

const getNewMessage = (idx) => {
  let isResult = false;
  if(store.getters['user/getSessionId'] != undefined) {
    if (data.newMessage.deposit) {
      if (idx == 1) {
        isResult = true;
      }
    }
    if (data.newMessage.withdraw) {
      if (idx == 2) {
        isResult = true;
      }
    }
    if (listData.newMessage.letter) {
      if (idx == 6) {
        isResult = true;
      }
    }
    if (listData.newMessage.help) {
      if (idx == 7) {
        isResult = true;
      }
    }
    if (listData.newMessage.coupon) {
      if (idx == 5) {
        isResult = true;
      }
    }
  }
  return isResult;
}

const prevBanner = () => {
  bannerSwiper.value.slidePrev();
}

const nextBanner = () => {
  bannerSwiper.value.slideNext();
}

</script>
<style>
.lobbyWrap2 {
  display: flex;
  width: 78.75rem;
  flex-direction: column;
}
.lobbyWrap2 .topMostWrap{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-image: url("../../assets/background/topFrame.png");
  background-size: 100% 100%;
  height: 40px;
}
.lobbyWrap2 .topMostLeftWrap{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  padding-left: 10px;
}
.lobbyWrap2 .topMostLeftMenuName{
  width: 70px;
  height: 30px;
  background-color: #020C15;
  text-align: center;
  z-index: 20;
}
.lobbyWrap2 .topMostRightWrap{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  padding-right: 30px;
}
.lobbyWrap2 .topMostWrap span{
  font-size: 14px;
  color: #83888f;
}
.lobbyWrap2 .topWrap{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
.lobbyWrap2 .topLeftWrap{
  width: 63.125rem;
  display: flex;
  flex-direction: column;
}
.lobbyWrap2 .swiperWrap {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  object-fit: cover;
}

.lobbyWrap2 .bodyTitleWarp {
  display: flex;
  justify-content: left;
  align-items: center;
  color: white;
  gap: 20px;
  margin: 30px;
}
.lobbyWrap2 .middleButtonsWrap {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background-image: url("../../assets/background/centerFrame2.png");
  background-size: 100% 100%;
  height: 84px;
}
.lobbyWrap2 .middleButtonsWrap button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 85px;
  height: 84px;
  background-image: unset;
}
.lobbyWrap2 .middleButtonsWrap button:hover {
  background-image: linear-gradient(to bottom, #0678b6, #064f8f, #02346e);
  background-size: 100% 100%;
  animation: none;
  opacity: 1;
}
.lobbyWrap2 .middleButtonsWrap button:hover span:first-child{
  color: #00deff;
}
.lobbyWrap2 .middleButtonsWrap button img,
.lobbyWrap2 .middleButtonsWrap button div {
  flex: 1;
}
.lobbyWrap2 .middleButtonsWrap button div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.lobbyWrap2 .middleButtonTitle{
  margin-bottom: 5px;
  font-size: 0.875rem;
}
.lobbyWrap2 .middleButtonSubTitle{
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

@keyframes circle {
  0% {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg);
    -moz-transform: rotateX(360deg);
    -ms-transform: rotateX(360deg);
    -o-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}
.lobbyWrap2 .rotate {
  -webkit-animation: circle 0.5s infinite linear;
  -moz-animation: circle 0.5s infinite linear;
  -ms-animation: circle 0.5s infinite linear;
  -o-animation: circle 0.5s infinite linear;
  animation: circle 0.5s infinite linear;
}
@keyframes table-hover {
  0% {
    filter: blur(5px);
  }
  100% {
    filter: blur(0px);
  }
}
.lobbyWrap2 .gridWrap {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.lobbyWrap2 .gridWrap .gameButton {
  position: relative;
  width: 49.5%;
}
.lobbyWrap2 .gridWrap .gameButton .gameTitle {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 1;
}
.lobbyWrap2 .bigBannerWrap2 .gameButton{
  width: 11.25rem;
  height:4.125rem;
}
.lobbyWrap2 .gameButton:hover {
  animation: table-hover 0.4s 1;
}
.lobbyWrap2 .gridWrap .gameButton:hover img {
}

.lobbyWrap2 .gridWrap .gameButton:hover:before {
  opacity: 0.2;
  transition: 0.4s;
}
.lobbyWrap2 .goldLine {
  background-image: url("../../assets/line/goldLine.png");
  background-size: 100% 100%;
  width: 95%;
  height: 5px;
  margin: 30px auto;
}
.lobbyWrap2 .infoBox,
.lobbyWrap2 .bannerBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.lobbyWrap2 .bannerBox {
  gap: 18px;
}
.lobbyWrap2 .boxs {
  display: flex;
  justify-content: center;
  gap: 4px;
  width: 560px;
  min-height: 266px;
  background-image: radial-gradient(#624c29, #bf9f60, #f7d27f, #987b45, #624c29, #624c29);
}
.lobbyWrap2 .boxs .box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  padding-top: 16px;
  height: 232px;
  background-color: black;
  color: white;
  margin: 2px;
}
.lobbyWrap2 .boxs .box h5 {
  color: #efdda2;
}
.lobbyWrap2 .infoBox .infoTitle {
  color: #d68407;
  font-size: 18px;
  font-weight: bold;
}
.lobbyWrap2 .infoBoxWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}
.lobbyWrap2 .allView {
  background-image: url("../../assets/box/allView.png");
  background-size: 100% 100%;
  width: 160px;
  height: 22px;
  color: #d68407;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  bottom: 0px;
  margin-bottom: 6px;
}

.lobbyWrap2 .swiperWrap{
  position: relative;
}

.lobbyWrap2 .bannerLeftArrow{
  position: absolute;
  z-index: 10;
  left: 17px;
}

.lobbyWrap2 .bannerRightArrow{
  position: absolute;
  z-index: 10;
  right: 17px;
}

.lobbyWrap2 .bigBannerWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 26px auto;
  background-image: linear-gradient(to top, #987845, #bf9f60, #fff098, #b89a5b, #e9c575, #d7b56b, #af8f54);
}
.lobbyWrap2 .bigBannerWrap img {
  margin: 2px;
}
.lobbyWrap2 .infoBoxWrap .boxWrap {
  width: 100%;
  height: 16.625rem;
}
.lobbyWrap2 .infoBoxWrap .boxWrap .box {
  width: 100%;
  height: 16.625rem;
  transform: scale(1);
  background-color: #0c1721;
  border: solid 2px #293642;
  overflow: hidden;
}
.lobbyWrap2 .infoBoxWrap .boxWrap .box .boxTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.063rem;
  padding-left: 0.938rem;
  padding-right: 0.625rem;
}
.lobbyWrap2 .fooColor {
  color: #158cd6;
  font-weight: bold;
  font-size: 1.125rem;
}
.lobbyWrap2 .fooColor2 {
  color: #c2c2c2;
  font-size: 0.875rem;
}
.lobbyWrap2 .cons {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 2.5rem;
  gap: 3.125rem;
  padding-left: 1.25rem;
  padding-right: 0.625rem;
}

.lobbyWrap2 .cons.even{
  background-color: #020c15;
}
.lobbyWrap2 .cons.odd{
  background-color: unset;
}
.lobbyWrap2 .snsBanners {
  width: 78.75rem;
  height: 6.25rem;
  background-image: url("../../assets/background/snsFrame.png");
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.938rem auto;
  border: solid 1px #293642;
}
.lobbyWrap2 .snsBanners .banner {
  width: 25%;
  height: 4.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.lobbyWrap2 .snsBanners .banner .box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding-left: 1rem;
  gap: 1.25rem;
  width: 100%;
  height: 4.75rem;
}
.lobbyWrap2 .snsBanners .banner .box .infos {
  white-space: pre-line;
  color: white;
  display: flex;
  flex-direction: column;
}
.lobbyWrap2 .snsBanners .banner .box .infos span {
}
.lobbyWrap2 .snsBanners .banner .box .infos span:first-child {
  font-size: 0.813rem;
  color: #979797;
}
.lobbyWrap2 .snsBanners .banner .box .infos span:last-child {
  font-size: 1.375rem;
  color: #f1f1f1;
  display: flex;
  flex-direction: row;
}

.lobbyWrap2 .copyrightWrap{
  width: 78.75rem;
  height: 6.25rem;
  background-image: url("../../assets/background/copyrightFrame.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.813rem;
  color: #979797;
}

.lobbyWrap2 .bigBannerWrap2 {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-size: cover;
  width: 78.75rem;
  margin-left: auto;
  margin-right: auto;
}
.lobbyWrap2 .bigBannerWrap2 .bannerInfo {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.lobbyWrap2 .bigBannerWrap2 .bannerInfo p {
  white-space: pre-line;
  color: white;
  font-size: 14px;
}

.lobbyWrap2 .swiperText1{
  position: absolute;
  left: 125px;
  top: 55px;
  width: 328px;
  height: 57px;
}
.lobbyWrap2 .swiperText2{
  position: absolute;
  left: 60px;
  top: 110px;
  width: 431px;
  height: 57px;
}

.lobbyWrap2 .bannerText{
  display: flex;
  position: absolute;
  justify-content: start;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  height: 1.875rem;
  left: 4%;
  bottom: 8%;
}

.lobbyWrap2 .bannerTextTitle{
  object-fit: contain;
  background-image: linear-gradient(to top, #5bffff, #53d0ff, #7c8ff2), linear-gradient(to bottom, #fff, #fff);
  font-size: 1.25rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 100%;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobbyWrap2 .bannerTextDesc{
  object-fit: contain;
  background-image: linear-gradient(to top, rgba(240, 217, 131, 1), rgba(255, 255, 137, 1), rgba(255, 255, 194, 1), rgba(252, 234, 136, 1), #fff19b), linear-gradient(to bottom, #7f7095, #7f7095);
  font-size: 1rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 100%;
  letter-spacing: -0.8px;
  text-align: left;
  color: #7f7095;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobbyWrap2 .jackpotText2{
  position: absolute;
  right: 5%;
  bottom: 35%;
  font-family: 'H2hdrM',sans-serif;
  background-image: linear-gradient(to top, #c9ced4, #fff, #c9ced4), linear-gradient(to bottom, #175384, #175384);
  font-size: 5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 100%;
  letter-spacing: normal;
  text-align: center;
  color: #175384;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobbyWrap2 .jackpotText2 span{
  font-family: 'H2hdrM',sans-serif;
  background-image: linear-gradient(to top, #c9ced4, #fff, #c9ced4), linear-gradient(to bottom, #175384, #175384);
  font-size: 5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 100%;
  letter-spacing: normal;
  text-align: center;
  color: #175384;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobbyWrap2 .couponWarp{
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  background-image: url("../../assets/background/eventFrame.png");
  background-size: 100% 100%;
}

.lobbyWrap2 .inputWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
}

.lobbyWrap2 .inputWrap input{
  background-color: #020c15;
  font-size: 12px;
  height: 38px;
}

.lobbyWrap2 .inputWrap .form-group select{
  background-color: #020c15;
  font-size: 12px;
  color: #979797;
  width: 218px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.selectGame{
  width: 220px;
  height: 34px;
  margin-right: 10px;
}

.lobbyWrap2 .inputWrap.couponWarning{
  width: 270px;
  height: 34px;
  margin-right: 20px;
}

.lobbyWrap2 .inputWrap.selectGame input{
  width: 178px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.couponWarning input{
  width: 268px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.button{
  width: 120px;
  height: 34px;
  font-size: 14px;
  margin-right: 80px;
  background-image: linear-gradient(to bottom, #00c3fc, #006cd5, #133085), linear-gradient(to bottom, #1b1b1c, #1b1b1c);
}

.lobbyWrap2 .row {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
}

.lobbyWrap2 .row.mainList{
  animation: scrollRow 60s infinite backwards ease-in-out;
}

.lobbyWrap2 .swiper-pagination-bullet {
  background-image: url("../../assets/icon/icon_basic-round2.png");
  background-size: 100% 100%;
  width: 21px;
  height: 21px;
  opacity: 1 !important;
}
.lobbyWrap2 .swiper-pagination-bullet-active {
  background-image: url("../../assets/icon/icon_round2.png");
  background-size: 100% 100%;
  width: 21px;
  height: 21px;
  opacity: 1 !important;
}

.lobbyWrap2 .movetext_mobile{
  display: none;
}

/* 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (max-width: 1024px) {
  .lobbyWrap2 {
    width: 100% !important;
  }
  .lobbyWrap2 .topWrap, .lobbyWrap2 .snsBanners, .lobbyWrap2 .bigBannerWrap2, .lobbyWrap2 .copyrightWrap{
    width: 100%;
  }
  .lobbyWrap2 .topWrap{
    flex-direction: column-reverse;
  }
  .lobbyWrap2 .topLeftWrap{
    width: 100% !important;
  }
  .lobbyWrap2 .topMostWrap{
    display: none;
  }
  .lobbyWrap2 .movetext_mobile{
    display: flex;
    width: 100%;
    animation: textLoop 10s linear infinite;
    padding-right: 1.4881vw;
    align-items: end;
    justify-content: end;
    height: 50px;
    font-size: 2.5rem;
  }
  .lobbyWrap2 .middleButtonsWrap {
    display: flex;
    width: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    background-image: url("../../assets/background/centerFrame2.png");
    background-size: 100R% 100%;
    height: 350px;
  }
  .lobbyWrap2 .middleButtonsWrap button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    width: 360px;
    height: 170px;
    background-image: unset;
  }
  .lobbyWrap2 .middleButtonTitle{
    font-size: 3rem;
  }
  .lobbyWrap2 .middleButtonSubTitle{
    font-size: 2.5rem;
  }
  .lobbyWrap2 .middleButtonLogo{
    display: none;
  }
  .lobbyWrap2 .infoBoxWrap .boxWrap .box .boxTitle{
    padding-left: 2rem;
    padding-right: 1.5rem;
  }
  .lobbyWrap2 .fooColor{
    font-size: 3rem;
  }
  .lobbyWrap2 .fooColor2{
    font-size: 2rem;
  }
  .lobbyWrap2 .infoBoxWrap .boxWrap,.infoBoxWrap .boxWrap .box{
    height: 33rem !important;
  }
  .lobbyWrap2 .snsBanners{
    height: 25rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .lobbyWrap2 .snsBanners .banner{
    width: 50%;
  }
  .lobbyWrap2 .snsBanners .banner img{
    display: none;
  }
  .lobbyWrap2 .snsBanners .banner, .lobbyWrap2 .snsBanners .banner .box{
    height: 12rem;
    justify-content: center;
    gap: 3rem;
  }
  .lobbyWrap2 .snsBanners .banner .box div{
    height: 60%;
  }
  .lobbyWrap2 .snsBanners .banner .box div img{
    display: unset;
    margin-top: 1rem;
    height: 100%;
  }
  .lobbyWrap2 .snsBanners .banner .box .infos span:first-child{
    font-size: 2.5rem;
  }
  .lobbyWrap2 .snsBanners .banner .box .infos span:last-child{
    font-size: 3.5rem;
  }
  .lobbyWrap2 .bigBannerWrap2 .gameButton{
    width: 22rem;
    height:12rem;
  }
  .lobbyWrap2 .bigBannerWrap2 .gameButton img{
    transform: scale(2.5);
  }
  .lobbyWrap2 .copyrightWrap{
    font-size: 2rem;
  }
  .lobbyWrap2 .cons{
    font-size: 1.8rem;
    height: 4.8rem;
  }
  .lobbyWrap2 .bannerText{
    left: 3%;
    bottom: 10%;
  }
  .lobbyWrap2 .bannerTextTitle{
    font-size: 2.5rem;
  }
  .lobbyWrap2 .bannerTextDesc{
    font-size: 2rem;
  }
  .lobbyWrap2 .jackpotText2 span{
    font-size: 10rem;
  }
}

@keyframes scrollRow {
  0%{
    transform: translateY(0%);
    top: 0%;
  }
  5%{
    transform: translateY(0%);
    top: 0%;
  }
  6%{
    transform: translateY(calc(-2.5rem * 1));
    top: calc(-2.5rem * 1);
  }
  10%{
    transform: translateY(calc(-2.5rem * 1));
    top: calc(-2.5rem * 1);
  }
  11%{
    transform: translateY(calc(-2.5rem * 2));
    top: calc(-2.5rem * 2);
  }
  15%{
    transform: translateY(calc(-2.5rem * 2));
    top: calc(-2.5rem * 2);
  }
  16%{
    transform: translateY(calc(-2.5rem * 3));
    top: calc(-2.5rem * 3);
  }
  20%{
    transform: translateY(calc(-2.5rem * 3));
    top: calc(-2.5rem * 3);
  }
  21%{
    transform: translateY(calc(-2.5rem * 4));
    top: calc(-2.5rem * 4);
  }
  25%{
    transform: translateY(calc(-2.5rem * 4));
    top: calc(-2.5rem * 4);
  }
  26%{
    transform: translateY(calc(-2.5rem * 5));
    top: calc(-2.5rem * 5);
  }
  30%{
    transform: translateY(calc(-2.5rem * 5));
    top: calc(-2.5rem * 5);
  }
  31%{
    transform: translateY(calc(-2.5rem * 6));
    top: calc(-2.5rem * 6);
  }
  35%{
    transform: translateY(calc(-2.5rem * 6));
    top: calc(-2.5rem * 6);
  }
  36%{
    transform: translateY(calc(-2.5rem * 7));
    top: calc(-2.5rem * 7);
  }
  40%{
    transform: translateY(calc(-2.5rem * 7));
    top: calc(-2.5rem * 7);
  }
  41%{
    transform: translateY(calc(-2.5rem * 8));
    top: calc(-2.5rem * 8);
  }
  45%{
    transform: translateY(calc(-2.5rem * 8));
    top: calc(-2.5rem * 8);
  }
  46%{
    transform: translateY(calc(-2.5rem * 9));
    top: calc(-2.5rem * 9);
  }
  50%{
    transform: translateY(calc(-2.5rem * 9));
    top: calc(-2.5rem * 9);
  }
  51%{
    transform: translateY(calc(-2.5rem * 10));
    top: calc(-2.5rem * 10);
  }
  55%{
    transform: translateY(calc(-2.5rem * 10));
    top: calc(-2.5rem * 10);
  }
  56%{
    transform: translateY(calc(-2.5rem * 11));
    top: calc(-2.5rem * 11);
  }
  60%{
    transform: translateY(calc(-2.5rem * 11));
    top: calc(-2.5rem * 11);
  }
  61%{
    transform: translateY(calc(-2.5rem * 12));
    top: calc(-2.5rem * 12);
  }
  65%{
    transform: translateY(calc(-2.5rem * 12));
    top: calc(-2.5rem * 12);
  }
  66%{
    transform: translateY(calc(-2.5rem * 13));
    top: calc(-2.5rem * 13);
  }
  70%{
    transform: translateY(calc(-2.5rem * 13));
    top: calc(-2.5rem * 13);
  }
  71%{
    transform: translateY(calc(-2.5rem * 14));
    top: calc(-2.5rem * 14);
  }
  75%{
    transform: translateY(calc(-2.5rem * 14));
    top: calc(-2.5rem * 14);
  }
  76%{
    transform: translateY(calc(-2.5rem * 15));
    top: calc(-2.5rem * 15);
  }
  80%{
    transform: translateY(calc(-2.5rem * 15));
    top: calc(-2.5rem * 15);
  }
  81%{
    transform: translateY(calc(-2.5rem * 16));
    top: calc(-2.5rem * 16);
  }
  85%{
    transform: translateY(calc(-2.5rem * 16));
    top: calc(-2.5rem * 16);
  }
  86%{
    transform: translateY(calc(-2.5rem * 17));
    top: calc(-2.5rem * 17);
  }
  90%{
    transform: translateY(calc(-2.5rem * 17));
    top: calc(-2.5rem * 17);
  }
  91%{
    transform: translateY(calc(-2.5rem * 18));
    top: calc(-2.5rem * 18);
  }
  95%{
    transform: translateY(calc(-2.5rem * 18));
    top: calc(-2.5rem * 18);
  }
  96%{
    transform: translateY(calc(-2.5rem * 19));
    top: calc(-2.5rem * 19);
  }
  97%{
    transform: translateY(0);
    top: 0%;
  }
}
.lobbyWrap2 .movetext {
  animation: textLoop 10s linear infinite;
  padding-right: 1.4881vw;
  /*animation-play-state: paused;*/
  /*cursor: pointer;*/
}

@keyframes textLoop {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-70%, 0, 0);
    transform: translate3d(-70%, 0, 0);
  }
}
</style>
