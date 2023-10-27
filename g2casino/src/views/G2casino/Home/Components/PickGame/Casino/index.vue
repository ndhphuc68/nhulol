<script setup>
import {ref} from 'vue'
import CasinoItem from './CasinoItem.vue'
import Button from "@/components/G2casino/Custom/Button/index.vue";
import {listCompanyCasino} from "@/views/G2casino/Home/Components/PickGame/Components/FilterCompany/data";
import FilterCompany from '@/views/G2casino/Home/Components/PickGame/Components/FilterCompany';

const companySelect = ref("");
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);
const casinos = ref([
    {key: 'ag_casino', name: 'Ag Game 1'},
    {key: 'bcocngo_casino', name: 'Bcocngo Game 1'},
    {key: 'bg_casino', name: 'Bg Game 1'},
    {key: 'cq9_casino', name: 'Cq9 Game 1'},
    {key: 'dowinn_casino', name: 'Dowinn Game 1'},
    {key: 'dreamgaming_casino', name: 'Dreamgaming Game 1'},
    {key: 'evolution_casino', name: 'Evolution Game 1'},
    {key: 'ezugi_casino', name: 'Ezugi Game 1'},
    {key: 'go_casino', name: 'Go Game 1'},
    {key: 'gpi_casino', name: 'Gpi Game 1'},
    {key: 'microgaming_casino', name: 'Microgaming Game 1'},
    {key: 'motivation_casino', name: 'Motivation Game 1'},
    {key: 'orientalgame_casino', name: 'Orientalgame Game 1'},
    {key: 'pragmatic_casino', name: 'Pragmatic Game 1'},
    {key: 'skywind_casino', name: 'Skywind Game 1'},
    {key: 'taishan_casino', name: 'Taishan Game 1'},
    {key: 'vegas_casino', name: 'Vegas Game 1'},
    {key: 'vivo_casino', name: 'Vivo Game 1'},
    {key: 'wm_casino', name: 'Wm Game 1'},
    {key: 'netent_casino', name: 'netent Game 1'}
]);
const listCompanyCasinoView = ref(casinos.value)
const handleFilterCasino = (key) => {
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

const handleToggleFilter = () => {
    isOpenFilter.value = !isOpenFilter.value;
};

const handleChangeSearch = () => {
    console.log(searchValue.value)
    
};

</script>

<template>
    <div>
        <div class="filter-group">
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
                            src="@/assets/G2casino/icon/commons/filter.png"
                        />
                        <span class="filter-text">{{ $t("filter") }}</span>
                    </div>
                </Button>
                <div class="d-flex">
                    <button class="btn-paging">
                        <i class="pi pi-angle-left" style="font-size: 1.25rem"></i>
                    </button>
                    <button class="btn-paging active">
                        <i class="pi pi-angle-right" style="font-size: 1.25rem"></i>
                    </button>
                
                </div>
            </div>
            <div class="my-3 current-filter">
                <img
                    v-if="companySelect !== ''"
                    class="logo-img"
                    alt="logo"
                    :src="
          require(`@/assets/G2casino/logo/companies-casino/${companySelect?.split('_')[0]}_horizontal.png`)"
                />
            </div>
        </div>
        <div class="row">
            <div v-for="(casino, index) in listCompanyCasinoView" :key="index"
                 class="col-12 col-md-6  col-lg-4 col-xl-3 casino-item">
                <CasinoItem :casino="casino"/>
            </div>
        </div>
        <FilterCompany
            :casino="true"
            :company-select="companySelect"
            :list-company="listCompanyCasino"
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

.filter-group {
    position: relative;
    
    .filter-box {
        position: absolute;
        top: -60px;
        right: 0;
        
        .input-search {
            padding: 1rem 1rem 1rem 0
        }
    }
    
    .current-filter {
        text-align: left;
        
        .logo-img {
            width: 180px;
            margin: 1rem 0;
        }
    }
    
    .btn-paging {
        padding: 0 0.8rem;
        display: flex;
        align-items: center;
        color: #A1A1AA;
        
        &.active {
            color: var(--textG2Casino)
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
;
}

@media (max-width: 992px) {
    .filter-group {
        .filter-box {
            position: static;
        }
    }
}
</style>



