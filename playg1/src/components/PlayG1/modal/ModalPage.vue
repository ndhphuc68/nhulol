<script setup>
import {computed} from "vue"
import {useStore} from "vuex";
import Modal from '@/components/PlayG1/modal/Modal.vue'
import Login from "@/views/PlayG1/modals/Login/index.vue";
import SignUp from "@/views/PlayG1/modals/Signup/index.vue";
import Partnership from "@/views/PlayG1/modals/Partnership/index.vue";
import Confirm from "@/components/PlayG1/modal/Confirm.vue";

const store = useStore();
const toggle = computed(() => store.state.modal.toggleShow)

</script>
<template>
    <Modal
        v-if="toggle['login']"
        :modal="'login'"
        :styles="{ width: '1036px', height: 'auto', border: 'none', margin: '20px' }">
        <Login/>
    </Modal>
    <Modal
        v-if="toggle['signUp']"
        :modal="'signUp'"
        :styles="{ width: '1036px', height: 'auto', border: 'none', margin: '20px' }">
        <SignUp/>
    </Modal>
    <Modal
        v-if="toggle['partnership']"
        :modal="'partnership'"
        :styles="{ width: '1036px', height: 'auto', minHeight: '70vh',
                    padding: '20px', border: 'none' }"
    >
        <Partnership/>
    </Modal>
    <Confirm  />
</template>

<style></style>
