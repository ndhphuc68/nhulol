<script setup>
import {useForm, useIsValidating} from "vee-validate";
import {schemaSignupInfo} from "@/views/Play4G/Modals/Signup/schema";
import InputCheck from "@/components/Play4G/Input/InputCheck";
import {computed, defineEmits, defineProps} from 'vue';
import {useStore} from "vuex";

const $emit = defineEmits(['handleActiveTab', 'setDataInfo']);
const store = useStore();


const {handleSubmit, useFieldModel, errors, resetForm, setFieldValue} =
  useForm({
    validationSchema: schemaSignupInfo,
  });
const [
  account,
  nickName,
  password,
  confirmPassword,
  phone
] = useFieldModel([
  "account",
  "nickName",
  "password",
  "confirmPassword",
  "phone"
]);

const handleLogin = () => {
  store.commit('handleToggle', 'signUp')
  store.commit('handleToggle', 'login')
}
const onSubmit = handleSubmit((data) => {
  $emit('setDataInfo', data);
  $emit('handleActiveTab', 1);
})

</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="label">{{ $t("account") }}*</div>
        <InputCheck
          :icon="`<i class='pi pi-user'></i>`"
          v-model="account"
          :isShowCheck="true"
          :isCheck="errors?.account ? 'cross' : 'check'"
          :placeholder="`${$t('account')}`"
        />
        <p class="p-error" id="text-error">
          {{ errors?.account || "&nbsp;" }}
        </p>
      </div>
      <div class="field">
        <div class="label">{{ $t("nickName") }}*</div>
        <InputCheck
          :icon="`<i class='pi pi-user'></i>`"
          v-model="nickName"
          :isShowCheck="true"
          :isCheck="errors?.nickName ? 'cross' : 'check'"
          :placeholder="`${$t('nickName')}`"
        />
        <p class="p-error" id="text-error">
          {{ errors.nickName || "&nbsp;" }}
        </p>
      </div>
      <div class="field">
        <div class="label">{{ $t("password") }}*</div>
        <InputCheck
          icon="<i class='pi pi-lock icon-password'></i>"
          v-model="password"
          :isShowCheck="true"
          :isCheck="errors?.password ? 'cross' : 'check'"
          :placeholder="`${$t('password')}`"
          :type="'password'"
        />
        <p class="p-error" id="text-error">
          {{ errors?.password || "&nbsp;" }}
        </p>
      </div>
      <div class="field">
        <div class="label">{{ $t("confirmPassword") }}*</div>
        <InputCheck
          icon="<i class='pi pi-lock icon-password'></i>"
          v-model="confirmPassword"
          :isShowCheck="true"
          :isCheck="errors?.confirmPassword ? 'cross' : 'check'"
          :placeholder="`${$t('confirmPassword')}`"
          :type="'password'"
        />
        <p class="p-error" id="text-error">
          {{ errors?.confirmPassword || "&nbsp;" }}
        </p>
      </div>
      <div class="field">
        <div class="label">{{ $t("phone") }}*</div>
        <InputCheck
          icon="<i class='pi pi-mobile'></i>"
          v-model="phone"
          :isShowCheck="true"
          :isCheck="errors?.phone ? 'cross' : 'check'"
          :placeholder="`${$t('phone')}`"
          :type="'number'"
        />
        <p class="p-error" id="text-error">
          {{ errors.phone || "&nbsp;" }}
        </p>
      </div>
      
      <div class="form-item w-100">
        <button type="submit" class="button btn-rounded w-100" >{{
            $t("next")
          }}
        </button>
      </div>
      <div class="form-bottom d-flex align-center">
        <p class="ma-0 mr-2">{{ $t("haveAccount") }}</p>
        <button @click="handleLogin" type="button" class="btn-signup btn-text">
          {{ $t("login") }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-bottom {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-desc)
}
</style>