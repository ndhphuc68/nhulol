<template>
  <div
    class="item-game-slot w-100 d-flex flex-column justify-center align-center"
  >
    <img loading="lazy" class="game-img" :alt="game.key" :src="game.image" />
    <span class="text-center mt-2">{{
      lang === "ko" ? game.names.ko : game.names.en
    }}</span>
  </div>
</template>
<script setup>
import { defineProps, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { dataGWM, dataHabanero } from "@/utils/datas";

const t = useI18n();
const lang = ref(t.locale.value);

watch(useI18n().locale, async () => {
  lang.value = t.locale.value;
});

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
</script>
<style scoped>
.item-game-slot img {
  border-radius: 5px;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.item-game-slot:hover img {
  transform: rotate(5deg);
}

.item-game-slot span {
  font-weight: bold;
}
@media (max-width: 1024px) {
  .item-game-slot img {
    height: 90px;
  }
  .item-game-slot span {
    font-size: 12px;
  }
}
</style>
