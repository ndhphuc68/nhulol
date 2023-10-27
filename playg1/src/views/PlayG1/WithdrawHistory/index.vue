<template>
    <div class="withdraw-wrapper">
        <h2>{{ $t('withdrawHistory') }}</h2>
        <div class="card">
            <table class="custom">
                <tr class="table-titles">
                    <th v-for="(col, key, index) in columns" :key="index">
                        {{ col?.text }}
                    </th>
                </tr>
                
                
                <tr v-for="(row, index) in rows" :key="index">
                    <td>
                        <div class="cell">
                            <div class="d-flex justify-center">
                                <span class="in-mobile">No.</span>
                                <span>{{ index }} </span>
                            </div>
                            <div class="in-mobile">
                                <Action :handle-delete="()=>{}" :handleViewDetail="()=>{}" :isDelete="false"/>
                            </div>
                        </div>
                    </td>
                    
                    <template v-for="(cell, key, index) in columns" :key="index">
                        <td
                            v-if="row[key]"
                            :class="[{
                            complete: row[key] === 'complete',
                            failed: row[key] === 'failed',
                            pending: row[key] === 'pending',
                        }]"
                        >
                            <div class="cell">
                                <div class="in-mobile">
                                    <span> {{ columns[key]?.text }} </span>
                                </div>
                                <div class="value">
                                    <span v-if="columns[key]?.isMoney"> ₩ </span>
                                    <span v-if="columns[key]?.callback">
                                        {{ columns[key]?.callback(row[key]) }}
                                    </span>
                                    <span v-else>
                                        {{ row[key] }}
                                    </span>
                                </div>
                            
                            </div>
                        </td>
                    </template>
                    
                    <td class="cell-action in-desktop">
                        <Action :handle-delete="()=>{}" :handleViewDetail="()=>{}" :isDelete="false"/>
                    </td>
                </tr>
            </table>
            <paginate
                v-model:currentPage="currentPage"
                :click-handler="clickCallback"
                :container-class="'pagination'"
                :margin-pages="2"
                :next-text="'Next ->'"
                :page-class="'page-item'"
                :page-count="Math.ceil(rows?.length/itemsPerPage)"
                :page-range="3"
                :prev-text="'<- Prev'"
            >
            </paginate>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import Action from "@/components/PlayG1/Action/index.vue";
import Paginate from 'vuejs-paginate-next';
import {convertMoney} from "@/utils";

const {t} = useI18n()
const columns = {
    no: {text: '#'},
    withdrawUser: {
        text: t('withdrawUser')
    },
    withdrawAmount: {
        text: t('withdrawAmount'),
        isMoney: true,
        callback: (amount) => {
            return convertMoney(amount)
        },
    },
    state: {
        text: t('state'),
    },
    date: {text: t('dateOfRequest')},
    action: {text: ''}
}
const rows = [
    {
        withdrawUser: 'Casino',
        withdrawAmount: 89564,
        state: 'complete',
        date: "Sep 28, 2023"
    },
    {
        withdrawUser: 'Casino',
        withdrawAmount: 89564,
        state: 'failed',
        date: "Sep 28, 2023"
    },
    {
        withdrawUser: 'Casino',
        withdrawAmount: 89564,
        state: 'pending',
        date: "Sep 28, 2023"
    }
]

const currentPage = ref(1)
const itemsPerPage = ref(7)

const clickCallback = pageNum => {
    currentPage.value = pageNum;
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 1.5rem;
}

.card {
    padding: 32px 0;
    margin-top: 32px;
}


@media (max-width: 768px) {
    .card {
        border: unset;
    }
}
</style>
<style lang="scss">
.withdraw-wrapper .pagination {
    margin: 30px 20px 0;
    display: flex;
    justify-content: space-between;
}

.withdraw-wrapper .page-item {
    margin: 5px !important;
    border-radius: 8px;
    
    &.active {
        .page-link {
            background: #E9EDFC;
            border-radius: 8px;
            border: unset;
            color: var(--text);
        }
    }
    
    .page-link {
        background: #FAFAFA;
        border-radius: 8px;
    }
}

</style>