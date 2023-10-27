<script setup>
import { defineEmits, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import ItemCasino from "@/views/SCCasino/Home/PickGame/Casino/Component/ItemCasino.vue";
import FilterCompany from "@/views/SCCasino/Home/Component/FilterCompany";
import Loading from "@/components/EDGames/Loading/index.vue";

const store = useStore();
const casinos = computed(() => store.getters.getListGameCasinoV4);
const gameEvolution = computed(() => store.state.games4.gameProviderEvolution);

const listGameCasinoV1 = computed(
  () => store.getters.getListGameProviderCasinoGameJs
);

const showAllCasinos = ref(false);
// const listCompanyCasinoView = ref(casinos.value);
const companySelect = ref("");
const searchValue = ref("");
const loadingCheck = computed(() => store.state.games4.loadingCheck);
const indexOb = ref(null);

const listCompanyCasinoViewFilter = ref(store.getters.getGameEvolutionV4);
const listCompanyCasinoView = ref(store.getters.getGameEvolutionV4);

const typeGamejs = ref("evolution");

watch(listGameCasinoV1, (newValue) => {
  if (companySelect.value === "" && typeGamejs.value === "game.js") {
    listCompanyCasinoViewFilter.value = [...newValue];
    listCompanyCasinoView.value = [...newValue];
  }
});

watch(gameEvolution, (newValue) => {
  if (companySelect.value === "" && typeGamejs.value === "evolution") {
    listCompanyCasinoViewFilter.value = [...newValue];
    listCompanyCasinoView.value = [...newValue];
  }
});

watch(casinos, (newValue) => {
  if (companySelect.value === "" && typeGamejs.value === "game2.js") {
    listCompanyCasinoView.value = [...newValue];
    listCompanyCasinoViewFilter.value = [...newValue];
  }
});

const handleChangeGameUI = (key) => {
  listCompanyCasinoViewFilter.value = [];
  listCompanyCasinoView.value = [];
  indexOb.value = null;
  store.commit("handleUpdateCompanySelect", null);
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

const menuCasino = [
  { title: "Evolution", key: "evolution" },
  { title: "Slot Diamond", key: "game2.js" },
  { title: "Kgon", key: "game.js" },
];

const $emit = defineEmits(["handleSelectCasino"]);

const handleFillterCasino = (key) => {
  if (key) {
    companySelect.value = key.toString();
    store.commit("handleUpdateCompanySelect", key.toString());
    // isFilter.value = true;
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
      (e) => e.key === key
    );
    indexOb.value = listCompanyCasinoView.value.findIndex((e) => e.key === key);
  } else {
    store.commit("handleUpdateCompanySelect", null);
    companySelect.value = "";
    indexOb.value = null;
    // isFilter.value = false;
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
  }
};

const displayedCasinos = computed(() => {
  return showAllCasinos.value
    ? listCompanyCasinoViewFilter.value
    : listCompanyCasinoViewFilter.value.slice(0, 10);
});

const handleSearchBox = () => {
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
          item.key.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (e) => e.key.toString() === companySelect.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
    }
  }
};
</script>

<template>
  <div class="container live-main">
    <div class="py-4">
      <div class="title-casino p-3">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="@/assets/PlayG1/icon/slot/casino.png"
          />
          <h4 class="title">{{ $t("casino") }}</h4>
        </div>
        <div class="col-12 my-4">
          <div
            class="list-btn-typeGame d-flex justify-center justify-md-start m-0 w-100"
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
    <div class="row mt-4">
      <FilterCompany
        :typeGameJs="typeGamejs"
        @handleFillter="handleFillterCasino"
        :listCompany="listCompanyCasinoView.slice(5)"
        :listCompanyHeader="listCompanyCasinoView.slice(0, 5)"
      />
      <div class="col-12 mt-2">
        <div class="row">
          <div
            class="col-xl-7 col-md-6 col-12 mb-3 mb-md-0 d-flex align-center justify-center"
          ></div>
          <div class="col-xl-5 col-md-6 col-12 d-flex justify-end">
            <v-card-text>
              <v-text-field
                :label="$t('searchingFor')"
                v-model="searchValue"
                append-inner-icon="mdi-magnify"
                density="compact"
                hide-details
                single-line
                variant="solo"
                @input="handleSearchBox"
              ></v-text-field>
            </v-card-text>
          </div>
        </div>
        <div class="row mt-4">
          <div
            :key="index"
            class="item-casino-list h-100 mb-4"
            v-for="(item, index) in displayedCasinos"
          >
            <ItemCasino
              :index="
                indexOb
                  ? parseInt(indexOb.toString())
                  : listCompanyCasinoView.findIndex((e) => e.key === item.key)
                  ? listCompanyCasinoView.findIndex((e) => e.key === item.key)
                  : index
              "
              @click="$emit('handleSelectCasino', item.key, item.module)"
              :game="item"
            />
          </div>
          <div
            v-if="
              (typeGamejs === 'evolution' &&
                loadingCheck &&
                listCompanyCasinoViewFilter.length < 1 &&
                !showAllCasinos) ||
              (typeGamejs !== 'evolution' &&
                listCompanyCasinoViewFilter.length < 10 &&
                !showAllCasinos)
            "
            style="min-height: 326px"
            class="col-xxl-2 col-xl-4 col-lg-6 col-12 h-100 mb-4 d-flex align-center justify-center"
          >
            <Loading />
          </div>
          <div
            v-else-if="loadingCheck && showAllCasinos"
            style="min-height: 326px"
            class="col-xxl-2 col-xl-4 col-lg-6 col-12 h-100 mb-4 d-flex align-center justify-center"
          >
            <Loading />
          </div>
        </div>
      </div>
      <div
        class="my-5 d-flex justify-center"
        v-if="typeGamejs !== 'evolution' && listCompanyCasinoView.length > 1"
      >
        <button
          v-if="!showAllCasinos"
          @click="showAllCasinos = true"
          class="primary-button btn-load"
        >
          {{ $t("loadMore") }}
        </button>
        <button
          v-else
          @click="showAllCasinos = false"
          class="primary-button btn-less"
        >
          {{ $t("showLess") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.live-main {
  .title-casino {
    background-image: url("@/assets/bgg1.png");

    .title {
      color: white;
    }

    .icon-casino {
      width: 48px;
      height: 48px;
      margin-right: 16px;
    }

    .list-btn-typeGame {
      @media (max-width: 767.98px) {
        flex-wrap: wrap;
        // flex-direction: column;
      }

      div {
        @media (max-width: 767.98px) {
          margin-bottom: 5px;
        }
      }

      .btn-change-ui {
        color: white;
        padding: 15px;
        width: 150px;
        border-radius: 6px;
        background-color: gray;

        @media (max-width: 375px) {
          font-size: 12px;
          padding: 10px 15px;
        }
      }

      .btn-change-ui-active {
        color: white;
        width: 150px;
        padding: 15px;
        border-radius: 6px;
        background-color: #40a1ff;
        
        @media (max-width: 375px) {
          font-size: 12px;
          padding: 10px 15px;
        }
      }
    }
  }

  .logo-img {
    width: 300px;
    height: 100px;
  }

  .btn-load,
  .btn-less {
    background-color: #fff;
    border: 1px solid #0189ff;
    color: #0189ff;
  }

  .item-casino-list {
    width: 20%;
    @media (max-width: 1199.98px) {
      width: 33%;
    }
    @media (max-width: 575.98px) {
      width: 50%;
    }
  }
}
</style>
<style>
.v-card-text .v-field.v-field--appended .v-field__field {
  width: 100%;
}
</style>
