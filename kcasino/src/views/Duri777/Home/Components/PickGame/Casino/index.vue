<script setup>
import { ref, defineEmits } from "vue";
import CasinoItem from "./CasinoItem.vue";
import Button from "@/components/Duri777/Custom/Button/index.vue";
import FilterCompany from "@/views/Duri777/Home/Components/PickGame/Components/FilterCompany";
import { useStore } from "vuex";
import { handleImage } from "@/utils";
import { gameTypeModule17 } from "@/utils/game/dataGameModule1vs7";

const store = useStore();

const $emits = defineEmits(["handleSelectCasino", "handlePlayGameSlot"]);

const companySelect = ref("");
const isOpenFilter = ref(false);
const searchValue = ref("");
const indexOb = ref(null);
const loading = ref(false);

const listCompanyCasinoViewFilter = ref(gameTypeModule17.casino);
const listCompanyCasinoView = ref(gameTypeModule17.casino);

const handleFilterCasino = (key) => {
  if (key) {
    companySelect.value = key;
    store.commit("handleUpdateCompanySelect", key.toString());
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
      (e) => e.key === key
    );
    indexOb.value = listCompanyCasinoView.value.findIndex((e) => e.key === key);
  } else {
    companySelect.value = "";
    store.commit("handleUpdateCompanySelect", null);
    indexOb.value = null;
    listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
  }
};

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

const handleChangeSearch = () => {
  if (searchValue.value) {
    if (companySelect.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase()) &&
          item.key.toString() === companySelect.value.toString()
      );
    } else {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  } else {
    if (companySelect.value) {
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value.filter(
        (e) => e.key.toString() === companySelect.value.toString()
      );
    } else {
      indexOb.value = null;
      listCompanyCasinoViewFilter.value = listCompanyCasinoView.value;
    }
  }
};

const handleChangeCasino = (key, module) => {
  $emits("handleSelectCasino", key, module);
};
</script>

<template>
  <div>
    <div class="filter-group">
      <div class="row title-casino my-3 p-3">
        <div class="d-flex align-center col-12">
          <img
            alt="icon"
            class="icon-casino"
            src="../../../../../../assets/PlayG1/icon/slot/casino.png"
          />
          <h4 class="title">{{ $t("casino") }}</h4>
        </div>
      </div>
      <div class="col-12 my-5">
        <div class="row">
          <div class="col-4 mb-4 col-sm-3 col-md-2">
            <button
              :class="'' === companySelect && 'button-company-active'"
              @click="handleFilterCasino()"
              class="button-company"
            >
              <span class="font-weight-bold">{{ $t("all") }}</span>
            </button>
          </div>
          <div
            class="col-4 mb-4 col-sm-3 col-md-2"
            :key="index"
            v-for="(item, index) in listCompanyCasinoView?.slice(0, 5)"
          >
            <button
              :class="item.key === companySelect && 'button-company-active'"
              @click="handleFilterCasino(item.key)"
              class="button-company"
            >
              <img
                loading="lazy"
                alt="logo"
                :class="
                  item.key === companySelect
                    ? 'img-logo-header-view'
                    : 'img-logo-header'
                "
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
          <!--          <div-->
          <!--            v-if="-->
          <!--              (typeGamejs === 'evolution' &&-->
          <!--                listCompanyCasinoView.length < 1) ||-->
          <!--              (typeGamejs !== 'evolution' && listCompanyCasinoView.length < 5)-->
          <!--            "-->
          <!--            class="col-4 d-flex align-center justify-content-center mb-4 col-sm-3 col-md-2"-->
          <!--          >-->
          <!--            <button disabled class="button-company">-->
          <!--              <Loading />-->
          <!--            </button>-->
          <!--          </div>-->
        </div>
      </div>
      <div
        class="my-3 current-filter d-flex justify-content-lg-between justify-center flex-column-reverse flex-lg-row"
      >
        <div class="d-flex justify-center">
          <!--          <img-->
          <!--            v-if="companySelect !== ''"-->
          <!--            class="logo-img"-->
          <!--            alt="logo"-->
          <!--            :src="handleImage(companySelect)"-->
          <!--          />-->
        </div>
        <div class="filter-box col-lg-6 col-sm-12 d-flex align-center">
          <v-text-field
            class="input-search"
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
          <Button @click="handleToggleFilter" class="btn-filter">
            <div class="d-flex align-center">
              <img
                alt="filter"
                class="filter-icon"
                src="@/assets/Duri777/icon/commons/filter.png"
              />
              <span class="filter-text">{{ $t("filter") }}</span>
            </div>
          </Button>
          <!--          <div class="d-flex">-->
          <!--            <button class="btn-paging">-->
          <!--              <i class="pi pi-angle-left" style="font-size: 1.25rem"></i>-->
          <!--            </button>-->
          <!--            <button class="btn-paging active">-->
          <!--              <i class="pi pi-angle-right" style="font-size: 1.25rem"></i>-->
          <!--            </button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <div class="list-casino-item">
      <div
        v-for="(casino, index) in listCompanyCasinoViewFilter"
        :key="index"
        class="casino-item"
      >
        <CasinoItem
          :index="
            indexOb
              ? parseInt(indexOb + 1)
              : listCompanyCasinoView.findIndex((e) => e.key === casino.key)
              ? listCompanyCasinoView.findIndex((e) => e.key === casino.key) + 1
              : index + 1
          "
          @handleChangeCasino="handleChangeCasino"
          :casino="casino"
        />
      </div>
      <!--      <div-->
      <!--        v-if="-->
      <!--          (typeGamejs === 'evolution' && listCompanyCasinoViewFilter < 1) ||-->
      <!--          (typeGamejs !== 'evolution' && loadingCheck)-->
      <!--        "-->
      <!--        style="min-height: 260px"-->
      <!--        class="casino-item d-flex align-center justify-center"-->
      <!--      >-->
      <!--        <Loading />-->
      <!--      </div>-->
    </div>
    <FilterCompany
      :casino="true"
      :company-select="companySelect"
      :list-company="listCompanyCasinoView"
      v-if="isOpenFilter"
      :handle-toggle="handleToggleFilter"
      @handleFilterCasino="handleFilterCasino"
    />
  </div>
</template>

<style scoped lang="scss">
.casino-item {
  margin: 0.5rem 0;
}

.title-casino {
  background-image: url("../../../../../../assets/bgg1.png");

  .title {
    color: white;
  }

  .icon-casino {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  .list-btn-typeGame {
    @media (max-width: 767.98px) {
      flex-wrap: wrap;
      // flex-direction: column;
    }

    div {
      @media (max-width: 767.98px) {
        margin-bottom: 5px;
      }
    }

    .btn-change-ui {
      color: white;
      padding: 15px;
      width: 150px;
      border-radius: 6px;
      background-color: gray;

      @media (max-width: 375px) {
        font-size: 12px;
        padding: 10px 15px;
      }
    }

    .btn-change-ui-active {
      color: white;
      width: 150px;
      padding: 15px;
      border-radius: 6px;
      background-color: blue;

      @media (max-width: 375px) {
        font-size: 12px;
        padding: 10px 15px;
      }
    }
  }
}

.filter-group {
  position: relative;

  .button-company-active {
    border: 1px solid var(--primaryPlayG1);
    border-radius: 8px;
  }

  .button-company {
    width: 100%;
    padding: 10px 10px;
    height: 80px;
    @media (max-width: 375px) {
      padding: 3px 3px;
      height: 60px;
    }

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      border-radius: 8px;

      .img-logo-header {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }

    .img-logo-header-view {
      width: 100%;
      height: 100%;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    .img-logo-header {
      width: 100%;
      height: 100%;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }
  }

  .filter-box {
    .input-search {
      padding: 1rem 1rem 1rem 0;
    }
  }

  .current-filter {
    text-align: left;

    .logo-img {
      width: 300px;
      /* height: 100px; */
      margin: 1rem 0;
    }
  }

  .btn-paging {
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    color: #a1a1aa;

    &.active {
      color: var(--textG2Casino);
    }
  }

  .btn-filter {
    .filter-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .filter-text {
      color: var(--text);
    }
  }
}

.list-casino-item {
  display: grid;
  grid-template-columns: repeat(5, calc(20% - 5px));
  grid-gap: 10px;

  .casino-item {
    margin: 0;
  }
}

@media (max-width: 992px) {
  .list-casino-item {
    grid-template-columns: repeat(3, calc(33.33% - 5px));
  }
  .filter-group {
    .filter-box {
      position: static;
    }
  }
}

@media (max-width: 576px) {
  .list-casino-item {
    grid-template-columns: repeat(2, calc(50% - 5px));
  }
}
</style>
