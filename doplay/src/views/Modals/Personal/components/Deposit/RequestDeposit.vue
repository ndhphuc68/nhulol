<script setup>
import {convertMoney} from "@/utils/function";
import Button from "@/components/Customs/Button"
import {ref} from "vue";

const amount = ref(0);
const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];

function handleChoosePrice(price) {
  amount.value = price
}
</script>

<template>
  <div class="container">
    <div class="d-flex flex-wrap">
      <div class="v-col-md-6 v-col-12">
        <h5>{{ $t('confirmation') }}</h5>
      </div>
      <div class="v-col-md-6 v-col-12">
        <p>{{ $t('transactionWarning') }}</p>
      </div>
    </div>
    <div>
      <div class="d-flex flex-wrap justify-space-between">
        <h4 class="v-col-6">{{ $t('holdingmoney') }}</h4>
        <div class="v-col-6"><p>0 ₩</p></div>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <h4 class="v-col-12 v-col-sm-6">{{ $t('changeamount') }}</h4>
        <div class="v-col-12 v-col-sm-6">
          <v-text-field
              :model-value="amount"
              variant="outlined"
          ></v-text-field>
          <div class="d-flex flex-wrap price-list">
            <button
                v-for="price in prices"
                :key="price"
                class="item-price"
                @click="handleChoosePrice(price)"
            >
              {{ convertMoney(price) }}
            </button>
            <Button variant="outlined" @click="amount=0">{{ $t('reset') }}</Button>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <h4 class="v-col-6">{{ $t('depositor') }}</h4>
        <div class="v-col-6">
          <v-text-field
              label="Enter"
              model-value=""
              variant="outlined"
          ></v-text-field>
        </div>
      </div>
      <div class="text-center">
        <Button class="btn-apply" variant="contained">{{ $t('apply') }}</Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-price {
  border-radius: 4px;
  border: 0.75px solid #A1A1AA;
  background: #F4F4F5;
  padding: 4px 10px;
  margin: 5px;
}

.btn-apply {
  margin: 0 auto;
}
</style>