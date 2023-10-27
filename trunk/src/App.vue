<template>
  <router-view/>
  <Toast @click.stop="store.commit('setErr', undefined)" v-if="store.getters.getErr" :message="store.getters.getErr"/>
  <Modals/>
  <notifications/>
</template>
<!-- Start of LiveChat (www.livechat.com) code -->
<script>
  /*
  window.__lc = window.__lc || {};
  window.__lc.license = 14521155;
  ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
*/
  let title = process.env.VUE_APP_PAGE_TYPE;
  export default {
    name: 'app',
    created () {
      document.title = title;
      const favicon = document.getElementById("favicon");
      let faviconName = "./favicon-32x32.png";
      favicon.href = faviconName;
    }
  }
</script>
<!--<noscript><a href="https://www.livechat.com/chat-with/14521155/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>-->
<!-- End of LiveChat code -->
<script setup>
  import Modals from "@/components/modal/Modals";
  import Toast from '@/components/toast/Toast.vue';
  import { onMounted, onBeforeMount } from 'vue';


  import { useStore } from 'vuex';
  const store = useStore();

  import '@/css/common.css';
  import { Buffer } from 'buffer';

  window.Buffer = Buffer;
  window.process = require('process');

  // import {encryptDataV2} from "@/utils/encrypt";
  onBeforeMount(async () => {
    if(location.protocol == 'http:'){
      location.href = location.href.replace('http://', 'https://');
    }
  })

</script>

<style>

  :root {
    --bg: #FFFFFF;
    --text: #18181B;
    /*--text-second : '#52525B';*/
    --text-second : #A1A1AA;
    --primary : #CC9A6C;
    /*--primary: #d5d317;*/
    --solid: #fff;
    --btn-w: 60em;
    /*--btn-hover-bg: linear-gradient(to top, #9b764f, #3d2c21);*/
    --btn-hover-bg: linear-gradient(to top, #607d8d, #1c2529);
    /*--dot-w: calc(var(--btn-w)*.5);
    --tr-X: calc(var(--btn-w) - var(--dot-w));*/
  }

  .custom-btn {
    position: relative;
    width:100%;
    opacity: 1;

    /*width: 130px;*/
    /*height: 40px;*/
    padding: 10px 25px;
    border: 1px solid #ffffff;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }

  .custom-btn2 {
    position: relative;
    width:100%;
    opacity: 1;

    /*width: 130px;*/
    /*height: 40px;*/
    /*padding: 10px 25px;*/
    border: 2px solid #000;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }

  /* 1 */
  .btn-1 {
    transition: all 0.3s ease;
  }
  .btn-1:hover {
    box-shadow:
            -7px -7px 20px 0px #fff9,
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;
  }

  /* 2 */
  .btn-2 {

  }
  .btn-2:after {
    position: absolute;
    content: "";
    top: 5px;
    left: 6px;
    width: 90%;
    height: 70%;
    border: 1px solid #000;
    opacity: 0;
    transition: all 0.3s ease;
  }
  .btn-2:hover:after {
    opacity: 1;
  }


  /* 3 */
  .btn-3 {
    line-height: 39px;
    padding: 0;
  }
  .btn-3:hover{
    background: transparent;
    color: #000;
  }
  .btn-3 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-3:before,
  .btn-3:after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    background: #000;
    transition: all 0.3s ease;
  }
  .btn-3:before {
    height: 0%;
    width: 2px;
  }
  .btn-3:after {
    width: 0%;
    height: 2px;
  }
  .btn-3:hover:before {
    height: 100%;
  }
  .btn-3:hover:after {
    width: 100%;
  }
  .btn-3 span:before,
  .btn-3 span:after {
    position: absolute;
    content: "";
    right: 0;
    bottom: 0;
    background: #000;
    transition: all 0.3s ease;
  }
  .btn-3 span:before {
    width: 2px;
    height: 0%;
  }
  .btn-3 span:after {
    width: 0%;
    height: 2px;
  }
  .btn-3 span:hover:before {
    height: 100%;
  }
  .btn-3 span:hover:after {
    width: 100%;
  }

  /* 4 */
  .btn-4 {
    position: relative;
    color: #000;
    z-index: 2;
    line-height: 40px;
    padding: 0;
  }
  .btn-4:hover{
    border: none;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: "";
    width: 0%;
    height: 0%;
    border: 2px solid;
    z-index: -1;
    transition: all 0.3s ease;
  }
  .btn-4:before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: #000;
    border-left-color: #000;
  }
  .btn-4:after{
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #000;
    border-right-color: #000;
  }
  .btn-4:hover:before,
  .btn-4:hover:after {
    border-color: #000;
    height: 100%;
    width: 100%;
  }



  /* 5 */
  .btn-5 {
    background: #000;
    color: #fff;
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-5:hover {
    background: transparent;
    color: #000;
    box-shadow:
            -7px -7px 20px 0px #fff9,
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;
  }
  .btn-5:before,
  .btn-5:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #000;
    transition:400ms ease all;
  }
  .btn-5:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  .btn-5:hover:before,
  .btn-5:hover:after{
    width:100%;
    transition:800ms ease all;
  }


  /* 6 */
  .btn-6 {
    background: #000;
    color: #fff;
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-6 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-6:before,
  .btn-6:after {
    position: absolute;
    content: "";
    height: 0%;
    width: 2px;
    background: #000;
  }
  .btn-6:before {
    right: 0;
    top: 0;
    transition: all 500ms ease;
  }
  .btn-6:after {
    left: 0;
    bottom: 0;
    transition: all 500ms ease;
  }
  .btn-6:hover{
    color: #000;
    background: transparent;
  }
  .btn-6:hover:before {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6:hover:after {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6 span:before,
  .btn-6 span:after {
    position: absolute;
    content: "";
    background: #000;
  }
  .btn-6 span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: 2px;
    transition: all 500ms ease;
  }
  .btn-6 span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    transition: all 500ms ease;
  }
  .btn-6 span:hover:before {
    width: 100%;
  }
  .btn-6 span:hover:after {
    width: 100%;
  }

  /* 7 */
  .btn-7 {
    background: #000;
    color: #fff;
    line-height: 42px;
    padding: 0;
    border: none;
    z-index: 1;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
  }
  .btn-7:hover {
    background: transparent;
    color: #000;
  }
  .btn-7:before,
  .btn-7:after {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 50%;
    right: 0;
    z-index: -1;
    background: #000;
    transition: all 0.3s ease;
  }
  .btn-7:before {
    top: 0;
  }
  .btn-7:after {
    bottom: 0;
  }
  .btn-7:hover:before,
  .btn-7:hover:after {
    height: 0;
    background-color: #000;
  }




  /* 8 */
  .btn-8 {
    line-height: 40px;
    padding: 0;
    background: transparent;
    position: relative;
    z-index: 2;
    color: #fff;
    -webkit-perspective: 300px;
    perspective: 300px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .btn-8:hover{
    color: #000;
  }
  .btn-8:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
    transition: all 0.3s ease;
  }
  .btn-8:hover:after {
    -webkit-transform: rotateX(-180deg);
    transform: rotateX(-180deg);
  }


  /* 9 */
  .btn-9 {
    z-index: 2;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  .btn-9:after {
    position: absolute;
    content: " ";
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }
  .btn-9:hover {
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
    color: #fff;
  }
  .btn-9:hover:after {
    -webkit-transform: scale(2) rotate(180deg);
    transform: scale(2) rotate(180deg);
    background: #000;
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  }

  /* 10 */
  .btn-10 {
    transition: all 0.3s ease;
    overflow: hidden;
  }
  .btn-10:after {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    -webkit-transform: scale(.1);
    transform: scale(.1);
  }
  .btn-10:hover {
    color: #fff;
  }
  .btn-10:hover:after {
    background: #000;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  /* 11 */
  .btn-11 {
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .btn-11:hover {
    background: #000;
    color: #fff;
  }
  .btn-11:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
  }
  .btn-11:active{
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  }


  @-webkit-keyframes shiny-btn1 {
    0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
    80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
    81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
    100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
  }


  /* 12 */
  .btn-12{
    position: relative;
    right: 20px;
    bottom: 20px;
    border:none;
    width: 130px;
    height: 40px;
    line-height: 40px;
    -webkit-perspective: 230px;
    perspective: 230px;
  }
  .btn-12 span {
    display: block;
    position: absolute;
    width: 130px;
    height: 40px;
    border: 2px solid #000;
    margin:0;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .btn-12 span:nth-child(1) {
    box-shadow:
            -7px -7px 20px 0px #fff9,
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    transform: rotateX(90deg);
    -webkit-transform-origin: 50% 50% -20px;
    -moz-transform-origin: 50% 50% -20px;
    transform-origin: 50% 50% -20px;
  }
  .btn-12 span:nth-child(2) {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: 50% 50% -20px;
    -moz-transform-origin: 50% 50% -20px;
    transform-origin: 50% 50% -20px;
  }
  .btn-12:hover span:nth-child(1) {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  .btn-12:hover span:nth-child(2) {
    background: #e0e5ec;
    color: #e0e5ec;
    -webkit-transform: rotateX(-90deg);
    -moz-transform: rotateX(-90deg);
    transform: rotateX(-90deg);
  }


  /* 13 */
  .btn-13 {
    background: #000;
    color: #fff;
    z-index: 1;
  }
  .btn-13:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #e0e5ec;
    transition: all 0.3s ease;
  }
  .btn-13:hover {
    color: #000;
  }
  .btn-13:hover:after {
    top: 0;
    height: 100%;
  }
  .btn-13:active {
    top: 2px;
  }


  /* 14 */
  .btn-14 {
    background: #000;
    color: #fff;
    z-index: 1;
  }
  .btn-14:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    z-index: -1;
    background: #e0e5ec;
    transition: all 0.3s ease;
  }
  .btn-14:hover {
    color: #000;
  }
  .btn-14:hover:after {
    top: auto;
    bottom: 0;
    height: 100%;
  }
  .btn-14:active {
    top: 2px;
  }

  /* 15 */
  .btn-15 {
    background: #000;
    color: #fff;
    z-index: 1;
  }
  .btn-15:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #e0e5ec;
    transition: all 0.3s ease;
  }
  .btn-15:hover {
    color: #000;
  }
  .btn-15:hover:after {
    left: 0;
    width: 100%;
  }
  .btn-15:active {
    top: 2px;
  }


  /* 16 */
  .btn-16 {
    background: #000;
    color: #fff;
    z-index: 1;
  }
  .btn-16:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    background: #e0e5ec;
    transition: all 0.3s ease;
  }
  .btn-16:hover {
    color: #000;
  }
  .btn-16:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  .btn-16:active {
    top: 2px;
  }


  /*id, passwaord  input */
  .effect-1,
  .effect-2,
  .effect-3{border: 0; padding: 5px 0; border-bottom: 1px solid #ccc;}
  .effect-1 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #f1ec12; transition: 0.4s;}
  .effect-1:focus ~ .focus-border{width: 100%; transition: 0.4s;}

  .effect-2 ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
  .effect-2:focus ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}

  .effect-3 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; z-index: 99;}
  .effect-3 ~ .focus-border:before,
  .effect-3 ~ .focus-border:after{content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 100%; background-color: #4caf50; transition: 0.4s;}
  .effect-3 ~ .focus-border:after{left: auto; right: 0;}
  .effect-3:focus ~ .focus-border:before,
  .effect-3:focus ~ .focus-border:after{width: 50%; transition: 0.4s;}

  .effect-4,
  .effect-5,
  .effect-6{border: 0; padding: 5px 0 7px; border: 1px solid transparent; border-bottom-color: #ccc; transition: 0.4s;}

  .effect-4:focus,
  .effect-5:focus,
  .effect-6:focus{padding: 5px 14px 7px; transition: 0.4s;}

  .effect-4 ~ .focus-border{position: absolute; height: 0; bottom: 0; left: 0; width: 100%; transition: 0.4s; z-index: -1;}
  .effect-4:focus ~ .focus-border{transition: 0.4s; height: 36px; border: 2px solid #4caf50; z-index: 1;}

  .effect-5 ~ .focus-border{position: absolute; height: 36px; bottom: 0; left: 0; width: 0; transition: 0.4s;}
  .effect-5:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #4caf50;}

  .effect-6 ~ .focus-border{position: absolute; height: 36px; bottom: 0; right: 0; width: 0; transition: 0.4s;}
  .effect-6:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #4caf50;}

  .effect-7,
  .effect-8,
  /*.effect-9{border: 1px solid #ccc; padding: 6px 10px 4px; transition: 0.4s;}*/
  .effect-9{border: 1px solid transparent; padding: 6px 10px 4px; transition: 0.4s; border-radius: 4px;}

  .effect-7 ~ .focus-border:before,
  .effect-7 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 50%; width: 0; height: 2px; background-color: #e3c840; transition: 0.4s;}
  .effect-7 ~ .focus-border:after{top: auto; bottom: 0;}
  .effect-7 ~ .focus-border i:before,
  .effect-7 ~ .focus-border i:after{content: ""; position: absolute; top: 50%; left: 0; width: 2px; height: 0; background-color: #e3c850; transition: 0.6s;}
  .effect-7 ~ .focus-border i:after{left: auto; right: 0;}
  .effect-7:focus ~ .focus-border:before,
  .effect-7:focus ~ .focus-border:after{left: 0; width: 100%; transition: 0.4s;}
  .effect-7:focus ~ .focus-border i:before,
  .effect-7:focus ~ .focus-border i:after{top: 0; height: 100%; transition: 0.6s;}

  .effect-8 ~ .focus-border:before,
  .effect-8 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #d0b13b; transition: 0.3s;}
  .effect-8 ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
  .effect-8 ~ .focus-border i:before,
  .effect-8 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #e7c581; transition: 0.4s;}
  .effect-8 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
  .effect-8:focus ~ .focus-border:before,
  .effect-8:focus ~ .focus-border:after{width: 100%; transition: 0.3s;}
  .effect-8:focus ~ .focus-border i:before,
  .effect-8:focus ~ .focus-border i:after{height: 100%; transition: 0.4s;}

  .effect-9 ~ .focus-border:before,
  .effect-9 ~ .focus-border:after{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.2s; transition-delay: 0.2s;}
  .effect-9 ~ .focus-border:after{top: auto; bottom: 0; right: auto; left: 0; transition-delay: 0.6s;}
  .effect-9 ~ .focus-border i:before,
  .effect-9 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.2s;}
  .effect-9 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0; transition-delay: 0.4s;}
  .effect-9:focus ~ .focus-border:before,
  .effect-9:focus ~ .focus-border:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
  .effect-9:focus ~ .focus-border:after{transition-delay: 0.2s;}
  .effect-9:focus ~ .focus-border i:before,
  .effect-9:focus ~ .focus-border i:after{height: 100%; transition: 0.2s;}
  .effect-9:focus ~ .focus-border i:after{transition-delay: 0.4s;}

  .effect-10,
  .effect-11,
  .effect-12,
  .effect-13,
  .effect-14,
  .effect-15{border: 0; padding: 7px 15px; border: 1px solid #ccc; position: relative; background: transparent;}

  .effect-10 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: #ededed; opacity: 0; transition: 0.5s; z-index: -1;}
  .effect-10:focus ~ .focus-bg{transition: 0.5s; opacity: 1;}

  .effect-11 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-11:focus ~ .focus-bg{transition: 0.3s; width: 100%;}

  .effect-12 ~ .focus-bg{position: absolute; left: 50%; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-12:focus ~ .focus-bg{transition: 0.3s; width: 100%; left: 0;}

  .effect-13 ~ .focus-bg:before,
  .effect-13 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-13:focus ~ .focus-bg:before{transition: 0.3s; width: 50%;}
  .effect-13 ~ .focus-bg:after{left: auto; right: 0;}
  .effect-13:focus ~ .focus-bg:after{transition: 0.3s; width: 50%;}

  .effect-14 ~ .focus-bg:before,
  .effect-14 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-14:focus ~ .focus-bg:before{transition: 0.3s; width: 50%; height: 100%;}
  .effect-14 ~ .focus-bg:after{left: auto; right: 0; top: auto; bottom: 0;}
  .effect-14:focus ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%;}

  .effect-15 ~ .focus-bg:before,
  .effect-15 ~ .focus-bg:after{content: ""; position: absolute; left: 50%; top: 50%; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-15:focus ~ .focus-bg:before{transition: 0.3s; width: 50%; left: 0; top: 0; height: 100%;}
  .effect-15 ~ .focus-bg:after{left: auto; right: 50%; top: auto; bottom: 50%;}
  .effect-15:focus ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%; bottom: 0; right: 0;}

  .effect-16,
  .effect-17,
  .effect-18{border: 0; padding: 4px 0; border-bottom: 1px solid #ccc; background-color: transparent;}

  .effect-16 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
  .effect-16:focus ~ .focus-border,
  .has-content.effect-16 ~ .focus-border{width: 100%; transition: 0.4s;}
  .effect-16 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-16:focus ~ label, .has-content.effect-16 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-17 ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
  .effect-17:focus ~ .focus-border,
  .has-content.effect-17 ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
  .effect-17 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-17:focus ~ label, .has-content.effect-17 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-18 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; z-index: 99;}
  .effect-18 ~ .focus-border:before,
  .effect-18 ~ .focus-border:after{content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 100%; background-color: #4caf50; transition: 0.4s;}
  .effect-18 ~ .focus-border:after{left: auto; right: 0;}
  .effect-18:focus ~ .focus-border:before,
  .effect-18:focus ~ .focus-border:after,
  .has-content.effect-18 ~ .focus-border:before,
  .has-content.effect-18 ~ .focus-border:after{width: 50%; transition: 0.4s;}
  .effect-18 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-18:focus ~ label, .has-content.effect-18 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-19,
  .effect-20,
  .effect-21{border: 1px solid #ccc; padding: 7px 14px; transition: 0.4s; background: transparent;}

  .effect-19 ~ .focus-border:before,
  .effect-19 ~ .focus-border:after{content: ""; position: absolute; top: -1px; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
  .effect-19 ~ .focus-border:after{top: auto; bottom: 0;}
  .effect-19 ~ .focus-border i:before,
  .effect-19 ~ .focus-border i:after{content: ""; position: absolute; top: 50%; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.6s;}
  .effect-19 ~ .focus-border i:after{left: auto; right: 0;}
  .effect-19:focus ~ .focus-border:before,
  .effect-19:focus ~ .focus-border:after,
  .has-content.effect-19 ~ .focus-border:before,
  .has-content.effect-19 ~ .focus-border:after{left: 0; width: 100%; transition: 0.4s;}
  .effect-19:focus ~ .focus-border i:before,
  .effect-19:focus ~ .focus-border i:after,
  .has-content.effect-19 ~ .focus-border i:before,
  .has-content.effect-19 ~ .focus-border i:after{top: -1px; height: 100%; transition: 0.6s;}
  .effect-19 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-19:focus ~ label, .has-content.effect-19 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-20 ~ .focus-border:before,
  .effect-20 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.3s;}
  .effect-20 ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
  .effect-20 ~ .focus-border i:before,
  .effect-20 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.4s;}
  .effect-20 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
  .effect-20:focus ~ .focus-border:before,
  .effect-20:focus ~ .focus-border:after,
  .has-content.effect-20 ~ .focus-border:before,
  .has-content.effect-20 ~ .focus-border:after{width: 100%; transition: 0.3s;}
  .effect-20:focus ~ .focus-border i:before,
  .effect-20:focus ~ .focus-border i:after,
  .has-content.effect-20 ~ .focus-border i:before,
  .has-content.effect-20 ~ .focus-border i:after{height: 100%; transition: 0.4s;}
  .effect-20 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-20:focus ~ label, .has-content.effect-20 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-21 ~ .focus-border:before,
  .effect-21 ~ .focus-border:after{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.2s; transition-delay: 0.2s;}
  .effect-21 ~ .focus-border:after{top: auto; bottom: 0; right: auto; left: 0; transition-delay: 0.6s;}
  .effect-21 ~ .focus-border i:before,
  .effect-21 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.2s;}
  .effect-21 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0; transition-delay: 0.4s;}
  .effect-21:focus ~ .focus-border:before,
  .effect-21:focus ~ .focus-border:after,
  .has-content.effect-21 ~ .focus-border:before,
  .has-content.effect-21 ~ .focus-border:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
  .effect-21:focus ~ .focus-border:after,
  .has-content.effect-21 ~ .focus-border:after{transition-delay: 0.2s;}
  .effect-21:focus ~ .focus-border i:before,
  .effect-21:focus ~ .focus-border i:after,
  .has-content.effect-21 ~ .focus-border i:before,
  .has-content.effect-21 ~ .focus-border i:after{height: 100%; transition: 0.2s;}
  .effect-21:focus ~ .focus-border i:after,
  .has-conten.effect-21 ~ .focus-border i:after{transition-delay: 0.4s;}
  .effect-21 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-21:focus ~ label, .has-content.effect-21 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

  .effect-22,
  .effect-23,
  .effect-24{border: 0; padding: 7px 15px; border: 1px solid #ccc; position: relative; background: transparent;}

  .effect-22 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: transparent; transition: 0.4s; z-index: -1;}
  .effect-22:focus ~ .focus-bg,
  .has-content.effect-22 ~ .focus-bg{transition: 0.4s; width: 100%; background-color: #ededed;}
  .effect-22 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-22:focus ~ label, .has-content.effect-22 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}

  .effect-23 ~ .focus-bg:before,
  .effect-23 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-23:focus ~ .focus-bg:before,
  .has-content.effect-23 ~ .focus-bg:before{transition: 0.3s; width: 50%; height: 100%;}
  .effect-23 ~ .focus-bg:after{left: auto; right: 0; top: auto; bottom: 0;}
  .effect-23:focus ~ .focus-bg:after,
  .has-content.effect-23 ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%;}
  .effect-23 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-23:focus ~ label, .has-content.effect-23 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}

  .effect-24 ~ .focus-bg:before,
  .effect-24 ~ .focus-bg:after{content: ""; position: absolute; left: 50%; top: 50%; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
  .effect-24:focus ~ .focus-bg:before,
  .has-content.effect-24 ~ .focus-bg:before{transition: 0.3s; width: 50%; left: 0; top: 0; height: 100%;}
  .effect-24 ~ .focus-bg:after{left: auto; right: 50%; top: auto; bottom: 50%;}
  .effect-24:focus ~ .focus-bg:after,
  .has-content.effect-24 ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%; bottom: 0; right: 0;}
  .effect-24 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #ece7e7; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
  .effect-24:focus ~ label, .has-content.effect-24 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}

  input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #fcfafa; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  input[type="password"]{font: 15px/24px 'Muli', sans-serif; color: #fcfafa; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  input[type="number"]{font: 15px/24px 'Muli', sans-serif; color: #fcfafa; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

  :focus{outline: none;}

  .col-3{float: left; width: 160px; height: 36px; margin: 0px; position: relative;} /* necessary to give position: relative to parent. */
  .col-3 input[type="text"]{font: 16px/24px "Lato", Arial, sans-serif; color: #312f2f; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  .col-3 input[type="password"]{font: 16px/24px "Lato", Arial, sans-serif; color: #403b3b; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  .col-3 input[type="numbers"]{font: 16px/24px "Lato", Arial, sans-serif; color: #312e2e; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

  .col-4{float: left; width: 160px; height: 36px; margin: 0px; position: relative;} /* necessary to give position: relative to parent. */
  .col-4 input[type="text"]{font: 16px/24px "Lato", Arial, sans-serif; color: #fcfcfc; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  .col-4 input[type="password"]{font: 16px/24px "Lato", Arial, sans-serif; color: #ffffff; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
  .col-4 input[type="numbers"]{font: 16px/24px "Lato", Arial, sans-serif; color: #fdfdfd; width: 100%; box-sizing: border-box; letter-spacing: 1px;}



  .btnLuxury {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    font-weight: 500;
    font-style: normal;
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    color: rgba(223,190,106,0.7);
    border-radius: 0;
    padding: 18px 80px 20px;
    transition: all 0.7s ease-out;
    background: linear-gradient(270deg, rgba(223,190,106,0.8), rgba(146,111,52,0.8), rgba(34,34,34,0), rgba(34,34,34,0));
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    margin: 0.625rem;
    border: none;
    border: 1px solid rgba(223,190,106,0.3);
  }
  .btnLuxury:hover {
    color: #fff;
    border: 1px solid rgba(223,190,106,0);
    background-position: 99% 50%;
  }




  /* diamond shape */
  .glow {
    position: relative;
    width: 48px;
    height: 48px;
    transform: rotate(45deg);
    background: #C0FFE4;
    box-shadow: 1px 1px 0 #1D8758, 0 0 20px 5px #C0FFE4, inset 2px 2px 0 #D3FFEC;
    animation: glow 2s infinite ease;
  }
  .glow:before,
  .glow:after {
    content: '';
    display: block;
    position: absolute;
  }
  .glow:before {
    width: 22px;
    height: 22px;
    top: 11px;
    left: 11px;
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255,255,255,0.5);
    box-shadow: 0 0 2px 3px #B3F6D9;
    box-shadow: 1px 1px 0 #A2E6C9, 0 0 20px 5px #C0FFE4, inset 2px 2px 0 #D3FFEC;
  }
  .glow:after {
    left: 0;
    width: 4px;
    height: 48px;
    background: #fff;
    z-index: 5;
    animation: sheen 5s infinite;
  }

  /* animates box shadow glow effect */
  @keyframes glow {
    0%,100% {
      box-shadow: 1px 1px #1D8758, 0 0 20px 5px #8FFFCF, inset 2px 2px #D3FFEC;
    }
    50% {
      box-shadow: 1px 1px #1D8758, 0 0 16px 8px #8FFFCF, inset 2px 2px #D3FFEC;
    }
  }
  /* animates light across diamond */
  @keyframes sheen {
    0%,100% {
      left: 0;
      opacity: 0;
    }
    1% {
      opacity: 1;
    }
    10% {
      left: calc(100% - 4px);
    }
    11%,98% {
      left: 100%;
      opacity: 0;
    }
  }

  /* glass orb */
  .orb {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 0 5em;
    background: #C0FFE4;
    background-image: radial-gradient(farthest-corner at 34px 14px, #A2E6C9 25%, #1D8758 35%,  #D3FFEC 100%);
    box-shadow: 0 0 20px 5px #C0FFE4;
    animation: orb 1.8s infinite;
  }
  .orb:before {
    content: '';
    display: block;
    position: absolute;
    width: 44px;
    height: 44px;
    top: 2px;
    left: 2px;
    background-image: radial-gradient(farthest-corner at 14px 14px, #fff 15%, #C0FFE4 50%, rgba(192,255,228,0) 100%);
    border-radius: 50%;
  }
  /* star shaped shine pattern */
  .shine {
    position: absolute;
    top: 3px;
    left: 6px;
    width: 1px;
    height: 16px;
    background: #fff;
    transform: rotate(15deg);
    box-shadow: 0 0 8px rgba(255,255,255,0.75);
    animation: shine 10s infinite;
  }
  .shine:before, .shine:after {
    content:'';
    display: block;
    position: absolute;
  }
  .shine:before {
    top: 2px;
    left: -2px;
    width: 1px;
    height: 16px;
    background: #fff;
    transform: rotate(-90deg);
    box-shadow: 0 0 8px rgba(255,255,255,0.75);
  }
  .shine:after {
    top: 6px;
    left: -2px;
    width: 5px;
    height: 5px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: 0 0 8px 5px rgba(255,255,255,0.75);
  }
  /* reflective line */
  .light {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    overflow: hidden;
  }
  .light:before {
    content:'';
    display: block;
    position: absolute;
    width: 2px;
    height: 80px;
    top: -75%;
    left: 0;
    transform: rotate(45deg);
    background: rgba(255,255,255,0.5);
    animation: sheen2 7s infinite;
  }
  /* animates orb glow */
  @keyframes orb {
    0%,100% {
      box-shadow: 0 0 5px 2px #8FFFCF;
    }
    50% {
      box-shadow: 0 0 24px 4px #8FFFCF;
    }
  }
  /* rotates shine */
  @keyframes shine {
    0% {
      opacity: 0;
    }
    34% {
      opacity: 0;
      transform: rotate(15deg);
    }
    40% {
      opacity: 0.6;
      transform: rotate(620deg);
    }
    48%,100% {
      opacity: 0;
      transform: rotate(635deg);
    }
  }
  /* moves light reflection */
  @keyframes sheen2 {
    0%,100% {
      top: -75%;
      left: 15%;
      opacity: 0;
      width: 2px;
    }
    1% {
      opacity: 1;
    }
    10% {
      width: 24px;
    }
    11%,18% {
      top: 75%;
      left: 50%;
      width: 2px;
      opacity: 0;
    }
    20% {
      top: -75%;
      left: 15%;
      opacity: 0;
      width: 1px;
    }
    21% {
      opacity: 0.75;
    }
    30% {
      width: 6px;
    }
    31%,98% {
      top: 75%;
      left: 50%;
      width: 2px;
      opacity: 0;
    }
  }




  .glow2 {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    -webkit-animation: glow 3s linear 0s infinite alternate;
  }
  .particles {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;

  }
  .rotate {
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    width: 10px;
    height: 10px;
  }
  .angle {
    position: absolute;
    top: 0;
    left: 0;
  }
  .size {
    position: absolute;
    top: 0;
    left: 0;
  }
  .position {
    position: absolute;
    top: 0;
    left: 0;
  }
  .pulse {
    position: absolute;
    top: 0;
    left: 0;
  }
  .particle {
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .rotate {
    -webkit-animation: rotate 20s linear 0s infinite alternate;
  }
  .pulse{
    -webkit-animation: pulse 1.5s linear 0s infinite alternate;
  }

  @-webkit-keyframes glow2 {
    0% {
      transform: rotate(0deg);
      box-shadow: 0 0 60px 20px #56bcf9, 25px 15px 50px 10px #fff, -5px -25px 30px 5px #fff;
    }
    100% {
      transform: rotate(5deg);
      box-shadow: 0 0 90px 20px #56bcf9, 35px 20px 40px 10px #fff, -30px -30px 40px 5px #fff;
    }
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes angle {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes size {
    0% {
      -webkit-transform: scale(.2);
    }
    100% {
      -webkit-transform: scale(.6);
    }
  }

  @-webkit-keyframes position {
    0% {
      -webkit-transform: translate3d(0,0,0);
      opacity: 1;
    }
    50 %{
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(100px,100px,0);
      opacity: 0;
    }
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
    }
    100% {
      -webkit-transform: scale(.5);
    }
  }

  @-webkit-keyframes particle {
    0% {
      box-shadow: inset 0 0 20px 20px #0079e8, 0 0 50px 10px #0079e8, inset 0 0 80px 80px #269aff;
    }
    33.33% {
      box-shadow: inset 0 0 20px 20px #0079e8, 0 0 130px 10px #0079e8, inset 0 0 50px 50px #269aff;
    }
    33.34% {
      box-shadow: inset 0 0 20px 20px #2693ff, 0 0 50px 10px #2693ff, inset 0 0 80px 80px #52abff;
    }
    66.66% {
      box-shadow: inset 0 0 20px 20px #2693ff, 0 0 130px 10px #2693ff, inset 0 0 50px 50px #52abff;
    }
    66.67% {
      box-shadow: inset 0 0 20px 20px #485fe8, 0 0 50px 10px #485fe8, inset 0 0 80px 80px #7d71e8;
    }
    100% {
      box-shadow: inset 0 0 20px 20px #485fe8, 0 0 130px 10px #485fe8, inset 0 0 50px 50px #7d71e8;
    }
  }

  .rotate .angle:nth-child(1){
    /* change the angle every 2 seconds */
    -webkit-animation: angle 10s steps(5) 0s infinite;
  }
  .rotate .angle:nth-child(1) .size{
    /* change the size of the particle every 2 seconds */
    -webkit-animation: size 10s steps(5) 0s infinite;
  }
  .rotate .angle:nth-child(1) .particle{
    /* animate the glow and change the color every 2 seconds */
    -webkit-animation: particle 6s linear infinite alternate;
  }
  .rotate .angle:nth-child(1) .position{
    /* animate the fly out of the particle and its fade out at the end */
    -webkit-animation: position 2s linear 0s infinite;
  }

  .rotate .angle:nth-child(2){
    /* change the angle every 2 seconds */
    -webkit-animation: angle 4.95s steps(3) -1.65s infinite;
  }
  .rotate .angle:nth-child(2) .size{
    /* change the size of the particle every 2 seconds */
    -webkit-animation: size 4.95s steps(3) -1.65s infinite alternate;
  }
  .rotate .angle:nth-child(2) .particle{
    /* animate the glow and change the color every 2 seconds */
    -webkit-animation: particle 4.95s linear -3.3s infinite alternate;
  }
  .rotate .angle:nth-child(2) .position{
    /* animate the fly out of the particle and its fade out at the end */
    -webkit-animation: position 1.65s linear 0s infinite;
  }

  .rotate .angle:nth-child(3){
    /* change the angle every 2 seconds */
    -webkit-animation: angle 13.76s steps(8) -6.88s infinite;
  }
  .rotate .angle:nth-child(3) .size{
    /* change the size of the particle every 2 seconds */
    -webkit-animation: size 6.88s steps(4) -5.16s infinite alternate;
  }
  .rotate .angle:nth-child(3) .particle{
    /* animate the glow and change the color every 2 seconds */
    -webkit-animation: particle 5.16s linear -1.72s infinite alternate;
  }
  .rotate .angle:nth-child(3) .position{
    /* animate the fly out of the particle and its fade out at the end */
    -webkit-animation: position 1.72s linear 0s infinite;
  }

  .rotate .angle:nth-child(5) .position{
    /* animate the fly out of the particle and its fade out at the end */
    -webkit-animation: position 2.45s linear 0s infinite;
  }



  .circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }
  .circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }
  .circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }
  .circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }
  .circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }
  .circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }
  .circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }
  .circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }
  .circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }
  .circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }
  .circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0%{
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100%{
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }


</style>
