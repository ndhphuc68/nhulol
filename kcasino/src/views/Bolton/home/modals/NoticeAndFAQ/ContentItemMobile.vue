<template>
  <div @click="handleShowDetail" class="d-flex flex-column item-content mt-2">
    <span class="font-weight-bold">No: {{ index + 1 }}</span>
    <div class="d-flex align-items-center justify-space-between">
      <span class="font-weight-bold">{{ $t("content") }}</span>
      <span class="text-truncate content text-end title-subject">{{ data?.no_subject }}</span>
    </div>
    <div class="d-flex justify-space-between">
      <span class="font-weight-bold">{{ $t("date") }}</span>
      <span class="ms-2">{{ converTime(data?.no_created) }}</span>
    </div>
    <div v-if="showDetail" class="d-flex flex-column mt-1 show-detail">
      <hr />
      <p class="title">{{ data?.no_subject }}</p>
      <p v-html="data?.no_content"></p>
      <p v-html="data?.no_content_txt"></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";
const props = defineProps({
  data: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
  index: Number,
});

const store = useStore();

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

<style lang="scss" scoped>
.item-content {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 20px;
  @media(max-width: 375px){
    padding: 10px;
  }

  span {
    font-size: 14px;
    @media(max-width: 375px){
      font-size: 12px;
    }
  }
  .title-subject {
    max-width: 70%;
  }
  .content {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media(max-width: 375px){
      font-size: 12px;
    }
  }
  .show-detail {
    font-size: 14px;
    @media(max-width: 375px){
      font-size: 12px;
    }
    .title{
      font-weight: 600;
    }
  }
}
</style>
