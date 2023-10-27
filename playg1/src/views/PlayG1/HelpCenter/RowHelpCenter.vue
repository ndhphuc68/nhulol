<template>
    <tr class="action-row" @click="handleClickRow">
        <td>
            <div class="cell">
                <div class="d-flex justify-center">
                    <span class="in-mobile">No.</span>
                    <span>{{ index }} </span>
                </div>
                <div class="in-mobile">
                    <Action :handle-delete="()=>{
                        handleDelete(row)}" :handleViewDetail="handleClickCell"/>
                </div>
            </div>
        </td>
        
        <template v-for="(col, key, index) in columns" :key="index">
            <td
                v-if="row[key]"
                :class="[{
                            complete: row[key] === 'complete',
                            failed: row[key] === 'failed',
                            pending: row[key] === 'pending',
                        }]"
            >
                <div :class="{
                    actionOnMobile : cellClickOnMobile === key
                }" class="cell"
                     @click="()=> {if(cellClickOnMobile === key) handleClickCell()}"
                
                >
                    <div class="in-mobile">
                        <span> {{ columns[key]?.text }} </span>
                    </div>
                    <div class="value">
                        <span v-if="columns[key]?.callback">
                                {{ columns[key]?.callback(row, row[key]) }}
                        </span>
                        <span v-else>
                                {{ row[key] }}
                        </span>
                    </div>
                </div>
            </td>
            <td v-if="isViewDetail && cellClickOnMobile === key" class="in-mobile">
                <div class="detail-content">
                    <span>{{ row?.title + " : " + row[detailKey] }}</span>
                </div>
            </td>
        </template>
        
        <td class="cell-action in-desktop">
            <Action :handle-delete="()=>{
                        handleDelete(row)}" :handleViewDetail="handleClickRow"/>
        </td>
    </tr>
    <tr v-if="isViewDetail" class="in-desktop">
        <td></td>
        <td :colspan="Object.keys(columns).length - 2">
            {{ row[detailKey] }}
        </td>
        <td></td>
    </tr>
</template>

<script setup>
import {defineProps, ref} from 'vue'
import Action from '@/components/PlayG1/Action/index.vue'

defineProps({
    index: Number,
    row: Object,
    columns: Object,
    cellClickOnMobile: String,
    detailKey: String
})

const isViewDetail = ref(false);

const handleClickRow = () => {
    if (window.innerWidth >= 769) {
        isViewDetail.value = !isViewDetail.value
    }
}

const handleClickCell = () => {
    if (window.innerWidth < 769) {
        isViewDetail.value = !isViewDetail.value
    }
}

const handleDelete = (row) => {
    confirm("Do you want to delete this ?" + row?.title);
}
</script>

<style scoped>
@media (min-width: 769px) {
    .action-row {
        cursor: pointer;
        
        &:hover {
            transform: scale(0.98);
            transition: transform linear 0.2s;
        }
    }
}

@media (max-width: 768px) {
    .cell.actionOnMobile {
        cursor: pointer;
        
        &:hover {
            transform: scale(0.98);
            transition: transform linear 0.2s;
        }
    }
}

</style>