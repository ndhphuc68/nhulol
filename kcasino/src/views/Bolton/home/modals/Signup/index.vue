<script setup>
import { Icons } from "@/const/Icons";
import { handleCloseModal } from "@/utils";
import InputCheck from "@/components/Bolton/Input/InputCheck.vue";
import { ref } from "vue";
import Modal from "@/components/Bolton/Modal/Modal.vue";
import Bank from "@/views/Bolton/home/modals/Bank";

import { useStore } from "vuex";
import { computed } from "vue";
import { signUpRequest } from "@/api/auth/request";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

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

const handleChangeBank = (name) => {
  dataSignUp.value.bank_name = name;
  handleCloseModal("pickBank");
};

const handleSignUp = async (e) => {
  e.preventDefault();
  if (validateSignUp()) {
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
};

const validateSignUp = () => {
  let check = true;
  if (dataSignUp.value.account.trim() === "") {
    errorSignUp.value.account = t("signuperroraccount");
    check = false;
  } else if (dataSignUp.value.account.trim().length < 4) {
    errorSignUp.value.account = t("signuperrorAmore4");
    check = false;
  } else if (dataSignUp.value.account.trim().length > 20) {
    errorSignUp.value.account = t("signuperrorAmore20");
    check = false;
  } else if (dataSignUp.value.account.includes(" ")) {
    errorSignUp.value.account = t("signuperrorSpace");
    check = false;
  }
  if (dataSignUp.value.nickname.trim() === "") {
    errorSignUp.value.nickname = t("signuperrornickname");
    check = false;
  } else if (dataSignUp.value.nickname.trim().length < 4) {
    errorSignUp.value.nickname = t("signuperrorNmore4");
    check = false;
  } else if (dataSignUp.value.nickname.trim().length > 20) {
    errorSignUp.value.nickname = t("signuperrorNmore20");
    check = false;
  }
  if (!dataSignUp.value.phone.trim()) {
    errorSignUp.value.phone = t("signuperrorphone");
    check = false;
  }
  // else if (dataSignUp.value.phone.length !== 10) {
  //   errorSignUp.value.phone = t("signuperrorPmore10");
  //   check = false;
  // }
  if (dataSignUp.value.password.trim() === "") {
    errorSignUp.value.password = t("signuperrorpassword");
    check = false;
  } else if (dataSignUp.value.password.trim().length < 6) {
    errorSignUp.value.password = t("signuperrorPamore6");
    check = false;
  } else if (dataSignUp.value.password.includes(" ")) {
    errorSignUp.value.password = t("signuperrorSpace");
    check = false;
  }
  if (confirmPassword.value.trim() === "") {
    errorSignUp.value.confirmPassword = t("signuperrorpassword");
    check = false;
  } else if (
      dataSignUp.value.password.trim() !== confirmPassword.value.trim()
  ) {
    errorSignUp.value.confirmPassword = t("signuppasswordincorrect");
    check = false;
  }
  // if (!dataSignUp.value.withdraw_pass) {
  //   errorSignUp.value.withdraw_pass = t("signuperrorwithdrawpassword");
  //   check = false;
  // } else if (dataSignUp.value.withdraw_pass.length < 6) {
  //   errorSignUp.value.withdraw_pass = t("signuperrorWamore6");
  //   check = false;
  // }
  if (dataSignUp.value.bank_account.trim() === "") {
    errorSignUp.value.bank_account = t("signuperrorbankaccountname");
    check = false;
  } else if (
      dataSignUp.value.bank_account.trim().length < 2 ||
      dataSignUp.value.bank_account.trim().length > 5
  ) {
    errorSignUp.value.bank_account = t("signuperrorbankaccountnamelength");
    check = false;
  }
  if (dataSignUp.value.bank_name === "") {
    errorSignUp.value.bank_name = t("signuperrorbankname");
    check = false;
  }
  if (dataSignUp.value.bank_number.trim() === "") {
    errorSignUp.value.bank_number = t("signuperroraccountnumber");
    check = false;
  }
  return check;
};
</script>

<template>
  <div class="row signup-main px-md-5 py-md-4 p-2">
    <div class="row mb-3 signup-header">
      <div class="col-4"></div>
      <div class="col-4 d-flex justify-center">
        <span>{{ $t("register") }}</span>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button @click="handleCloseModal('signUp')">
          <img class="icon-close" :src="Icons.close" alt="close" />
        </button>
      </div>
    </div>
    <hr />
    <div class="row overflow-y-scroll signup-body">
      <form>
        <div class="row signup-info">
          <div class="row mb-3">
            <span class="signup-title">{{ $t("generalInformation") }}</span>
          </div>
          <div class="row">
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div
                  class="d-flex flex-row align-items-center mb-2 ps-2 align-items-center mb-2 ps-2"
              >
                <img :src="Icons.user" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("userId") }}*</span>
              </div>
              <InputCheck
                  v-model="dataSignUp.account"
                  :isShowCheck="true"
                  :isCheck="errorSignUp.account ? 'cross' : 'check'"
                  @click="errorSignUp.account = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.account"
                >{{ errorSignUp.account }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div
                  class="d-flex flex-row align-items-center mb-2 ps-2 align-items-center mb-2 ps-2"
              >
                <img :src="Icons.user" alt="user" />
                <span class="item-signup-title"
                >&nbsp;{{ $t("nickname") }}*</span
                >
              </div>
              <InputCheck
                  v-model="dataSignUp.nickname"
                  :isShowCheck="true"
                  :isCheck="errorSignUp.nickname ? 'cross' : 'check'"
                  @click="errorSignUp.nickname = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.nickname"
                >{{ errorSignUp.nickname }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.phone" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("phonenumber") }}*</span>
              </div>
              <InputCheck
                  v-model="dataSignUp.phone"
                  :isShowCheck="true"
                  :type="'number'"
                  :isCheck="errorSignUp.phone ? 'cross' : 'check'"
                  @click="errorSignUp.phone = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.phone"
                >{{ errorSignUp.phone }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.key" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("password") }}*</span>
              </div>
              <InputCheck
                  v-model="dataSignUp.password"
                  :isShowCheck="true"
                  :type="'password'"
                  :isCheck="errorSignUp.password ? 'cross' : 'check'"
                  @click="errorSignUp.password = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.password"
                >{{ errorSignUp.password }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.key" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("confirmpassword") }}*</span>
              </div>
              <InputCheck
                  v-model="confirmPassword"
                  :isShowCheck="true"
                  :type="'password'"
                  :isCheck="errorSignUp.confirmPassword ? 'cross' : 'check'"
                  @click="errorSignUp.confirmPassword = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.confirmPassword"
                >{{ errorSignUp.confirmPassword }}</span
                >
              </div>
            </div>
            <!--            <div class="item-signup col-lg-6 col-12 mb-2">-->
            <!--              <div class="d-flex flex-row align-items-center mb-2 ps-2">-->
            <!--                <img :src="Icons.key" alt="user"/>-->
            <!--                <span>&nbsp;{{ $t("withdrawnalpassword") }}*</span>-->
            <!--              </div>-->
            <!--              <InputCheck-->
            <!--                v-model="dataSignUp.withdraw_pass"-->
            <!--                :isShowCheck="true"-->
            <!--                :type="'password'"-->
            <!--                :isCheck="errorSignUp.withdraw_pass ? 'cross' : 'check'"-->
            <!--                @click="errorSignUp.withdraw_pass=''"-->
            <!--              />-->
            <!--              <div class="w-100 d-flex justify-content-start ps-3">-->
            <!--              <span-->
            <!--                class="text-start text-danger text-error"-->
            <!--                v-show="errorSignUp.withdraw_pass"-->
            <!--              >{{ errorSignUp.withdraw_pass }}</span-->
            <!--              >-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          <div class="item-signup col-lg-6 col-12 mb-2">-->
            <!--            <div class="d-flex flex-row align-items-center mb-2 ps-2">-->
            <!--              <img :src="Icons.gender" alt="user" />-->
            <!--              <span>&nbsp;Gender*</span>-->
            <!--            </div>-->
            <!--            <div class="d-flex flex-row justify-content-start">-->
            <!--              <button class="btn-gender btn-gender-active me-3">Male</button>-->
            <!--              <button class="btn-gender">Female</button>-->
            <!--            </div>-->
            <!--          </div>-->
            <!--          <div class="item-signup col-lg-6 col-12 mb-2">-->
            <!--            <div class="d-flex flex-row align-items-center mb-2 ps-2">-->
            <!--              <img :src="Icons.date" alt="user" />-->
            <!--              <span>&nbsp;Date of Birth*</span>-->
            <!--            </div>-->
            <!--            <InputCheck-->
            <!--              v-model="dataSignUp.dateBirth"-->
            <!--              :isShowCheck="true"-->
            <!--              :isCheck="errorSignUp.dateBirth ? 'cross' : 'check'"-->
            <!--            />-->
            <!--            <div class="w-100 d-flex justify-content-start ps-3">-->
            <!--              <span-->
            <!--                class="text-start text-danger text-error"-->
            <!--                v-show="errorSignUp.dateBirth"-->
            <!--                >{{ errorSignUp.dateBirth }}</span-->
            <!--              >-->
            <!--            </div>-->
            <!--          </div>-->
            <!--          <div class="item-signup col-lg-6 col-12 mb-2">-->
            <!--            <div class="d-flex flex-row align-items-center mb-2 ps-2">-->
            <!--              <img :src="Icons.userCircle" alt="user" />-->
            <!--              <span>&nbsp;Holder*</span>-->
            <!--            </div>-->
            <!--            <InputCheck-->
            <!--              v-model="dataSignUp.holder"-->
            <!--              :isShowCheck="true"-->
            <!--              :isCheck="errorSignUp.holder ? 'cross' : 'check'"-->
            <!--            />-->
            <!--            <div class="w-100 d-flex justify-content-start ps-3">-->
            <!--              <span-->
            <!--                class="text-start text-danger text-error"-->
            <!--                v-show="errorSignUp.holder"-->
            <!--                >{{ errorSignUp.holder }}</span-->
            <!--              >-->
            <!--            </div>-->
            <!--          </div>-->
          </div>
        </div>
        <hr class="mt-4" />
        <div class="row">
          <div class="row mb-3">
            <span class="signup-title">{{ $t("bankAccountInformation") }}</span>
          </div>
          <div class="row">
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.userCircle" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("accountholder") }}*</span>
              </div>
              <InputCheck
                  v-model="dataSignUp.bank_account"
                  :isShowCheck="true"
                  :isCheck="errorSignUp.bank_account ? 'cross' : 'check'"
                  @click="errorSignUp.bank_account = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.bank_account"
                >{{ errorSignUp.bank_account }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2 position-relative">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.bank" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("bankname") }}*</span>
              </div>
              <div
                  @click="
                  handleCloseModal('pickBank');
                  errorSignUp.bank_name = '';
                "
                  class="toggle-modal"
              ></div>
              <InputCheck
                  :disabled="true"
                  :isCheck="errorSignUp.bank_name ? 'cross' : 'check'"
                  :isShowCheck="true"
                  @click="
                  handleCloseModal('pickBank');
                  errorSignUp.bank_name = '';
                "
                  v-model="dataSignUp.bank_name"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.bank_name"
                >{{ errorSignUp.bank_name }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.userList" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("banknumber") }}*</span>
              </div>
              <InputCheck
                  v-model="dataSignUp.bank_number"
                  :isShowCheck="true"
                  :type="'number'"
                  :isCheck="errorSignUp.bank_number ? 'cross' : 'check'"
                  @click="errorSignUp.bank_number = ''"
              />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="errorSignUp.bank_number"
                >{{ errorSignUp.bank_number }}</span
                >
              </div>
            </div>
            <div class="item-signup col-lg-6 col-12 mb-2">
              <div class="d-flex flex-row align-items-center mb-2 ps-2">
                <img :src="Icons.userList" alt="user" />
                <span class="item-signup-title">&nbsp;{{ $t("partnercode") }}</span>
              </div>
              <InputCheck v-model="dataSignUp.domain_info" />
              <div class="w-100 d-flex justify-content-start ps-3">
                <span
                    class="text-start text-danger text-error"
                    v-show="false"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3 mb-3">
          <button class="btn-signup" type="submit" @click="handleSignUp">
            {{ $t("register") }}
          </button>
          <div class="mt-3 signup-footer d-flex justify-center">
            <span>{{ $t("have-account") }}</span>
            <span
                @click="
                handleCloseModal('login');
                handleCloseModal('signUp');
              "
            >&nbsp;{{ $t("tologin") }}</span
            >
          </div>
        </div>
      </form>
    </div>
  </div>
  <Modal
      :padding="'px-md-5 px-1'"
      key="pickBank"
      :modal="'pickBank'"
      :styles="{ width: '1000px', height: '850px' }"
      v-if="modalView['pickBank']"
  >
    <Bank @handleChangeBank="handleChangeBank" />
  </Modal>
</template>

<style scoped lang="scss">
.signup-main {
  &::-webkit-scrollbar {
    display: none;
  }

  hr {
    border: 1px solid var(--light-gradient);
    height: 1px;
  }

  .signup-header {
    span {
      color: var(--light-gradient);
      text-align: center;
      font-size: 30px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .icon-close {
      width: 30px;
      height: 30px;
    }
  }

  .signup-body {
    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 575.98px) {
      height: calc(100vh - 200px);
    }

    .btn-signup {
      border-radius: 20px;
      background: var(--light-gradient);
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
      padding: 12px 10px;
      color: var(--neutral-50);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .signup-footer {
      span {
        color: var(--black-600);
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        &:last-child {
          color: var(--red, #d23449);
          cursor: pointer;
        }
      }
    }

    .signup-title {
      color: var(--light-gradient);
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-align: left;
      @media(max-width: 375px) {
        font-size: 16px;
      }
    }

    .item-signup {
      .item-signup-title {
        color: var(--black-600);
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .toggle-modal {
        position: absolute;
        inset: 30px 0 0 0;
        z-index: 2;
      }

      img {
        width: 20px;
        height: 20px;
      }

      .text-error {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .btn-gender {
        border-radius: 20px;
        border: 1px solid var(--black-200);
        background: var(--white);
        padding: 5px 35px;
        font-size: 14px;
        font-weight: 600;
        font-style: normal;

        &:focus {
          border: none;
          outline: none;
        }
      }

      .btn-gender-active {
        background: var(--pink-100);
        color: var(--red);
        border: 1px solid var(--light-red);
      }
    }
  }
}
</style>
