<template>
    <component :is="loader" :data="props.data" v-if="props.componentSrc"/>
</template>
<script setup>
    import { computed, onMounted, defineAsyncComponent } from 'vue';
    const props = defineProps(['componentSrc', 'data']);
    const loader = computed(() => {
        if(!props.componentSrc){
            return defineAsyncComponent(() => import(`@/views/NotFound.vue`));
        }
        try{
            return defineAsyncComponent(() => import(`@/views/${props.componentSrc}.vue`));
        }catch(e){
            return defineAsyncComponent(() => import(`@/views/NotFound.vue`));
        }
    });
</script>