<template>
  <div class="container">
    <div class="companies">
      <div class="company-item" v-for="company in companies" :key="company.id">
        <button>
          <img alt="" :src = "require(`@/assets/logo/companies/${company.image}`)" />
        </button>
      </div>
    </div>

  </div>
</template>
<script setup>
import {companies} from '@/utils/datas'
</script>
<style scoped>
.container {
  height: 40%;

}
.companies {
  display: flex;
  flex-wrap: wrap;
  margin: 48px -10px 0;
}

.company-item {
  flex-grow: 1;
  margin:  5px;
  padding: 5px 0;
  width: calc(100% * (1/6) - 10px);
  background-color: black;
 justify-content: center;
  display: flex;
  align-items: center;
  height: 70px;
}
.company-item:hover {
  transform: scale(1.03);
}
.company-item button {
  height: 100%;
}
@media (max-width: 1024px) {
  .company-item {
    flex-grow: 1;
    margin:  5px;
    width: calc(100% * (1/3) - 10px);
  }
}

@media (max-width: 541px) {
  .company-item{
    width: calc(100% * (1/2) - 10px);
  }
}
</style>