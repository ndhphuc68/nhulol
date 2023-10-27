<script setup>
import {computed, ref} from "vue";
import Slot from './SlotGame';
import Casino from './Casino';
import svgIcon from "@/assets/PlayG3/icon/common";

const titles = [
    {
        icon: svgIcon?.CasinoIcon,
        text: 'casino',
        name: 'Casino'
    },
    {
        icon: svgIcon?.SlotIcon,
        text: 'slot',
    }];
const tabs = [
    {component: Casino, name: 'Casino'}
    ,
    {component: Slot, name: 'Slot'}];
const currentTabIndex = ref(0);
const activeTab = computed(() => tabs[currentTabIndex.value]);

const changeTab = (idx) => {
    currentTabIndex.value = idx
}
</script>

<template>
    <div class="tab-container container">
        <div class="tabs" id="tabGame">
            <div class="d-flex">
                <button
                    class="tab-item btn-hover"
                    v-for="(title, index) in titles"
                    @click="changeTab(index)"
                    :key="index"
                    :class="{ active: currentTabIndex === index }"
                >
                    <component :is="title?.icon"/>
                    <p>{{ $t(title?.text) }}</p>
                </button>
            </div>
            
            <RouterLink class="btn-hover btn-seeMore" :to="{name : activeTab?.name}">{{ $t('seeMore') }}</RouterLink>
        </div>
        <div class="panel">
            <KeepAlive>
                <component
                    :is="activeTab.component"
                ></component>
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tab-container {
    margin: 3rem auto;
    
    .tabs {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .tab-item {
        border: none;
        padding: 12px 24px;
        display: flex;
        
        p {
            margin-bottom: 0;
            margin-left: 5px;
        }
        
        &:hover, &.active {
            background-color: var(--primaryPlayG3);
            border-radius: 5px;
        }
        
        &:nth-child(1) {
            margin-right: 1.25rem;
        }
    }
    
    .btn-seeMore {
        text-decoration: none;
    }
}
</style>