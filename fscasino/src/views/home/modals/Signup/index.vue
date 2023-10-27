<script setup>
import {Icons} from "@/const/Icons";
import {handleCloseModal} from "@/utils";
import InputCheck from "@/components/Input/InputCheck.vue";
import {ref} from "vue";
import Modal from "@/components/Modal/Modal.vue";
import Bank from "@/views/home/modals/Bank";

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const modalView = computed(() => store.state.modal.toggleShow);

const dataSignUp = ref({
  id: "",
  password: "",
  phone: "",
  confirmPassword: "",
  withdrawPassword: "",
  dateBirth: "",
  holder: "",
  bankName: "",
  accountNumber: "",
  gender: "",
  qr: "",
});

const errorSignUp = ref({
  id: "",
  password: "",
  phone: "",
  confirmPassword: "",
  withdrawPassword: "",
  dateBirth: "",
  holder: "",
  bankName: "",
  accountNumber: "",
});

const handleChangeBank = (name) => {
  dataSignUp.value.bankName = name;
  handleCloseModal("bank");
};

const handleSignUp = () => {
  console.log(dataSignUp.value);
  if (validateSignUp()) {
    console.log(1);
  }
};

const validateSignUp = () => {
  let check = true;
  if (!dataSignUp.value.id) {
    errorSignUp.value.id = "banj chua nhap id";
    check = false;
  } else if (dataSignUp.value.id < 4) {
    errorSignUp.value.id = "id phai nhieu hon 4 kis tu";
    check = false;
  }
  if (!dataSignUp.value.phone) {
    errorSignUp.value.phone = "123232";
    check = false;
  }
  if (!dataSignUp.value.password) {
    errorSignUp.value.password = "123232";
    check = false;
  } else if (dataSignUp.value.password.length < 6) {
    errorSignUp.value.password = "Mat khau dai hon 6 ki tu";
    check = false;
  }
  if (!dataSignUp.value.confirmPassword) {
    errorSignUp.value.confirmPassword = "123232";
    check = false;
  } else if (dataSignUp.value.password !== dataSignUp.value.confirmPassword) {
    errorSignUp.value.confirmPassword = "mat khau khong khop";
    check = false;
  }
  if (!dataSignUp.value.withdrawPassword) {
    errorSignUp.value.withdrawPassword = "123232";
    check = false;
  } else if (dataSignUp.value.withdrawPassword.length < 6) {
    errorSignUp.value.password = "Mat khau dai hon 6 ki tu";
    check = false;
  }
  if (!dataSignUp.value.dateBirth) {
    errorSignUp.value.dateBirth = "123232";
    check = false;
  }
  if (!dataSignUp.value.holder) {
    errorSignUp.value.holder = "123232";
    check = false;
  }
  if (!dataSignUp.value.bankName) {
    errorSignUp.value.bankName = "123232";
    check = false;
  }
  if (!dataSignUp.value.accountNumber) {
    errorSignUp.value.accountNumber = "123232";
    check = false;
  }
  return check;
};
</script>

<template>
  <div class="row signup-main p-md-5 p-2 ">
    <div class="row mb-3 signup-header">
      <div class="col-4"></div>
      <div class="col-4"><span>REGISTER</span></div>
      <div class="col-4 d-flex justify-content-end">
        <button @click="handleCloseModal('signup')">
          <img class="icon-close" :src="Icons.close" alt="close"/>
        </button>
      </div>
    </div>
    <hr/>
    <div class="row overflow-y-scroll signup-body">
      <div class="row signup-info">
        <div class="row mb-3">
          <span class="signup-title">General Information</span>
        </div>
        <div class="row">
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div
                class="d-flex flex-row align-items-center mb-2 ps-2 align-items-center mb-2 ps-2"
            >
              <img :src="Icons.user" alt="user"/>
              <span class="item-signup-title">&nbsp;ID*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.id"
                :padding="'padding-right: 40%;'"
                :isButton="true"
                :isShowCheck="true"
                :isCheck="errorSignUp.id ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.id"
              >{{ errorSignUp.id }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.phone" alt="user"/>
              <span>&nbsp;Mobile No.*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.phone"
                :isShowCheck="true"
                :isCheck="errorSignUp.phone ? 'cross' : 'check'"
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
              <img :src="Icons.key" alt="user"/>
              <span>&nbsp;Password*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.password"
                :isShowCheck="true"
                :isCheck="errorSignUp.password ? 'cross' : 'check'"
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
              <img :src="Icons.key" alt="user"/>
              <span>&nbsp;Confirm Password*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.confirmPassword"
                :isShowCheck="true"
                :isCheck="errorSignUp.confirmPassword ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.confirmPassword"
              >{{ errorSignUp.confirmPassword }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.key" alt="user"/>
              <span>&nbsp;Withdraw Password*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.withdrawPassword"
                :isShowCheck="true"
                :isCheck="errorSignUp.withdrawPassword ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.withdrawPassword"
              >{{ errorSignUp.withdrawPassword }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.gender" alt="user"/>
              <span>&nbsp;Gender*</span>
            </div>
            <div class="d-flex flex-row justify-content-start">
              <button class="btn-gender btn-gender-active me-3">Male</button>
              <button class="btn-gender">Female</button>
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.date" alt="user"/>
              <span>&nbsp;Date of Birth*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.dateBirth"
                :isShowCheck="true"
                :isCheck="errorSignUp.dateBirth ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.dateBirth"
              >{{ errorSignUp.dateBirth }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.userCircle" alt="user"/>
              <span>&nbsp;Holder*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.holder"
                :isShowCheck="true"
                :isCheck="errorSignUp.holder ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.holder"
              >{{ errorSignUp.holder }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-4"/>
      <div class="row">
        <div class="row mb-3">
          <span class="signup-title">Bank Account Information</span>
        </div>
        <div class="row">
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.bank" alt="user"/>
              <span>&nbsp;Bank Name*</span>
            </div>
            <InputCheck
                :disabled="true"
                :isCheck="errorSignUp.bankName ? 'cross' : 'check'"
                :isShowCheck="true"
                @click="handleCloseModal('bank')"
                v-model="dataSignUp.bankName"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.bankName"
              >{{ errorSignUp.bankName }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2">
              <img :src="Icons.userList" alt="user"/>
              <span>&nbsp;Account Number*</span>
            </div>
            <InputCheck
                v-model="dataSignUp.accountNumber"
                :isShowCheck="true"
                :isCheck="errorSignUp.accountNumber ? 'cross' : 'check'"
            />
            <div class="w-100 d-flex justify-content-start ps-3">
              <span
                  class="text-start text-danger text-error"
                  v-show="errorSignUp.accountNumber"
              >{{ errorSignUp.accountNumber }}</span
              >
            </div>
          </div>
          <div class="item-signup col-lg-6 col-12 mb-2">
            <div class="d-flex flex-row align-items-center mb-2 ps-2 col-6">
              <img :src="Icons.qrCode" alt="user"/>
              <span>&nbsp;Register Code</span>
            </div>
            <InputCheck v-model="dataSignUp.qr"/>
            <div class="w-100 d-flex justify-content-start ps-3"></div>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <button class="btn-signup" @click="handleSignUp">Register Now</button>
        <div class="mt-3 signup-footer">
          <span>Already have an account?</span>
          <span
              @click="
              handleCloseModal('login');
              handleCloseModal('signup');
            "
          >&nbsp;To Login</span
          >
        </div>
      </div>
    </div>
  </div>
  <Modal
      :padding="'px-md-5 px-1'"
      key="bank"
      :modal="'bank'"
      :styles="{ width: '1000px', height: '850px' }"
      v-if="modalView['bank']"
  >
    <Bank @handleChangeBank="handleChangeBank"/>
  </Modal>
</template>

<style scoped lang="scss">
.signup-main {
  hr {
    border: 1px solid var(--light-gradient);
    height: 1px;
  }

  .signup-header {
    span {
      color: var(--light-gradient);
      text-align: center;
      font-size: 22px;
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

    height: 770px;

    @media (max-width: 575.98px) {
      height: calc(100vh - 120px);
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
        font-size: 16px;
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
    }

    .item-signup {
      .item-signup-title {
        color: var(--black-600);
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
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
