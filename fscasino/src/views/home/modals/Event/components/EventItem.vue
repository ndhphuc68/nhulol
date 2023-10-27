<script setup>
import { defineProps } from "vue";
import { Icons } from "@/const/Icons";

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="item-event-main">
    <img class="item-image" :src="item.img" alt="banner" />
    <div class="d-flex flex-column px-3 pt-3 item-content">
      <span class="text-start">{{ item.title }}</span>
      <p class="text-start">{{ item.content }}</p>
      <hr />
    </div>
    <div
      class="d-flex flex-row justify-content-end align-items-center date-item pb-3 pe-3"
    >
      <img :src="Icons.date" alt="date" />
      <span>{{ item.date }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-event-main {
  .item-image {
    width: 100%;
  }
  .item-content {
    span {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    p {
      overflow: hidden;
      color: #545454;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .date-item {
    img {
      width: 14px;
      height: 14px;
    }

    span {
      color: #545454;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
  }
}
</style>
