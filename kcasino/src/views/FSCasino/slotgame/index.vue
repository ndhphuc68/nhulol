<script setup>
import Banner from "@/components/FSCasino/Banner";
import { Images } from "@/const/Image";
import FilterCompany from "@/views/FSCasino/Components/FilterCompany/index.vue";
import ItemSlot from "@/views/FSCasino/slotgame/Components/ItemSlot.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { getWithdrawAllWhenCloseGame } from "@/api/games/request";

import Loading from "@/components/EDGames/Loading/index.vue";
import { gameModule6, gameTypeModule6 } from "@/utils/game/dataGameList";

const { t } = useI18n();
const store = useStore();

const listCompanySlot = ref(gameTypeModule6.slot);
const gameKey = computed(() => store.state.games5.gameKey);
const userInfor = computed(() => store.state.user.userInfor);
const onWeb = computed(() => store.state.games2.onWeb);

// const listFillter = ref([]);

const game_modals = ref([]);
const displayGame = ref([]);
const searchValue = ref("");
const disabledList = ref([]);
const loading = ref(false);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

const listGameDetailSlotLose = computed(
  () => store.getters.listGameDetailProviderSlotV5
);

const listGameDetailSlot = ref(gameModule6.listGameDetailProviderSlot);

watch(listGameDetailSlotLose, (newvalue) => {
  for (const val of newvalue) {
    let array = listGameDetailSlot.value.find((e) => e.key === val.key);
    if (array) {
      array.game = [...array.game, ...val.game];
    } else {
      listGameDetailSlot.value = [...listGameDetailSlot.value, ...[val]];
    }
  }
  handleSelectGame(gameKey.value);
});

watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
  handleSelectGame(gameKey.value);
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

let tab = null;
let timer = null;

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
  }
});

onMounted(async () => {
  store.commit("handleUpdateOnWeb", false);
  loading.value = true;
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
    }
  }
});

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

const dataHide = [
  "525dd3b1-b829-490a-a337-19bf04986ec9",
  "32a0b1f9-2753-4bec-8cfc-a40b2fa585d4",
  "17bfea87-c325-4bb3-9e33-6ecf367fcd1e",
  "eae7f941-2343-48da-a0f3-74bd362c0a9a",
  "53da6f68-ddff-4f95-af9a-ba8b96e568bb",
  "730151ed-8489-4bed-b910-73f86261753c",
  "2da3e2d6-9aaa-4d28-9120-20da0fb4e4d1",
  "ddafc78d-d83a-4504-bc48-5d896266e058",
];

const checkGameHide = (key) => {
  const check = dataHide.find((e) => e === key);
  return !check;
};

const handleSelectGame = async (key) => {
  const checkObject = listCompanySlot.value.find((e) => e.key === key.key);
  if (checkObject) {
    if (!handleCheckCompany(checkObject)) {
      return;
    }
  }
  store.commit("handleUpdateGameKeyV5", key);
  // store.commit("handleUpdateLoading", true);
  loading.value = true;
  displayGame.value = [];
  // const data = {
  //   provider_id: key,
  // };
  // const res = await store.dispatch("getListGameCompanyActionsV3", data);
  // listFillter.value = listGameDetailProviderSlot.value;
  const res = listGameDetailSlot.value.find((e) => e.key === key.key);
  console.log(res);
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
  loading.value = false;
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    ),
  ];
};

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
    store.commit("handleToggle", "login");
  }
};

const handlePlayGame = async (key, gameKey) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: 6,
    };
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
</script>

<template>
  <Banner :image="Images.bannerSlotGame" :title="'slots'" />
  <div class="container slot-main">
    <div class="row mt-4">
      <FilterCompany
        :casino="false"
        :company-select="gameKey?.key"
        :listCompany="listCompanySlot.slice(12)"
        :listCompanyHeader="listCompanySlot.slice(0, 12)"
        @handleFillter="handleSelectGame"
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
              :label="$t('search')"
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
      <div class="row mt-3 w-100">
        <div
          :key="index"
          class="item-slot h-100 mb-3 p-2"
          v-for="(item, index) in displayGame"
          :class="checkGameHide(item.key) ?? 'd-none'"
        >
          <ItemSlot
            @handlePlayGameSlot="handlePlayGameSlot"
            :game="item"
            :type-compay-game="gameKey?.key"
          />
        </div>
        <div v-if="loading" class="col-12 my-5">
          <Loading />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slot-main {
  .item-slot {
    width: 20%;

    @media (max-width: 1300px) {
      width: 33%;
    }

    @media (max-width: 767.98px) {
      width: 50%;
    }
  }

  .logo-img {
    width: 300px;
    height: 100px;
    @media (max-width: 541px) {
      width: 100%;
    }
  }

  .logo-img {
    width: 300px;
    height: 100px;
  }
}
</style>
