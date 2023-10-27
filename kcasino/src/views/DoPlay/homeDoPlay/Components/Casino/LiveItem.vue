<template>
  <div
    class="d-flex flex-column align-center"
    :class="disabled ? 'game-item-dis' : 'game-item game-item-hover'"
  >
    <img
      loading="lazy"
      alt=""
      class="logo-company"
      :src="
        handleImage(game?.key)
          ? handleImage(game?.key)
          : require(`@/assets/logo/companies-game/${
              game.key.split('_')[0]
            }Active.png`)
      "
    />
    <img
      loading="lazy"
      alt=""
      class="logo-company active"
      :src="
        handleImage(game?.key)
          ? handleImage(game?.key)
          : require(`@/assets/logo/companies-game/${
              game.key.split('_')[0]
            }Active.png`)
      "
    />
    <div class="w-100 d-flex justify-center">
      <img
        loading="lazy"
        class="game-img"
        :alt="game.key"
        :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"
      />
    </div>
    <!-- <h4 class="game-name">{{ props.game.name }}</h4> -->
    <p class="users-online">{{ total }} Onlines</p>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import { generateRandomOnline, handleImage } from "@/utils";

const total = ref(generateRandomOnline());

onMounted(() => {
  setInterval(() => (total.value = generateRandomOnline()), 5000);
});

const props = defineProps({
  game: {
    type: Object,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
  },
});
</script>
<style scoped>
.game-img {
  width: 296px;
  height: 300px;
  border-radius: 6px;
  z-index: 2;
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
  cursor: pointer;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 16px;
  position: relative;
  background: #fff;
  justify-content: space-between;
}

.game-item-dis {
  background-color: gray;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.game-item:hover {
  /*  background: #eec8a4;*/
  background-image: url("@/assets/Doplay/gifs/hover.gif");
}

.game-name {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
}

.game-item:hover .game-img {
  animation: move 1s infinite;
}

@keyframes move {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

.users-online {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */
  color: #16a34a;
  text-align: left;
  margin-top: 4px;
}

.logo-company {
  position: absolute;
  top: 16px;
  max-width: 94.545px;
  max-height: 60px;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;
}

.logo-company.active {
  display: none;
}

.game-item:hover .logo-company.active {
  display: block;
}

.game-item:hover .logo-company {
  display: none;
}

@media (max-width: 575.98px) {
  .game-img {
    height: 200px;
  }
}
@media (max-width: 280px) {
  .game-item {
    padding: 9px;
  }
  .game-img {
    height: 130px;
    margin-top: 40px;
  }
  .logo-company {
    height: 30px;
  }
  .game-name {
    font-size: 14px;
  }
  .users-online {
    font-size: 12px;
  }
}
</style>
