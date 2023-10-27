<template>
  <div class="wrapper">
    <div
      class="data-notice"
      @click="handleShowDetail()"
      :style="showDetail ? 'background : #FAFAFA' : ''"
    >
      <div class="index">{{ index + 1 }}</div>
      <div class="title" :style="showDetail && 'color : #2F9015'">
        {{ data?.no_subject }}
      </div>
      <div class="day">{{ converTime(data?.no_created) }}</div>
    </div>
    <div class="content" :style="{ display: showDetail ? 'block' : 'none' }">
      <div class="px-2 px-sm-4 d-flex flex-column">
        <p class="title-content">{{ data?.no_subject }}</p>
        <div v-html="data?.no_subject"></div>
        <div v-html="data?.no_content_txt"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  data: {
    type: Object,
  },
  index: Number,
});

const showDetail = ref(
  computed(() => {
    return props.index === store.state.notice.idxActiveContent;
  }).value
);

const handleShowDetail = () => {
  // store.commit('handleActiveContent', idx)
  showDetail.value = !showDetail.value;
};
</script>

<style scoped>
.data-notice {
  display: grid;
  grid-template-columns: 10% 55% 35%;
  justify-items: center;
  align-items: center;
  padding: 15px 0;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
  border-bottom: 1px solid #e4e4e7;
  @media (max-width: 576px) {
    font-size: 14px;
  }
  @media (max-width: 375px) {
    font-size: 12px;
    line-height: 18px;
  }
}

.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}

.content {
  padding: 0.5rem;
  background: #fafafa;
  border-bottom: 1px solid #e4e4e7;
  @media (max-width: 576px) {
    font-size: 14px;
  }
  @media (max-width: 375px) {
    font-size: 12px;
    line-height: 18px;
  }
}
.title-content {
  font-weight: 600;
}

.index,
.day {
  color: #a1a1aa;
  text-align: center;
}

.title {
  font-weight: 600;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .data-notice {
    padding: 0.5rem 0;
  }
}
</style>
