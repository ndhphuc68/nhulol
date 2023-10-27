<script setup>
import {ref} from 'vue'
import SlotGameItem from "@/views/G2casino/Home/Components/PickGame/SlotGame/SlotGameItem";
import FilterCompany from '@/views/G2casino/Home/Components/PickGame/Components/FilterCompany';
import {listCompanySlot} from '@/views/G2casino/Home/Components/PickGame/Components/FilterCompany/data'
import Button from '@/components/G2casino/Custom/Button'

const slotgames = ref([
    {
        "id": 1761,
        "key": "3663b0d8-f65b-4c99-8613-01b424dfea90",
        "image": "https://static.softgamings.com/games/habanero/208/the_koi_gate.jpg",
        "names": {
            "ko": "게임 1",
            "en": "game 1"
        }
    },
    {
        "id": 1714,
        "key": "e9138201-6c71-4c6d-bf08-a7272299b090",
        "image": require('@/assets/G2casino/games/mystic.png'),
        "names": {
            "ko": "게임 2",
            "en": "game 2"
        }
    },
    {
        "id": 1745,
        "key": "8c38afff-c32c-4933-9a7b-f55e2b3feb43",
        "image": "https://static.softgamings.com/games/habanero/208/hot_hot_fruit.jpg",
        "names": {
            "ko": "게임 3",
            "en": "game 3"
        }
    },
    {
        "id": 1739,
        "key": "5b13ecfc-7ba6-4a17-a2ba-b0b04cae63fe",
        "image": "https://static.softgamings.com/games/habanero/208/hot_hot_halloween.jpg",
        "names": {
            "ko": "게임 4",
            "en": "game 4"
        }
    },
    {
        "id": 1736,
        "key": "9b0ffe80-1cec-41d6-b3eb-42cdc0ea9ceb",
        "image": "https://static.softgamings.com/games/habanero/208/wild_trucks.jpg",
        "names": {
            "ko": "게임 5",
            "en": "game 5"
        }
    },
    {
        "id": 1756,
        "key": "96847a10-41e8-4710-bcdd-498f45ce619d",
        "image": "https://static.softgamings.com/games/habanero/208/santas_village.jpg",
        "names": {
            "ko": "게임 6",
            "en": "game 6"
        }
    },
    {
        "id": 1733,
        "key": "4d5f9b14-d24e-429a-8e68-6125b0971827",
        "type": "Video Slots",
        "image": "https://static.softgamings.com/games/habanero/208/naughty_santa.jpg",
        "names": {
            "ko": "게임 7",
            "en": "game 7"
        }
    },
    {
        "id": 1741,
        "key": "e1db2d67-ce4f-4732-8d97-45e004d0ec9c",
        "image": "https://static.softgamings.com/games/habanero/208/lucky_fortune_cat.jpg",
        "names": {
            "ko": "게임 8",
            "en": "game 8"
        }
    },
    {
        "id": 1734,
        "key": "d8fed729-2412-4dc5-8207-5717791c4ee0",
        "image": "https://static.softgamings.com/games/habanero/208/fa_cai_shen_deluxe.jpg",
        "names": {
            "ko": "게임 9",
            "en": "game 9"
        }
    },
    {
        "id": 1760,
        "key": "18ec58d1-58e9-4262-ae0c-52e8eddc4f17",
        "image": "https://static.softgamings.com/games/habanero/208/nuwa.jpg",
        "names": {
            "ko": "게임 10",
            "en": "game 10"
        }
    },
    {
        "id": 2981,
        "key": "43095531-7bbd-4b65-bdb8-a7cdee77c3f3",
        "image": "https://slotgods.co.uk/storage/app/media/online-slots/Lantern-Luck-Logo.webp",
        "names": {
            "ko": "게임 11",
            "en": "game 11"
        }
    },
    {
        "id": 1730,
        "key": "af635790-9437-48dc-8d2b-d504d02db8a2",
        "image": "https://static.softgamings.com/games/habanero/208/wealth_inn.jpg",
        "names": {
            "ko": "게임 12",
            "en": "game 12"
        }
    },
    {
        "id": 1753,
        "key": "b81d7393-00b8-44be-abb4-18212c6a35b3",
        "image": "https://www.gamblerspick.com/uploads/monthly_2018_02/fourd.png.aa04f0d5811ff7a8639593c9aa1ba29b.jpg",
        "names": {
            "ko": "게임 13",
            "en": "game 13"
        }
    },
    {
        "id": 1744,
        "key": "36d33673-12ba-4909-a3af-efffb6f8f1e8",
        "image": "https://static.softgamings.com/games/habanero/208/happiest_christmas_tree.jpg",
        "names": {
            "ko": "게임 14",
            "en": "game 14"
        }
    },
    {
        "id": 1751,
        "key": "910c74b1-95f4-402f-98c7-f9e4d2ee33a3",
        "image": "https://static.softgamings.com/games/habanero/208/egyptian_dreams_deluxe.jpg",
        "names": {
            "ko": "게임 15",
            "en": "game 15"
        }
    },
    {
        "id": 1772,
        "key": "468f8de0-69fe-4fc7-81f8-e1a49c3eb65b",
        "image": "https://static.softgamings.com/games/habanero/208/fa_cai_shen.jpg",
        "names": {
            "ko": "게임 16",
            "en": "game 16"
        }
    }]);
const gameKey = 'habanero_slot';
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

const handlePlayGameSlot = () => {
}
const checkGameHide = (key) => {
    const check = dataHide.find((e) => e === key);
    return !check;
};
const handleToggleFilter = () => {
    isOpenFilter.value = !isOpenFilter.value;
};
const handleSelectGame = async (key) => {

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
                    v-if="gameKey !== ''"
                    class="logo-img"
                    alt="logo"
                    :src="
          require(`@/assets/G2casino/logo/companies-slot/${gameKey?.split('_')[0]}_horizontal.png`)
        "
                />
            </div>
        </div>
        
        
        <div class="row">
            <div
                v-for="(game, index) in slotgames"
                :key="index"
                class="col-lg-3 col-md-4 col-12"
                :class="checkGameHide(game.key) ? ' px-3 py-3' : 'd-none'"
            >
                <SlotGameItem
                    @handlePlayGameSlot="handlePlayGameSlot"
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