<template>
    <div class="slide">
        <v-carousel
            :show-arrows="false"
            class="custom"
            cycle
            delimiter-icon="'$delimiter'"
            height="auto"
            hide-delimiter-background
        >
            <v-carousel-item v-for="(banner, index) in banners" :key="index" class="cssClass">
                <v-sheet height="100%">
                    <div>
                        <img :src="banner.img"
                             alt="banned"
                             class="banned"
                        />
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup>
import {banners} from "@/views/PlayG1/Home/Components/Slide/data";
</script>

<style lang="scss" scoped>
.slide {
    
    .custom {
        width: 100%;
        
        .v-window {
            height: auto !important;
        }
        
        .banned {
            width: 100%;
            max-height: 510px;
            border-radius: 8px;
        }
        
        .v-carousel__controls {
            background: red !important;
            
            .v-btn--icon {
                background: red;
            }
        }
    }
}
</style>

<style lang="scss">
.custom {
    
    .v-carousel__controls {
        .v-btn {
            background-color: #E4E4E7 !important;
            width: 10px;
            height: 10px;
            margin-right: 10px;
        }
        
        .v-btn--active {
            color: #000000 !important;
            background-color: #000000 !important;
        }
    }
    
    
}
</style>