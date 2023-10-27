<template>
  <div class="faq">
    <div class="faq_head">
      <h3 class="m-0" @click="handleRouterLink">
        {{ $t('faq') }}s
        <svg
          width="29"
          height="37"
          viewBox="0 0 29 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 26.6667L18.3335 18.3333L10.0002 10"
            stroke="#3F3F46"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </h3>
    </div>
    <div class="faq_body mt-5">
      <div class="faq_item p-2 mt-4" v-for="(i, index) in 4" :key="index">
        <FaqItem :idx="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
import { useRouter } from "vue-router";
import FaqItem from "./FaqItem";

const handleRouterLink  = () =>{
  router.push({name:'Faq'})
}
</script>

<style lang="scss" scoped>
.faq {
    padding-right: 12px !important;
  .faq_head {
    height: 54px;
    h3 {
      height: 100%;
      line-height: 54px;
      color: var(--primaryCasinoClub);
      font-size: 32px;
      font-weight: 900;
      cursor: pointer;
      svg {
        margin-left: 8px;
        transform: translateY(-6%);
      }
    }
  }
  .faq_body {
    .faq_item {
      background-color: #d3d3d833;
      border-radius: 4px;
      transition: all 0.3s;
      &:hover {
        cursor: pointer;
        background-color: #fff;
        box-shadow: #64646f33 0px 7px 29px 0px;
        transform: translateX(1%);
      }
    }
  }
}
@media (max-width: 992px) {
  .faq {
    padding: 0 !important;
    .faq_body {
      margin-top: 2rem !important;
    }
  }
}
@media (max-width: 575px) {
  .faq {
    padding: 0 12px !important;
  }
}
</style>
