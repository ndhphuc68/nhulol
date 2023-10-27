<script setup>
import { useStore } from "vuex";
import { computed, defineEmits, ref, watchEffect } from "vue";
import { useForm } from "vee-validate";
import { schema } from "./schema";
import InputCheck from "@/components/PlayG3/Input/InputCheck";
import { useI18n } from "vue-i18n";

const store = useStore();
const userInfo = computed(() => store.state.user.userInfor);
const element = document.getElementById("profile");

const emit = defineEmits(["handleChangeTab"]);
const { t } = useI18n();

const banks = ref([
  { name: "bank_kb" },
  { name: "bank_kakao" },
  { name: "bank_nhbank" },
  { name: "bank_nh" },
  { name: "bank_sh" },
  { name: "bank_wr" },
  { name: "bank_hn" },
  { name: "bank_sc" },
  { name: "bank_ibk" },
  { name: "bank_bnk" },
  { name: "bank_dgb" },
  { name: "bank_pb" },
  { name: "bank_kjb" },
  { name: "bank_mg" },
  { name: "bank_kbank" },
  { name: "bank_sbi" },
  { name: "bank_keb" },
  { name: "bank_citi" },
  { name: "bank_cnh" },
  { name: "bank_cu" },
]);

const { handleSubmit, useFieldModel, errors, setFieldValue, setFieldError } =
  useForm({
    validationSchema: schema,
    initialValues: {
      nickName: userInfo?.value?.me_nickname,
      phone: userInfo?.value?.me_phone,
      bankName: userInfo?.value?.me_bank_name,
      bankAccount: userInfo?.value?.me_bank_account,
      bankNumber: userInfo?.value?.me_bank_number,
      password: "",
      confirmPassword: "",
    },
  });

const [
  nickName,
  password,
  confirmPassword,
  phone,
  bankName,
  bankAccount,
  bankNumber,
] = useFieldModel([
  "nickName",
  "password",
  "confirmPassword",
  "phone",
  "bankName",
  "bankAccount",
  "bankNumber",
]);

const onSubmit = handleSubmit(async (values) => {
  if (!errors.value.password) {
    store.commit("handleUpdateLoading", true);
    const data = {
      Password: values.password,
      NickName:
        values.nickName !== userInfo?.value?.me_nickname
          ? values.nickName
          : undefined,
      PhoneNumber: values.phone,
      BankName: values.bankName,
      BankNumber: values.bankNumber,
      BankAccount: values.bankAccount,
    };
    const res = await store.dispatch("changeProfileAction", data);
    store.commit("handleUpdateLoading", false);
    res?.is_success && emit("handleChangeTab", 0);
    element.scrollIntoView({ behavior: "smooth" });
  }
});

watchEffect(() => {
  password.value.length < 6 || password.value.length > 16
    ? setFieldError("password", t("signuperrorPamore6"))
    : setFieldError(
        "password",
        errors.value.password ? errors.value.password : ""
      );
  password.value.includes(" ")
    ? setFieldError("password", t("signuperrorSpace"))
    : setFieldError(
        "password",
        errors.value.password ? errors.value.password : ""
      );
  password.value.length === 0 && setFieldError("password", "");
});
</script>

<template>
  <div class="edit-info">
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="info-group">
            <h4 class="title">
              {{ $t("account") }}
            </h4>
            <div class="field">
              <label>{{ $t("nickname") }}</label>
              <InputCheck
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                v-model="nickName"
                type="text"
              />
              <p class="p-error" id="text-error">
                {{ errors.nickName || "&nbsp;" }}
              </p>
            </div>
            <div class="field">
              <label>{{ $t("phoneNumber") }}</label>
              <InputCheck
                v-model="phone"
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                type="number"
              />
              <p class="p-error" id="text-error">
                {{ errors.phone || "&nbsp;" }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="info-group">
            <h4 class="title">
              {{ $t("password") }}
            </h4>
            <div class="field">
              <label> {{ $t("password") }}</label>
              <InputCheck
                v-model="password"
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                :value="''"
                type="password"
              />
              <p v-if="errors.password" class="p-error" id="text-error">
                {{ errors.password }}
              </p>
              <p v-else class="p-error" id="text-error">
                {{ "&nbsp;" }}
              </p>
            </div>
            <div class="field">
              <label> {{ $t("confirmpassword") }}</label>
              <InputCheck
                v-model="confirmPassword"
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                :value="''"
                type="password"
              />
              <p class="p-error" id="text-error">
                {{ errors.confirmPassword || "&nbsp;" }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="info-group">
            <h4 class="title">
              {{ $t("bank") }}
            </h4>
            <div class="field">
              <label class="label">{{ $t("bankName") }}</label>
              <div :class="`dropdown ${errors.bankName ? 'invalid' : ''}`">
                <div
                  aria-expanded="false"
                  class="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  {{ bankName ? $t(bankName.toUpperCase()) : $t("bankName") }}
                </div>
                <ul class="dropdown-menu">
                  <li
                    v-for="(option, index) in banks"
                    :key="index"
                    @click="setFieldValue('bankName', $t(option.name))"
                    :class="option.name === bankName ? 'active' : ''"
                  >
                    <img
                      alt="ok logo"
                      :src="
                        require(`@/assets/PlayG3/bank/banklogo_${
                          index + 1
                        }.png`)
                      "
                      class="dropdown-option-image"
                      style="height: 20px"
                    />
                    <span class="dropdown-option-label">{{
                      $t(option.name)
                    }}</span>
                  </li>
                </ul>
              </div>
              <p class="p-error" id="text-error">
                {{ errors?.bankName || "&nbsp;" }}
              </p>
            </div>
            <div class="field">
              <label> {{ $t("bankAccount") }}</label>
              <InputCheck
                v-model="bankAccount"
                :isCheck="errors.bankAccount ? 'cross' : 'check'"
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                type="text"
              />
              <p class="p-error" id="text-error">
                {{ errors.bankAccount || "&nbsp;" }}
              </p>
            </div>
            <div class="field">
              <label> {{ $t("banknumber") }}</label>
              <InputCheck
                v-model="bankNumber"
                :isCheck="errors.bankNumber ? 'cross' : 'check'"
                :style="{ border: '1px solid #6A6675', background: 'unset' }"
                type="number"
              />
              <p class="p-error" id="text-error">
                {{ errors.bankNumber || "&nbsp;" }}
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-end btn-group">
          <button type="submit" class="btn-edit btn-contained btn-edit">
            {{ $t("save") }}
          </button>
          <button
            class="btn-cancel btn-hover"
            @click="$emit('handleChangeTab', 0)"
          >
            {{ $t("cancel") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.edit-info {
  max-width: 1200px;
  margin: 0 auto;

  .btn-group {
    max-width: 85%;
    align-items: center;

    .btn-edit {
      margin-right: 20px;
      padding: 10px 30px;
    }
  }

  .p-error {
    font-size: 13px;
  }
}

form {
  .info-group {
    margin: 24px auto;
    width: 85%;
    @media (max-width: 768px) {
      width: 100%;

      .p-error {
        margin-bottom: 0.1rem;
        font-size: 12px;
      }
    }

    .title {
      margin-bottom: 18px;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    margin: 22px 0;

    label {
      color: #a1a1aa;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 6px;
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }

    input {
      padding: 8px 12px;
      margin-top: 5px;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #6a6675;

      @media (max-width: 768px) {
        font-size: 12px;
      }

      &:disabled {
        border: none;
        padding: 8px 0px;
      }

      &:focus {
        outline: none;
      }
    }

    .dropdown {
      padding: 12px 14px;
      border-radius: 8px;
      width: 100%;
      border: 1px solid #6a6675;
      //background: #a9a9a9;
      position: relative;

      .dropdown-option-label {
        font-size: 14px;
        opacity: 0.9;
        cursor: pointer;
        color: #a1a1aa;
      }

      .dropdown-toggle {
        font-size: 14px;
        color: #fff;

        &::after {
          display: none;
        }
      }

      .dropdown-menu {
        height: 300px;
        overflow-y: scroll;
        transform: translate(0px, 50px) !important;
        width: 100%;

        &::-webkit-scrollbar {
          width: 0;
        }

        li {
          padding: 5px 20px;
          width: 100%;

          img {
            margin-right: 10px;
          }

          &:hover {
            transform: scale(0.98);
            transition: all linear 0.2s;
            background: #90caf9;
          }
        }

        .active {
          background: #90caf9;
        }
      }
    }
  }

  .btn-save {
    display: flex;

    button {
      color: var(--neutral-900, #18181b);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--neutral-200, #e4e4e7);

      &:hover,
      &:focus {
        background: #254ee0;
        color: #ffffff;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

@media (max-width: 768px) {
}
</style>
