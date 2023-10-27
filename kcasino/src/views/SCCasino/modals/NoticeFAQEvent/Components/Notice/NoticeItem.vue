<script setup>
import { ref, defineProps, computed } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  data: {
    type: Object,
    default: null,
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

<template>
  <div class="wrapper">
    <div class="data-notice" @click="handleShowDetail()">
      <div class="index">{{ index + 1 }}</div>
      <div class="day">{{ converTime(data?.no_created) }}</div>
      <div class="title">{{ data?.no_subject }}</div>
      <button class="icon-show">
        <i
          v-if="showDetail"
          class="pi pi-angle-up"
          style="font-size: 1rem; color: #bdbdbd; margin-right: 2px"
        ></i>
        <i
          v-else
          class="pi pi-angle-down"
          style="font-size: 1rem; margin-right: 2px"
        ></i>
      </button>
    </div>
    <div :style="{ 'border-top': '1px solid var(--neutral-200, #E4E4E7)' }">
      <div class="content" :style="{ display: showDetail ? 'block' : 'none' }">
        <div class="px-1 d-flex flex-column">
          <p class="font-weight-bold mb-2" v-html="data?.no_subject"></p>
          <p class="mb-2" v-html="data?.no_content"></p>
          <p v-html="data?.no_content_txt"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0rem;
  cursor: pointer;

  .index,
  .title,
  .day {
    width: 33.3333%;
    text-align: center;
  }

  .title {
    order: 2;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .day {
    order: 3;
  }

  .icon-show {
    order: 4;
  }
}

.content {
  background: var(--100, #f5f5f5);
  padding: 10px 46px;

  div {
    @media (max-width: 375px) {
      padding: 5px !important;
    }
  }

  @media (max-width: 375px) {
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .wrapper {
    margin: 2rem 0;
    border: 1px solid rgba(99, 99, 99, 0.2);
    border-radius: 5px;
  }
  .data-notice {
    padding: 1rem;
    flex-wrap: wrap;

    .index {
      text-align: left;
      color: var(--text-secondSCCasino);
    }

    .title {
      order: 3;
      width: 90%;
      text-align: left;
      padding: 0.5rem 0 0;
    }

    .icon-show {
      padding: 0.5rem 0 0;
    }

    .day {
      order: 2;
      width: 65%;
      text-align: right;
      color: var(--text-secondSCCasino);
    }
  }
}
</style>
