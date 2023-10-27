<template>
  <div class="slot-carousel-container">
    <div class="wrapper-title">
      <div class="d-flex flex-wrap flex-column flex-sm-row">
        <span class="title me-4">{{ $t("slot") }}</span>
        <!--        <Button class="btn-change-ui mt-sm-0 mt-3">Slot Diamond</Button>-->
      </div>
      <div class="btn-casino">
        <Button @click="router.push('slot')">{{ $t("viewall") }}</Button>
      </div>
    </div>
    <v-sheet class="mx-auto in-desktop" max-width="100%">
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item
          v-for="(slot, index) in listCompanySlot.slice(0, 6)"
          :key="index"
        >
          <SlotItem
            :check="handleCheckCompany(slot)"
            :class="handleCheckCompany(slot) ? '' : 'disable-item'"
            :slotItem="slot"
            :image="listSlot[index].urlImage"
            class="live-carousel-item"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <div class="row in-mobile flex-wrap">
      <div
        v-for="(slot, index) in listCompanySlot.slice(0, 4)"
        :key="index"
        class="col-6 mb-3 d-flex justify-center"
      >
        <SlotItem
          :check="handleCheckCompany(slot)"
          :class="handleCheckCompany(slot) ? '' : 'disable-item'"
          :slotItem="slot"
          :image="listSlot[index].urlImage"
          class="live-carousel-item"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import Loading from "@/components/EDGames/Loading/index.vue";

const model = null;
import Button from "@/components/Duri/customs/Button/index.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SlotItem from "@/views/Duri/Home/Components/SlotCarousel/SlotItem.vue";
import { listSlot } from "@/views/FSCasino/home/components/Slots/data";
import { gameTypeModule17 as gameTypeMudule117 } from "@/utils/game/dataGameModule1vs7";

const router = useRouter();
const store = useStore();

// const listCompanySlot = computed(() => store.getters.getListGameSlotV2);

const listCompanySlot = ref(gameTypeMudule117.slot);

const loadingCheck = computed(() => store.state.games2.loadingCheck);

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
    e.key.toString().toLowerCase().includes(item?.name.toString().toLowerCase())
  );
  return !!(check && check.onoff === 1);
};
</script>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
.btn-change-ui {
  padding: 12px;
  color: white;
  width: 150px;
  border-radius: 6px;
  background-color: blue;
}

.slot-carousel-container {
  margin: 40px 0;
  position: relative;
  max-width: 100%;

  .wrapper-title {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin: 10px;
    // @media(max-width: 375px) {
    //   flex-direction: column;
    // }

    .title {
      font-size: 32px;
      font-weight: 600;
      line-height: 39px;
      letter-spacing: 0;
      text-align: left;
    }
  }
}

.live-carousel-item {
  max-width: 250px;
  width: 100%;
  //margin: 0 12px;
}

.lives-item {
  margin: 20px 0;
}

.in-mobile {
  display: none;
}

.btn-casino {
  .btn {
    background: var(--primaryPlayG1);
    color: #fff;
    @media (max-width: 375px) {
      width: 100px;
    }
  }
}

@media (max-width: 767.98px) {
  .in-mobile {
    display: flex;
  }

  .in-desktop {
    display: none;
  }
}

//@media (max-width: 576px) and (min-width: 451px) {
//  .btn-casino {
//    margin-top: 1rem;
//  }
//}
</style>
<style>
.live-carousel-item .live-img {
  max-width: 90%;
}

.slot-carousel-container {
  .v-slide-group__next,
  .v-slide-group__prev {
    position: absolute;
    top: 14px;

    .mdi:before {
      background: var(--primaryPlayG1);
      color: #fff;
      border-radius: 4px;
    }
  }

  .v-slide-group__next {
    right: 158px;
  }

  .v-slide-group__prev {
    right: 193px;
  }

  .v-slide-group__content {
    padding-bottom: 15px;
  }
}
</style>
