<script setup>
import {ref, computed, watch} from "vue";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import svgIcon from "@/assets/SCCasino/icon/commons";
import { confirm } from "@/utils/SCCasino/toast";
import { addIndexDataTable } from "@/utils/SCCasino";
import { converTime } from "@/utils";
import { columns, inforTable } from "./data";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();

const listHelpV1 = computed(() => store.state.helpCenter.listHelp);

const listHelp = ref(listHelpV1.value);

const userInfor = computed(() => store.state.user.userInfor);

const dateStart = ref(null);
const dateEnd = ref(null);
const currentPage = ref(1);
const itemsPerPage = 4;

const expandedRows = ref([]);
const showMobile = ref(-1);

watch(currentPage, () => {
  let table = document.getElementById("body-table1");
  table.scrollTo({ top: 0, behavior: "smooth" });
});

const expandAll = ($event) => {
  const isExpanded = expandedRows?.value.find(
    (p) => p.cu_idx === $event.data.cu_idx
  );
  if (isExpanded?.cu_idx) {
    expandedRows.value = [];
  } else {
    expandedRows.value = [$event.data];
  }
};

const confirmDeleteProduct = (prod) => {
  confirm(t("do you really want to delete?"), () => {
    handleDeleteHelpCenter(prod.cu_idx);
  });
};

const handleDeleteHelpCenter = async (id) => {
  const res = await store.dispatch("deleteHelpCenterAction", {
    idx: id,
    data: {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    },
  });
  if (res?.is_success) {
    await store.dispatch("showAlert", {
      type: "success",
      message: t("delete_success"),
    });
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("delete_error"),
    });
  }
};

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listHelp.value.slice(startIndex, endIndex);
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

const handleSearchDate = () => {
  if (!dateStart.value || !dateEnd.value || dateEnd.value < dateStart.value)
    return;
  listHelp.value = listHelpV1?.value.filter(
    (item) =>
      item.cu_created * 1000 >= dateStart.value.getTime() &&
      item.cu_created * 1000 <= dateEnd.value.getTime() + 86400000
  );
};

</script>

<template>
  <section>
    <div class="query-list">
      <div class="header">
        <div class="list-day">
          <div class="date-deposit-history">
            <Calendar
              dateFormat="mm/dd/yy"
              class="h-100"
              v-model="dateStart"
              showIcon
            />
          </div>
          <div class="date-deposit-history my-lg-0">
            <Calendar
              dateFormat="mm/dd/yy"
              class="h-100"
              v-model="dateEnd"
              showIcon
            />
          </div>
          <div>
            <Button
              @click="handleSearchDate"
              severity="info"
              :label="$t('search')"
            />
          </div>
        </div>
      </div>
      <div class="table-wrapper my-3 h-100">
        <DataTable
          :value="addIndexDataTable(listHelp)"
          class="p-datatable-lg"
          paginator
          dataKey="cu_idx"
          :rows="5"
          @rowClick="expandAll"
          v-model:expandedRows="expandedRows"
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
          <template #expansion="slotProps">
            <div class="p-3 d-flex flex-column align-start">
              <span class="text-start font-weight-bold mb-2">{{
                slotProps.data.cu_question
              }}</span>
              <p class="text-start">{{ slotProps.data.cu_answer }}</p>
            </div>
          </template>
        </DataTable>
      </div>
      <div class="table-mobile mt-3 d-md-none" id="body-table1">
        <article class="mt-3" v-for="(item, index) in displayData" :key="index">
          <div>
            <span> No.{{ index + 1 }} </span>
            <Tag
              :value="$t(item?.cu_status)"
              class="status"
              :class="getStatusLabel(item?.cu_status)"
            />
          </div>
          <div
            @click="
              showMobile === index ? (showMobile = -1) : (showMobile = index)
            "
            class="mt-3"
          >
            <span>{{ $t("content") }}</span>
            <span class="title">{{ item?.cu_question }}</span>
          </div>
          <div v-if="showMobile === index" class="mt-3 d-flex flex-column">
            <h6>{{ item?.cu_question }}</h6>
            <p>{{ item?.cu_answer }}</p>
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
          v-if="listHelp?.length > 0"
          v-model="currentPage"
          :length="Math.ceil(listHelp?.length / itemsPerPage)"
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

          @media (max-width: 375px) {
            font-size: 12px;
          }

          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .table-wrapper {
      display: none;
    }
  }
}

@media (max-width: 767px) {
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
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    max-width: 60%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
