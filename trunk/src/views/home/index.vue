<template>
  <div class="lobbyWrap2">
    <div>
      <div class="top-home">
        <div class="notification-top">
          <img src="../../assets/icon/loudspeaker-icon.png">
          <p class="noti-content">Tincidunt orci odio imperdiet lorem est. Sagittis condimentum amet egestas elementum egestas velit.</p>
        </div>
        <AuthGroup />
      </div>
      <div class="line">
          <img class="logo-home" src="../../assets/logo/sidebar/kcasino.png" />
          <hr class="line-home"/>
      </div>
      <div class="home-content" >
          <img class="banned" src="../../assets/banner/lucky.png" />
          <ListGames />
          <ListIntroduce />
          <FeebackList />
          <ListCompanies />
      </div>
    </div>

  </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import AuthGroup from "@/components/AuthGroup"

import { ref } from "vue";
import { toggleShow } from "@/utils/modals";
import { data as listData } from '@/views/list/list.js';
import store from "@/store";
import ListGames from '@/views/home/components/ListGames'
import ListIntroduce from './components/ListIntroduce'
import FeebackList from './components/FeedbackList'
import ListCompanies from './components/ListCompanies'
let i = 0;

/*    const onSlideChange = () => {
        console.log("slide change");
    };*/
const toggles = ref(new Array(8).fill(false));


const clickGame = (i) => {
  if(i == 1)
    toggleShow('miniGame');
  else if(i == 2)
    toggleShow('miniGame')
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





</script>
<style>

.top-home {
  display: flex;
  justify-content: space-between;
}

.auth-action {
  display: flex;
}
.line {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.logo-home {
  margin-right: 50px;
  width: 193px;
  height: 48px;
}
.line-home {
  width: 100%;
  height: 0;
}
.noti-content{
  color:var(--text) ;
}

.home-content {
  margin-top: 40px;

}
.home-content .banned {
  width: 1199px;
  height: 499px;
}
.lobbyWrap2 {
  display: flex;
  padding: 32px;
  max-width: 78.75rem;
  flex-direction: column;
  overflow-y: scroll;
  /*background-color: #00a6fc;*/
}
/* Hide scrollbar for Chrome, Safari and Opera */
.lobbyWrap2::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.lobbyWrap2 {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
.notification-top {
 display: flex;
  align-items: center;

}
.noti-content {
  margin-left: 10px;
}
.notification-top img{
  width: 48px;
  height: 48px;
  flex: none;
  order: 0;
  flex-grow: 0;
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

.lobbyWrap2 .boxs .box h5 {
  color: #efdda2;
}



.lobbyWrap2 .bigBannerWrap img {
  margin: 2px;
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
  width: 100%;
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



.lobbyWrap2 .bigBannerWrap2 .bannerInfo p {
  white-space: pre-line;
  color: white;
  font-size: 14px;
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



.lobbyWrap2 .inputWrap.selectGame input{
  width: 178px;
  height: 32px;
}

.lobbyWrap2 .inputWrap.couponWarning input{
  width: 268px;
  height: 32px;
}





/* 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (max-width: 1024px) {
  .lobbyWrap2 {
    width: 100% !important;
  }
  .lobbyWrap2 .topWrap, .lobbyWrap2 .snsBanners, .lobbyWrap2 .bigBannerWrap2, .lobbyWrap2 .copyrightWrap{
    width: 100%;
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

  .lobbyWrap2 .bigBannerWrap2 .gameButton img{
    transform: scale(2.5);
  }
  .lobbyWrap2 .copyrightWrap{
    font-size: 2rem;
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
