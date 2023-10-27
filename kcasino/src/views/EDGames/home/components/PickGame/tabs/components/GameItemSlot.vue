<template>
  <div
    class="item-game-slot w-100 d-flex flex-column justify-center align-center"
  >
    <img
      loading="lazy"
      @error="handleErrorImage"
      class="game-img"
      :alt="game?.name"
      :src="game?.logo"
    />
    <span class="text-center mt-2">{{ game.name }}</span>
  </div>
</template>
<script setup>
import { computed, defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { dataGWM, dataHabanero } from "@/utils/datas";
import { handleImage } from "@/utils";
import { useStore } from "vuex";

const t = useI18n();
const lang = ref(t.locale.value);
const store = useStore();
watch(useI18n().locale, async () => {
  lang.value = t.locale.value;
});

const gameKey = computed(() => store.state.games5.gameKey);

const props = defineProps({
  game: {
    type: Object,
    required: true,
    default: () => {},
  },
  typeCompayGame: {
    type: String,
    default: -1,
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
  e.target.src = handleImage(gameKey.value.key)
    ? handleImage(gameKey.value.key)
    : require(`@/assets/logo/companies-game/${gameKey.value.key
        .toString()
        .toLowerCase()}Active.png`);
  e.target.style.objectFit = "contain";
  return true;
};
</script>
<style scoped>
.item-game-slot img {
  border-radius: 5px;
  width: 100%;
  height: 150px;
}

.item-game-slot:hover img {
  transform: rotate(5deg);
}

.item-game-slot span {
  font-weight: bold;
  font-size: 16px;
}

@media (max-width: 375px) {
  .item-game-slot span {
    font-size: 12px;
  }
  .item-game-slot img {
    height: 110px;
  }
}
</style>
