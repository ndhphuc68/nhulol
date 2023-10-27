<script setup>
import {ref} from 'vue'
import CasinoItem from '@/views/PlayG3/Casino/CasinoItem'
import {casinoList} from "@/views/PlayG3/Casino/data";

const casinos = ref(casinoList);
const listCompanyCasinoView = ref(casinos.value);

</script>

<template>
    <div>
        <div class="row">
            <div v-for="(casino, index) in listCompanyCasinoView.slice(0,8)" :key="index"
                 class="col-12 col-md-6  col-lg-4 col-xl-3 casino-item">
                <CasinoItem :casino="casino"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.casino-item {
    margin: 0.5rem 0;
}

</style>



