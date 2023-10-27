<script setup>
import {defineEmits, defineProps, onMounted, ref} from 'vue';

const open = ref(false);
const $emit = defineEmits(['input'])

const Props = defineProps({
    options: Array,
    default: String,
    tabIndex: Number,
    width: String,
    height: String,
    handleToggleSidebar: {
        type: Function
    },
    isMobile: {
        type: Boolean,
        default: false
    }
})
const selected = ref(Props.options.find(item => item.key === Props.default) || Props.options[0]);

const handleSelect = function (option) {
    if (Props.isMobile) {
        Props.handleToggleSidebar()
    }
    selected.value = option;
    open.value = false;
    $emit('input', option);
}
onMounted(function () {
    $emit("input", selected.value)
})

</script>

<template>
    <div :style="{width: width, height: height}" :tabindex="tabIndex" class="custom-select" @blur="open = false">
        <div :class="{ open: open }" class="selected" @click="open = !open">
            <img v-if="selected.value.img" :src="selected.value.img" alt="img-selected"/>
            <p>{{ selected.value.text }}</p>
        </div>
        <div :class="{ selectHide: !open }" class="items">
            <div
                v-for="(option, i) of options"
                :key="i"
                @click="handleSelect(option)"
            >
                <img v-if="option.value.img" :src="option.value.img" alt="img-option" class="option-img"/>
                <p>{{ option.value.text }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.custom-select {
    position: relative;
    text-align: left;
    outline: none;
    line-height: 47px;
    color: var(--text);
}

.custom-select .selected {
    border-radius: 6px;
    border: 1px solid #666666;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    justify-content: space-between;
}

.selected img, .items div img {
    width: 24px;
    height: 24px;
}

.selected, .items div {
    display: flex;
    align-items: center;
    padding: 0 1em;
}

.custom-select .selected.open {
    border: 1px solid #ad8225;
    border-radius: 6px 6px 0px 0px;
    
}

.custom-select .selected:after {
    content: "";
    margin-top: 5px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #333333 transparent transparent transparent;
}

.custom-select .items {
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid #9a9996;
    border-left: 1px solid #858481;
    border-bottom: 1px solid #575757;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: var(--bg);
}

.custom-select .items div {
    padding: 0 1em;
    cursor: pointer;
    user-select: none;
    
}

.custom-select .items div:hover {
    background-color: #ad8225;
}

.option-img {
    margin-right: 5px;
}

.selectHide {
    display: none;
}
</style>