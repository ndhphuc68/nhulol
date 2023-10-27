<script setup>
import Banner from "@/components/FSCasino/Banner";
import { Images } from "@/const/Image";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ItemCasino from "@/views/FSCasino/livecasino/Components/ItemCasino.vue";
import FilterCompany from "@/views/FSCasino/Components/FilterCompany";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
} from "@/api/games/request";
import Loading from "@/components/EDGames/Loading/index.vue";
import { gameModule6, gameTypeModule6 } from "@/utils/game/dataGameList";

const store = useStore();
const { t } = useI18n();
const loadingCheck = computed(() => store.state.games2.loadingCheck);
const listGameCasino = ref(gameTypeModule6.casino);
const listCompanyCasinoView = ref(gameTypeModule6.casino);

const onWeb = computed(() => store.state.games2.onWeb);
const userInfor = computed(() => store.state.user.userInfor);
const isFilter = ref(false);
// const listGameDetailProviderCasino = computed(
//   () => store.getters.listGameDetailProviderCasinoV5
// );

const listGameDetailProviderCasino = ref(
  gameModule6.listGameDetailProviderCasino
);

const listGameDetailCasinoLose = computed(
  () => store.getters.listGameDetailProviderCasinoV5
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

const indexOb = ref(null);

watch(listGameCasino, (val) => {
  if (companySelect.value === "") {
    listCompanyCasinoView.value = [...val];
  }
});

const companySelect = ref("");
const searchValue = ref("");
const disabledList = ref([]);

let tab = null;
let timer = null;

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

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleFillterCasino = (key) => {
  // if (key) {
  //   companySelect.value = key;
  //   listCompanyCasinoView.value = listGameCasino.value.filter(
  //     (e) => e.key.split("_")[0] === key.split("_")[0]
  //   );
  // } else {
  //   companySelect.value = "";
  //   listCompanyCasinoView.value = listGameCasino.value;
  // }

  if (key) {
    companySelect.value = key.toString();
    isFilter.value = true;
    listCompanyCasinoView.value = listGameCasino.value.filter(
      (e) => e.key === key
    );

    indexOb.value = listGameCasino.value.findIndex((e) => e.key === key);
  } else {
    companySelect.value = "";
    indexOb.value = null;
    isFilter.value = false;
    listCompanyCasinoView.value = listGameCasino.value;
  }
};

const handleSearchBox = () => {
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoView.value = listGameCasino.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
          item.key.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoView.value = listGameCasino.value.filter((item) =>
        item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoView.value = listGameCasino.value.filter(
        (e) => e.key.toString() === companySelect.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoView.value = listGameCasino.value;
    }
  }
};

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
        module: key === 999999 ? 0 : 6,
      });
      tab?.window.close();
      tab = null;
      store.commit("handleUpdateOnWeb", true);
    } else {
      let config =
        "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
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
  //     store.commit("handleUpdateLoading", false);
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_play_game2"),
  //     });
  //     return;
  //   }
  // }
  // const res = await store.dispatch("getListGameCompanyActionsV3", data);
  // listFillter.value = listGameDetailProviderCasino.value;
  const res = listGameDetailProviderCasino.value.find((e) => e.key === key);
  if (res) {
    if (key === "pragmatic_casino") {
      return 101;
    } else {
      return res?.game[0]?.key && res?.game[0]?.key;
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
      module: key === 999999 ? 0 : 6,
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
    const res = await store.dispatch(
      "getPlayGameSelectV5",
      JSON.stringify(data)
    );
    if (res?.code != 0) {
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      setTimeout(async () => {
        store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, key);
      }, 500);
    }
  }, 1500);
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
        module: key === 999999 ? 0 : 6,
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
          module: key === 999999 ? 0 : 6,
        });
        tab = null;
        store.commit("handleUpdateOnWeb", true);
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
</script>

<template>
  <Banner :image="Images.bannerLiveCasino" :title="'Live Casino'" />
  <div class="container live-main">
    <div class="row mt-4">
      <FilterCompany
        @handleFillter="handleFillterCasino"
        :company-select="companySelect"
        :listCompany="listGameCasino.slice(5)"
        :listCompanyHeader="listGameCasino.slice(0, 5)"
      />
      <div class="col-12 mt-2">
        <div class="row">
          <div
            class="col-xl-7 col-md-6 col-12 mb-3 mb-md-0 d-flex align-center justify-center"
          ></div>
          <div class="col-xl-5 col-md-6 col-12 d-flex justify-end">
            <v-card-text>
              <v-text-field
                :label="$t('search')"
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
        <!-- <div class="row mt-4"> -->
        <div class="item-casino-list mb-5">
          <div
            :key="index"
            class="h-100"
            v-for="(item, index) in listCompanyCasinoView"
          >
            <ItemCasino
              :disable="handleCheckCompany(item)"
              :class="handleCheckCompany(item) ? '' : 'disable-item'"
              :index="indexOb ? parseInt(indexOb.toString()) : index"
              :game="item"
              @handleSelectCasino="handleSelectCasino"
            />
          </div>
          <div
            v-if="loadingCheck"
            style="min-height: 369px"
            class="h-100 d-flex align-items-center"
          >
            <Loading />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.live-main {
  .logo-img {
    width: 300px;
    height: 100px;
  }

  .item-casino-list {
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 15px));
    grid-gap: 20px;

    @media (max-width: 991.98px) {
      grid-template-columns: repeat(3, calc(33% - 8.5px));
      grid-gap: 16px;
    }
    @media (max-width: 575.98px) {
      grid-template-columns: repeat(2, calc(50% - 5px));
      grid-gap: 10px;
    }
  }
}
</style>
