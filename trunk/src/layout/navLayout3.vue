<template>
  <div class="layoutWrap" ref="layoutWrap">
    <div ref="rootWrap" class="rootWrap" :class="{ 'mobile': $route.meta.isMobile }">
      <div class="contentWrap " :class="[layoutSidebar,  {'mobile': $route.meta.isMobile }]">
        <Sidebar  :class="layoutSidebar" />
        <router-view/>
      </div>
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

//horizontal vertical-right vertical-left
const layoutSidebar = ref("horizontal");

const toggleSideMenu = () => {
  isShowSideMenu.value = window.innerWidth > 1024 ? true : !isShowSideMenu.value;
}

const windowSetScale = (event) => {
  let scaleSize = 1;
  let clientAspectRatio = event.target.innerWidth / event.target.innerHeight;

  let innerWidth = 1920;
  let innerHeight = 929;

  if(innerHeight * clientAspectRatio >= innerWidth)
  {
    scaleSize = event.target.innerHeight / innerHeight;
  }
  else
  {
    scaleSize = event.target.innerWidth / innerWidth;
  }
  if(event.target.innerWidth > 1024){
    isShowSideMenu.value = true;
    rootWrap.value.style.transform = `scale(${scaleSize})`;
  } else {
    isShowSideMenu.value = true;
    rootWrap.value.style.transform = `scale(${scaleSize})`;
  }
}
onMounted(() => {
  window.addEventListener("resize", windowSetScale);
  window.dispatchEvent(new Event('resize'));
});
onUnmounted(() => {
  window.removeEventListener("resize", windowSetScale);
});

</script>
<style scoped >
.layoutWrap {
  margin: 0 auto;
  width: 1920px;
  overflow: hidden;
  background-color: var(--bg);
  /*background-color: #F5F5F5;*/
  /*background-image: url("../assets/background/space-back.png");*/
  background-size: 100% 100%;
}
.contentWrap.horizontal {
  flex-direction: column;
}
.contentWrap.vertical-right {
  flex-direction: row-reverse;
}
.layoutWrap .rootWrap {
  width: 100%;
  transform-origin: top;
}

.layoutWrap .rootWrap.mobile {
  width: 100%;
  height: 100%;
}
.layoutWrap .rootWrap .headerWrap {
  width: 100%;
}
.layoutWrap .rootWrap .headerWrap .gameHeader.mobile .game.mobile span {
  font-size: 10px;
}
.layoutWrap .rootWrap .contentWrap{
  width: 100%;
  display: flex;
  height: auto;
  justify-content: center;
}
 .contentWrap div {
  flex: 1;
}
</style>