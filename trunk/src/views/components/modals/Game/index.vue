<template>
  <div class = "container">
    <div class="tabs">
        <div class="tab-item active">
          <p>Live Casino</p>
        </div>
      <div class="tab-item">
        <p>Slot Game</p>
      </div>
      <div class="tab-item">
        <p>Mini Game</p>
      </div>
    </div>
    <div class="cards" >
      <GameItem class="card-item" v-for="game in game_modals" :game = "game" :key="game.id_game" />
    </div>
  </div>
</template>
<script setup>
    import GameItem from './GameItem'
    import {game_modals} from '@/utils/datas'
</script>
<style scoped>
  .container {
    margin-left: 10px;
    margin-top: 10px;
    width: 1128px;
    height:  734px;
    display: flex;
    flex-direction: column;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    overflow-y:  scroll;
    flex: 1;
  }
  .tabs {
    border: 2px solid #E4E4E7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }
  .tab-item {
    width: 347px;
    height: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .tab-item p{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: var(--text-second);
    text-transform: uppercase;

  }
  .tab-item.active p{
    color: var(--primary);
  }
  .tab-item.active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0px;
    left: 0;
    top: calc(100% - 1px);
    border: 2px solid #CC9A6C;
  }
</style>