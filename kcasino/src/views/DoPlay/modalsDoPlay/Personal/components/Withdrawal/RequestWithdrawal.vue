<script setup>
import { convertMoney } from "@/utils/function";
import Button from "@/components/DoPlay/Customs/Button";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Select from "@/components/DoPlay/Customs/Select/index.vue";

const { t } = useI18n();
const store = useStore();
const userInfor = computed(() => store.state.user.userInfor);
const amount = ref(0);
const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const withdrawMax = computed(() => store.getters.getWithdrawMax);
const withdrawMin = computed(() => store.getters.getWithdrawMin);

watch(userInfor, (newUserInfor) => {
  if (
    bankName.value === undefined ||
    bankNumber.value === undefined ||
    accountHolder.value === undefined
  ) {
    bankName.value = newUserInfor?.me_bank_name;
    bankNumber.value = newUserInfor?.me_bank_number;
    accountHolder.value = newUserInfor?.me_bank_account;
  }
});

const handleChoosePrice = (value) => {
  amount.value += value;
  if (amount.value > withdrawMax.value) amount.value = withdrawMax.value;
  else {
    if (amount.value > userInfor?.value.me_money) {
      amount.value = userInfor?.value.me_money || 0;
    }
    if (amount.value < withdrawMin.value) amount.value = 0;
  }
};

const handleSubmit = async () => {
  const data = {
    Money: amount.value,
    Name: accountHolder.value.replace(/\s/g, ""),
    BankName: bankName.value,
    BankNumber: bankNumber.value,
    IsAndroid: true,
    WidthDrawPass: "",
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  };
  if (data.Money < withdrawMin.value) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("errorMinAmount"),
    });
    return;
  }
  if (data.Money > userInfor?.value.me_money) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("errorMaxAmount"),
    });
    return;
  }
  if (
    accountHolder?.value.replace(/\s/g, "").length > 5 ||
    accountHolder?.value.replace(/\s/g, "").length < 2
  ) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccountholderlength"),
    });
    return;
  }
  if (bankNumber?.value.length < 1) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccountnumber"),
    });
    return;
  }
  await store.commit("handleUpdateLoading", true);

  const res = await store.dispatch("withdrawAction", data);
  if (res?.is_success) {
    await handleGetMe();
    await handleGetListWithDraw();
    await store.dispatch("showAlert", {
      type: "success",
      message: t("withdrawRequestSuccess"),
    });
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t(res.message),
    });
  }
  await store.commit("handleUpdateLoading", false);
};

const handleGetListWithDraw = async () => {
  await store.dispatch("getListWithDrawAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};

const handleGetMe = async () => {
  await store.dispatch("getMeAction", {
    memberIdx: userInfor.value.me_idx,
  });
};

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
</script>

<template>
  <div class="container withdraw">
    <div class="d-flex flex-wrap align-center">
      <div class="v-col-md-4 v-col-12">
        <div class="d-flex flex-row align-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 13.125V7.125M21.75 12C21.75 14.5859 20.7228 17.0658 18.8943 18.8943C17.0658 20.7228 14.5859 21.75 12 21.75C9.41414 21.75 6.93419 20.7228 5.10571 18.8943C3.27723 17.0658 2.25 14.5859 2.25 12C2.25 9.41414 3.27723 6.93419 5.10571 5.10571C6.93419 3.27723 9.41414 2.25 12 2.25C14.5859 2.25 17.0658 3.27723 18.8943 5.10571C20.7228 6.93419 21.75 9.41414 21.75 12Z"
              stroke="#3F3F46"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.75 16.5C12.75 16.6989 12.671 16.8897 12.5303 17.0303C12.3897 17.171 12.1989 17.25 12 17.25C11.8011 17.25 11.6103 17.171 11.4697 17.0303C11.329 16.8897 11.25 16.6989 11.25 16.5C11.25 16.3011 11.329 16.1103 11.4697 15.9697C11.6103 15.829 11.8011 15.75 12 15.75C12.1989 15.75 12.3897 15.829 12.5303 15.9697C12.671 16.1103 12.75 16.3011 12.75 16.5Z"
              fill="#3F3F46"
              stroke="#3F3F46"
            />
          </svg>
          <h5>&nbsp;{{ $t("confirmation") }}</h5>
        </div>
      </div>
      <div class="v-col-md-8 v-col-12">
        <p class="warning-p">{{ $t("transactionWarning2") }}</p>
      </div>
    </div>
    <div class="mt-md-10 mt-4">
      <div class="d-flex flex-wrap justify-space-between item-request">
        <div class="v-col-md-3 v-col-6 title-request d-flex align-center">
          <h4>{{ $t("holdingmoney") }}</h4>
        </div>
        <div
          class="v-col-md-9 v-col-6 d-flex align-center ps-5 d-flex justify-end d-md-block"
        >
          <p class="money-me">
            {{ userInfor.me_money ? convertMoney(userInfor.me_money) : 0 }}
            ₩
          </p>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-space-between item-request">
        <div class="v-col-md-3 v-col-12 title-request d-flex align-center">
          <h4>{{ $t("changeamount") }}</h4>
        </div>
        <div class="v-col-md-9 v-col-12">
          <input
            type="text"
            class="w-md-50 w-100"
            disabled
            :value="convertMoney(amount)"
          />
          <div class="d-flex flex-wrap price-list w-md-75 w-100 mt-4">
            <button
              v-for="price in prices"
              :key="price"
              class="item-price"
              @click="handleChoosePrice(price)"
            >
              {{ convertMoney(price) }}
            </button>
            <button class="item-price" @click="amount = 0">
              {{ $t("reset") }}
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-space-between item-request">
        <div class="v-col-md-3 v-col-4 title-request d-flex align-center">
          <h4>{{ $t("withdrawer") }}</h4>
        </div>
        <div class="v-col-md-9 div-deposit-280 v-col-8">
          <div>
            <div class="title-account">{{ $t("bankName") }}</div>
            <!--            <input v-model="bankName" type="text" />-->
            <Select
              :default="bankName"
              :height="'34px'"
              :minWidth="'120px'"
              :tabIndex="0"
              @input="
                (option) => {
                  bankName = option.value.text;
                }
              "
              :options="banks"
            />
          </div>
          <div>
            <div class="title-account">{{ $t("banknumber") }}</div>
            <input v-model="bankNumber" type="number" />
          </div>
          <div>
            <div class="title-account">{{ $t("accountHolder") }}</div>
            <input v-model="accountHolder" type="text" />
          </div>
        </div>
      </div>
      <div class="text-center mt-6">
        <Button @click="handleSubmit" class="btn-apply" variant="contained">{{
          $t("apply")
        }}</Button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title-account {
  font-size: 14px;
  margin-top: 5px;
  color: var(--primaryDoplay);
}

.money-me {
  color: #52525b;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.item-request {
  border: 1px solid #e4e4e7;

  &:first-child,
  &:last-child {
    height: fit-content;
  }

  &:nth-child(2) {
    height: fit-content;
  }
  .div-deposit-280 {
    @media (max-width: 280px) {
      max-width: 100%;
      flex-basis: 100%;
    }
  }
}

.title-request {
  background: #f4f4f5;
  @media (max-width: 991.98px) {
    background: white;
  }
  h4 {
    @media (max-width: 370px) {
      font-size: 12px;
    }
  }
}

h5 {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.warning-p {
  color: #3f3f46;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 375px) {
    font-size: 12px;
  }
}

.item-price {
  border-radius: 4px;
  border: 0.75px solid #a1a1aa;
  background: #f4f4f5;
  padding: 4px 10px;
  margin: 5px;

  &:hover {
    background-color: var(--primaryDoplay);
    color: #fff;
  }
}

.item-price:last-child {
  padding: 10px 30px;
  background: #e592ed;
  color: #fafafa;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.btn-apply {
  margin: 0 auto;
}

input {
  color: black;
  display: block;
  padding: 0.3rem 0.75rem;
  font-size: 14px;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #dee2e6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
<style lang="scss">
.withdraw {
  .custom-select {
    .selected {
      height: 34px;
      border: 1px solid #dee2e6;
      justify-content: space-between;
      @media (max-width: 600px) {
        justify-content: space-between;
      }
    }

    p {
      font-size: 14px;
      @media (max-width: 560px) {
        font-size: 12px;
      }
    }
  }
}
</style>
