<script setup>
import svgIcon from '@/assets/SCCasino/icon/commons';
import NoticeItem from "@/views/SCCasino/Home/Notice/NoticeItem";
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const noticeList = computed(() => store.getters.getNotice);

const handleSeeMore = () => {
    store.commit('handleToggle', 'noticeEventFAQ');
    store.commit('handleActiveTab', 0)
}

</script>

<template>
    <div class="notice-container">
        <div class="container">
          <div class="notice-head">
            <div class="d-flex">
              <h4 class="notice-title me-2">{{ $t('notice') }}</h4>
              <component class="icon" :is="svgIcon?.ExclamationIcon"/>
            </div>
            <button class="btn-more btn-hover" @click="handleSeeMore">
              {{ $t('seeMore') }}
            </button>
          </div>
          <div class="notice-body">
            <NoticeItem v-for="(item, index)  in noticeList.slice(0,4)" :key="index" :index="index" :notice="item"/>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.notice-container {
    .notice-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .notice-title {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primarySCCasino);
        }
        
        .icon {
            width: 1.5rem;
            height: 1.5rem;
        }
        
        .btn-more {
            color: var(--primarySCCasino);
            font-weight: 500;
        }
    }
}
</style>