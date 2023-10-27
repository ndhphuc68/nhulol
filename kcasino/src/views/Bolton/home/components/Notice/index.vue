<template>
    <section class="container row mt-5">
        <div class="banner col-12 text-center px-sm-0 col-lg-4">
            <img src="@/assets/FSCasino/notice.png" alt="notice"/>
        </div>
        <div class="col-12 my-1 col-lg-8">
            <div class="row border-bottom border-1">
                <div class="col-6 ps-0">
          <span>
            <img src="@/assets/FSCasino/icons/bell-notice.png" alt="bell"/>
          </span>
                    <span class="title-section">{{ $t('notice') }}</span>
                </div>
                <div class="col-6 text-end">
                    <button :disabled="!page" @click="handleClickPrev">
                        &lt;
                    </button>
                    <button
                        :disabled="(page + 1) * 4 >= listNotice?.length"
                        @click="handleClickNext"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div class="list-notice">
                <NoticeItem
                    v-for="(notice,idx) in displayNotice"
                    :key="idx"
                    :notice="notice"
                    :idx="idx"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import NoticeItem from "./NoticeItem";
import {useStore} from 'vuex'

const store = useStore()
const listNotice = computed(() => store.getters.getNotice)
const displayNotice = ref([]);
const page = ref(0);

watch(listNotice, value => {
    displayNotice.value = value?.slice(page.value * 4, page.value * 4 + 4);
})

onMounted(async () => {
    if (listNotice.value) {
        displayNotice.value = listNotice?.value.slice(page.value * 4, page.value * 4 + 4);
    }
});

const handleClickPrev = () => {
    if (page.value === 0) return;
    page.value -= 1;
    displayNotice.value = listNotice?.value.slice(page.value * 4, page.value * 4 + 4);
};

const handleClickNext = () => {
    if ((page.value + 1) * 4 >= listNotice?.value.length) return;
    page.value += 1;
    displayNotice.value = listNotice?.value.slice(page.value * 4, page.value * 4 + 4);
};
</script>

<style scoped lang="scss">
section {
    border-radius: 8px;
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.3);
    text-align: left;
    background: var(--white);
    
    button {
        padding: 0.5rem 1rem;
        font-size: 24px;
        
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    
    .banner {
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .list-notice {
        min-height: 130px;
        @media (min-width: 992px) {
            min-height: 145px;
        }
    }
}
</style>
