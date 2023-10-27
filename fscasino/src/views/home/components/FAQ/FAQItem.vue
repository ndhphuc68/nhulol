<template>
  <article class="item pt-3 pb-3 text-start">
    <div class="text">
      Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum Donot
      a Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum
      Donot a Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem
      Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot
      Lorem Ipsum Donot a
    </div>
    <div>
      <button>see more</button>
    </div>
  </article>
</template>

<script setup></script>

<style scoped lang="scss">
.item {
  border-top: 1px solid #7a7a7a;
  font-size: 14px;
}
.text {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
button {
  padding: 0.5rem 0 0 0;
  color: #dc2626;
  font-weight: 600;
}
</style>
