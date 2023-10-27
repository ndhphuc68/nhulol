<script setup>
import IconSuccessInput from "@/assets/Play4G/icon/Commons/CheckSuccess.vue";
import { defineProps } from "vue";

const props = defineProps({
    style: {},
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
  icon: {
     type: String,
      default: null
  }
});
</script>

<template>
  <div class="input-check" :class="`input ${props.isCheck === 'cross' ? 'invalid' : ''}`">
    
    <span v-if="props.icon"   class="icon" v-html="icon"></span>
    <input
        autocomplete="false"
        :style="style"
      :disabled="props.disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.type"
      :placeholder="props.placeholder"
    />
    <div v-if="props.isShowCheck" class="div-image d-flex align-items-center">
      <IconSuccessInput v-if="props.isCheck === 'check'" alt="check" />
<!--      <IconErrorInput v-if="props.isCheck === 'cross'" alt="check" />-->
      <!-- <button v-if="props.isButton" class="btn-input">Duplicate Check</button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-check {
  position: relative;
  background: var(--inputFillPlay4G);
  display:flex;
  align-items:center;
  border-radius: 8px;
  padding: 12px 28px 12px 14px;
  
  .icon {
    color:#52525B
  }
  input {
    width: 100%;
    font-size: 14px;
    color: var(--textPlay4G);
    padding-left:10px;
    border:none;
    outline:none;
  

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

  &.invalid {
    border: 1px solid rgb(153, 35, 35);
  }

  .div-image {
    position: absolute;
    right: 10px;
    z-index: 2;
    top: 17px;

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
