<script setup>
import {defineProps, ref} from "vue";

const props = defineProps({
    handleViewDetail: Function,
    handleDelete: Function
})
const isViewAction = ref(false);

function handleToggleViewAction() {
    console.log("toggle")
    isViewAction.value = !isViewAction.value;
}

function handleClickView() {
    isViewAction.value = false
    props.handleViewDetail()
}

</script>

<template>
    <div :tabindex="0" class="action-container" @blur="isViewAction = false">
        <span class="btn" @click="handleToggleViewAction"> ... </span>
        <div :class="{hide : !isViewAction}" class="action-group">
            <span class="v-btn btn-action" @click="handleClickView"> Detail </span>
            <span class="v-btn btn-action" @click="handleDelete"> Delete </span>
        </div>
    </div>

</template>

<style scoped>
.btn {
    padding: 5px;
}

.btn-action {
    padding: 15px;
    color: var(--primary);
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    margin: 3px;
}

.btn-action:hover {
    opacity: 0.5;
}

.action-container {
    position: relative;
}

.action-group {
    background-color: var(--bg);
    right: 0;
    position: absolute;
    z-index: 1;
    bottom: -25px;
    display: flex;
    flex-direction: column;
}

.action-group.hide {
    display: none;
}
</style>