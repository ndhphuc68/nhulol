<script setup>
import PickBank from "./Components/PickBank/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { signUpRequest } from "@/api/auth/request";

const { t } = useI18n();
const store = useStore();

const isViewPickBank = ref(false);
const confirmPassword = ref("");

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
  withdraw_pass: "",
});

const handleSignUp = async (e) => {
  e.preventDefault();
  store.commit("handleUpdateLoading", true);
  if (await validateSignUp()) {
    dataSignUp.value.voter_account = dataSignUp.value.domain_info;
    const res = await signUpRequest(dataSignUp.value);
    try {
      if (res?.is_success) {
        await store.dispatch("showAlert", {
          type: "success",
          message: t(res?.message), //가입을 축하드립니다. 관리자 승인후 이용이가능하시니 잠시만 기달려주세요.
        });
        document.querySelector("html").style.overflowY = "scroll";
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
  store.commit("handleUpdateLoading", false);
};

const validateSignUp = async () => {
  if (!dataSignUp.value.account) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccount"),
    });
    return false;
  } else if (dataSignUp.value.account < 4) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorAmore4"),
    });
    return false;
  }
  if (!dataSignUp.value.nickname) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrornickname"),
    });
    return false;
  } else if (dataSignUp.value.nickname < 4) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorNmore4"),
    });
    return false;
  }
  if (!dataSignUp.value.phone) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorphone"),
    });
    return false;
  }
  // else if (dataSignUp.value.phone.toString().length !== 10) {
  //   await store.dispatch("showAlert", {
  //     type: "error",
  //     message: t("signuperrorPmore10")
  //   });
  //   return false
  // }
  if (!dataSignUp.value.password) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorpassword"),
    });
    return false;
  } else if (dataSignUp.value.password.length < 6) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorPamore6"),
    });
    return false;
  }
  if (!confirmPassword.value) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorpassword"),
    });
    return false;
  } else if (dataSignUp.value.password !== confirmPassword.value) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuppasswordincorrect"),
    });
    return false;
  }
  if (!dataSignUp.value.bank_account) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorbankaccountname"),
    });
    return false;
  } else if (
    dataSignUp.value.bank_account.length < 2 ||
    dataSignUp.value.bank_account.length > 5
  ) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorbankaccountnamelength"),
    });
    return false;
  }
  if (!dataSignUp.value.bank_name) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorbankname"),
    });
    return false;
  }
  if (!dataSignUp.value.bank_number) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccountnumber"),
    });
    return false;
  }
  return true;
};

const handleToggleViewPickBank = () => {
  isViewPickBank.value = !isViewPickBank.value;
};
const handleChangeBankName = (name) => {
  if (name) {
    dataSignUp.value.bank_name = name;
  }
};

const onKeyPress = (event) => {
  if (event.keyCode === 101) {
    event.preventDefault();
  }
};

const onKeyPressPhone = (event) => {
  if ((event.keyCode === 101 && event.keyCode < 49) || event.keyCode > 57) {
    event.preventDefault();
  }
};
</script>

<template>
  <div class="popup-signUp">
    <div class="title mb-4 px-2">
      <h3>{{ $t("signup") }}</h3>
      <p>{{ $t("Pleascheck") }}</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <form>
            <div class="d-flex flex-column mb-3">
              <label for="userId">{{ $t("userId") }}</label>
              <input
                id="userId"
                v-model="dataSignUp.account"
                :placeholder="$t('enterUserId')"
                type="text"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="nickname">{{ $t("nickName") }}</label>
              <input
                v-model="dataSignUp.nickname"
                id="nickname"
                :placeholder="$t('enterNickName')"
                type="text"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="newpassword">{{ $t("Password") }}</label>
              <input
                v-model="dataSignUp.password"
                id="newpassword"
                :placeholder="$t('enterPassword')"
                type="password"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="password">{{ $t("confirmPassword") }}</label>
              <input
                v-model="confirmPassword"
                id="password"
                :placeholder="$t('enterConfirmPassword')"
                type="password"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="phonenumber">{{ $t("phoneNumber") }}</label>
              <input
                @keypress="onKeyPressPhone"
                v-model="dataSignUp.phone"
                id="phonenumber"
                :placeholder="$t('enterPhoneNumber')"
                type="text"
              />
            </div>
          </form>
        </div>
        <div class="col-12 col-md-6">
          <form action="">
            <div class="d-flex flex-column mb-3">
              <label for="bankaccount">{{ $t("bankAccount") }}</label>
              <input
                v-model="dataSignUp.bank_account"
                id="bankaccount"
                :placeholder="$t('enter-bank-account')"
                type="text"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="bankername">{{ $t("bankname") }}</label>
              <div @click="handleToggleViewPickBank">
                <input
                  disabled
                  id="bankername"
                  v-model="dataSignUp.bank_name"
                  :placeholder="$t('enter-bank-name')"
                  type="text"
                  style="position: relative; z-index: -1"
                />
              </div>
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="account">{{ $t("banknumber") }}</label>
              <input
                @keypress="onKeyPress"
                v-model="dataSignUp.bank_number"
                id="account"
                :placeholder="$t('warn-bank-number')"
                type="number"
              />
            </div>
            <div class="d-flex flex-column mb-3">
              <label for="partnercode">{{ $t("partnercode") }}</label>
              <input
                v-model="dataSignUp.domain_info"
                :placeholder="$t('enterPartnerCode')"
                type="text"
              />
            </div>
            <div class="submitSignup">
              <button @click="handleSignUp">{{ $t("signup") }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <PickBank
    v-if="isViewPickBank"
    :handle-change-bank-name="handleChangeBankName"
    :handle-close="handleToggleViewPickBank"
  />
</template>

<style lang="scss" scoped>
.popup-signUp {
  padding: 32px 72px;

  input {
    padding: 12px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 6px;
    margin: 10px 0;

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }
  }

  .submitSignup {
    text-align: right;

    button {
      background-color: #1e3eb3;
      color: #ffffff;
      padding: 12px 24px;
      border: 0;
      @media (max-width: 767.98px) {
        width: 100%;
      }
    }
  }
}

@media (max-width: 541px) {
  .popup-signUp {
    padding: 1.5rem 1rem;
  }
}
</style>
