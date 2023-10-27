<template>
  <div class="container">
    <div class="v-row my-0 mx-0 list pl-2 pr-2">
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(0, 12)"
        :key="index"
      >
        <button
          :class="gameKey?.key === item.key && 'item-activeDP'"
          class="item"
          @click="handleClick(item)"
        >
          <img
            :class="{ active: gameKey?.key === item.key }"
            loading="lazy"
            alt="logo"
            class="item-logo"
            :src="
              handleImage(item?.key)
                ? handleImage(item?.key)
                : require(`@/assets/logo/companies-game/${
                    item.key.split('_')[0]
                  }Active.png`)
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
    <div v-if="isViewMore" class="v-row list pl-2 pr-2">
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(12)"
        :key="index"
      >
        <button class="item" @click="handleClick(item)">
          <img
            :class="{ active: gameKey?.key === item.key }"
            loading="lazy"
            alt="logo"
            class="item-logo"
            :src="
              handleImage(item?.key)
                ? handleImage(item?.key)
                : require(`@/assets/logo/companies-game/${
                    item.key.split('_')[0]
                  }Active.png`)
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
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";

const store = useStore();
const loadingCheck = computed(() => store.state.games2.loadingCheck);
const gameKey = computed(() => store.state.games4.gameKey);
const props = defineProps({
  game: {
    type: Array,
    required: true,
    default: () => [],
  },
  indexPick: {
    type: String,
  },
  border: {
    type: String,
    default: "item-active",
  },
  handleUpdatePickIndexGame: Function,
});

const indexPick = ref(props.indexPick);
const isViewMore = ref(false);

const handleToggleGetMoreCompany = () => {
  isViewMore.value = !isViewMore.value;
};
const handleClick = (key) => {
  store.commit("handleUpdateGameKeyV4", key);
  props?.handleUpdatePickIndexGame(key.key);
};
</script>
<style scoped lang="scss">
.item {
  width: 120px;
  height: 60px;
  padding: 5px 5px;
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
  width: 30%;
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

@media (max-width: 1024px) {
  hr {
    width: 10%;
  }
}

@media (max-width: 280px) {
  .btn-more p {
    font-size: 14px;
  }
}
</style>
