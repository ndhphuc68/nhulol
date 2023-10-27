<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";
import Slot from "./SlotGame";
import Casino from "./Casino";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
} from "@/api/games/request";
import { useRouter } from "vue-router";
import SlotIcon from "@/assets/G2casino/icon/sidebars/slot";
import CasinoIcon from "@/assets/G2casino/icon/sidebars/casino";

const titles = [
  {
    text: "casino",
    icon: SlotIcon,
  },
  {
    text: "slot",
    icon: CasinoIcon,
  },
];
const tabs = [Casino, Slot];
const store = useStore();
const { t } = useI18n();
const router = useRouter();
const currentTabIndex = computed(() => store.state.games4.tabGameActivate);
const activeTab = computed(() => tabs[currentTabIndex.value]);
const disabledList = ref([]);
const userInfor = computed(() => store.state.user.userInfor);
const gameKey = computed(() => store.state.games4.gameKey);
const listGameDetailProviderCasino = computed(
  () => store.getters.listGameDetailProviderCasinoV4
);

const listFillter = ref([]);
let tab = null;
let timer = null;

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
    await router.push({ name: "Login" });
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
      module: gameKey?.value.module,
    });
    tab?.window.close();
    tab = null;
  }
  await handlePlayGame(gameKey.value.key, key, gameKey?.value.module);
};

const handlePlayGame = async (key, gameKey, module) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
      module: module,
    };

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

const changeTab = (idx) => {
  store.commit("handleUpdateTabGame", idx);
};
</script>

<template>
  <div class="tab-container pickgame">
    <div class="tabs" id="tabGame">
      <Button
        class="tab-item"
        v-for="(title, index) in titles"
        @click="changeTab(index)"
        :key="index"
        :class="{ active: currentTabIndex === index }"
      >
        <p>{{ $t(title?.text) }}</p>
        <component :is="title?.icon" class="icon" />
      </Button>
    </div>
    <div class="panel">
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

<style scoped lang="scss">
.tab-container {
  margin: 0 0.75rem;

  .tabs {
    display: flex;
    margin-right: auto;
  }

  .tab-item {
    background: #fafafa;
    border: none;
    padding: 12px 24px;

    p {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }

    &:hover {
      color: var(--text);
      opacity: 0.8;
      transform: scale(0.97);
      transition: all linear 0.2s;
    }

    &:nth-child(1) {
      margin-right: 1.25rem;
    }

    &.active {
      background-color: var(--primaryG2Casino);
      color: #ffffff;

      .icon {
        path {
          fill: #ffffff;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.pickgame {
  .tab-item.active {
    .icon {
      path {
        fill: #ffffff;
      }
    }
  }
}
</style>
