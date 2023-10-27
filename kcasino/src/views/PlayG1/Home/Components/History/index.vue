<template>
  <div class="wrapper-history">
    <div class="withdraw">
      <h1>{{ $t("dailywithdraw") }}</h1>
      <div class="list-price">
        <div class="list-price-animation">
          <div
            v-for="(item, index) in dailyWithdraws"
            :key="index"
            class="list"
          >
            <div class="item">
              <span class="createdAt">{{ formatDateV1(item.wi_created) }}</span>
              <span class="name">{{ item.wi_member_nickname }}</span>
              <span class="money">₮{{ item.wi_money }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="deposit">
      <h1>{{ $t("dailyDeposit") }}</h1>
      <div class="list-price">
        <div class="list-price-animation">
          <div v-for="(item, index) in dailyDeposits" :key="index" class="list">
            <div class="item">
              <span class="createdAt">{{ formatDateV1(item.de_created) }}</span>
              <span class="name">{{ item.de_member_nickname }}</span>
              <span class="money">₮{{ item.de_money }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {formatDate, formatDateV1} from "@/utils";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const dailyDeposits = computed(() => store.getters.getListDepositRealTime);
const dailyWithdraws = computed(() => store.getters.getListWithDrawRealTime);
</script>

<style lang="scss" scoped>
.wrapper-history {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;

  .withdraw,
  .deposit {
    border: 1px solid var(--neutral-200, #e4e4e7);

    .list {
      .item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;
        padding: 16px 12px;
      }
    }

    .list-price {
      height: 240px;
      overflow-y: hidden;
      background: #fff;
      .list-price-animation {
        animation: scrollRow 60s infinite backwards ease-in-out;
      }
    }
  }

  h1 {
    color: #fff;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 0px;
    background: #162f86;
    padding: 16px 12px;
    @media(max-width: 375px) {
      font-size: 20px;
    }
  }

  .createdAt {
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: var(--text-second);
  }

  .name {
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #18181b;
    max-width: 100%;
    overflow: hidden;
  }

  .money {
    font-weight: 600;
    line-height: 19px;
    text-align: right;
    color: #1e3eb3;
    max-width: 100%;
    overflow: hidden;
  }
}

@media (max-width: 768px) {
  .wrapper-history {
    grid-template-columns: 1fr;
  }
}

@keyframes scrollRow {
  0% {
    transform: translateY(0%);
    top: 0%;
  }
  5% {
    transform: translateY(0%);
    top: 0%;
  }
  6% {
    transform: translateY(calc(-51px * 1));
    top: calc(-51px * 1);
  }
  10% {
    transform: translateY(calc(-51px * 1));
    top: calc(-51px * 1);
  }
  11% {
    transform: translateY(calc(-51px * 2));
    top: calc(-51px * 2);
  }
  15% {
    transform: translateY(calc(-51px * 2));
    top: calc(-51px * 2);
  }
  16% {
    transform: translateY(calc(-51px * 3));
    top: calc(-51px * 3);
  }
  20% {
    transform: translateY(calc(-51px * 3));
    top: calc(-51px * 3);
  }
  21% {
    transform: translateY(calc(-51px * 4));
    top: calc(-51px * 4);
  }
  25% {
    transform: translateY(calc(-51px * 4));
    top: calc(-51px * 4);
  }
  26% {
    transform: translateY(calc(-51px * 5));
    top: calc(-51px * 5);
  }
  30% {
    transform: translateY(calc(-51px * 5));
    top: calc(-51px * 5);
  }
  31% {
    transform: translateY(calc(-51px * 6));
    top: calc(-51px * 6);
  }
  35% {
    transform: translateY(calc(-51px * 6));
    top: calc(-51px * 6);
  }
  36% {
    transform: translateY(calc(-51px * 7));
    top: calc(-51px * 7);
  }
  40% {
    transform: translateY(calc(-51px * 7));
    top: calc(-51px * 7);
  }
  41% {
    transform: translateY(calc(-51px * 8));
    top: calc(-51px * 8);
  }
  45% {
    transform: translateY(calc(-51px * 8));
    top: calc(-51px * 8);
  }
  46% {
    transform: translateY(calc(-51px * 9));
    top: calc(-51px * 9);
  }
  50% {
    transform: translateY(calc(-51px * 9));
    top: calc(-51px * 9);
  }
  51% {
    transform: translateY(calc(-51px * 10));
    top: calc(-51px * 10);
  }
  55% {
    transform: translateY(calc(-51px * 10));
    top: calc(-51px * 10);
  }
  56% {
    transform: translateY(calc(-51px * 11));
    top: calc(-51px * 11);
  }
  60% {
    transform: translateY(calc(-51px * 11));
    top: calc(-51px * 11);
  }
  61% {
    transform: translateY(calc(-51px * 12));
    top: calc(-51px * 12);
  }
  65% {
    transform: translateY(calc(-51px * 12));
    top: calc(-51px * 12);
  }
  66% {
    transform: translateY(calc(-51px * 13));
    top: calc(-51px * 13);
  }
  70% {
    transform: translateY(calc(-51px * 13));
    top: calc(-51px * 13);
  }
  71% {
    transform: translateY(calc(-51px * 14));
    top: calc(-51px * 14);
  }
  75% {
    transform: translateY(calc(-51px * 14));
    top: calc(-51px * 14);
  }
  76% {
    transform: translateY(calc(-51px * 15));
    top: calc(-51px * 15);
  }
  80% {
    transform: translateY(calc(-51px * 15));
    top: calc(-51px * 15);
  }
  81% {
    transform: translateY(calc(-51px * 16));
    top: calc(-51px * 16);
  }
  85% {
    transform: translateY(calc(-51px * 16));
    top: calc(-51px * 16);
  }
  86% {
    transform: translateY(calc(-51px * 17));
    top: calc(-51px * 17);
  }
  90% {
    transform: translateY(calc(-51px * 17));
    top: calc(-51px * 17);
  }
  91% {
    transform: translateY(calc(-51px * 18));
    top: calc(-51px * 18);
  }
  95% {
    transform: translateY(calc(-51px * 18));
    top: calc(-51px * 18);
  }
  96% {
    transform: translateY(calc(-51px * 19));
    top: calc(-51px * 19);
  }
  97% {
    transform: translateY(0);
    top: 0%;
  }
}
</style>
