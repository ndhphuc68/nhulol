<template>
    <div>
        <div class="container">
            <div class="title-wrap">
                <h5 class="title">{{ $t(title) }}</h5>
            </div>
            <div class="content">
                <div
                    class="item"
                    v-for="(item, index) in Props.data"
                    :key="index"
                    @click="handleToggleModal(index)"
                >
                    <p class="description" v-html="item?.no_subject"></p>
                    <p class="date">{{ formatDate(item.no_created) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {defineProps} from "vue";
import {formatDate} from "@/utils";
import {useStore} from "vuex";

const Props = defineProps({
    data: Array,
    title: String,
    type: Number,
});
const store = useStore();

const handleToggleModal = (idx) => {
    switch (Props.title) {
        case "notice":
            store.commit("handleToggle", "notice");
            store.commit("handleActiveSidebar", 3);
            break;
        case "event":
            store.commit("handleToggle", "event");
            store.commit("handleActiveSidebar", 2);
            break;
        case "faqs":
            store.commit("handleToggle", "faq");
            break;
    }
    // store.commit("handleActiveMenu", Props.type);
    store.commit("handleActiveContent", idx);
};
</script>
<style scoped>
.container {
    padding: 0 10px;
    height: 100%;
}

.title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #e180ea;
    text-transform: uppercase;
}

.item:hover {
    transform: scale(1.03);
    opacity: 0.7;
    cursor: pointer;
}

.title-wrap {
    padding: 15px 0;
}

.content {
    border-top: 1px solid #e4e4e7;
}

.item {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
}

.item:not(:last-child) {
    border-bottom: 1px solid #e4e4e7;
}

.full-width.description {
    width: 100%;
}

.description {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 260px;
    font-weight: 600;
}
</style>
