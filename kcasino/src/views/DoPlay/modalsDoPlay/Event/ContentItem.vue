<template>
  <div class="wrapper">
    <div
      class="data-notice"
      @click="handleShowDetail()"
      :style="showDetail ? 'background : #FAFAFA' : ''"
    >
      <div class="index">{{ index + 1 }}</div>
      <div class="title w-100" :style="showDetail && 'color : #2F9015'">
        {{ data?.no_subject }}
      </div>
      <div class="day">{{ converTime(data?.no_created) }}</div>
    </div>
    <div class="content" :style="{ display: showDetail ? 'block' : 'none' }">
      <div class="px-5 d-flex flex-column">
        <p class="font-weight-bold mb-2" v-html="data?.no_subject"></p>
        <p class="mb-2" v-html="data?.no_content"></p>
        <p v-html="data?.no_content_txt"></p>
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
    default: () => {},
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
}

.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}

.content {
  padding: 1rem;
  background: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

.index,
.day {
  color: #a1a1aa;
  text-align: center;
}

.title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 375px) {
  .day,
  .title {
    font-size: 12px;
  }
}
</style>
