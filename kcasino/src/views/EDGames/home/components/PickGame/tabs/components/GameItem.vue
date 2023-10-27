<template>
  <div
    class="d-flex flex-column"
    :class="disabled ? 'game-item-dis' : 'game-item game-item-hover'"
  >
    <img
      :src="
        handleImage(game.key)
          ? handleImage(game.key)
          : require(`@/assets/logo/companies-game/${game.key
              .toString()
              .toLowerCase()}Active.png`)
      "
      alt="live-logo"
      class="logo-company"
    />
    <img
      :src="
        handleImage(game.key)
          ? handleImage(game.key)
          : require(`@/assets/logo/companies-game/${game.key
              .toString()
              .toLowerCase()}Active.png`)
      "
      alt="live-logo"
      class="logo-company active"
    />
    <div class="w-100 d-flex justify-center">
      <!--      <img-->
      <!--        loading="lazy"-->
      <!--        class="game-img"-->
      <!--        :alt="game.key"-->
      <!--        :src="require(`@/assets/logo/games-demo/${props.game.key}_1.png`)"-->
      <!--      />-->
      <img
        :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"
        alt="live-logo"
        class="game-img"
      />
    </div>
    <!--    <h4 class="game-name">{{ props.game.name }}</h4>-->
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
  margin-top: 10px;
  width: 296px;
  height: 250px;
  object-fit: contain;
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
  background-image: url("@/assets/gifs/hover.gif");
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
  top: 6px;
  right: 16px;
  margin-left: auto;
  margin-right: auto;

  max-width: 94.545px;
  height: 55px;
  width: 75px;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.logo-company.active {
  display: none;
}

.game-item:hover .logo-company.active {
  display: block;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

.game-item:hover .logo-company {
  display: none;
}

@media (max-width: 575.98px) {
  h4 {
    font-size: 16px !important;
  }

  .game-img {
    height: 200px;
  }
}

@media (max-width: 375px) {
  .game-img {
    height: 150px;
  }
  .users-online {
    font-size: 12px;
  }
}
</style>
