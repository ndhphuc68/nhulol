<script setup>
import Button from "@/components/DoPlay/Customs/Button";
import "@vuepic/vue-datepicker/dist/main.css";
import { reactive, ref } from "vue";
import Modal from "@/components/DoPlay/Modal/Modal.vue";
import PickBank from "./components/PickBank";

import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { signUpRequest } from "@/api/auth/request";

const { t } = useI18n();
const store = useStore();

const toggle = store.state.modal.toggleShow;

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

function handleChangeBankName(name) {
  formSignup.bank_name = name;
}

const onKeyPress = (event) => {
  if (event.keyCode === 101) {
    event.preventDefault();
  }
};

function handleOpenPickBank() {
  store.commit("handleToggle", "pickBank");
}

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

const filterNonNumeric = (event) => {
  formSignup.phone = event.target.value.replace(/\D/g, "");
};
</script>

<template>
  <Modal v-if="toggle['pickBank']" :modal="'pickBank'">
    <PickBank :handleChangeBankName="handleChangeBankName" />
  </Modal>
  <div class="signup-main">
    <div class="login-form">
      <div class="w-100 px-5 mt-4">
        <h5 class="text-center title">{{ $t("signup") }}</h5>
        <hr class="w-100" />
      </div>
      <div class="form-content">
        <div class="v-row">
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 10.5C12.4596 10.5 12.9148 10.4095 13.3394 10.2336C13.764 10.0577 14.1499 9.79988 14.4749 9.47487C14.7999 9.14987 15.0577 8.76403 15.2336 8.33939C15.4095 7.91475 15.5 7.45963 15.5 7C15.5 6.54037 15.4095 6.08525 15.2336 5.66061C15.0577 5.23597 14.7999 4.85013 14.4749 4.52513C14.1499 4.20012 13.764 3.94231 13.3394 3.76642C12.9148 3.59053 12.4596 3.5 12 3.5C11.0717 3.5 10.1815 3.86875 9.52513 4.52513C8.86875 5.1815 8.5 6.07174 8.5 7C8.5 7.92826 8.86875 8.8185 9.52513 9.47487C10.1815 10.1313 11.0717 10.5 12 10.5ZM3 20.9V21.5H21V20.9C21 18.66 21 17.54 20.564 16.684C20.1805 15.9314 19.5686 15.3195 18.816 14.936C17.96 14.5 16.84 14.5 14.6 14.5H9.4C7.16 14.5 6.04 14.5 5.184 14.936C4.43139 15.3195 3.81949 15.9314 3.436 16.684C3 17.54 3 18.66 3 20.9Z"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("userId") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  v-model="formSignup.account"
                  type="text"
                  class="form-control"
                />
                <div
                  class="warn mt-2"
                  :class="{
                    fail: errorSignUp.account,
                  }"
                >
                  {{ errorSignUp.account }}
                </div>
              </div>
            </div>
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 10.5C12.4596 10.5 12.9148 10.4095 13.3394 10.2336C13.764 10.0577 14.1499 9.79988 14.4749 9.47487C14.7999 9.14987 15.0577 8.76403 15.2336 8.33939C15.4095 7.91475 15.5 7.45963 15.5 7C15.5 6.54037 15.4095 6.08525 15.2336 5.66061C15.0577 5.23597 14.7999 4.85013 14.4749 4.52513C14.1499 4.20012 13.764 3.94231 13.3394 3.76642C12.9148 3.59053 12.4596 3.5 12 3.5C11.0717 3.5 10.1815 3.86875 9.52513 4.52513C8.86875 5.1815 8.5 6.07174 8.5 7C8.5 7.92826 8.86875 8.8185 9.52513 9.47487C10.1815 10.1313 11.0717 10.5 12 10.5ZM3 20.9V21.5H21V20.9C21 18.66 21 17.54 20.564 16.684C20.1805 15.9314 19.5686 15.3195 18.816 14.936C17.96 14.5 16.84 14.5 14.6 14.5H9.4C7.16 14.5 6.04 14.5 5.184 14.936C4.43139 15.3195 3.81949 15.9314 3.436 16.684C3 17.54 3 18.66 3 20.9Z"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("nickname") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  v-model="formSignup.nickname"
                  type="text"
                  class="form-control"
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
            </div>
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 16.5C9 16.7652 8.89464 17.0196 8.70711 17.2071C8.51957 17.3946 8.26522 17.5 8 17.5C7.73478 17.5 7.48043 17.3946 7.29289 17.2071C7.10536 17.0196 7 16.7652 7 16.5C7 16.2348 7.10536 15.9804 7.29289 15.7929C7.48043 15.6054 7.73478 15.5 8 15.5C8.26522 15.5 8.51957 15.6054 8.70711 15.7929C8.89464 15.9804 9 16.2348 9 16.5ZM13 16.5C13 16.7652 12.8946 17.0196 12.7071 17.2071C12.5196 17.3946 12.2652 17.5 12 17.5C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5C11 16.2348 11.1054 15.9804 11.2929 15.7929C11.4804 15.6054 11.7348 15.5 12 15.5C12.2652 15.5 12.5196 15.6054 12.7071 15.7929C12.8946 15.9804 13 16.2348 13 16.5ZM17 16.5C17 16.7652 16.8946 17.0196 16.7071 17.2071C16.5196 17.3946 16.2652 17.5 16 17.5C15.7348 17.5 15.4804 17.3946 15.2929 17.2071C15.1054 17.0196 15 16.7652 15 16.5C15 16.2348 15.1054 15.9804 15.2929 15.7929C15.4804 15.6054 15.7348 15.5 16 15.5C16.2652 15.5 16.5196 15.6054 16.7071 15.7929C16.8946 15.9804 17 16.2348 17 16.5Z"
                    fill="#71717A"
                  />
                  <path
                    d="M6 10.4999V8.49989C6 8.15989 6.028 7.82489 6.083 7.49989M18 10.4999V8.49989C18.0001 7.28113 17.629 6.09124 16.9361 5.08858C16.2433 4.08592 15.2615 3.31802 14.1215 2.88709C12.9815 2.45616 11.7372 2.38262 10.5544 2.67627C9.37152 2.96991 8.30613 3.61682 7.5 4.53089M11 22.4999H8C5.172 22.4999 3.757 22.4999 2.879 21.6209C2 20.7429 2 19.3279 2 16.4999C2 13.6719 2 12.2569 2.879 11.3789C3.757 10.4999 5.172 10.4999 8 10.4999H16C18.828 10.4999 20.243 10.4999 21.121 11.3789C22 12.2569 22 13.6719 22 16.4999C22 19.3279 22 20.7429 21.121 21.6209C20.243 22.4999 18.828 22.4999 16 22.4999H15"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("password") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  v-model="formSignup.password"
                  type="password"
                  class="form-control"
                />
                <div
                  class="warn"
                  :class="{
                    fail: errorSignUp.password,
                  }"
                >
                  {{ errorSignUp.password }}
                </div>
              </div>
            </div>
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 16.5C9 16.7652 8.89464 17.0196 8.70711 17.2071C8.51957 17.3946 8.26522 17.5 8 17.5C7.73478 17.5 7.48043 17.3946 7.29289 17.2071C7.10536 17.0196 7 16.7652 7 16.5C7 16.2348 7.10536 15.9804 7.29289 15.7929C7.48043 15.6054 7.73478 15.5 8 15.5C8.26522 15.5 8.51957 15.6054 8.70711 15.7929C8.89464 15.9804 9 16.2348 9 16.5ZM13 16.5C13 16.7652 12.8946 17.0196 12.7071 17.2071C12.5196 17.3946 12.2652 17.5 12 17.5C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5C11 16.2348 11.1054 15.9804 11.2929 15.7929C11.4804 15.6054 11.7348 15.5 12 15.5C12.2652 15.5 12.5196 15.6054 12.7071 15.7929C12.8946 15.9804 13 16.2348 13 16.5ZM17 16.5C17 16.7652 16.8946 17.0196 16.7071 17.2071C16.5196 17.3946 16.2652 17.5 16 17.5C15.7348 17.5 15.4804 17.3946 15.2929 17.2071C15.1054 17.0196 15 16.7652 15 16.5C15 16.2348 15.1054 15.9804 15.2929 15.7929C15.4804 15.6054 15.7348 15.5 16 15.5C16.2652 15.5 16.5196 15.6054 16.7071 15.7929C16.8946 15.9804 17 16.2348 17 16.5Z"
                    fill="#71717A"
                  />
                  <path
                    d="M6 10.4999V8.49989C6 8.15989 6.028 7.82489 6.083 7.49989M18 10.4999V8.49989C18.0001 7.28113 17.629 6.09124 16.9361 5.08858C16.2433 4.08592 15.2615 3.31802 14.1215 2.88709C12.9815 2.45616 11.7372 2.38262 10.5544 2.67627C9.37152 2.96991 8.30613 3.61682 7.5 4.53089M11 22.4999H8C5.172 22.4999 3.757 22.4999 2.879 21.6209C2 20.7429 2 19.3279 2 16.4999C2 13.6719 2 12.2569 2.879 11.3789C3.757 10.4999 5.172 10.4999 8 10.4999H16C18.828 10.4999 20.243 10.4999 21.121 11.3789C22 12.2569 22 13.6719 22 16.4999C22 19.3279 22 20.7429 21.121 21.6209C20.243 22.4999 18.828 22.4999 16 22.4999H15"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("confirmpassword") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  v-model="confirmPass"
                  type="password"
                  class="form-control"
                />
                <div
                  class="warn"
                  :class="{ fail: errorSignUp.confirmPassword }"
                >
                  {{ errorSignUp.confirmPassword }}
                </div>
              </div>
            </div>
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 16.5C9 16.7652 8.89464 17.0196 8.70711 17.2071C8.51957 17.3946 8.26522 17.5 8 17.5C7.73478 17.5 7.48043 17.3946 7.29289 17.2071C7.10536 17.0196 7 16.7652 7 16.5C7 16.2348 7.10536 15.9804 7.29289 15.7929C7.48043 15.6054 7.73478 15.5 8 15.5C8.26522 15.5 8.51957 15.6054 8.70711 15.7929C8.89464 15.9804 9 16.2348 9 16.5ZM13 16.5C13 16.7652 12.8946 17.0196 12.7071 17.2071C12.5196 17.3946 12.2652 17.5 12 17.5C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5C11 16.2348 11.1054 15.9804 11.2929 15.7929C11.4804 15.6054 11.7348 15.5 12 15.5C12.2652 15.5 12.5196 15.6054 12.7071 15.7929C12.8946 15.9804 13 16.2348 13 16.5ZM17 16.5C17 16.7652 16.8946 17.0196 16.7071 17.2071C16.5196 17.3946 16.2652 17.5 16 17.5C15.7348 17.5 15.4804 17.3946 15.2929 17.2071C15.1054 17.0196 15 16.7652 15 16.5C15 16.2348 15.1054 15.9804 15.2929 15.7929C15.4804 15.6054 15.7348 15.5 16 15.5C16.2652 15.5 16.5196 15.6054 16.7071 15.7929C16.8946 15.9804 17 16.2348 17 16.5Z"
                    fill="#71717A"
                  />
                  <path
                    d="M6 10.4999V8.49989C6 8.15989 6.028 7.82489 6.083 7.49989M18 10.4999V8.49989C18.0001 7.28113 17.629 6.09124 16.9361 5.08858C16.2433 4.08592 15.2615 3.31802 14.1215 2.88709C12.9815 2.45616 11.7372 2.38262 10.5544 2.67627C9.37152 2.96991 8.30613 3.61682 7.5 4.53089M11 22.4999H8C5.172 22.4999 3.757 22.4999 2.879 21.6209C2 20.7429 2 19.3279 2 16.4999C2 13.6719 2 12.2569 2.879 11.3789C3.757 10.4999 5.172 10.4999 8 10.4999H16C18.828 10.4999 20.243 10.4999 21.121 11.3789C22 12.2569 22 13.6719 22 16.4999C22 19.3279 22 20.7429 21.121 21.6209C20.243 22.4999 18.828 22.4999 16 22.4999H15"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("phonenumber") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  @keypress="onKeyPress"
                  @input="filterNonNumeric"
                  v-model="formSignup.phone"
                  type="text"
                  class="form-control"
                />
                <div class="warn" :class="{ fail: errorSignUp.phone }">
                  {{ errorSignUp.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="v-row">
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 10.5C12.4596 10.5 12.9148 10.4095 13.3394 10.2336C13.764 10.0577 14.1499 9.79988 14.4749 9.47487C14.7999 9.14987 15.0577 8.76403 15.2336 8.33939C15.4095 7.91475 15.5 7.45963 15.5 7C15.5 6.54037 15.4095 6.08525 15.2336 5.66061C15.0577 5.23597 14.7999 4.85013 14.4749 4.52513C14.1499 4.20012 13.764 3.94231 13.3394 3.76642C12.9148 3.59053 12.4596 3.5 12 3.5C11.0717 3.5 10.1815 3.86875 9.52513 4.52513C8.86875 5.1815 8.5 6.07174 8.5 7C8.5 7.92826 8.86875 8.8185 9.52513 9.47487C10.1815 10.1313 11.0717 10.5 12 10.5ZM3 20.9V21.5H21V20.9C21 18.66 21 17.54 20.564 16.684C20.1805 15.9314 19.5686 15.3195 18.816 14.936C17.96 14.5 16.84 14.5 14.6 14.5H9.4C7.16 14.5 6.04 14.5 5.184 14.936C4.43139 15.3195 3.81949 15.9314 3.436 16.684C3 17.54 3 18.66 3 20.9Z"
                    stroke="#71717A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ms-2">{{ $t("accountholder") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  v-model="formSignup.bank_account"
                  type="text"
                  class="form-control"
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
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M2.25 10.25H4.5V16.25H3C2.80109 16.25 2.61032 16.329 2.46967 16.4697C2.32902 16.6103 2.25 16.8011 2.25 17C2.25 17.1989 2.32902 17.3897 2.46967 17.5304C2.61032 17.671 2.80109 17.75 3 17.75H21C21.1989 17.75 21.3897 17.671 21.5303 17.5304C21.671 17.3897 21.75 17.1989 21.75 17C21.75 16.8011 21.671 16.6103 21.5303 16.4697C21.3897 16.329 21.1989 16.25 21 16.25H19.5V10.25H21.75C21.9132 10.2499 22.0719 10.1965 22.202 10.098C22.3321 9.99947 22.4265 9.86122 22.4709 9.7042C22.5153 9.54717 22.5073 9.37995 22.4481 9.22788C22.3889 9.07582 22.2817 8.94722 22.1428 8.86159L12.3928 2.86158C12.2747 2.78894 12.1387 2.75049 12 2.75049C11.8613 2.75049 11.7253 2.78894 11.6072 2.86158L1.85719 8.86159C1.71828 8.94722 1.61108 9.07582 1.55187 9.22788C1.49266 9.37995 1.48466 9.54717 1.52908 9.7042C1.57351 9.86122 1.66793 9.99947 1.79803 10.098C1.92814 10.1965 2.08681 10.2499 2.25 10.25ZM6 10.25H9V16.25H6V10.25ZM13.5 10.25V16.25H10.5V10.25H13.5ZM18 16.25H15V10.25H18V16.25ZM12 4.38033L19.1006 8.75002H4.89937L12 4.38033ZM23.25 20C23.25 20.1989 23.171 20.3897 23.0303 20.5304C22.8897 20.671 22.6989 20.75 22.5 20.75H1.5C1.30109 20.75 1.11032 20.671 0.96967 20.5304C0.829018 20.3897 0.75 20.1989 0.75 20C0.75 19.8011 0.829018 19.6103 0.96967 19.4697C1.11032 19.329 1.30109 19.25 1.5 19.25H22.5C22.6989 19.25 22.8897 19.329 23.0303 19.4697C23.171 19.6103 23.25 19.8011 23.25 20Z"
                    fill="#71717A"
                  />
                </svg>
                <span class="ms-2">{{ $t("bankname") }}*</span>
              </div>
              <div class="d-flex position-relative flex-column input">
                <div
                  class="w-100 h-100 position-absolute"
                  @click="handleOpenPickBank"
                  style="top: 0; left: 0; z-index: 1"
                ></div>
                <input
                  disabled
                  v-model="formSignup.bank_name"
                  type="text"
                  class="form-control"
                />
                <div class="warn" :class="{ fail: errorSignUp.bank_name }">
                  {{ errorSignUp.bank_name }}
                </div>
              </div>
            </div>
          </div>
          <div class="v-col-lg-6 v-col-12 mt-5">
            <div
              class="d-flex flex-row align-center justify-space-between item-signup"
            >
              <div class="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M8 9.5C8.53043 9.5 9.03914 9.71071 9.41421 10.0858C9.78929 10.4609 10 10.9696 10 11.5C10 12.0304 9.78929 12.5391 9.41421 12.9142C9.03914 13.2893 8.53043 13.5 8 13.5C7.46957 13.5 6.96086 13.2893 6.58579 12.9142C6.21071 12.5391 6 12.0304 6 11.5C6 10.9696 6.21071 10.4609 6.58579 10.0858C6.96086 9.71071 7.46957 9.5 8 9.5ZM12 17.5H4V16.5C4 15.17 6.67 14.5 8 14.5C9.33 14.5 12 15.17 12 16.5V17.5ZM20 8.5H14V10.5H20V8.5ZM20 12.5H14V14.5H20V12.5ZM20 16.5H14V18.5H20V16.5ZM22 4.5H14V6.5H22V20.5H2V6.5H10V4.5H2C1.46957 4.5 0.960859 4.71071 0.585786 5.08579C0.210714 5.46086 0 5.96957 0 6.5L0 20.5C0 21.0304 0.210714 21.5391 0.585786 21.9142C0.960859 22.2893 1.46957 22.5 2 22.5H22C22.5304 22.5 23.0391 22.2893 23.4142 21.9142C23.7893 21.5391 24 21.0304 24 20.5V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5ZM13 6.5H11V2.5H13V6.5Z"
                    fill="#71717A"
                  />
                </svg>
                <span class="ms-2">{{ $t("banknumber") }}*</span>
              </div>
              <div class="d-flex flex-column input">
                <input
                  @keypress="onKeyPress"
                  v-model="formSignup.bank_number"
                  type="number"
                  class="form-control"
                />
                <div class="warn" :class="{ fail: errorSignUp.bank_number }">
                  {{ errorSignUp.bank_number }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="v-row mt-5">
          <div class="d-flex flex-column justify-content-center w-100">
            <Button
              @click="handleSignUp"
              :isFullWidth="true"
              variant="contained"
              >{{ $t("signup") }}
            </Button>
            <div class="my-4 d-flex flex-row justify-center span-text">
              <span>{{ $t("have-account") }}</span
              ><span
                @click="
                  store.commit('handleToggle', 'login');
                  store.commit('handleToggle', 'signUp');
                "
                >&nbsp;{{ $t("tologin") }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signup-main {
  hr {
    height: 1px;
    border: 1px solid #e4e4e7;
  }

  .form-content {
    padding: 0 60px;
    margin-bottom: 20px;
    //overflow-y: scroll;
    //height: calc(100vh - 210px);

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 991.98px) {
      padding: 0 20px;
      height: calc(100vh - 500px);
    }

    @media (max-width: 767.98px) {
      height: calc(100vh - 290px);
    }

    @media (max-width: 575.98px) {
      height: calc(100vh - 220px);
    }

    svg {
      width: 24px;
      height: 24px;
    }

    span {
      color: #71717a;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      @media (max-width: 375px) {
        font-size: 13px;
      }
    }

    .item-signup {
      flex-wrap: wrap;
      div {
        flex: 1;
        align-items: center;
        @media (max-width: 375px) {
          width: 100%;
          flex: 0 0 100%;
        }
      }

      .input {
        flex: 2;

        input {
          color: black;
          height: 45px;
          display: block;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          background-clip: padding-box;
          border: 1px solid #dee2e6;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }
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
    }

    .span-text {
      span {
        &:last-child {
          color: #e592ed;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          cursor: pointer;
        }
      }
    }
  }
}

.title {
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #b126bd;
  margin-bottom: 20px;

  @media (max-width: 375px) {
    font-size: 16px;
  }
}

.date-icon {
  width: 20px;
  height: 20px;
  margin-right: 16px;
  margin-left: 2px;
}

.form-item {
  margin: 20px 0;
}

@media (min-width: 1024px) {
  .container {
    width: 900px;
  }
}
</style>
<style>
.login-form .dp__icon {
  display: none;
}

.login-form .dp__input_icon_pad {
  padding-left: 15px;
}

.login-form .dp__pointer.dp__input_readonly {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px 15px;
}
</style>
