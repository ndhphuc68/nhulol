<script setup>
import "@/assets/G2casino/css/common.scss";
import Header from '@/components/G2casino/Header'
import Footer from '@/components/G2casino/Footer'
import ModalPage from "@/components/G2casino/Modal/ModalPage";
import NavbarMobile from "@/components/G2casino/NavbarMobile";
</script>

<template>
    <div class="wrapper-main">
        <div class="page">
            <Header/>
            <router-view/>
            <Footer/>
        </div>
    </div>
    <ModalPage />
    <NavbarMobile class="navbar-mobile"/>
</template>

<style scoped>
    .navbar-mobile {
        display: none;
    }
    
    @media (max-width: 768px) {
        .navbar-mobile {
            display: flex;
        }
    }
</style>