<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import Slot from './SlotGame';
import Casino from './Casino';
import Button from 'primevue/button'

const titles = ["casino", "slot"];
const tabs = [Casino, Slot];
const store = useStore();
const currentTabIndex = (computed(()=>store.state.auth.activePickGame));
const activeTab = computed(() => tabs[currentTabIndex.value]);

const changeTab = (idx) => {
    store.commit('handleActivePickGame', idx)
}
</script>

<template>
    <div class="tab-container">
        <div class="tabs" id="tabGame">
            <Button
                class="tab-item"
                v-for="(title, index) in titles"
                @click="changeTab(index)"
                :key="index"
                :class="{ active: currentTabIndex === index }"
            >
                <p>{{ $t(title) }}</p>
            </Button>
        </div>
        <div class="panel">
            <KeepAlive>
                <component
                    :is="activeTab"
                ></component>
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tab-container {
    margin: 0 0.75rem;
    
    .tabs {
        display: flex;
        margin-right: auto;
    }
    
    .tab-item {
        background: #FAFAFA;
        border: none;
        padding: 12px 24px;
        
        p {
            margin-bottom: 0;
        }
        
        &:hover {
            color: var(--text);
            opacity: 0.8;
            transform: scale(0.97);
            transition: all linear .2s;
        }
        
        &:nth-child(1) {
            margin-right: 1.25rem;
        }
        
        &.active {
            background-color: var(--primaryG2Casino);
            color: #ffffff;
        }
    }
}
</style>