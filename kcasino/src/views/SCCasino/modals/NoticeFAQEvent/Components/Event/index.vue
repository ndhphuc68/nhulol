<script setup>
import {computed, onUnmounted, ref} from "vue";
import ContentItem from "./EventItem.vue";
import Loading from "@/components/SCCasino/Loading";
import {useStore} from "vuex";

const store = useStore();
const listEvent = computed(() => store.getters.getEvent);
const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listEvent?.value.slice(startIndex, endIndex);
});

onUnmounted(() => {
  store.commit("handleActiveContent", null);
  store.commit("handleActiveTab", 0);
});
</script>

<template>
  <div class="deposit-history" v-if="listEvent">
    <div class="table-notice">
      <div class="list-item">
        <div v-for="(item, idx) in displayData" :key="idx">
          <ContentItem :data="item" :index="idx"/>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'"/>
  </div>
  <div class="pagination-wrapper" v-if="listEvent">
    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(listEvent?.length / itemsPerPage)"
      rounded="0"
      v-if="Math.ceil(listEvent?.length / itemsPerPage)>1"
    ></v-pagination>
  </div>
</template>

<style scoped lang="scss">
.deposit-history {
  width: 100%;
  padding: 1rem 0rem;
}

.list-item {
  /* height: 56vh;
    overflow:auto; */

  &::-webkit-scrollbar {
    display: none;
  }
}

/* @media(max-width: 576px) {
    .list-item {
        height: 70vh;
        overflow:auto;
    }
}
.pagination-wrapper {
} */

@media (max-width: 1024px) {
  .button-next p {
    display: none;
  }
}
</style>
