<script setup>
import {ref, defineProps, computed} from "vue";
import {converTime} from "@/utils";
import {useStore} from 'vuex'

const store= useStore()
const props = defineProps({
    data: {
        type: Object
    },
    index: Number
});

const showDetail = ref(computed(() => {
    return props.index === store.state.notice.idxActiveContent;
}).value)

const handleShowDetail = () => {
    // store.commit('handleActiveContent', idx)
    showDetail.value = !showDetail.value
}

</script>

<template>
  <div class="wrapper">
    <div class="data-notice" @click="handleShowDetail()" :style="showDetail ? 'background : #FAFAFA':''">
      <div class="index">{{index+1}}</div>
      <div class="title" :style="showDetail && 'color : #2F9015'" >{{data?.no_subject}}</div>
      <div class="day">{{ converTime(data?.no_created) }}</div>
    </div>
    <div class="content" :style="{'display': showDetail ? 'block':'none'}" v-html="data?.no_content"></div>
  </div>
</template>


<style scoped>
.data-notice {
  display: grid;
  grid-template-columns: 10% 55% 35%;
  justify-items: center;
  align-items: center;
  padding: 15px 0;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
  border-bottom: 1px solid #E4E4E7;
}
.data-notice:hover {
  cursor: pointer;
  transform: scale(0.98);
  transition: 0.5s ease;
}
.content {
  padding: 0.5rem;
  background: #FAFAFA;
  border-bottom: 1px solid #E4E4E7;
}

.content p {
  margin:0;
}

.index, .day {
  color: #A1A1AA;
}
.title {
  font-weight: 600;
}
@media(max-width:600px) {
  .data-notice {
    padding: 0.5rem 0;
  }
}
</style>