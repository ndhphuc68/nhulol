<template>
  <div class="container">
    <button v-if="currentTab === 0" @click="handleChangeTab(1)" class="btn-creation"> {{ $t('btn-creation') }}</button>
    <button v-if="currentTab === 1" @click="handleChangeTab(0)" class="btn-creation"> {{ $t('btn-back') }}</button>
    <component :is="tabs[currentTab]" :changeTab="handleChangeTab"></component>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import HelpCenter2 from './HelpCenter2'
import QueryCreation from './QueryCreation'
import {useStore} from "vuex";

const store = useStore()
const currentTab = ref(0);
const tabs = [HelpCenter2, QueryCreation];

onMounted(() => {
  store.commit("handleHelpCenterCheck")
})
const handleChangeTab = (index) => {
  currentTab.value = index;
}

</script>
<style scoped>
.container {
  width: 100%;
}

.btn-creation {
  background: var(--bg);
//border: 0.3px solid var(--primary); border-radius: 8px;
  margin-bottom: 32px;
  padding: 8px 14px;
  color: var(--primary);
  width: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.btn-creation:hover {
  opacity: 0.7;
}

@media (max-width: 425px) {
  .btn-creation {
    margin-bottom: 15px;
  }
}
</style>