<template>
  <div class="item-game-slot d-flex flex-column justify-center align-center">
    <div class="game-play position-relative">
      <img
        :src="
          getImage(game.id, game.key)
            ? getImage(game.id, game.key)
            : game.image
            ? game.image
            : game.logo
        "
        :alt="game.key"
        class="game-img"
      />
      <div class="overlay"></div>
      <button @click="$emits('handlePlayGameSlot', game.key)" class="btn-play">
        <img
          alt="icon-play"
          class="icon-play"
          src="@/assets/PlayG1/icon/slot/play.png"
        />
        <span class="name-play">{{ $t("play") }}</span>
      </button>
    </div>
    <span class="game-title text-center mt-2">{{
      game?.module === 6
        ? game?.name
        : lang === "ko"
        ? game.names.ko
        : game.names.en
    }}</span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { dataGWM, dataHabanero } from "@/utils/datas";
import { useI18n } from "vue-i18n";

const $emits = defineEmits(["handlePlayGameSlot"]);

const t = useI18n();
const lang = ref(t.locale.value);

watch(useI18n().locale, async () => {
  lang.value = t.locale.value;
});
const props = defineProps({
  game: Object,
  typeCompayGame: {
    type: String,
    default: "",
  },
});

const getImage = (id, key) => {
  // if (props.typeCompayGame === "habanero_slot") {
  //   return dataHabanero.find((e) => e.id === id && e.key === key).image;
  // } else if (props.typeCompayGame === "gmw_slot") {
  //   return dataGWM.find((e) => e.id === id && e.key === key).image;
  // } else {
  return null;
  // }
};
</script>
<style lang="scss" scoped>
.item-game-slot {
  .game-play {
    overflow: hidden;
    height: 150px;

    @media (max-width: 600px) {
      height: 120px;
    }

    .game-img {
      border-radius: 5px;
      height: 150px;
      object-fit: cover;

      @media (max-width: 600px) {
        height: 120px;
      }
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
}
.game-title {
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
</style>
