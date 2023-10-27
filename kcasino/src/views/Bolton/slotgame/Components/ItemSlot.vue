<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { dataGWM, dataHabanero } from "@/utils/datas";
import { useI18n } from "vue-i18n";
import { Icons } from "@/const/Icons";

const t = useI18n();
const lang = ref(t.locale.value);

watch(useI18n().locale, async () => {
  lang.value = t.locale.value;
});

const props = defineProps({
  game: {
    type: Object,
  },
  typeCompayGame: {
    type: String,
    default: "",
  },
});

const $emits = defineEmits(["handlePlayGameSlot"]);

const getImage = (id, key) => {
  if (props.typeCompayGame === "habanero_slot") {
    return dataHabanero.find((e) => e.id === id && e.key === key).image;
  } else if (props.typeCompayGame === "gmw_slot") {
    return dataGWM.find((e) => e.id === id && e.key === key).image;
  } else {
    return null;
  }
};
</script>

<template>
  <div
    class="item-slot w-100 d-flex flex-column justify-center align-items-center"
  >
    <div class="image-frame position-relative d-flex justify-center">
      <img
        :src="game.thumbnail"
        :alt="game.gameTitle"
        class="game-img"
        loading="lazy"
      />
      <div class="over-layout h-100 position-absolute"></div>
      <div
        class="over-layout-play h-100 position-absolute d-flex justify-center align-center"
      >
        <img
          @click="$emits('handlePlayGameSlot', game.gameCode)"
          :src="Icons.play"
          alt="play"
        />
      </div>
    </div>

    <span class="mt-2">{{ game.gameTitle }}</span>
  </div>
</template>

<style scoped lang="scss">
.item-slot {
  padding: 10px;

  .image-frame {
    overflow: hidden;
    width: 180px;
    transition: all 1s ease-in-out;
    @media(max-width: 374px) {
      width: 120px;
    }

    .game-img {
      width: 180px;
      border-radius: 8px;
      height: 180px;
      object-fit: cover;
      @media(max-width: 374px) {
        width: 120px;
        height: auto;
      }
    }

    &:hover {
      .game-img {
        transform: scale(1.05);
        transition: all 1s ease-in-out;
      }

      .over-layout {
        display: block;
      }

      .over-layout-play {
        img {
          display: block;
          cursor: pointer;
        }
      }
    }

    .over-layout {
      display: none;
      top: 0;
      left: 0;
      background-color: black;
      opacity: 0.7;
      z-index: 1;
      width: 180px;
      transition: 3s all;
      @media(max-width: 374px) {
        width: 120px;
      }
    }

    .over-layout-play {
      top: 0;
      left: 0;
      z-index: 2;
      width: 180px;
      border-radius: 8px;
      @media(max-width: 374px) {
        width: 120px;
      }

      img {
        width: 80px;
        height: 80px;
        display: none;
      }
    }
  }

  span {
    color: #545454;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>

