<script setup>
import { ref } from "vue";
import DepositHistory from "@/views/DoPlay/modalsDoPlay/Personal/components/Deposit/DepositHistory.vue";
import RequestDeposit from "@/views/DoPlay/modalsDoPlay/Personal/components/Deposit/RequestDeposit.vue";

const currentTabIdx = ref(true);

function handleChangeTab() {
  currentTabIdx.value = !currentTabIdx.value;
}
</script>

<template>
  <div class="deposit">
    <div class="v-row tab-style">
      <div
        @click="handleChangeTab"
        :class="currentTabIdx && 'active'"
        class="v-col-6 d-flex justify-center align-center tab-style-item"
      >
        <span>{{ $t("requestdeposit") }}</span>
      </div>
      <div
        @click="handleChangeTab"
        :class="!currentTabIdx && 'active'"
        class="v-col-6 d-flex justify-center align-center tab-style-item"
      >
        <span>{{ $t("depositHistory") }}</span>
      </div>
    </div>
    <div v-if="currentTabIdx" class="v-row mt-md-5 mt-5 deposit-main">
      <RequestDeposit />
    </div>
    <div v-else class="v-row deposit-main">
      <DepositHistory />
    </div>
  </div>
</template>

<style scoped lang="scss">
.deposit {
  padding: 20px 40px;

  @media (max-width: 991.98px) {
    padding: 2rem 20px;
  }

  .deposit-main {
    @media (max-width: 991.98px) {
      //height: 600px;
      //overflow-y: scroll;
    }
  }

  .tab-style {
    .tab-style-item {
      border: 1px solid #d4d4d8;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      cursor: pointer;

      @media (max-width: 375px) {
        font-size: 10px;
      }

      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        
      }

      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      span {
        color: #52525b;
      }
    }

    .active {
      background: var(--primaryDoplay);

      span {
        color: #fff;
      }
    }
  }
}
</style>
