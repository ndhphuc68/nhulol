<template>
  <div id="betting-history">
    <div class="container-desktop">
      <h3 class="mb-10">{{ $t("bettingHistory") }}</h3>

      <div v-if="isLoading" style="margin-top: 35px">
        <!-- <Loading :size="'50'" /> -->
      </div>
      <div class="table-wrapper my-3 h-100">
        <DataTable
          :value="testData"
          class="p-datatable-lg"
          paginator
          dataKey="mgr_idx"
          :rows="5"
        >
          <template v-for="col of columnsBetting" :key="col.field">
            <Column :field="col.field" :header="$t(col.header)">
              <template #body="slotProps">
                <span
                  @click="handleClickDetail"
                  :class="`child ${
                    col.field === 'mgr_win_value' ? 'available' : ''
                  } ${col.field === 'mgr_lose_value' ? 'unavailable' : ''}  ${
                    col.field === 'mgr_bet_money' ? 'amount' : ''
                  } `"
                >
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
    </div>
    <div
      class="container-mobile"
      v-infinite-scroll="[handleScroll, { distance: 15 }]"
    >
      <h3 class="mb-10">{{ $t("bettingHistory") }}</h3>
      <div
        class="data-item"
        v-for="(item, index) in displayData"
        :key="index"
        @click="handleClickDetail(item)"
      >
        <div class="index-item py-3">No.{{ index + 1 }}</div>
        <div class="data-content">
          <div>
            <div
              v-for="(item, index) in columnsBetting"
              :key="index"
              class="title-item py-3"
            >
              {{ $t(item.header) }}
            </div>
          </div>
          <div class="data-items">
            <div class="game py-3 text-end">{{ item.mgr_game_name }}</div>
            <div class="py-3 text-end">
              <span class="amount status available"
                >${{ convertMoney(item.mgr_win_value) }}
              </span>
            </div>
            <div class="py-3 text-end">
              <span class="amount status unavailable">
                ${{ convertMoney(item.mgr_lose_value) }}
              </span>
            </div>
            <div class="py-3 text-end">
              <span class="amount">
                ${{ convertMoney(item.mgr_bet_money) }}
              </span>
            </div>
            <div class="py-3 text-end">
              {{ formatDate(item.mgr_date_time, "LL") }}
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="isLoadingFetch"></div>
    </div>
    <v-pagination
      class="custom"
      v-model="currentPage"
      :length="Math.ceil(testData?.length / itemsPerPage)"
      rounded="0"
      prev-icon="<-"
      next-icon="->"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { columnsBetting, testData } from "./data";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { convertMoney, formatDate } from "@/utils/PlayG3";

const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 4;

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return testData?.slice(startIndex, endIndex);
});

const handleClickDetail = ({ mgr_row_idx, mgr_game_code, mgr_game_name }) => {
  let config =
    "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=800, height=800, top=0,left=0";
  window.open(
    `https://cms.ut788.com/admin/game_detail_history/${mgr_row_idx}/${mgr_game_code}/${mgr_game_name}`,
    "popupId",
    config
  );
};
</script>

<style scoped lang="scss">
#betting-history {
  margin-bottom: 100px;

  .container-desktop {
    max-width: 1440px;
    width: 90%;
    margin: 50px auto 0;

    .title-table {
      display: grid;
      grid-template-columns: 4% 31% repeat(3, 13%) 26%;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      font-weight: 500;
      color: #fff;
      background: #47474e;

      div {
        padding: 30px 0 !important;
      }
    }

    .table-content {
      overflow: auto;

      .data-row {
        display: grid;
        grid-template-columns: 4% 31% repeat(3, 13%) 26%;
        text-align: center;
        cursor: pointer;
        background: rgba(39, 39, 42, 0.8);
        padding: 30px 0;
        border-bottom: 1px solid #27272a;
        transition: all 0.3s;

        &:hover {
          transition: all 0.3s;
          background: rgba(39, 39, 44, 0.5);
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .container-mobile {
    display: none;
    margin: 50px auto;
  }

  .amount {
    color: #2563eb;
  }

  .available {
    color: #16a34a;
  }

  .unavailable {
    color: #ef4444;
  }

  .number,
  .date,
  .game {
    color: #52525b;
  }

  .custom {
    display: none;
    width: 1440px;
    max-width: 90%;
    margin: 0 auto;
    /* border: 1px solid #27272a; */
    border-top: none;
    padding: 15px 0;
    /* border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px; */

    .v-pagination__list {
      margin-bottom: 0px !important;
      padding-left: 0px !important;
    }

    .v-pagination__prev,
    .v-pagination__next {
      display: none;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;

    .custom {
      display: block;
    }

    .container-desktop {
      display: none;
    }

    .container-mobile {
      display: block;
      width: 94%;
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
      }

      .data-item {
        background: #1d1d20;
        border: 1px solid #545454;
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 20px;

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
            }
          }
        }

        &:hover {
          transform: scale(0.98);
          transition: transform linear 0.2s;
        }
      }
    }

    .v-theme--myCustomLightTheme {
      width: 95%;
      border: none;
    }
  }
}
</style>

<style lang="scss">
.table-wrapper {
  .p-datatable-wrapper {
    height: 100% !important;
    min-height: 500px;
    font-size: 12px;
    .p-datatable-table {
      thead {
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
        height: 100%;
        tr {
          outline: none;
          background-color: #1d1d20;
          height: calc(100% / 5) !important;

          td {
            border-bottom: 1px solid #27272a;
            text-align: center;
            background-color: #1d1d20;
            color: var(--textSecondPlayG3);
          }
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
    padding: 14px 0;
    display: block;
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
