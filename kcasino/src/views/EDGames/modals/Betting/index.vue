<template>
  <WrapperModal>
    <div class="container">
      <div class="top">
        <h1 class="title">{{ $t("bettingHistory") }}</h1>
      </div>
      <div v-if="isLoading" style="margin-top: 35px">
        <Loading :size="'50'" />
      </div>
      <div class="content" v-else>
        <v-table class="table" fixed-header height="500px">
          <thead class="table-header">
            <tr>
              <th
                class="text-center"
                v-for="(item, index) in columnsBetting"
                :key="index"
                style="background-color: #f7f7f9"
              >
                {{ $t(item) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="data-row"
              v-for="(item, index) in displayData"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td class="user-name">{{ item.mgr_game_name }}</td>
              <td>
                <span class="amount">
                  {{ convertMoney(item.mgr_bet_money) }}
                </span>
              </td>
              <td>
                <span class="amount status available"
                  >{{ convertMoney(item.mgr_win_value) }}
                </span>
              </td>
              <td>
                <span class="amount status unavailable">
                  {{ convertMoney(item.mgr_lose_value) }}
                </span>
              </td>
              <td>
                <span class="amount status info">
                  {{ convertMoney(item.mgr_win_value + item.mgr_lose_value) }}
                </span>
              </td>
              <td>
                <span class="amount"> {{ item.mgr_date_time }} </span>
              </td>
              <!--            <td class="action">-->
              <!--              <button :ref="setPopupRef(index)" :key="index" @click="handleViewAction(index)">...</button>-->
              <!--              <div class="action-group" v-show="indexShowAction === index">-->
              <!--                <button class="action-item">{{ $t("viewdetails") }}</button>-->
              <!--                <button class="action-item">{{ $t("delete") }}</button>-->
              <!--              </div>-->
              <!--            </td>-->
            </tr>
            <!--          </v-infinite-scroll>-->
            <div>
              <button @click="handleScroll">Load More...</button>
            </div>
          </tbody>
        </v-table>

        <!--            table moble-->

        <div class="table-mobile">
          <div
            class="card-item"
            v-for="(row, index) in displayData"
            :key="row.id"
          >
            <div class="mobile-column">
              <template
                v-for="(item, indexColum) in columnsBetting"
                :key="indexColum"
              >
                <div class="column-css text-left" v-if="item !== 'Action'">
                  {{ indexColum != 0 ? $t(item) : "no." + index + 1 }}
                </div>
              </template>
            </div>
            <div class="mobile-row">
              <!--              <div class="action">-->
              <!--                <button :ref="setPopupRef(index)" :key="index" @click="handleViewAction(index)">...</button>-->
              <!--&lt;!&ndash;                <div class="action-group" v-show="indexShowAction === index">&ndash;&gt;-->
              <!--&lt;!&ndash;                  <button class="action-item">{{ $t("viewdetails") }}</button>&ndash;&gt;-->
              <!--&lt;!&ndash;                  <button class="action-item">{{ $t("delete") }}</button>&ndash;&gt;-->
              <!--&lt;!&ndash;                </div>&ndash;&gt;-->
              <!--              </div>-->
              <div class="user-name">{{ row.mgr_game_name }}</div>
              <div>
                <span class="amount">
                  {{ convertMoney(row.mgr_bet_money) }}
                </span>
              </div>
              <div>
                <span class="amount status available">
                  {{ convertMoney(row.mgr_win_value) }}
                </span>
              </div>
              <div>
                <span class="amount status unavailable" :class="row.state">
                  {{ convertMoney(row.mgr_lose_value) }}
                </span>
              </div>
              <div>
                <span class="amount status info" :class="row.state">
                  {{ convertMoney(row.mgr_win_value + row.mgr_lose_value) }}
                </span>
              </div>
              <div>
                <span class="amount"> {{ row.mgr_date_time }} </span>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="paging">-->
        <!--          <button class="button-next">-->
        <!--            <img alt="img" src="@/assets/icon/arrow-letf.png"/>-->
        <!--            <p>{{ 'previous' }}</p>-->

        <!--          </button>-->
        <!--          <div>-->
        <!--            <button class="number-page active"> 1</button>-->
        <!--            <button class="number-page "> 2</button>-->
        <!--            <button class="number-page "> 3</button>-->
        <!--            <button class="number-page "> ...</button>-->
        <!--            <button class="number-page "> 8</button>-->
        <!--            <button class="number-page "> 9</button>-->
        <!--            <button class="number-page "> 10</button>-->
        <!--          </div>-->
        <!--          <button class="button-next">-->
        <!--            <img alt="img" src="@/assets/icon/arrow-icon.png"/>-->
        <!--            <p>{{ 'next' }}</p>-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
      <!--      <v-infinite-scroll-->
      <!--          color="secondary"-->
      <!--          mode="manual"-->
      <!--          height="400"-->
      <!--          :onLoad="handleScroll"-->
      <!--          :items="displayData"-->
      <!--      >-->
      <!--        <template v-for="(item,idx) in items" :key="idx">-->
      <!--          <div>{{ item.mgr_game_name}}</div>-->
      <!--        </template>-->
      <!--      </v-infinite-scroll>-->
    </div>
  </WrapperModal>
</template>

<script setup>
import WrapperModal from "../components/WrapperModal";
import { columnsBetting, dataBetting } from "./data";
// import {mixin} from "@/utils";
import { getBettingHistoryRequest } from "@/api/bettingHistory/request";
import { onMounted, ref } from "vue";
import { convertMoney } from "@/utils";
import Loading from "@/components/EDGames/Loading";

const displayData = ref([]);
// const { setPopupRef, indexShowAction } = mixin();
const pageIdx = ref(0);
const fullData = ref(false);
const isLoading = ref(true);

// const handleViewAction = (index) => {
//   if (indexShowAction.value === index) {
//     indexShowAction.value = -1;
//   } else {
//     indexShowAction.value = index;
//   }
// }

const handleScroll = async () => {
  if (fullData.value) return;
  pageIdx.value = pageIdx.value + 15;
  const res = await getBettingHistoryRequest(pageIdx.value);
  if (res?.is_success) {
    if (res.list.game_history.length === 0) fullData.value = true;
    else {
      displayData.value = [...displayData.value, ...res.list.game_history];
    }
  } else {
    console.log("erros");
  }
};

// totalcnt = 100
onMounted(async () => {
  const res = await getBettingHistoryRequest(0);
  if (res?.is_success) {
    displayData.value = res?.list.game_history;
  }
  isLoading.value = false;
});
</script>

<style scoped>
.content {
  height: 500px;
  overflow: auto;
  margin-top: 15px;
}

.top {
  margin: 0 auto;
}

.title {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--text);
  text-align: center;
}

.card-item {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
  width: calc(50% - 32px);
  margin: 16px;
  display: flex;
}

.card-item img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.action {
  position: relative;
}

.column-css {
  /*position: relative;*/
  /*position: absolute;*/
  width: 100%;
}

.column-css:nth-child(1)::after {
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 30%;
  background-color: rgba(0, 0, 0, 0.03);
  opacity: 0.8;
  border-radius: 4px;
  position: absolute;
}

.action button {
  padding: 5px 10px;
}

.action-group {
  position: absolute;
  right: 0;
  display: flex;
  background: #fafafa;
  border: 1px solid #52525b;
  border-radius: 8px;
  bottom: 25px;
}

.action-item {
  font-style: normal;
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
  color: var(--text);
}

.deposit-history {
  width: 100%;
}

.data-row td {
  color: var(--text-second);
}

.table-header {
  background: #f7f7f9;
}

.table-header th {
  color: var(--text-second) !important;
}

.number-page {
  width: 40px;
  height: 40px;
  color: var(--text-second);
  border-radius: 8px;
}

.paging {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #eaecf0;
}

.paging img {
  width: 20px;
  height: 20px;
}

.paging .button-next {
  width: 113px;
  height: 36px;
  background: var(--bg);
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-next p {
  color: var(--text);
  margin-left: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}

.number-page.active {
  background-color: var(--primary-light);
  color: var(--primary);
}

th {
  text-align: center;
}

td {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
}

.user-name {
  font-weight: normal;
  color: var(--text);
}

.status {
  padding: 6px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  border-radius: 45px;
  text-transform: capitalize;
}

.amount {
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
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

.table-mobile {
  display: none;
}

@media (max-width: 1024px) {
  .table {
    display: none;
  }

  .table-mobile {
    display: block;
  }

  .mobile-column {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mobile-row {
    text-align: right !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-item {
    display: flex;
    width: 100%;
    position: relative;
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #e4e4e7;
    border-radius: 5px;
    justify-content: space-between;
  }

  .mobile-column div {
    padding: 8px;
  }

  .mobile-row div {
    padding: 8px;
  }

  .paging {
    display: none;
  }
}
</style>
