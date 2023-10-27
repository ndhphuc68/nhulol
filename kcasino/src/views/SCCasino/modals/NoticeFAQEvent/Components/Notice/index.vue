<script setup>
import { computed, onUnmounted, ref } from "vue";
// import { getNotifyMessageRequest } from '@/api/notifyMessage/request'
import ContentItem from "./NoticeItem";
import Loading from "@/components/SCCasino/Loading";
import { useStore } from "vuex";

const store = useStore();
const listNotice = computed(() => store.getters.getNotice);
const currentPage = ref(1);
const itemsPerPage = 5;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listNotice?.value.slice(startIndex, endIndex);
});

onUnmounted(() => {
  store.commit("handleActiveContent", null);
  store.commit("handleActiveTab", 0);
});
</script>
<template>
  <div class="deposit-history" v-if="listNotice">
    <div class="table-notice">
      <div class="title">
        <div>#</div>
        <div>{{ $t("title") }}</div>
        <div>{{ $t("date") }}</div>
      </div>
      <div class="list-item">
        <div v-for="(item, idx) in displayData" :key="idx">
          <ContentItem :data="item" :index="idx" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
  <div class="pagination-wrapper" v-if="listNotice">
    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(listNotice?.length / itemsPerPage)"
      rounded="0"
      v-if="Math.ceil(listNotice?.length / itemsPerPage) >1"
    ></v-pagination>
  </div>
</template>
<style scoped lang="scss">
.deposit-history {
  width: 100%;
  padding: 1rem 0rem;
}
.title-head {
  font-weight: 600;
}
.list-item {
  height: 50%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
/* @media (max-width: 576px) {
  .list-item {
    height: 70vh;
    overflow: auto;
  }
} */

.title,
.data-notice {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;

  div {
    text-align: center;
    width: 33.33333%;
  }
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
//.pagination-wrapper {
//  background: red;
//  position: absolute;
//  width: 100%;
//  bottom: 1rem;
//  left:0;
//}

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

@media (max-width: 768px) {
  .title {
    display: none;
  }
}
</style>
