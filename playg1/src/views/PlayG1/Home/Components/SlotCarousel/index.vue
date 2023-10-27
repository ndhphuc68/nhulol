<template>
    <div class="slot-carousel-container">
        <div class="wrapper-title">
            <span class="title">{{ $t('slot') }}</span>
            <div class="btn-casino">
                <Button @click="router.push('slot')">{{ $t('viewall') }}</Button>
            </div>
        </div>
        <v-sheet
            class="mx-auto in-desktop"
            max-width="100%"
        
        >
            <v-slide-group
                v-model="model"
                class="pa-4"
                selected-class="bg-success"
                show-arrows
            >
                <v-slide-group-item
                    v-for="(slot, index) in slots"
                    :key="index"
                >
                    <GameItem :game="slot" class="live-carousel-item"/>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
        <div class="row in-mobile flex-wrap">
            <div v-for="(slot, index) in slots.splice(0,4)" :key="index"
                 class="col-12 col-sm-6">
                <GameItem :game="slot" class="lives-item"/>
            </div>
        </div>
    </div>

</template>
<script setup>
const model = null;
import {slots} from '@/views/PlayG1/data'
import GameItem from '@/views/PlayG1/Components/GameItem/index.vue'
import Button from '@/components/PlayG1/customs/Button/index.vue'
import {useRouter} from "vue-router";

const router = useRouter()
</script>
<style scoped>
.slot-carousel-container {
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
    max-width: 250px;
    width: 100%;
    margin: 0 12px;
}

.lives-item {
    margin: 20px 0;
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
<style>
.live-carousel-item .live-img {
    max-width: 90%;
}
.slot-carousel-container {
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