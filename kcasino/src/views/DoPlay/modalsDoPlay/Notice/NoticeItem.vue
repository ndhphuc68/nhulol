<template>
  <article>
    <div class="top" @click="handleShowContent">
      <div class="d-flex justify-center">{{ idx + 1 }}</div>
      <div class="subject">
        {{ notice.no_subject }}
      </div>
      <div class="date d-flex align-center justify-center">
        {{ converTime(notice.no_created) }}
      </div>
    </div>
    <div class="content" :style="{ display: showDetail ? 'block' : 'none' }">
      <div class="px-5 d-flex flex-column">
        <p class="font-weight-bold mb-2" v-html="notice?.no_subject"></p>
        <p class="mb-2" v-html="notice?.no_content"></p>
        <p v-html="notice?.no_content_txt"></p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const store = useStore();
const showDetail = ref(
  computed(() => {
    return props.idx === store.state.notice.idxActiveContent;
  }).value
);

const props = defineProps({
  idx: Number,
  notice: Object,
});

const handleShowContent = () => (showDetail.value = !showDetail.value);
</script>

<style scoped lang="scss">
article {
  text-align: center;
  border-bottom: 1px solid #d4d4d8;

  .top {
    display: grid;
    grid-template-columns: 15% 55% 30%;
    padding: 1rem;

    &:hover {
      cursor: pointer;
      background: #f4f4f5;
    }
  }

  .subject {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }

  .content {
    padding: 0.5rem 1rem;
    text-align: left;
    background: #fafafa;
  }

  .date {
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }
}
</style>
