<template>
  <div class="wrapper">
    <div
      :class="`data ${showDetail ? 'show-detail' : ''}`"
      @click="handleShowDetail()"
    >
      <div class="index">{{ index + 1 }}</div>
      <div class="title" :style="showDetail && 'color : #2F9015'">
        {{ data?.title }}
      </div>
      <div class="day">{{ formatDate(data?.createdAt) }}</div>
    </div>
    <div
      class="content"
      :style="{ display: showDetail ? 'block' : 'none' }"
      v-html="`${data?.content} ${index + 1}`"
    ></div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { converTime, formatDate } from "@/utils/PlayG3";
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

<style scoped lang="scss">
.data {
  display: grid;
  grid-template-columns: 10% 70% 20%;
  justify-items: center;
  align-items: center;
  padding: 15px 0;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;

  .title {
    font-weight: 500;
  }
}

.show-detail {
  border-bottom: none !important;
}

@media (max-width: 768px) {
  .data,
  .content {
    font-size: 70%;
  }
}

.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}
.content {
  padding: 1rem;
  border-bottom: 1px solid #e4e4e7;
}

.index,
.day {
  color: #a1a1aa;
}
.title {
  font-weight: 600;
}
</style>
