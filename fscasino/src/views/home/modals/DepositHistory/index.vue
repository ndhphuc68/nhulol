<template>
  <section>
    <article class="history-top p-4">
      <h4>Recharge History of Reserved Money</h4>
      <div>This is user’charging info</div>
    </article>
    <div class="history-center row my-3">
      <article class="col">
        <div>Charging of today</div>
        <div class="money">0</div>
        <div>{{ $t('won') }}</div>
      </article>
      <article class="col mx-4">
        <div>Charging of this month</div>
        <div class="money">0</div>
        <div>{{ $t('won') }}</div>
      </article>
      <article class="col">
        <div>Charging of last month</div>
        <div class="money">0</div>
        <div>{{ $t('won') }}</div>
      </article>
    </div>
    <div class="history-bottom">
      <div class="list-day">
        <div class="date-deposit-history">
          <div>Start date</div>
          <Calendar v-model="dateStart" showIcon />
        </div>
        <div class="date-deposit-history">
          <div>End date</div>
          <Calendar v-model="dateEnd" showIcon />
        </div>
        <div class="text-start">
          <button
            v-for="(btn, idx) in listButton"
            :key="btn.value"
            :class="activeButton === idx ? 'btn-active' : ''"
            @click="handlePickDay(idx)"
          >
            {{ btn.name }}
          </button>
          <button>Search</button>
        </div>
      </div>
      <div class="table-wrapper my-3">
        <DataTable :value="addIndexDataTable(inforTable)" paginator :rows="5">
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { listButton, columns, inforTable } from "./data";
import { addIndexDataTable } from "@/utils";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const dateStart = ref(null);
const dateEnd = ref(null);
const activeButton = ref(0);

console.log(addIndexDataTable(inforTable));

const handlePickDay = (index) => {
  activeButton.value = index;
};
</script>

<style scoped lang="scss">
.history-top {
  background: url("@/assets/bg-deposit-history.png") no-repeat;
  background-size: 100% 100%;
}
.history-center {
  article {
    border-radius: 8px;
    border: 1px solid var(--black-300, #e3e3e3);
    background: var(--black-100, #fafafa);
    padding: 2rem;
  }
  div {
    font-weight: 900;
  }
  .money {
    font-family: "Poppins-Bold";
    font-size: 30px;
    color: #d23449;
  }
}
.history-bottom {
  button {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid var(--black-200, #f2f2f2);
    background: var(--black-100, #fafafa);
    margin: 0 0.2rem;
    color: #71717a;
    font-size: 14px;
    &:hover {
      background: #de6777 !important;
    }
    &:last-child {
      background: #de6777;
      color: var(--white);
    }
  }
  .btn-active {
    border: 1px solid var(--light-red, #f1c0c7);
    background: var(--pink-100, #f9e2e5);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  }
  .list-day {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
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
    background: #fad3e7;
    border: 1px solid var(--light-red, #f1c0c7);
    &:hover {
      background: #de6777 !important;
    }
  }
}
.table-wrapper {
  .p-datatable-wrapper {
    height: 150px;
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
}
</style>
