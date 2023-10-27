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
    <button :class="[variant, {'full-width' : isFullWidth}]" :style="style" class="button" @click="onClick">
        <slot/>
    </button>
</template>

<style scoped lang="scss">
.button {
    border-radius: 6px;
    padding: 12px 24px;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    color: var(--primarySCCasino);
    background: #FFFFFF;
}

.button:hover {
    transform: scale(0.99);
    opacity: 0.9;
    transition: transform linear 0.2s;
}

.button.text {
    box-shadow: unset;
    padding: 0;
}

.button.contained {
    background: var(--primarySCCasino);
    color: #FFFFFF;
}

.button.full-width {
    width: 100%;
}
</style>