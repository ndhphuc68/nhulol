<template>
  <div class="list-content">
    <div class="title">
      <div>#</div>
      <div>{{ $t("title") }}</div>
      <div>{{ $t("date") }}</div>
    </div>
    <div class="list-item">
      <div  v-for="(item,idx) in displayData" :key="idx">
        <ContentItem :data="item" :index="idx"/>
      </div>
    </div>
  </div>
  <div class="pagination-wrapper" v-if="listNotice">
    <v-pagination
        v-model="currentPage"
        :length="Math.ceil(listNotice?.length/itemsPerPage)"
        rounded="0"
        v-if="Math.ceil(listNotice?.length/itemsPerPage)> 1"
    ></v-pagination>
  </div>
</template>

<script setup>
import ContentItem from "./ContentItem.vue";
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const listNotice = computed(()=> store.getters.getNotice)
const currentPage = ref(1);
const itemsPerPage = 7

const displayData = computed(() => {
  const startIndex = (currentPage.value -1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return listNotice?.value?.slice(startIndex,endIndex)
})

onUnmounted(() => store.commit('handleActiveContent',null))
</script>

<style lang="scss" scoped>
.list-content {
  background: transparent;
  .title {
    display: grid;
    grid-template-columns: 10% 70% 20%;
    font-weight: 500;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 90%;
    }
  }
}
</style>
