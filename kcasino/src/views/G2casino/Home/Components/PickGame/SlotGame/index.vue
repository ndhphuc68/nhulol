<script setup>
import { computed, onMounted, ref, defineEmits, watch } from "vue";
import SlotGameItem from "@/views/G2casino/Home/Components/PickGame/SlotGame/SlotGameItem";
import FilterCompany from "@/views/G2casino/Home/Components/PickGame/Components/FilterCompany";
import Button from "@/components/G2casino/Custom/Button";
import Loading from "@/components/EDGames/Loading/index.vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { handleImage } from "@/utils";

const $emits = defineEmits(["handleSelectCasino", "handlePlayGameSlot"]);

const router = useRouter();
const store = useStore();
const { t } = useI18n();

const loadingCheck = computed(() => store.state.games4.loadingCheck);
const gameKey = computed(() => store.state.games4.gameKey);

const slotGameV4 = computed(() => store.getters.getListGameSlotV4);
const slotGameV1 = computed(() => store.getters.getListGameProviderSlotGameJs);

const slotgames = ref(store.getters.getListGameSlotV4);

const listGameDetailProviderSlot = computed(
  () => store.getters.listGameDetailProviderSlotV4
);

const listFillter = ref([]);
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);

const game_modals = ref([]);
const displayGame = ref([]);
const indexPickCompany = ref(0);

const typeGamejs = ref("game2.js");

const menuCasino = [
  { title: "Slot Diamond", key: "game2.js" },
  { title: "Kgon", key: "game.js" },
];

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

const handleUpdateIndexPickCompany = (index) => {
  indexPickCompany.value = index;
};
const handlePlayGameSlotItem = (key) => {
  if (store.state.auth.auth) {
    store.commit("handleUpdateLoading", true);
    $emits("handlePlayGameSlot", key);
  } else {
    router.push({ name: "Login" });
  }
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

const handleSelectGame = async (key) => {
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

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter(
      (item) =>
        item.names.ko.includes(searchValue.value) ||
        item.names.en.toLowerCase().includes(searchValue.value)
    ),
  ];
};
</script>

<template>
  <div class="filter-group">
    <div class="row title-casino my-3 p-3">
      <div class="d-flex align-center col-12">
        <img
          alt="icon"
          class="icon-casino"
          src="../../../../../../assets/PlayG1/icon/slot/slot.png"
        />
        <h4 class="title">{{ $t("slot") }}</h4>
      </div>
      <div class="col-12 my-4 p-0">
        <div
          class="list-btn-typeGame d-flex flex-row justify-content-center justify-content-md-start m-0 w-100"
        >
          <div
            :key="index"
            v-for="(item, index) in menuCasino"
            class="me-2 p-0"
          >
            <button
              :class="item.key === typeGamejs && 'btn-change-ui-active'"
              class="btn-change-ui"
              @click="handleChangeGameUI(item.key)"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 my-5">
      <div class="row">
        <div
          class="col-4 mb-4 col-sm-3 col-md-2"
          :key="index"
          v-for="(item, index) in slotgames?.slice(0, 12)"
        >
          <button
            @click="handleSelectGame(item)"
            :class="item.key === gameKey.key && 'button-company-active'"
            class="button-company"
          >
            <img
              loading="lazy"
              alt="logo"
              :class="
                item.key === gameKey.key
                  ? 'img-logo-header-view'
                  : 'img-logo-header'
              "
              :src="
                handleImage(item?.key)
                  ? handleImage(item?.key)
                  : require(`@/assets/logo/companies-game/${
                      item.key.split('_')[0]
                    }Active.png`)
              "
            />
          </button>
        </div>
        <div
          v-if="slotgames?.length < 12"
          class="col-4 d-flex align-center justify-content-center mb-4 col-sm-3 col-md-2"
        >
          <button disabled class="button-company">
            <Loading />
          </button>
        </div>
      </div>
    </div>
    <div
      class="my-3 current-filter d-flex justify-content-lg-between justify-center flex-column-reverse flex-lg-row"
    >
      <div class="d-flex justify-center"></div>
      <div class="filter-box col-lg-6 col-sm-12 d-flex align-center">
        <v-text-field
          class="input-search"
          :label="$t('search')"
          :loading="loading"
          v-model="searchValue"
          append-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          single-line
          variant="solo"
          @input="handleChangeSearch"
        ></v-text-field>
        <Button @click="handleToggleFilter" class="btn-filter">
          <div class="d-flex align-center">
            <img
              alt="filter"
              class="filter-icon"
              src="@/assets/G2casino/icon/commons/filter.png"
            />
            <span class="filter-text">{{ $t("filter") }}</span>
          </div>
        </Button>
      </div>
    </div>
  </div>

  <div class="w-100 d-flex flex-wrap">
    <div
      v-for="(game, index) in displayGame"
      :key="index"
      class="game-slot d-flex px-2 py-2"
    >
      <SlotGameItem
        class="w-100"
        @handlePlayGameSlotItem="handlePlayGameSlotItem"
        :game="game"
        :type-compay-game="gameKey.key"
      />
    </div>
    <div v-if="displayGame.length === 0" class="col-12 d-flex my-4">
      <Loading />
    </div>
  </div>
  <FilterCompany
    :casino="false"
    :company-select="gameKey.key"
    :list-company="slotgames"
    v-if="isOpenFilter"
    :handle-toggle="handleToggleFilter"
    @handleSelectGame="handleSelectGame"
    @handleUpdateIndexPickCompany="handleUpdateIndexPickCompany"
  />
</template>

<style scoped lang="scss">
.game-slot {
  width: 20%;

  @media (max-width: 1024px) {
    width: 33.33%;
  }

  @media (max-width: 767.98px) {
    width: 50%;
  }

  .row {
    margin-right: 0 !important;
  }
}

.filter-group {
  position: relative;

  .title-casino {
    background-image: url("../../../../../../assets/bgg1.png");

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
        background-color: blue;

        @media (max-width: 375px) {
          font-size: 12px;
          padding: 10px 15px;
        }
      }
    }
  }

  .button-company-active {
    border: 1px solid var(--primaryPlayG1);
    border-radius: 8px;
  }

  .button-company {
    width: 100%;
    padding: 10px 20px;
    @media (max-width: 375px) {
      padding: 3px 3px;
      height: 60px;
    }

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      border-radius: 8px;

      .img-logo-header {
        width: 110px;
        height: 60px;
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }

    .img-logo-header-view {
      width: 110px;
      height: 60px;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    .img-logo-header {
      width: 110px;
      height: 60px;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }
  }

  .filter-box {
    .input-search {
      padding: 1rem 1rem 1rem 0;
    }
  }

  .current-filter {
    text-align: left;

    .logo-img {
      width: 280px;
      height: 100px;
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

@media (max-width: 992px) {
  .filter-group {
    .filter-box {
      position: static;
    }
  }
}
</style>
