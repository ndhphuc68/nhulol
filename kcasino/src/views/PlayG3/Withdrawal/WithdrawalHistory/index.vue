<template>
  <div class="deposit-wrapper">
    <div class="table-wrapper my-3 h-100">
      <EmptyData v-if="listWithDraw.length === 0" />
      <div v-else class="container-desktop">
        <DataTable
          :value="listWithDraw"
          class="p-datatable-lg"
          paginator
          :rows="5"
          dataKey="index"
        >
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
      <div class="container-mobile">
        <div
          class="data-item"
          v-for="(item, index) in displayData"
          :key="index"
        >
          <div class="index-item py-3">No.{{ index + 1 }}</div>
          <div class="data-content">
            <div>
              <div
                v-for="(item, index) in columns"
                :key="index"
                class="title-item py-3"
              >
                {{ $t(item.header) }}
              </div>
            </div>
            <div class="data-items">
              <div class="game py-3 text-end">{{ item.wi_member_account }}</div>
              <div class="py-3 text-end" style="padding-right: 0">
                <span
                  :class="`amount status ${getStatusLabel(item.wi_status)}`"
                  style="padding: 4px 10px"
                  >{{ $t(item.wi_status) }}</span
                >
              </div>
              <div class="py-3 text-end">
                <span class="amount status unavailable">
                  {{ converTime(item.wi_created, true) }}
                </span>
              </div>
              <div class="py-3 text-end">
                <span class="amount"> ₩{{ convertMoney(item.wi_money) }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-withdrawal">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(listWithDraw?.length / itemsPerPage)"
          rounded="0"
          v-if="Math.ceil(listWithDraw?.length / itemsPerPage) > 1 "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { convertMoney } from "@/utils/PlayG3";
import { converTime } from "@/utils";
import { useStore } from "vuex";
import { columns } from "../data";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import EmptyData from "@/components/PlayG1/EmptyData/index.vue";

const store = useStore();
const listWithDraw = computed(() => store.state.withdraw.listWithDraw);

const currentPage = ref(1);
const itemsPerPage = 5;

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listWithDraw?.value.slice(startIndex, endIndex);
});

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
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
}

.pagination-withdrawal,
.container-mobile {
  display: none;
}

.card {
  margin: 3rem 0;
  border: none;
  background: transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.v-pagination {
  background: transparent;
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

@media (max-width: 768px) {
  .custom {
    border: none;
  }

  .container-desktop {
    display: none;
  }

  .pagination-withdrawal {
    display: block;
    width: 80%;
    margin: auto;
  }

  .container-mobile {
    font-size: 80%;
    display: block;
    margin-bottom: 0px;

    .title-item {
      padding-left: 10px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;

      &:first-child {
        display: none;
      }

      &:nth-child(2n) {
        background: #27272c;
      }

      @media (max-width: 375px) {
        padding-left: 5px;
      }
    }

    .data-item {
      background: #1d1d20;
      border: 1px solid #545454;
      border-radius: 8px;
      margin-bottom: 20px;
      padding: 20px;
      @media (max-width: 375px) {
        padding: 10px 5px;
      }

      .index-item {
        border-bottom: 1px solid #27272a;
        margin-bottom: 15px;
      }

      .data-content {
        display: grid;
        grid-template-columns: 40% 60%;

        .data-items {
          div {
            padding-right: 10px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            color: #fff;

            &:nth-child(2n + 1) {
              background: #27272c;
            }

            @media (max-width: 375px) {
              padding-right: 5px;
            }
          }
        }
      }

      &:hover {
        transform: scale(0.98);
        transition: transform linear 0.2s;
      }
    }
  }
}
</style>
<style lang="scss">
.deposit-wrapper .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

.deposit-wrapper .page-item {
  margin: 5px !important;
  border-radius: 8px;

  &.active {
    .page-link {
      background: #e9edfc;
      border-radius: 8px;
      border: unset;
      color: var(--text);
    }
  }

  .page-link {
    background: #fafafa;
    border-radius: 8px;
  }
}

.v-btn__content {
  color: var(--textPlayG3);
}

.v-pagination__list {
  margin-bottom: 0px !important;
  padding-left: 0px !important;
}

.v-pagination__prev,
.v-pagination__next {
  //display: none;
}

.table-wrapper {
  .p-datatable-wrapper {
    height: 100% !important;
    min-height: 500px;

    font-size: 12px;

    thead {
      top: 0;

      tr {
        th {
          background-color: #27272c;
          text-align: center;
          color: var(--textPlayG3);
          border-bottom: 1px solid #27272a;
        }
      }
    }

    tbody {
      tr {
        outline: none;
        background-color: #1d1d20;

        td {
          border-bottom: 1px solid #27272a;
          text-align: center;
          background-color: #1d1d20;
          color: var(--textSecondPlayG3);
        }
      }
    }
  }

  .p-datatable .p-column-header-content {
    justify-content: center;
  }

  .p-component {
    background-color: #1d1d20;
  }

  .child {
    margin: 10px auto;
    padding: 4px 10px;
    display: block;
    width: fit-content;
  }

  .p-highlight {
    background: var(--primaryPlayG3) !important;
    color: #fff !important;

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
