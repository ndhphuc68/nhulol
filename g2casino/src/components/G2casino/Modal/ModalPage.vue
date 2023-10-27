<script setup>
import {computed} from "vue"
import {useStore} from "vuex";
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Notice from '@/views/G2casino/Modals/Notice';
import FAQ from '@/views/G2casino/Modals/FAQ';
import Event from '@/views/G2casino/Modals/Event';
import Modal from '@/components/G2casino/Modal/Modal'

const store = useStore();
const toggle = computed(() => store.state.modal.toggleShow)

</script>
<template>
    <!--    <Modal-->
    <!--        v-if="toggle['login']"-->
    <!--        :modal="'login'"-->
    <!--        :styles="{ width: '1036px', height: 'auto', border: 'none', margin: '20px' }">-->
    <!--        <
    />-->
    <!--    </Modal>-->
    <Modal
        v-if="toggle['notice']"
        :modal="'notice'"
        :styles="{ width: '1036px', height: '700px', border: 'none', margin: '20px' }">
        <Notice/>
    </Modal>
    <Modal
        v-if="toggle['event']"
        :modal="'event'"
        :styles="{ width: '1036px', height: '700px', border: 'none', margin: '20px' }">
        <Event/>
    </Modal>
    <Modal
        v-if="toggle['faqs']"
        :modal="'faqs'"
        :styles="{ width: '1036px', height: '700px', border: 'none', margin: '20px' }">
        <FAQ/>
    </Modal>
    <ConfirmDialog/>
    <Toast
        :pt="{
        root: { style : {opacity:1} }
    }"/>
</template>

<style></style>
