<template>
  <div id="betting-history">
    <BannerPage :page="$t('bettingHistory')" />
    <div class="container-desktop my-5">
      <div v-if="isLoading" style="margin-top: 35px">
        <Loading :size="'50'" />
      </div>
      <div class="content" v-else>
        <div class="table-data">
          <div class="title-table">
            <div
              class="text-center"
              v-for="(item, index) in columnsBetting"
              :key="index"
              style="padding: 13px 0"
            >
              {{ $t(item) }}
            </div>
          </div>
          <EmptyData v-if="displayData.length === 0" />
          <div
            v-else
            class="table-content"
            v-infinite-scroll="[handleScroll, { distance: 15 }]"
          >
            <div
              class="data-row"
              v-for="(item, index) in displayData"
              :key="index"
              @click="handleClickDetail(item)"
            >
              <div>{{ index + 1 }}</div>
              <div class="user-name">{{ item.mgr_game_name }}</div>
              <div>
                <span class="amount">
                  {{ convertMoney(item.mgr_bet_money) }}
                </span>
              </div>
              <div>
                <span class="amount status available"
                  >{{ convertMoney(item.mgr_win_value) }}
                </span>
              </div>
              <div>
                <span class="amount status unavailable">
                  {{ convertMoney(item.mgr_lose_value) }}
                </span>
              </div>
              <div>
                <span class="amount"> {{ convertKrTime(item.mgr_date_time) }} </span>
              </div>
            </div>
            <div style="margin-top: 10px" v-if="isLoadingFetch">
              <Loading :size="'30'" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container-mobile"
      v-infinite-scroll="[handleScroll, { distance: 15 }]"
    >
      <EmptyData v-if="displayData.length === 0" />
      <div
        v-else
        class="data-item"
        v-for="(item, index) in displayData"
        :key="index"
        @click="handleClickDetail(item)"
      >
        <div class="index-item">No.{{ index + 1 }}</div>
        <div class="data-content">
          <div>
            <div
              v-for="(item, index) in columnsBetting"
              :key="index"
              class="title-item"
            >
              {{ $t(item) }}
            </div>
          </div>
          <div class="data-items">
            <div class="user-name">{{ item.mgr_game_name }}</div>
            <div>
              <span class="amount">
                {{ convertMoney(item.mgr_bet_money) }}
              </span>
            </div>
            <div>
              <span class="amount status available"
                >{{ convertMoney(item.mgr_win_value) }}
              </span>
            </div>
            <div>
              <span class="amount status unavailable">
                {{ convertMoney(item.mgr_lose_value) }}
              </span>
            </div>
            <div>
              <span class="amount"> {{ convertKrTime(item.mgr_date_time) }} </span>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="isLoadingFetch">
        <Loading :size="'20'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BannerPage from "@/components/G2casino/BannerPage";
import { columnsBetting, testData } from "./data";
import { getBettingHistoryRequest } from "@/api/bettingHistory/request";
import { onMounted, ref } from "vue";
import { convertMoney,convertKrTime } from "@/utils";
import Loading from "@/components/EDGames/Loading";
import { vInfiniteScroll } from "@vueuse/components";
import EmptyData from "@/components/G2casino/EmptyData";

const displayData = ref([]);
const pageIdx = ref(0);
const fullData = ref(false);
const isLoading = ref(true);
const isLoadingFetch = ref(true);

const handleScroll = async () => {
  if (fullData.value) return;
  pageIdx.value = pageIdx.value + 15;
  const res = await getBettingHistoryRequest(pageIdx.value);
  if (res?.is_success) {
    if (res.list.game_history.length === 0) {
      fullData.value = true;
      isLoadingFetch.value = false;
    } else {
      displayData.value = [...displayData.value, ...res.list.game_history];
    }
  } else {
    fullData.value = true;
    isLoadingFetch.value = false;
  }
};

const handleClickDetail = ({ mgr_row_idx, mgr_game_code, mgr_game_name }) => {
  let config =
    "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=800, height=800, top=0,left=0";
  window.open(
    `https://cms.ut788.com/admin/game_detail_history/${mgr_row_idx}/${mgr_game_code}/${mgr_game_name}`,
    "bettingPopup",
    config
  );
};

// totalcnt = 100
onMounted(async () => {
  const res = await getBettingHistoryRequest(0);
  if (res?.is_success) {
    displayData.value = res?.list.game_history;
    displayData.value.length === 0 && (isLoadingFetch.value = false);
  }
  isLoading.value = false;
  // displayData.value =[...testData]
});
</script>

<style scoped>
.container-mobile {
  display: none;
}
.container-desktop {
  padding: 0 5rem;
}
.content {
  margin-top: 15px;
  border: 1px solid var(--neutral-200, #e4e4e7);
}
.title-table {
  display: grid;
  grid-template-columns: 4% 31% repeat(3, 13%) 26%;
  background: #0d1b4e;
  color: #fff;
  font-weight: 600;
  border-radius: 6px;
}
.table-content {
  height: 500px;
  overflow: auto;
}
/*.table-content::-webkit-scrollbar {*/
/*  width: 15px;*/
/*}*/

.data-row {
  display: grid;
  grid-template-columns: 4% 31% repeat(3, 13%) 26%;
  text-align: center;
  cursor: pointer;
}
.data-row:hover {
  background: #cdccc7;
}
.data-row div {
  padding: 13px 0;
  border-bottom: 1px solid #e4e4e7;
  overflow: hidden;
}

.user-name {
  font-weight: normal;
  color: var(--text);
}

.status {
  padding: 6px 10px;
  font-weight: 400;
  border-radius: 45px;
  text-transform: capitalize;
}

.amount {
  color: var(--text);
  font-weight: 700;
}

.status.available {
  background: #f0fdf4;
  color: #15803d;
}

.status.PENDING {
  background: #fffbeb;
  color: #b45309;
}

.status.unavailable {
  background: #fef2f2;
  color: #b91c1c;
}

.status.info {
  color: #2563eb;
}
@media (max-width: 1024px) {
  .container-desktop {
    display: none;
  }
  .container-mobile {
    margin: 1rem 0.5rem;
    display: block;
    max-height: 600px;
    overflow: auto;
  }
  .container-mobile::-webkit-scrollbar {
    display: none;
  }
  .data-item {
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    margin-top: 20px;
  }
  .data-content {
    display: grid;
    grid-template-columns: 40% 60%;
  }
  .index-item {
    padding: 10px;
    border-bottom: 1px solid #e4e4e7;
  }
  .title-item {
    padding: 10px;
  }
  .title-item:nth-child(even) {
    background: #fafafa;
  }
  .title-item:first-child {
    display: none;
  }

  .data-items div {
    padding: 10px;
    width: 100%;
    white-space: nowrap;
    overflow: auto;
    text-align: right;
  }
  .data-items div::-webkit-scrollbar {
    display: none;
  }
  .data-items div:nth-child(odd) {
    background: #fafafa;
  }
}
</style>
