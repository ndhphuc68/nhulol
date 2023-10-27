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
            @click:append-inner="() => {}"
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
        v-for="(game, index) in slots"
        :key="index"
        class="col col-6 col-sm-4 col-lg-3"
      >
        <GameItem :game="game" class="slot-item" />
      </div>
    </div>
  </div>
  <FilterCompany v-if="isOpenFilter" :handle-toggle="handleToggleFilter" />
</template>

<script setup>
import { slots } from "@/views/PlayG1/data";
import GameItem from "@/views/PlayG1/Components/GameItem/index.vue";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import FilterCompany from "@/views/PlayG1/Components/FilterCompany/index.vue";
import { ref, watch } from "vue";

const loading = ref(false);
const isOpenFilter = ref(false);
const searchValue = ref("");
const handleToggleFilter = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

watch(searchValue, () => {
  if (searchValue.value.trim() !== "") {
    console.log(searchValue.value);
  }
});
</script>

<style scoped>
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