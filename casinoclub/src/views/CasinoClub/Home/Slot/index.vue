<template>
  <section id="slot-home">
    <div class="container p-0">
      <div class="title-home mb-2">{{ $t("slot") }} <ArrowRight /></div>
      <div class="list-casino">
        <div class="item" v-for="(item, index) in data" :key="index">
          <SlotItem :slotItem="item" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import ArrowRight from "@/assets/CasinoClub/icon/svg/ArrowRight.vue";
import SlotItem from "./SlotItem.vue";

const data = [
  {
    key: "evolution",
    img: "slot1",
  },
  {
    key: "wmcasino",
    img: "slot2",
  },
  {
    key: "cq9",
    img: "slot3",
  },
  {
    key: "bg",
    img: "slot4",
  },
  {
    key: "ag",
    img: "slot5",
  },
  {
    key: "pragmatic",
    img: "slot6",
  },
];
</script>
<style scoped lang="scss">
#slot-home {
  margin: 20px auto 50px;
}
.list-casino {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
}

@media (max-width: 992px) {
  .list-casino {
    grid-gap: 20px;
  }
}

@media (max-width: 768px) {
  #slot-home {
    padding: 0 12px;
  }
  .list-casino {
    grid-gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 320px) {
  .list-casino {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 12px;
  }
}
</style>
