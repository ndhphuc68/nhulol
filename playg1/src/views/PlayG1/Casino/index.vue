<template>
  <div class="casino-wrapper">
    <div class="casino-top row justify-content-between">
      <div class="d-flex align-center col-lg-6 col-sm-12">
        <img
          alt="icon"
          class="icon-casino"
          src="../../../assets/PlayG1/icon/slot/casino.png"
        />
        <h4 class="title">{{ $t("casino") }}</h4>
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
    <div class="row">
      <div
        v-for="(casino, index) in casinos"
        :key="index"
        class="col-12 col-sm-6 col-md-6 col-xl-4"
      >
        <CasinoItem :live="casino" class="casino-item" />
      </div>
    </div>
  </div>
  <FilterCompany v-if="isOpenFilter" :handle-toggle="handleToggleFilter" />
</template>

<script setup>
import { casinos } from "@/views/PlayG1/data";
import CasinoItem from "@/views/PlayG1/Components/CasinoItem/index.vue";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import { computed, ref, watch } from "vue";
import FilterCompany from "@/views/PlayG1/Components/FilterCompany/index.vue";

const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);

const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

watch(searchValue, () => {
  if (searchValue.value.trim() !== "") {
    console.log(searchValue.value);
  } else {
    searchValue.value = "";
  }
});
</script>

<style scoped>
.casino-top {
  margin-bottom: 48px;

  .icon-casino {
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

.casino-item {
  overflow: hidden;
  margin: 10px 0;
}
</style>