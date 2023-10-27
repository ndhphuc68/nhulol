<script setup>
import {bankMenu} from "@/views/FSCasino/home/modals/Bank/data";
import {defineEmits, ref} from "vue";
import {Icons} from "@/const/Icons";
import {handleCloseModal} from "@/utils";

const indexActive = ref(-1);
const nameBank = ref("");
const emit = defineEmits(["handleChangeBank"]);

const getIcon = (idx) => {
  return require("@/assets/FSCasino/bank/banklogo_" + (idx + 1) + ".png");
};

const handleChangeBankActive = (index, name) => {
  indexActive.value = index;
  nameBank.value = name;
};
</script>

<template>
  <div class="bank-main mt-4">
    <div class="row mb-3 bank-header">
      <div class="col-md-4 col-3 d-flex align-items-center">
        <div
            @click="handleCloseModal('pickBank')"
            class="d-flex flex-row align-items-center back"
        >
          <img :src="Icons.back" alt="back"/>
          <span class="ms-2">{{$t('back')}}</span>
        </div>
      </div>
      <div class="col-md-4 col-6 d-flex justify-center"><span class="title-bank">{{$t('pick-bank')}}</span></div>
      <div class="col-4"></div>
    </div>
    <hr/>
    <div class="row overflow-y-scroll list-bank">
<!--      <span>{{$t('description-pickBank')}}</span>-->
      <div class="row mb-5 mt-4 px-md-4 px-2">
        <div :key="index" class="col-md-3 col-6 mb-3" v-for="(item, index) in bankMenu">
          <div
              @click="handleChangeBankActive(index, item)"
              class="item-bank d-flex flex-column align-items-center justify-content-evenly"
              :class="indexActive === index && 'active'"
          >
            <img :src="getIcon(index)" alt="index"/>
            <span>{{ $t(item) }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <button
            @click="emit('handleChangeBank', $t(nameBank))"
            class="primary-button"
        >
          {{$t('confirm')}}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bank-main {
  .active {
    border: 1px solid var(--light-gradient);
  }

  .item-bank {
    height: 100px;
    cursor: pointer;
  }

  img {
    width: 40px;
    height: 40px;
  }

  hr {
    border: 1px solid var(--light-gradient);
    height: 1px;
  }

  .bank-header {
    .title-bank {
      color: var(--light-gradient);
      text-align: center;
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .back {
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;

        @media (max-width: 575.98px) {
          width: 20px;
          height: 20px;
        }
      }

      span {
        color: var(--light-gradient);
        font-size: 20px;
        font-weight: 500;
        line-height: normal;

        @media (max-width: 575.98px) {
          font-size: 14px;
        }
      }
    }
  }
  .list-bank{
    @media (max-width: 575.98px) {
      height: calc(100vh - 170px);
    }
  }
}
</style>
