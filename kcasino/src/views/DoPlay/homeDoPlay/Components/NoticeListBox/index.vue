<template>
  <div class="box-notice-event-faq">
    <div class="v-row">
      <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
        <BoxItem class="box-item pl-3 pr-3" title="notice" :data="listNotice?.slice(0,4)" :type="0"/>
      </div>
      <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
        <BoxItem class="box-item pl-3 pr-3" title="faqs" :data="listFAQ?.slice(0,4)" :type="1"/>
      </div>
      <div class="v-col-12 v-col-sm-6 v-col-md-4 px-0 px-sm-3">
        <BoxItem class="box-item pl-3 pr-3" title="event" :data="listEvent?.slice(0,4)" :type="2"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import BoxItem from "@/views/DoPlay/homeDoPlay/Components/NoticeListBox/BoxItem";
import {useStore} from 'vuex'
import {computed, onMounted} from "vue";

const store = useStore()
const listNotice = computed(() => store.getters.getNotice)
const listFAQ = computed(() => store.getters.getFAQ)
const listEvent = computed(() => store.getters.getEvent)

onMounted(async () => {
  await store.dispatch("getPartnershipAction")
})

</script>

<style scoped lang="scss">
.box-notice-event-faq {
  margin-top: 40px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

.box-item {
  border: 1px solid #E4E4E7;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px;
  height: 100%;
  background: #fff;
}

.box-item:nth-child(2) {
  margin: 0 20px;
}

@media (max-width: 768px) {

  .box-item:nth-child(2) {
    margin: 0;
  }

  .box-item {
    width: 100%;
    margin: 10px 0;
    padding: 0;

    @media (max-width: 600px) {
      width: 95%;
      margin: 10px auto;
    }
  }
}
</style>
