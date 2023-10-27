<template>
    <div class="helpcenter-wrapper">
        <div class="d-flex align-center justify-content-between">
            <h2>{{ $t('helpCenter') }}</h2>
            <button class="btn-query" @click="handleNavigateCreateQuery">
                <span>{{ $t('queryCreation') }}</span>
                <svg class="ml-2" fill="none" height="20" viewBox="0 0 20 20" width="20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.38397 17.7003L17.709 5.37532L14.6256 2.29199L2.30063 14.617L2.2923 17.7087L5.38397 17.7003Z"
                        stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.792 5.1084L14.892 7.20839" stroke="black" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="card">
            <table class="custom">
                <tr class="table-titles">
                    <th v-for="(col, key, index) in columns" :key="index">
                        {{ col?.text }}
                    </th>
                </tr>
                
                <template v-for="(row, index) in rows" :key="index">
                    <RowHelpCenter :columns="columns" :index="index" :row="row" cellClickOnMobile="title"
                                   detailKey="content"/>
                </template>
            
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
import RowHelpCenter from "@/views/PlayG1/HelpCenter/RowHelpCenter.vue";
import Paginate from 'vuejs-paginate-next';
import {useRouter} from "vue-router";
import {convertMoney, formatDate} from "@/utils";


const {t} = useI18n()
const columns = {
    no: {text: '#'},
    title: {
        text: t('title')
    },
    state: {
        text: t('state')
    },
    date: {
        text: t('dateOfRequest'),
        callback: (row, date) => {
            return formatDate(date)
        },
    },
    action: {text: ''}
}
const rows = [
    {
        title: 'Pellentesque vulputate enim risus ',
        state: 'complete',
        date: "2023-07-13",
        content: ' Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida\n' +
            '            integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque.\n' +
            '            Sit blandit blandit mattis placerat.',
        nhap1: "nháp 1",
        nhap2: "nháp 2"
    },
    {
        title: 'Pellentesque vulputate enim risus ',
        state: 'failed',
        content: ' Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida\n' +
            '            integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque.\n' +
            '            Sit blandit blandit mattis placerat.',
        date: "2023-07-13",
        
        nhap1: "nháp 1",
        nhap2: "nháp 3"
    },
    {
        title: 'Pellentesque vulputate enim risus ',
        
        content: ' Laoreet duis semper et tincidunt quis dui laoreet. Lectus est amet est pulvinar gravida\n' +
            '            integer sed. In turpis pellentesque pellentesque sodales quam fames augue ultrices neque.\n' +
            '            Sit blandit blandit mattis placerat.',
        date: "2023-07-13",
        state: 'pending',
        
    },
]
const router = useRouter();
const currentPage = ref(1)
const itemsPerPage = ref(7)


const handleNavigateCreateQuery = () => {
    router.push('queryCreation');
}
const clickCallback = pageNum => {
    currentPage.value = pageNum;
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 1.5rem;
}

.btn-query {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    
    &:hover {
        cursor: pointer;
        color: var(--primary);
        opacity: 0.8;
        transform: scale(0.97);
        
        svg path {
            stroke: var(--primary);
        }
    }
}

.card {
    padding: 32px 0;
    margin-top: 32px;
}

.helpcenter-wrapper .pagination {
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
.helpcenter-wrapper .pagination {
    margin: 30px 20px 0;
    display: flex;
    justify-content: space-between;
}

.helpcenter-wrapper .page-item {
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
    
    //&.disable {
    //    .page-link {
    //        padding: 8px 14px;
    //        border-radius: 8px;
    //        border: 1px solid #D0D5DD;
    //        background: #FFF !important;
    //    }
    //}
}

</style>
