<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import ItemCasino from "@/views/SCCasino/Home/PickGame/Casino/Component/ItemCasino.vue";
import FilterCompany from "@/views/SCCasino/Home/Component/FilterCompany";
import {listCompanyCasino} from "@/views/SCCasino/Home/Component/FilterCompany/data";

const store = useStore();

const casinos = ref([
  {key: 'ag_casino', name: 'Ag Game 1'},
  {key: 'bg_casino', name: 'Bg Game 1'},
  {key: 'cq9_casino', name: 'Cq9 Game 1'},
  // {key: 'dowinn_casino', name: 'Dowinn Game 1'},
  {key: 'dreamgaming_casino', name: 'Dreamgaming Game 1'},
  {key: 'evolution_casino', name: 'Evolution Game 1'},
  {key: 'ezugi_casino', name: 'Ezugi Game 1'},
  // {key: 'go_casino', name: 'Go Game 1'},
  {key: 'gpi_casino', name: 'Gpi Game 1'},
  {key: 'microgaming_casino', name: 'Microgaming Game 1'},
  {key: 'motivation_casino', name: 'Motivation Game 1'},
  // {key: 'orientalgame_casino', name: 'Orientalgame Game 1'},
  // {key: 'pragmatic_casino', name: 'Pragmatic Game 1'},
  {key: 'skywind_casino', name: 'Skywind Game 1'},
  {key: 'taishan_casino', name: 'Taishan Game 1'},
  {key: 'vegas_casino', name: 'Vegas Game 1'},
  {key: 'vivo_casino', name: 'Vivo Game 1'},
  {key: 'wm_casino', name: 'Wm Game 1'},
]);

const showAllCasinos = ref(false);

const listCompanyCasinoView = ref(casinos.value)
const handleSelectCasino = (key) => {
  if (key) {
    companySelect.value = key;
    listCompanyCasinoView.value = casinos.value.filter(
        (e) => e.key.split("_")[0] === key.split("_")[0]
    );
  } else {
    companySelect.value = "";
    listCompanyCasinoView.value = casinos.value;
  }
};

const companySelect = ref("");

let tab = null;

const displayedCasinos = computed(() => {
  return showAllCasinos.value ? listCompanyCasinoView.value : listCompanyCasinoView.value.slice(0, 8);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

onMounted(async () => {
  store.commit("handleUpdateLoading", true);
  await store.dispatch("getListGameProviderActions");
  store.commit("handleUpdateLoading", false);
});
</script>

<template>
  <div class="container live-main">
    <div class="row mt-4">
      <FilterCompany
          @handleFillter="handleSelectCasino"
          :company-select="companySelect"
          :listCompany="listCompanyCasino"
          :listCompanyHeader="listCompanyCasino"
      />
      <div class="col-12 mt-2">
        <div class="row">
          <div
              class="col-12"
          >
            <img
                v-if="companySelect !== ''"
                loading="lazy"
                alt=""
                class="logo-img"
                :src="
                require(`@/assets/SCCasino/logos/companies-game/${
                  companySelect.split('_')[0]
                }_horizontal.png`)
              "
            />
          </div>
        </div>
        <div class="row mt-4">
          <div
              :key="index"
              class="col-xl-3 col-lg-4 col-md-6 col-12 h-100 mb-4"
              v-for="(item, index) in displayedCasinos"
          >
            <ItemCasino :game="item" @handleSelectCasino="handleSelectCasino" />
          </div>
        </div>
      </div>
      <div class="my-5 d-flex justify-center">
        <button v-if="!showAllCasinos" @click="showAllCasinos = true" class="primary-button btn-load">{{ $t('loadMore') }}</button>
        <button v-else @click="showAllCasinos = false" class="primary-button btn-less">{{ $t('showLess') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.live-main {
  //.logo-img {
  //  width: 300px;
  //  height: 100px;
  //}

  .btn-load, .btn-less{
    background-color: #fff;
    border: 1px solid #0189FF;
    color: #0189FF;
  }
}
</style>
