<template>
    <div class="modal-wrapper" @click.self="handleToggle(props.modal)">
        <div :style="props.styles" class="modalBox">
            <div class="modal-top d-flex align-center justify-content-between">
                <button class="btn-close" @click="handleToggle(props.modal)"/>
              <img alt="logo"
                   :src="customPage.logo_image ? customPage.logo_image : require('@/assets/G2casino/logo/logo-g2.png')"
                class="logo"
              />
            </div>
          <div class="content-modal">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, defineProps, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles)
const props = defineProps({
    styles: {
        type: Object,
        default: () => {
            return {};
        },
    },
    modal: {
        type: String,
        default: "",
    },
    modalType: {
        type: String,
        default: undefined,
    },
    handleClose: Function,
});

const handleToggle = (modal) => {
    if (!props?.handleClose) {
        store.commit("handleToggle", modal);
    } else {
        props.handleClose();
    }
};

onMounted(() => {
    document.documentElement.style.overflowY = "hidden";
});
onUnmounted(() => {
    document.documentElement.style.overflowY = "scroll";
})
</script>

<style scoped lang="scss">
.modal-wrapper {
    position: fixed;
    overflow: hidden;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
}

.modalBox {
  position: relative;
  max-width: 95%;
  max-height: 90% !important;
  //width: auto; //height: 10; //overflow-y: auto; overflow: hidden; z-index: 3; border: 1px solid #ffff !important;
  border-radius: 8px;
  background: var(--bg);
  margin-top: 0;
  overflow: hidden;
}
.content-modal {
  height: calc(100% - 90px);
  overflow-y: auto;
}

.content-modal::-webkit-scrollbar {
  display: none;
}

.btn-close {
    font-weight: 200;
    font-size: 15px;
    z-index: 9;
}

.modal-top {
    flex-direction: row-reverse;
    margin: 44px 50px 0;
    @media(max-width: 375px) {
      margin: 20px 10px;
    }
}

.logo {
    height: 50px;
    //padding: 5px;
    //background-color: #D9D9D9;
}

@media (max-width: 991px) {
    .modalBox {
        width: 95% !important;
    }
}
</style>
<style>
</style>
