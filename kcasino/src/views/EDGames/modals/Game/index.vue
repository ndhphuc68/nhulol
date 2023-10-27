<template>
  <WrapperModal>

  </WrapperModal>
</template>
<script setup>
import WrapperModal from '../components/WrapperModal'
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const listGameCasino = ref([])

onMounted(()=>{
  listGameCasino.value = store.dispatch("")
})

</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
}
.titles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 2px solid #e4e4e7;
}
.titles {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.titles::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}


.tab::-webkit-scrollbar {
  width: 0 !important;
  display: none;
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
.title-item.active {
  color: var(--primary);
}
.title-item:hover {
  color: var(--primary);
}
.title-item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
  height: 0px;
  left: 0;
  top: calc(100% - 1px);
  border: 2px solid #cc9a6c;
}

@media (max-width: 1024px) {
  .tab {
    padding: 0;
  }
  .title-item {
    height: unset;
    padding: 0 20px;
  }
}

</style>