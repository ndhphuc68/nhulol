<template>
  <v-tabs
    v-model="currentTabIdx"
    color="var(--primaryPlayG3)"
    class="mt-4 mb-6"
  >
    <v-tab
      v-for="(item, index) in Titles"
      :key="index"
      @click="handleChangeTab(index, item.type)"
      style="width: calc(100% / 3)"
    >
      {{ $t(item.type) }}
    </v-tab>
  </v-tabs>
  <!-- <KeepAlive> -->
  <!-- <div class="list-content">
      <div class="title">
        <div>#</div>
        <div>{{ $t("title") }}</div>
        <div>{{ $t("date") }}</div>
      </div>
      <div class="list-item">
        <div v-for="(item, idx) in ListItem" :key="idx">
          <ContentItem :data="item" :index="idx" />
        </div>
      </div>
    </div> -->
  <div>
    <component :is="Child[currentTabIdx]" />
  </div>
  <!-- </KeepAlive> -->
</template>

<script setup>
import { computed, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { Titles } from "@/views/PlayG3/Home/ServiceDetail/data";
import Notice from "./Notice.vue";
import Faq from "./Faq.vue";
import Event from "./Event.vue";

const store = useStore();
const Child = [Notice, Event, Faq];
const currentTabIdx = computed(() => store.state.notice.activeTab);
const tab = ref(currentTabIdx.value ? currentTabIdx.value : 0);

onUnmounted(() => {
  store.commit("handleActiveContent", -1);
});
const handleChangeTab = (index) => {
  tab.value = index;
  store.commit("handleActiveTab", index);
};
</script>

<style scoped lang="scss">
.row,
.col {
  margin: 0;
  padding: 0;
}

.title {
  font-weight: 600;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }
}

.active {
  border-bottom: 2px solid #de6777;
}

.list-content {
  background: transparent;

  .title {
    display: grid;
    grid-template-columns: 10% 70% 20%;
    font-weight: 500;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 90%;
    }
  }
}
</style>
