<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import SlotGameItem from "./SlotGameItem";
import FilterCompany from "@/components/PlayG3/FilterCompany";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { getWithdrawAllWhenCloseGame } from "@/api/games/request";
import { useRouter } from "vue-router";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";

const router = useRouter();
const { t } = useI18n();
const store = useStore();
const listCompanySlot = computed(() => store.getters.getListGameSlotV5);
const gameKey = computed(() => store.state.games5.gameKey);
const userInfor = computed(() => store.state.user.userInfor);
const onWeb = computed(() => store.state.games2.onWeb);
const listGameDetailSlot = computed(
  () => store.getters.listGameDetailProviderSlotV5
);

const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);

const disabledList = ref([]);
const game_modals = ref([]);
const displayGame = ref([]);
const loadingSlot = ref(true);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

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
    await handleSelectGame(key);
  } else {
    loadingSlot.value = false;
  }
});

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
      await handleSelectGame(key);
    } else {
      loadingSlot.value = false;
    }
  }
});
let tab = null;
let timer = null;

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

watch(useI18n().locale, async () => {
  await handleSelectGame(gameKey.value);
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
          module: 6,
        });
        tab?.window.close();
        store.commit("handleUpdateOnWeb", true);
        tab = null;
      } else {
        let config =
          "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
        let check = window.open("", "popupId", config);
        check.close();
      }
    }
    store.commit("handleUpdateOnWeb", false);
    await handlePlayGame(gameKey.value.key, key);
  } else {
    await router.push("/login");
  }
};

const handlePlayGame = async (key, gameKey) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: 6,
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
        await openGamePopup(res.data, "KGN");
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
        module: 6,
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
          module: 6,
        });
        tab = null;
        store.commit("handleUpdateOnWeb", false);
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
  if (game.names.type === "casino" || game.names.type === "Live Casino") {
    return false;
  } else {
    return true;
  }
  // const check = dataHide.find((e) => e === key);
  // return !check;
};

const handleSelectGame = async (key) => {
  const checkObject = listCompanySlot.value.find((e) => e.key === key.key);
  if (checkObject) {
    if (!handleCheckCompany(checkObject)) {
      loadingSlot.value = false;
      return;
    }
  } else {
    return;
  }
  // let gameSelect = listCompanySlot.value.find((e) => e.key === key);
  store.commit("handleUpdateGameKeyV5", key);
  // store.commit("handleUpdateLoading", true);
  loadingSlot.value = true;
  displayGame.value = [];
  // const data = {
  //   provider_id: key,
  // };
  // const res = await store.dispatch("getListGameCompanyActionsV3", data);
  // listFillter.value = listGameDetailProviderSlot.value;
  const res = listGameDetailSlot.value.find((e) => e.key === key.key);
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
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    ),
  ];
};
</script>

<template>
  <div class="container">
    <div class="head-tab">
      <div class="d-flex">
        <h4 class="title">
          {{ $t("slot") }}
        </h4>
        <h4 class="title">
          &nbsp;/&nbsp;<router-link to="/casino">{{
            $t("casino")
          }}</router-link>
        </h4>
      </div>
      <div class="row my-4 w-100">
        <div
          class="col-4 mb-4 col-sm-3 col-md-2"
          :key="index"
          v-for="(item, index) in listCompanySlot.slice(0, 12)"
        >
          <button
            @click="handleSelectGame(item)"
            :class="
              handleCheckCompany(item)
                ? gameKey?.key === item.key && 'button-company-active'
                : 'disable-item'
            "
            class="button-company"
          >
            <img
              loading="lazy"
              alt="logo"
              :class="
                item.key === gameKey?.key
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
          v-if="listCompanySlot.length <= 11"
          class="col-4 d-flex align-center justify-content-center mb-4 col-sm-3 col-md-2"
        >
          <button disabled class="button-company">
            <Loading class="m-0 p-0" />
          </button>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-lg-6 col-sm-12 d-flex justify-center"></div>
        <div class="col-lg-6 col-sm-12 filter-box">
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

    <div class="d-flex flex-wrap w-100">
      <div
        v-for="(game, index) in displayGame"
        :key="index"
        class="game-slot d-flex px-3 py-3"
      >
        <SlotGameItem
          @handlePlayGameSlot="handlePlayGameSlot"
          class="w-100"
          :game="game"
          :type-compay-game="gameKey?.key"
        />
      </div>
      <div v-if="loading" class="col-12 my-4">
        <Loading />
      </div>
    </div>
    <FilterCompany
      :casino="false"
      :company-select="gameKey?.key"
      :list-company="listCompanySlot"
      v-if="isOpenFilter"
      :handle-toggle="handleToggleFilter"
      @handleSelectGame="handleSelectGame"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: auto;
  padding-bottom: 2.125rem;
  padding-top: 2.125rem;
}

.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
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
      width: 100px;
      height: 100%;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    .img-logo-header {
      width: 100px;
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
    align-items: center;
    margin-left: auto;

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
      color: var(--textPlayG3);
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

.game-slot {
  width: 20%;

  @media (max-width: 1024px) {
    width: 33.33%;
  }

  @media (max-width: 767.98px) {
    width: 50%;
  }
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
