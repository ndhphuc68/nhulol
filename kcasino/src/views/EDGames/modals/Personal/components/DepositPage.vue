<template>
  <div class="d-flex justify-center w-100">
    <div class="deposit">
      <div class="warning-box">
        <h4 class="warning-title">{{ $t("warning") }}</h4>
        <p class="warning-content">
          {{ $t("transactionWarning") }}
        </p>
      </div>
      <div class="mt-5 mb-8">
        <h3 class="title-deposit mb-3">{{ $t("titleDepositPage") }}</h3>
        <div class="admin-bank d-flex flex-column flex-sm-row">
          <article>
            <div class="title-info">{{ $t("bankName") }}</div>
            <div class="detail-info">
              {{ adminBank?.ADMIN_BANK_NAME || "ADMIN BANK NAME" }}
            </div>
          </article>
          <article class="ms-sm-5">
            <div class="title-info">{{ $t("accountHolder") }}</div>
            <div class="detail-info">
              {{ adminBank?.ADMIN_BANK_ACCOUNT || "ADMIN BANK ACCOUNT" }}
            </div>
          </article>
          <article class="ms-sm-5">
            <div class="title-info">{{ $t("banknumber") }}</div>
            <div class="detail-info">
              {{ adminBank?.ADMIN_BANK_NUMBER || "ADMIN BANK NUMBER" }}
            </div>
          </article>
        </div>
      </div>
      <div class="deposit-details">
        <div class="deposit-item">
          <p class="name">{{ $t("totalBalance") }}</p>
          <input
            disabled
            :value="userInfor.me_money ? convertMoney(userInfor.me_money) : 0"
            class="disable"
          />
        </div>
        <div class="deposit-item">
          <p class="name">{{ $t("depositAmount") }}</p>
          <input :value="convertMoney(amount)" disabled />
        </div>
        <div class="deposit-item deposit-item--left">
          <button
            class="item-price"
            v-for="price in listPrice"
            :key="price"
            @click="handleClickButton(price)"
          >
            {{ convertMoney(price) }}
          </button>
          <button class="item-price btn-correction" @click="handleResetAmount">
            {{ $t("correction") }}
          </button>
        </div>
        <div class="deposit-item">
          <p class="name">{{ $t("depositor") }}</p>
          <div class="input">
            <div class="bank-info">{{ $t("bankName") }}</div>
            <Select
              :default="bankName"
              :height="'50px'"
              :tabIndex="0"
              @input="
                (option) => {
                  bankName = option.value.text;
                }
              "
              :options="banks"
            />
          </div>
        </div>
        <div class="deposit-item">
          <p class="name name-none"></p>
          <div class="div-280">
            <div class="bank-info">{{ $t("banknumber") }}</div>
            <input v-model="bankNumber" type="number" />
          </div>
        </div>
        <div class="deposit-item">
          <p class="name name-none"></p>
          <div class="div-280">
            <div class="bank-info">{{ $t("accountHolder") }}</div>
            <input v-model="accountHolder" type="text" />
          </div>
        </div>

        <button class="btn-deposit" @click="depositAction">
          {{ $t("depositRequest") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { convertMoney } from "@/utils";
import { useI18n } from "vue-i18n";
import Select from "@/components/EDGames/customs/Select/index.vue";

const { t } = useI18n();
const store = useStore();
const amount = ref(0);
const userInfor = computed(() => store.state.user.userInfor);
const adminBank = computed(() => store.state.partnership.data);
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor?.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const depositMax = computed(() => store.getters.getDepositMax);
const depositMin = computed(() => store.getters.getDepositMin);

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

const listPrice = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];

const handleClickButton = (price) => (amount.value += price);

const handleResetAmount = () => (amount.value = 0);

const depositAction = async () => {
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
  if (data.Money < depositMin.value) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("errorMinAmount"),
    });
    return;
  }
  if (data.Name.length > 5 || data.Name.length < 2) {
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

  const res = await store.dispatch("depositAction", data);
  if (res?.is_success) {
    await handleGetListDeponsit();
    await store.dispatch("showAlert", {
      type: "success",
      message: t("depositRequestSuccess"),
    });
    amount.value = 0;
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t(res.message),
    });
  }
  await store.commit("handleUpdateLoading", false);
};

const handleGetListDeponsit = async () => {
  await store.dispatch("getListDepositAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  });
};
</script>
<style scoped lang="scss">
.deposit {
  max-width: 90%;
  @media (max-width: 576px) {
    max-width: 100%;
  }
  .title-deposit {
    color: var(--primary);
  }
  .admin-bank {
    .title-info {
      color: #a1a1aa;
    }
    .detail-info {
      font-size: 20px;
      font-weight: 600;
      @media (max-width: 568px) {
        font-size: 18px;
      }
    }
  }
}

.warning-box {
  text-align: center;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 10px 16px;
}

.warning-content {
  font-style: normal;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  color: var(--text-second);
  margin-top: 16px;
}

.warning-title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: var(--text);
}

.deposit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  .bank-info {
    font-size: 14px;
    color: #b8b8b8;
  }
}

input,
.input {
  min-width: 220px;

  @media (max-width: 500px) {
    min-width: 160px;
  }
  .custom-select {
    font-size: 14px;
    border: 1px solid #d0d5dd;
  }
}
.deposit-item .name {
  color: var(--text);
  text-transform: uppercase;
}
.disable {
  background: #dcdcdc;
}

.deposit-item input {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 10px 14px;
}

.deposit-item .item-price {
  color: var(--text);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
  border: 1px solid #000000;
  border-radius: 38px;
  margin-right: 10px;
  margin-top: 10px;
  transition: all linear 0.2s;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    color: #ffff;
    border: 1px solid #ffffff;
    background-color: #f1c7a0;
  }
}

@media (max-width: 375px) {
  .deposit-item .item-price {
    font-size: 12px !important;
  }
}

.deposit-item--left {
  justify-content: end;
  flex-wrap: wrap;
}

.btn-correction {
  background-color: var(--text-second);
  color: var(--bg) !important;
  text-transform: uppercase;
}

.btn-deposit {
  background-color: var(--primary);
  color: var(--bg);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  border-radius: 4px;
  margin: 0 auto;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .deposit-item input {
    max-width: 160px;
  }
}

@media (max-width: 768px) {
  .warning-content {
    font-size: 12px;
  }

  .warning-box {
    padding: 5px;
  }
}

@media (max-width: 280px) {
  .deposit-item input,
  .input {
    max-width: 100%;
    min-width: 100%;
  }
  .deposit-item {
    flex-wrap: wrap;
  }
  .name-none {
    display: none;
  }
  .div-280 {
    width: 100%;
  }
}
</style>
