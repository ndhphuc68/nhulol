<template>
  <div class="layoutWrap" ref="layoutWrap" :class="[layoutSidebar,  {'mobile': $route.meta.isMobile }]">

    <Sidebar  :class="layoutSidebar" />
    <router-view/>
<!--    <div v-if="layoutSidebar !== 'horizontal'" class = "sub-sidebar">-->
<!--      <AuthGroup />-->
<!--    </div>-->
    <div class = "contact-button">

      <button>
        <img alt ="contact" :src="require('@/assets/icon/chat-icon.png')">
      </button>
      <p>
        Chat here ...
      </p>
    </div>
  </div>

</template>
<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import Sidebar from '@/components/Sidebar/index'
import { useRoute } from 'vue-router';
const route = useRoute();

const isShowSideMenu = ref(false);
const rootWrap = ref(undefined);
import AuthGroup from '@/components/AuthGroup'
//horizontal vertical-right vertical-left
const layoutSidebar = ref("vertical-left");

const toggleSideMenu = () => {
  isShowSideMenu.value = window.innerWidth > 1024 ? true : !isShowSideMenu.value;
}


</script>
<style scoped >
.layoutWrap {
  margin: 0 auto;
  width: 1920px;
  background-color: var(--bg);
  /*background-color: #F5F5F5;*/
  /*background-image: url("../assets/background/space-back.png");*/
  background-size: 100% 100%;
  display: flex;
  justify-content: center;

}
.layoutWrap.horizontal {
  flex-direction: column;
  align-items: center;
}
.layoutWrap.vertical-right {
  flex-direction: row-reverse;
}
.layoutWrap .rootWrap {
  width: 100%;
  transform-origin: top;
}
.sub-sidebar {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.contact-button {
  position: fixed;
  bottom: 100px;
  right: 350px;
  width: 150px;
  height: 70px;
  display: flex;
  align-items: center;
}
.contact-button img {
  width: 50px;
   height: 50px;
  padding-right: 5px ;
}
</style>