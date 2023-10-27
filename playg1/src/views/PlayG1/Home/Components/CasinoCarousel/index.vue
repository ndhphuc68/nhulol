<template>
    <div class="casino-carousel-container">
        <div class="wrapper-title">
            <span class="title">{{ $t('casino') }}</span>
            <div class="btn-casino">
                <Button @click="router.push('casino')">{{ $t('viewall') }}</Button>
            </div>
        </div>
        <v-sheet
            class="in-desktop mx-auto"
        >
            <v-slide-group
                v-model="model"
                class="py-4"
                selected-class="bg-success"
                show-arrows
            >
                <v-slide-group-item
                    v-for="(live, index) in casinos"
                    :key="index"
                >
                    <div>
                        <CasinoItem :live="live" class="live-carousel-item"/>
                    </div>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
        <div class="row in-mobile justify-center">
            <div v-for="(live, index) in casinos.splice(0,4)" :key="index"
                 class="col-12 col-sm-6">
                <CasinoItem :live="live" class="lives-item"/>
            </div>
        </div>
    </div>

</template>
<script setup>
const model = null;
import {casinos} from '@/views/PlayG1/data'
import CasinoItem from '@/views/PlayG1/Components/CasinoItem/index.vue'
import Button from '@/components/PlayG1/customs/Button/index.vue'
import {useRouter} from "vue-router";

const router = useRouter()
</script>
<style scoped>
.casino-carousel-container {
    margin: 40px 0;
    position: relative;
    
    .wrapper-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px;
        
        .title {
            font-size: 32px;
            font-weight: 600;
            line-height: 39px;
            letter-spacing: 0;
            text-align: left;
        }
    }
}

.live-carousel-item {
    margin: 0 14px;
    width: 350px;
    overflow: hidden;
}

.lives-item {
    overflow: hidden;
    margin: 15px 0;
}

@media (max-width: 1460px) {
    .live-carousel-item {
        width: 344px;
    }
}

.in-mobile {
    display: none;
}

@media (max-width: 1440px) {
    .in-mobile {
        display: flex;
    }
    
    .in-desktop {
        display: none;
    }
}

</style>
<style lang="scss">
.live-carousel-item .live-img {
    max-width: 90%;
}

.casino-carousel-container {
    .v-slide-group__next, .v-slide-group__prev {
        position: absolute;
        top: 14px
    }
    
    .v-slide-group__next {
        right: 140px;
    }
    
    .v-slide-group__prev {
        right: 190px;
    }
}
</style>