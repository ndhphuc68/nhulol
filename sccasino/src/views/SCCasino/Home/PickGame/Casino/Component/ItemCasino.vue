<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  game: {
    type: Object,
  },
});

const $emits = defineEmits(["handleSelectCasino"]);
</script>

<template>
  <div class="item-casino d-flex flex-column justify-center align-items-center">

    <img
        :src="require(`@/assets/SCCasino/logos/lives/${game?.key}_1.png`)"
        alt="live-logo"
        class="live-img"
    />
    <button
        @click="$emits('handleSelectCasino', game?.key)"
        class="btn btn-join"
    >
      <div class="">
        <h4>{{ $t('game_name_live') }}</h4>
        <span>{{ $t('game_number_join') }}</span>
      </div>
      <img
          :src="
        require(`@/assets/SCCasino/logos/live-companies/${
          game?.key.split('_')[0]
        }.png`)
      "
          alt="live-logo"
          class="live-company"
      />
      <img
          :src="
        require(`@/assets/SCCasino/logos/live-companies/${
          game?.key.split('_')[0]
        }Active.png`)
      "
          alt="live-logo"
          class="live-company-hover"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.item-casino {
  border-radius: 8px;
  border: 1px solid #fafafa;
  background: linear-gradient(
          219deg,
          rgba(221, 221, 221, 0.5) 0%,
          rgba(252, 250, 250, 0.5) 100%
  );
  padding: 8px 16px;

  .btn-join {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: .5rem 0;
    border: 0;

    h4{
      font-size: 1rem;
      font-weight: bold;
      text-align: left;
    }

    span{
      display: flex;
      align-items: center;

      &:before{
        content: "";
        width: 8px;
        height: 8px;
        display: block;
        background-color: #38E33E;
        border-radius: 100%;
        margin-right: 5px;
      }
    }
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
    width: 197px;
    height: 220px;
  }

  &:hover {
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
    background-image: url("@/assets/SCCasino/gifs/hover.gif");

    .live-company {
      display: none;
    }

    .live-company-hover {
      display: block;
    }
  }

  .live-company {
    height: 30px;
  }

  .live-company-hover {
    height: 30px;
    display: none;
  }
}
</style>