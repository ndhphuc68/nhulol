<template>
  <div class="container">
    <div class="games-header">
      <div>
        <h6 class="title">Game</h6>
        <h5 class="title-sub">WHY CHOOSE US?</h5>
      </div>
      <p class="game-description">
        Lorem ipsum dolor sit amet consectetur. Elit tincidunt nulla amet euismod malesuada amet.
      </p>
    </div>
    <div class="card-list" >
      <div class = "card-item" v-for="game in gamesIntroduce" :key="game.id_game">
        <img class="game-icon" alt = "" :src="require(`@/assets/icon/home/${game.image}`)"/>
        <h6 class="game-name">
          {{game.name}}
        </h6>
        <p class="introduce">
          {{game.description}}
        </p>
      </div>
    </div>

  </div>
</template>
<script setup>
import {gamesIntroduce} from '@/utils/datas'
</script>
<style scoped>
.container {
  margin-top: 48px;
  text-align: left;
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
  margin: 32px -24px 0;
}
.card-item {
  width: 33.33333%;
  margin: 0 24px;
}
.game-name {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--text);
  text-transform: uppercase;
  margin: 8px 0 8px 0;
}
.introduce {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--text-second);
}
.card-item {
  position: relative;
}

.game-icon {
  width: 64px;
  height: 64px;
}
</style>