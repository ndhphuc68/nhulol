<template>
  <section class="mt-5 py-5">
    <div class="container row">
      <article class="col-12 col-lg-6">
        <div>
          <img src="@/assets/faqs/faq-icon.png" alt="faq" />
          <span class="title-section">F.A.Q</span>
        </div>
        <FAQItemVue v-for="idx in 4" :key="idx" />
      </article>
      <article class="col-12 col-lg-6">
        <div>
          <img src="@/assets/faqs/event-icon.png" alt="faq" />
          <span class="title-section">Event</span>
        </div>
        <FAQItemVue v-for="idx in 4" :key="idx" />
      </article>
    </div>
  </section>
</template>

<script setup>
import FAQItemVue from "./FAQItem.vue";
</script>

<style scoped lang="scss">
section {
  background: url("@/assets/faqs/backgound-mobile.png") no-repeat;
  background-size: 100% 100%;
  @media (min-width: 1200px) {
    background: url("@/assets/faqs/backgound.png") no-repeat;
    background-size: cover;
  }
}
</style>
