<template>
  <div id="faqsElement" class="faqs list-wrapper">
    <div class="description">
      <h2 class="description-title">
        {{ $t("notice") }}, {{ $t("event") }} {{ $t("and") }} FAQs
      </h2>
      <p class="description-sub">
        {{ $t("titleFaq2") }}
      </p>
    </div>
    <div class="faqs row">
      <div class="col-12 col-lg-6">
        <img
          alt="banner_slot"
          class="w-100"
          src="@/assets/Duri/banner/home/banner-notice.png"
        />
      </div>
      <div class="col-12 col-lg-6 mt-3 mt-lg-0">
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
import { computed, ref, onMounted } from "vue";
import Button from "@/components/Duri/customs/Button/index.vue";
import Notice from "@/views/Duri/Home/Components/ContactDetail/Components/Notice.vue";
import Event from "@/views/Duri/Home/Components/ContactDetail/Components/Event.vue";
import FAQs from "@/views/Duri/Home/Components/ContactDetail/Components/FAQs.vue";
import { useStore } from "vuex";

const store = useStore();
const titles = ["notice", "event", "faqs"];
const contents = [Notice, Event, FAQs];
const currentTab = ref(0);
const activeTab = computed(() => contents[currentTab.value]);

</script>
<style lang="scss" scoped>
.faqs {
  margin: 40px 0;
}
.list-wrapper {
  /* border: 1px solid #e4e4e7; */
  border-radius: 12px;
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
  @media(max-width: 375px) {
    margin: 0 5px;
    button {
      font-size: 12px;
    }
  }
}

@media (max-width: 768px) {
  .nav-pills {
    margin-top: 10px;
  }
}
</style>
<style></style>
