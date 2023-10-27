<template>
    <div class="wrapper-history">
        <div class="withdraw">
            <h1>Daily Withdraw</h1>
            <div v-for="(item, index) in history"
                 :key="index"
                 class="list"
            >
                <div class="item">
                    <span class="createdAt">{{ formatDate(item.createdAt) }}</span>
                    <span class="name">{{ item.name }}</span>
                    <span class="money">${{ item.money }}</span>
                </div>
            </div>
        </div>
        <div class="deposit">
            <h1>Daily Deposit</h1>
            <div v-for="(item, index) in history"
                 :key="index"
                 class="list"
            >
                <div class="item">
                    <span class="createdAt">{{ formatDate(item.createdAt) }}</span>
                    <span class="name">{{ item.name }}</span>
                    <span class="money">${{ item.money }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {history} from "@/views/PlayG1/Home/Components/History/data";
import {formatDate} from "@/utils";
</script>

<style lang="scss" scoped>
.wrapper-history {
    display: grid;
    grid-template-columns:1fr 1fr;
    grid-gap: 24px;
    
    .withdraw, .deposit {
        border: 1px solid var(--neutral-200, #E4E4E7);
        
        .list {
            .item {
                display: grid;
                grid-template-columns:1fr 1fr 1fr;
                grid-gap: 24px;
                padding: 16px 12px;
            }
        }
    }
    
    h1 {
        color: #FFF;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 0px;
        background: #162F86;
        padding: 16px 12px;
    }
    
    .createdAt {
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
        color: var(--text-second);
    }
    
    .name {
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
        color: #18181B;
    }
    
    .money {
        font-size: 16px;
        font-weight: 600;
        line-height: 19px;
        text-align: right;
        color: #1E3EB3;
    }
}

@media (max-width: 768px) {
    .wrapper-history {
        grid-template-columns: 1fr;
    }
}
</style>