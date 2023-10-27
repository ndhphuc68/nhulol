<template>
  <section id="profile">
    <v-tabs
      v-model="currentTabIdx"
      bg-color="transparent"
      color="var(--primarySCCasino)"
    >
      <v-tab @click="handleChangeTab(0)" style="width: 50%"
        >{{ $t("generalInfo") }}
      </v-tab>
      <v-tab @click="handleChangeTab(1)" style="width: 50%">
        {{ $t("bankAccountInfo") }}
      </v-tab>
    </v-tabs>
    <v-window v-model="currentTabIdx">
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <GeneralInfo />
          </KeepAlive>
        </v-card>
      </v-window-item>
      <v-window-item>
        <v-card color="basil" flat>
          <KeepAlive>
            <BankAccountInfo />
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup>
import { ref } from "vue";
import GeneralInfo from "./GeneralInfo.vue";
import BankAccountInfo from "./BankAccountInfo.vue";

const currentTabIdx = ref(0);

const handleChangeTab = (tab) => {
  currentTabIdx.value = tab;
};
</script>

<style scoped lang="scss">
#profile {
  @media (max-width: 768px) {
    margin-top: 60px;
  }
}
</style>
