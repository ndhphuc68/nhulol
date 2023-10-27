<template>
  <div class="slot-wrapper">
    <div class="slot-top row justify-content-between">
      <div class="d-flex align-center col-lg-6 col-sm-12">
        <img
            alt="icon"
            class="icon-slot"
            src="../../../assets/PlayG1/icon/slot/slot.png"
        />
        <h4 class="title">{{ $t("slot") }}</h4>
      </div>
      <div class="col-lg-6 col-sm-12 d-flex align-center">
        <v-card-text>
          <v-text-field
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
        </v-card-text>
        <Button @click="handleToggleFilter">
          <div class="d-flex align-center">
            <img
                alt="filter"
                class="filter-icon"
                src="../../../assets/PlayG1/icon/commons/filter.png"
            />
            <span class="filter-text">{{ $t("filter") }}</span>
          </div>
        </Button>
      </div>
    </div>
    <div class="row my-3">
      <img
          v-if="gameKey !== ''"
          class="logo-img"
          alt="logo"
          :src="
          require(`@/assets/logo/home/${gameKey?.split('_')[0]}_horizontal.png`)
        "
      />
    </div>
    <div class="row w-100">
      <div
          v-for="(game, index) in displayGame"
          :key="index"
          class="item-slot"
          :class="checkGameHide(game.key) ? ' px-3 py-3' : 'd-none'"
      >
        <GameItem
            @handlePlayGameSlot="handlePlayGameSlot"
            :game="game"
            :type-compay-game="gameKey"
            class="slot-item"
        />
      </div>
    </div>
  </div>
  <FilterCompany
      :casino="false"
      :company-select="gameKey"
      :list-company="listCompanySlot"
      v-if="isOpenFilter"
      :handle-toggle="handleToggleFilter"
      @handleSelectGame="handleSelectGame"
  />
</template>

<script setup>
import GameItem from "@/views/PlayG1/Components/GameItem/index.vue";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import FilterCompany from "@/views/PlayG1/Components/FilterCompany/index.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
// import { getWithdrawAllWhenCloseGame } from "@/api/games/request";

const { t } = useI18n();
const store = useStore();

const listCompanySlot = ref(computed(() => store.getters.getListGameSlot));
const gameKey = computed(() => store.state.games.gameKey);
const userInfor = computed(() => store.state.user.userInfor);

const disabledList = ref([]);
const loading = ref(false);
const isOpenFilter = ref(false);
const searchValue = ref("");
const game_modals = ref([]);
const displayGame = ref([]);

onMounted(async () => {
  store.commit("handleUpdateLoading", true);
  await store.dispatch("getListGameProviderActions");
  await handleSelectGame(listCompanySlot.value[0]?.key);
  store.commit("handleUpdateLoading", false);
});

let tab = null;
let timer = null;

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

// const handlePlayGameSlot = async (key) => {
//   if (store.state.auth.auth) {
//     store.commit("handleUpdateLoading", true);
//     if (tab) {
//       clearInterval(timer);
//       await getWithdrawAllWhenCloseGame({
//         gamecode: "KGN",
//         memberIdx: userInfor.value.me_idx,
//       });
//       tab?.window.close();
//       tab = null;
//     } else {
//       let config =
//           "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
//       let check = window.open("", "popupId", config);
//       check.close();
//     }
//     await handlePlayGame(gameKey.value, key);
//   } else {
//     store.commit("handleToggle", "login");
//   }
// };

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
    const res = await store.dispatch("getPlayGameSelect", JSON.stringify(data));
    if (res?.code != 0) {
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      setTimeout(async () => {
        await store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, "KGN");
      }, 3000);
    }
  }, 3000);
};

// const openGamePopup = async (res, key) => {
//   if (res?.length > 0) {
//     store.commit("handleUpdateLoading", false);
//     let config =
//         "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
//     tab = window.open(res.replace(/['"]+/g, ""), "popupId", config);
//     timer = setInterval(async function () {
//       if (tab?.closed) {
//         clearInterval(timer);
//         await getWithdrawAllWhenCloseGame({
//           gamecode: key,
//           memberIdx: userInfor.value.me_idx,
//         });
//         tab = null;
//       }
//     }, 100);
//   }
// };

const handleShowAlert = async (res) => {
  await store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res.code}`),
  });
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

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
  store.commit("handleUpdateGameKey", key);
  store.commit("handleUpdateLoading", true);
  displayGame.value = [];
  const data = {
    provider_id: key,
  };
  const res = await store.dispatch("getListGameCompanyActions", data);
  if (res) {
    game_modals.value = [...res];
    displayGame.value = [...res];
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("error_vendor"),
    });
    game_modals.value = [];
    displayGame.value = [];
  }
  store.commit("handleUpdateLoading", false);
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter(
        (item) =>
            item.names.ko.includes(searchValue.value) ||
            item.names.en.toLowerCase().includes(searchValue.value)
    ),
  ];
};
</script>

<style scoped>
.logo-img {
  width: 300px;
  height: 100px;
}

.item-slot {
  width: 20%;
}

@media (max-width: 991.98px) {
  .item-slot {
    width: 25%;
  }
}

@media (max-width: 767.98px) {
  .item-slot {
    width: 50%;
  }
}

.slot-top {
  margin-bottom: 48px;

.icon-slot {
  width: 48px;
  height: 48px;
  margin-right: 16px;
}

.title {
  margin: 0;
  font-size: 2.5rem;
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

.slot-item {
  overflow: hidden;
  margin: 10px 0;
}
</style>
