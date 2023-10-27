<script setup>
import {defineProps, ref} from 'vue'


const description = ref('');
const userInfo = {
  me_nickname: 'thien',
  me_phone: '0394921219'
}
defineProps({
  changeTab: Function
})


</script>

<template>
  <div class="query">
    <div class="warning-box">
      <h4 class="warning-title">{{ $t("helpCenter") }}</h4>
      <p class="warning-content">
        {{ $t("helpCenterContent") }}
      </p>
    </div>
    <div class="query-details">
      <div class="query-item v-row">
        <p class="name v-col-4">{{ $t("name") }}</p>
        <input :value="userInfo?.me_nickname" class="v-col-8" disabled/>
      </div>
      <div class="query-item  v-row">
        <p class="name v-col-4">{{ $t("cellPhone") }}</p>
        <input :value="userInfo?.me_phone" class="v-col-8" disabled/>
      </div>
      <div class="query-item  v-row">
        <p class="name v-col-4">{{ $t("description") }}</p>
        <textarea v-model="description" class="v-col-8"></textarea>
        <!--        <input height="100px" minlength="4"   disabled />-->
      </div>
      <button class="btn-query" @click="handleSubmit">
        {{ $t("btnSend") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.query {
  max-width: 680px;
  width: 100%;
  margin: 10px auto 0;
}

.warning-box {
  text-align: center;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 24px;
}

.warning-content {
  font-style: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: var(--text-second);
  margin-top: 16px;
}

.warning-title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 16px;
  color: var(--text);
}

.query-item {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  width: 100%;
  margin: 32px 0;
}

.query-item .name {
  color: var(--text);
}

.query-item input, textarea {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 10px 14px;
  width: 50%;
}

.query-item textarea {
  max-height: 100px;
  height: 100px;
  min-height: 100px;
}

.btn-query {
  display: flex;
  background-color: var(--primary);
  color: var(--bg);
  align-items: center;
  padding: 12px 40px;
  border-radius: 4px;
  margin-left: auto;
}

@media (max-width: 1024px) {
  .query-item input {
    /*max-width: 159px;*/
  }
}

@media (max-width: 425px) {
  .query-item {
    margin: 15px 0;
  }
}
</style>