<template>
  <section>
    <article class="history-top p-4 mb-3">
      <h5>{{ $t("rechargeHistory") }}</h5>
      <div>{{ $t("ThisIsUser") }}</div>
    </article>
    <div class="history-center my-3">
      <article class="text-center">
        <div>{{ $t("totalAmount") }}</div>
        <div class="money">{{ convertMoney(total) }}</div>
        <div>{{ $t("won") }}</div>
      </article>
    </div>
    <div class="history-bottom">
      <div class="list-day">
        <div class="date-deposit-history">
          <div>{{ $t("startDate") }}</div>
          <Calendar dateFormat="mm/dd/yy" v-model="dateStart" showIcon />
        </div>
        <div class="date-deposit-history my-2 my-lg-0">
          <div>{{ $t("endDate") }}</div>
          <Calendar dateFormat="mm/dd/yy" v-model="dateEnd" showIcon />
        </div>
        <div class="text-center">
          <button class="mt-2 primary-button" @click="handleSearch">
            {{ $t("search") }}
          </button>
        </div>
      </div>
      <div class="table-wrapper-sc my-3">
        <DataTable :value="listWithDraw" paginator :rows="5" dataKey="index">
          <template v-for="col of columns" :key="col.field">
            <Column
              :field="col.field"
              :header="$t(col.header)"
              v-if="col?.isStatus"
            >
              <template #body="slotProps">
                <Tag
                  :value="$t(slotProps.data[col.field])"
                  class="status child"
                  style="font-size: 11px; font-weight: 400"
                  :class="getStatusLabel(slotProps.data[col.field])"
                >
                </Tag>
              </template>
            </Column>
            <Column v-else :field="col.field" :header="$t(col.header)">
              <template #body="slotProps">
                <span>
                  {{
                    col?.isIndex
                      ? slotProps.index + 1
                      : col?.callback
                      ? col?.callback(slotProps.data[col.field])
                      : slotProps.data[col.field]
                  }}
                </span>
              </template>
            </Column>
          </template>
        </DataTable>
      </div>
      <div class="table-mobile mt-3 d-md-none" id="body-table">
        <article class="mt-3" v-for="(item, index) in displayData" :key="index">
          <div>
            <span> No.{{ index + 1 }} </span>
            <span :class="item.wi_status">{{ $t(item.wi_status) }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("withdrawAmount") }}</span>
            <span>{{ convertMoney(item.wi_money) }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("withdrawer") }}</span>
            <span>{{ item.wi_member_account }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("currencyexchangedate") }}</span>
            <span>{{ converTime(item.wi_created) }}</span>
          </div>
        </article>
      </div>
      <div class="mt-3 d-md-none">
        <v-pagination
          v-if="listWithDraw?.length > 0"
          v-model="currentPage"
          :length="Math.ceil(listWithDraw?.length / itemsPerPage)"
          rounded="0"
        ></v-pagination>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { columns } from "./data";
import { addIndexDataTableWithDraw, converTime } from "@/utils";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { convertMoney } from "@/utils/SCCasino";
import { useStore } from "vuex";
import Tag from "primevue/tag";

const store = useStore();
const getListWithDraw = computed(() => store.state.withdraw.listWithDraw);
const listWithDraw = ref(getListWithDraw.value);
const dateStart = ref(null);
const dateEnd = ref(null);
const currentPage = ref(1);
const itemsPerPage = 5;
const total = computed(() => {
  let amount = listWithDraw?.value.reduce(
    (total, item) => total + item.wi_money,
    0
  );
  return amount;
});

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listWithDraw?.value.slice(startIndex, endIndex);
});

const handleSearch = () => {
  if (!dateStart.value || !dateEnd.value || dateEnd.value < dateStart.value)
    return;
  listWithDraw.value = getListWithDraw?.value.filter(
    (item) =>
      item.wi_created * 1000 >= dateStart.value.getTime() &&
      item.wi_created * 1000 <= dateEnd.value.getTime() + 86400000
  );
};

const getStatusLabel = (status) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "REQUEST":
      return "warning";
    case "ADMIN_CANCEL":
      return "danger";
    default:
      return null;
  }
};

watch(currentPage, () => {
  let table = document.getElementById("body-table");
  table.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<style scoped lang="scss">
.history-top {
  border-bottom: 1px solid var(--300, #e0e0e0);
  h5 {
    @media (max-width: 375px) {
      font-size: 14px;
      text-align: center;
    }
  }
  div {
    @media (max-width: 375px) {
      font-size: 12px;
      text-align: center;
    }
  }
}

.status.success {
  border-radius: 20px;
  background: rgba(21, 128, 61, 0.2);
  color: #16a34a;
}

.status.danger {
  border-radius: 20px;
  background: rgba(185, 28, 28, 0.2);
  color: #d23449;
}

.status.warning {
  border-radius: 20px;
  background: rgba(180, 83, 9, 0.2);
  color: #d97706;
}

.history-center {
  article {
    border-radius: 8px;
    border: 1px solid var(--black-300, #e3e3e3);
    background: var(--black-100, #fafafa);
    padding: 0.5rem 1rem;
  }

  div {
    font-weight: 900;
  }

  .money {
    font-size: 30px;
    color: var(--primarySCCasino);
    @media (max-width: 475px) {
      font-size: 24px;
    }
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

          @media (max-width: 375px) {
            font-size: 12px;
          }

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

  @media (max-width: 767px) {
    .table-wrapper-sc {
      display: none;
    }
  }
}

@media (max-width: 767px) {
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

.table-wrapper-sc {
  .p-datatable-wrapper {
    height: 260px;
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
