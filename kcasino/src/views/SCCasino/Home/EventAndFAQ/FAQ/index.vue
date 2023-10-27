<script setup>
import svgIcon from "@/assets/SCCasino/icon/commons";
import FAQItem from "./FAQItem";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const listFAQ = computed(() => store.getters.getFAQ);
const handleSeeMore = () => {
  store.commit("handleToggle", "noticeEventFAQ");
  store.commit("handleActiveTab", 1);
};
</script>

<template>
  <div class="notice-container">
    <div class="notice-head">
      <div class="d-flex align-items-center">
        <h4 class="notice-title me-2">{{ "F.A.Q" }}</h4>
        <component class="icon" :is="svgIcon?.QuestionIcon" />
      </div>
      <button class="btn-more btn-hover" @click="handleSeeMore">
        {{ $t("seeMore") }}
      </button>
    </div>
    <div class="notice-body">
      <FAQItem
        v-for="(item, index) in listFAQ?.slice(0, 3)"
        :key="index"
        :index="index"
        :notice="item"
        :idx="index"
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
