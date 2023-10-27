<template>
  <section class="">
    <div class="container">
      <div class="text-start">
        <img src="@/assets/FSCasino/icons/live-casino.png" alt="live-casino" />
        <span class="title-section">{{ $t("live") }}</span>
      </div>
      <!-- <div class="row mt-5 list-live justify-content-evenly"> -->
      <div class="list-item">
        <LiveCasinoItem
          :class="handleCheckCompany(item) ? '' : 'disable-item'"
          v-for="(item, index) in listGameCasino.slice(0, 6)"
          :key="item.id"
          :liveItem="item"
          :index="index"
          :disable="handleCheckCompany(item)"
        />
        <div
          v-if="listGameCasino.length < 6"
          style="min-height: 300px"
          class="col-5 me-1 col-sm-4 col-lg-2 mb-4 pt-2 pb-3 h-100 d-flex flex-column justify-content-between align-items-center"
        >
          <Loading />
        </div>
      </div>
      <div class="my-4 d-flex justify-center">
        <button @click="router.push('/casino')" class="primary-button">
          {{ $t("seeMore") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import LiveCasinoItem from "./LiveCasinoItem.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "@/components/EDGames/Loading/index.vue";
import { gameTypeModule6 } from "@/utils/game/dataGameList";

const router = useRouter();
const store = useStore();
const listGameCasino = ref(gameTypeModule6.casino);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
});

const handleCheckCompany = (item) => {
  if (item.key === 999999) {
    let checkEvo = listCompanyGame.value?.find(
      (e) => e.key.toString() === "Evolution"
    );
    return !!(checkEvo && checkEvo.onoff === 1);
  }
  const check = listCompanyGame.value?.find((e) =>
    e.key.toString().toLowerCase().includes(item?.key.toString().toLowerCase())
  );
  return !!(check && check.onoff === 1);
};
</script>

<style scoped lang="scss">
section {
  background: url("@/assets/FSCasino/bg-live-casino.png") no-repeat;
  background-size: 100% auto;

  .container {
    padding: 2rem 0;
  }
}

.text-start {
  align-items: center;
}

.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}

.list-item {
  display: grid;
  grid-gap: 28px;
  grid-template-columns: repeat(6, calc(16.6666% - 23.5px));
}

@media (max-width: 992px) {
  .list-item {
    grid-template-columns: repeat(3, calc(33% - 8.5px));
    grid-gap: 16px;
  }
}

@media (max-width: 768px) {
  .list-item {
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-gap: 10px;
    padding: 0 10px;
  }

  .slots-title {
    padding-left: 10px;
  }
}
</style>
