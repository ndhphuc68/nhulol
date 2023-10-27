<template>
    <section id="service-detail">
        <div class="description">
            <h3>{{ $t('titleFaq') }}</h3>
            <h1>{{ $t('titleFaq') }}</h1>
            <p>{{ $t('desFaq') }}</p>
        </div>
        <div class="content">
            <div class="content-left">
                <img src="@/assets/G2casino/banner/banner-service.png" alt="banner"/>
            </div>
            <div class="content-right">
                <div class="tab-title">
                    <div
                        class="item"
                        :class="CurrentTab === index ? 'active' : ''"
                        v-for="(item,index) in Titles"
                        :key="index"
                        v-on:click="handleActiveTab(item.idx,item.type)">
                        {{ $t(item.type) }}
                    </div>
                </div>
                <div class="tab-content">
                    <TabItem :list="ListItem" :handleClickItem="handleClickItem"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import {ref} from 'vue';
import {useStore} from "vuex";
import {Titles, data} from './data'
import TabItem from './Components/TabItem.vue'

const CurrentTab = ref(0);
const store = useStore()
const ListItem = ref(data.filter(item => item.type === 'notice'))

const handleActiveTab = (idx, type) => {
    const newData = data.filter(item => item.type === type)
    ListItem.value = newData
    CurrentTab.value = idx
}

const handleClickItem = (idx) => {
    store.commit('handleToggle', Titles[CurrentTab.value]?.type);
    store.commit('handleActiveContent', idx)
}
</script>


<style scoped lang="scss">
#service-detail {
    margin-top: 100px;
    padding-top: 20px;
    margin-bottom: 150px;
    
    .description {
        max-width: 600px;
        margin: 0 auto;
        
        h3 {
            color: #254EE0;
            text-align: center;
            font-size: 20px;
        }
        
        h1 {
            text-align: center;
            font-size: 40px;
            width: 80%;
            margin: 0 auto;
        }
        
        p {
            color: #52525B;
            text-align: center;
            font-size: 20px;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 24px;
            }
            
            h3, p {
                font-size: 16px;
            }
        }
    }
    
    .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        
        .content-left {
            display: flex;
            
            img {
                width: 100%;
                border-radius: 8px;
            }
        }
        
        .content-right {
            .tab-title {
                display: flex;
                
                .item {
                    font-size: 20px;
                    font-weight: 600;
                    padding: 4px 16px;
                    margin-right: 24px;
                    border-radius: 81px;
                    cursor: pointer;
                    box-shadow: rgba(149, 157, 165, 0.5) 0 4px 24px;
                    
                    &:last-child {
                        margin-right: 0;
                    }
                    
                    &:hover {
                        opacity: 0.7;
                    }
                }
                
                .active {
                    background: #254EE0;
                    color: #FFFFFF;
                    
                    &:hover {
                        opacity: 1;
                    }
                }
            }
            
            .tab-content {
                margin-top: 12px;
            }
        }
    }
    
    @media (max-width: 768px) {
        .content {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 500px) {
        .content {
            .content-right {
                .tab-title {
                    .item {
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
}
</style>