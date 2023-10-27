<template>
  <div class="wrap-profile">
    <h1>{{ $t("profile") }}</h1>
    <div class="content-profile">
      <MyInfo/>
      <BankInfo/>
    </div>
  </div>
  <div class="d-flex justify-center mt-4">
    <button class="btn-edit btn-hover" @click="()=>$emit('handleChangeTab',1)">
      {{ $t('edit') }}
    </button>
  </div>

</template>

<script setup>
import {defineEmits} from 'vue';
import MyInfo from "./MyInfo";
import BankInfo from "./BankInfo";

defineEmits(['handleChangeTab']);

</script>

<style lang="scss" scoped>
.wrap-profile {
  h1 {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
  }
  
  .content-profile {
    display: grid;
    grid-template-columns: calc(50% - 12px) calc(50% - 12px);
    grid-gap: 24px;
  }
  
  @media (max-width: 1140px) and (min-width: 1024px) {
    .content-profile {
      grid-template-columns: 100%;
      grid-gap: 12px;
    }
  }
  
  @media (max-width: 768px) {
    .content-profile {
      grid-template-columns: 100%;
    }
  }
  
}

.btn-edit {
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  background-color: var(--primaryPlayG1)
}
</style>
