<template>
  <div class="container">
    <div class="v-row list mx-0 my-0 pl-4 pr-4">
      <div
        class="v-col-6 mb-4 v-col-sm-4 v-col-md-2 d-flex justify-center align-center"
      >
        <button
          :class="viewChose === null ? `item ${props.border}` : 'item'"
          @click="handleClick(null)"
        >
          <span class="font-weight-bold">{{ $t("all") }}</span>
        </button>
      </div>
      <div
        class="v-col-6 mb-4 v-col-sm-4 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(0, 5)"
        :key="index"
      >
        <button
          :class="viewChose === item.key ? `item ${props.border}` : 'item'"
          @click="handleClick(item.key)"
        >
          <img
            :class="handleCheckCompany(item) ? '' : 'disable-item'"
            :src="
              handleImage(item.key)
                ? handleImage(item.key)
                : require(`@/assets/logo/companies-game/${item.key
                    .toString()
                    .toLowerCase()}Active.png`)
            "
            alt="logo"
            class="logo-company"
            v-show="viewChose !== item.key"
          />
          <img
            :class="handleCheckCompany(item) ? '' : 'disable-item'"
            :src="
              handleImage(item.key)
                ? handleImage(item.key)
                : require(`@/assets/logo/companies-game/${item.key
                    .toString()
                    .toLowerCase()}Active.png`)
            "
            alt="logo"
            class="logo-company-hover"
            v-show="viewChose !== item.key"
          />
          <img
            :class="handleCheckCompany(item) ? '' : 'disable-item'"
            :src="
              handleImage(item.key)
                ? handleImage(item.key)
                : require(`@/assets/logo/companies-game/${item.key
                    .toString()
                    .toLowerCase()}Active.png`)
            "
            alt="logo"
            class="logo-company-active"
            v-show="viewChose === item.key"
          />
        </button>
      </div>
      <div
        v-if="game.length <= 4"
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
      >
        <button class="item">
          <Loading />
        </button>
      </div>
    </div>
  </div>
  <div v-show="isViewMore" class="v-row list mx-0 my-0 pl-4 pr-4">
    <div
      class="v-col-6 mb-4 v-col-sm-4 v-col-md-2 d-flex justify-center align-center"
      v-for="(item, index) in props.game.slice(5)"
      :key="index"
    >
      <button
        :class="viewChose === item.key ? 'item item-active' : 'item'"
        @click="handleClick(item.key)"
      >
        <img
          :class="handleCheckCompany(item) ? '' : 'disable-item'"
          :src="
            handleImage(item.key)
              ? handleImage(item.key)
              : require(`@/assets/logo/companies-game/${item.key
                  .toString()
                  .toLowerCase()}Active.png`)
          "
          alt="logo"
          class="logo-company"
          v-show="viewChose !== item.key"
        />
        <img
          :class="handleCheckCompany(item) ? '' : 'disable-item'"
          :src="
            handleImage(item.key)
              ? handleImage(item.key)
              : require(`@/assets/logo/companies-game/${item.key
                  .toString()
                  .toLowerCase()}Active.png`)
          "
          alt="logo"
          class="logo-company-hover"
          v-show="viewChose !== item.key"
        />
        <img
          :class="handleCheckCompany(item) ? '' : 'disable-item'"
          :src="
            handleImage(item.key)
              ? handleImage(item.key)
              : require(`@/assets/logo/companies-game/${item.key
                  .toString()
                  .toLowerCase()}Active.png`)
          "
          alt="logo"
          class="logo-company-active"
          v-show="viewChose === item.key"
        />
      </button>
    </div>
    <div
      v-if="game.length > 4 && loadingCheck"
      class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
    >
      <button class="item" disabled>
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
</template>
<script setup>
import { ref, defineProps, defineEmits, computed, watch } from "vue";
// import { handleImage } from "@/utils";
import Loading from "@/components/EDGames/Loading/index.vue";
import { useStore } from "vuex";
import { handleImage } from "@/utils";

const $emit = defineEmits(["handleFillterCasino"]);
const store = useStore();

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
  game: {
    type: Array,
    required: true,
    default: () => [],
  },
  indexPick: {
    type: Number,
    default: -1,
  },
  isView: {
    type: Boolean,
    default: false,
  },
  border: {
    type: String,
    default: "item-active",
  },
});

const viewChose = ref(null);
const isViewMore = ref(false);

const loadingCheck = computed(() => store.state.games2.loadingCheck);

const handleToggleGetMoreCompany = () => {
  isViewMore.value = !isViewMore.value;
};

const handleClick = (key) => {
  viewChose.value = key;
  $emit("handleFillterCasino", key);
};
</script>
<style scoped>
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%) !important;
}
.logo-company-active {
  width: 100%;
  height: 100%;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

.logo-company {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.logo-company-hover,
.logo-company {
  width: 100%;
  height: 100%;
}

.logo-company-hover {
  display: none;
}

.item.item-active {
  border: 1px var(--primary) solid;
}

.item.item-activeDP {
  border: 1px var(--primaryDoplay) solid;
}

.item {
  width: 160px;
  height: 80px;
  padding: 5px 10px;
}

@media (max-width: 375px) {
  .item {
    height: 35px;
  }
}

.item:hover span {
  color: black;
}

.item:hover .logo-company {
  display: none;
}

.item:hover .logo-company.active {
  display: block;
}

.item:hover .logo-company-hover {
  display: block;
  transform: scale(1.2);
  transition: transform linear 0.2s;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

.search-box input {
  padding: 5px;
  color: var(--text-second);
}

hr {
  width: 35%;
  height: 0;
  border: 1px solid #000000;
  margin: 0;
}

.item-logo.active {
  display: none;
}

.item:hover .item-logo {
  display: none;
}

.item:hover .item-logo.active {
  display: block;
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
}

.choose-tab button {
  margin: 0 70px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
}
</style>
