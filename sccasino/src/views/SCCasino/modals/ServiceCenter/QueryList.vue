<script setup>
import { ref, computed } from "vue";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import svgIcon from "@/assets/SCCasino/icon/commons";
import { confirm, toastMessage } from "@/utils/SCCasino/toast";
import { addIndexDataTable, converTime } from "@/utils/SCCasino";
import { columns, inforTable } from "./data";

const dateStart = ref(null);
const dateEnd = ref(null);
const currentPage = ref(1);
const itemsPerPage = 4;
const searchValue = ref("");

const confirmDeleteProduct = (prod) => {
  console.log(prod);
  confirm("Do you want to delete ?", () => {
    toastMessage.success("Detele success");
  });
};
const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return inforTable.slice(startIndex, endIndex);
});

const getStatusLabel = (status) => {
  switch (status) {
    case "COMPLETE":
      return "success";

    case "ACTIVE":
      return "warning";

    case "fail":
      return "danger";

    default:
      return null;
  }
};
</script>

<template>
  <section>
    <div class="query-list">
      <div class="header">
        <div class="list-day">
          <div class="date-deposit-history">
            <Calendar v-model="dateStart" showIcon />
          </div>
          <div class="date-deposit-history my-lg-0">
            <Calendar v-model="dateEnd" showIcon />
          </div>
        </div>
        <div class="search-box">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="searchValue" placeholder="Search" />
          </span>
        </div>
      </div>

      <div class="table-wrapper my-3 h-100">
        <DataTable :value="addIndexDataTable(inforTable)" paginator :rows="5">
          <template v-for="col of columns" :key="col.field">
            <Column
              :field="col.field"
              :header="$t(col.header)"
              v-if="col?.isStatus"
            >
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data[col.field]"
                  class="status"
                  :class="getStatusLabel(slotProps.data[col.field])"
                />
              </template>
            </Column>
            <Column v-else :field="col.field" :header="$t(col.header)">
              <template #body="slotProps">
                <span>
                  {{
                    col?.callback
                      ? col?.callback(slotProps.data[col.field])
                      : slotProps.data[col.field]
                  }}
                </span>
              </template>
            </Column>
          </template>

          <Column
            :header="$t('action')"
            :exportable="false"
            style="min-width: 8rem"
          >
            <template #body="slotProps">
              <button @click="confirmDeleteProduct(slotProps.data)">
                <component :is="svgIcon?.TrashIcon" />
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="table-mobile mt-3 d-md-none">
        <article class="mt-3" v-for="(item, index) in displayData" :key="index">
          <div>
            <span> No.{{ index + 1 }} </span>
            <Tag
              :value="item?.cu_status"
              class="status"
              :class="getStatusLabel(item?.cu_status)"
            />
          </div>
          <div class="mt-3">
            <span>{{ $t("content") }}</span>
            <span>{{ item?.cu_question }}</span>
          </div>
          <div class="mt-3">
            <span>{{ $t("updateTime") }}</span>
            <span>{{ converTime(item.cu_created) }}</span>
          </div>
          <div class="mt-3">
            <span />
            <button @click="confirmDeleteProduct(item)">
              <component :is="svgIcon?.TrashIcon" />
            </button>
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

<style scoped lang="scss">
.query-list {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
  }

  .list-day {
    display: flex;
    gap: 0.5rem;
    margin-right: 5px;
  }

  .status.success {
    border-radius: 20px;
    background: #f0fdf4;
    color: #16a34a;
  }

  .status.danger {
    border-radius: 20px;
    background: #fbeef0;
    color: #d23449;
  }

  .status.warning {
    border-radius: 20px;
    background: #fffbeb;
    color: #d97706;
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
  .query-list {
    .header {
      display: none;
    }

    .status {
      border-radius: 8px !important;
      padding: 0.5rem;
      background: #f5f5f5 !important;
      color: #3f3f46 !important;

      &::before {
        content: "";
        height: 10px;
        width: 10px;
        border-radius: 50%;

        margin-right: 5px;
      }

      &.success {
        &::before {
          background-color: #16a34a;
        }
      }

      &.danger {
        &::before {
          background-color: #d23449;
        }
      }

      &.warning {
        &::before {
          background-color: #d97706;
        }
      }
    }
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
    height: 100% !important;
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
