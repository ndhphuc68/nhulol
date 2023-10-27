<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

const props = defineProps({
  notice: Object,
  index: Number,
});
const store = useStore();

const isViewMore = ref(false);
const handleSeeMore = (e) => {
  e.stopPropagation();
  store.commit("handleToggle", "noticeEventFAQ");
  store.commit("handleActiveTab", 1);
  store.commit("handleActiveContent", props.index);
};
const formatNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};
</script>

<template>
  <div class="wrapper row mt-2" @click="isViewMore = !isViewMore">
    <div class="d-flex align-center">
      <span class="number-order">{{ formatNumber(index + 1) }}</span>
      <p class="title col-12 text-start">{{ notice?.no_subject }}</p>
      <i
        v-if="isViewMore"
        class="pi pi-angle-up"
        style="font-size: 1.2rem; color: #bdbdbd; margin-right: 2px"
      ></i>
      <i
        v-else
        class="pi pi-angle-down"
        style="font-size: 1.2rem; margin-right: 2px"
      ></i>
    </div>
    <p v-if="isViewMore" class="content" @click="handleSeeMore">
      {{ notice?.no_content_txt }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  padding: 0.875rem 0;
  margin: 1rem 0;
  border-radius: 8px;
  background: #fafafa;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

  .number-order {
    border-radius: 50%;
    background: #0189ff;
    width: 28px;
    height: 28px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-right: 10px;
    @media (max-width: 375px) {
      width: 20px;
      height: 20px;
    }
  }

  .date {
    font-size: 14px;
    color: var(--text-secondSCCasino);
  }

  .title {
    flex: 1;
    color: #424242;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-style: normal;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0;
    @media (max-width: 375px) {
      font-size: 14px;
    }
  }

  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: var(--text-secondSCCasino);
    text-align: left;
    -webkit-line-clamp: 3;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 1rem;
  }

  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    transition: all linear 0.2s;
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

@media (max-width: 768px) {
  svg {
    width: 12px;
  }
}

@media (max-width: 575px) {
  button {
    display: flex;
    align-items: start;
  }
}
</style>
