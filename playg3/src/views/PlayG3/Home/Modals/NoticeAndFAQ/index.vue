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
  <KeepAlive>
    <div class="list-content">
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
    </div>
  </KeepAlive>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Titles, data } from "@/views/PlayG3/Home/ServiceDetail/data";
import ContentItem from "./ContentItem.vue";

const store = useStore();

const ListItem = ref(data.filter((item) => item.type === "notice"));

console.log(ListItem);

const currentTabIdx = computed(() => store.state.notice.activeTab);

console.log();

const tab = ref(currentTabIdx.value ? currentTabIdx.value : 0);

const handleChangeTab = (index, type) => {
  tab.value = index;
  store.commit("handleActiveTab", index);
  const newData = data.filter((item) => item.type === type);
  ListItem.value = newData;
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
