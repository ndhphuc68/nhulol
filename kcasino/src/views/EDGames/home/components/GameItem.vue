<template>
  <div class="card-item">
    <div>
      <h6 class=" game-name ">{{game.name}}</h6>
      <p class="description">{{game.description}}</p>
      <button class="btn-play">{{$t("playnow")}}<img alt="games" :src="require('@/assets/icon/arrow-icon.png')" /></button>
      <div class="game-image">
        <img alt="games" :src="require(`@/assets/games/${game.image}`)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
// import {toggleShow} from "@/utils/modals";
// import {themeUtils} from "@/const/themeData";
//import store from '@/store'
const props = defineProps(['game']);

</script>
<style scoped>
  .card-item {
    padding: 24px;
    cursor: pointer;
    border: 1px solid #E4E4E7;
    border-radius: 16px;
    margin: 0 12px;
  }
  .card-item:hover{
    opacity: 0.7;
  }
  .btn-play {
    display: flex;
    align-items: center;
    color: var(--text);
  }
  .btn-play img {
    margin-left: 2px ;
    color: #c2c2c2;
  }
  .card-item:hover .game-image img{
    transform: scale3d(1.03, 1.03, 1.03);
  }
  .game-image {
    max-width: 312px;
    height: 282px;
    overflow: hidden;
    margin: 0 auto;
  }
  .description {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(--text-second);
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 16px 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .game-name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-transform: uppercase;
  }
</style>