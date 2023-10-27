<script setup>
import { useStore } from "vuex";
import { computed, defineEmits, watchEffect } from "vue";
import { useForm } from "vee-validate";
import { schema } from "./schema";
import InputCheck from "@/components/EDGames/Input/InputCheck";
import Select from "@/components/EDGames/customs/Select";
import { useI18n } from "vue-i18n";

const store = useStore();
const userInfo = computed(() => store.state.user.userInfor);
const element = document.getElementById("profile");

const emit = defineEmits(["handleChangeTab"]);

const { t } = useI18n();
const banks = computed(() => [
  {
    key: "KOOKMIN BANK",
    value: {
      text: t("bank_kb"),
      img: require("@/assets/PlayG3/bank/banklogo_1.png"),
    },
  },
  {
    key: "KAKAO BANK",
    value: {
      text: t("bank_kakao"),
      img: require("@/assets/PlayG3/bank/banklogo_2.png"),
    },
  },
  {
    key: "NH BANK",
    value: {
      text: t("bank_nhbank"),
      img: require("@/assets/PlayG3/bank/banklogo_3.png"),
    },
  },
  {
    key: "NONGHYUP",
    value: {
      text: t("bank_nh"),
      img: require("@/assets/PlayG3/bank/banklogo_4.png"),
    },
  },
  {
    key: "SHINHAN BANK",
    value: {
      text: t("bank_sh"),
      img: require("@/assets/PlayG3/bank/banklogo_5.png"),
    },
  },
  {
    key: "WOORI BANK",
    value: {
      text: t("bank_wr"),
      img: require("@/assets/PlayG3/bank/banklogo_6.png"),
    },
  },
  {
    key: "HANA BANK",
    value: {
      text: t("bank_hn"),
      img: require("@/assets/PlayG3/bank/banklogo_7.png"),
    },
  },
  {
    key: "SC BANK",
    value: {
      text: t("bank_sc"),
      img: require("@/assets/PlayG3/bank/banklogo_8.png"),
    },
  },
  {
    key: "IBK",
    value: {
      text: t("bank_ibk"),
      img: require("@/assets/PlayG3/bank/banklogo_9.png"),
    },
  },
  {
    key: "BUSAN BANK",
    value: {
      text: t("bank_bnk"),
      img: require("@/assets/PlayG3/bank/banklogo_10.png"),
    },
  },
  {
    key: "Daegu Bank",
    value: {
      text: t("bank_dgb"),
      img: require("@/assets/PlayG3/bank/banklogo_11.png"),
    },
  },
  {
    key: "POST OFFICE BANK",
    value: {
      text: t("bank_pb"),
      img: require("@/assets/PlayG3/bank/banklogo_12.png"),
    },
  },
  {
    key: "KWANGJU BANK",
    value: {
      text: t("bank_kjb"),
      img: require("@/assets/PlayG3/bank/banklogo_13.png"),
    },
  },
  {
    key: "KFCC",
    value: {
      text: t("bank_mg"),
      img: require("@/assets/PlayG3/bank/banklogo_14.png"),
    },
  },
  {
    key: "K BANK",
    value: {
      text: t("bank_kbank"),
      img: require("@/assets/PlayG3/bank/banklogo_15.png"),
    },
  },
  {
    key: "SB",
    value: {
      text: t("bank_sbi"),
      img: require("@/assets/PlayG3/bank/banklogo_16.png"),
    },
  },
  {
    key: "KEB",
    value: {
      text: t("bank_keb"),
      img: require("@/assets/PlayG3/bank/banklogo_17.png"),
    },
  },
  {
    key: "CITI BANK",
    value: {
      text: t("bank_citi"),
      img: require("@/assets/PlayG3/bank/banklogo_18.png"),
    },
  },
  {
    key: "CHOOKHYUP",
    value: {
      text: t("bank_cnh"),
      img: require("@/assets/PlayG3/bank/banklogo_19.png"),
    },
  },
  {
    key: "SINHYUP",
    value: {
      text: t("bank_cu"),
      img: require("@/assets/PlayG3/bank/banklogo_20.png"),
    },
  },
]);

const { handleSubmit, useFieldModel, errors, setFieldError, setFieldValue } =
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

const onSubmit = handleSubmit(async (values) => {
  if (!errors.value.password) {
    if (
      values.nickName !== userInfo?.value?.me_nickname &&
      values.nickName.trim()
    ) {
      store.commit("handleUpdateLoading", true);
      const data = {
        Password: values.password,
        NickName:
          values.nickName !== userInfo?.value?.me_nickname
            ? values.nickName.trim()
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
  }
});
</script>

<template>
  <div class="edit-info">
    <form @submit.prevent="onSubmit">
      <div class="v-row">
        <div class="v-col-12 v-col-lg-4">
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

        <div class="v-col-12 v-col-lg-4">
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
              <p class="p-error" id="text-error">
                {{ errors.password || "&nbsp;" }}
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
        <div class="v-col-12 v-col-lg-4">
          <div class="info-group">
            <h4 class="title">
              {{ $t("bank") }}
            </h4>
            <div class="field">
              <label class="label">{{ $t("bankName") }}</label>
              <Select
                :default="bankName"
                :height="'50px'"
                :minWidth="'120px'"
                :tabIndex="0"
                @input="
                  (option) => {
                    setFieldValue('bankName', option.value.text);
                  }
                "
                :options="banks"
              />
              <p class="p-error" id="text-error">
                {{ errors?.bankName || "&nbsp;" }}
              </p>
            </div>
            <div class="field">
              <label> {{ $t("accountholder") }}</label>
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
        <div class="btn-group">
          <button type="submit" class="btn-save btn-contained">
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
.v-row {
  padding-bottom: 20px;
}
.edit-info {
  max-width: 1200px;
  margin: 0 auto;

  .btn-group {
    max-width: 100%;
    align-items: center;

    .btn-edit {
      margin-right: 20px;
      padding: 10px 30px;
    }
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
        font-size: 14px;
      }
    }

    @media (max-width: 375px) {
      margin: 5px auto;
    }

    .title {
      margin-bottom: 18px;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    margin: 22px 0;

    @media (max-width: 375px) {
      margin: 5px auto;
    }

    label {
      color: #a1a1aa;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 6px;
    }

    input {
      padding: 8px 12px;
      margin-top: 5px;
      color: #a1a1aa;
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
        color: #a1a1aa;

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
  .btn-group {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .btn-save {
    display: flex;
    background: var(--primary);
    color: #ffffff;
    padding: 10px 20px;
    margin-right: 20px;
    border-radius: 5px;
  }
  .btn-cancel {
    border-radius: 5px;
    padding: 8px 12px;
    border: 1px solid #bab3b3;
  }
}

@media (max-width: 768px) {
}
</style>
