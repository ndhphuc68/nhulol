<script setup>
import {defineProps} from 'vue'

defineProps({
    variant: 'outlined' || 'contained' || 'text',
    style: Object,
    onClick: Function,
    isFullWidth: Boolean
})
</script>

<template>
    <button :class="[variant, {'full-width' : isFullWidth}]" class="btn" :style="style"  @click="onClick">
        <slot/>
    </button>
</template>

<style scoped>
.btn {
    border-radius: 6px;
    padding: 12px 24px;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    color: var(--primary);
    background: #FFFFFF;
}

.btn.text {
    box-shadow: unset;
    padding: 0;
}

.btn.contained {
    background: var(--primary);
    color: #FFFFFF;
}

.btn.full-width {
    width: 100%;
}
</style>