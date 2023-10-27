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
      <p class="title-content">{{ data?.no_subject }}</p>
      <div class="ul-208" v-html="data?.no_content"></div>
      <p v-html="data?.no_content_txt"></p>
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
    default: {},
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

<style scoped lang="scss">
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
  @media (max-width: 375px) {
    font-size: 12px;
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
}

.ul-208:deep(ul) {
  list-style: disc !important;
  margin-block-start: 1em !important;
  margin-block-end: 1em !important;
  margin-inline-start: 0px !important;
  margin-inline-end: 0px !important;
  padding-inline-start: 40px !important ;
}

.title-content {
  font-weight: 600;
}

.index,
.day {
  color: #a1a1aa;
  text-align: center;
}

@media (max-width: 576px) {
  .title,
  .day {
    font-size: 12px;
  }
}

.title {
  font-weight: 600;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 0px;
}

@media (max-width: 600px) {
  .data-notice {
    padding: 0.5rem 0;
  }
}
</style>
