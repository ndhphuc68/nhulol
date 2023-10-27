<script setup>
import {defineProps,defineEmits} from 'vue'
import {dataGWM, dataHabanero} from "@/utils/SCCasino/datas";
import {useI18n} from "vue-i18n";
import {Icons} from "@/const/SCCasino/Icons";

const t = useI18n()
const lang = t.locale.value

const props = defineProps({
  game: {
    type: Object,
  },
  typeCompayGame: {
    type: String,
    default: ""
  }
})

const $emits = defineEmits(["handlePlayGameSlot"])

const getImage = (id, key) => {
  if (props.typeCompayGame === "habanero_slot") {
    return dataHabanero.find(e => e.id === id && e.key === key).image
  } else if (props.typeCompayGame === "gmw_slot") {
    return dataGWM.find(e => e.id === id && e.key === key).image
  } else {
    return null
  }
}
</script>

<template>
  <div class="item-slot w-100 d-flex flex-column justify-center align-items-center">
    <div class="image-frame position-relative d-flex justify-center">
      <img
          :src="getImage(game.id,game.key)
         ? getImage(game.id,game.key): game.image"
          alt="game.name"
          class="game-img"
          loading="lazy"
      />
      <div class="over-layout h-100 position-absolute">
      </div>
      <div class="over-layout-play h-100  position-absolute d-flex justify-center align-center">
        <img @click="$emits('handlePlayGameSlot',game.key)" :src="Icons.play" alt="play">
      </div>
    </div>
    <span class="mt-2">{{ lang === 'ko' ? game.names.ko : game.names.en }}</span>
  </div>
</template>

<style scoped lang="scss">
.item-slot {
  padding: 10px;

  .image-frame {
    overflow: hidden;
    width: 180px;

    .game-img {
      width: 180px;
      border-radius: 8px;
      height: 150px;
      object-fit: cover;
    }

    &:hover {
      .game-img {
        transform: scale(1.3);
        transition: 3s;
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
      border-radius: 8px;
    }

    .over-layout-play {
      top: 0;
      left: 0;
      z-index: 2;
      width: 180px;
      border-radius: 8px;

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
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}

</style>