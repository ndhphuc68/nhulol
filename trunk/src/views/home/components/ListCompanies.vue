<template>
  <div class="container">
    <div class="company-item" v-for="company in companies" :key="company.id">
      <button>
        <img :src = "require(`@/assets/icon/home/${company.image}`)" />
      </button>
    </div>
  </div>
</template>
<script setup>
import {companies} from '@/utils/datas'
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin: 48px -10px 0;
}
.company-item {
  flex-grow: 1;
  margin:  5px;
  width: calc(100% * (1/6) - 10px);
}
</style>