<script setup>
import { defineProps } from "vue";
import { Icons } from "@/const/Icons";
import {Images} from "@/const/Image";
import {converTime} from "@/utils";
// <img :src="Icons.date" alt="date" />

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="item-event-main">
<!--    <img class="item-image" :src="Images.itemEvent" alt="banner" />-->
    <div class="subject text-center">{{item.no_subject}}</div>
    <div v-html="`${item.no_content}\n${item.no_content_txt}`" class="content mt-3"></div>
    <div class="date text-end">
      <img :src="Icons.date" alt="date" width="14"/>
      {{converTime(item.no_created)}}
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-event-main {
  border: 1px solid #545454;
  border-radius: 10px;
  padding: 1rem;
  .subject {
    font-weight: 600;
    text-transform: uppercase;
    color: #de6777;
  }
  .content {
    font-size: 14px;
    color:  #545454;
    height: 10rem;
    overflow-y: auto;
    @media(max-width: 375px) {
      font-size: 12px;
    }
  }
  .date {
    padding: 0.5rem 0;
    border-top: 1px solid  #E3E3E3;
    font-size: 14px;
  }
}
</style>
