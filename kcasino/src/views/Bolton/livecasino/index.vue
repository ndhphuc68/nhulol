<script setup>
import Banner from "@/components/Bolton/Banner";
import { Images } from "@/const/Image";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ItemCasino from "@/views/Bolton/livecasino/Components/ItemCasino.vue";
import FilterCompany from "@/views/Bolton/Components/FilterCompany";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
  playGameTOS,
} from "@/api/games/request";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";

const store = useStore();
const { t } = useI18n();

// game.js
// const listGameCasino = computed(() => store.getters.getListGameCasino);
// const listCompanyCasinoView = ref(store.getters.getListGameCasino);

//game2.js
// const listGameCasino = computed(() => store.getters.getListGameCasinoV2);
// const listCompanyCasinoView = ref(store.getters.getListGameCasinoV2);
// const loadingCheck = computed(() => store.state.games2.loadingCheck);

const listGameCasino = computed(
  () => store.getters.getListGameCompanyCasinoBoltonV3
);
const listCompanyCasinoView = ref(
  store.getters.getListGameCompanyCasinoBoltonV3
);

const onWeb = computed(() => store.state.games2.onWeb);
const userInfor = computed(() => store.state.user.userInfor);
const isFilter = ref(false);
// const listGameDetailProviderCasino = computed(
//   () => store.getters.listGameDetailProviderCasinoV2
// );

// const listFillter = ref([]);
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
  const check = listCompanyGame.value.find((e) =>
    e.key.toLowerCase().includes(item.vendorCode.toLowerCase())
  );
  if (check && check.onoff == 1) {
    return true;
  } else {
    return false;
  }
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
      (e) => e.vendorCode === key
    );

    indexOb.value = listGameCasino.value.findIndex((e) => e.vendorCode === key);
  } else {
    companySelect.value = "";
    indexOb.value = null;
    isFilter.value = false;
    listCompanyCasinoView.value = listGameCasino.value;
  }
};

const handleSearchBox = () => {
  // if (searchValue.value) {
  //   listCompanyCasinoView.value = listGameCasino.value.filter((item) =>
  //     item.name.toLowerCase().includes(searchValue.value.toLowerCase())
  //   );
  // } else {
  //   listCompanyCasinoView.value = listGameCasino.value;
  // }
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoView.value = listGameCasino.value.filter(
        (item) =>
          item.vendorName
            .toLowerCase()
            .includes(searchValue.value.toLowerCase()) &&
          item.vendorCode.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoView.value = listGameCasino.value.filter((item) =>
        item.vendorName.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoView.value = listGameCasino.value.filter(
        (e) => e.vendorCode.toString() === companySelect.value.toString()
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
      if (key === "bolton") {
        if (!onWeb.value) {
          if (tab) {
            clearInterval(timer);
            await getWithdrawAllWhenCloseGame({
              gamecode: key,
              memberIdx: userInfor.value.me_idx,
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
        await getWithdrawAllWhenCloseGame({
          gamecode: key,
          memberIdx: userInfor.value.me_idx,
        });
        setTimeout(async () => {
          const res = await playGameTOS();
          if (res.code == 0) {
            await openGamePopup(res.data, "VAG");
            store.commit("handleUpdateOnWeb", false);
          } else {
            await handleShowAlert(res);
          }
        }, 1500);
      } else {
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
            await getWithdrawAllWhenCloseGame({
              gamecode: key,
              memberIdx: userInfor.value.me_idx,
            });
            await handlePlayGame(key, gameKey);
          }
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
  const data = {
    provider_id: key,
  };
  if (
    key === "microgaming_casino" ||
    key === "orientalgame_casino" ||
    key === "vivo_casino"
  ) {
    const ipRes = await fetch("https://jsonip.com/").then((res) => res.json());
    if (ipRes.country != "KR") {
      await store.commit("handleUpdateLoading", false);
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_play_game2"),
      });
      return;
    }
  }
  const res = await store.dispatch("getListGameCompanyActionsV3", data);
  // listFillter.value = listGameDetailProviderCasino.value;
  // const res = listFillter.value.find((e) => e.key === key);
  if (res) {
    if (key === "pragmatic_casino") {
      return 101;
    } else {
      return res[0]?.gameCode && res[0].gameCode;
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
      "getPlayGameSelectV3",
      JSON.stringify(data)
    );
    if (res?.code != 0) {
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      setTimeout(async () => {
        await store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, "KGN");
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
          >
            <!--                    <img-->
            <!--                      v-if="companySelect !== ''"-->
            <!--                      loading="lazy"-->
            <!--                      alt=""-->
            <!--                      class="logo-img"-->
            <!--                      :src="-->
            <!--                        require(`@/assets/PlayG1/logos/companies-game/${-->
            <!--                          companySelect.split('_')[0]-->
            <!--                        }_horizontal.png`)-->
            <!--                      "-->
            <!--                    />-->
            <!--            <img-->
            <!--              v-if="companySelect !== '' && isFilter"-->
            <!--              loading="lazy"-->
            <!--              alt=""-->
            <!--              class="logo-img"-->
            <!--              :src="handleImage(listCompanyCasinoView[0]?.key)"-->
            <!--            />-->
          </div>
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
          <!--          <div-->
          <!--            v-if="loadingCheck"-->
          <!--            style="min-height: 369px"-->
          <!--            class="col-xl-3 col-lg-4 col-6 h-100 mb-4 d-flex align-center justify-center"-->
          <!--          >-->
          <!--            <Loading />-->
          <!--          </div>-->
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
