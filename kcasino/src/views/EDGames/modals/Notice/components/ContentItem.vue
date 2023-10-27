<template>
  <div class="wrapper">
    <div
      class="data-notice"
      @click="handleShowDetail()"
      :style="showDetail ? 'background : #FAFAFA' : ''"
    >
      <div class="index">{{ index + 1 }}</div>
      <div
        class="title w-100 d-flex justify-center"
        :style="showDetail && 'color : #2F9015'"
      >
        <span class="text-center">{{ data?.no_subject }}</span>
      </div>
      <div class="day w-100">
        <span class="w-75">{{ converTime(data?.no_created) }}</span>
      </div>
    </div>
    <div class="content" :style="{ display: showDetail ? 'block' : 'none' }">
      <p class="font-weight-bold mb-2" v-html="data?.no_subject"></p>
      <p class="mb-2" v-html="data?.no_content"></p>
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
  font-size: 14px;
  line-height: 22px;
  border-bottom: 1px solid #e4e4e7;
}

.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}

.content {
  padding: 35px 25px;
  background: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

.index,
.day {
  color: #a1a1aa;
  text-align: center;
}

.title span {
  display: block;
  width: 80%;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 414px) {
  .day {
    width: 100px;
  }
}

@media (max-width: 375px) {
  span,
  .title {
    font-size: 12px;
  }

  .day span {
    font-size: 12px;
  }
}
</style>
