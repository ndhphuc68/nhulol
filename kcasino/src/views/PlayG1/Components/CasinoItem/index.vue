<script setup>
import { defineProps, defineEmits } from "vue";
import { handleImage } from "@/utils";

const $emits = defineEmits(["handleSelectCasino"]);

defineProps({
  live: Object,
  index: Number,
});
</script>

<template>
  <div
    class="live-item position-relative"
    @click="$emits('handleSelectCasino', live?.key, live, live.module)"
  >
    <div class="d-flex justify-center">
      <img
        :src="
          handleImage(live?.key)
            ? handleImage(live?.key)
            : require(`@/assets/logo/companies-game/${
                live?.key.split('_')[0]
              }Active.png`)
        "
        alt="live-logo"
        class="position-absolute live-company no-active"
      />
      <img
        :src="
          handleImage(live?.key)
            ? handleImage(live?.key)
            : require(`@/assets/logo/companies-game/${
                live?.key.split('_')[0]
              }Active.png`)
        "
        alt="live-logo"
        class="position-absolute live-company active"
      />
      <img
        :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"
        alt="live-logo"
        class="live-img"
      />
      <div class="live-name">
        <div class="blur"></div>
        <div class="d-flex card-content">
          <h4>{{ live?.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.live-item {
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid #e4e4e7;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  height: 350px;

  @media (max-width: 576px) {
    height: 250px;
  }
}

.live-company {
  top: 5px;
  right: 10px;
  height: 75px;
  width: 150px;
  @media (max-width: 375px) {
    right: 3px;
    width: 100px;
  }
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

.live-item .live-company.no-active {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.live-item:hover {
  background-image: url("@/assets/PlayG1/gifs/hover.gif");

  .live-img {
    animation: movie 1s infinite;
  }
}

.button {
  font-size: 15px;
}

@keyframes movie {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.9);
  }
}

.live-name {
  border-radius: 0 0 12px 12px;
  padding: 50px 5px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  height: 150px;
  width: 100%;
  filter: blur(5px);
  background: linear-gradient(180deg, rgba(216, 216, 222, 0) 0%, #213889 100%);
  padding: 69px 65.5px 16px 65.5px;
  z-index: 0;
}

.card-content {
  position: absolute;
  color: #fff;
  //left: 20px;
  bottom: 10px;
  font-size: 24px;
  font-weight: 700;
  width: 90%;
  align-items: center;
  justify-content: center;
}

.live-img {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 80%;
}

@media (max-width: 575.98px) {
  .card-content h4 {
    font-size: 14px;
  }
}
</style>

<!--<script setup>-->
<!--import { defineProps, defineEmits } from "vue";-->
<!--import { handleImageV1 as handleImage } from "@/utils";-->

<!--const $emits = defineEmits(["handleSelectCasino"]);-->

<!--defineProps({-->
<!--  live: Object,-->
<!--  index: Number,-->
<!--  type: String,-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <div-->
<!--    class="live-item position-relative"-->
<!--    @click="$emits('handleSelectCasino', live?.key)"-->
<!--  >-->
<!--    <div class="d-flex justify-center">-->
<!--      <img-->
<!--        v-if="type === 'game.js'"-->
<!--        :src="-->
<!--          require(`@/assets/PlayG1/logos/live-companies/${-->
<!--            live?.key.split('_')[0]-->
<!--          }.png`)-->
<!--        "-->
<!--        alt="live-logo"-->
<!--        class="position-absolute live-company no-active"-->
<!--      />-->
<!--      <img-->
<!--        v-if="type === 'game.js'"-->
<!--        :src="-->
<!--          require(`@/assets/PlayG1/logos/live-companies/${-->
<!--            live?.key.split('_')[0]-->
<!--          }Active.png`)-->
<!--        "-->
<!--        alt="live-logo"-->
<!--        class="position-absolute live-company active"-->
<!--      />-->
<!--      <img-->
<!--        v-if="type === 'game.js'"-->
<!--        :src="require(`@/assets/logo/games-demo/${live.key}_1.png`)"-->
<!--        alt="live-logo"-->
<!--        class="live-img"-->
<!--      />-->
<!--      <img-->
<!--        v-if="type === 'game2.js' || type === 'evolution'"-->
<!--        :src="handleImage(live?.key)"-->
<!--        alt="live-logo"-->
<!--        class="position-absolute live-company no-active"-->
<!--      />-->
<!--      <img-->
<!--        v-if="type === 'game2.js' || type === 'evolution'"-->
<!--        :src="handleImage(live?.key)"-->
<!--        alt="live-logo"-->
<!--        class="position-absolute live-company active"-->
<!--      />-->
<!--      <img-->
<!--        v-if="type === 'game2.js' || type === 'evolution'"-->
<!--        :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"-->
<!--        alt="live-logo"-->
<!--        class="live-img"-->
<!--      />-->
<!--      <div class="live-name">-->
<!--        <div class="blur"></div>-->
<!--        <div class="d-flex card-content">-->
<!--          <h4>{{ live.name }}</h4>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style lang="scss" scoped>-->
<!--.live-item {-->
<!--  cursor: pointer;-->
<!--  border-radius: 12px;-->
<!--  border: 1px solid #e4e4e7;-->
<!--  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);-->
<!--  height: 350px;-->

<!--  @media (max-width: 576px) {-->
<!--    height: 250px;-->
<!--  }-->
<!--}-->

<!--.live-company {-->
<!--  top: 5px;-->
<!--  right: 10px;-->
<!--  height: 75px;-->
<!--  width: 150px;-->
<!--}-->

<!--.live-company.active {-->
<!--  display: none;-->
<!--}-->

<!--.live-item:hover .live-company.active {-->
<!--  display: block;-->
<!--}-->

<!--.live-item:hover .live-company.no-active {-->
<!--  display: none;-->
<!--}-->

<!--.live-item .live-company.no-active {-->
<!--  -webkit-filter: grayscale(1);-->
<!--  filter: grayscale(1);-->
<!--}-->

<!--.live-item:hover {-->
<!--  background-image: url("@/assets/PlayG1/gifs/hover.gif");-->

<!--  .live-img {-->
<!--    animation: movie 1s infinite;-->
<!--  }-->
<!--}-->

<!--.button {-->
<!--  font-size: 15px;-->
<!--}-->

<!--@keyframes movie {-->
<!--  0% {-->
<!--    transform: scale(0.9);-->
<!--  }-->
<!--  50% {-->
<!--    transform: scale(1.05);-->
<!--  }-->
<!--  100% {-->
<!--    transform: scale(0.9);-->
<!--  }-->
<!--}-->

<!--.live-name {-->
<!--  border-radius: 0 0 12px 12px;-->
<!--  padding: 50px 5px;-->
<!--  position: absolute;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  left: 0;-->
<!--}-->

<!--.blur {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  height: 150px;-->
<!--  width: 100%;-->
<!--  filter: blur(5px);-->
<!--  background: linear-gradient(180deg, rgba(216, 216, 222, 0) 0%, #213889 100%);-->
<!--  padding: 69px 65.5px 16px 65.5px;-->
<!--  z-index: 0;-->
<!--}-->

<!--.card-content {-->
<!--  position: absolute;-->
<!--  color: #fff;-->
<!--  //left: 20px;-->
<!--  bottom: 10px;-->
<!--  font-size: 24px;-->
<!--  font-weight: 700;-->
<!--  width: 90%;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--.live-img {-->
<!--  position: absolute;-->
<!--  bottom: 0;-->
<!--  width: 80%;-->
<!--  height: 80%;-->
<!--}-->

<!--@media (max-width: 575.98px) {-->
<!--  .card-content h4 {-->
<!--    font-size: 14px;-->
<!--  }-->
<!--}-->
<!--</style>-->
