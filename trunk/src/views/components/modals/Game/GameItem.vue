<template>
  <div class="game-item">
      <img class="game-img" alt="game.name" :src="require(`@/assets/games/${game.image}`)" />
      <h4 class="game-name">{{game.name}} </h4>
      <p class = "users-online">
        <img alt="dot"  src="@/assets/icon/modals/dot-online.png"/>
        {{game.users}}
      </p>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
  defineProps(['game']);
</script>
<style scoped>
    .game-img {
      width: 296px;
      height: 324px;
      border-radius: 6px;
    }
    .users-online {
      display: flex;
      align-items: center;
    }
    .users-online img {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
    .game-item {
      border: 1px solid #E4E4E7;
      border-radius: 12px;
      padding: 16px;
      margin: 16px;
      width: 30%;
    }
    .game-name {
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      color: var(--text)

    }
  .users-online {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */
    color: #16A34A;
    text-align: left;
  }
</style>