<script setup>
import {schemaSignupBank} from "./schema";
import {ref, defineProps} from "vue";
import {useForm} from "vee-validate";
import {signUpRequest} from "@/api/auth/request";
import InputCheck from "@/components/Play4G/Input/InputCheck";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import BankIcon from '@/assets/Play4G/icon/Commons/bankIcon.vue'

const {handleSubmit, useFieldModel, errors, resetForm, setFieldValue} =
  useForm({
    validationSchema: schemaSignupBank,
  });
const props = defineProps({
  dataInfo: Object
});
console.log("dataInfo", props?.dataInfo)
const [
  accountHolder,
  bankName,
  bankNumber,
  partnerCode,
] = useFieldModel([
  "accountHolder",
  "bankName",
  "bankNumber",
  "partnerCode",
]);

const banks = ref([
  {name: "bank_kb"},
  {name: "bank_kakao"},
  {name: "bank_nhbank"},
  {name: "bank_nh"},
  {name: "bank_sh"},
  {name: "bank_wr"},
  {name: "bank_hn"},
  {name: "bank_sc"},
  {name: "bank_ibk"},
  {name: "bank_bnk"},
  {name: "bank_dgb"},
  {name: "bank_pb"},
  {name: "bank_kjb"},
  {name: "bank_mg"},
  {name: "bank_kbank"},
  {name: "bank_sbi"},
  {name: "bank_keb"},
  {name: "bank_citi"},
  {name: "bank_cnh"},
  {name: "bank_cu"},
]);
const {t} = useI18n();
const store = useStore();
const router = useRouter();
const onSubmit = handleSubmit(async (values) => {
  const data = {
    domain_info: values.partnerCode,
    bank_name: values.bankName,
    bank_account: values.accountHolder,
    bank_number: values.bankNumber,
    voter_account: values.partnerCode,
    withdraw_pass: "",
  };
  
  data.account = props.dataInfo?.value?.account;
  data.password = props.dataInfo?.value?.password;
  data.nickname = props.dataInfo?.value?.nickName;
  data.phone = props.dataInfo?.value.phone;
  
  console.log(data)
  // const res = await signUpRequest(data);
  // try {
  //   if (res?.is_success) {
  //     await store.dispatch("showAlert", {
  //       type: "success",
  //       message: t(res?.message), //가입을 축하드립니다. 관리자 승인후 이용이가능하시니 잠시만 기달려주세요.
  //     });
  //     // document.querySelector("html").style.overflowY = "scroll";
  //     await router.push("/");
  //     resetForm();
  //   } else {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t(res?.message),
  //     });
  //   }
  // } catch {
  //   await store.dispatch("showAlert", {
  //     type: "error",
  //     message: t("signup-error"),
  //   });
  // }
});

</script>

<template>
  <div class="signup-bank">
    <form @submit="onSubmit">
      <div>
        <div class="field">
          <div class="label">{{ $t("accountHolder") }}*</div>
          <InputCheck
            icon="<i class='pi pi-user'></i>"
            v-model="accountHolder"
            :isShowCheck="true"
            :isCheck="errors.accountHolder ? 'cross' : 'check'"
            :placeholder="`${$t('accountHolder')}`"
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
              class="dropdown-toggle d-flex align-center"
              data-bs-toggle="dropdown"
              type="button"
            >
              <component class="me-2" :is="BankIcon"/>
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
                  alt="ok logo"
                  :src="require(`@/assets/bank/banklogo_${index + 1}.png`)"
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
            icon="<i class='pi pi-sort-numeric-down'></i>"
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
          <div class="label">{{ $t("partnerCode") }}</div>
          <InputCheck
            icon="<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
          <path fill-rule='evenodd' clip-rule='evenodd' d='M7 2C7 3.10457 6.10457 4 5 4C3.89543 4 3 3.10457 3 2C3 0.89543 3.89543 0 5 0C6.10457 0 7 0.89543 7 2ZM5 4C3.34315 4 2 4.89543 2 6C2 7.10457 3.34315 8 5 8C6.65685 8 8 7.10457 8 6C8 4.89543 6.65685 4 5 4ZM16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16ZM16 16C17.6569 16 19 16.8954 19 18C19 19.1046 17.6569 20 16 20C14.3431 20 13 19.1046 13 18C13 16.8954 14.3431 16 16 16ZM9.25 1C9.25 0.585786 9.58579 0.25 10 0.25C15.3848 0.25 19.75 4.61522 19.75 10C19.75 10.4142 19.4142 10.75 19 10.75C18.5858 10.75 18.25 10.4142 18.25 10C18.25 5.44365 14.5563 1.75 10 1.75C9.58579 1.75 9.25 1.41421 9.25 1ZM1 9.25C1.41421 9.25 1.75 9.58579 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C10.4142 18.25 10.75 18.5858 10.75 19C10.75 19.4142 10.4142 19.75 10 19.75C4.61522 19.75 0.25 15.3848 0.25 10C0.25 9.58579 0.585786 9.25 1 9.25Z' fill='#52525B'/>
          </svg>"
            v-model="partnerCode"
            :placeholder="`${$t('partnerCode')}`"
          />
          <p class="p-error" id="text-error">{{ "&nbsp;" }}</p>
        </div>
      </div>
      <div class="group-btn w-100 d-flex justify-center">
        <button class="w-50 btn-hover" type="button" @click="$emit('handleActiveTab',0)">
          {{ $t('cancel') }}
        </button>
        <button type="submit" class="button btn-signup btn-rounded">{{
            $t("signup")
          }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.signup-bank {
  height: 80%;
}

form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn-signup {
  width: 40%;
  
  @media (max-width: 380px) {
    width: 50%;
  }
}
.dropdown {
  padding: 12px 14px;
  border-radius: 8px;
  width: 100%;
  background: var(--inputFillPlay4G);
  position: relative;
  
  .dropdown-option-label {
    font-size: 14px;
    opacity: 0.9;
    cursor: pointer;
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
</style>