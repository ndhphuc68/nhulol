<script setup>
import {defineProps} from "vue";
import {converTime} from "@/utils/SCCasino";
import {useStore} from "vuex"

const props = defineProps({
    notice: Object,
    index: Number
});
const store = useStore()

const handleSeeMore = () => {
    store.commit('handleToggle', 'noticeEventFAQ')
    store.commit('handleActiveTab', 2);
    store.commit('handleActiveContent', props.index)
}
</script>

<template>
    <div class="wrapper row mt-2 btn-hover" @click="handleSeeMore">
        <p class="title col-12 text-start">{{ notice?.no_subject }}</p>
        <p class="content">{{ notice?.no_content_txt }}</p>
        <p class="date col-12  text-start d-flex align-items-center">{{ converTime(notice?.no_created) }}</p>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    text-align: center;
    border-top: 1px solid #D4D4D8;
    padding: 1rem 0;
    
    .date {
        font-size: 1rem;
        color: var(--text-secondSCCasino);
    }
    
    .title {
        overflow: hidden;
        color: #424242;
        text-overflow: ellipsis;
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;
    }
    
    &:hover {
        cursor: pointer;
    }
    
    @media (max-width: 992px) {
        font-size: 12px;
    }
    
    button {
        color: var(--pink);
    }
}

.col-6,
.col-3 {
    text-align: left;
}

.col-2 {
    text-align: right;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: var(--text-secondSCCasino);
    text-align: left;
    -webkit-line-clamp: 2;
    font-size: 0.9rem;
    text-overflow: ellipsis;
    overflow: hidden;
}

.date {
    color: #9E9E9E
}

@media (max-width: 768px) {
    svg {
        width: 12px;
    }
}

@media (max-width: 575px) {
    button {
        display: flex;
        align-items: start;
    }
}
</style>
