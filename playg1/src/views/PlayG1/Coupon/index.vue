<template>
    <div class="container">
        <h2>{{ $t('coupon') }}</h2>
        <div class="title">
            <h3>{{ $t('available') }}</h3>
        </div>
        <div class="list-items">
            <div v-for="(item, index) in FilterArray(available,'available')"
                 :key="index"
                 class="items"
            >
                <div class="icon">
                    <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.9995 0L3.21484 12V36L23.9995 48L44.7842 36V12L23.9995 0Z" fill="#82D2FF"/>
                        <path d="M23.9995 24V0L3.21484 12L23.9995 24Z" fill="#08B7FC"/>
                        <path d="M3.21484 12V36L23.9995 24L3.21484 12Z" fill="#006DFF"/>
                        <path d="M44.7847 12L24 24L44.7847 36V12Z" fill="#08B7FC"/>
                        <path d="M23.9995 24L3.21484 36L23.9995 48V24Z" fill="#0050C0"/>
                        <path d="M24 48L44.7847 36L24 24V48Z" fill="#006DFF"/>
                        <path
                            d="M35.7297 30.7741V17.2294L23.9996 10.457L12.2695 17.2294V30.7741L23.9996 37.5465L35.7297 30.7741Z"
                            fill="#82D2FF"/>
                        <path d="M35.7301 30.7741V17.2294L24 10.457V37.5465L35.7301 30.7741Z" fill="#55CBFF"/>
                    </svg>
                </div>
                <div class="info">
                    <div class="name-coupon">
                        <p>{{ item.name }}</p>
                        <span>{{ item.text }}</span>
                    </div>
                    <button>{{ item.code }}</button>
                    <div class="redeem d-flex align-center justify-content-between mt-3">
                        <span>{{ formatDate(item.createdAt) }}</span>
                        <button>{{ $t('redeem') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="title">
            <h3>{{ $t('unavailable') }}</h3>
        </div>
        <div class="list-items opacity-50">
            <div v-for="(item, index) in FilterArray(available,'unAvailable')"
                 :key="index"
                 class="items"
            >
                <div class="icon">
                    <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.9995 0L3.21484 12V36L23.9995 48L44.7842 36V12L23.9995 0Z" fill="#82D2FF"/>
                        <path d="M23.9995 24V0L3.21484 12L23.9995 24Z" fill="#08B7FC"/>
                        <path d="M3.21484 12V36L23.9995 24L3.21484 12Z" fill="#006DFF"/>
                        <path d="M44.7847 12L24 24L44.7847 36V12Z" fill="#08B7FC"/>
                        <path d="M23.9995 24L3.21484 36L23.9995 48V24Z" fill="#0050C0"/>
                        <path d="M24 48L44.7847 36L24 24V48Z" fill="#006DFF"/>
                        <path
                            d="M35.7297 30.7741V17.2294L23.9996 10.457L12.2695 17.2294V30.7741L23.9996 37.5465L35.7297 30.7741Z"
                            fill="#82D2FF"/>
                        <path d="M35.7301 30.7741V17.2294L24 10.457V37.5465L35.7301 30.7741Z" fill="#55CBFF"/>
                    </svg>
                </div>
                <div class="info">
                    <div class="name-coupon">
                        <p>{{ item.name }}</p>
                        <span>{{ item.text }}</span>
                    </div>
                    <button>{{ item.code }}</button>
                    <div class="redeem d-flex align-center justify-content-between mt-3">
                        <span>{{ formatDate(item.createdAt) }}</span>
                        <button>{{ $t('redeem') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {available} from "@/views/PlayG1/Coupon/data";
import {formatDate} from "@/utils";

const FilterArray = (array, status) => {
    return array.filter(item => item.status === status)
}
</script>

<style lang="scss" scoped>
.title h3 {
    margin: 2rem 0;
}

.list-items {
    display: grid;
    grid-template-columns: calc(50% - 24px) calc(50% - 24px);
    grid-gap: 24px;
    
    .items {
        display: flex;
        justify-content: space-around;
        border-radius: 6px;
        border: 1px solid #E4E4E7;
        padding: 25px;
        
        .name-coupon {
            margin-bottom: .5rem;
            
            p {
                font-weight: 700;
                font-size: 1.2rem;
                margin-bottom: .5rem;
            }
        }
        
        button {
            border-radius: 4px;
            border: 1px solid #E4E4E7;
            padding: 5px 8px;
        }
        
        .redeem button {
            background-color: #254EE0;
            color: #FFFFFF;
            padding: 5px 15px;
        }
    }
    
    span {
        color: #52525B;
    }
}

@media (max-width: 541px) {
    .list-items {
        grid-template-columns: 1fr;
        
        .items {
            padding: 10px;
        }
    }
}

</style>