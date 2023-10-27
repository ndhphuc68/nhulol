<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";
import { dataGWM, dataHabanero } from "@/utils/datas";
import { useI18n } from "vue-i18n";
import { handleImage } from "@/utils";

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
  if (props.typeCompayGame === "habanero_slot") {
    return dataHabanero.find((e) => e.id === id && e.key === key).image;
  } else if (props.typeCompayGame === "gmw_slot") {
    return dataGWM.find((e) => e.id === id && e.key === key).image;
  } else {
    return null;
  }
};

const handleErrorImage = (e) => {
  e.target.src = handleImage(props.typeCompayGame)
    ? handleImage(props.typeCompayGame)
    : require(`@/assets/logo/companies-game/${props.typeCompayGame
        .toString()
        .toLowerCase()}Active.png`);
  e.target.style.objectFit = "contain";
  return true;
};
</script>

<template>
  <div class="item-game-slot d-flex flex-column justify-center align-center">
    <div class="game-play">
      <div class="group-img position-relative">
        <img
          :src="game.logo"
          @error="handleErrorImage"
          alt="game.name"
          class="game-img"
          loading="lazy"
        />
        <div class="overlay"></div>
      </div>

      <div class="game-name">
        <div class="card-content d-flex flex-column">
          <div class="name-left">
            <span class="title-game mb-3">
              {{ game.name }}
            </span>
          </div>
          <div class="d-flex justify-center">
            <button
              class="button btn-contained"
              @click="$emits('handlePlayGameSlot', game.key)"
            >
              {{ $t("playnow") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-game-slot {
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  border-radius: 6px;

  .game-play {
    overflow: hidden;
    width: 100%;

    .group-img {
      overflow: hidden;
      border-radius: 5px;

      .game-img {
        width: 100%;
        height: 220px;
        object-fit: cover;

        @media (max-width: 468px) {
          height: 140px;
        }
      }

      .overlay {
        display: none;
      }
    }
  }

  &:hover {
    .game-play {
      .group-img {
        .game-img {
          transform: rotate(10deg) scale(1.2);
          transition: transform linear 0.3s;
        }

        .overlay {
          position: absolute;
          display: block;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
    }

    transition: all linear 0.3s;
  }

  .card-content {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    padding: 0.8rem 0;

    .name-left {
      width: 100%;
      text-align: center;
    }

    .button {
      font-size: 0.875rem;
      font-weight: 400;
      padding: 0.5rem;
    }

    .title-game {
      text-overflow: ellipsis;
      display: inline-block;
      overflow: hidden;
      max-width: 98%;
      white-space: nowrap;
      margin: 0;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;

      @media (max-width: 375px) {
        font-size: 12px;
      }
    }

    .title-company {
      display: block;
      color: var(--textSecondPlayG3);
      font-weight: normal;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 768px) {
  .item-game-slot {
    .card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.5rem;

      > div {
        width: 100%;
        text-align: left;
      }

      .title-company {
        margin-bottom: 0;
        text-align: left;
      }
    }
  }
}
</style>
