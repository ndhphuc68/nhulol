<script setup>
import SignupInfo from '@/views/Play4G/Modals/Signup/Info';
import SignupBank from '@/views/Play4G/Modals/Signup/Bank';
import {computed, reactive, ref} from "vue";


const components = [SignupInfo, SignupBank];
const idxActiveTab = ref(0);
const handleActiveTab = (tab) => {
  console.log("tab",tab)
  idxActiveTab.value = tab;
}
const dataInfo = reactive({});
const setDataInfo = (data)=> {
  console.log("datainfo",data )
  dataInfo.value = {...data};
  
}
</script>

<template>
<div class="signup">
  <div class="title-group">
    <h1>
      {{ $t("signup") }}
    </h1>
    <p class="description-login">{{$t('descriptionLogin')}}</p>
  </div>
<keep-alive>
  <component @setDataInfo="setDataInfo" :dataInfo="dataInfo"  :is="components[idxActiveTab]" @handleActiveTab="handleActiveTab"/>
</keep-alive>
</div>
</template>

<style scoped lang="scss">
.signup {
  height: 100%;
  .title-group {
    text-align: left;
  }
  
  .description-login {
    color: var(--text-desc);
    font-size: 0.870rem;
  }
  
}
</style>