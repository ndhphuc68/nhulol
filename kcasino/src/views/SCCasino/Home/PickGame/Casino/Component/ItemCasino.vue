<script setup>
import { defineProps, ref, onMounted } from "vue";
import { generateRandomOnline, handleImage } from "@/utils";

defineProps({
  game: {
    type: Object,
  },
  index: Number,
});

const total = ref(generateRandomOnline());

onMounted(() => {
  setInterval(() => (total.value = generateRandomOnline()), 5000);
});
</script>

<template>
  <div class="item-casino d-flex flex-column justify-center align-items-center">
    <img
      :src="
        handleImage(game?.key)
          ? handleImage(game?.key)
          : require(`@/assets/PlayG1/logos/companies-game/${
              game.key.split('_')[0]
            }Active.png`)
      "
      alt="live-logo"
      class="live-company"
    />
    <img
      :src="
        handleImage(game?.key)
          ? handleImage(game?.key)
          : require(`@/assets/PlayG1/logos/companies-game/${
              game.key.split('_')[0]
            }Active.png`)
      "
      alt="live-logo"
      class="live-company-hover"
    />
    <img
      :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"
      alt="live-logo"
      class="live-img"
    />
    <div class="mt-3 d-flex justify-content-between">
      <div class="col-12 d-flex flex-column justify-content-start">
        <!--        <h4 class="name-game">{{ game.name }}</h4>-->
        <span class="online">{{ total }} Join</span>
      </div>
      <!--      <div class="col-6 col-md-5 d-flex align-items-center h-auto">-->
      <!--        <div>-->
      <!--          <img-->
      <!--            :src="handleImage(game?.key)"-->
      <!--            alt="live-logo"-->
      <!--            class="live-company"-->
      <!--          />-->
      <!--          <img-->
      <!--            :src="handleImage(game?.key)"-->
      <!--            alt="live-logo"-->
      <!--            class="live-company-hover"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-casino {
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #fafafa;
  background: linear-gradient(
    219deg,
    rgba(221, 221, 221, 0.5) 0%,
    rgba(252, 250, 250, 0.5) 100%
  );
  padding: 8px 16px;

  .name-game {
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
    word-wrap: break-word;
    min-height: 40px;

    @media (max-width: 460px) {
      font-size: 0.8rem;
    }
  }

  .online {
    display: flex;
    align-items: center;

    &:before {
      content: "";
      width: 8px;
      height: 8px;
      display: block;
      background-color: #38e33e;
      border-radius: 100%;
      margin-right: 5px;
    }

    @media (max-width: 460px) {
      font-size: 0.8rem;
    }
  }

  //}

  .game-name {
    color: #d23449;
    text-align: center;
    text-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.08);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .live-img {
    width: 197px;
    height: 220px;
    @media (max-width: 375px) {
      height: 100px;
    }
  }

  &:hover {
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
    background-image: url("@/assets/SCCasino/gifs/hover.gif");

    .live-company {
      display: none;
    }

    .live-company-hover {
      display: block;
      height: 60px;
      width: 90px;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }
  }

  .live-company {
    height: 60px;
    width: 90px;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  .live-company-hover {
    height: 60px;
    width: 100px;
    display: none;
  }
}
</style>
