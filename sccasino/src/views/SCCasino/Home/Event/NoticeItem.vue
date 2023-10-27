<script setup>
import {defineProps} from "vue";
import {converTime} from "@/utils/SCCasino";
import {useStore} from "vuex"

const props = defineProps({
    notice: Object,
    idx: Number
});
const store = useStore()

const handleSeeMore = () => {
    store.commit('handleToggle', 'notice')
    store.commit('handleActiveContent', props.idx)
}
</script>

<template>
    <div class="wrapper row mt-2 btn-hover" @click="handleSeeMore">
        <p class="date col-12 col-sm-4 col-md-2  text-start d-flex align-items-center">{{
                converTime(notice?.no_created)
            }}</p>
        <p class="title col-10 col-sm-6 col-md-8 text-start">{{ notice?.no_subject }}</p>
        <button class="col-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M0.999999 13L7 7L1 1" stroke="#42A5F5" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
        </button>
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
