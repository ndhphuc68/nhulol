<template>
  <div class="container">
    <div class="titles">
      <button
        class="title-item"
        v-for="(title, index) in titles"
        @click="handleChangeTab(index)"
        :key="index"
        :class="{ active: activeIndex === index }"
      >
        {{ $t(title) }}
      </button>
    </div>
    <div class="tab">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { noticeTabs } from "@/utils/datas";
import NoticeTab from "./components/NoticeTab";
import FAQTab from "./components/FAQTab";
import EventTab from "./components/EventTab";

const store = useStore();
const activeTab = computed(() => tabs[activeIndex.value]);
const activeIndex = ref(store.state.auth.activeMenu);
const tabs = [NoticeTab, FAQTab, EventTab];
const { titles } = noticeTabs;

const handleChangeTab = (index) => {
  store.commit("handleActiveSidebar", noticeTabs.tabs[index]);
  activeIndex.value = index;
};
</script>
<style scoped>
.titles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 0px;
  border-bottom: 2px solid #e4e4e7;
}

.titles {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.titles::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.tab {
  padding: 0 16px;
  margin-top: 32px;
  width: 100%;
}

.title-item {
  height: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: var(--text-second);
  text-transform: capitalize;
  background-color: var(--bg);
}

.title-item.active {
  color: var(--primary);
}

.title-item:hover {
  color: var(--primary);
}

.title-item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
  height: 0px;
  left: 0;
  top: calc(100% - 1px);
  border: 2px solid #cc9a6c;
}

@media (max-width: 1024px) {
  .tab {
    padding: 0;
  }

  .title-item {
    height: unset;
    padding: 0 20px;
  }
}

@media (max-width: 280px) {
  .title-item {
    font-size: 12px;
  }
}
</style>
