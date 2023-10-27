<template>
  <section id="withdraw">
    <v-tabs
      v-model="currentTabIdx"
      bg-color="transparent"
      color="var(--primarySCCasino)"
    >
      <v-tab @click="handleChangeTab(0)" style="width: 50%">{{
        $t("withdraw")
      }}</v-tab>
      <v-tab @click="handleChangeTab(1)" style="width: 50%">
        {{ $t("withdrawHistory") }}
      </v-tab>
    </v-tabs>
    <v-window v-model="currentTabIdx" class="">
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <Withdraw />
          </KeepAlive>
        </v-card>
      </v-window-item>
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <WithdrawHistory />
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Withdraw from "./Withdraw.vue";
import WithdrawHistory from "./WithdrawHistory.vue";
// const userInfor = computed(() => store.state.user.userInfor);
// const depositor = computed(() => store.state.user.userInfor.me_bank_account);
const currentTabIdx = ref(0);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<style lang="scss" scoped>
#withdraw {
  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    margin: 60px 0 100px !important;
    padding: 0 15px;
  }
  .v-btn__content {
    font-size: 12px;
  }
}
</style>

<style>
#withdraw .v-btn__content {
  font-size: 12px;
}
</style>
