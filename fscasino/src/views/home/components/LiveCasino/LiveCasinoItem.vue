<template>
  <article class="pb-3">
    <div>
      <img :src="liveItem.urlImage" alt="live-casino" width="190" />
    </div>
    <h5>{{ props.liveItem.name }}</h5>
    <div class="btn">
      <button class="default-button">Join</button>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  liveItem: Object,
});
</script>

<style scoped lang="scss">
article {
  border-radius: 8px;
  border: 1px solid var(--black-100, #fafafa);
  background: linear-gradient(
    219deg,
    rgba(221, 221, 221, 0.5) 0%,
    rgba(252, 250, 250, 0.5) 100%
  );
  padding: 1.5rem;
  margin: auto;
  @media (max-width: 768px) {
    min-width: 19rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.2);
    scale: 1.03;
    transition: all 0.2s ease;
    .default-button {
      background: #de6777;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
      color: var(--white);
    }
  }
}
h5 {
  text-align: center;
  font-size: 20px;
  font-family: "Poppins-Bold";
  margin: 1.5rem 0;
  color: #d23449;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
