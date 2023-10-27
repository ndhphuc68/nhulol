<script setup>
import EventItem from "@/views/Bolton/home/modals/Event/components/EventItem.vue";
import {Images} from "@/const/Image";
import {Icons} from "@/const/Icons";
import {handleCloseModal} from "@/utils";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();
const listEvent = computed(() => store.getters.getEvent);
const currentPage = ref(1);
const itemsPerPage = 3;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listEvent?.value?.slice(startIndex, endIndex);
});
</script>

<template>
  <div class="event-main row h-100">
    <div class="event-header row position-relative">
      <img class="banner-event" :src="Images.bannerEvent" alt="banner"/>
      <div class="w-100 close-event d-flex justify-content-end">
        <img
            @click="handleCloseModal('event')"
            :src="Icons.closeWhite"
            alt="close"
        />
      </div>
      <div
          class="w-100 d-none d-lg-flex align-items-center justify-content-between flex-row event-nav"
      >
        <div class="d-flex flex-row align-items-center">
          <img class="icon" :src="Icons.iconEvent" alt=""/>
          <span class="ms-2">{{ $t("event") }}</span>
        </div>
      </div>
    </div>
    <div class="row d-lg-none mt-3">
      <div class="d-flex ms- flex-row align-items-center">
        <img class="icon" :src="Icons.iconEvent" alt=""/>
        <span class="title-mobile ms-2">{{ $t("event") }}</span>
      </div>
    </div>
    <div class="mt-3 px-3 position-relative">
      <div class="event-body">
        <EventItem
            :key="index"
            :item="item"
            v-for="(item, index) in displayData"
        />
      </div>
      <div class="pagination-event d-flex justify-content-center">
        <v-pagination
            v-model="currentPage"
            :length="Math.ceil(listEvent?.length / itemsPerPage)"
            rounded="0"
            v-if="Math.ceil(listEvent?.length / itemsPerPage) > 1"
        ></v-pagination>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.event-main {
  .icon {
    width: 40px;
    height: 40px;
  }

  .event-header {
    height: 40%;
    width: 100vw;

    .close-event {
      position: absolute;
      top: 20px;
      right: 20px;
      @media(max-width: 375px) {
        top: 10px;
        right: 0;
      }

      img {
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
    }

    .banner-event {
      padding: 0;
      object-fit: cover;

      @media (max-width: 991.98px) {
        height: 300px;
      }
      @media (max-width: 767.98px) {
        height: 150px;
      }
    }

    .event-nav {
      padding: 0 70px;
      position: absolute;
      bottom: 35px;
      left: 0;
      right: 0;

      span {
        color: #fafafa;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .input-search {
        img {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        input {
          padding-left: 35px;
          border-radius: 20px;
          background: #f2f2f2;
        }
      }
    }
  }

  .title-mobile {
    font-size: 20px;
    font-weight: 600;
  }

  .event-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.pagination-event {
  width: 100%;

}
</style>
