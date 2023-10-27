<script setup>
import svgIcon from "@/assets/SCCasino/icon/commons";
import EventItem from "./EventItem";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const eventList = computed(() => store.getters.getEvent);
const handleSeeMore = () => {
  store.commit("handleToggle", "noticeEventFAQ");
  store.commit("handleActiveTab", 2);
};
</script>

<template>
  <div class="notice-container">
    <div class="notice-head">
      <div class="d-flex align-items-center">
        <h4 class="notice-title me-2">{{ $t("event") }}</h4>
        <component class="icon" :is="svgIcon?.EventIcon" />
      </div>
      <button class="btn-more btn-hover" @click="handleSeeMore">
        {{ $t("seeMore") }}
      </button>
    </div>
    <div class="notice-body">
      <EventItem
        v-for="(item, index) in eventList?.slice(0, 3)"
        :key="index"
        :index="index"
        :notice="item"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.notice-container {
  .notice-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .notice-title {
      font-weight: 700;
      font-size: 36px;
      color: var(--primarySCCasino);

      @media (max-width: 375px) {
        font-size: 22px;
        margin-bottom: 0;
      }
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .btn-more {
      color: var(--primarySCCasino);
      font-weight: 500;
    }
  }
}
</style>
