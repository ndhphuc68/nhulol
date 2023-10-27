<script setup>
import {computed, defineProps, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();
const tabGameCurrent = ref(store.state.games.tabGameActivate);
const customPage = computed(() => store.state.customPage.styles)
const props = defineProps({
    styles: {
        type: Object,
        default: () => {
            return {};
        },
    },
    isLogo: Boolean,
    modal: String,
});

function handleCloseModal() {
    store.commit("handleActiveSidebar", tabGameCurrent.value);
    store.commit("handleToggle", props.modal);
}
</script>

<template>
    <div class="modal-wrapper" @click.self="handleCloseModal">
        <div :style="props.styles" class="modalBox">
            <div class="modal-top d-flex align-center justify-center position-relative">
                <button class="btn-close-modal" @click="handleCloseModal">
                    <img
                        alt="close-icon"
                        height="24"
                        src="@/assets/icon/commonsDoplay/close-icon.png"
                        width="24"
                    />
                </button>
                <img
                    v-if="props.isLogo"
                    alt="logo"
                    class="logo"
                    :src="
          customPage.logo_image
            ? customPage.logo_image
            : require('@/assets/logos/logo.png')
        "
                />
            </div>
            <div class="modal-content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
}

.modalBox {
    position: relative;
    max-width: 96%;
    max-height: 100%;
    overflow-y: auto;
    z-index: 3;
    border: 1px solid #ffff !important;
    border-radius: 8px;
    background: var(--bg);
    padding: 2rem 0;
}

.modal-content {
    flex: 1;
    margin-top: 1.5rem;
    height: 95%;
    overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
    display: none;
}

.modalBox::-webkit-scrollbar {
    display: none;
}

.btn-close-modal {
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 200;
    font-size: 30px;
    z-index: 9;
}

.modal-top {
    flex-direction: row-reverse;
    margin: 0 1.5rem;
}

.logo {
    height: 40px;
    margin: auto;
    //margin-top: 1rem;
}
</style>
