<script setup>
import {ref} from "vue"
import {useI18n} from 'vue-i18n';
import Table from '@/components/Customs/Table'

const {t} = useI18n();
const setting = {
    id_row: "id_item", /*important*/
    bgColumns: "#F2F2F2",
    isActionFullRow: true,
    columnHide: 'content',
    isViewIndex: true,
    columnViewHideColumMobile: 'title'
};
const columns = {
    id_item: {
        label: t("id"),
        isAction: true,
        styles: [],
    },
    title: {
        label: t('title'),
        isAction: true,
        styles: []
    },
    date: {
        label: t('content'),
        isAction: true,
        styles: []
    }
};
const rows = [
    {
        id_item: "1",
        cdk: "1",
        title: "help1",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
    {
        id_item: "2",
        cdk: "1",
        title: "help1",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
    {
        id_item: "3",
        cdk: "1",
        title: "help1",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
];
const currentPage = ref(0);
const itemsPerPage = ref(5)
</script>

<template>
    <div class="table-date">
        <Table :columns="columns" :rows="rows" :setting="setting"/>
        <v-pagination
            v-model="currentPage"
            :length="Math.ceil(rows?.length/itemsPerPage)"
            rounded="0"
        ></v-pagination>
    </div>
</template>

<style lang="scss" scoped>

@media (max-width: 768px) {
}
</style>