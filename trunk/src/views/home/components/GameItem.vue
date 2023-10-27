<template>
  <div class="card-item">
    <div @click="clickGame(1)">
      <h6 class=" game-name ">{{game.name}}</h6>
      <p class="description">{{game.description}}</p>
      <button class="btn-play">Play now <img alt="games" :src="require('@/assets/icon/arrow-icon.png')" /></button>
      <div class="game-image">
        <img alt="games" :src="require(`@/assets/games/${game.image}`)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import {toggleShow} from "@/utils/modals";
import {themeUtils} from "@/const/themeData";
import store from '@/store'
const props = defineProps(['game']);

const clickGame = (i) => {
  console.log(i)
  themeUtils.ShowMessagePopup("res.message");
  store.dispatch('activeModal')
  if(i == 1)
    toggleShow('confirm');
  else if(i == 2)
    toggleShow('miniGame');
  else
    toggleShow('miniGame');
}

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
    width: 312px;
    height: 282px;
    overflow: hidden;
    margin: 0 auto;
  }
  .description {
    font-family: 'Manrope';
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
  }
  .game-name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-transform: uppercase;
    color: var(--text);
  }
</style>