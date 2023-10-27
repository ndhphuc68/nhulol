<script setup>
import Table from '@/components/Customs/Table'
import {useI18n} from 'vue-i18n';
import Button from '@/components/Customs/Button'
import {ref} from "vue";

const {t} = useI18n();
const setting = {
  id_row: "id_item", /*important*/
  bgColumns: "#F2F2F2",
  columnHide: 'column4',
  columnViewHideColumMobile: 'column2'
};
const columns = {
  number: {
    label: t("number"),
    actionComponent: `<div> <img alt="icon-up" style="width: 18px; height: 18px" src=${require("@/assets/icon/commons/up.png")} /></div>`,
    styles: [],
  },
  depositAmount: {
    label: t('withdrawAmount'),
    isAction: false,
    styles: []
  },
  depositor: {
    label: t('withdrawer'),
    isAction: false,
    styles: [],
  },
  currencyexchangedate: {
    label: t('currencyexchangedate'),
    styles: [],
    isAction: false,
  },
  processingdate: {
    label: t('processingdate'),
    styles: [],
    isAction: false,
  },
  memo: {
    label: t('memo'),
    styles: [],
    isAction: false,
  },
  detail: {
    label: t('detail'),
    styles: [],
    isAction: false,
  },
  status: {
    label: t('status'),
    keySuccess: "Completed",
    keyWarn: "Pending",
    keyError: "Failed",
    styles: [],
    isAction: false,
  }
};
const rows = [
  {
    id_item: "1",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "2",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Pending',
  },
  {
    id_item: "3",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Failed',
  },
  {
    id_item: "4",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "5",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "6",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "7",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "8",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
  {
    id_item: "9",
    number: "1",
    depositAmount: "₩" + "5.000.000",
    depositor: "user1",
    currencyexchangedate: "Lorem Ipsum",
    processingdate: "08.01.2023   13:25",
    memo: 'Lorem',
    detail: "Detail",
    status: 'Completed',
  },
];
const currentPage = ref(0);
const itemsPerPage = ref(5);
</script>

<template>
  <div>
    <div class="title-group">
      <h5 class="text-center title-tab"> {{ $t('withdrawreport') }} </h5>
    </div>
    <v-row>
      <v-col cols="4">
        <div class="item-report">
          <p>{{ $t('amounttoday') }}</p>
          <p class="price">0 {{ $t('won') }}</p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="item-report">
          {{ $t('amountthismonth') }}
          <p class="price">0 {{ $t('won') }}</p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="item-report">
          {{ $t('amountlastmonth') }}
          <p class="price">0 {{ $t('won') }}</p>
        </div>
      </v-col>
    </v-row>
    <div class="table-date">
      <div class="search-box v-row">
        <div class="v-col-12 v-col-md-6 text-center">
          <button class="pickdate">2023-06-16 00:00:00</button>
          <span>~</span>
          <button class="pickdate">2023-06-16 00:00:00</button>
        </div>
        <Button class="v-col-12  v-col-md-4" variant="contained">{{ $t('search') }}</Button>
      </div>
      <Table :columns="columns" :rows="rows" :setting="setting"/>
      <v-pagination
          v-model="currentPage"
          :length="Math.ceil(rows?.length/itemsPerPage)"
          rounded="0"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
.search-box {
  margin: 30px 10px 0;
  align-items: center;
  justify-content: center;
}

.pickdate {
  border-radius: 4px;
  padding: 6px 20px;
  border: 1px solid #E4E4E7;
  margin: 0 10px;
}

.item-report {
  border-radius: 8px;
  background: #F4F4F5;
  padding: 30px;
  text-align: center;
}

.title-group {
  margin: 32px 0;
}

.title-tab {
  font-size: 22px;
  font-weight: 700;
}

.price {
  font-size: 22px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .pickdate {
    margin: 10px 5px;
    padding: 6px 5px;
  }

  .search-box span {
    display: none;
  }
}
</style>