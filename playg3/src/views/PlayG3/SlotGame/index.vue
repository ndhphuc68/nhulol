<script setup>
import {ref} from "vue";
import SlotGameItem from "./SlotGameItem";
import FilterCompany from "@/components/PlayG3/FilterCompany";
import {companySlots, games} from './data'

const gameKey = ref('habanero_slot');
const listCompanySlot = ref(companySlots);

const dataHide = [
    "525dd3b1-b829-490a-a337-19bf04986ec9",
    "32a0b1f9-2753-4bec-8cfc-a40b2fa585d4",
    "17bfea87-c325-4bb3-9e33-6ecf367fcd1e",
    "eae7f941-2343-48da-a0f3-74bd362c0a9a",
    "53da6f68-ddff-4f95-af9a-ba8b96e568bb",
    "730151ed-8489-4bed-b910-73f86261753c",
    "2da3e2d6-9aaa-4d28-9120-20da0fb4e4d1",
    "ddafc78d-d83a-4504-bc48-5d896266e058",
];
const isOpenFilter = ref(false);
const searchValue = ref("");
const loading = ref(false);

const game_modals = ref([]);
const displayGame = ref(games);

// watch(useI18n().locale, async () => {
//     await handleSelectGame(gameKey.value);
// });
//
// onMounted(async () => {
//     await handleSelectGame(listCompanySlot.value[0]?.key);
// });
const handlePlayGameSlotItem = (key) => {
    // if (store.state.auth.auth) {
    //     store.commit("handleUpdateLoading", true);
    //     $emits("handlePlayGameSlot", key);
    // } else {
    //     router.push({name: "Login"});
    // }
};
const checkGameHide = (key) => {
    const check = dataHide.find((e) => e === key);
    return !check;
};
const handleToggleFilter = () => {
    isOpenFilter.value = !isOpenFilter.value;
};
const handleSelectGame = async (key) => {
    // store.commit("handleUpdateGameKey", key);
    // store.commit("handleUpdateLoading", true);
    // game_modals.value = [];
    // displayGame.value = [];
    // const data = {
    //     provider_id: key,
    // };
    // const res = await store.dispatch("getListGameCompanyActions", data);
    // if (res) {
    //     game_modals.value = [...res];
    //     displayGame.value = [...res];
    // } else {
    //     await store.dispatch("showAlert", {
    //         type: "error",
    //         message: t("error_vendor"),
    //     });
    //     game_modals.value = [];
    //     displayGame.value = [];
    // }
    // store.commit("handleUpdateLoading", false);
};
const handleChangeSearch = () => {
    displayGame.value = [
        ...game_modals.value.filter(
            (item) =>
                item.names.ko.includes(searchValue.value) ||
                item.names.en.toLowerCase().includes(searchValue.value)
        ),
    ];
};
</script>

<template>
    <div class="container">
        
        <div class="head-tab">
            <h4 class="title">
                {{ $t('slot') }}
            </h4>
            <div class="filter-group">
                <div class="d-flex justify-center">
                    <img
                        v-if="gameKey"
                        class="logo-img"
                        alt="logo"
                        :src="
                            require(`@/assets/PlayG3/logo/companies-slot/${
                              gameKey?.split('_')[0]
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
        
        <div class="row w-100">
            <div
                v-for="(game, index) in displayGame"
                :key="index"
                class="game-slot d-flex"
                :class="checkGameHide(game.key) ? ' px-3 py-3' : 'd-none'"
            >
                <SlotGameItem
                    class="w-100"
                    @handlePlayGameSlotItem="handlePlayGameSlotItem"
                    :game="game"
                    :type-compay-game="gameKey"
                />
            </div>
        </div>
        <FilterCompany
            :casino="false"
            :company-select="gameKey"
            :list-company="listCompanySlot"
            v-if="isOpenFilter"
            :handle-toggle="handleToggleFilter"
            @handleSelectGame="handleSelectGame"
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
            align-items: center;
            margin-left: auto;
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

.game-slot {
    width: 20%;
    
    @media (max-width: 1400px) {
        width: 25%;
    }
    @media (max-width: 991.98px) {
        width: 33.33333%;
    }
    
    @media (max-width: 767.98px) {
        width: 50%;
    }
    @media (max-width: 575.98px) {
        width: 100%;
    }
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
