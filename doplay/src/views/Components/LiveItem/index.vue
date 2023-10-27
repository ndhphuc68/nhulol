<script setup>
import {defineProps} from 'vue'
import Button from '@/components/Customs/Button'

defineProps({
  live: Object,
  hasPlayButton: Boolean
})
</script>

<template>
  <div class="live-item position-relative">
    <div class="d-flex justify-center">
      <img :src="require(`@/assets/logos/live-companies/${live?.logo}`)" alt="live-logo"
           class="position-absolute live-company no-active"/>
      <img :src="require(`@/assets/logos/live-companies/${live?.logoActive}`)" alt="live-logo"
           class="position-absolute live-company active"/>
      <img :src="require(`@/assets/logos/lives/${live?.img}`)" alt="live-logo" class="live-img"/>
    </div>
    <div class="live-name ">
      <div class="blur"></div>
      <div class="d-flex card-content">
        <h4> {{ live.name }} </h4>
        <Button v-if="hasPlayButton" class="button" variant="contained">{{ $t('play') }}</Button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.live-item {
  border-radius: 12px;
  border: 1px solid #E4E4E7;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.15);

}

.live-company {
  top: 5px;
  right: 10px;
  height: 48px;
}

.live-company.active {
  display: none;
}

.live-item:hover .live-company.active {
  display: block;
}

.live-item:hover .live-company.no-active {
  display: none;
}

.live-item:hover {
  background-image: url('@/assets/gifs/hover.gif');
   .live-img {
      animation: movie 1s infinite;
    }
}

.button {
  font-size: 15px;
}

@keyframes movie {
  //0% {
  //  transform: scale(0.9);
  //}
  //50% {
  //  transform: scale(1.01);
  //}
  //100% {
  //  transform: scale(0.9);
  //}
}

.live-name {
  border-radius: 0px 0px 12px 12px;
  padding: 30px 5px;
  position: relative;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  filter: blur(5px);
  background: linear-gradient(0deg, #F0F0F8 0%, #F5F5FA 100%);
  z-index: 0;
}

.card-content {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  width: 90%;
  align-items: center;
  justify-content: space-between;
}

.live-img {
  height: 350px;
}

</style>