<script setup>
import Casino from "@/views/SCCasino/Home/PickGame/Casino"
import Slots from "@/views/SCCasino/Home/PickGame/Slots"
import {computed, ref} from "vue";
import LiveCasino from "@/assets/SCCasino/icon/sidebar/live-casino.vue";
import Slot from "@/assets/SCCasino/icon/sidebar/slot.vue";
import {useI18n} from "vue-i18n";
import Button from 'primevue/button'
import {useStore} from "vuex";

const {t} = useI18n()
const loading = ref(false);
const searchValue = ref("");
const game_modals = ref([]);
const displayGame = ref([]);
const store = useStore()
const titles = computed(() => [
    {
        icon: LiveCasino,
        key: t('Casino')
    },
    {
        icon: Slot,
        key: t('Slots')
    }
]);
const tabs = [Casino, Slots];
const currentTabIndex = computed(() => store.state.games.tabGameActivate);
const activeTab = computed(() => tabs[currentTabIndex.value]);

const changeTab = (idx) => {
    store.commit('handleUpdateTabGame', idx)
}

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
    <section class="games">
        <div class="d-flex justify-content-center flex-wrap" id="tabGame">
            <div class="tabs tabs mt-5 pl-3">
                <Button
                    class="tab-item d-flex"
                    v-for="(item, index) in titles"
                    @click="changeTab(index)"
                    :key="index"
                    :class="{ active: currentTabIndex === index }"
                >
                    <component class="tab-icon-homepage" :is="item?.icon"/>
                    <p>{{ $t(item?.key) }}</p>
                </Button>
            </div>
            <div class="d-flex align-center">
                <v-card-text>
                    <v-text-field
                        :label="$t('searchingFor')"
                        :loading="loading"
                        v-model="searchValue"
                        append-inner-icon="mdi-magnify"
                        density="compact"
                        hide-details
                        single-line
                        variant="solo"
                        @input="handleChangeSearch"
                    ></v-text-field>
                </v-card-text>
            </div>
        </div>
        <div class="panel">
            <KeepAlive>
                <component
                    :is="activeTab"
                ></component>
            </KeepAlive>
        </div>
    </section>
</template>

<style scoped lang="scss">
.tabs {
    display: flex;
    margin-right: auto;
}

.tab-item {
    border: 1px solid #CCCCCC;
    padding: 5px 40px;
    border-radius: 8px;
    height: max-content;
    flex-wrap: wrap;
    justify-content: center;
    background-color: transparent;
    
    p {
        margin-bottom: 0;
    }
    
    &:hover {
        color: var(--text);
        opacity: 0.8;
        transform: scale(0.97);
        transition: all linear .2s;
        background-color: transparent;
        border-color: #CCCCCC;
    }
    
    &:nth-child(1) {
        margin-right: 1.25rem;
    }
    
    &.active {
        background-color: #40A1FF;
        color: #ffffff;
    }
}

@media (max-width: 1240px) {
    .tabs {
        margin: auto;
    }
}

@media (max-width: 541px) {
    .tabs {
        .tab-item {
            padding: 5px 24px;
        }
    }
}

</style>

<style lang="scss">
.tab-item.active {
    .tab-icon-homepage {
        path {
            fill: #ffffff;
        }
    }
}

.v-field__field {
    width: 500px;
}
</style>