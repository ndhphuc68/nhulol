<script setup>
import { ref } from "vue";
import BannerPage from "@/components/G2casino/BannerPage";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import PickBank from "./PickBank";
import { useForm } from "vee-validate";
import { schemaSignup } from "./schema";
import { signUpRequest } from "@/api/auth/request";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import router from "@/router";

const { handleSubmit, useFieldModel, resetForm, errors } = useForm({
  validationSchema: schemaSignup,
});
const { t } = useI18n();
const store = useStore();
// const confirmPassword = ref("");
const [
  account,
  nickname,
  password,
  confirmPassword,
  phone,
  bank_account,
  bank_name,
  bank_number,
  domain_info, //testagent
] = useFieldModel([
  "account",
  "nickname",
  "password",
  "confirmPassword",
  "phone",
  "accountHolder",
  "bankName",
  "bankNumber",
  "partnerCode",
]);

const isViewPickBank = ref(false);

const handleToggleViewPickBank = () => {
  isViewPickBank.value = !isViewPickBank.value;
};

const handleChangeBankName = (name) => {
  if (name) {
    bank_name.value = name;
  }
};

const onSubmit = handleSubmit(async (values) => {
  const data = {
    account: values.account,
    password: values.password,
    nickname: values.nickname,
    phone: values.phone,
    domain_info: values.partnerCode,
    bank_name: values.bankName,
    bank_account: values.accountHolder,
    bank_number: values.bankNumber,
    voter_account: values.partnerCode,
    withdraw_pass: "",
  };
  const res = await signUpRequest(data);
  try {
    if (res?.is_success) {
      await store.dispatch("showAlert", {
        type: "success",
        message: t(res?.message), //가입을 축하드립니다. 관리자 승인후 이용이가능하시니 잠시만 기달려주세요.
      });
      document.querySelector("html").style.overflowY = "scroll";
      await router.push({ name: "Login" });
      resetForm();
    } else {
      await store.dispatch("showAlert", {
        type: "error",
        message: t(res?.message),
      });
    }
  } catch {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signup-error"),
    });
  }
});
</script>

<template>
  <div class="signup-container">
    <BannerPage :page="$t('signup')" />
    <PickBank
      v-if="isViewPickBank"
      :handle-change-bank-name="handleChangeBankName"
      :handle-close="handleToggleViewPickBank"
    />
    <div class="container">
      <form @submit.prevent="onSubmit">
        <div class="row">
          <div class="title-group">
            <h1>
              {{ $t("signup") }}
            </h1>
          </div>
          <div class="col-md-6 col-12">
            <div class="form-item">
              <label for="username">{{ $t("account") }}</label>
              <InputText
                type="text"
                v-model="account"
                :class="{ 'p-invalid': errors?.account }"
              />
              <small class="p-error" id="text-error">{{
                errors?.account || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="username"
                :class="{ 'p-invalid': errors?.nickname }"
                >{{ $t("nickname") }}</label
              >
              <InputText
                :class="{ 'p-invalid': errors?.nickname }"
                type="text"
                v-model="nickname"
              />
              <small class="p-error" id="text-error">{{
                errors?.nickname || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="password"
                :class="{ 'p-invalid': errors?.password }"
                >{{ $t("password") }}</label
              >
              <InputText
                type="password"
                v-model="password"
                toggleMask
                :class="{ 'p-invalid': errors?.password }"
                :pt="{
                  panel: { class: 'panelPasswordLogin' },
                }"
              />
              <small class="p-error" id="text-error">{{
                errors?.password || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="confirmPassword"
                :class="{ 'p-invalid': errors?.confirmPassword }"
                >{{ $t("confirmPassword") }}</label
              >
              <InputText
                type="password"
                v-model="confirmPassword"
                toggleMask
                :class="{ 'p-invalid': errors?.confirmPassword }"
                :pt="{
                  panel: { class: 'panelPasswordLogin' },
                }"
              />
              <small class="p-error" id="text-error">{{
                errors?.confirmPassword || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label for="username" :class="{ 'p-invalid': errors?.phone }">{{
                $t("phoneNumber")
              }}</label>
              <InputText
                :class="{ 'p-invalid': errors?.phone }"
                type="number"
                v-model="phone"
              />
              <small class="p-error" id="text-error">{{
                errors?.phone || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="accountHolder"
                :class="{ 'p-invalid': errors?.accountHolder }"
                >{{ $t("accountHolder") }}</label
              >

              <InputText
                :class="{ 'p-invalid': errors?.accountHolder }"
                type="text"
                v-model="bank_account"
              />
              <small class="p-error" id="text-error">{{
                errors?.accountHolder || "&nbsp;"
              }}</small>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="form-item position-relative">
              <label
                for="bankName"
                :class="{ 'p-invalid': errors?.bankName }"
                >{{ $t("bankName") }}</label
              >
              <div
                @click="handleToggleViewPickBank"
                style="
                  position: absolute;
                  z-index: 1;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                "
              ></div>
              <InputText type="text" v-model="bank_name" disabled />
              <small class="p-error" id="text-error">{{
                errors?.bankName || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="bankAccount"
                :class="{ 'p-invalid': errors?.bankNumber }"
                >{{ $t("banknumber") }}</label
              >
              <InputText type="number" v-model="bank_number" />
              <small class="p-error" id="text-error">{{
                errors?.bankNumber || "&nbsp;"
              }}</small>
            </div>
            <div class="form-item">
              <label
                for="partnerCode"
                :class="{ 'p-invalid': errors?.partnerCode }"
                >{{ $t("partnerCode") }}</label
              >
              <InputText type="text" v-model="domain_info" />
              <small class="p-error" id="text-error">{{
                errors?.partnerCode || "&nbsp;"
              }}</small>
            </div>
            <div class="form-bottom d-flex">
              <Button type="submit" class="button">{{ $t("signup") }}</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signup-container {
  .container {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .title-group {
    text-align: left;
    margin-top: 1rem;
  }

  form {
    .form-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: 1.25rem 0;

      input {
        width: 100%;
      }

      label {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>

<style lang="scss">
.signup-container {
  .button {
    background-color: var(--primaryG2Casino);
    justify-content: center;
    margin-left: auto;
    color: #ffffff;
  }

  .form-item {
    .p-password {
      width: 100%;

      input {
        width: 100%;
        padding-right: 2.5rem;
      }
    }
  }
}

.panelPasswordLogin {
  display: none;
}
</style>
