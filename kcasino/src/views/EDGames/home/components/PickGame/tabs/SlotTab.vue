<template>
  <div class="w-100">
    <ListCompanies :border="props.border" :game="listCompanySlot" />
    <div class="v-row mb-3 pl-3 pr-3" style="margin: 0">
      <div class="v-col-12 v-col-md-6 logo-com d-flex justify-center"></div>
      <div class="v-col-12 v-col-md-6">
        <div class="search-box w-100 w-md-75 mr-4">
          <img
            alt="search-icon"
            class="search-icon"
            src="@/assets/icon/search.png"
          />
          <input
            type="text"
            :placeholder="$t('search')"
            id="search-game"
            v-model="searchContent"
            @input="handleChangeSearch"
          />
        </div>
      </div>
    </div>
    <Loading v-if="isLoading" />
    <div
      v-if="!isLoading"
      class="d-flex align-start flex-row flex-wrap mt-5 pl-2 pr-2"
      style="margin: 0"
    >
      <div
        class="game-slot d-flex align-start px-3 py-3"
        :key="game.id"
        v-for="game in displayGame"
      >
        <GameItemSlot
          class="card-item"
          :typeCompayGame="indexPick.toString()"
          :game="game"
          :key="game.id"
          @click="handlePlayGame(game.key)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import GameItemSlot from "@/views/EDGames/home/components/PickGame/tabs/components/GameItemSlot";
import Loading from "@/components/EDGames/Loading";
import ListCompanies from "./components/ListCompanies";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const listCompanySlot = computed(() => store.getters.getListGameSlotV5);
const listGameDetailSlot = computed(
  () => store.getters.listGameDetailProviderSlotV5
);

const isLoading = ref(false);
const game_modals = ref([]);
const displayGame = ref([]);
const searchContent = ref("");
const gameKey = computed(() => store.state.games5.gameKey);
const indexPick = computed(() => parseInt(listCompanySlot.value[0]?.id) || 0);

// const listFillter = ref([]);
const $emit = defineEmits(["click"]);
// const indexPickCompany = ref(0);

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

const props = defineProps({
  border: {
    type: String,
    default: "item-active",
  },
});

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

const handleSelectGame = async (key) => {
  const checkObject = listCompanySlot.value.find((e) => e.key === key.key);
  if (checkObject) {
    if (!handleCheckCompany(checkObject)) {
      return;
    }
  } else {
    return;
  }
  store.commit("handleUpdateGameKeyV5", key);
  isLoading.value = true;
  // const data = {
  //   provider_id: key,
  // };
  // const res = await store.dispatch("getListGameCompanyActionsV5", data);
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
  isLoading.value = false;
};

const handlePlayGame = async (key) => {
  if (store.state.auth.auth) {
    await store.commit("handleUpdateLoading", true);
    $emit("handlePlayGameSlot", key);
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleChangeSearch = () => {
  displayGame.value = [
    ...game_modals.value.filter((item) =>
      item.name.toLowerCase().includes(searchContent.value.toLowerCase())
    ),
  ];
};
</script>
<style scoped>
.card-item {
  cursor: pointer;
}

.logo-com img {
  width: 300px;
  height: 100px;
}

.card-item:hover {
  transform: scale(1.03);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.search-box {
  display: flex;
  border-bottom: 1.5px solid var(--text-second);
  padding: 10px;
  height: 50px;
}

.search-box input {
  color: #000;
  font-size: 18px;
}

.search-icon {
  width: 23px;
  height: 23px;
}

.game-slot {
  width: 16%;
}

@media (max-width: 991.98px) {
  .game-slot {
    width: 25%;
  }
}

@media (max-width: 767.98px) {
  .game-slot {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .card-item {
    width: 100%;
  }
}
</style>
