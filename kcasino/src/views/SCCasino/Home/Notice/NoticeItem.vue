<script setup>
import { defineProps } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const props = defineProps({
  notice: Object,
  index: Number,
});
const store = useStore();

const handleSeeMore = () => {
  store.commit("handleToggle", "noticeEventFAQ");
  store.commit("handleActiveTab", 0);
  store.commit("handleActiveContent", props.index);
};

</script>

<template>
  <div class="wrapper row mt-2 btn-hover" @click="handleSeeMore">
    <div
      class="date col-12 col-sm-5 col-md-3 text-start d-flex align-items-center"
    >
      {{ converTime(notice?.no_created, true) }}
    </div>
    <div class="title col-10 col-sm-6 col-md-8 text-start text-md-center">
      {{ notice?.no_subject }}
    </div>
    <button class="col-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
      >
        <path
          d="M0.999999 13L7 7L1 1"
          stroke="#42A5F5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  border-top: 1px solid #d4d4d8;
  padding: 1rem 0;

  .date {
    font-size: 1rem;
    color: var(--text-secondSCCasino);
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }

  .title {
    overflow: hidden;
    color: #424242;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    @media (max-width: 375px) {
      font-size: 14px;
    }
  }

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
