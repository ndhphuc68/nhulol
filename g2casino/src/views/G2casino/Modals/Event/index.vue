<template>
    <div class="deposit-history" v-if="listEvent">
        <h3 class="title-head text-center mb-2">{{ $t('event') }}</h3>
        <div class="table-notice">
            <div class="title">
                <div>#</div>
                <div>{{ $t('title') }}</div>
                <div>{{ $t('date') }}</div>
            </div>
            <div class="list-item">
                <div v-for="(item,idx) in displayData" :key="idx">
                    <ContentItem :data="item" :index="idx"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loading :size="'50'"/>
    </div>
    <div class="pagination-wrapper" v-if="listEvent">
        <v-pagination
            v-model="currentPage"
            :length="Math.ceil(listEvent?.length/itemsPerPage)"
            rounded="0"
        ></v-pagination>
    </div>


</template>
<script setup>
import {computed, onUnmounted, ref} from "vue";
// import { getNotifyMessageRequest } from '@/api/notifyMessage/request'
import ContentItem from './ContentItem'
import Loading from '@/components/G2casino/Loading'
import {useStore} from 'vuex'

const store = useStore()
const listEvent = ref([
    {
        no_subject: 'Notice 1',
        no_created: '20220406',
        no_content: 'There are no extended formats for century, year or year/month, but there are for the other formats'
    },
    {
        no_subject: 'Notice 2',
        no_created: '20220406',
        no_content: 'There are no extended formats for century, year or year/month, but there are for the other formats'
    },
    {
        no_subject: 'Notice 3',
        no_created: '20220406',
        no_content: 'There are no extended formats for century, year or year/month, but there are for the other formats'
    },
    {
        no_subject: 'Notice 4',
        no_created: '20220406',
        no_content: 'There are no extended formats for century, year or year/month, but there are for the other formats'
    }
]);
const currentPage = ref(1);
const itemsPerPage = 7

const displayData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return listEvent?.value?.slice(startIndex, endIndex)
})

onUnmounted(() => store.commit('handleActiveContent', null))

</script>
<style scoped>
.deposit-history {
    width: 100%;
    padding: 1rem 2rem;
}

.title-head {
    font-weight: 600;
}

.list-item {
    height: 450px;
    overflow: auto;
}

@media (max-width: 576px) {
    .list-item {
        height: 380px;
        overflow: auto;
    }
}

.pagination-wrapper {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
}

.title, .data-notice {
    display: grid;
    grid-template-columns: 10% 55% 35%;
    justify-items: center;
    align-items: center;
    padding: 15px 0;
    font-weight: 400 !important;
    font-size: 16px;
    line-height: 22px;
}

.title {
    background: #F7F7F9;
    color: #71717A;
}

.data-notice:hover {
    cursor: pointer;
    transform: scale(0.98);
    transition: 0.5s ease;
}

@media (max-width: 1024px) {
    .deposit-history {
        padding: 1rem;
    }
    
    .button-next {
        width: 20px;
        margin: 0 2px;
        border-radius: 40% !important;
    }
    
    .number-group {
        display: flex;
    }
    
    .button-next p {
        display: none;
    }
    
    .number-page {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
    }
    
    .number-page.active {
        padding: 2px;
    }
    
}
</style>


