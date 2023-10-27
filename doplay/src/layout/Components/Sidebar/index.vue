<script setup>
import images from "@/assets";
import {menus} from './data';
import {useStore} from "vuex";
import RealtimeMoney from '@/layout/Components/Sidebar/Components/RealtimeMoney'
import Betting from '@/views/Modals/Betting';
import Button from '@/components/Customs/Button'
import {computed} from "vue";

const store = useStore();
const idxActiveSidebar = computed(()=>store.state.auth.activeSidebar);
const auth = computed(() => store.state.auth.auth);
function handleClickMenu({idxSidebar, idxTab, modalKey, modalComponent}) {
  if (modalKey) {
    store.commit('openModal', {modalKey: modalKey, component: () => modalComponent});
    store.commit('handleActiveMenu', idxTab);
    store.commit('handleActiveSidebar', idxSidebar)
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-menu">
      <img :src="images.logo" alt="logo-do-play" class="logo"/>
      <div class="money-group" v-if="auth">
        <h4 class="money_title">{{ $t('total-balance') }}</h4>
        <div class="money-content d-flex">
          <img alt="money-icon" class="money-icon" src="@/assets/icon/sidebars/diamond.png"/>
          <h4 class="money_total">₩ 0</h4>
        </div>
        <Button variant="contained" class="btn-betting" @click="handleClickMenu({ modalKey: 'betting', modalComponent: Betting })">
          {{ $t('betting-btn') }}
        </Button>
      </div>
      <div v-for="(item, index) in menus" :key="index" :class="{'active': index === idxActiveSidebar}"
           class="sidebar-item d-flex align-center pa-2 my-8"
           @click="handleClickMenu({idxSidebar : index, idxTab: item.idxTab, modalKey: item?.modalKey, modalComponent: item.modalComponent })">
        <component :is="item.icon" class="icon-item mr-2"/>
        <span class="text-item"> {{ ($t(item.key)) }}</span>
      </div>
    </div>
    <RealtimeMoney/>
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 241px;
  padding: 10px 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  overflow-y: scroll;
}

.sidebar-menu {
  padding: 0 26px;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar-item {
  cursor: pointer;

  &:hover, &.active {
    color: var(--primary);
  }
}

.logo {
  width: 184px;
  height: 48px;
}
.money-content {
  align-items: center;
  img {
    margin-right: 15px
  }
}
</style>

<style lang="scss">
.sidebar-item.active svg.stroke path, .sidebar-item:hover svg.stroke path {
  stroke: var(--primary);
}

.sidebar-item.active svg.fill path, .sidebar-item:hover svg.fill path {
  fill: var(--primary);
}
</style>
