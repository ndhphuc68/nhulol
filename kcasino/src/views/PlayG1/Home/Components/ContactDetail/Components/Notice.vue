<template>
  <div class="wrapper">
    <button
      v-for="(item, index) in data?.slice(0, 4)"
      :key="index"
      class="d-flex justify-content-between blog-item w-100"
      @click="handleToggleViewDetail(index)"
    >
      <span class="w-80 content text-start">
        {{ item.no_subject }}
      </span>
      <span class="w-20">
        {{ formatDate(item.no_created) }}
      </span>
    </button>
  </div>
</template>

<script setup>
//import Blog from "@/views/PlayG1/modals/Blog/index.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { formatDate } from "@/utils";

const store = useStore();

const handleToggleViewDetail = (idx) => {
  store.commit("handleToggle", "notice");
  store.commit("handleActiveContent", idx);
};
const data = computed(() => store.getters.getNotice);
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  .blog-item {
    padding: 12px 0;
    cursor: pointer;
    border-bottom: 1px solid #e4e4e7;
    &:hover {
      color: var(--primaryPlayG1);
    }
  }

  .content {
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    width: 80%;
    font-weight: 400;
    text-align: left;
  }
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0;
  }
  .content {
    max-width: 70%;
  }
}
</style>
