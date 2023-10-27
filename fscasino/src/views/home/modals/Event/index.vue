<script setup>
import EventItem from "@/views/home/modals/Event/components/EventItem.vue";
import {Images} from "@/const/Image";
import {Icons} from "@/const/Icons";
import {data} from "@/views/home/modals/Event/data";
import {handleCloseModal} from "@/utils";
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
          <span class="ms-2">Event</span>
        </div>
        <div
            class="d-flex flex-row position-relative align-items-center input-search"
        >
          <img :src="Icons.search" alt="search"/>
          <input
              type="text"
              class="form-control"
              placeholder="Searching for...."
          />
        </div>
      </div>
    </div>
    <div class="row d-lg-none mt-3">
      <div class="d-flex ps-5 ms-5 flex-row align-items-center">
        <img class="icon" :src="Icons.iconEvent" alt=""/>
        <span class="ms-2">Event</span>
      </div>
    </div>
    <div class="row mt-4 px-5">
      <div class="event-body row">
        <EventItem
            class="col-lg-4 col-12"
            :key="index"
            :item="item"
            v-for="(item, index) in data"
        />
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
      top: 40px;
      right: 20px;

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

  .event-body {
    @media (max-width: 991.98px) {
      overflow-y: scroll;
      width: 100vw;
      height: 410px;
    }
  }
}
</style>
