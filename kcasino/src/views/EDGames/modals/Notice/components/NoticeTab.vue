<template>
  <div class="deposit-history" v-if="listNotice">
    <div class="table-notice">
      <div class="title">
        <div>#</div>
        <div>{{ $t("title") }}</div>
        <div>{{ $t("date") }}</div>
      </div>
      <div>
        <div v-for="(item, idx) in displayData" :key="idx">
          <ContentItem :data="item" :index="idx" />
        </div>
      </div>
    </div>
    <div>
      <!--      <paginate-->
      <!--          v-model:currentPage="currentPage"-->
      <!--          :page-count="Math.ceil(listNotice?.length/itemsPerPage)"-->
      <!--          :page-range="3"-->
      <!--          :margin-pages="2"-->
      <!--          :click-handler="clickCallback"-->
      <!--          :prev-text="`< ${$t('previous')}`"-->
      <!--          :next-text="`${$t('next')} >`"-->
      <!--          :container-class="'pagination'"-->
      <!--          :page-class="'page-item'"-->
      <!--      >-->
      <!--      </paginate>-->
      <v-pagination
        class="pagination"
        v-model="currentPage"
        :length="Math.ceil(listNotice?.length / itemsPerPage)"
        rounded="0"
        v-if="Math.ceil(listNotice?.length / itemsPerPage) > 1"
      ></v-pagination>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref } from "vue";
// import { getNotifyMessageRequest } from '@/api/notifyMessage/request'
import ContentItem from "./ContentItem";
import Loading from "@/components/EDGames/Loading";
import { useStore } from "vuex";

const store = useStore();
const listNotice = computed(() => store.getters.getNotice);
const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listNotice?.value.slice(startIndex, endIndex);
});

const clickCallback = (pageNum) => {
  currentPage.value = pageNum;
};

onUnmounted(() => store.commit("handleActiveContent", null));
</script>
<style scoped>
.deposit-history {
  width: 100%;
}

.deposit-history ul li .page-item {
  margin: 5px !important;
  color: red;
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
  background: #f7f7f9;
  color: #71717a;
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
@media (max-width: 280px) {
  .title {
    font-size: 12px;
  }
}
</style>
