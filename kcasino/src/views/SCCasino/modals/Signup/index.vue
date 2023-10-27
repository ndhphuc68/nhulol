<template>
  <div class="signup-main d-flex flex-md-row justify-content-between">
    <div class="signup-image-desktop">
      <img :src="Images.signup" alt="signup" class="image-desktop" />
      <div class="clip-path" :style="tab === 2 ? 'top:63%' : ''" />
      <div class="content">
        <div class="general tab" @click="tab = 1">
          {{ $t("generalInfomation") }}
        </div>
        <div
          class="tab"
          @click="handleNextForm"
          :class="`bank-account ${tab === 1 ? 'opacity' : ''}`"
        >
          {{ $t("bankAccountInfomation") }}
        </div>
      </div>
      <div class="text">
        {{ $t("textSignup")
        }}<span @click="handleLogin"> &nbsp;{{ $t("loginHere") }}</span>
      </div>
    </div>
    <div class="signup-image-mobile">
      <img :src="Images.signupMobile" alt="signup" class="image-mobile" />
      <div class="content">
        <div class="general" v-if="tab === 1">
          {{ $t("generalInfomation") }}
        </div>
        <div class="bank-account" v-else>{{ $t("bankAccountInfomation") }}</div>
      </div>
      <IconArrowLeft class="icon-back" @click="handleBack" />
      <div class="clip-path" />
      <div class="text">
        {{ $t("textSignup") }}
        <span @click="handleLogin"> &nbsp;{{ $t("loginHere") }}</span>
      </div>
    </div>
    <div
      class="signup-form px-16 py-6 d-flex flex-column justify-content-center"
    >
      <span class="title-signup">{{ $t("signup") }}</span>
      <div class="gereral" v-if="tab === 1">
        <form @submit="handleNextForm">
          <div class="field">
            <div class="label">
              <IconUserSignup />
              {{ $t("id") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.account"
              :isShowCheck="true"
              :isCheck="errorSignUp?.account ? 'cross' : 'check'"
              :placeholder="`${$t('plaId')}`"
              @click="errorSignUp.account = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp?.account || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconUserSignup />
              {{ $t("nickname") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.nickname"
              :isShowCheck="true"
              :isCheck="errorSignUp?.nickname ? 'cross' : 'check'"
              :placeholder="`${$t('nickname')}`"
              @click="errorSignUp.nickname = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp?.nickname || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconMobile />
              {{ $t("mobileNo") }}.*
            </div>
            <InputCheck
              v-model="dataSignUp.phone"
              :isShowCheck="true"
              :isCheck="errorSignUp?.phone ? 'cross' : 'check'"
              :placeholder="`${$t('plaPhone')}`"
              :type="'number'"
              @click="errorSignUp.phone = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp?.phone || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconKey />
              {{ $t("password") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.password"
              :isShowCheck="true"
              :isCheck="errorSignUp?.password ? 'cross' : 'check'"
              :placeholder="`${$t('password')}`"
              :type="'password'"
              @click="errorSignUp.password = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp?.password || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconKey />
              {{ $t("confirmPassword") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.confirm_password"
              :isShowCheck="true"
              :isCheck="errorSignUp?.confirm_password ? 'cross' : 'check'"
              :placeholder="`${$t('plaConfirmPass')}`"
              :type="'password'"
              @click="errorSignUp.confirm_password = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp?.confirm_password || "&nbsp;"
            }}</small>
          </div>
          <!--          <div class="field">-->
          <!--            <div class="label">-->
          <!--              <IconHolder/>-->
          <!--              {{ $t("withdrawPassword") }}*-->
          <!--            </div>-->
          <!--            <InputCheck-->
          <!--              v-model="dataSignUp.withdraw_password"-->
          <!--              :isShowCheck="true"-->
          <!--              :isCheck="errorSignUp?.withdraw_password ? 'cross' : 'check'"-->
          <!--              :placeholder="`${$t('plaWithdrawPass')}`"-->
          <!--              :type="'password'"-->
          <!--              @click="errorSignUp.withdraw_password = ''"-->
          <!--            />-->
          <!--            <small class="p-error" id="text-error">{{-->
          <!--                errorSignUp?.withdraw_password || "&nbsp;"-->
          <!--              }}</small>-->
          <!--          </div>-->
          <button type="submit" class="btn-modal mb-3 btn-guest w-100 py-2">
            {{ $t("next") }}
          </button>
        </form>
      </div>
      <div class="bank" v-else>
        <form @submit="handleSignup">
          <div class="field">
            <div class="label">
              <IconHolder />
              {{ $t("holder") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.bank_account"
              :isShowCheck="true"
              :isCheck="errorSignUp.bank_account ? 'cross' : 'check'"
              :placeholder="`${$t('plaHolder')}`"
              @click="errorSignUp.bank_account = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp.bank_account || "&nbsp;"
            }}</small>
          </div>
          <div class="field" @click.self="handleSelect(true)">
            <div class="label">
              <IconBank />
              {{ $t("bankName") }}*
            </div>
            <div class="dropdown">
              <div
                aria-expanded="false"
                class="dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
              >
                {{ $t(selectOption?.name) || $t("plaBank") }}
              </div>
              <ul class="dropdown-menu">
                <li
                  v-for="(option, index) in banks"
                  :key="index"
                  @click="
                    handleSelectOption(option);
                    errorSignUp.bank_name = '';
                  "
                  :class="option.name === selectOption.name ? 'active' : ''"
                >
                  <img
                    :src="
                      require(`@/assets/SCCasino/bank/banklogo_${
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
            <small class="p-error" id="text-error">{{
              errorSignUp?.bank_name || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconAccountNumber />
              {{ $t("accountNumber") }}*
            </div>
            <InputCheck
              v-model="dataSignUp.bank_number"
              :isShowCheck="true"
              :isCheck="errorSignUp.bank_number ? 'cross' : 'check'"
              :placeholder="`${$t('plaAccountNumber')}`"
              :type="'number'"
              @click="errorSignUp.bank_number = ''"
            />
            <small class="p-error" id="text-error">{{
              errorSignUp.bank_number || "&nbsp;"
            }}</small>
          </div>
          <div class="field">
            <div class="label">
              <IconRefCode />
              {{ $t("refCode") }}
            </div>
            <InputCheck
              v-model="dataSignUp.ref_code"
              :placeholder="`${$t('refCode')}`"
            />
            <small class="p-error" id="text-error">{{ "&nbsp;" }}</small>
          </div>
          <button type="submit" class="btn-modal mb-3 btn-guest w-100 py-2">
            {{ $t("signupNow") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Images } from "@/const/SCCasino/Images";
import IconKey from "@/assets/SCCasino/icon/IconKey.vue";
import IconUserSignup from "@/assets/SCCasino/icon/IconUserSignup.vue";
import IconMobile from "@/assets/SCCasino/icon/IconMobile.vue";
import InputCheck from "@/components/SCCasino/Input/InputCheck";
import IconArrowLeft from "@/assets/SCCasino/icon/IconArrowLeft.vue";
import IconBank from "@/assets/SCCasino/icon/IconBank.vue";
import IconAccountNumber from "@/assets/SCCasino/icon/IconAccountNumber.vue";
import IconRefCode from "@/assets/SCCasino/icon/IconRefCode.vue";
import IconHolder from "@/assets/SCCasino/icon/IconHolder.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { signUpRequest } from "@/api/auth/request";

const store = useStore();
const { t } = useI18n();
const tab = ref(1);

const selectOption = ref({
  name: "",
});

const dataSignUp = ref({
  account: "",
  password: "",
  nickname: "",
  phone: "",
  domain_info: "", //testagent
  bank_name: "",
  bank_account: "",
  bank_number: "",
  voter_account: "",
  withdraw_password: "",
  confirm_password: "",
  ref_code: "",
});

const errorSignUp = ref({
  account: "",
  password: "",
  nickname: "",
  phone: "",
  domain_info: "", //testagent
  bank_name: "",
  bank_account: "",
  bank_number: "",
  voter_account: "",
  withdraw_password: "",
  confirm_password: "",
});

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

const validateSignUp = () => {
  let check = true;
  if (!dataSignUp.value.account.trim()) {
    errorSignUp.value.account = t("signuperroraccount");
    check = false;
  } else if (dataSignUp.value.account.trim().length < 4) {
    errorSignUp.value.account = t("signuperrorAmore4");
    check = false;
  } else if (dataSignUp.value.account.trim().length > 20) {
    errorSignUp.value.account = t("signuperrorAmore20");
    check = false;
  } else if (dataSignUp.value.account.trim().includes(" ")) {
    errorSignUp.value.account = t("signuperrorSpace");
    check = false;
  }
  if (!dataSignUp.value.nickname.trim()) {
    errorSignUp.value.nickname = t("signuperrornickname");
    check = false;
  } else if (dataSignUp.value.nickname.trim().length < 4) {
    errorSignUp.value.nickname = t("signuperrorNmore4");
    check = false;
  } else if (dataSignUp.value.nickname.trim().length > 20) {
    errorSignUp.value.nickname = t("signuperrorNmore20");
    check = false;
  }
  if (!dataSignUp.value.phone) {
    errorSignUp.value.phone = t("signuperrorphone");
    check = false;
  }
  // else if (dataSignUp.value.phone.length !== 10) {
  //   errorSignUp.value.phone = t("signuperrorPmore10");
  //   check = false;
  // }
  if (!dataSignUp.value.password.trim()) {
    errorSignUp.value.password = t("signuperrorpassword");
    check = false;
  } else if (
    dataSignUp.value.password.trim().length < 6 ||
    dataSignUp.value.password.trim().length > 16
  ) {
    errorSignUp.value.password = t("signuperrorPamore6");
    check = false;
  } else if (dataSignUp.value.password.trim().includes(" ")) {
    errorSignUp.value.password = t("signuperrorSpace");
    check = false;
  }
  if (!dataSignUp.value.confirm_password) {
    errorSignUp.value.confirm_password = t("signuperrorpassword");
    check = false;
  } else if (dataSignUp.value.password !== dataSignUp.value.confirm_password) {
    errorSignUp.value.confirm_password = t("signuppasswordincorrect");
    check = false;
  }
  // if (!dataSignUp.value.withdraw_password) {
  //   errorSignUp.value.withdraw_password = t("signuperrorwithdrawpassword");
  //   check = false;
  // } else if (dataSignUp.value.withdraw_password.length < 6) {
  //   errorSignUp.value.withdraw_password = t("signuperrorWamore6");
  //   check = false;
  // }
  return check;
};

const validateNextFrom = () => {
  let check = true;
  if (!dataSignUp.value.bank_account) {
    errorSignUp.value.bank_account = t("signuperrorbankaccountname");
    check = false;
  } else if (
    dataSignUp.value.bank_account.length < 2 ||
    dataSignUp.value.bank_account.length > 5
  ) {
    errorSignUp.value.bank_account = t("signuperrorbankaccountnamelength");
    check = false;
  }
  if (!dataSignUp.value.bank_name) {
    errorSignUp.value.bank_name = t("signuperrorbankname");
    check = false;
  }
  if (!dataSignUp.value.bank_number) {
    errorSignUp.value.bank_number = t("signuperroraccountnumber");
    check = false;
  }
  return check;
};

const handleNextForm = (event) => {
  event.preventDefault();

  if (!validateSignUp()) {
    return;
  } else {
    tab.value = 2;
  }
};

const handleBack = () => {
  if (tab.value === 1) {
    store.commit("handleToggle", "signUp");
  } else {
    tab.value = 1;
  }
};

const handleLogin = () => {
  store.commit("handleToggle", "signUp");
  store.commit("handleToggle", "login");
};

const handleSelectOption = (option) => {
  selectOption.value = option;
  dataSignUp.value.bank_name = t(selectOption.value.name);
};

const handleSignup = async (event) => {
  event.preventDefault();
  if (validateNextFrom()) {
    dataSignUp;
    const data = {
      account: dataSignUp.value.account,
      password: dataSignUp.value.password,
      nickname: dataSignUp.value.nickname,
      phone: dataSignUp.value.phone,
      domain_info: dataSignUp.value.domain_info,
      bank_name: dataSignUp.value.bank_name,
      bank_account: dataSignUp.value.bank_account,
      bank_number: dataSignUp.value.bank_number,
      voter_account: dataSignUp.value.domain_info,
    };
    const res = await signUpRequest(data);
    try {
      if (res?.is_success) {
        await store.dispatch("showAlert", {
          type: "success",
          message: t(res?.message), //가입을 축하드립니다. 관리자 승인후 이용이가능하시니 잠시만 기달려주세요.
        });
        // document.querySelector("html").style.overflowY = "scroll";
        store.commit("handleToggle", "signUp");
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
  }
};
</script>

<style scoped lang="scss">
.signup-main {
  padding: 0;
  margin: 0;
  display: flex;
  height: 700px;
  overflow-y: auto;

  .signup-image-mobile {
    display: none;
  }

  .signup-image-desktop {
    position: relative;
    width: 45%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-mobile {
      display: none;
    }

    .content {
      width: 100%;
      position: absolute;
      top: 27%;
      left: 30%;
      z-index: 2;
      color: #fff;

      .tab {
        cursor: pointer;
      }

      .general,
      .bank-account {
        width: 220px;
        color: var(--50, #fafafa);
        font-size: 32px;
        font-weight: 600;
        text-align: left;
        position: relative;
        @media (max-width: 375px) {
          font-size: 20px !important;
        }
      }

      .general {
        margin-bottom: 150px;

        &::before {
          content: "1";
          position: absolute;
          z-index: 3;
          top: 0;
          left: -80px;
          width: 50px;
          height: 50px;
          border-radius: 100px;
          background: var(--600, #1976d2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        &::after {
          content: "";
          width: 1px;
          height: 200px;
          position: absolute;
          background: #fff;
          left: -55px;
        }
      }

      .bank-account {
        &::before {
          content: "2";
          position: absolute;
          z-index: 3;
          top: 0;
          left: -80px;
          width: 50px;
          height: 50px;
          border-radius: 100px;
          background: var(--600, #1976d2);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        @media (max-width: 375px) {
          font-size: 20px;
        }
      }

      .opacity {
        opacity: 0.5;
      }
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(1, 137, 255, 0.8);
      z-index: 1;
    }

    .clip-path {
      position: absolute;
      top: 33%;
      right: -29px;
      width: 30px;
      height: 20px;
      clip-path: polygon(0 0, 0% 100%, 56% 49%);
      background: rgba(1, 137, 255, 0.99);
      z-index: 1;
    }

    .text {
      position: absolute;
      width: 100%;
      bottom: 140px;
      color: rgb(165, 198, 226);
      z-index: 2;
      text-align: center;
      @media (max-width: 375px) {
        font-size: 12px;
      }
      span {
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .signup-form {
    width: 55%;

    .title-signup {
      color: var(--primarySCCasino);
      font-size: 24px;
      font-weight: 600;
    }

    form {
      text-align: left;

      .field {
        margin-bottom: 2px;

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
          font-size: 12px;
          margin-left: 5px;
        }
      }

      button {
        color: var(--bgSCCasino);
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        background: var(--primarySCCasino);
        padding: 10px 0;
        margin-top: 10px;

        &:hover {
          opacity: 0.8;
        }
      }

      .dropdown {
        border: 1px solid #d4d4d8;
        padding: 6px 10px;
        border-radius: 8px;
        width: 100%;
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
          transform: translate(0px, 39px) !important;
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
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: inherit !important;
    //overflow-y: auto !important;
    width: 100%;
    height: 100% !important;

    .signup-image-desktop {
      display: none;
    }

    .signup-image-mobile {
      width: 100%;
      height: 260px;
      display: block;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .content {
        /* width: 100%; */
        position: absolute;
        top: 120px;
        left: 30px;
        color: #fff;

        .bank-account {
          color: var(--50, #fafafa);
          font-size: 32px;
          font-weight: 600;
          text-align: left;
          position: relative;
          z-index: 2;
          @media (max-width: 375px) {
            font-size: 20px;
          }
          &::before {
            content: "2";
            position: absolute;
            z-index: 3;
            top: -50px;
            width: 50px;
            height: 50px;
            border-radius: 100px;
            background: rgb(2, 73, 143);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #fff;
          }
        }

        .general {
          color: var(--50, #fafafa);
          font-size: 32px;
          font-weight: 600;
          text-align: left;
          position: relative;
          z-index: 2;

          @media (max-width: 375px) {
            font-size: 20px;
          }

          &::before {
            content: "1";
            position: absolute;
            z-index: 3;
            top: -50px;
            width: 50px;
            height: 50px;
            border-radius: 100px;
            background: rgb(2, 73, 143);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #fff;
          }
        }
      }

      .clip-path {
        position: absolute;
        bottom: -29px;
        right: calc(50% - 10px);
        width: 20px;
        height: 30px;
        clip-path: polygon(0 0, 50% 70%, 100% 0);
        background: rgba(1, 137, 255, 1);
        z-index: 1;
      }

      .icon-back {
        position: absolute;
        top: 30px;
        left: 45px;
        z-index: 2;
        cursor: pointer;
        @media (max-width: 375px) {
          left: 25px;
        }
      }

      .text {
        position: absolute;
        left: 30px;
        bottom: 60px;
        color: rgb(165, 198, 226);
        z-index: 2;
        @media (max-width: 375px) {
          font-size: 12px;
        }
        span {
          color: #fff;
          cursor: pointer;
        }
      }

      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        background: rgba(1, 137, 255, 0.7);
        z-index: 1;
      }
    }

    .signup-form {
      width: 100%;
      padding: 40px 40px 0 40px !important;
    }
  }
}
</style>
