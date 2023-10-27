<script setup>
import Service from '@/views/G2casino/Home/Components/Service'
import ServiceDetail from '@/views/G2casino/Home/Components/ServiceDetail'
import Banner from '@/views/G2casino/Home/Components/Banner'
import Partners from '@/views/G2casino/Home/Components/Partners'
import PickGame from '@/views/G2casino/Home/Components/PickGame'
</script>

<template>
    <!-- This is Home page -->
    <Banner/>
    <div class="wrap">
        <Partners/>
        <PickGame/>
        <Service/>
        <ServiceDetail/>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    max-width: 1440px;
    width: 90%;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        width: 95%;
    }
}
</style>