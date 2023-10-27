<template>
  <div class="withdraw">
    <article class="deposit-top text-start p-3">
      <div class="title">
        {{ $t("confirmation") }}
      </div>
      <div class="list-item">
        <div>{{ $t("transactionWarning") }}</div>
      </div>
    </article>
    <div class="deposit-bottom mt-3">
      <div class="left">
        <article class="bottom-item p-3">
          <div class="title-bottom p-3 text-center">
            {{ $t("holdingmoney") }}
          </div>
          <div class="py-3 text-center">
            <div class="money">
              {{ userInfor.me_money ? convertMoney(userInfor.me_money) : 0 }}
            </div>
            <div>{{ $t("won") }}</div>
          </div>
        </article>
        <article class="bottom-item p-3 depositor">
          <div class="title-bottom p-3 text-center">
            {{ $t("withdrawal") }}
          </div>
          <div class="my-2">
            <div class="title-account">{{ $t("bankName") }}</div>
            <div class="dropdown">
              <div
                aria-expanded="false"
                class="dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
              >
                {{ bankName ? $t(bankName) : $t("bankName") }}
              </div>
              <ul class="dropdown-menu">
                <li
                  v-for="(option, index) in banks"
                  :key="index"
                  @click="bankName = $t(option.name)"
                  :class="option.name === bankName ? 'active' : ''"
                >
                  <img
                    alt="ok logo"
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
          </div>
          <div class="my-2">
            <div class="title-account">{{ $t("banknumber") }}</div>
            <input type="number" placeholder="Enter" v-model="bankNumber" />
          </div>
          <div class="my-2">
            <div class="title-account">{{ $t("accountHolder") }}</div>
            <input type="text" placeholder="Enter" v-model="accountHolder" />
          </div>
        </article>
      </div>
      <article class="bottom-item p-3 text-center">
        <div class="title-bottom p-3">{{ $t("changeamount") }}</div>
        <div class="my-4">
          <input type="text" placeholder="0" :value="convertMoney(amount)" />
        </div>
        <div class="list-money">
          <button
            v-for="money in listMoney"
            :key="money"
            @click="() => handleClickChangeAmount(money)"
          >
            {{ convertMoney(money) }} won
          </button>
        </div>
        <div class="mt-3 text-end">
          <button
            class="me-3"
            @click="() => handleClickChangeAmount(-amount + withdrawMax)"
          >
            {{ $t("max") }}
          </button>
          <button class="reset" @click="() => handleClickChangeAmount(-amount)">
            {{ $t("reset") }}
          </button>
        </div>
      </article>
    </div>
    <div class="mt-3 text-center">
      <button class="primary-button" @click="handleSubmit">
        {{ $t("apply") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { convertMoney } from "@/utils/SCCasino";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const userInfor = computed(() => store.state.user.userInfor);
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const listMoney = [10000, 30000, 50000, 100000, 1000000, 5000000];
const amount = ref(0);
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : sessionStorage.getItem("mIdx")
  ? sessionStorage.getItem("mIdx")
  : null;
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

const handleClickChangeAmount = (value) => {
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

  store.commit("handleUpdateLoading", true);

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
  store.commit("handleUpdateLoading", false);
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
    memberIdx: mIdx,
  });
};

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
</script>

<style scoped lang="scss">
.dropdown {
  padding: 5px 14px;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #42a5f5;
  background: #fff;
  position: relative;

  .dropdown-option-label {
    font-size: 14px;
    opacity: 0.9;
    cursor: pointer;
    color: #a1a1aa;
  }

  .dropdown-toggle {
    font-size: 14px;
    color: #000;

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
.deposit-top {
  border-bottom: 1px solid #e0e0e0;
  .title {
    font-weight: 600;
    color: #d23449;
  }
  .list-item {
    padding: 0.5rem;
    font-size: 14px;

    @media (max-width: 375px) {
      font-size: 12px;
    }
  }
}
.deposit-bottom {
  display: grid;
  grid-template-columns: calc(40% - 17px) calc(60% - 17px);
  justify-content: space-between;
  grid-gap: 34px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .left {
    display: grid;
    grid-gap: 10px;

    .depositor {
      border: 1px solid #42a5f5;
      background: #e3f2fd;

      .title-bottom {
        border-bottom: 1px solid #42a5f5;
      }

      input {
        border: 1px solid #42a5f5;
        background: var(--bgSCCasino);
      }
    }
  }
  .bottom-item {
    border-radius: 12px;
    border: 1px solid #e3e3e3;
    background: #fafafa;
    .title-account {
      font-size: 14px;
    }
  }
  .title-bottom {
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  .money {
    font-size: 22px;
    color: var(--primarySCCasino);
    font-weight: 600;
  }
  .list-money {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px 8px;

    @media (max-width: 520px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  button {
    border-radius: 6px;
    border: 1px solid #e3e3e3;
    padding: 0.5rem 1.5rem;

    @media (max-width: 375px) {
      padding: 5px;
    }

    &:hover {
      background: #e3e3e3;
      color: var(--primarySCCasino);
    }
    &.reset {
      border: 1px solid #42a5f5;
      background: #bbdefb;
      color: var(--primarySCCasino);
      &:hover {
        color: var(--white);
      }
    }
  }
}
input {
  width: 100%;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  border: 0.75px solid #a1a1aa;
}

.v-btn__content {
  font-weight: 700;
}
</style>
