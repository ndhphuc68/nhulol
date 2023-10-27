<template>
    <div :class="layoutSidebar" class="layoutWrap">
        <Sidebar class="sidebar sidebar-desktop">
            <AuthGroup class="d-none d-sm-block d-md-none auth-group"/>
        </Sidebar>
        <div v-if="isOpenSidebar" class="sidebar-mobile">
            <Sidebar class="sidebar">
                <AuthGroup class="auth-group"/>
            </Sidebar>
            <div class="overlay" @click="toggleSideMenu"></div>
        </div>
        <div class="page">
            <div class="top-mobile px-3">
                <button v-if="!isOpenSidebar" class="btn-toggle-menu" @click="toggleSideMenu">
                    <img alt="logo-menu" class="menu-icon" src="@/assets/icon/commons/menu.png">
                </button>
                <div class="logo-group">
                    <img alt="logo" class="logo-icon" src="@/assets/logos/logo.png">
                </div>
            </div>
            <Home/>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import Sidebar from '@/layout/Components/Sidebar'
import Home from '@/views/Home'
import AuthGroup from '@/components/AuthGroup'

const layoutSidebar = ref('vertical-left');
const isOpenSidebar = ref(true);

function toggleSideMenu() {
    isOpenSidebar.value = !isOpenSidebar.value
    
}
</script>
<style scoped lang="scss">
.layoutWrap {
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
    width: 100%;
    background-color: var(--bg);
    color: var(--text);
    /*background: url("../assets/background/bg1.jpg") no-repeat;*/
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    overflow: visible;
}

.sidebar {
    position: sticky;
    top: 0;
    bottom: 0;
    max-height: 100vh;
}

.page {
    flex: 1;
    margin: 10px 0;
}

.sidebar-mobile {
    display: none;
}

.top-mobile {
    display: none;
}

.auth-group {
    margin: 20px;
}

@media (max-width: 768px) {
    .sidebar-desktop {
        display: none;
    }
    
    .sidebar-mobile {
        display: block;
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    
    .sidebar {
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: var(--bg);
        z-index: 2;
    }
    
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        //z-index: 666;
        background-color: #1c2529;
        opacity: 0.5;
    }
    
    .top-mobile {
        display: grid;
        grid-template-columns: auto auto auto;
    }
    
    .btn-toggle-menu {
        justify-self: start;
    }
    
    .logo-group {
        justify-self: center;
    }
    
    .menu-icon {
        width: 16px;
        height: 16px;
    }
    
    .logo-icon {
        height: 24px;
    }
}
</style>