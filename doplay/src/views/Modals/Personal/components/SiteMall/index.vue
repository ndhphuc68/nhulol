<script setup>
import {ref} from "vue"
import {useI18n} from 'vue-i18n';
import Table from '@/components/Customs/Table'
import commonIcons from "@/assets/icon/commons";

const {t} = useI18n();
const setting = {
  id_row: "id_item", /*important*/
  bgColumns: "#F2F2F2",
  isActionFullRow: true,
  stateRow: {
    rowActiveStyles: {
      'color': '#3F3F46',
      'font-size': '16px',
      'font-weight': '700'
    },
    activeByData: 'status',
    conditionActive: 'Unread'
  }
};
const columns = {
  status: {
    label: t("status"),
    leftIcon: `<img src="${commonIcons.read}"  alt="read mail" />`,
    leftIconActive: `<img src="${commonIcons.unread}"  alt="unread mail"/>`
  },
  writer: {
    label: t('writer'),
  },
  subject: {
    label: t('subject'),
  },
  date: {
    label: t('date')
  }
};
const rows = [
  {
    id_item: "1",
    status: "Unread",
    writer: "admin",
    subject: 'Lorem',
    date: "08.01.2023   13:25",
  },
  {
    id_item: "2",
    status: "Unread",
    writer: "admin",
    subject: 'Lorem',
    date: "08.01.2023   13:25",

  },
  {
    id_item: "3",
    status: "Have read",
    writer: "admin",
    subject: 'Lorem',
    date: "08.01.2023   13:25",
  },
];
const currentPage = ref(0);
const itemsPerPage = ref(5)
</script>

<template>
  <div class="table-mail">
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