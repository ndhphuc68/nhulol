<template>
    <div class="item-service-detail" v-for="(item,index) in list" :key="index" @click="handleClickItem(index)">
        <div class="title">{{ item.title }}</div>
        <div class="date">{{ formatDate(item.createdAt, 'DD/MM') }}</div>
    </div>
</template>

<script setup>

import {defineProps} from 'vue';
import {formatDate} from "@/utils";

defineProps({
    list: Array,
    handleClickItem: Function
});

</script>

<style scoped lang="scss">
.item-service-detail {
    display: flex;
    margin: 12px 0;
    font-size: 14px;
    cursor: pointer;
    
    .title {
        width: 80%;
        text-align: left;
        
        max-height: 48px;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
    }
    
    .date {
        width: 20%;
        text-align: right;
    }
    
    &:hover {
        .title {
            color: #254EE0;
        }
    }
}
</style>