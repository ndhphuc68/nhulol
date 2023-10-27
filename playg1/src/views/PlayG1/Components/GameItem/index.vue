<template>
  <div class="item-game-slot d-flex flex-column justify-center align-center">
    <div class="game-play position-relative">
      <img
        :src="require(`@/assets/PlayG1/logos/slots/${game?.img}`)"
        alt="game.name"
        class="game-img"
        loading="lazy"
      />
      <div class="overlay"></div>
      <button class="btn-play">
        <img
          alt="icon-play"
          class="icon-play"
          src="../../../../assets/PlayG1/icon/slot/play.png"
        />
        <span class="name-play">{{ $t("play") }}</span>
      </button>
    </div>
    <span class="text-center mt-2">{{ game.name }}</span>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  game: Object,
});
</script>
<style lang="scss" scoped>
.item-game-slot {
  .game-play {
    overflow: hidden;
    width: 100%;

    .game-img {
      border-radius: 5px;
      width: 100%;
    }

    .overlay {
      display: none;
    }

    .btn-play {
      display: none;
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);

      .name-play {
        color: #fff;
      }
    }
  }

  &:hover {
    .overlay {
      position: absolute;
      display: block;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .btn-play {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .game-img {
      transform: rotate(10deg) scale(1.2);
      transition: transform linear 0.3s;
    }

    transition: all linear 0.3s;
  }
}

.item-game-slot span {
  font-weight: bold;
  font-size: 16px;
}
</style>