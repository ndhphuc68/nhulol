<template>
  <div class="slot-wrapper">
    <div class="slot-top row justify-content-between">
      <div class="row title-slot p-3">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-slot"
            src="../../../assets/PlayGame1/icon/slot/slot.png"
          />
          <h4 class="title">{{ $t("slot") }}</h4>
        </div>
      </div>

      <div class="col-12 my-5">
        <div class="row">
          <div
            class="col-4 mb-4 col-sm-3 col-md-2 px-1 px-sm-2"
            :key="index"
            v-for="(item, index) in listCompanySlot.slice(0, 12)"
          >
            <button
              @click="handleSelectGame(item.key)"
              :class="
                handleCheckCompany(item)
                  ? typeGamejs === 'game.js' && item.key === gameKeyV1
                    ? 'button-company-active'
                    : item.key === gameKey.key
                    ? 'button-company-active'
                    : ''
                  : 'disable-item'
              "
              class="button-company"
            >
              <img
                loading="lazy"
                alt="logo"
                :class="
                  typeGamejs === 'game.js' && item.key === gameKeyV1
                    ? 'img-logo-header-view'
                    : item.key === gameKey.key
                    ? 'img-logo-header-view'
                    : 'img-logo-header'
                "
                :src="
                  handleImage(item.key)
                    ? handleImage(item.key)
                    : require(`@/assets/logo/home2/${
                        item.key.toString().toLowerCase().split('_')[0]
                      }_activated.png`)
                "
              />
            </button>
          </div>
          <div
            v-if="listCompanySlot.length <= 11"
            class="col-4 d-flex align-center justify-content-center mb-4 col-sm-3 col-md-2"
          >
            <button disabled class="button-company">
              <Loading />
            </button>
          </div>
        </div>
      </div>
      <div
        class="col-lg-6 col-12 d-flex justify-content-center logo-img-v1 my-3"
      >
        <img
          v-if="handleCheckCompany(gameKey)"
          class="logo-img"
          alt="logo"
          :src="
            typeGamejs === 'game.js'
              ? require(`@/assets/PlayGame1/logos/companies-game/${
                  gameKeyV1.toString().toLowerCase().split('_')[0]
                }_activated.png`)
              : handleImage(gameKey?.key)
          "
        />
      </div>
      <div class="col-lg-6 col-sm-12 d-flex align-center">
        <v-card-text class="px-0 py-0 me-2">
          <v-text-field
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
        </v-card-text>
        <Button @click="handleToggleFilter">
          <div class="d-flex align-center">
            <img
              alt="filter"
              class="filter-icon"
              src="../../../assets/PlayGame1/icon/commons/filter.png"
            />
            <span class="filter-text">{{ $t("filter") }}</span>
          </div>
        </Button>
      </div>
    </div>

    <div class="row w-100">
      <div v-if="loadingSlot" class="col-12 my-4">
        <Loading />
      </div>
      <div
        v-for="(game, index) in displayGame"
        :key="index"
        class="item-slot"
        :class="checkGameHide(game) ? ' px-1 py-1 px-sm-3 py-sm-3' : 'd-none'"
      >
        <GameItem
          @handlePlayGameSlot="handlePlayGameSlot"
          :game="game"
          :type-compay-game="gameKey?.key.toString()"
          class="slot-item"
        />
      </div>
    </div>
  </div>
  <FilterCompany
    :casino="false"
    :company-select="typeGamejs === 'game.js' ? gameKeyV1 : gameKey?.key"
    :list-company="listCompanySlot"
    v-if="isOpenFilter"
    :handle-toggle="handleToggleFilter"
    @handleSelectGame="handleSelectGame"
  />
</template>

<script setup>
import GameItem from "@/views/PlayGame1/Components/GameItem/index.vue";
import Button from "@/components/PlayGame1/customs/Button/index.vue";
import FilterCompany from "@/views/PlayGame1/Components/FilterCompany/index.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { getWithdrawAllWhenCloseGame } from "@/api/games/request";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";
import {
  gameModule117,
  gameTypeModule17,
} from "@/utils/game/dataGameModule1vs7";

const { t } = useI18n();
const store = useStore();

// const listCompanySlotV1 = computed(() => store.getters.getListGameSlotV2);
// const listCompanySlotV2 = computed(
//   () => store.getters.getListGameProviderSlotGameJs
// );

const moduleGameKey = computed(() => store.state.games2.module);

const gameKey = computed(() => store.state.games6.gameKey);

// const gameKeyV1 = computed(() => store.state.games.gameKey);

const gameKeyV1 = ref(gameTypeModule17.slot[0].key);

// const listGameDetailProviderSlot = computed(
//   () => store.getters.listGameDetailProviderSlotV2
// );

const listGameDetailProviderSlotV2 = computed(
  () => store.getters.getListGameDetailProviderSlotGameJs
);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
  handleSelectGame(gameKey.value.key);
});

// const listCompanySlot = ref(store.getters.getListGameSlotV2);

const listCompanySlot = ref(gameTypeModule17.slot);

const userInfor = computed(() => store.state.user.userInfor);
const onWeb = computed(() => store.state.games2.onWeb);

const disabledList = ref([]);
const loading = ref(false);
const isOpenFilter = ref(false);
const searchValue = ref("");
const game_modals = ref([]);
const displayGame = ref([]);
const loadingSlot = ref(true);

const listFillter = ref([]);

const listGameDetailSlotLose = computed(
  () => store.getters.listGameDetailProviderSlotV6
);

const listGameDetailProviderSlot = ref(
  gameModule117.listGameDetailProviderSlot
);

watch(listGameDetailSlotLose, (newvalue) => {
  for (const val of newvalue) {
    let array = listGameDetailProviderSlot.value.find((e) => e.key === val.key);
    if (array) {
      array.game = [...array.game, ...val.game];
    } else {
      listGameDetailProviderSlot.value = [
        ...listGameDetailProviderSlot.value,
        ...[val],
      ];
    }
  }
  handleSelectGame(gameKey.value.key);
});

// const menuCasino = [{ title: "Slot Diamond", key: "game2.js" }];

const handleCheckCompany = (item) => {
  if (item) {
    if (item.key === 999999) {
      let checkEvo = listCompanyGame.value?.find(
        (e) => e.key.toString() === "Evolution"
      );
      return !!(checkEvo && checkEvo.onoff === 1);
    }
    if (item.key === 999991) {
      let checkPra = listCompanyGame.value?.find(
        (e) => e.key.toString() === "Pragmatic Play"
      );
      return !!(checkPra && checkPra.onoff === 1);
    }
    const check = listCompanyGame.value?.find(
      (e) =>
        e.key
          .toString()
          .toLowerCase()
          .includes(item?.name.toString().toLowerCase()) ||
        e.key
          .toString()
          .toLowerCase()
          .includes(item?.key.toString().toLowerCase())
    );
    return !!(check && check.onoff === 1);
  }
  return false;
};

const typeGamejs = ref("game2.js");

watch(gameKey, async (value) => {
  let check = true;
  let index = 0;
  let key = value;
  while (check) {
    const checkObject = listCompanySlot.value.find((e) => e.key === key.key);
    if (checkObject) {
      if (!handleCheckCompany(checkObject)) {
        if (!listCompanySlot.value[index]) {
          check = false;
          key = null;
        } else {
          key = listCompanySlot.value[index];
          index++;
        }
      } else {
        check = false;
      }
    }
  }
  if (key) {
    await handleSelectGame(key.key);
  } else {
    loadingSlot.value = false;
  }
});

// watch(gameKeyV1, async (value) => {
//   if (typeGamejs.value === "game.js") {
//     await handleSelectGame(value);
//   }
// });

// watch(listCompanySlotV1, (value) => {
//   if (typeGamejs.value === "game2.js") {
//     listCompanySlot.value = value;
//   }
// });
//
// watch(listCompanySlotV2, (value) => {
//   if (typeGamejs.value === "game.js") {
//     if (!gameKeyV1.value) {
//       store.commit("handleUpdateGameKey", value[0].key);
//     }
//     listCompanySlot.value = value;
//   }
// });

onMounted(async () => {
  store.commit("handleUpdateOnWeb", false);
  if (gameKey.value) {
    let check = true;
    let index = 0;
    let key = gameKey.value;
    while (check) {
      const checkObject = listCompanySlot.value.find((e) => e.key === key.key);
      if (checkObject) {
        if (!handleCheckCompany(checkObject)) {
          if (!listCompanySlot.value[index]) {
            check = false;
            key = null;
          } else {
            key = listCompanySlot.value[index];
            index++;
          }
        } else {
          check = false;
        }
      }
    }
    if (key) {
      await handleSelectGame(key.key);
    } else {
      loadingSlot.value = false;
    }
  }
});

// const handleChangeGameUI = (key) => {
//   listCompanySlot.value = [];
//   switch (key) {
//     case "game.js": {
//       typeGamejs.value = key;
//       game_modals.value = [];
//       displayGame.value = [];
//       if (listCompanySlotV2.value.length > 0) {
//         store.commit("handleUpdateGameKey", listCompanySlotV2.value[0].key);
//       }
//       listCompanySlot.value = listCompanySlotV2.value;
//       if (gameKeyV1.value) {
//         handleSelectGame(gameKeyV1.value);
//       }

//       break;
//     }
//     case "game2.js": {
//       typeGamejs.value = key;
//       game_modals.value = [];
//       displayGame.value = [];
//       listCompanySlot.value = listCompanySlotV1.value;
//       if (gameKey.value) {
//         handleSelectGame(gameKey.value.key);
//       }
//       break;
//     }
//   }
// };

let tab = null;
let timer = null;

watch(useI18n().locale, async () => {
  await handleSelectGame(gameKey.value.key);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handlePlayGameSlot = async (key) => {
  if (store.state.auth.auth) {
    store.commit("handleUpdateLoading", true);
    if (!onWeb.value) {
      if (tab) {
        clearInterval(timer);
        await getWithdrawAllWhenCloseGame({
          gamecode: "KGN",
          memberIdx: userInfor.value.me_idx,
          module: key === 999999 ? 0 : moduleGameKey.value,
        });
        tab?.window.close();
        tab = null;
      } else {
        let config =
          "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
        let check = window.open("", "popupId", config);
        check.close();
      }
    }
    store.commit("handleUpdateOnWeb", false);
    await handlePlayGame(gameKey.value, key);
  } else {
    store.commit("handleToggle", "login");
  }
};

const handlePlayGame = async (key, game) => {
  setTimeout(async () => {
    const data = {
      provider_id:
        typeGamejs.value === "game.js" ? gameKeyV1.value : gameKey.value.key,
      game_id: game,
      module: key.key === 999999 ? 0 : gameKey.value.module,
    };
    const res = await store.dispatch("getPlayGameSelect", JSON.stringify(data));
    if (res?.code != 0) {
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      store.commit("handleUpdateModule", gameKey.value.module);
      setTimeout(async () => {
        store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, key.key, gameKey.value.module);
      }, 1000);
    }
  }, 1000);
};

const openGamePopup = async (res, key, module) => {
  if (res?.length > 0) {
    store.commit("handleUpdateLoading", false);
    let config =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
    tab = window.open(res.replace(/['"]+/g, ""), "popupId", config);
    if (!tab) {
      await getWithdrawAllWhenCloseGame({
        gamecode: key,
        memberIdx: userInfor.value.me_idx,
        module: key === 999999 ? 0 : module,
      });
      await store.dispatch("showAlert", {
        type: "error",
        message: t(`blockbr`),
      });
      return;
    }
    timer = setInterval(async function () {
      if (tab?.closed) {
        clearInterval(timer);
        await getWithdrawAllWhenCloseGame({
          gamecode: key,
          memberIdx: userInfor.value.me_idx,
          module: key === 999999 ? 0 : module,
        });
        store.commit("handleUpdateOnWeb", false);
        tab = null;
      }
    }, 100);
  }
};

const handleShowAlert = async (res) => {
  store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res.code}`),
  });
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

const checkGameHide = (game) => {
  return true;
  // if (game.names.type === "casino" || game.names.type === "Live Casino") {
  //   return false;
  // } else {
  //   return true;
  // }
  // const check = dataHide.find((e) => e === key);
  // return !check;
};

const handleSelectGame = async (key) => {
  let gameSelect = listCompanySlot.value.find(
    (e) => e.key.toString() === key.toString()
  );
  loadingSlot.value = true;
  displayGame.value = [];
  game_modals.value = [];
  if (gameSelect) {
    if (!handleCheckCompany(gameSelect)) {
      loadingSlot.value = false;
      return;
    }
    // if (typeGamejs.value === "game2.js") {
    store.commit("handleUpdateGameKeyV6", gameSelect);
    listFillter.value = listGameDetailProviderSlot.value;
    // } else {
    //   store.commit("handleUpdateGameKey", gameSelect.key);
    //   listFillter.value = listGameDetailProviderSlotV2.value;
    // }

    const res = listFillter.value.find((e) => e.key === key);
    if (res) {
      game_modals.value = [...res.game];
      displayGame.value = [...res.game];
    } else {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_vendor"),
      });
      game_modals.value = [];
      displayGame.value = [];
    }
    // store.commit("handleUpdateLoading", false);
    loadingSlot.value = false;
  }
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter(
      (item) =>
        item.names.ko.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        item.names.en.toLowerCase().includes(searchValue.value.toLowerCase())
    ),
  ];
};
</script>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.logo-img {
  width: 300px;
  height: 100px;
}

.item-slot {
  width: 20%;
}

@media (max-width: 991.98px) {
  .item-slot {
    width: 25%;
  }
}

@media (max-width: 767.98px) {
  .item-slot {
    width: 33.33%;
  }
}

@media (max-width: 600px) {
  .item-slot {
    width: 50%;
  }
}

.slot-top {
  margin-bottom: 48px;

  .title-slot {
    background-image: url("../../../assets/bgg1.png");
    border-radius: 10px;

    .btn-change-ui {
      color: white;
      padding: 20px 30px;
      border-radius: 6px;
      background-color: blue;
    }
  }

  .button-company-active {
    border: 1px solid var(--primaryPlayG1);
    border-radius: 8px;
  }

  .button-company {
    width: 100%;
    padding: 10px 10px;
    @media (max-width: 375px) {
      padding: 3px 3px;
      height: 60px;
    }

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      border-radius: 8px;

      .img-logo-header {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }

    .img-logo-header-view {
      width: 100%;
      height: 70px;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
      @media (max-width: 375px) {
        height: auto;
      }
    }

    .img-logo-header {
      width: 100%;
      height: 70px;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
      @media (max-width: 375px) {
        height: auto;
      }
    }
  }

  .icon-slot {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  .title {
    margin: 0;
    font-size: 2.5rem;
    color: white;
  }

  .filter-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .filter-text {
    color: var(--text);
  }
}

.slot-item {
  overflow: hidden;
  margin: 10px 0;
}

.row {
  margin: 0;
  padding: 0;
}
</style>
