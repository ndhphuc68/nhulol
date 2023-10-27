<template>
    <div class="navbar-menu">
        <div
            v-for="(item, index) in menuNavbar"
            :key="index"
            :class="{active: location.path === '/'+item?.href}"
            class="sidebar-item"
            @click=" () => {handleClickSidebar(item?.idx, item?.href)}"
        >
            <component :is="item.icon" class="icon-item"/>
            <span class="text-item"> {{ $t(item.key) }}</span>
        </div>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {menuNavbar} from "./data";
import {useRouter} from "vue-router";

const location = useRoute();
const router = useRouter();
const handleClickSidebar = (idx, href) => {
    router.push(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped lang="scss">
.navbar-menu {
    display: flex;
    justify-content: space-between;
    position: fixed;
    padding: 20px;
    bottom: 0;
    z-index: 3;
    width: 100%;
    background: #FAFAFA;
    
    .sidebar-item {
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        
        .text-item {
            color: var(--text-second);
        }
        
        &.active {
            .text-item {
                color: var(--text);
            }
        }
    }
}
</style>