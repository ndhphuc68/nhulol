<script setup>
import { ref } from "vue";
import Notice from "./Components/Notice";
import FAQ from "./Components/FAQ";
import Event from "./Components/Event";
import { useStore } from "vuex";

const store = useStore();

const currentTabIdx = ref(store.state.notice.activeTab);
const titles = ["notice", "faqs", "event"];
const tabs = [Notice, FAQ, Event];

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<template>
  <section id="event">
    <v-tabs v-model="currentTabIdx" fixed-tabs>
      <v-tab
        v-for="(item, index) in titles"
        :key="item"
        :value="item"
        @click="handleChangeTab(index)"
      >
        {{ $t(item) }}
      </v-tab>
    </v-tabs>
    <v-window v-model="currentTabIdx">
      <v-window-item v-for="(Tab, index) in tabs" :key="index">
        <v-card color="basil" flat>
          <KeepAlive>
            <component :is="Tab" />
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </section>
</template>

<style lang="scss" scoped>
#event {
  margin: 0 0 5%;
  /* padding: 0; */

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    margin: 60px 0 80px !important;
    padding: 0 15px;
  }
}
</style>

<style>
#deposit .v-btn__content {
  font-size: 12px;
}
</style>
