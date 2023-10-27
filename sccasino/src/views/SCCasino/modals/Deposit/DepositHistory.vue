<template>
  <section>
    <article class="history-top p-4 mb-8">
      <h5>{{ $t("rechargeHistory") }}</h5>
      <div>{{ $t("ThisIsUser") }}</div>
    </article>
    <div class="history-center my-3">
      <article class="">
        <div>{{ $t("totalAmount") }}</div>
        <div class="money">{{ convertMoney(total) }}</div>
        <div>{{ $t('won') }}</div>
      </article>
    </div>
    <div class="history-bottom">
      <div class="list-day">
        <div class="date-deposit-history">
          <div>{{ $t("startDate") }}</div>
          <Calendar v-model="dateStart" showIcon />
        </div>
        <div class="date-deposit-history my-2 my-lg-0">
          <div>{{ $t("endDate") }}</div>
          <Calendar v-model="dateEnd" showIcon />
        </div>
        <div class="text-center">
          <button class="mt-2 primary-button">{{ $t("search") }}</button>
        </div>
      </div>
      <div class="table-wrapper my-3">
        <DataTable :value="addIndexDataTable(inforTable)" paginator :rows="5">
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="$t(col.header)"
          >
          </Column>
        </DataTable>
      </div>
      <div class="table-mobile mt-3 d-md-none">
        <article class="mt-3" v-for="(item, index) in inforTable" :key="index">
          <div>
            <span> No.{{ index + 1 }} </span>
            <span :class="item.de_status">{{ item.de_status }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("depositAmount") }}</span>
            <span>{{ convertMoney(item.de_money) }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("depositor") }}</span>
            <span>{{ item.de_name }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("currencyexchangedate") }}</span>
            <!-- <span>{{ converTime(item.de_created) }}</span> -->
            <span>{{ item.de_created }}</span>
          </div>
        </article>
      </div>
      <div class="mt-3 d-md-none">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(inforTable?.length / itemsPerPage)"
          rounded="0"
        ></v-pagination>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { columns } from "./data";
import { addIndexDataTable } from "@/utils/SCCasino";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { convertMoney } from "@/utils/SCCasino";
// import { useStore } from "vuex";
// import { useI18n } from "vue-i18n";
import { inforTable } from "./data";

// const store = useStore();
// const listDeposit = computed(() => store.state.deposit.listDeposit);
// const { t } = useI18n();
const dateStart = ref(null);
const dateEnd = ref(null);
// const activeButton = ref(0);
const currentPage = ref(1);
const itemsPerPage = 5;
// const total = computed(() => {
//   let amount = listDeposit?.value.reduce(
//     (total, item) => total + item.de_money,
//     0
//   );
//   return amount;
// });

// const displayData = computed(() => {
//   const startIndex = (currentPage.value - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return inforTable?.value.slice(startIndex, endIndex);
// });

// const handlePickDay = (index) => {
//   activeButton.value = index;
// };
</script>

<style scoped lang="scss">
.history-top {
  border-bottom: 1px solid var(--300, #e0e0e0);
}

.history-center {
  article {
    border-radius: 8px;
    border: 1px solid var(--black-300, #e3e3e3);
    background: var(--black-100, #fafafa);
    padding: 1rem;
  }

  div {
    font-weight: 900;
  }

  .money {
    font-size: 30px;
    color: var(--neutral-900, #18181b);
  }
}

.history-bottom {
  button {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid var(--black-200, #f2f2f2);
    background: var(--black-100, #fafafa);
    margin: 0 0.2rem;
    color: var(--bgSCCasino);
    font-size: 14px;

    /* &:hover { */
    /* background: #de6777 !important; */
    /* } */

    &:last-child {
      background: var(--primarySCCasino);
    }
  }

  .btn-active {
    border: 1px solid var(--light-red, #f1c0c7);
    background: var(--pink-100, #f9e2e5);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  }

  .list-day {
    @media (min-width: 992px) {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
    }
  }

  .table-mobile {
    /* max-height: 20rem; */
    font-size: 14px;
    overflow: auto;

    article {
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e4e4e7;

      div {
        display: flex;
        justify-content: space-between;

        span {
          text-align: left;
          max-width: 48%;

          &:last-child {
            text-align: right;
          }
        }

        .COMPLETED {
          color: #15803d;
          background: #f0fdf4;
          border-radius: 10px;
          padding: 0 0.5rem;
        }

        .REQUEST {
          color: #b45309;
          background: #fffbeb;
          border-radius: 10px;
          padding: 0 0.5rem;
        }

        .ADMIN_CANCEL {
          color: #b91c1c;
          background: #fef2f2;
          border-radius: 10px;
          padding: 0 0.5rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .table-wrapper {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .history-top {
    text-align: left;
    padding: 1.5rem 0 !important;
  }
}
</style>

<style lang="scss">
.p-calendar {
  height: 2.5rem;

  input {
    font-size: 12px;
  }

  button {
    background: var(--50, #e3f2fd);
    border: 1px solid var(--black-400, #ccc);
    border-left: none;

    &:hover {
      background: var(--primarySCCasino) !important;
    }
  }
}

.table-wrapper {
  .p-datatable-wrapper {
    height: 160px;
    font-size: 12px;

    thead {
      top: 0;

      tr {
        th {
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.5rem;
          text-align: center;
        }
      }
    }
  }

  .p-datatable .p-column-header-content {
    justify-content: center;
  }
}
</style>
