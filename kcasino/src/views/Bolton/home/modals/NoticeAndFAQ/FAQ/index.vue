<template>
  <!--  <h2 class="text-center mb-3">FAQ</h2>-->
  <div class="deposit-history d-flex flex-column" v-if="listFAQ">
    <div class="table-notice">
      <div class="title">
        <div>#</div>
        <div>{{ $t("title") }}</div>
        <div>{{ $t("date") }}</div>
      </div>
      <div class="list-content">
        <div
          class="d-none d-lg-block"
          v-for="(item, idx) in displayData"
          :key="idx"
        >
          <ContentItem :data="item" :index="idx" />
        </div>
        <div
          class="d-block d-lg-none"
          v-for="(item, idx) in displayData"
          :key="idx"
        >
          <ContentItemMobile :data="item" :index="idx" />
        </div>
      </div>
    </div>
    <div class="pagination-container">
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(listFAQ?.length / itemsPerPage)"
        rounded="0"
        v-if="Math.ceil(listFAQ?.length / itemsPerPage) > 1"
      ></v-pagination>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref } from "vue";
import ContentItem from "../ContentItem";
import ContentItemMobile from "../ContentItemMobile.vue";
import Loading from "@/components/EDGames/Loading";
import { useStore } from "vuex";

const store = useStore();
const listFAQ = computed(() => store.getters.getFAQ);
const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listFAQ?.value.slice(startIndex, endIndex);
});

onUnmounted(() => {
  store.commit("handleActiveContent", null);
  store.commit("handleActiveTab", 0);
});
</script>
<style scoped lang="scss">
.deposit-history {
  width: 100%;

  .list-content {
    max-height: 450px;
    overflow-y: auto;
  }
}

.pagination-container {
  //position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
}

.title {
  display: grid;
  grid-template-columns: 10% 55% 35%;
  justify-items: center;
  align-items: center;
  background: #de6777;
  color: #fff;
  padding: 15px 0;
  border-radius: 6px;
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 22px;
}

@media (max-width: 991.98px) {
  .title {
    display: none;
  }
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
</style>
