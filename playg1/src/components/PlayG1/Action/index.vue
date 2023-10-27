<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isViewAction = ref(false);

const props = defineProps({
    handleViewDetail: Function,
    handleDelete: Function,
    isDelete: {
        type: Boolean,
        default: true,
    },
    isViewDetail: {
        type: Boolean,
        default: true,
    },
});

const handleToggleViewAction = (event) => {
    event.stopPropagation();
    isViewAction.value = !isViewAction.value;
};

const handleClickView = (event) => {
    event.stopPropagation();
    isViewAction.value = false;
    props.handleViewDetail();
};

const handleClickDelete = (event) => {
    event.stopPropagation();
    handleConfirmDelete();
};

const handleConfirmDelete = () => {
    store.commit("showConfirm", {
        isShow: true,
        title: "Delete Page",
        message: "Are you sure you want to delete this page? It cannot be undone.",
        callback: () => {
            props.handleDelete();
        },
    });
};
</script>

<template>
    <div :tabindex="0" class="action-container" @blur="isViewAction = false">
        <span class="btn" @click="handleToggleViewAction"> ... </span>
        <div :class="{ hide: !isViewAction }" class="action-group">
      <span
          v-if="isViewDetail"
          class="v-btn btn-action"
          @click="handleClickView"
      >
        Detail</span
      >
            <span v-if="isDelete" class="v-btn btn-action" @click="handleClickDelete">
        Delete</span
            >
        </div>
    </div>
</template>

<style scoped>
.btn {
    padding: 10px 20px;
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
