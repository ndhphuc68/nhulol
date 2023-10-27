<template>
    <div class="container">
        <div class="v-row mt-4">
            <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
                <BoxItem class="box-item pl-3 pr-3" title="notice" :data="listNotice?.slice(0,4)" :type="0"/>
            </div>
            <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
                <BoxItem class="box-item pl-3 pr-3" title="faqs" :data="listFAQ?.slice(0,4)" :type="1"/>
            </div>
            <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
                <BoxItem class="box-item pl-3 pr-3" title="events" :data="listEvent?.slice(0,4)" :type="2"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import BoxItem from "@/views/EDGames/home/components/NoticeListBox/BoxItem";
import {useStore} from 'vuex'
import {computed, onMounted} from "vue";

const store = useStore()
const listNotice = computed(() => store.getters.getNotice)
const listFAQ = computed(() => store.getters.getFAQ)
const listEvent = computed(() => store.getters.getEvent)

onMounted(async () => {
    await store.dispatch("getPartnershipAction")
})

</script>

<style scoped lang="scss">
.container {
    width: 95%;
    margin: 0 auto;
}

.box-item {
    border: 1px solid #E4E4E7;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 10px;
    height: 100%;
    background: #fff;
    min-height: 16rem;

    @media (max-width: 600px) {
        margin: 1rem;
    }
}

.box-item:nth-child(2) {
    margin: 0 20px;
}

</style>
