<script setup>
import {computed, defineProps} from 'vue'
import Breadcrumb from 'primevue/breadcrumb';
import {useI18n} from "vue-i18n";

const props = defineProps({
    page: String
})
const {t} = useI18n()

const home = computed(() => ({
    label: t('home'),
    to: '/',
}));
const items = computed(() => [
    {label: props.page},
]);
</script>

<template>
    <div class="wrapper">
        <div class="banner-content">
            <h1 class="title-page">
                {{ page }}
            </h1>
            <Breadcrumb :home="home" :model="items" :pt="{
                root: { class: 'surface-ground' },
                label: ({ props }) => ({
                    class: props.index === 0 ? 'page-bread' : 'home-bread'
                }),
                separator: ({ props }) => ({
                    class: 'separator-bread'
                })}"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    background-image: url("@/assets/G2casino/banner/banner-page.png");
    background-size: cover;
    height: 400px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75); /* Adjust the color and opacity as needed */
    }

    .banner-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .title-page {
        color: var(--primaryG2Casino);
        text-align: center;
      }
    }
}
</style>
<style lang="scss">
.home-bread {
    color: #A1A1AA;
}

.surface-ground {
    background-color: transparent;
    border: unset;

    .p-breadcrumb-list {
        justify-content: center;
    }
}

.page-bread, .separator-bread {
    color: #ffffff !important;
    font-weight: 700;
}

.separator-bread {
    padding: 0 1rem;
}
</style>