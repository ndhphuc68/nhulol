<template>
  <div class="item-game-slot d-flex flex-column justify-center align-center">
    <img loading="lazy" class="game-img" alt="game.name"
         :src="require(`@/assets/logos/slots/${game?.img}`)"/>
    <span class="text-center mt-2">{{ game.name }}</span>
  </div>
</template>
<script setup>
import {defineProps} from 'vue';

defineProps({
  game: Object
})

</script>
<style scoped lang="scss">
.item-game-slot img {
  border-radius: 5px;
}

.item-game-slot:hover  {
  img {
    transform: rotate(5deg);
  }
} 

.item-game-slot span {
  font-weight: bold;
  font-size: 16px;
}
</style>