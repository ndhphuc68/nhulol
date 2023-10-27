<script setup>
import { defineProps } from "vue";
import Modal from "@/components/Duri777/Modal/Modal";

const props = defineProps({
  handleClose: Function,
  handleChangeBankName: Function,
});

const bankMenu = [
  "bank_kb",
  "bank_kakao",
  "bank_nhbank",
  "bank_nh",
  "bank_sh",
  "bank_wr",
  "bank_hn",
  "bank_sc",
  "bank_ibk",
  "bank_bnk",
  "bank_dgb",
  "bank_pb",
  "bank_kjb",
  "bank_mg",
  "bank_kbank",
  "bank_sbi",
  "bank_keb",
  "bank_citi",
  "bank_cnh",
  "bank_cu",
];
const getIcon = (idx) => {
  return require("@/assets/Duri777/logo/bank/banklogo_" + (idx + 1) + ".png");
};

const handlePickBank = (name) => {
  props.handleChangeBankName(name);
  props.handleClose();
};
</script>

<template>
  <Modal
    :handle-close="handleClose"
    :styles="{
      width: 'auto',
      height: 'auto',
      border: 'none',
      overflowY: 'hidden',
    }"
  >
    <div class="container-bank">
      <div class="top">
        <h1 class="title">{{ $t("pick-bank") }}</h1>
        <p class="sub-title">{{ $t("description-pickBank") }}</p>
      </div>
      <div class="cards row mb-4">
        <button
          v-for="(item, index) in bankMenu"
          :key="index"
          class="card-item col-4 col-lg-2 h-100"
          @click="handlePickBank($t(item))"
        >
          <img :src="getIcon(index)" alt="bank-logo" />
          <span class="partner-name">
            {{ $t(item) }}
          </span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.container-bank {
  height: 100%;
  justify-content: center;
  max-width: 900px;
  max-height: 85vh;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.top {
  margin: 0 auto;
}

.cards {
  justify-content: center;
}

.cards::-webkit-scrollbar {
  display: none;
}

.title {
  font-weight: 700;
  font-size: 24px;
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
  font-size: 14px;
  line-height: 19px;
  color: var(--text-second);
  text-align: center;
  width: 70%;
  margin: 10px auto;
}

.partner-name {
  font-weight: bold;
  font-size: 14px;
  line-height: 27px;
  margin-top: 5px;
}
</style>
