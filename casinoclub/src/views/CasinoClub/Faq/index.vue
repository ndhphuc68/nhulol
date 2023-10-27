<template>
  <div class="faq">
    <div class="faq-baner">
      <Banner :image="image" :title="title" :description="$t('faq_question')" />
    </div>
    <div class="container">
      <div class="faq-content">
        <div class="faq_accordion">
          <div
            class="faq_accordion-item text-start"
            v-for="(item, index) in data"
            :key="index"
          >
            <h2 class="faq_accordion-header">
              <button class="faq_accordion-button" @click="handleActive(index)">
                <div class="faq_wrap-text text-left d-flex align-center ">
                  <div class="me-4">{{ index + 1 }}.</div>
                  <div class="text">{{ item.title }}</div>
                </div>
                <span class="faq-icon"
                  ><svg
                    :class="{ isActiveSvg: active === index }"
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
                </span>
              </button>
            </h2>
            <div
              class="accordion_content"
              :class="active === index ? 'show' : ''"
            >
              <div class="accordion_content-body">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Banner from "@/components/CasinoClub/Banner";
// import FaqItemPage from "./FaqItemPage.vue";
import data from "./data";

const image = ref("banner-faq");
const title = ref("faq");
const active = ref(null);

const handleActive = (idx) => {
  if (idx === active.value) {
    active.value = null;
  } else {
    active.value = idx;
  }
};
</script>

<style lang="scss" scoped>
.faq-content {
  display: flex;
  justify-content: center;
  margin: 24px 0 64px 0;
  .faq_accordion {
    width: 80%;
    @media (max-width: 991px) {
      width: 100%;
    }
  }
}
.faq_accordion-header {
  margin-bottom: 0;
  border-bottom: 1px solid #e4e4e7;
  padding: 0px 8px;
  .faq_accordion-button {
    width: 100%;
    padding: 12px 24px 12px 0;
    font-size: 14px;

    display: flex;
    justify-content: space-between;
    position: relative;
    .faq_wrap-text {
      span {
        font-weight: 800;
        color: var(--bg-color);
      }
      .text {
        margin-right: 0;
        font-weight: 400;
        color: #757575;
      }
    }

    .faq-icon {
      margin-right: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      svg {
        width: 20px;
        height: 20px;
        background-color: #e4e4e7;
        border-radius: 4px;
        transform: rotate(90deg);
        transition: all 0.3s;
        path {
          stroke: #bdbdbd;
        }
      }
      .isActiveSvg {
        transform: rotate(-90deg);
        transition: all 0.3s;
      }
    }
  }
}
.accordion_content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  opacity: 0;
  background-color: #f5f5f5;
  .accordion_content-body {
    padding: 10px 46px;
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }
}

.show {
  max-height: 400px;
  opacity: 1;
}

@media(max-width: 767px){
  .faq_accordion-header{
    padding: 0;
  }
}
@media(max-width: 320px){
  .show {
  max-height: 700px;
  }
}

</style>
