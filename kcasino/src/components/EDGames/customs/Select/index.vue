<template>
  <div
    class="custom-select"
    :style="{ width: width, height: height }"
    :tabindex="tabIndex"
    @blur="open = false"
  >
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <div class="d-flex align-center ">
        <img
          v-if="selected.value.img"
          alt="img-selected"
          :src="selected.value.img"
        />
        <p class="text-select">{{ selected.value.text }}</p>
      </div>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="handleSelect(option)"
      >
        <img
          class="option-img"
          v-if="option.value.img"
          alt="img-option"
          :src="option.value.img"
        />
        <p>{{ option.value.text }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref, defineEmits } from "vue";

const open = ref(false);
const $emit = defineEmits(["input"]);

const Props = defineProps({
  options: Array,
  default: String,
  tabIndex: Number,
  width: String,
  height: String,
  handleToggleSidebar: {
    type: Function,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});
const selected = ref(
  Props.options.find((item) => item.key === Props.default) || Props.options[0]
);
const handleSelect = function (option) {
  if (Props.isMobile) {
    Props.handleToggleSidebar();
  }
  selected.value = option;
  open.value = false;
  $emit("input", option);
};
onMounted(function () {
  $emit("input", selected.value);
});
</script>

<style scoped>
.items {
  overflow-y: auto;
  max-height: 200px;
}
.custom-select {
  position: relative;
  text-align: left;
  outline: none;
  line-height: 47px;
  color: var(--text);
  background-color: #fff;
  border: 1px solid #666666;
  border-radius: 6px;
}

.custom-select .selected {
  border-radius: 6px;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  justify-content: space-between;
}

.selected img,
.items div img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.selected,
.items div {
  display: flex;
  align-items: center;
  padding: 0 1em;
}

.custom-select .selected.open {
  /* border: 1px solid var(--primary); */
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
  height: 150px;
  border-radius: 4px;
  overflow-x: hidden;
  border: 1px solid #9a9996;
  position: absolute;
  left: 0;
  top: 54px;
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
  background-color: var(--primary);
}

.option-img {
  margin-right: 5px;
}

.selectHide {
  display: none;
}

@media (max-width: 500px) {
  .text-select {
    /* width: 80px; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
