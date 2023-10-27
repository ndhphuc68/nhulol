<template>
  <div @click="handleToggle()">
    <div class="content_title">
      <span class="fax-idx">{{ handleSttFaq(Props.idx + 1) }}</span>
      <h4 class="m-0">How can i withdraw money?</h4>
      <span class="faq_icon_drop">
        <svg
          :class="{ isActiveSvg: toggle }"
          width="29"
          height="37"
          viewBox="0 0 29 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 26.6667L18.3335 18.3333L10.0002 10"
            stroke="#db576b"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <div class="content_wrap" :class="toggle ? 'show' : ''">
      <p class="content_body">
        Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum
        Donot
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const Props = defineProps({
  idx: Number,
});

const toggle = ref(false);

const handleToggle = () => (toggle.value = !toggle.value);
const handleSttFaq = (idx) => {
  return idx.toString().padStart(2, "0");
};
</script>

<style lang="scss" scoped>
.content_title {
  height: 36px;

  display: flex;
  .fax-idx {
    width: 24px;
    height: 24px;
    line-height: 24px;
    background-color: var(--primaryCasinoClub);
    color: var(--white-color);
    border-radius: 50%;
    text-align: center;
    margin-right: 8px;
    transform: translateY(28%);
  }
  h4 {
    font-size: 20px;
    height: 100%;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .faq_icon_drop {
    margin-left: auto;
    transform: translateY(14%);
    svg {
      transform: rotate(90deg);
      width: 28px;
      height: 28px;
    }
    .isActiveSvg {
      transform: rotate(-90deg);
      path {
        stroke: #bdbdbd;
      }
    }
  }
}
.content_wrap {
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in;
  opacity: 0;
}
.content_body {
  font-size: 14px;
  margin: 4px 0 0 0;
}
.show {
  max-height: 500px;
  opacity: 1;
  transition: all 0.5s ease-out;
}
@media (max-width: 768px) {
  .content_title {
    h4 {
      font-size: 16px !important;
    }
  }
}
@media (max-width: 320px) {
  .content_title {
    h4 {
      font-size: 14px !important;
    }
  }
  .content_body {
    font-size: 13px;
  }
}
</style>
