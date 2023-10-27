<template>
  <section id="deposit">
    <v-tabs
      v-model="currentTabIdx"
      bg-color="transparent"
      color="var(--primarySCCasino)"
    >
      <v-tab @click="handleChangeTab(0)" style="width: 50%">{{
        $t("deposit")
      }}</v-tab>
      <v-tab @click="handleChangeTab(1)" style="width: 50%">
        {{ $t("depositHistory") }}
      </v-tab>
    </v-tabs>
    <v-window v-model="currentTabIdx">
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <Deposit />
          </KeepAlive>
        </v-card>
      </v-window-item>
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <DepositHistory />
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Deposit from "./Deposit.vue";
import DepositHistory from "./DepositHistory.vue";
// const userInfor = computed(() => store.state.user.userInfor);
// const depositor = computed(() => store.state.user.userInfor.me_bank_account);
const currentTabIdx = ref(0);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<style lang="scss" scoped>
#deposit {
  margin: 0 0 25px;

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    margin: 60px 0 80px !important;
  }
}
</style>
