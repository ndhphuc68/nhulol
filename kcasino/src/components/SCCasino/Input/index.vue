<script setup>
import IconUser from "@/assets/SCCasino/icon/IconUser.vue";
import { defineProps, ref } from "vue";
import IconEye from "@/assets/SCCasino/icon/IconEye.vue";

const showPassword = ref(false);

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  stylesInput: {
    type: Object,
    default: () => {},
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const handleShowPassword = () => {
  if (props.icon === "eye") {
    showPassword.value = !showPassword.value;
  }
};
</script>

<template>
  <div class="inputWithIcon">
    <input
      :style="props.stylesInput"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="!showPassword ? props.type : 'text'"
      :placeholder="props.placeholder"
    />
    <IconUser v-if="props.icon === 'user'" class="icon" />
    <IconEye
      @click="handleShowPassword"
      v-if="props.icon === 'eye'"
      class="icon"
    />
  </div>
</template>

<style scoped>
input[type="password"],
input[type="text"] {
  width: 100%;
  border: 1px solid var(--primarySCCasino);
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

input[type="password"]:focus,
input[type="text"]:focus {
  border-color: var(--light-gradient);
  box-shadow: 0 0 8px 0 dodgerBlue;
}

.inputWithIcon input[type="password"],
.inputWithIcon input[type="text"] {
  padding-left: 45px;
}

.inputWithIcon {
  position: relative;
}

.inputWithIcon .icon {
  position: absolute;
  left: 5px;
  top: 8px;
  padding: 9px 8px;
  color: #aaa;
  transition: 0.3s;
}

.inputWithIcon input[type="password"]:focus + .icon,
.inputWithIcon input[type="text"]:focus + .icon {
  color: dodgerBlue;
}

.inputWithIcon.inputIconBg .icon {
  background-color: #aaa;
  color: #fff;
  padding: 9px 4px;
  border-radius: 4px 0 0 4px;
}

.inputWithIcon.inputIconBg input[type="password"]:focus + .icon,
.inputWithIcon.inputIconBg input[type="text"]:focus + .icon {
  color: #fff;
  background-color: dodgerBlue;
}
</style>
