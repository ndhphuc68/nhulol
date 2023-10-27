<template>
  <div class="w-100">
    <div class="v-row mb-4 py-4">
      <div class="v-row title-casino mx-2 px-4 py-4">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="../../../../../assets/PlayG1/icon/slot/slot.png"
          />
          <h4 class="title">{{ $t("slot") }}</h4>
        </div>
        <div class="v-col-12 my-4">
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
    <ListCompanies
      :indexPick="gameKey?.key"
      :game="slotgames"
      :handleUpdatePickIndexGame="(index) => (indexPickCompany = index)"
    />
    <div class="v-row mb-3 pl-3 pr-3" style="margin: 0">
      <div class="v-col-12 v-col-md-6 logo-com d-flex justify-center"></div>
      <div class="v-col-12 v-col-md-6">
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
            v-model="searchContent"
            @input="handleChangeSearch"
          />
        </div>
      </div>
    </div>
    <Loading v-if="isLoading" />
    <div
      v-if="!isLoading"
      class="d-flex align-start flex-row flex-wrap mt-5 pl-2 pr-2"
      style="margin: 0"
    >
      <div
        class="game-slot d-flex align-start px-3 py-3"
        :key="game.id"
        v-for="game in displayGame"
      >
        <GameItemSlot
          class="card-item"
          :typeCompayGame="indexPick.toString()"
          :game="game"
          :key="game.id"
          @click="handlePlayGame(game.key)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch, defineEmits } from "vue";
import { useStore } from "vuex";
import GameItemSlot from "./GameItemSlot.vue";
import Loading from "@/components/EDGames/Loading/index.vue";
import ListCompanies from "./ListCompanies.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const slotGameV4 = computed(() => store.getters.getListGameSlotV4);
const slotGameV1 = computed(() => store.getters.getListGameProviderSlotGameJs);
const slotgames = ref(store.getters.getListGameSlotV4);

const isLoading = ref(false);
const game_modals = ref([]);
const displayGame = ref([]);
const searchContent = ref("");
const gameKey = computed(() => store.state.games4.gameKey);
const indexPick = ref(0);
const listGameDetailProviderSlot = computed(
  () => store.getters.listGameDetailProviderSlotV4
);

const menuCasino = [
  { title: "Slot Diamond", key: "game2.js" },
  { title: "Kgon", key: "game.js" },
];

const typeGamejs = ref("game2.js");

const listFillter = ref([]);
const $emit = defineEmits(["click"]);
const indexPickCompany = ref(0);

const handleChangeGameUI = (key) => {
  slotgames.value = [];
  displayGame.value = [];
  store.commit("handleUpdateCompanySelect", null);
  switch (key) {
    case "game.js": {
      typeGamejs.value = key;
      slotgames.value = slotGameV1.value;
      if (slotGameV1.value.length > 0) {
        handleSelectGame(slotgames.value[0]);
      }
      break;
    }
    case "game2.js": {
      typeGamejs.value = key;
      slotgames.value = slotGameV4.value;
      if (slotgames.value.length > 0) {
        handleSelectGame(slotgames.value[0]);
      }
      break;
    }
    default: {
      typeGamejs.value = key;
      slotgames.value = slotGameV4.value;
      if (slotgames.value.length > 0 && !gameKey.value) {
        handleSelectGame(slotgames.value[0]);
      }
      break;
    }
  }
};

watch(slotGameV1, (newValue) => {
  if (typeGamejs.value === "game.js") {
    slotgames.value = [...newValue];
    if (newValue.length > 0 && !gameKey.value) {
      handleSelectGame(newValue[0]);
    }
  }
});

watch(slotGameV4, (newValue) => {
  if (typeGamejs.value === "game2.js") {
    slotgames.value = [...newValue];
    if (newValue.length > 0 && !gameKey.value) {
      handleSelectGame(newValue[0]);
    }
  }
});

watch(gameKey, async (value) => {
  if (value) {
    await handleSelectGame(value);
  }
});

onMounted(async () => {
  if (gameKey.value) {
    await handleSelectGame(gameKey.value);
  }
});

const handleSelectGame = async (key) => {
  store.commit("handleUpdateGameKeyV4", key);
  displayGame.value = [];
  game_modals.value = [];

  let res = null;
  if (typeGamejs.value === "game2.js") {
    listFillter.value = listGameDetailProviderSlot.value;
    res = listGameDetailProviderSlot.value.find((e) => e.key === key.key);
  } else {
    isLoading.value = true;
    const data = {
      provider_id: key.key,
      module: 2,
    };
    res = await store.dispatch("getListGameCompanyActionsV4", data);
    if (res?.games) {
      listFillter.value = res?.games.value;
    }
    isLoading.value = false;
  }

  if (res) {
    if (key.module === 2) {
      game_modals.value = [...res];
      displayGame.value = [...res];
    } else {
      game_modals.value = [...res.game];
      displayGame.value = [...res.game];
    }
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("error_vendor"),
    });
    game_modals.value = [];
    displayGame.value = [];
  }
  // store.commit("handleUpdateLoading", false);
};

const handlePlayGame = async (key) => {
  if (store.state.auth.auth) {
    store.commit("handleUpdateLoading", true);
    $emit("handlePlayGameSlot", key);
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter(
      (item) =>
        item.names.ko.includes(searchContent.value) ||
        item.names.en.toLowerCase().includes(searchContent.value)
    ),
  ];
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

.card-item {
  cursor: pointer;
}

.logo-com img {
  width: 300px;
  height: 100px;
}

.card-item:hover {
  transform: scale(1.03);
  opacity: 0.6;
  transition: all 0.3s ease;
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

.search-icon {
  width: 23px;
  height: 23px;
}

.game-slot {
  width: 20%;
}

@media (max-width: 991.98px) {
  .game-slot {
    width: 25%;
  }
}

@media (max-width: 767.98px) {
  .game-slot {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .card-item {
    width: 100%;
  }
}

@media (max-width: 280px) {
  .btn-change-ui-active,
  .btn-change-ui {
    padding: 15px 20px;
  }
}
</style>
