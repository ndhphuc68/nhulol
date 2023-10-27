<template>
  <div class="signup-main">
    <h1 class="title-signup mb-8">{{ $t("signup") }}</h1>
    <div class="wrap-signup">
      <div class="w-50 image-signup">
        <img
          alt="banner-signup"
          src="@/assets/PlayG3/images/image-signup.png"
        />
      </div>
      <div class="signup-form w-50">
        <form @submit.prevent="handleSignup">
          <div class="field">
            <div class="label">{{ $t("account") }}*</div>
            <InputCheck
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
          <!-- <div class="field">
            <div class="label">{{ $t("withdrawPassword") }}*</div>
            <InputCheck
              v-model="withdrawPassword"
              :isShowCheck="true"
              :isCheck="errors.withdrawPassword ? 'cross' : 'check'"
              :placeholder="`${$t('withdrawPassword')}`"
              :type="'password'"
            />
            <p class="p-error" id="text-error">
              {{ errors.withdrawPassword || "&nbsp;" }}
            </p>
          </div> -->
          <div class="field">
            <div class="label">{{ $t("bankAccount") }}*</div>
            <InputCheck
              v-model="accountHolder"
              :isShowCheck="true"
              :isCheck="errors.accountHolder ? 'cross' : 'check'"
              :placeholder="`${$t('bankAccount')}`"
            />
            <p class="p-error" id="text-error">
              {{ errors.accountHolder || "&nbsp;" }}
            </p>
          </div>
          <div class="field">
            <div class="label">{{ $t("bankName") }}*</div>
            <div :class="`dropdown ${errors.bankName ? 'invalid' : ''}`">
              <div
                aria-expanded="false"
                class="dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
              >
                {{ bankName || $t("bankName") }}
              </div>
              <ul class="dropdown-menu">
                <li
                  v-for="(option, index) in banks"
                  :key="index"
                  @click="setFieldValue('bankName', $t(option.name))"
                  :class="option.name === bankName ? 'active' : ''"
                >
                  <img
                    :src="
                      require(`@/assets/PlayG3/bank/banklogo_${index + 1}.png`)
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
            <div class="label">{{ $t("banknumber") }}*</div>
            <InputCheck
              v-model="bankNumber"
              :isShowCheck="true"
              :isCheck="errors.bankNumber ? 'cross' : 'check'"
              :placeholder="`${$t('banknumber')}`"
              :type="'number'"
            />
            <p class="p-error" id="text-error">
              {{ errors.bankNumber || "&nbsp;" }}
            </p>
          </div>
          <div class="field">
            <div class="label">{{ $t("partnerCode") }}*</div>
            <InputCheck
              v-model="partnerCode"
              :placeholder="`${$t('partnerCode')}`"
            />
            <p class="p-error" id="text-error">{{ "&nbsp;" }}</p>
          </div>
          <div class="group-btn w-100">
            <button type="submit" class="btn-modal mb-3 btn-guest p-3">
              {{ $t("registerNow") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputCheck from "@/components/PlayG3/Input/InputCheck";
import { ref } from "vue";
import { useForm } from "vee-validate";
import { schemaSignup } from "./schema";

const { handleSubmit, useFieldModel, errors, setFieldValue } = useForm({
  validationSchema: schemaSignup,
});
const [
  account,
  nickName,
  password,
  confirmPassword,
  // withdrawPassword,
  accountHolder,
  bankName,
  bankNumber,
  partnerCode,
] = useFieldModel([
  "account",
  "nickName",
  "password",
  "confirmPassword",
  // "withdrawPassword",
  "accountHolder",
  "bankName",
  "bankNumber",
  "bankAccount",
  "partnerCode",
]);

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

const handleSignup = handleSubmit((value) => {
  console.log(value);
});
</script>

<style scoped lang="scss">
.signup-main {
  padding: 0;
  margin: 50px auto;
  width: 90%;
  max-width: 1440px;

  .wrap-signup {
    display: flex;
    justify-content: center;
  }

  .image-signup {
    img {
      width: 80%;
    }
  }

  .signup-form {
    form {
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      .field {
        margin-bottom: 2px;
        width: 50%;
        height: 100px;

        &:nth-child(2n + 1) {
          margin-right: 20px;
          width: calc(50% - 20px);
        }
        .label {
          color: #7a7a7a;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          margin-bottom: 5px;

          svg {
            margin-right: 5px;
          }
        }

        #text-error {
          font-size: 11px;
          line-height: 14px;
          margin-left: 2px;
        }
      }

      button {
        color: var(--textPlayG3);
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        background: var(--primaryPlayG3);
        padding: 10px 0;
        margin-top: 10px;
        transition: all 0.5s;

        &:hover {
          opacity: 0.8;
        }

        &:active {
          transform: scale(0.95);
          transition: all 0.5s;
        }
      }

      .dropdown {
        padding: 12px 14px;
        border-radius: 8px;
        width: 100%;
        background: rgba(26, 28, 32, 1);
        position: relative;

        .dropdown-option-label {
          font-size: 14px;
          opacity: 0.9;
          cursor: pointer;
        }

        .dropdown-toggle {
          font-size: 14px;
          color: #747579;
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

      .invalid {
        border: 1px solid rgb(153, 35, 35);
      }

      .group-btn {
        text-align: right;
      }
    }
  }

  @media (max-width: 992px) {
    width: 94%;

    .title-signup {
      text-align: center;
    }
    .wrap-signup {
      flex-direction: column;
    }

    .image-signup {
      width: 100% !important;
      text-align: center;
      margin-bottom: 20px;

      img {
        width: 60%;
      }
    }

    .signup-form {
      width: 100% !important;
      .field {
        width: 100% !important;
        margin-right: 0 !important;
      }

      .group-btn {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
