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
          @handleSelectCasino="handleSelectCasino"
          @handlePlayGameSlot="handlePlayGameSlot"
          :is="activeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import LiveTab from "./tabs/LiveTab";
import SlotTab from "./tabs/SlotTab";
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
const currentTabIndex = computed(() => store.state.games2.tabGameActivate);
const gameKey = computed(() => store.state.games5.gameKey);
let activeTab = ref(computed(() => tabs[currentTabIndex.value]));
const listGameDetailProviderCasino = computed(
  () => store.getters.listGameDetailProviderCasinoV5
);

const titles = ["live", "slot"];
const tabs = [LiveTab, SlotTab];

let tab = null;
let timer = null;

onMounted(async () => {
  await store.dispatch("getListGameProviderActionsV5");
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleShowAlert = async (res) => {
  await store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res?.code}`),
  });
};

const handleSelectCasino = async (key, check) => {
  if (!check) {
    return;
  }
  if (store.state.auth.auth) {
    let checkDisable = disabledList.value.find((e) => e === key);
    if (!checkDisable) {
      await store.commit("handleUpdateLoading", true);
      const gameKey = await handleSelectGame(key);
      if (gameKey) {
        if (key === "evolution_casino") {
          setTimeout(async () => {
            const res = await getVavagateStartRequest("/game/vag/play");
            if (res?.code == 0) {
              await openGamePopup(res?.data, "VAG");
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
  if (tab) {
    clearInterval(timer);
    await getWithdrawAllWhenCloseGame({
      gamecode: key,
      memberIdx: userInfor.value.me_idx,
      module: key === 999999 ? 0 : 6,
    });
    tab?.window.close();
    tab = null;
  }
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

const handlePlayGameSlot = async (key) => {
  if (tab) {
    clearInterval(timer);
    await getWithdrawAllWhenCloseGame({
      gamecode: "KGN",
      memberIdx: userInfor.value.me_idx,
      module: key === 999999 ? 0 : 6,
    });
    tab?.window.close();
    tab = null;
  }
  await handlePlayGame(gameKey.value.key, key);
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

@media (max-width: 375px) {
  .tab-item p {
    font-size: 14px;
  }
}

.tab-item.active p {
  color: var(--primary);
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
  border: 2px solid #cc9a6c;
}

.title .text-left,
.title p {
  width: calc(100% / 2);
}

.title .text-left span {
  color: var(--primary);
  font-weight: 700;
}

@media (max-width: 1024px) {
  .title {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .title {
    flex-direction: column;
  }

  .title .text-left,
  .title p {
    width: 100%;
  }
}
</style>
