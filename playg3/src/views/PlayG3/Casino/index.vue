<script setup>
import {ref, watch, defineEmits} from "vue";
import CasinoItem from "./CasinoItem.vue";
import {listCompanyCasino} from "@/components/PlayG3/FilterCompany/data";
import FilterCompany from "@/components/PlayG3/FilterCompany";
import {useStore} from "vuex";
import {casinoList} from "@/views/PlayG3/Casino/data";


const $emits = defineEmits(["handleSelectCasino", "handlePlayGameSlot"]);

const casinos = ref(casinoList)
const listCompanyCasinoView = ref(casinoList);

const companySelect = ref("");
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);

watch(casinos, (value) => {
    listCompanyCasinoView.value = value;
});
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
    if (searchValue.value) {
        listCompanyCasinoView.value = casinos.value.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.key
                    .split("_")[0]
                    .toLowerCase()
                    .includes(searchValue.value.toLowerCase())
        );
    } else {
        listCompanyCasinoView.value = casinos.value;
    }
};

const handleChangeCasino = (key) => {
    $emits("handleSelectCasino", key);
};
</script>

<template>
    <div class="container">
        
        <div class="head-tab">
            <h4 class="title">
                {{ $t('casino') }}
            </h4>
            <div class="filter-group">
                <div class="d-flex justify-center">
                    <img
                        v-if="companySelect !== ''"
                        class="logo-img"
                        alt="logo"
                        :src="
                          require(`@/assets/PlayG3/logo/companies-casino/${
                            companySelect?.split('_')[0]
                          }_horizontal.png`)
                        "
                    />
                </div>
                <div class="filter-box ">
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
                    <button @click="handleToggleFilter" class="btn-filter">
                        <div class="d-flex align-center">
                            <img
                                alt="filter"
                                class="filter-icon"
                                src="@/assets/PlayG3/icon/common/filter.png"
                            />
                            <span class="filter-text">{{ $t("filter") }}</span>
                        </div>
                    </button>
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
        
        <div class="row">
            <div
                v-for="(casino, index) in listCompanyCasinoView"
                :key="index"
                class="col-12 col-md-6 col-lg-4 col-xl-3 casino-item"
            >
                <CasinoItem @handleChangeCasino="handleChangeCasino" :casino="casino"/>
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
.container {
    margin: 2.125rem auto;
    
}

.head-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    
    .title {
        font-size: 1.75rem;
    }
    
    .filter-group {
        display: flex;
        width: 50%;
        @media (max-width: 1200px) {
            width: 80%;
        }
        
        .filter-box {
            display: flex;
            margin-left: auto;
            align-items: center;
            width: 70%;
            
            .input-search {
                padding: 1rem 1rem 1rem 0;
            }
        }
        
        @media (max-width: 1024px) {
            width: 100%;
            .filter-box {
                margin-left: 0;
            }
        }
        @media (max-width: 768px) {
            flex-direction: column-reverse;
            .filter-box {
                width: 100%;
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
        
        .logo-img {
            height: 70px;
            max-width: 150px;
            object-fit: contain;
            margin: 1rem 0;
        }
        
    }
    
}

.casino-item {
    margin: 0.5rem 0;
}

</style>
<style lang="scss">
.filter-group {
    .v-field.v-field--appended {
        background-color: #1A1C20;
        color: #fff;
    }
}

</style>


