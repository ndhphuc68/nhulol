<template>
  <div class="container">
    <div class="games-header">
      <div>
        <h6 class="title">Game</h6>
        <h5 class="title-sub">ASIA GAMING</h5>
      </div>
      <p class="game-description">
        Lorem ipsum dolor sit amet consectetur. Elit tincidunt nulla amet euismod malesuada amet.
      </p>
    </div>
    <div class="card-list" >
        <GameItem class="card-item" v-for="game in games" :game = "game" :key="game.id_game" />
    </div>

  </div>
</template>
<script setup>
import GameItem from './GameItem'
import {games} from '@/utils/datas'
</script>
<style scoped>
.container {
  margin-top: 48px;
}

.games-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.game-description {
  width: 456px;
  height: 54px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: var(--text-second);

}

.title {
  color: #CC9A6C;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
}

.title-sub {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 55px;

  text-align: center;

  color: var(--text)
}
.card-list {
  display: flex;
  margin: 32px -20px 0 ;
}
.card-item {
  width: 33.33333%;
}
</style>