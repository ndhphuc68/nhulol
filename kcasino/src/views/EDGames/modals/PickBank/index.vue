<template>
  <div class="container">
    <div class="top">
      <h1 class="title">{{ $t("pick-bank") }}</h1>
      <p class="sub-title">{{ $t("description-pickBank") }}</p>
    </div>
    <div class="cards v-row">
      <button
        class="card-item v-col-4 v-col-lg-2"
        v-for="(item, index) in bankMenu"
        :key="index"
        @click="handlePickBank($t(item))"
      >
        <img :src="getIcon(index)" />
        <span class="partner-name">
          {{ $t(item) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { bankMenu } from "@/utils/datas";
import { useI18n } from "vue-i18n";

const props = defineProps({
  handleClose: Function,
  handleChangeBankName: Function,
});

const getIcon = (idx) => {
  return require("@/assets/bank/banklogo_" + (idx + 1) + ".png");
};

const handlePickBank = (name) => {
  props.handleChangeBankName(name);
  props.handleClose();
};
</script>

<style scoped>
.container {
  margin-top: 44px;
  height: 100%;
}

.top {
  margin: 0 auto;
}

.cards {
  justify-content: center;
  overflow: auto;
  height: 70%;
  margin: 40px auto;
}

.cards::-webkit-scrollbar {
  display: none;
}

.title {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--text);
  text-align: center;
}

.card-item {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-item img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.sub-title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: var(--text-second);
  text-align: center;
  width: 70%;
  margin: 10px auto;
}

.partner-name {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 27px;
  margin-top: 5px;
  color: var(--text);
}

@media (max-width: 375px) {
  .partner-name {
    font-size: 12px;
  }
}
</style>
