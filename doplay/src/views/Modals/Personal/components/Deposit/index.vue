<script setup>
import {computed, ref} from "vue";
import DepositHistory from "@/views/Modals/Personal/components/Deposit/DepositHistory.vue";
import RequestDeposit from "@/views/Modals/Personal/components/Deposit/RequestDeposit.vue";

const currentTabIdx = ref(0);
const items = [
  'requestdeposit', 'deposithistory'
];
const contents = [
  RequestDeposit, DepositHistory
]
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<template>
  <div class="deposit">
    <v-tabs
        v-model="currentTabIdx"
        bg-color="transparent"
        color="basil"
        grow
    >
      <v-tab
          v-for="(item, index) in items"
          :key="item"
          :value="item"
          @click="handleChangeTab(index)"
      >
        {{ $t(item) }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          v-for="item in items"
          :key="item"
          :value="item"
      >
        <v-card
            color="basil"
            flat
        >
          <KeepAlive>
            <component :is="content"/>
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped></style>
<style>
.deposit .v-btn.v-tab {
  border: 1px solid #D4D4D8;
}

.deposit .v-btn.v-tab--selected {
  background-color: var(--primary) !important;
  border: 1px solid var(--primary);
}

.deposit .text-basil {
  color: #FFFFFF !important;
}

</style>