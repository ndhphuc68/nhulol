<template>
  <div class="container">
    <div class="v-row my-0 mx-0 list pl-3 pr-3">
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(0, 12)"
        :key="index"
      >
        <button
          :class="
            handleCheckCompany(item) && indexPick === item.key
              ? props.border
              : ''
          "
          class="item"
          @click="handleClick(item.key, item)"
        >
          <img
            :class="
              handleCheckCompany(item)
                ? indexPick === item.key
                  ? 'active'
                  : ''
                : 'disable-item'
            "
            loading="lazy"
            alt="logo"
            class="item-logo"
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
        v-if="game.length <= 11"
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
      >
        <button class="item">
          <Loading />
        </button>
      </div>
    </div>
    <div v-if="isViewMore" class="v-row list my-0 mx-0 list pl-3 pr-3">
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(12)"
        :key="index"
      >
        <button
          :class="indexPick === item.key && props.border"
          class="item"
          @click="handleClick(item.key, item)"
        >
          <img
            :class="
              handleCheckCompany(item)
                ? indexPick === item.key
                  ? 'active'
                  : ''
                : 'disable-item'
            "
            loading="lazy"
            alt="logo"
            class="item-logo"
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
        v-if="game.length > 11 && loadingCheck"
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
      >
        <button class="item">
          <Loading />
        </button>
      </div>
    </div>
    <div class="choose-tab">
      <div class="filter-tab d-flex justify-center align-center">
        <hr />
        <button
          @click="handleToggleGetMoreCompany"
          class="btn-more d-flex align-center justify-center"
        >
          <img
            :class="{ close: !isViewMore }"
            alt="view-more"
            class="view-more"
            src="@/assets/icon/more-down.png"
          />
          <p>{{ $t("choose-other") }}</p>
          <img
            :class="{ close: !isViewMore }"
            alt="view-more"
            class="view-more"
            src="@/assets/icon/more-down.png"
          />
        </button>
        <hr />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { handleImage } from "@/utils";
import Loading from "@/components/EDGames/Loading/index.vue";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));
const loadingCheck = computed(() => store.state.games2.loadingCheck);

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
  game: {
    type: Array,
    required: true,
    default: () => [],
  },
  handleUpdatePickIndexGame: Function,
  border: {
    type: String,
    default: "item-active",
  },
});

const gameKey = computed(() => store.state.games5.gameKey);

const indexPick = ref(gameKey.value.key);
const isViewMore = ref(false);

watch(gameKey, (newVal) => {
  indexPick.value = newVal.key;
});

const handleToggleGetMoreCompany = () => {
  isViewMore.value = !isViewMore.value;
};
const handleClick = (index, key) => {
  if (!handleCheckCompany(key)) {
    return;
  }
  store.commit("handleUpdateGameKeyV5", key);
};
</script>
<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%) !important;
}

.item {
  width: 160px;
  height: 80px;
  padding: 10px;
}

.choose-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.choose-tab button {
  margin: 0 70px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
}

.search-box input {
  padding: 5px;
  color: var(--text-second);
}

.filter-tab {
  width: 100%;
}

hr {
  width: 35%;
  height: 0px;
  border: 1px solid #000000;
  margin: 0;
}

.item-logo {
  width: 100%;
  height: 100%;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
  transition: all 0.5s;

  &:hover,
  &.active {
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
}

.item-active {
  border: 1px solid var(--primary);
}

.item-activeDP {
  border: 1px var(--primaryDoplay) solid;
}

.item:hover {
  transform: scale(1.3);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  transition: all linear 0.2s;
}

.btn-more img.close {
  transform: rotate(180deg);
}

.btn-more p {
  margin: 0 10px;
}

@media (max-width: 375px) {
  .btn-more p {
    font-size: 15px;
  }
  .item {
    height: 35px;
  }
}

@media (max-width: 1024px) {
  //hr {
  //  width: 10%;
  //}
}
</style>
