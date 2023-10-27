<template>
  <div id="betting-history">
    <BannerPage :page="$t('bettingHistory')" />
    <div class="container-desktop">
      <div v-if="isLoading" style="margin-top: 35px">
        <!-- <Loading :size="'50'" /> -->
      </div>
      <div class="content" v-else>
        <div class="table-data">
          <div class="title-table">
            <div class="text-center" v-for="(item, index) in columnsBetting" :key="index" style="padding: 20px 0">
              {{ $t(item) }}
            </div>
          </div>
          <div class="table-content" v-infinite-scroll="[handleScroll, { distance: 15 }]">
            <div class="data-row" v-for="(item, index) in testData" :key="index"
              @click="handleClickDetail(item)">
              <div class="number">{{ index + 1 }}</div>
              <div class="game">{{ item.mgr_game_name }}</div>
              <div>
                <span class="amount status available">${{ convertMoney(item.mgr_win_value) }}
                </span>
              </div>
              <div>
                <span class="amount status unavailable">
                  ${{ convertMoney(item.mgr_lose_value) }}
                </span>
              </div>
              <div>
                <span class="amount">
                  ${{ convertMoney(item.mgr_bet_money) }}
                </span>
              </div>
              <div>
                <span class="date"> {{ formatDate(item.mgr_date_time, 'LL') }} </span>
              </div>
            </div>
            <div style="margin-top: 10px" v-if="isLoadingFetch">
              <!-- <Loading :size="'30'" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-mobile" v-infinite-scroll="[handleScroll, { distance: 15 }]">
      <div class="data-item" v-for="(item, index) in testData" :key="index" @click="handleClickDetail(item)">
        <div class="index-item py-3">No.{{ index + 1 }}</div>
        <div class="data-content">
          <div>
            <div v-for="(item, index) in columnsBetting" :key="index" class="title-item py-3">
              {{ $t(item) }}
            </div>
          </div>
          <div class="data-items">
            <div class="game py-3">{{ item.mgr_game_name }}</div>
            <div class="py-3">
              <span class="amount status available">${{ convertMoney(item.mgr_win_value) }}
              </span>
            </div>
            <div class="py-3">
              <span class="amount status unavailable">
                ${{ convertMoney(item.mgr_lose_value) }}
              </span>
            </div>
            <div class="py-3">
              <span class="amount">
                ${{ convertMoney(item.mgr_bet_money) }}
              </span>
            </div>
            <div class="py-3">
              <span class="date"> {{ formatDate(item.mgr_date_time, 'LL') }} </span>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="isLoadingFetch">
        <!-- <Loading :size="'20'" /> -->
      </div>
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
import { ref } from "vue";
import { columnsBetting, testData } from "./data";
import { convertMoney, formatDate } from "@/utils";
import BannerPage from '@/components/G2casino/BannerPage'

const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(7);

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
    margin: 100px auto 0;
    border: 1px solid #F4F4F5;
    // border-radius: 8px;


    .title-table {
      display: grid;
      grid-template-columns: 4% 31% repeat(3, 13%) 26%;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      font-weight: 600;
      color: #fff;
      background: var(--bg-tableHead);
    }

    .table-content {
      overflow: auto;

      .data-row {
        display: grid;
        grid-template-columns: 4% 31% repeat(3, 13%) 26%;
        text-align: center;
        cursor: pointer;

        padding: 30px 0;
        border-bottom: 1px solid #EAECF0;

        &:hover {
          transform: scale(0.98);
          transition: transform linear 0.2s;
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
    color: #2563EB;
  }

  .available {
    color: #16A34A;
  }

  .unavailable {
    color: #EF4444;
  }

  .number,
  .date,
  .game {
    color: #52525B;
  }

  .custom {
    width: 1440px;
    max-width: 90%;
    margin: 0 auto;
    border: 1px solid #EAECF0;
    border-top: none;
    padding: 15px 0;

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

    .container-desktop {
      display: none;
    }

    .container-mobile {
      display: block;
      width: 95%;
      margin-bottom: 0px;


      .title-item {

        &:first-child {
          display: none;
        }
      }

      .data-item {
        border-radius: 8px;
        box-shadow: rgba(149, 157, 165, 0.5) 0 4px 12px;
        margin-bottom: 20px;
        padding: 10px;

        .data-content {
          display: grid;
          grid-template-columns: 40% 60%;
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

<style>
    .v-pagination__list {
      margin-bottom: 0px !important;
      padding-left: 0px !important;
    }
</style>