<template>
  <article class="col-12 mt-3 col-md-6 col-xl-4">
    <img :src="slotItem.urlImage" alt="slot" />
    <div class="bottom px-3 px-md-0">
      <span class="name">{{ slotItem.name }}</span>
      <button></button>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  slotItem: Object,
});
</script>

<style scoped lang="scss">
article {
  position: relative;
  background: transparent;
  transition: all 0.3s ease;
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 1.5rem;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .name {
    font-family: "Poppins-Bold";
    font-size: 24px;
    color: #545454;
  }
  button {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: url("@/assets/slots/button-play.png") no-repeat;
    background-size: 130% 130%;
    background-position: center;
  }
  &:hover {
    cursor: pointer;
    scale: 1.04;
    img {
      box-shadow: 0px 4px 30px 8px rgba(0, 0, 0, 0.2);
    }
    button {
      background: url("@/assets/slots/button-play-hover.png") no-repeat;
      background-size: 130% 130%;
      background-position: center;
    }
  }
}
</style>
