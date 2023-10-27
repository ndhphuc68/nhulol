<template>
  <h2 class="text-center mb-3">{{ $t("event") }}</h2>
  <div class="event" v-if="listEvent">
    <div class="table-notice">
      <div class="title">
        <div>#</div>
        <div>{{ $t("title") }}</div>
        <div>{{ $t("date") }}</div>
      </div>
      <div class="content-table">
        <div v-for="(item, idx) in displayData" :key="idx">
          <ContentItem :data="item" :index="idx" />
        </div>
      </div>
    </div>
    <div>
      <!--      <paginate-->
      <!--        v-model:currentPage="currentPage"-->
      <!--        :page-count="Math.ceil(listEvent?.length / itemsPerPage)"-->
      <!--        :page-range="3"-->
      <!--        :margin-pages="2"-->
      <!--        :click-handler="clickCallback"-->
      <!--        :prev-text="`< ${t('previous')}`"-->
      <!--        :next-text="`${t('next')} >`"-->
      <!--        :container-class="'pagination'"-->
      <!--        :page-class="'page-item'"-->
      <!--      >-->
      <!--      </paginate>-->
      <v-pagination
        v-model="currentPage"
        @click="clickCallback"
        :length="Math.ceil(listEvent?.length / itemsPerPage)"
        rounded="0"
      ></v-pagination>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref } from "vue";
import ContentItem from "./ContentItem";
import Loading from "@/components/EDGames/Loading";
import { useStore } from "vuex";

const store = useStore();
const listEvent = computed(() => store.getters.getEvent);
const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listEvent?.value.slice(startIndex, endIndex);
});

const clickCallback = (pageNum) => {
  currentPage.value = pageNum;
};

onUnmounted(() => store.commit("handleActiveContent", null));
</script>
<style scoped lang="scss">
h2 {
  text-transform: uppercase;
}

.event {
  width: 100%;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    font-size: 14px;
  }
}

.event .pagination {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 20px;
  left: 25%;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }
}

.event ul li .page-item {
  margin: 5px !important;
  color: red;
}

.content-table {
  min-height: 470px;
  overflow: auto;
}

.title,
.data-notice {
  display: grid;
  grid-template-columns: 10% 55% 35%;
  justify-items: center;
  align-items: center;
  padding: 15px 0;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
}

.title {
  background: #e592ed;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
}

.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}

@media (max-width: 1024px) {
  .button-next {
    width: 20px;
    margin: 0 2px;
    border-radius: 40% !important;
  }
  .number-group {
    display: flex;
  }
  .button-next p {
    display: none;
  }
  .number-page {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
  .number-page.active {
    padding: 2px;
  }
}

@media (max-width: 375px) {
  .title {
    font-size: 12px;
  }
}
</style>
