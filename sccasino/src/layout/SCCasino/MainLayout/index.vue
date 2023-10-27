<script setup>
import "@/assets/SCCasino/css/common.scss";
import Header from "@/components/SCCasino/Header";
import Sidebar from "@/components/SCCasino/Sidebar";
import Modal from "@/components/SCCasino/Modal";
import Footer from "@/components/SCCasino/Footer"
import NavbarMobile from "@/components/SCCasino/NavbarMobile"
// import { ref } from "vue";
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const openSidebar = computed(() => store.state.auth.sidebar);

const handleToggleSidebar = (status) => {
    store.commit("handleToggleSidebar", status);
};
</script>

<template>
    <div class="layout">
        <Header @handleToggleSidebar="handleToggleSidebar"/>
        <div class="layout-content">
            <div
                class="sidebar-group"
                :class="{ open: openSidebar }"
                @click.self="handleToggleSidebar(!openSidebar)"
            >
                <Sidebar/>
            </div>
            <div class="page">
                <router-view/>
            </div>
        </div>
        <Footer />
    </div>
    <Modal/>
</template>

<style scoped lang="scss">
.layout-content {
    max-width: 1440px;
    display: flex;
    margin-top: calc(var(--header-height-SCCasino) + 1.25rem);
    padding: 0 1.25rem;
    margin-left: auto;
    margin-right: auto;
    
    .page {
        flex: 1;
        padding: 0 1rem;
        overflow: hidden;
    }
    
    .sidebar-group {
        width: var(--sidebar-width-SCCasino);
        position: sticky;
        top: calc(var(--header-height-SCCasino) + 1.25rem);
        height: 100%;
    }
}

@media (max-width: 1024px) {
    .header-mobile {
        margin-top: calc(var(--header-height-SCCasino) + 1.25rem);
    }
    .layout-content {
      padding: 0;
      
        .page{
          padding: 0;
        }
      
        .sidebar-group {
            position: fixed;
            background: var(--bgSCCasino);
            top: 0;
            left: 0;
            width: 0;
            padding: 0;
            overflow: hidden;
            transition: all linear 0.2s;
            opacity: 0;
            z-index: 5;
            
            &::after {
                content: "";
                position: fixed;
                opacity: 0;
                transition: all linear 0.2s;
            }
            
            &.open {
                width: var(--sidebar-width-SCCasino);
                opacity: 1;
                z-index: 9999;
                
                &::after {
                    inset: 0;
                    z-index: 4;
                    background-color: rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                    opacity: 1;
                    transition: all linear 0.2s;
                }
            }
        }
    }
}
</style>
