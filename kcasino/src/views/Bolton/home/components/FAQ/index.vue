<template>
  <section class="mt-3 py-3">
    <div class="container row">
      <article class="col-12 col-lg-4 mb-5 mb-lg-0">
        <div>
          <img src="@/assets/FSCasino/faqs/faq-icon.png" alt="faq" />
          <span class="title-section">F.A.Q</span>
        </div>
        <div class="list-item">
          <FAQItemVue
            v-for="(item, idx) in listFAQ?.slice(0, 4)"
            :key="idx"
            :item="item"
            :modal="'faq'"
            :idx="idx"
          />
        </div>
      </article>
      <article class="col-12 col-lg-4 mb-5 mb-lg-0">
        <div>
          <img src="@/assets/FSCasino/faqs/event-icon.png" alt="faq" />
          <span class="title-section">{{ $t("events") }}</span>
        </div>
        <div class=" ">
          <FAQItemVue
            v-for="(item, idx) in listEvent?.slice(0, 4)"
            :key="idx"
            :item="item"
            :modal="'event'"
            :idx="idx"
          />
        </div>
      </article>
      <article class="col-12 col-lg-4">
        <div>
          <img src="@/assets/FSCasino/icons/bell-notice.png" alt="faq" />
          <span class="title-section">{{ $t("notice") }}</span>
        </div>
        <div class=" ">
          <FAQItemVue
            v-for="(item, idx) in listNotice?.slice(0, 4)"
            :key="idx"
            :item="item"
            :modal="'notice'"
            :idx="idx"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import FAQItemVue from "./FAQItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const listFAQ = computed(() => store.getters.getFAQ);
const listEvent = computed(() => store.getters.getEvent);
const listNotice = computed(() => store.getters.getNotice);
</script>

<style scoped lang="scss">
section {
  background: url("@/assets/FSCasino/faqs/backgound-mobile.png") no-repeat;
  background-size: 100% 100%;
  .list-item {
    max-height: 26rem;
    overflow-y: auto;
    min-height: 16rem;
    @media(max-width: 991px){
      min-height: 4rem;
    }
  }
  @media (min-width: 1200px) {
    background: url("@/assets/FSCasino/faqs/backgound.png") no-repeat;
    background-size: cover;
  }
}
</style>
