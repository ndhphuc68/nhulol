<template>
    <div class="sidebar">
        <div class="wrapper-logo">
            <img :src="images.logo" alt="logo-do-play" class="logo w-100"/>
        </div>
        <div class="sidebar-menu">
            <div
                v-for="(item, index) in menuSidebar"
                :key="index"
                :class="{ active: location.path === '/' + item?.href }"
                class="sidebar-item"
                @click="
          () => {
            handleClickSidebar(item?.idx, item?.href);
          }
        "
            >
                <component :is="item.icon" class="icon-item"/>
                <span class="text-item"> {{ $t(item.key) }}</span>
            </div>
        </div>
        <AuthMobile class="d-block d-md-none"/>
        <slot/>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import images from "@/assets/PlayG1";
import {menuSidebar} from "./data";
import {useRouter, useRoute} from "vue-router";
import AuthMobile from "./AuthMobile/index.vue";

const store = useStore();
const router = useRouter();
const location = useRoute();

// import {useStore} from "vuex";
// import RealtimeMoney from './components/RealtimeMoney';
// import Personal from '@/views/modals/Personal'

// const store = useStore();
//
// function handleClickMenu() {
//   store.commit('openModal', {modalKey: 'personal', component: () => Personal})
// }

const handleClickSidebar = (idxSidebar, href) => {
    if (href) {
        router.push(href);
        window.scrollTo({top: 0, behavior: "smooth"});
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    width: 240px;
    box-shadow: 1px 0 12px rgba(0, 0, 0, 0.15);
    height: 100%;
    overflow-y: scroll;
    position: fixed;
    z-index: 5;
    background-color: var(--bg);
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    .sidebar-menu {
    }
    
    .wrapper-logo {
        height: 6rem;
        padding: 0 26px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e4e4e7;
        cursor: pointer;
    }
    
    .sidebar-item {
        display: flex;
        align-items: center;
        height: 4.2rem;
        padding: 0 20px;
        font-weight: 600;
        font-size: 14px;
        color: var(--text-second);
        cursor: pointer;
        position: relative;
        
        svg {
            margin-right: 8px;
            
            path {
                fill: red !important;
            }
        }
        
        &:hover,
        &.active {
            color: var(--black);
            
            &:before {
                content: "";
                width: 4px;
                height: 48px;
                background: var(--primary);
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
                position: absolute;
                left: 0;
            }
        }
    }
}
</style>

<style lang="scss">
.active {
    .icon-item {
        path {
            fill: var(--primary);
        }
    }
}
</style>