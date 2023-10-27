<script setup>
import {computed, ref} from "vue";
import {Titles} from "./data";
import Event from "@/views/Play4G/Home/ServiceDetail/Component/Event.vue";
import Notice from "@/views/Play4G/Home/ServiceDetail/Component/Notice.vue";
import FAQs from "@/views/Play4G/Home/ServiceDetail/Component/FAQs.vue";

const CurrentTab = ref(0);
const contents = [Notice, Event, FAQs];
const activeTab = computed(() => contents[CurrentTab.value]);
const handleActiveTab = (idx) => {
    CurrentTab.value = idx;
};
</script>

<template>
    <section id="service-detail">
        <div class="container">
            <div class="description">
                <h3>{{ $t("titleFaq") }}</h3>
                <div class="title-desc">
                    <h2>{{ $t("titleFaq") }}</h2>
                    <p>{{ $t("desFaq") }}</p>
                </div>
            </div>
            <div class="content row">
                <div class="content-left col-12 mb-5">
                    <img src="@/assets/Play4G/banner/banner-service.png" alt="banner"/>
                </div>
                <div class="content-right col-12">
                    <div class="tab-title">
                        <div
                            class="item"
                            :class="CurrentTab === index ? 'active' : ''"
                            v-for="(item, index) in Titles"
                            :key="index"
                            v-on:click="handleActiveTab(item.idx, item.type)"
                        >
                            {{ $t(item.type) }}
                        </div>
                    </div>
                    <div class="tab-content">
                        <component :is="activeTab"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
#service-detail {
    margin-top: 100px;
    padding-top: 20px;
    padding-bottom: 150px;
    
    @media (max-width: 768px) {
        & {
            margin-top: 0;
            padding-top: 0;
            padding-bottom: 1rem;
        }
    }
    
    .description {
        margin-bottom: 3rem;
        
        .title-desc {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 24px;
            
            p {
                font-size: 0.95rem;
            }
        }
        
        h3 {
            color: #fff;
            font-size: 20px;
        }
        
        p {
            color: #fff;
            font-size: 20px;
        }
        
        @media (max-width: 768px) {
            h2 {
                font-size: 24px;
            }
            
            h3,
            p {
                font-size: 16px;
            }
        }
    }
    
    .content {
        //display: grid;
        //grid-template-columns: repeat(2, 1fr);
        //grid-gap: 24px;
        
        .content-left {
            display: flex;
            margin-top: 10px;
            
            img {
                width: 100%;
                border-radius: 8px;
            }
        }
        
        .content-right {
            margin-top: 10px;
            
            .tab-title {
                display: flex;
                
                .item {
                    padding: 4px 16px;
                    margin-right: 24px;
                    border-radius: 81px;
                    cursor: pointer;
                    color: #fff;
                    
                    &:last-child {
                        margin-right: 0;
                    }
                    
                    &:hover {
                        opacity: 0.7;
                    }
                }
                
                .active {
                    background-color: var(--primaryPlay4G);
                    
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
  @media (max-width: 992px) {
    .content {
      grid-template-columns: 1fr !important;
    }

  }
    
    @media (max-width: 768px) {
        .content,
        .title-desc {
            grid-template-columns: 1fr !important;
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
