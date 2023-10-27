<script setup>
import IconErrorInput from "@/assets/SCCasino/icon/IconErrorInput.vue";
import IconSuccessInput from "@/assets/SCCasino/icon/IconSuccessInput.vue";
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
</script>

<template>
  <div class="input-check">
    <input
      :disabled="props.disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.type"
      class="input"
      :placeholder="props.placeholder"
    />
    <div v-if="props.isShowCheck" class="div-image d-flex align-items-center">
      <IconSuccessInput v-if="props.isCheck === 'check'" alt="check" />
      <IconErrorInput v-if="props.isCheck === 'cross'" alt="check" />
      <!-- <button v-if="props.isButton" class="btn-input">Duplicate Check</button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-check {
  position: relative;

  input {
    width: 100%;
    padding: 6px 24px 6px 12px;
    border-radius: 8px;
    border: 1px solid #d4d4d8;
    font-size: 14px;

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  }

  .div-image {
    position: absolute;
    right: 8px;
    z-index: 2;
    top: 12px;

    svg {
      width: 12px;
      height: 12px;
    }

    .btn-input {
      border-radius: 16px;
      background: var(--neutral-200);
      padding: 4px 14px;
    }
  }
}
</style>
