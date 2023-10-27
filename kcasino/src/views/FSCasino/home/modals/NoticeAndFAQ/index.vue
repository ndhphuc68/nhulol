<template>
  <section>
  <div class="row text-center m-0">
    <div
      :class="!tab ? 'title col active' : 'title col'"
      @click="handleChangeTab(0)"
    >
      {{ $t("notice") }}
    </div>
    <div
      :class="tab ? 'title col active' : 'title col'"
      @click="handleChangeTab(1)"
    >
      FAQs
    </div>
  </div>
  <div class="mt-4">
    <Notice v-if="!tab" />
    <FAQ v-else />
  </div>
  </section>
</template>

<script setup>
import FAQ from "./FAQ";
import Notice from "./Notice";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const activeTab = computed(() => store.state.notice.activeTab);

const tab = ref(activeTab.value ? activeTab.value : 0);

const handleChangeTab = (index) => (tab.value = index);
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
</style>
