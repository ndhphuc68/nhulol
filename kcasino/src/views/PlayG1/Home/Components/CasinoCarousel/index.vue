<template>
  <div class="casino-carousel-container">
    <div class="wrapper-title">
      <div class="d-flex flex-wrap flex-row align-items-center">
        <span class="title me-4">{{ $t("casino") }}</span>
        <!--        <div class="btn-casino">
          <Button
            :class="typeGamejs === 'evolution' && 'btn-change-ui-active'"
            @click="handleChangeGameUI('evolution')"
            class="btn-change-ui me-3 mt-sm-0 mt-3"
            >Evolution
          </Button>
          <Button
            :class="typeGamejs === 'game2.js' && 'btn-change-ui-active'"
            @click="handleChangeGameUI('game2.js')"
            class="mt-sm-0 mt-3 btn-change-ui"
            >Slot Diamond
          </Button>
        </div>-->
      </div>
      <div class="btn-casino">
        <Button @click="router.push('casino')">{{ $t("viewall") }}</Button>
      </div>
    </div>
    <v-sheet class="in-desktop mx-auto">
      <v-slide-group
        v-model="model"
        class="py-4"
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item
          v-for="(live, index) in listCompanyCasinoView"
          :key="index"
        >
          <CasinoItem
            :class="handleCheckCompany(live) ? '' : 'disable-item'"
            :index="index"
            @handleSelectCasino="handleSelectCasino"
            :live="live"
            class="live-carousel-item"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <div class="row in-mobile justify-center">
      <div
        v-for="(live, index) in listCompanyCasinoView.slice(0, 4)"
        :key="index"
        class="col-6"
      >
        <CasinoItem
          :index="index + 1"
          @handleSelectCasino="handleSelectCasino"
          :live="live"
          :class="handleCheckCompany(live) ? '' : 'disable-item'"
          class="lives-item"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";

const model = null;
import CasinoItem from "@/views/PlayG1/Components/CasinoItem/index.vue";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import { useRouter } from "vue-router";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
} from "@/api/games/request";

const router = useRouter();
const store = useStore();
const { t } = useI18n();
import Loading from "@/components/EDGames/Loading/index.vue";
import {
  gameModuleSunShine,
  gameTypeModuleSunShine,
} from "@/utils/game/gameSunShine";

const disabledList = ref([]);
const userInfor = computed(() => store.state.user.userInfor);
const onWeb = computed(() => store.state.games2.onWeb);

const listFillter = ref([]);
const loadingCheck = computed(() => store.state.games2.loadingCheck);
let tab = null;
let timer = null;

const typeGamejs = ref("game2.js");

const listCompanyCasinoView = ref(gameTypeModuleSunShine.casino);

const moduleGameKey = computed(() => store.state.games2.module);
// const gameEvolution = computed(() => store.state.games2.gameProviderEvolution);

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

const listGameDetailProviderCasino = ref(
  gameModuleSunShine.listGameDetailProviderCasino
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

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleSelectCasino = async (key, item, module) => {
  const checkGame = listCompanyCasinoView.value.find((e) => e.key === key);
  if (checkGame) {
    if (!handleCheckCompany(checkGame)) {
      return;
    }
  } else {
    return;
  }
  if (store.state.auth.auth) {
    let checkDisable = disabledList.value.find((e) => e === key);
    if (!checkDisable) {
      await store.commit("handleUpdateLoading", true);
      const gameKey = await handleSelectGame(key);
      if (gameKey) {
        // if (key === "evolution_casino") {
        //   setTimeout(async () => {
        //     const res = await getVavagateStartRequest("/game/vag/play");
        //     if (res.code == 0) {
        //       await openGamePopup(res.data, "VAG");
        //     } else {
        //       await handleShowAlert(res);
        //     }
        //   }, 3000);
        // } else {
        await handlePlayGame(key, gameKey, module);
        // }
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
        module: 1,
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
  // const res = await store.dispatch("getListGameCompanyActions", data);
  listFillter.value = listGameDetailProviderCasino.value;
  const res = listFillter.value.find((e) => e.key === key);
  if (res && res?.game) {
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
    await store.commit("handleUpdateLoading", false);
    await store.dispatch("showAlert", {
      type: "error",
      message: t("error_vendor"),
    });
    return null;
  }
};

const handlePlayGame = async (key, gameKey, module) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: 1,
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
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      store.commit("handleUpdateModule", key === 999999 ? 0 : 1);
      setTimeout(async () => {
        await store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, key, module);
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
        module: 1,
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
          module: 1,
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
</script>
<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.btn-change-ui {
  color: white;
  width: 150px;
  border-radius: 6px;
  background-color: gray !important;
}

.btn-change-ui-active {
  color: white;
  padding: 15px 30px;
  border-radius: 6px;
  background-color: blue !important;
}

.casino-carousel-container {
  margin: 40px 0;
  position: relative;
  max-width: 100%;

  .wrapper-title {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin: 10px;
    // @media (max-width: 375px) {
    //   flex-direction: column;
    // }

    .title {
      font-size: 32px;
      font-weight: 600;
      line-height: 39px;
      letter-spacing: 0;
      text-align: left;
    }
  }
}

.live-carousel-item {
  margin: 0 14px;
  width: 253px;
  overflow: hidden;
}

.lives-item {
  overflow: hidden;
  margin: 15px 0;
}

.btn-casino {
  .btn {
    background: var(--primaryPlayG1);
    color: #fff;
    @media (max-width: 375px) {
      width: 100px;
    }
  }
}

@media (max-width: 1460px) {
  .live-carousel-item {
    width: 344px;
  }
}

.in-mobile {
  display: none;
}

@media (max-width: 1440px) {
  .in-mobile {
    display: flex;
  }

  .in-desktop {
    display: none;
  }
}
</style>
<style lang="scss">
.live-carousel-item .live-img {
  max-width: 90%;
}

.casino-carousel-container {
  .v-slide-group__next,
  .v-slide-group__prev {
    position: absolute;
    top: 14px;

    .mdi:before {
      background: var(--primaryPlayG1);
      color: #fff;
      border-radius: 4px;
    }
  }

  .v-slide-group__next {
    right: 158px;
  }

  .v-slide-group__prev {
    right: 193px;
  }
}

@media (max-width: 639px) and (min-width: 576px) {
  .title {
    margin-bottom: 1rem;
  }
}
</style>
