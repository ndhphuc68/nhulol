<template>
  <section class="container">
    <div class="slots-title">
      <img src="@/assets/FSCasino/slots/logo-slots.png" alt="slots" />
      <span class="title-section text-start">{{ $t("slots") }}</span>
    </div>
    <!-- <div class="row"> -->
    <div class="list-item">
      <SlotItem
        :class="handleCheckCompany(item) ? '' : 'disable-item'"
        v-for="(item, index) in listCompanySlot.slice(0, width <= 992 ? 6 : 5)"
        :key="item.id"
        :slotItem="item"
        :image="listSlot[index].urlImage"
        :disable="handleCheckCompany(item)"
      />
      <div
        v-if="listCompanySlot.length < 6"
        style="min-height: 240px"
        class="col-12 mt-3 col-md-6 col-xl-4 d-flex justify-center"
      >
        <Loading />
      </div>
    </div>
    <div class="my-4 d-flex justify-center">
      <button @click="router.push('/slot')" class="primary-button">
        {{ $t("seeMore") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import SlotItem from "./SlotItem.vue";
import { listSlot } from "./data";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Loading from "@/components/EDGames/Loading/index.vue";
import { gameTypeModule6 } from "@/utils/game/dataGameList";

const router = useRouter();
const store = useStore();
const listCompanySlot = ref(gameTypeModule6.slot);
const width = window.innerWidth;

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));

watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
});

const handleCheckCompany = (item) => {
  if (item.key === 999999) {
    let checkEvo = listCompanyGame.value?.find(
      (e) => e.key.toString() === "Evolution"
    );
    return !!(checkEvo && checkEvo.onoff === 1);
  }
  const check = listCompanyGame.value?.find((e) =>
    e.key.toString().toLowerCase().includes(item?.key.toString().toLowerCase())
  );
  return !!(check && check.onoff === 1);
};
</script>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.slots-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.list-item {
  display: grid;
  grid-gap: 28px;
  grid-template-columns: repeat(5, calc(20% - 23px));
}

@media (max-width: 992px) {
  .list-item {
    grid-template-columns: repeat(3, calc(33% - 8.5px));
    grid-gap: 16px;
  }
}

@media (max-width: 768px) {
  .list-item {
    grid-template-columns: repeat(2, calc(50% - 5px));
    padding: 0 10px;
    grid-gap: 10px;
  }

  .slots-title {
    padding-left: 10px;
  }
}
</style>
