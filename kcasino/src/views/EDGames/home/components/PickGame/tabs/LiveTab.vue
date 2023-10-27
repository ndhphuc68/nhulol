<template>
  <div class="w-100">
    <ListCompaniesCasino
      :border="props.border"
      :indexPick="indexPick"
      :game="listCompanyCasino"
      @handleFillterCasino="handleFillterCasino"
    />
    <div class="v-row mt-3 mb-3">
      <div
        class="v-col-12 v-col-md-6 d-flex justify-center align-center logo-com"
      ></div>
      <div class="v-col-12 v-col-md-6 d-flex align-center">
        <div class="search-box w-100 w-md-75 ml-4 mr-4">
          <img
            alt="search-icon"
            class="search-icon"
            src="@/assets/icon/search.png"
          />
          <input
            type="text"
            :placeholder="$t('search')"
            id="search-game"
            v-model="searchContentCasino"
            @input="handleSearchBox"
          />
        </div>
      </div>
    </div>
    <div class="v-row mt-5 pl-3 pr-3" style="margin: 0">
      <div
        class="item-casino-list mb-4 px-2 pt-2"
        :key="game.key"
        v-for="(game, index) in listCompanyCasinoView"
      >
        <GameItem
          :class="handleCheckCompany(game) ? '' : 'disable-item'"
          :index="
            indexOb
              ? parseInt(indexOb.toString())
              : listCompanyCasino.findIndex((e) => e.key === game.key)
              ? listCompanyCasino.findIndex((e) => e.key === game.key)
              : index
          "
          class="card-item h-100"
          :game="game"
          :key="game.key"
          @click="
            $emit('handleSelectCasino', game.key, handleCheckCompany(game))
          "
        />
      </div>
      <div
        v-if="loadingCheck"
        style="min-height: 320px"
        class="v-col-6 v-col-md-3 mb-4 px-2 pt-2 d-flex justify-center align-center"
      >
        <Loading />
      </div>
    </div>
  </div>
</template>
<script setup>
import GameItem from "./components/GameItem";
import { useStore } from "vuex";
import { computed, defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { getSldGameRequest } from "@/api/games/request";
import ListCompaniesCasino from "@/views/EDGames/home/components/PickGame/tabs/components/ListCompaniesCasino.vue";
import Loading from "@/components/EDGames/Loading/index.vue";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));
const loadingCheck = computed(() => store.state.games2.loadingCheck);
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

const listCompanyCasino = computed(() => store.getters.getListGameCasinoV5);
const listCompanyCasinoView = ref(store.getters.getListGameCasinoV5);

const indexPick = computed(() => listCompanyCasino.value[0]?.id || 0);

const searchContentCasino = ref("");
const companyKey = ref(null);

const indexOb = ref(null);

const $emit = defineEmits(["handleSelectCasino"]);

const props = defineProps({
  disabledList: {
    type: Array,
    default: () => [],
  },
  border: {
    type: String,
    default: "item-active",
  },
});

watch(listCompanyCasino, (newValue) => {
  if (!companyKey.value) {
    listCompanyCasinoView.value = [...newValue];
  }
});

onMounted(async () => {
  await getSldGameRequest({ language: "1" });
});

const handleFillterCasino = (key) => {
  if (key) {
    companyKey.value = key.toString();
    listCompanyCasinoView.value = listCompanyCasino.value.filter(
      (e) => e.key === key
    );
    indexOb.value = listCompanyCasino.value.findIndex((e) => e.key === key);
  } else {
    companyKey.value = "";
    indexOb.value = null;
    listCompanyCasinoView.value = listCompanyCasino.value;
  }
};

const handleSearchBox = () => {
  if (searchContentCasino.value) {
    if (companyKey.value) {
      listCompanyCasinoView.value = listCompanyCasino.value.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(searchContentCasino.value.toLowerCase()) &&
          item.name.toString() === companyKey.value.toString()
      );
    } else {
      listCompanyCasinoView.value = listCompanyCasino.value.filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchContentCasino.value.toLowerCase())
      );
    }
  } else {
    if (companyKey.value) {
      listCompanyCasinoView.value = listCompanyCasino.value.filter(
        (e) => e.name.toString() === companyKey.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoView.value = listCompanyCasino.value;
    }
  }
};
</script>
<style scoped>
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.search-box {
  display: flex;
  border-bottom: 1.5px solid var(--text-second);
  padding: 10px;
  height: 50px;
}

.search-box input {
  color: #000;
  font-size: 18px;
}

.logo-com img {
  width: 300px;
  height: 100px;
}

@media (max-width: 768px) {
  .card-item {
    width: 100%;
  }
}

.item-casino-list {
  width: 20%;
}

@media (max-width: 991.98px) {
  .item-casino-list {
    width: 33%;
  }
}

@media (max-width: 575.98px) {
  .item-casino-list {
    width: 50%;
  }
}
</style>
