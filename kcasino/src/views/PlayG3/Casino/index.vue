<script setup>
import { ref, watch, computed, onBeforeUnmount } from "vue";
import CasinoItem from "./CasinoItem.vue";
import FilterCompany from "@/components/PlayG3/FilterCompany";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { handleImage } from "@/utils";
import Loading from "@/components/EDGames/Loading/index.vue";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
  playGameTOS,
} from "@/api/games/request";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
const store = useStore();

const casinos = computed(() => store.getters.getListGameCasinoV5);
const listCompanyCasinoView = ref(store.getters.getListGameCasinoV5);
const listGameDetailProviderCasino = computed(
  () => store.getters.listGameDetailProviderCasinoV5
);

const userInfor = computed(() => store.state.user.userInfor);
const companySelect = ref("");
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);
const disabledList = ref([]);
const indexOb = ref(null);
const loadingCheck = computed(() => store.state.games2.loadingCheck);
const onWeb = computed(() => store.state.games2.onWeb);

// const listFillter = ref([]);

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

watch(casinos, (value) => {
  if (companySelect.value === "") {
    listCompanyCasinoView.value = [...value];
  }
});

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
      await store.commit("handleUpdateLoading", true);
      if (key === "bolton") {
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
          module: key === 999999 ? 0 : 6,
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
              module: key === 999999 ? 0 : 6,
            });
            await handlePlayGame(key, gameKey);
          }
        }
      }
    }
  } else {
    router.push("/login");
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
  //     await store.commit("handleUpdateLoading", false);
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
    await store.commit("handleUpdateLoading", false);
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
        await store.commit("handleUpdateLoading", false);
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

const handleSearchBox = () => {
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoView.value = casinos.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
          item.key.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoView.value = casinos.value.filter((item) =>
        item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoView.value = casinos.value.filter(
        (e) => e.key.toString() === companySelect.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoView.value = casinos.value;
    }
  }
};

const handleFilterCasino = (key) => {
  if (key) {
    companySelect.value = key;
    listCompanyCasinoView.value = casinos.value.filter((e) => e.key === key);
    indexOb.value = casinos.value.findIndex((e) => e.key === key);
  } else {
    // isFilter.value = false;
    indexOb.value = null;
    companySelect.value = "";
    listCompanyCasinoView.value = casinos.value;
  }
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};
</script>

<template>
  <div class="container">
    <div class="head-tab">
      <div class="d-flex">
        <h4 class="title">
          {{ $t("casino") }}
        </h4>
        <h4 class="title">
          &nbsp;/&nbsp;<router-link to="/slot">{{ $t("slot") }}</router-link>
        </h4>
      </div>
      <div class="row my-4 w-100">
        <div class="col-4 mb-4 col-sm-3 col-md-2">
          <button
            :class="'' === companySelect && 'button-company-active'"
            @click="handleFilterCasino()"
            class="button-company"
          >
            <span class="font-weight-bold">{{ $t("all") }}</span>
          </button>
        </div>
        <div
          class="col-4 mb-4 col-sm-3 col-md-2"
          :key="index"
          v-for="(item, index) in casinos.slice(0, 5)"
        >
          <button
            :class="
              handleCheckCompany(item)
                ? companySelect === item.key && 'button-company-active'
                : 'disable-item'
            "
            @click="handleFilterCasino(item.key)"
            class="button-company"
          >
            <img
              loading="lazy"
              alt="logo"
              :class="
                item.key === companySelect
                  ? 'img-logo-header-view'
                  : 'img-logo-header'
              "
              :src="
                handleImage(item.key)
                  ? handleImage(item.key)
                  : require(`@/assets/logo/companies-game/${item.key
                      .toString()
                      .toLowerCase()}Active.png`)
              "
            />
          </button>
        </div>
        <div
          v-if="casinos.length <= 4"
          class="col-4 d-flex align-center justify-content-center mb-4 col-sm-3 col-md-2"
        >
          <button disabled class="button-company">
            <Loading class="m-0 p-0" />
          </button>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-lg-6 col-sm-12 d-flex justify-center"></div>
        <div class="col-lg-6 col-sm-12 d-flex align-center filter-box">
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
            @input="handleSearchBox"
          ></v-text-field>
          <button @click="handleToggleFilter" class="btn-filter btn-hover">
            <div class="d-flex align-center">
              <v-icon
                size="large"
                color="#fffff"
                icon="mdi-filter-outline"
              ></v-icon>
              <span class="filter-text">{{ $t("filter") }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        v-for="(casino, index) in listCompanyCasinoView"
        :key="index"
        class="item-casino-list casino-item"
      >
        <CasinoItem
          :class="handleCheckCompany(casino) ? '' : 'disable-item'"
          :index="indexOb ? parseInt(indexOb.toString()) : index"
          @handleChangeCasino="handleSelectCasino"
          :casino="casino"
          :disable="handleCheckCompany(casino)"
        />
      </div>
      <div
        v-if="loadingCheck"
        style="min-height: 425px"
        class="item-casino-list casino-item d-flex justify-center align-center"
      >
        <Loading />
      </div>
    </div>
    <FilterCompany
      :casino="true"
      :companySelect="companySelect"
      :listCompany="casinos"
      v-if="isOpenFilter"
      :handle-toggle="handleToggleFilter"
      @handleFilterCasino="handleFilterCasino"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: auto;
  padding-bottom: 2.125rem;
  padding-top: 2.125rem;

  .item-casino-list {
    width: 20%;
    @media (max-width: 991.98px) {
      width: 33%;
    }
    @media (max-width: 575.98px) {
      width: 50%;
    }
  }
}

.head-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .button-company-active {
    border: 1px solid var(--primaryPlayG1);
    border-radius: 8px;
  }

  .button-company {
    width: 100%;
    padding: 10px 10px;
    height: 80px;
    background-color: white;
    border-radius: 8px;

    span {
      color: var(--bgPlayG3);
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

  .title {
    font-size: 1.75rem;

    a {
      font-size: 1.5rem;
      text-decoration: none;
      color: gray;
    }
  }

  .filter-box {
    display: flex;
    margin-left: auto;
    align-items: center;

    .input-search {
      padding: 1rem 1rem 1rem 0;
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    .filter-box {
      margin-left: 0;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    .filter-box {
      width: 100%;
    }
  }

  .btn-filter {
    .filter-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .filter-text {
      color: white;
    }
  }

  .logo-img {
    height: 80px;
    object-fit: contain;
    margin: 1rem 0;
    background-color: white;
    border-radius: 8px;
    padding: 5px;
  }
}

.casino-item {
  margin: 0.5rem 0;
}

.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
</style>
<style lang="scss">
.filter-group {
  .v-field.v-field--appended {
    background-color: #1a1c20;
    color: #fff;
  }
}
</style>
