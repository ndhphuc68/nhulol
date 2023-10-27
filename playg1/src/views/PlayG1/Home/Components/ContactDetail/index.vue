<template>
  <div id="faqsElement" class="faqs">
    <div class="description">
      <h2 class="description-title">Notice, Event and FAQs</h2>
      <p class="description-sub">
        Cras molestie bibendum ut morbi. Vitae lacinia ac consectetur duis
        pulvinar egestas.
      </p>
    </div>
    <div class="faqs row">
      <div class="col-12 col-md-6">
        <img
          alt="banner_slot"
          class="w-100"
          src="../../../../../assets/PlayG1/banner/home/banner_slot.png"
        />
      </div>
      <div class="col-12 col-md-6">
        <ul class="nav nav-pills">
          <li v-for="(item, index) in titles" :key="index" class="nav-item">
            <Button
              :on-click="() => (currentTab = index)"
              :style="{ padding: '8px 10px' }"
              :variant="currentTab === index ? 'contained' : ''"
              >{{ $t(item) }}
            </Button>
          </li>
        </ul>
        <component :is="activeTab" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import Notice from "@/views/PlayG1/Home/Components/ContactDetail/Components/Notice.vue";
import Event from "@/views/PlayG1/Home/Components/ContactDetail/Components/Event.vue";
import FAQs from "@/views/PlayG1/Home/Components/ContactDetail/Components/FAQs.vue";

const titles = ["notice", "event", "faqs"];
const contents = [Notice, Event, FAQs];
const currentTab = ref(0);
const activeTab = computed(() => contents[currentTab.value]);
</script>
<style lang="scss" scoped>
.faqs {
  margin: 40px 0;
}

.description {
  text-align: center;
  margin: 40px 0;

  .description-sub {
    color: var(--text-second);
  }
}

.contact {
  margin: 20px -20px;
}

.nav-item {
  margin: 0 10px;
}

@media (max-width: 768px) {
  .nav-pills {
    margin-top: 10px;
  }
}
</style>
<style>
</style>