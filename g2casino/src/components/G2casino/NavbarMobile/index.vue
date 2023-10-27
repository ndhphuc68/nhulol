<template>
    <div class="navbar-menu">
        <div
            v-for="(item, index) in menuNavbar"
            :key="index"
            :class="{active: location.path === '/'+item?.href ||  location.path === '/' && item?.key === 'home' }"
            class="sidebar-item"
            @click=" () => {handleClickSidebar(item?.idx, item?.href, item?.key)}"
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
import {useStore} from "vuex";

const location = useRoute();
const router = useRouter();
const store = useStore();
const handleClickSidebar = (idx, href, key) => {
    router.push(href);
    if (key === 'casino' || key === 'slot') {
        const element = document.getElementById("tabGame");
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        } else {
            window.scrollTo({top: 100, behavior: 'smooth'});
        }
        store.commit('handleActivePickGame', key === 'casino' ? 0 : 1)
        
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
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
<style>
.active svg path {
    fill: var(--primaryG2Casino);
}
</style>