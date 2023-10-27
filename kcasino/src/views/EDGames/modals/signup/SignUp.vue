<template>
  <Modal
    v-if="isShowPickBank"
    :handleClose="handleClosePickBank"
    :modal="'pickBank'"
    :styles="{
      width: '860px',
      height: '700px',
      border: 'none',
      overflow: 'hidden',
    }"
  >
    <PickBank
      :handleChangeBankName="handleChangeBankName"
      :handleClose="handleClosePickBank"
    />
  </Modal>
  <div class="signUp">
    <!-- <div class="logoInnerWrap">
      <img
        class="pl-6"
        alt="logo"
        height="43"
        src="@/assets/logo/sidebar/kcasino.png"
        width="191"
      />
    </div> -->
    <div class="formSignUp pb-10 pb-md-0">
      <h2>{{ $t("signup") }}</h2>
      <p class="des">{{ $t("signupWarning") }}</p>
      <div class="inputSignUp">
        <div class="inputSignUp-item">
          <div class="inputItem">
            <label for="userId">{{ $t("userId") }}</label>
            <input
              id="userId"
              :placeholder="$t('userId')"
              type="text"
              v-model="formSignup.account"
            />
            <div
              class="warn"
              :class="{
                fail: errorSignUp.account,
              }"
            >
              {{ errorSignUp.account }}
            </div>
          </div>

          <div class="inputItem">
            <label for="nickName">{{ $t("nickname") }}</label>
            <input
              id="nickName"
              :placeholder="$t('nickname')"
              type="text"
              v-model="formSignup.nickname"
            />
            <div
              class="warn"
              :class="{
                fail: errorSignUp.nickname,
              }"
            >
              {{ errorSignUp.nickname }}
            </div>
          </div>

          <div class="inputItem inputPassword">
            <label for="password">{{ $t("password") }}</label>
            <input
              id="password"
              :placeholder="$t('password')"
              :type="isHidePass ? 'text' : 'password'"
              v-model="formSignup.password"
            />
            <div
              class="warn"
              :class="{
                fail: errorSignUp.password,
              }"
            >
              {{ errorSignUp.password }}
            </div>
            <div class="iconHideShow" @click="isHidePass = !isHidePass">
              <v-icon
                v-if="isHidePass"
                size="medium"
                color="#71717A"
                icon="mdi-eye-outline"
              ></v-icon>
              <v-icon
                v-else
                size="medium"
                color="#71717A"
                icon="mdi-eye-off-outline"
              ></v-icon>
            </div>
          </div>

          <div class="inputItem inputPassword">
            <label for="confirmPassword">{{ $t("confirmpassword") }}</label>
            <input
              id="confirmPassword"
              :placeholder="$t('confirmpassword')"
              :type="isHideConfirm ? 'text' : 'password'"
              v-model="confirmPass"
            />
            <div
              class="warn"
              :class="{ fail: confirmPass != formSignup.password }"
            >
              {{ errorSignUp.confirmPassword }}
            </div>
            <div class="iconHideShow" @click="isHideConfirm = !isHideConfirm">
              <v-icon
                v-if="isHideConfirm"
                size="medium"
                color="#71717A"
                icon="mdi-eye-outline"
              ></v-icon>
              <v-icon
                v-else
                size="medium"
                color="#71717A"
                icon="mdi-eye-off-outline"
              ></v-icon>
            </div>
          </div>

          <div class="inputItem">
            <label for="phoneNumber">{{ $t("phonenumber") }}</label>
            <input
              @keypress="onKeyPress"
              id="phoneNumber"
              :placeholder="$t('phonenumber')"
              type="number"
              v-model="formSignup.phone"
            />
            <div class="warn" :class="{ fail: errorSignUp.phone }">
              {{ errorSignUp.phone }}
            </div>
          </div>

          <div class="inputItem">
            <label for="bankAccount">{{ $t("accountholder") }}</label>
            <input
              id="bankAccount"
              :placeholder="$t('bankaccount')"
              type="text"
              v-model="formSignup.bank_account"
            />
            <div
              class="warn"
              :class="{
                fail: errorSignUp.bank_account,
              }"
            >
              {{ errorSignUp.bank_account }}
            </div>
          </div>
        </div>
        <div class="inputSignUp-item">
          <div class="inputItem">
            <label for="bankName">{{ $t("bankname") }}</label>
            <div
              style="
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                z-index: 1;
              "
              @click="handleOpenPickBank"
            ></div>
            <input
              id="bankName"
              :placeholder="$t('bankname')"
              :value="formSignup.bank_name"
              disabled
              type="text"
            />
            <div class="warn" :class="{ fail: errorSignUp.bank_name }">
              {{ errorSignUp.bank_name }}
            </div>
          </div>

          <div class="inputItem">
            <label for="bankNumber">{{ $t("banknumber") }}</label>
            <input
              @keypress="onKeyPress"
              id="bankNumber"
              :placeholder="$t('banknumber')"
              type="number"
              v-model="formSignup.bank_number"
            />
            <div class="warn" :class="{ fail: errorSignUp.bank_number }">
              {{ errorSignUp.bank_number }}
            </div>
          </div>

          <div class="inputItem">
            <label for="partnerCode">{{ $t("partnercode") }}</label>
            <input
              id="partnerCode"
              :placeholder="$t('partnercode')"
              type="text"
              v-model="formSignup.domain_info"
            />
          </div>
        </div>
      </div>
      <div>
        <button class="buttonSubmit" type="submit" @click="handleSignUp">
          {{ $t("signup") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import Modal from "@/components/EDGames/modal/Modal";
import PickBank from "@/views/EDGames/modals/PickBank";
import { signUpRequest } from "@/api/auth/request";

const store = useStore();
const { t } = useI18n();
const isShowPickBank = ref(false);
const isHidePass = ref(false);
const isHideConfirm = ref(false);
const confirmPass = ref("");
const formSignup = reactive({
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
  /*JoinSmsNumber: 0*/
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
  withdraw_pass: "",
  confirmPassword: "",
});

const handleChangeBankName = (name) => {
  formSignup.bank_name = name;
};

const onKeyPress = (event) => {
  if (event.keyCode === 101) {
    event.preventDefault();
  }
};

const handleOpenPickBank = () => {
  isShowPickBank.value = true;
};

const handleClosePickBank = () => {
  isShowPickBank.value = false;
};

const checkSignUp = () => {
  errorSignUp.value = {
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
    confirmPassword: "",
  };
  let check = true;
  if (formSignup.account.trim() === "") {
    errorSignUp.value.account = t("signuperroraccount");
    check = false;
  } else if (formSignup.account.trim().length < 4) {
    errorSignUp.value.account = t("signuperrorAmore4");
    check = false;
  } else if (formSignup.account.trim().length > 20) {
    errorSignUp.value.account = t("signuperrorAmore20");
    check = false;
  } else if (formSignup.account.includes(" ")) {
    errorSignUp.value.account = t("signuperrorSpace");
    check = false;
  }
  if (formSignup.nickname.trim() === "") {
    errorSignUp.value.nickname = t("signuperrornickname");
    check = false;
  } else if (formSignup.nickname.trim().length < 4) {
    errorSignUp.value.nickname = t("signuperrorNmore4");
    check = false;
  } else if (formSignup.nickname.trim().length > 20) {
    errorSignUp.value.nickname = t("signuperrorNmore20");
    check = false;
  }
  if (!formSignup.phone) {
    errorSignUp.value.phone = t("signuperrorphone");
    check = false;
  }
  if (formSignup.password.trim() === "") {
    errorSignUp.value.password = t("signuperrorpassword");
    check = false;
  } else if (formSignup.password.trim().length < 6) {
    errorSignUp.value.password = t("signuperrorPamore6");
    check = false;
  } else if (formSignup.password.includes(" ")) {
    errorSignUp.value.password = t("signuperrorSpace");
    check = false;
  }
  if (confirmPass.value.trim() === "") {
    errorSignUp.value.confirmPassword = t("signuperrorpassword");
    check = false;
  } else if (formSignup.password.trim() !== confirmPass.value.trim()) {
    errorSignUp.value.confirmPassword = t("signuppasswordincorrect");
    check = false;
  }
  if (formSignup.bank_account.trim() === "") {
    errorSignUp.value.bank_account = t("signuperrorbankaccountname");
    check = false;
  } else if (
    formSignup.bank_account.trim().length < 2 ||
    formSignup.bank_account.trim().length > 5
  ) {
    errorSignUp.value.bank_account = t("signuperrorbankaccountnamelength");
    check = false;
  }
  if (formSignup.bank_name === "") {
    errorSignUp.value.bank_name = t("signuperrorbankname");
    check = false;
  }
  if (formSignup.bank_number === "") {
    errorSignUp.value.bank_number = t("signuperroraccountnumber");
    check = false;
  }
  return check;
};

const handleSignUp = async () => {
  if (!checkSignUp()) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("warn-signup"),
    });
    return;
  }
  formSignup.voter_account = formSignup.domain_info;
  const res = await signUpRequest(formSignup);
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
};
</script>

<style scoped>
.signUp {
  padding: 0;
  overflow: auto;
}

.logoInnerWrap {
  text-align: start;
  position: fixed;
  background-color: var(--bg);
  z-index: 10;
}

.formSignUp {
  padding: 0 48px;
  width: 80%;
  margin: auto;
  /* margin-top: 50px; */
  text-align: center;
  overflow-y: scroll;
}

.formSignUp::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.formSignUp h2 {
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
}

.formSignUp p {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  padding-bottom: 32px;
  margin-top: 10px;
}

.inputSignUp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
}

.inputSignUp-item {
  width: 40%;
  position: relative;
}

.inputSignUp-item:nth-child(1)::after {
  position: absolute;
  content: "";
  border: 1px solid #e4e4e7;
  width: 1px;
  height: 95%;
  top: 0;
  left: 125%;
}

.inputItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  position: relative;
}

input {
  width: 100%;
  margin-top: 4px;
  border: 1px solid #64748b;
  border-radius: 4px;
  padding: 8px 12px;
  color: #191d23 !important;
}

.inputPassword {
  position: relative;
}

.iconHideShow {
  position: absolute;
  right: 10px;
  top: 35px;
  cursor: pointer;
}

.warn {
  width: 100%;
  text-align: left;
  color: red;
  font-size: 12px;
  display: none;
}

.warn.fail {
  display: block;
}

label {
  width: 100%;
  text-align: left;
}

::placeholder {
  color: #e5e5e5;
}

.buttonSubmit {
  padding: 6px 12px;
  border: none;
  width: 328px;
  height: 44px;
  font-weight: 600;
  font-size: 16px;
  background: #cc9a6c;
  border-radius: 4px;
  color: #ffff;
  margin: 20px 0;
}

@media (max-width: 1024px) {
  .formSignUp {
    width: 100%;
    height: 75vh;
  }
}

@media (max-width: 768px) {
  .buttonSubmit {
    width: 100%;
  }

  .formSignUp {
    width: 100%;
    height: 87vh;
  }

  .inputSignUp {
    flex-wrap: wrap;
  }

  .inputSignUp-item {
    width: 100%;
  }

  .inputSignUp-item:nth-child(1)::after {
    display: none;
  }
}

@media (max-width: 375px) {
  .formSignUp {
    padding: 0;
  }
}
</style>
