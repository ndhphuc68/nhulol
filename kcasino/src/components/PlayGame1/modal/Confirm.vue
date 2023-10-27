<template>
    <div class="popup-modal" v-if="confirmDialog" @click.self="_cancel">
        <div class="window">
            <h2 style="margin-top: 0">{{ title }}</h2>
            <p>{{ message }}</p>
            <div class="btns">
                <button class="cancel-btn" @click="_cancel">{{ $t('cancel') }}</button>
                <Button variant="contained" class="ok-btn" @click="_confirm">{{ $t('ok') }}</Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {computed, onMounted, watch} from "vue";
import {useStore} from "vuex";
import Button from '@/components/PlayGame1/customs/Button/index.vue'

const store = useStore();

const confirmDialog = computed(() => store.state.modal.confirmDialog);
const title = computed(() => confirmDialog.value.title);
const message = computed(() => confirmDialog.value.message);

onMounted(() => {
    watch(confirmDialog, () => {
        if (confirmDialog.value) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "visible";
        }
    });
});
const _confirm = () => {
    if (confirmDialog?.value?.callback) {
        confirmDialog?.value?.callback();
    }
    close();
};

const _cancel = () => {
    close();
};

const close = () => {
    store.commit("closeConfirm");
};
</script>
<style scoped>
.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 5;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>
<style scoped>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.ok-btn {
    color: red;
    line-height: 2.5rem;
    cursor: pointer;
    padding: 2px 24px;
    text-transform: capitalize;
}

.cancel-btn {
    padding: 0.5em 1em;
    background-color: #9d9f9e;
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 16px;
    text-transform: capitalize;
    cursor: pointer;
    
    &:hover {
        transform: scale(0.97);
        opacity: 0.9;
        transition: all linear 0.2s;
    }
}
</style>
