<script setup>
import { computed, onMounted, ref, watch, defineEmits } from "vue";
import ItemSlots from "@/views/SCCasino/Home/PickGame/Slots/Component/ItemSlots.vue";
import FilterCompany from "@/views/SCCasino/Home/Component/FilterCompany";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
// import { handleImage } from "@/utils";
import Loading from "@/components/EDGames/Loading/index.vue";
// import Button from "@/components/PlayG1/customs/Button/index.vue";

const { t } = useI18n();
const store = useStore();

const gameKey = computed(() => store.state.games4.gameKey);
const slotgames = ref(store.getters.getListGameSlotV4);

const slotGameV4 = computed(() => store.getters.getListGameSlotV4);
const slotGameV1 = computed(() => store.getters.getListGameProviderSlotGameJs);

const listGameDetailProviderSlot = computed(
  () => store.getters.listGameDetailProviderSlotV4
);

const menuCasino = [
  { title: "Slot Diamond", key: "game2.js" },
  { title: "Kgon", key: "game.js" },
];

const typeGamejs = ref("game2.js");

const listFillter = ref([]);
const game_modals = ref([]);
const displayGame = ref([]);
const searchValue = ref("");
const indexPickCompany = ref(0);

const isLoading = ref(false);

const $emit = defineEmits(["handlePlayGameSlot"]);

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
      if (slotgames.value.length > 0) {
        handleSelectGame(slotgames.value[0]);
      }
      break;
    }
  }
};

watch(useI18n().locale, async () => {
  await handleSelectGame(gameKey.value);
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

const handlePlayGame = async (key) => {
  if (store.state.auth.auth) {
    store.commit("handleUpdateLoading", true);
    $emit("handlePlayGameSlot", key);
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleSelectGame = async (key) => {
  isLoading.value = true;
  store.commit("handleUpdateGameKeyV4", key);
  displayGame.value = [];
  game_modals.value = [];

  let res = null;
  if (typeGamejs.value === "game2.js") {
    listFillter.value = listGameDetailProviderSlot.value;
    res = listGameDetailProviderSlot.value.find((e) => e.key === key.key);
  } else {
    const data = {
      provider_id: key.key,
      module: 2,
    };
    res = await store.dispatch("getListGameCompanyActionsV4", data);
    if (res?.games) {
      listFillter.value = res?.games.value;
    }
  }

  if (res) {
    if (key.module === 2) {
      showAllSlots.value = false;
      game_modals.value = [...res];
      displayGame.value = [...res];
    } else {
      showAllSlots.value = false;
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
  isLoading.value = false;
};

const showAllSlots = ref(false);

const displayedSlots = computed(() => {
  return showAllSlots.value
    ? displayGame.value
    : displayGame.value.slice(0, 10);
});

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter(
      (item) =>
        item.names.ko.includes(searchValue.value) ||
        item.names.en.toLowerCase().includes(searchValue.value)
    ),
  ];
};

const handleUpdateIndexPickCompany = (index) => {
  indexPickCompany.value = index;
};
</script>

<template>
  <div class="container slot-main">
    <div class="py-4">
      <div class="title-casino p-3">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="../../../../../assets/PlayG1/icon/slot/slot.png"
          />
          <h4 class="title">{{ $t("slots") }}</h4>
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
        @handleFillter="handleSelectGame"
        :listCompany="slotgames.slice(12)"
        :listCompanyHeader="slotgames.slice(0, 12)"
        :casino="false"
        @handleUpdateIndexPickCompany="handleUpdateIndexPickCompany"
      />
    </div>
    <div class="col-12 mt-4">
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
              @input="handleChangeSearch"
            ></v-text-field>
          </v-card-text>
        </div>
      </div>
      <div class="row mt-3 w-100 m-0">
        <div
          :key="index"
          class="item-slot h-100 mb-3 p-2 px-3 py-3"
          v-for="(game, index) in displayedSlots"
        >
          <ItemSlots
            @handlePlayGame="handlePlayGame"
            :game="game"
            :type-compay-game="gameKey.key"
          />
        </div>
        <div v-if="isLoading" class="col-12 my-5">
          <Loading />
        </div>
      </div>
    </div>
    <div v-if="displayedSlots.length > 0" class="my-5 d-flex justify-center">
      <button
        v-if="!showAllSlots"
        @click="showAllSlots = true"
        class="primary-button btn-load"
      >
        {{ $t("loadMore") }}
      </button>
      <button
        v-else
        @click="showAllSlots = false"
        class="primary-button btn-less"
      >
        {{ $t("showLess") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-group {
  position: relative;

  .filter-box {
    position: absolute;
    top: -60px;
    right: 0;

    .input-search {
      padding: 1rem 1rem 1rem 0;
    }
  }

  .current-filter {
    text-align: left;

    .logo-img {
      width: 180px;
      margin: 1rem 0;
    }
  }

  .btn-paging {
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    color: #a1a1aa;

    &.active {
      color: var(--textG2Casino);
    }
  }

  .btn-filter {
    .filter-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .filter-text {
      color: var(--text);
    }
  }
}

.slot-main {
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
        padding: 15px;
        width: 150px;
        border-radius: 6px;
        background-color: #40a1ff;

        @media (max-width: 375px) {
          font-size: 12px;
          padding: 10px 15px;
        }
      }
    }
  }

  .item-slot {
    width: 20%;

    @media (max-width: 1300px) {
      width: 33%;
    }

    @media (max-width: 767.98px) {
      width: 50%;
    }

    @media (max-width: 541px) {
      width: 100%;
    }
  }

  .logo-img {
    width: 300px;
    height: 100px;
    @media (max-width: 541px) {
      width: 100%;
    }
  }
}

.btn-load,
.btn-less {
  background-color: #fff;
  border: 1px solid #0189ff;
  color: #0189ff;
}
</style>
