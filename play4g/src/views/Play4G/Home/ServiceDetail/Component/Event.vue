<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import {formatDate} from "@/utils";

const store = useStore();

const datatest = [
  {
    "no_subject" : "nạp 100tr nhận ngay ngọc trinh ưu đãi siêu khủng",
    "no_created" : 1231746781
  },
  {
    "no_subject" : "Nạp vip tháng để tăng tỉ lệ nổ hũ",
    "no_created" : 1678979878
  }
]

const handleToggleViewDetail = (idx) => {
    store.commit("handleToggle", "noticeEventFAQ");
    store.commit("handleActiveTab", 1);
    store.commit("handleActiveContent", idx);
};
const data = computed(() => store.getters.getEvent);
</script>

<template>
    <div class="wrapper">
        <button
            v-for="(item, index) in datatest?.slice(0,4)"
            :key="index"
            class="d-flex justify-content-between blog-item w-100"
            @click="handleToggleViewDetail(index)"
        >
      <span class="w-80 content">
        {{ item.no_subject }}
      </span>
            <span class="w-20">
        {{ formatDate(item.no_created) }}
      </span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    padding: 10px;
    .blog-item {
        margin: 12px 0;
        cursor: pointer;
        padding-bottom: 10px;
        
        &:hover {
            color: var(--primaryPlay4G);
        }
    }
    
    .content {
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        white-space: nowrap;
        overflow: hidden;
        width: 80%;
        font-weight: 400;
        text-align: left;
    }
}

@media (max-width: 768px) {
    .wrapper {
        padding: 0;
    }
    .content {
        max-width: 70%;
    }
}
</style>
