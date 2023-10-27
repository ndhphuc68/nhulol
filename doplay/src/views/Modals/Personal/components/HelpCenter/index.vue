<script setup>
import {ref} from 'vue'
import HelpCenter from './HelpCenter'
import QueryCreation from './QueryCreation'

const currentTab = ref(0);
const tabs = [HelpCenter, QueryCreation];

const handleChangeTab = (index) => {
  currentTab.value = index;
}

</script>

<template>
  <div class="container">
    <button v-if="currentTab === 0" class="btn-creation" @click="handleChangeTab(1)"> {{ $t('btn-creation') }}</button>
    <button v-if="currentTab === 1" class="btn-creation" @click="handleChangeTab(0)"> {{ $t('btn-back') }}</button>
    <component :is="tabs[currentTab]" :changeTab="handleChangeTab"></component>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.btn-creation {
  background: var(--bg);
  padding: 8px 25px;
  color: var(--primary);
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