<script setup>
import { ref } from "vue";
import QueryCreation from "./QueryCreation.vue";
import QueryList from "./QueryList.vue";
import svgIcon from "@/assets/SCCasino/icon/commons";

const currentTabIdx = ref(0);

const tabs = [QueryList, QueryCreation];
const titles = ["queryList", "queryDetails"];

const handleChangeTag = (tag) => {
  currentTabIdx.value = tag;
};
</script>

<template>
  <section id="service-center">
    <!-- <div
          class="btn-group-back"
          @click="currentTabIdx = 0"
          v-if="currentTabIdx === 1"
        >
          <div class="icon">
            <component :is="svgIcon?.ArrowLeftIcon" />
          </div>
          <button class="btn-back btn-change-tab" @click="currentTabIdx = 0">
            {{ $t("back") }}
          </button>
        </div> -->

    <div :class="`head-tab ${currentTabIdx === 1 ? 'query-detail' : ''}`">
      <h4 class="title" @click="currentTabIdx = 0">
        <i v-if="currentTabIdx === 1" class="icon-back-mobile">
          <component class="icon-svg" :is="svgIcon?.ArrowLeftIcon" />
        </i>

        {{ $t(titles[currentTabIdx]) }}
      </h4>
      <button
        v-if="currentTabIdx === 0"
        class="btn-query btn-change-tab"
        @click="currentTabIdx = 1"
      >
        <component class="icon" :is="svgIcon?.QueryCreateIcon" />
        {{ $t("queryCreation") }}
      </button>
    </div>
    <component
      @handleChangeTag="handleChangeTag"
      :is="tabs[currentTabIdx]"
      :class="`${currentTabIdx === 1 ? 'query-detail' : ''}`"
    />
  </section>
</template>

<style lang="scss" scoped>
#service-center {
  margin: 2rem 0 5%;
  /* padding: 0; */
}

.icon-back-mobile {
  background: #bbdefb;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 50%;
  .icon-svg {
    margin-right: 0;
  }
}

.btn-group-back {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;

  .btn-change-tab {
    color: var(--primarySCCasino);
    font-size: 20px;
    font-weight: 500;
  }

  .icon {
    margin-right: 0.4rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #bbdefb;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.head-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 1.375rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media (max-width: 375px) {
      font-size: 15px;
      margin: 0;
    }
  }

  .btn-query {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    border: 1px solid #90caf9;
    color: var(--primarySCCasino);
    background: #e3f2fd;

    @media (max-width: 375px) {
      font-size: 12px;
      padding: 10px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 5px;
      }
    }
  }
}

.query-detail {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

form.query-detail {
  margin: 20px auto;
}

@media (max-width: 768px) {
  #service-center {
    margin: 4rem 0;
    padding: 0 15px;
  }

  .query-detail {
    width: 100%;
  }

  .btn-group-back {
    display: none;
  }
}
</style>
