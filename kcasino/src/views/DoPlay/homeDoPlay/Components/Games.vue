<template>
  <div class="container">
    <div class="tabs" id="tabGame">
      <button
        class="tab-item"
        v-for="(title, index) in titles"
        @click="changeTab(index)"
        :key="index"
        :class="{ active: currentTabIndex === index }"
      >
        <p>{{ $t(title) }}</p>
      </button>
    </div>
    <div class="content">
      <KeepAlive>
        <component
          :border="'item-activeDP'"
          @handleSelectCasino="handleSelectCasino"
          @handlePlayGameSlot="handlePlayGameSlot"
          :is="activeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import LiveTab from "./Casino/LiveTab";
import SlotTab from "./Slot/SlotTab";
import { useStore } from "vuex";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
} from "@/api/games/request";
import { useI18n } from "vue-i18n";

const store = useStore();

const { t } = useI18n();
const disabledList = ref([]);
const userInfor = computed(() => store.state.user.userInfor);
const currentTabIndex = computed(() => store.state.games4.tabGameActivate);
const gameKey = computed(() => store.state.games4.gameKey);
let activeTab = ref(computed(() => tabs[currentTabIndex.value]));
const listGameDetailProviderCasino = computed(
  () => store.getters.listGameDetailProviderCasinoV4
);

const listFillter = ref([]);
const titles = ["live", "slot"];
const tabs = [LiveTab, SlotTab];

let tab = null;
let timer = null;

// onMounted(async () => {
//   await store.dispatch("getListGameProviderActionsV2");
// });

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleShowAlert = async (res) => {
  store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res.code}`),
  });
};

const handleSelectCasino = async (key, module) => {
  if (store.state.auth.auth) {
    let checkDisable = disabledList.value.find((e) => e === key);
    if (!checkDisable) {
      store.commit("handleUpdateLoading", true);
      const gameKey = await handleSelectGame(key, module);
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
          await handlePlayGame(key, gameKey, module);
        }
      }
    }
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleSelectGame = async (key, module) => {
  if (tab) {
    clearInterval(timer);
    await getWithdrawAllWhenCloseGame({
      gamecode: key,
      memberIdx: userInfor.value.me_idx,
      module: module,
    });
    tab?.window.close();
    tab = null;
  }
  let res = null;
  if (key === 999999 || module === 2) {
    const data = {
      provider_id: key,
      module: key === 999999 ? 0 : 2,
    };
    // if (
    //   key === "microgaming_casino" ||
    //   key === "orientalgame_casino" ||
    //   key === "vivo_casino"
    // ) {
    //   const ipRes = await fetch("https://jsonip.com/").then((res) =>
    //     res.json()
    //   );
    //   if (ipRes.country != "KR") {
    //     await store.commit("handleUpdateLoading", false);
    //     await store.dispatch("showAlert", {
    //       type: "error",
    //       message: t("error_play_game2"),
    //     });
    //     return;
    //   }
    // }
    res = await store.dispatch("getListGameCompanyActions", data);
  } else {
    listFillter.value = listGameDetailProviderCasino.value;
    res = listFillter.value.find((e) => e.key === key);
  }

  if (res) {
    if (key === "pragmatic_casino") {
      return 101;
    } else if (key === 999999 || module === 2) {
      return res[0]?.key && res[0].key;
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
          return res.game[0]?.key;
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

const handlePlayGameSlot = async (key) => {
  if (tab) {
    clearInterval(timer);
    await getWithdrawAllWhenCloseGame({
      gamecode: "KGN",
      memberIdx: userInfor.value.me_idx,
      module: gameKey.value.module,
    });
    tab?.window.close();
    tab = null;
  }
  await handlePlayGame(gameKey.value.key, key, gameKey.value.module);
};

const handlePlayGame = async (key, gameKey, module) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: module,
    };
    /* if (key === 'pragmatic_slot') {
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
      setTimeout(async () => {
        store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, "KGN", module);
      }, 500);
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
        module: module,
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
          module: module,
        });
        tab = null;
      }
    }, 100);
  }
};

const changeTab = (index) => {
  store.commit("handleUpdateTabGame", index);
  store.commit("handleActiveSidebar", index);
};
</script>
<style scoped>
.container {
  background: #fff;
}

.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.tabs {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 12px;
  border-bottom: 2px solid #e4e4e7;
  /*overflow-x: auto;*/
}

.tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.tab-item {
  width: 50%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tab-item p {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin: 0 10px;
  color: var(--text-second);
  text-transform: uppercase;
}

.tab-item.active p {
  color: var(--primaryDoplay);
}

.tab-item:hover p {
  transform: scale(0.9);
}

.tab-item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0px;
  left: 0;
  top: calc(100% - 1px);
  border: 2px solid var(--primaryDoplay);
}

@media (max-width: 280px) {
  .tab-item p {
    font-size: 14px;
  }
  .tab-item {
    height: 50px;
  }
}
</style>
