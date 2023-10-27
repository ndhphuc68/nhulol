<template>
  <section>
    <article class="deposit-top text-start p-3">
      <div class="title">
        <img src="@/assets/FSCasino/icons/warning-icon.png" alt="warning" />
        {{ $t("confirmation") }}
      </div>
      <div class="list-item">
        <div>{{ $t("transactionWarning") }}</div>
      </div>
    </article>
    <div class="admin-info">
      <div>
        <h5 class="title-deposit mt-2">{{ $t("titleDepositPage") }}</h5>
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
    </div>
    <div class="deposit-bottom mt-3">
      <article class="bottom-item px-3 py-3">
        <div class="title-bottom pt-3 pb-4 text-center">
          {{ $t("holdingmoney") }}
        </div>
        <div class="py-5 text-center">
          <div class="money">
            {{ userInfor.me_money ? convertMoney(userInfor.me_money) : 0 }}
          </div>
          <div>{{ $t("won") }}</div>
        </div>
      </article>
      <article class="bottom-item px-3 py-3 text-center">
        <div class="title-bottom pt-3 pb-4">{{ $t("changeamount") }}</div>
        <div class="my-3">
          <input
            type="text"
            placeholder="0"
            :value="convertMoney(amount)"
            disabled
          />
        </div>
        <div class="list-money">
          <button
            v-for="money in listMoney"
            :key="money"
            @click="() => handleClickChangeAmount(money)"
          >
            {{ convertMoney(money) }} {{ $t("won") }}
          </button>
        </div>
        <div class="mt-3 text-end">
          <button
            class="me-3"
            @click="() => handleClickChangeAmount(-amount + depositMax)"
          >
            {{ $t("max") }}
          </button>
          <button class="reset" @click="() => handleClickChangeAmount(-amount)">
            {{ $t("reset") }}
          </button>
        </div>
      </article>
      <article class="bottom-item px-3 py-3">
        <div class="title-bottom pt-3 pb-4 text-center">
          {{ $t("depositor") }}
        </div>
        <div class="my-3">
          <div>
            <!--            <label class="user-bank" for="">{{ $t("bankName") }}</label>-->
            <!--            -->
            <!--            <input class="item-input mt-1" type="text" v-model="bankName" />-->
            <div class="field">
              <label class="label">{{ $t("bankName") }}</label>
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
                        require(`@/assets/PlayG3/bank/banklogo_${
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
            </div>
          </div>
        </div>
        <div class="my-3">
          <div>{{ $t("banknumber") }}</div>
          <input type="number" placeholder="Enter" v-model="bankNumber" />
        </div>
        <div class="my-3">
          <div>{{ $t("accountHolder") }}</div>
          <input type="text" placeholder="Enter" v-model="accountHolder" />
        </div>
      </article>
    </div>
    <div class="mt-4 text-center">
      <button class="primary-button" @click="depositAction">
        {{ $t("deposit") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { convertMoney } from "@/utils";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const userInfor = computed(() => store.state.user.userInfor);
const adminBank = computed(() => store.state.partnership.data);
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor?.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const listMoney = [10000, 30000, 50000, 100000, 1000000, 5000000];
const amount = ref(0);
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

const handleClickChangeAmount = (value) => {
  amount.value += value;
  if (amount.value > depositMax.value) amount.value = depositMax.value;
};

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
  store.commit("handleUpdateLoading", true);

  const res = await store.dispatch("depositAction", data);
  if (res?.is_success) {
    await handleGetListDeponsit();
    await store.dispatch("showAlert", {
      type: "success",
      message: t("depositRequestSuccess"),
    });
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t(res.message),
    });
  }
  store.commit("handleUpdateLoading", false);
};

const handleGetListDeponsit = async () => {
  await store.dispatch("getListDepositAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
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

<style lang="scss" scoped>
section {
  @media (max-width: 992px) {
    font-size: 12px;
  }
  @media (max-width: 374px) {
    padding: 0;
  }
}
.dropdown {
  padding: 0.5rem;
  border-radius: 20px;
  width: 100%;
  border: 0.75px solid #a1a1aa;
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
  background: url("@/assets/FSCasino/bg-deposit.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
  .title {
    font-weight: 600;
    color: #d23449;
  }
  .list-item {
    padding: 0.5rem 1rem;
    font-size: 14px;
    @media (max-width: 992px) {
    }
  }
}
.admin-info {
  padding: 0.5rem 1rem;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  margin-top: 1rem;
  .title-deposit {
    color: #d23449;
    font-weight: 600;
  }
}
.deposit-bottom {
  display: grid;
  grid-template-columns: 25% 46% 25%;
  justify-content: space-between;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  .bottom-item {
    border-radius: 12px;
    border: 1px solid #e3e3e3;
    background: #fafafa;
    @media(max-width: 375px) {
      padding: 0.5rem !important;
    }
  }
  .title-bottom {
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  .money {
    font-size: 30px;
    color: var(--pink);
    font-weight: 600;
  }
  .list-money {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem 1rem;
    @media(max-width: 375px) {
      grid-gap: 0.5rem;
    }
  }
  button {
    border-radius: 20px;
    border: 1px solid #e3e3e3;
    padding: 0.5rem 1.5rem;
    @media(max-width: 375px) {
      padding: 0.5rem 0.3rem;
      font-size: 10px;
    }
    &:hover {
      background: #e3e3e3;
      // box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
      color: var(--pink);
    }
    &.reset {
      border: 1px solid var(--light-red, #f1c0c7);
      background: var(--pink-100, #f9e2e5);
      color: var(--pink);
      &:hover {
        // box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
        color: var(--white);
      }
    }
  }
}
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 20px;
  border: 0.75px solid #a1a1aa;
  background: #fff;
}
</style>
