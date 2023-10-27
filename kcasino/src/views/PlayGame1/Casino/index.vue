<template>
  <div class="casino-wrapper">
    <div class="casino-top row justify-content-between">
      <div class="row title-casino p-3">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="../../../assets/PlayGame1/icon/slot/casino.png"
          />
          <h4 class="title">{{ $t("casino") }}</h4>
        </div>
        <!--        <div class="col-12 my-4">
          <div class="row m-0 w-100">
            <div
              :key="index"
              v-for="(item, index) in menuCasino"
              class="col-6 col-md-4 col-lg-2"
            >
              <button
                :class="typeGamejs === item.key && 'btn-change-ui-active'"
                class="btn-change-ui"
                @click="handleChangeGameUI(item.key)"
              >
                {{ item.title }}
              </button>
            </div>
          </div>
        </div>-->
      </div>
      <div class="col-12 my-5">
        <div class="row">
          <div class="col-4 mb-3 col-sm-4 col-md-2">
            <button
              :class="'' === companySelect && 'button-company-active'"
              @click="handleFillterCasino()"
              class="button-company"
            >
              <span class="font-weight-bold">{{ $t("all") }}</span>
            </button>
          </div>
          <div
            class="col-4 mb-3 col-sm-4 col-md-2"
            :key="index"
            v-for="(item, index) in listCompanyCasinoViewFilter.slice(0, 5)"
          >
            <button
              :class="
                handleCheckCompany(item)
                  ? item.vendor_id == companySelect && 'button-company-active'
                  : 'disable-item'
              "
              @click="handleFillterCasino(item.vendor_id)"
              class="button-company"
            >
              <img
                loading="lazy"
                alt="logo"
                :class="
                  item.vendor_id == companySelect
                    ? 'img-logo-header-view'
                    : 'img-logo-header'
                "
                :src="
                  handleImage(item.key)
                    ? handleImage(item.key)
                    : require(`@/assets/logo/companies-game/${item.key
                        .split('_')[0]
                        .toLowerCase()}Active.png`)
                "
              />
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12 logo-img-v1">
        <!--        <img-->
        <!--          v-if="listCompanyCasinoView.length === 1 && isFilter"-->
        <!--          loading="lazy"-->
        <!--          alt=""-->
        <!--          class="logo-img"-->
        <!--          :src="handleImageV1(listCompanyCasinoView[0].key)"-->
        <!--        />-->
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
            @input="handleSearchBox"
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
    <div class="row">
      <div
        v-for="(casino, index) in listCompanyCasinoView"
        :key="index"
        class="col-6 col-sm-6 col-md-4 col-xl-3"
      >
        <CasinoItem
          :type="typeGamejs"
          :index="
            indexOb
              ? parseInt(indexOb.toString())
              : listCompanyCasinoViewFilter.findIndex(
                  (e) => e.key === casino.key
                )
              ? listCompanyCasinoViewFilter.findIndex(
                  (e) => e.key === casino.key
                )
              : index
          "
          @handleSelectCasino="handleSelectCasino"
          :live="casino"
          class="casino-item"
          :class="handleCheckCompany(casino) ? '' : 'disable-item'"
        />
      </div>
    </div>
  </div>
  <FilterCompany
    :type-game="typeGamejs"
    :list-company="listCompanyCasinoViewFilter"
    :companySelect="companySelect"
    v-if="isOpenFilter"
    @handleFillterCasino="handleFillterCasino"
    :handle-toggle="handleToggleFilter"
  />
</template>

<script setup>
import CasinoItem from "@/views/PlayGame1/Components/CasinoItem/index.vue";
import Button from "@/components/PlayGame1/customs/Button/index.vue";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import FilterCompany from "@/views/PlayGame1/Components/FilterCompany/index.vue";
import { useStore } from "vuex";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
} from "@/api/games/request";
import { useI18n } from "vue-i18n";
import { handleImage } from "@/utils";
import {
  gameModule167,
  gameTypeModule167,
} from "@/utils/game/dataGameModule167";

const { t } = useI18n();
const store = useStore();

const gameEvolution = computed(() => store.state.games2.gameProviderEvolution);

const listGameCasinoV1 = computed(
  () => store.getters.getListGameProviderCasinoGameJs
);
const listGameCasino = computed(() => store.getters.getListGameCasinoV2);
const moduleGameKey = computed(() => store.state.games2.module);
// const listCompanyCasinoViewFilter = ref(store.getters.getListGameCasinoV2);
// const listCompanyCasinoView = ref(store.getters.getListGameCasinoV2);

const listCompanyCasinoViewFilter = ref(gameTypeModule167.casino);
const listCompanyCasinoView = ref(gameTypeModule167.casino);

const userInfor = computed(() => store.state.user.userInfor);
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);
const companySelect = ref("");
const disabledList = ref([]);
const isFilter = ref(false);
const loadingCheck = computed(() => store.state.games2.loadingCheck);
const onWeb = computed(() => store.state.games2.onWeb);
const indexOb = ref(null);

// const moduleGame = computed(() => store.state.games.module);
// const listGameDetailProviderCasino = computed(
//   () => store.getters.listGameDetailProviderCasinoV2
// );

const listGameDetailProviderCasino = ref(
  gameModule167.listGameDetailProviderCasino
);

const listGameDetailCasinoLose = computed(
  () => store.getters.listGameDetailProviderCasinoV6
);

watch(listGameDetailCasinoLose, (newvalue) => {
  for (const val of newvalue) {
    let array = listGameDetailProviderCasino.value.find(
      (e) => e.key === val.key
    );
    if (array) {
      array.game = [...array.game, ...val.game];
    } else {
      listGameDetailProviderCasino.value = [
        ...listGameDetailProviderCasino.value,
        ...[val],
      ];
    }
  }
});

const listGameDetailProviderCasinoV1 = computed(
  () => store.getters.getListGameDetailProviderCasinoGameJs
);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
});

const listFillter = ref([]);

const menuCasino = [
  { title: "Evolution", key: "evolution" },
  { title: "Slot Diamond", key: "game2.js" },
];

/*const typeGamejs = ref(store.state.games2.typeGamejs);*/
const typeGamejs = ref("game2.js");

watch(listGameCasino, (newValue) => {
  if (companySelect.value === "" && typeGamejs.value === "game2.js") {
    listCompanyCasinoView.value = [...newValue];
    listCompanyCasinoViewFilter.value = [...newValue];
  }
});

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

// const handleChangeGameUI = (key) => {
//   listCompanyCasinoViewFilter.value = [];
//   switch (key) {
//     case "game.js": {
//       typeGamejs.value = key;
//       listCompanyCasinoViewFilter.value = listGameCasinoV1.value;
//       listCompanyCasinoView.value = listGameCasinoV1.value;
//       break;
//     }
//     case "game2.js": {
//       typeGamejs.value = key;
//       listCompanyCasinoViewFilter.value = listGameCasino.value;
//       listCompanyCasinoView.value = listGameCasino.value;
//       break;
//     }
//     case "evolution": {
//       typeGamejs.value = key;
//       listCompanyCasinoViewFilter.value = gameEvolution.value;
//       listCompanyCasinoView.value = gameEvolution.value;
//       break;
//     }
//     default: {
//       typeGamejs.value = key;
//       listCompanyCasinoViewFilter.value = gameEvolution.value;
//       listCompanyCasinoView.value = gameEvolution.value;
//       break;
//     }
//   }
// };

const handleCheckCompany = (item) => {
  if (item.key === 999999) {
    let checkEvo = listCompanyGame.value?.find(
      (e) => e.key.toString() === "Evolution"
    );
    return !!(checkEvo && checkEvo.onoff === 1);
  } else {
    const check = listCompanyGame.value?.find((e) =>
      e.key
        .toString()
        .toLowerCase()
        .includes(item?.name.toString().toLowerCase())
    );
    return !!(check && check.onoff === 1);
  }
};

let tab = null;
let timer = null;

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleSelectCasino = async (key, item) => {
  if (!handleCheckCompany(item)) {
    return;
  }
  if (store.state.auth.auth) {
    let checkDisable = disabledList.value.find((e) => e === key);
    if (!checkDisable) {
      store.commit("handleUpdateLoading", true);
      const gameKey = await handleSelectGame(key);
      if (gameKey) {
        if (key === "evolution_casino") {
          setTimeout(async () => {
            const res = await getVavagateStartRequest("/game/vag/play");
            if (res.code == 0) {
              await openGamePopup(res.data, "VAG");
            } else {
              await handleShowAlert(res);
            }
          }, 3000);
        } else {
          await handlePlayGame(key, gameKey);
        }
      }
    }
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleSelectGame = async (key) => {
  if (!onWeb.value) {
    if (tab) {
      clearInterval(timer);
      await getWithdrawAllWhenCloseGame({
        gamecode: key,
        memberIdx: userInfor.value.me_idx,
        module: moduleGameKey.value,
      });
      tab?.window.close();
      tab = null;
    } else {
      let config =
        "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1, height=1, top=0,left=0";
      let check = window.open("", "popupId", config);
      check.close();
    }
  }
  store.commit("handleUpdateOnWeb", false);
  // const data = {
  //   provider_id: key,
  // };
  // if (
  //   key === "microgaming_casino" ||
  //   key === "orientalgame_casino" ||
  //   key === "vivo_casino"
  // ) {
  //   const ipRes = await fetch("https://jsonip.com/").then((res) => res.json());
  //   if (ipRes.country != "KR") {
  //     await store.commit("handleUpdateLoading", false);
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_play_game2"),
  //     });
  //     return;
  //   }
  // }
  // const res = await store.dispatch("getListGameCompanyActions", data);
  if (typeGamejs.value === "game.js") {
    listFillter.value = listGameDetailProviderCasinoV1.value;
  } else {
    listFillter.value = listGameDetailProviderCasino.value;
  }
  const res = listFillter.value.find((e) => e.key == key);
  if (res) {
    if (key === "pragmatic_casino") {
      return 101;
    } else {
      // return res.game[0]?.key ?? res.game[0].key;
      switch (key) {
        case "2": {
          return "3368";
        }
        case "34": {
          return "7215";
        }
        case "41": {
          return "8121";
        }
        case "18": {
          return "3363";
        }
        case "29": {
          return "6883";
        }
        case "22": {
          return "6055";
        }
        case "33": {
          return "7144";
        }
        case "25": {
          return "6528";
        }
        case "9": {
          return "4832";
        }
        default: {
          return res.game[0].key;
        }
      }
    }
  } else {
    store.commit("handleUpdateLoading", false);
    await store.dispatch("showAlert", {
      type: "error",
      message: t("error_vendor"),
    });
    return null;
  }
};

const handlePlayGame = async (key, gameKey) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: key === 999999 ? 0 : 1,
    };
    /*if (key === 'pragmatic_slot') {
      const ipRes = await fetch('https://jsonip.com/').then(res => res.json());
      if (ipRes.country != 'KR') {
        await store.commit("handleUpdateLoading", false);
        await store.dispatch("showAlert", {
          type: "error",
          message: t("error_play_game2"),
        });
        return;
      }
    }*/
    const res = await store.dispatch("getPlayGameSelect", JSON.stringify(data));
    if (res?.code != 0) {
      store.commit("handleUpdateModuleGame", key === 999999 ? 0 : 1);
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      store.commit("handleUpdateModule", key === 999999 ? 0 : 1);
      setTimeout(async () => {
        await store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, key);
      }, 1000);
    }
  }, 1000);
};

const openGamePopup = async (res, key) => {
  if (res?.length > 0) {
    store.commit("handleUpdateLoading", false);
    let config =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
    tab = window.open(res.replace(/['"]+/g, ""), "popupId", config);
    if (!tab) {
      await getWithdrawAllWhenCloseGame({
        gamecode: key,
        memberIdx: userInfor.value.me_idx,
        module: key === 999999 ? 0 : 1,
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
          module: key === 999999 ? 0 : 1,
        });
        tab = null;
      }
    }, 100);
  }
};

const handleShowAlert = async (res) => {
  await store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res.code}`),
  });
};

const handleSearchBox = () => {
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoView.value = listCompanyCasinoViewFilter.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
          item.key.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoView.value = listCompanyCasinoViewFilter.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoView.value = listCompanyCasinoViewFilter.value.filter(
        (e) => e.key.toString() === companySelect.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoView.value = listCompanyCasinoViewFilter.value;
    }
  }
};

const handleFillterCasino = (key) => {
  if (key) {
    isFilter.value = true;
    companySelect.value = key.toString();
    listCompanyCasinoView.value = listCompanyCasinoViewFilter.value.filter(
      (e) => e.vendor_id === key
    );
    indexOb.value = listCompanyCasinoViewFilter.value.findIndex(
      (e) => e.vendor_id === key
    );
  } else {
    indexOb.value = null;
    isFilter.value = false;
    companySelect.value = "";
    listCompanyCasinoView.value = listCompanyCasinoViewFilter.value;
  }
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};
</script>

<style scoped lang="scss">
.logo-img {
  width: 300px;
  height: 100px;
}

.logo-img-v1 {
  width: fit-content;
}

.casino-top {
  margin-bottom: 48px;

  .title-casino {
    background-image: url("../../../assets/bgg1.png");

    .btn-change-ui {
      color: white;
      padding: 15px 30px;
      border-radius: 6px;
      background-color: gray !important;
    }

    .btn-change-ui-active {
      color: white;
      padding: 15px 30px;
      border-radius: 6px;
      background-color: blue !important;
    }
  }

  .button-company-active {
    border: 1px solid var(--primaryPlayG1);
    border-radius: 8px;
  }

  .button-company {
    width: 100%;
    padding: 10px 10px;
    height: 80px;
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
      height: 100%;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    .img-logo-header {
      width: 100%;
      height: 100%;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }
  }

  .icon-casino {
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

.casino-item {
  overflow: hidden;
  margin: 10px 0;
}

.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
</style>
