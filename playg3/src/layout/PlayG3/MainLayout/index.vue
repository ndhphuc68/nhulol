<script setup>
import "@/css/PlayG3/common.scss";
import Header from '@/components/PlayG3/Header'
import Footer from  '@/components/PlayG3/Footer'
import ModalPage from "@/components/PlayG3/Modal/ModalPage.vue";
</script>

<template>
    <div class="layout">
        <Header/>
        <div class="page">
            <router-view/>
        </div>
        <Footer />
    </div>
  <ModalPage />
</template>

<style scoped lang="scss">
</style>
