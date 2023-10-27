<script setup>
import {ref, defineProps, computed} from "vue";
import {converTime} from "@/utils/SCCasino";
import {useStore} from 'vuex'

const store = useStore()
const props = defineProps({
    data: {
        type: Object,
        default: null
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
        <div class="data-notice">
            <div class="title">{{ data?.no_subject }}</div>
            <div :style="{'border-bottom': '1px solid var(--neutral-200, #E4E4E7)'}">
                <div class="content" :style="{'display': showDetail ? 'block':'none'}" v-html="data?.no_content"></div>
            </div>
            <div class="bottom">
                <div class="day">{{ converTime(data?.no_created) }}</div>
                <button class="btn-more btn-hover" @click="handleShowDetail()"> {{ $t('seeMore') }}</button>
            </div>
        </div>
    
    </div>
</template>


<style scoped lang="scss">
.wrapper {
    margin: 2rem 0;
    border: 1px solid rgba(99, 99, 99, 0.2);
    border-radius: 5px;
}

.data-notice {
    padding: 1rem;
    
    .day {
        text-align: left;
        font-size: 0.875rem;
    }
    
    .title {
        text-align: left;
        font-size: 1rem;
    }
    
    .content {
        text-align: left;
        padding: 10px 5px;
    }
    
    .bottom {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        
        .btn-more {
            color: var(--primarySCCasino);
            
        }
    }
}

@media (max-width: 768px) {
    .data-notice {
        
        .title {
            font-size: 0.875rem;
        }
    }
}
</style>

