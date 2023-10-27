<script setup>
import { defineProps, defineEmits } from "vue";
import { handleImage } from "@/utils";

const props = defineProps({
  game: {
    type: Object,
  },
  index: { type: Number },
  disable: Boolean,
});

const $emits = defineEmits(["handleSelectCasino"]);
</script>

<template>
  <div class="item-casino d-flex flex-column justify-center align-items-center">
    <!--    <img-->
    <!--      :src="-->
    <!--        require(`@/assets/PlayG1/logos/live-companies/${-->
    <!--          game?.key.split('_')[0]-->
    <!--        }.png`)-->
    <!--      "-->
    <!--      alt="live-logo"-->
    <!--      class="live-company"-->
    <!--    />-->
    <!--    <img-->
    <!--      :src="-->
    <!--        require(`@/assets/PlayG1/logos/live-companies/${-->
    <!--          game?.key.split('_')[0]-->
    <!--        }Active.png`)-->
    <!--      "-->
    <!--      alt="live-logo"-->
    <!--      class="live-company-hover"-->
    <!--    />-->
    <!--    <img-->
    <!--      :src="require(`@/assets/logo/games-demo/${game.key}_1.png`)"-->
    <!--      alt="live-logo"-->
    <!--      class="live-img"-->
    <!--    />-->
    <div class="d-flex justify-content-start w-100">
      <img
        v-if="game?.vendorCode !== 'bolton'"
        :src="
          require(`@/assets/logo/companies-game/${game.vendorCode
            .toString()
            .toLowerCase()}Active.png`)
        "
        alt="live-logo"
        class="live-company"
      />
      <div v-if="game?.vendorCode === 'bolton'" style="height: 50px"></div>
    </div>

    <!-- <img
      :src="
        require(`@/assets/logo/companies-game/${game.vendorCode
          .toString()
          .toLowerCase()}Active.png`)
      "
      alt="live-logo"
      class="live-company-hover"
    /> -->

    <img
      :src="
        game?.vendorCode !== 'bolton'
          ? require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)
          : require(`@/assets/PlayG1/logos/lives/bolton.png`)
      "
      alt="live-logo"
      class="live-img"
    />

    <!--    <span class="text-center game-name my-2">{{ game.name }}</span>-->
    <button
      :class="props.disable ? '' : 'disable-item'"
      @click="$emits('handleSelectCasino', game?.vendorCode, game)"
      class="btn btn-join my-2 my-md-3"
    >
      {{ $t("join") }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.item-casino {
  /* min-height: 400px; */
  border-radius: 8px;
  /* border: 1px solid #fafafa; */
  background: linear-gradient(
    219deg,
    rgba(221, 221, 221, 0.5) 0%,
    rgba(252, 250, 250, 0.5) 100%
  );
  padding: 8px 16px;
  border: 1px solid #a6a6a6;

  .btn-join {
    border-radius: 20px;
    border: 1px solid var(--red, #d23449);
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.15);
    padding: 6px 20px;
    color: #de6777;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

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
    height: 180px;
  }

  &:hover {
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
    background-image: url("@/assets/FSCasino/gifs/hover.gif");
    border: 1px solid #fafafa;

    .live-company {
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    .live-company-hover {
      display: block;
    }
    button {
      background-color: #de6777;
      color: #fff;
      border: 1px solid #fff;
    }
  }

  .live-company {
    height: 50px;
    width: 75px;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  .live-company-hover {
    height: 50px;
    display: none;
  }
}

@media (max-width: 768px) {
  .item-casino {
    padding: 5px;
  }
}
</style>
