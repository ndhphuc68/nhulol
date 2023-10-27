<script setup>
import { Icons } from "@/const/Icons";
import { defineProps } from "vue";

const props = defineProps({
  isButton: {
    type: Boolean,
    default: false,
  },
  isCheck: {
    type: String,
    default: "",
  },
  isShowCheck: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
const onKeyPress = (event) => {
  if (props.type == "number") {
    if (event.keyCode === 101) {
      event.preventDefault();
    }
  }
};
</script>

<template>
  <div class="input-check">
    <input
      :disabled="props.disabled"
      :value="modelValue"
      @keypress="onKeyPress"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.type"
      class="input"
      :placeholder="props.placeholder"
    />
    <div v-if="props.isShowCheck" class="div-image d-flex align-items-center">
      <img
        v-if="props.isCheck === 'check'"
        class="image"
        :src="Icons.check"
        alt="check"
      />
      <img
        v-if="props.isCheck === 'cross'"
        class="image"
        :src="Icons.cross"
        alt="check"
      />
      <button v-if="props.isButton" class="btn-input">Duplicate Check</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-check {
  position: relative;

  .input {
    border: 1px solid var(--neutral-300);
    border-radius: 20px;
    background-color: var(--white);
    outline: none;
    padding: 8px 40px 8px 20px;
    box-sizing: border-box;
    transition: 0.3s;
    width: 100%;
  }

  .div-image {
    position: absolute;
    right: 8px;
    z-index: 2;
    top: 5px;

    .image {
      width: 30px;
      height: 30px;
    }

    .btn-input {
      border-radius: 16px;
      background: var(--neutral-200);
      padding: 4px 14px;
    }
  }
}
</style>
