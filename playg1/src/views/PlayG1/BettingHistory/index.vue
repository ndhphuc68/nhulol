<template>
    <div class="betting-wrapper">
        <h2>{{ $t('bettingHistory') }}</h2>
        <div class="card">
            <table class="custom">
                <tr class="table-titles">
                    <th v-for="(col, key, index) in columns" :key="index">
                        {{ col?.text }}
                    </th>
                </tr>
                
                <tr v-for="(row, index) in rows" :key="index">
                    <td v-if="columns?.no">
                        <div class="cell">
                            <div class="d-flex justify-center">
                                <span class="in-mobile">No.</span>
                                <span>{{ index }} </span>
                            </div>
                        </div>
                    </td>
                    <template v-for="(col, key, index) in columns" :key="index">
                        <td
                            v-if="row[key] || subRow[key]"
                        >
                            <div class="cell">
                                <div class="in-mobile">
                                    <span> {{ columns[key]?.text }} </span>
                                </div>
                                <div class="value" :style="columns[key]?.style">
                                    <span v-if="columns[key]?.callback">
                                        {{ columns[key]?.callback(row, row[key] || subRow[key](row)) }}
                                    </span>
                                    <span v-else>
                                        {{ row[key] || subRow[key](row) }}
                                    </span>
                                </div>
                            </div>
                        </td>
                    </template>
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
import Paginate from 'vuejs-paginate-next';
import {convertMoney} from '@/utils'

const {t} = useI18n()
const columns = {
    no: {
        text: '#'
    },
    game: {
        text: t('game')
    },
    betAmount: {
        text: t('betAmount'),
        isMoney: true,
        style: {
            fontWeight: 600
        },
        callback: (row, betAmount) => {
            return convertMoney(betAmount)
        },
    },
    profit: {
        text: t('profit'),
        isMoney: true,
        style: {
            color: '#16A34A',
            fontWeight: 600
        },
        callback: (row, profit) => {
            return convertMoney(profit)
        },
    },
    loss: {
        text: t('loss'),
        isMoney: true,
        style: {
            color: '#EF4444',
            fontWeight: 600
        },
        callback: (row, loss) => {
            return convertMoney(loss)
        },
    },
    balance: {
        text: t('balance'),
        subText: '',
        isMoney: true,
        style: {
            color: '#2563EB',
            fontWeight: 600
        },
        callback:(row, balance) => convertMoney(balance)
    },
    date: {
        text: t('dateOfRequest')
    }
}
const rows = [
    {
        game: 'Casino',
        betAmount: '948.55',
        profit: 9774,
        loss: -5770,
        date: "Sep 28, 2023"
    },
    {
        game: 'Casino',
        betAmount: 948.55,
        profit: 94777,
        loss: -5770,
        date: "Sep 28, 2023"
    },
    {
        game: 'Casino',
        betAmount: '948.55',
        profit: 9477,
        loss: -50555,
        date: "Sep 28, 2023"
    }
]

const subRow = {
    balance: (row) => (row?.profit + row?.loss)
}
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

.betting-wrapper .pagination {
    margin: 30px 20px 0;
    display: flex;
    justify-content: space-between;
}
@media (max-width: 768px) {
    .card {
        border: unset;
    }
}
</style>
<style lang="scss">
.betting-wrapper .pagination {
    margin: 30px 20px 0;
    display: flex;
    justify-content: space-between;
}

.betting-wrapper .page-item {
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

