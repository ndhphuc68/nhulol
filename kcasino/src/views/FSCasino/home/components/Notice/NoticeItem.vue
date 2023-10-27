<template>
  <div class="wrapper row mt-2" @click="handleSeeMore">
    <div class="col-lg-4 col-6 text-start d-flex align-items-center">{{ formatDate(notice?.no_created) }}</div>
    <div class="title col text-start">{{ notice?.no_subject }}</div>
    <button class="col-2 d-none d-lg-block">{{ $t('seeMore') }}</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import {formatDate} from "@/utils";
import {useStore} from "vuex"

const props = defineProps({
  notice: Object,
  idx:Number
});
const store = useStore()

const handleSeeMore = () => {
  store.commit('handleToggle', 'notice')
  store.commit('handleActiveContent', props.idx)
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 992px) {
    font-size: 12px;
  }
  button {
    color: var(--pink);
  }
}
.col-6,
.col-3 {
  text-align: left;
}
.col-2 {
  text-align: right;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
