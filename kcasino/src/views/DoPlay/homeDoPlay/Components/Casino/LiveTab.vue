<template>
  <div class="w-100">
    <div class="v-row mb-4 py-4">
      <div class="v-row title-casino mx-2 px-4 py-4">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="../../../../../assets/PlayG1/icon/slot/casino.png"
          />
          <h4 class="title">{{ $t("casino") }}</h4>
        </div>
        <div class="v-col-12 my-4">
          <div
            class="list-btn-typeGame d-flex justify-center justify-sm-start m-0 w-100"
          >
            <div :key="index" v-for="(item, index) in menuCasino" class="">
              <button
                :class="item.key === typeGamejs && 'btn-change-ui-active'"
                class="btn-change-ui me-2"
                @click="handleChangeGameUI(item.key)"
              >
                {{ item.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ListCompaniesCasino
      :viewChose="companyKey"
      :typeGameJs="typeGamejs"
      :border="props.border"
      :indexPick="parseInt(indexPick)"
      :game="listCompanyCasinoView"
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
            src="../../../../../assets/icon/search.png"
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
        v-for="(game, index) in listCompanyCasinoViewFilter"
      >
        <GameItem
          :index="
            indexOb
              ? parseInt(indexOb.toString())
              : listCompanyCasinoView.findIndex((e) => e.key === game.key)
              ? listCompanyCasinoView.findIndex((e) => e.key === game.key)
              : index
          "
          :disabled="handleCheckGameDisable(game.key)"
          class="card-item h-100"
          :game="game"
          :key="game.key"
          @click="$emit('handleSelectCasino', game.key, game.module)"
        />
      </div>
      <div
        v-if="
          (typeGamejs === 'evolution' && listCompanyCasinoView.length < 1) ||
          (typeGamejs !== 'evolution' && loadingCheck)
        "
        style="min-height: 250px"
        class="v-col-6 v-col-md-3 mb-4 px-2 pt-2 d-flex align-center justify-center"
      >
        <Loading />
      </div>
    </div>
  </div>
</template>
<script setup>
import GameItem from "./LiveItem.vue";
import { useStore } from "vuex";
import { computed, defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { getSldGameRequest } from "@/api/games/request";
import ListCompaniesCasino from "./ListCompaniesCasino.vue";
import Loading from "@/components/EDGames/Loading/index.vue";

const store = useStore();

//game.js
// const listCompanyCasino = ref(computed(() => store.getters.getListGameCasino));
// const listCompanyCasinoView = ref(store.getters.getListGameCasino);

const listGameCasinoV1 = computed(
  () => store.getters.getListGameProviderCasinoGameJs
);

//game2.js
const casinos = computed(() => store.getters.getListGameCasinoV4);
const gameEvolution = computed(() => store.state.games4.gameProviderEvolution);
// const listCompanyCasino = ref(store.getters.getListGameCasinoV4);
const loadingCheck = computed(() => store.state.games4.loadingCheck);

const indexPick = computed(() => casinos.value[0]?.id || 0);

const searchContentCasino = ref("");
const companyKey = ref(null);
const indexOb = ref(null);
const $emit = defineEmits(["handleSelectCasino"]);

const typeGamejs = ref("evolution");

const listCompanyCasinoViewFilter = ref(store.getters.getGameEvolutionV4);
const listCompanyCasinoView = ref(store.getters.getGameEvolutionV4);

const menuCasino = [
  { title: "Evolution", key: "evolution" },
  { title: "Slot Diamond", key: "game2.js" },
  { title: "Kgon", key: "game.js" },
];

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

watch(listGameCasinoV1, (newValue) => {
  if (companyKey.value === "" && typeGamejs.value === "game.js") {
    listCompanyCasinoViewFilter.value = [...newValue];
    listCompanyCasinoView.value = [...newValue];
  }
});

watch(gameEvolution, (newValue) => {
  if (companyKey.value === null && typeGamejs.value === "evolution") {
    listCompanyCasinoView.value = [...newValue];
    listCompanyCasinoViewFilter.value = [...newValue];
  }
});

watch(casinos, (newValue) => {
  if (companyKey.value === null && typeGamejs.value === "game2.js") {
    listCompanyCasinoView.value = [...newValue];
    listCompanyCasinoViewFilter.value = [...newValue];
  }
});

const handleChangeGameUI = (key) => {
  listCompanyCasinoViewFilter.value = [];
  store.commit("handleUpdateCompanySelect", null);
  companyKey.value = null;
  indexOb.value = null;
  switch (key) {
    case "game.js": {
      typeGamejs.value = key;
      listCompanyCasinoViewFilter.value = listGameCasinoV1.value;
      listCompanyCasinoView.value = listGameCasinoV1.value;
      break;
    }
    case "game2.js": {
      typeGamejs.value = key;
      listCompanyCasinoViewFilter.value = casinos.value;
      listCompanyCasinoView.value = casinos.value;
      break;
    }
    case "evolution": {
      typeGamejs.value = key;
      listCompanyCasinoViewFilter.value = gameEvolution.value;
      listCompanyCasinoView.value = gameEvolution.value;
      break;
    }
    default: {
      typeGamejs.value = key;
      listCompanyCasinoViewFilter.value = gameEvolution.value;
      listCompanyCasinoView.value = gameEvolution.value;
      break;
    }
  }
};

onMounted(async () => {
  await getSldGameRequest({ language: "1" });
});

const handleFillterCasino = (key) => {
  if (key) {
    companyKey.value = key.toString();
    store.commit("handleUpdateCompanySelect", key.toString());
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
      (e) => e.key === key
    );
    indexOb.value = listCompanyCasinoView.value.findIndex((e) => e.key === key);
  } else {
    store.commit("handleUpdateCompanySelect", null);
    companyKey.value = null;
    indexOb.value = null;
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
  }
};

const handleSearchBox = () => {
  if (searchContentCasino.value) {
    if (companyKey.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(searchContentCasino.value.toLowerCase()) &&
          item.key.toString() === companyKey.value.toString()
      );
    } else {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(searchContentCasino.value.toLowerCase())
      );
    }
  } else {
    if (companyKey.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (e) => e.key.toString() === companyKey.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
    }
  }
};

const handleCheckGameDisable = (key) => {
  let checkDisable = props.disabledList.find((e) => e === key);
  return !!checkDisable;
};
</script>
<style scoped>
.title-casino {
  background-image: url("../../../../../assets/bgg1.png");
}

.title {
  color: white;
}

.icon-casino {
  width: 90px;
  height: 90px;
  margin-right: 16px;
}

.btn-change-ui {
  color: white;
  padding: 15px;
  width: 150px;
  border-radius: 6px;
  background-color: gray;
}

.btn-change-ui-active {
  color: white;
  padding: 15px;
  width: 150px;
  border-radius: 6px;
  background-color: #e180ea;
}

@media (max-width: 767.98px) {
  .list-btn-typeGame {
    flex-wrap: wrap;
  }

  .list-btn-typeGame div {
    margin-bottom: 5px;
  }
}

@media (max-width: 375px) {
  .btn-change-ui,
  .btn-change-ui-active {
    font-size: 12px;
    padding: 10px 15px;
  }
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

@media (max-width: 280px) {
  .item-casino-list {
    width: 100%;
  }
  .btn-change-ui-active,
  .btn-change-ui {
    padding: 15px 20px;
  }
}
</style>
