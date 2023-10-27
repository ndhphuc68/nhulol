<script setup>
import Table from '@/components/Customs/Table'
import ActionIndirect from "@/components/Customs/Table/ActionIndirect"
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const setting = {
    id_row: "id_item", /*important*/
    bgColumns: "#F2F2F2",
    columnHide: 'content',
    columnViewHideColumMobile: 'title'
};
const columns = {
    number: {
        label: t("number"),
        isAction: true,
        styles: [],
    },
    title: {
        label: t('title'),
        isAction: true,
        styles: []
    },
    writer: {
        label: t('writer'),
        isAction: false,
        styles: [],
    },
    state: {
        label: t('state'),
        styles: [],
        isAction: false,
        keySuccess: "Completed",
        keyWarn: "Pending",
        keyError: "Failed",
    },
    date: {
        label: t('date'),
        styles: [],
        isAction: false,
    },
    actions: {
        label: "action",
        type: "component",
        component: () => ActionIndirect,
        handleDelete: (id_row) => {
            console.log(id_row)
            alert("delete " + id_row)
        },
        styles: [],
    },
};
const rows = [
    {
        id_item: "1",
        number: "1",
        cl: "1",
        title: "help1",
        writer: "user1",
        state: "Lorem Ipsum",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
    {
        id_item: "2",
        cl: "1",
        number: "1",
        title: "help1",
        writer: "user1",
        state: "Lorem Ipsum",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
    {
        id_item: "3",
        cl: "1",
        number: "1",
        title: "help1",
        writer: "user1",
        state: "Lorem Ipsum",
        date: "08.01.2023   13:25",
        content: 'Lorem'
    },
];

</script>

<template>
    <div class="table-date">
        <Table :columns="columns" :rows="rows" :setting="setting"/>
    </div>
</template>

<style scoped>


@media (max-width: 768px) {
}
</style>