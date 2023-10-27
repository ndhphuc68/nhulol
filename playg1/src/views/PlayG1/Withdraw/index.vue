<template>
    <div class="container">
        <h2>{{ $t('withdraw') }}</h2>
        <div class="card">
            <div class="row">
                <div class="col-lg-6">
                    <h3 class="item-title">{{ $t('totalBalance') }}</h3>
                    <p class="item-sub">{{ $t('desTotalBalance') }}</p>
                </div>
                <div class="col-lg-6">
                    <input class="item-input" type="number" disabled/>
                </div>
                <hr/>
            </div>
            <div class="row">
                <div class="col-lg-6 ">
                    <h3 class="item-title">{{ $t('withdrawAmount') }}</h3>
                    <p class="item-sub">{{ $t('desWithdrawAmount') }}</p>
                </div>
                <div class="col-lg-6 text-right">
                    <input :value="convertMoney(amount)" class="item-input" disabled/>
                    <button class="correction" @click="handleResetAmount">{{ $t('correction') }}</button>
                    <div class="price-group">
                        <button v-for="(price, index) in prices" :key="index" class="btn-price"
                                @click="handleClickButtonPrice(price)">
                            {{ convertMoney(price) }}
                        </button>
                    </div>
                </div>
                
                <hr/>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <h3 class="item-title">{{ $t('withdrawal') }}</h3>
                    <p class="item-sub">{{ $t('desWithdrawal') }}</p>
                </div>
                <div class="col-lg-6">
                    <input class="item-input" type="text"/>
                </div>
                <hr/>
            </div>
            <div class="d-flex justify-content-end">
                <Button class="mr-2" variant="contained">
                    {{ $t('withdraw') }}
                </Button>
                <Button>
                    {{ $t('cancel') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {convertMoney} from "@/utils";
import Button from '@/components/PlayG1/customs/Button/index.vue'

const amount = ref(0);
const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];

const handleClickButtonPrice = (price) => (amount.value += price);

const handleResetAmount = () => amount.value = 0;
</script>

<style lang="scss" scoped>
.title h3 {
    margin: 2rem 0;
}

.card {
    padding: 32px;
    margin-top: 32px;
    
    .item-title {
        font-size: 1.25rem;
    }
    
    .item-sub {
        font-size: 0.875rem;
        color: var(--text-second);
    }
    
    .item-input {
        border-radius: 4px;
        border: 1px solid var(--neutral-200, #E4E4E7);
        padding: 12px 14px;
        width: 100%;
        outline: none;
    }
    
    .correction {
        font-size: 0.8rem;
        text-decoration-line: underline;
        padding: 10px;
        
        &:hover {
            color: var(--primary);
            transform: scale(0.98);
        }
    }
    
    .btn-price {
        padding: 8px 16px;
        border-radius: 38px;
        border: 1px solid var(--neutral-200, #E4E4E7);
        margin: 6px 7px;
        
        &:hover {
            color: #FFFFFF;
            background-color: var(--primary);
            transform: scale(0.98);
        }
    }
    
    hr {
        border: 1px solid #E4E4E7;
        margin: 48px 0;
    }
}

</style>