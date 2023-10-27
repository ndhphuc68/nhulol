<template>
<WrapperModal>
  <div class = "container">
    <div class = "titles">
        <button class="title-item"  v-for="(title, index) in titles" @click="activeIndex = index" :key="index" :class="{'active': activeIndex === index}">
          {{title}}
        </button>
    </div>
    <div class ="tab">
      <component :is="activeTab"></component>
    </div>
  </div>
</WrapperModal>

</template>
<script setup>
  import WrapperModal from '../WrapperModal'
  import { onMounted, ref, computed, defineProps} from 'vue'
  import  {userInfoTabs} from '@/utils/datas'
  import UserInfo from './components/UserInfo'
  import DepositPage from './components/DepositPage'
  // const props = defineProps({
  //   titles: {},
  //   tabs: {},
  // })
  const activeTab = computed(() => tabs[activeIndex.value]);
  const activeIndex = ref(0);
  const tabs = [ UserInfo , DepositPage];
  const {titles} = userInfoTabs;

</script>
<style scoped>
  .container {
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    background-color: var(--bg);

  }
  .titles {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 12px;
  }
  .tab {
    border: 2px solid #E4E4E7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-top: 32px;
  }
  .title-item {
    height: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: var(--text-second);
    text-transform: capitalize;
    background-color: var(--bg);
  }
  .title-item.active{
    color: var(--primary);
  }
  .title-item:hover{
    color: var(--primary);
  }
  .title-item.active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0px;
    left: 0;
    top: calc(100% - 1px);
    border: 2px solid #CC9A6C;
  }
</style>