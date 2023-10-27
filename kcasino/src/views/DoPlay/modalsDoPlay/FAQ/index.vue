<template>
    <h2 class="text-center mb-3">FAQs</h2>
    <div class="faq" v-if="listFAQ">
        <div class="table-notice">
            <div class="title">
                <div>#</div>
                <div>{{ $t("title") }}</div>
                <div>{{ $t("date") }}</div>
            </div>
            <div class="content-table">
                <div v-for="(item, idx) in displayData" :key="idx">
                    <ContentItem :data="item" :index="idx"/>
                </div>
            </div>
        </div>
        <div>
            <!--      <paginate-->
            <!--        v-model:currentPage="currentPage"-->
            <!--        :page-count="Math.ceil(listFAQ?.length / itemsPerPage)"-->
            <!--        :page-range="3"-->
            <!--        :margin-pages="2"-->
            <!--        :click-handler="clickCallback"-->
            <!--        :prev-text="`< ${t('previous')}`"-->
            <!--        :next-text="`${t('next')} >`"-->
            <!--        :container-class="'pagination'"-->
            <!--        :page-class="'page-item'"-->
            <!--      >-->
            <!--      </paginate>-->
            <v-pagination
                v-model="currentPage"
                @click="clickCallback"
                :length="Math.ceil(listFAQ?.length / itemsPerPage)"
                rounded="0"
            ></v-pagination>
        </div>
    </div>
    <div v-else>
        <Loading :size="'50'"/>
    </div>
</template>
<script setup>
import {computed, onUnmounted, ref} from "vue";
import ContentItem from "./ContentItem";
import Loading from "@/components/EDGames/Loading";
import {useStore} from "vuex";

const store = useStore();
const listFAQ = computed(() => store.getters.getFAQ);
const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listFAQ?.value.slice(startIndex, endIndex);
});

const clickCallback = (pageNum) => {
    currentPage.value = pageNum;
};

onUnmounted(() => store.commit("handleActiveContent", null));
</script>
<style scoped>
.faq {
    width: 100%;
    padding: 2rem;
}

.content-table {
    min-height: 500px;
    overflow: auto;
}

.title {
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
    background: #e592ed;
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
}


</style>
