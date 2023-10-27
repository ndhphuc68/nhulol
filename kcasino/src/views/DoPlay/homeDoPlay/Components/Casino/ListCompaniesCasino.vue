<template>
  <div class="container">
    <div class="v-row list mx-0 my-0 pl-0 pl-sm-4 pr-sm-4 pr-0">
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
      >
        <button
          :class="viewChose === null ? `item item-activeDP ` : 'item'"
          @click="handleClick(null, null, null)"
        >
          <span class="font-weight-bold">{{ $t("all") }}</span>
        </button>
      </div>
      <div
        class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
        v-for="(item, index) in props.game.slice(0, 5)"
        :key="index"
      >
        <button
          :class="viewChose === item.key.toString() ? `item ${props.border}` : 'item'"
          @click="handleClick(item.id, item.key, index)"
        >
          <img
            :src="
              handleImage(item?.key)
                ? handleImage(item?.key)
                : require(`@/assets/logo/companies-game/${
                    item.key.split('_')[0]
                  }Active.png`)
            "
            alt="logo"
            class="logo-company"
            v-show="viewChose !== item.key.toString()"
          />
          <img
            :src="
              handleImage(item?.key)
                ? handleImage(item?.key)
                : require(`@/assets/logo/companies-game/${
                    item.key.split('_')[0]
                  }Active.png`)
            "
            alt="logo"
            class="logo-company-hover"
            v-show="viewChose !== item.key.toString()"
          />
          <img
            :src="
              handleImage(item?.key)
                ? handleImage(item?.key)
                : require(`@/assets/logo/companies-game/${
                    item.key.split('_')[0]
                  }Active.png`)
            "
            alt="logo"
            class="logo-company-active"
            v-show="viewChose === item.key.toString()"
          />
        </button>
      </div>
      <div
        v-if="
          (typeGameJs === 'evolution' && game.length < 1) ||
          (typeGameJs !== 'evolution' && game.length <= 4)
        "
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
      class="v-col-4 mb-4 v-col-sm-3 v-col-md-2 d-flex justify-center align-center"
      v-for="(item, index) in props.game.slice(5)"
      :key="index"
    >
      <button
        :class="viewChose === item.key.toString() ? 'item item-active' : 'item'"
        @click="handleClick(item.id, item.key, index)"
      >
        <img
          :src="
            handleImage(item?.key)
              ? handleImage(item?.key)
              : require(`@/assets/logo/companies-game/${
                  item.key.split('_')[0]
                }Active.png`)
          "
          alt="logo"
          class="logo-company"
          v-show="viewChose !== item.key.toString()"
        />
        <img
          :src="
            handleImage(item?.key)
              ? handleImage(item?.key)
              : require(`@/assets/logo/companies-game/${
                  item.key.split('_')[0]
                }Active.png`)
          "
          alt="logo"
          class="logo-company-hover"
          v-show="viewChose !== item.key.toString()"
        />
        <img
          :src="
            handleImage(item?.key)
              ? handleImage(item?.key)
              : require(`@/assets/logo/companies-game/${
                  item.key.split('_')[0]
                }Active.png`)
          "
          alt="logo"
          class="logo-company-active"
          v-show="viewChose === item.key.toString()"
        />
        <!--          <img
          v-show="viewChose !== item.id"
          loading="lazy"
          alt=""
          class="logo-company"
          :src="
            require(`@/assets/logo/companies-game/${
              item.key.split('_')[0]
            }.png`)
          "
        />
        <img
          v-show="viewChose !== item.id"
          loading="lazy"
          alt=""
          class="logo-company-hover"
          :src="
            require(`@/assets/logo/companies-game/${
              item.key.split('_')[0]
            }Active.png`)
          "
        />
        <img
          v-show="viewChose === item.id"
          loading="lazy"
          alt=""
          class="logo-company active"
          :src="
            require(`@/assets/logo/companies-game/${
              item.key.split('_')[0]
            }Active.png`)
          "
        />-->
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
          src="../../../../../assets/icon/more-down.png"
        />
        <p>{{ $t("choose-other") }}</p>
        <img
          :class="{ close: !isViewMore }"
          alt="view-more"
          class="view-more"
          src="../../../../../assets/icon/more-down.png"
        />
      </button>
      <hr />
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { handleImage } from "@/utils";
import Loading from "@/components/EDGames/Loading/index.vue";
import { useStore } from "vuex";

const $emit = defineEmits(["handleFillterCasino"]);
const store = useStore();
const viewChose = computed(() => store.state.games4.companySelect);

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
  typeGameJs: {
    type: String,
    default: "",
  },
  viewChose: {
    type: String,
    default: null,
  },
});

// const viewChose = ref(props.viewChose);
const isViewMore = ref(false);

const loadingCheck = computed(() => store.state.games2.loadingCheck);

const handleToggleGetMoreCompany = () => {
  isViewMore.value = !isViewMore.value;
};

const handleClick = (index, key, indx) => {
  $emit("handleFillterCasino", key);
};
</script>
<style scoped>
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
  width: 120px;
  height: 60px;
  padding: 5px 10px;
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
  width: 30%;
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

.choose-tab button {
  margin: 0 70px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
}

@media (max-width: 280px) {
  .btn-more p {
    font-size: 14px;
  }
  .item {
    padding: 0 5px;
  }
}
</style>
