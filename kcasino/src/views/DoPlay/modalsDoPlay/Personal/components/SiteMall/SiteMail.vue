<template>
  <section id="mail-wrapper" class="wrapper">
    <div class="top">
      <div>{{ $t("status") }}</div>
      <div>{{ $t("writer") }}</div>
      <div>{{ $t("subject") }}</div>
      <div>{{ $t("written time") }}</div>
    </div>
    <div class="content">
      <SiteMailItem
        v-for="(message, idx) in displayData"
        :key="idx"
        :message="message"
        :idx="idx"
      />
    </div>
    <v-pagination
      v-if="listMessage?.length > 0"
      v-model="currentPage"
      :length="Math.ceil(listMessage?.length / itemsPerPage)"
      rounded="0"
    ></v-pagination>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import SiteMailItem from "./SiteMailItem";
import { computed, ref, watch } from "vue";

const store = useStore();
const listMessage = computed(() => store.state.message.listMessage);
const currentPage = ref(1);
const itemsPerPage = 7;

watch(currentPage, () => {
  const element = document.getElementById("mail-wrapper");
  element.scrollIntoView({ behavior: "smooth" });
});

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listMessage?.value.slice(startIndex, endIndex);
});

// const clickCallback = () => {
//   displayData();
// };
</script>

<style scoped lang="scss">
.wrapper {
  padding: 1rem 2rem 3rem 2rem;
  @media (max-width: 768px) {
    padding: 1rem 1rem 3rem 1rem;
  }

  .top {
    display: grid;
    grid-template-columns: 15% 15% 40% 30%;
    padding: 1rem 5px;
    align-items: center;
    text-align: center;
    background: #e592ed;
    color: #fff;
    font-weight: 600;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .content {
    height: 530px;
    overflow: auto;
    @media (max-width: 768px) {
      height: 580px;
    }
  }

  .pagination {
    background: #fff;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0px;
    left: 25%;
    @media (max-width: 768px) {
      width: 90%;
      left: 5%;
    }
  }
}
</style>
