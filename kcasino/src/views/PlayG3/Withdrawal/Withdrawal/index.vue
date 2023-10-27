<script setup>
import { convertMoney } from "@/utils/PlayG3";
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";

const { t } = useI18n();
const amount = ref(0);
const store = useStore();
// const router = useRouter();
const userInfor = computed(() => store.state.user.userInfor);
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : sessionStorage.getItem("mIdx")
  ? sessionStorage.getItem("mIdx")
  : null;
const withdrawMax = computed(() => store.getters.getWithdrawMax);
const withdrawMin = computed(() => store.getters.getWithdrawMin);

const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];

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
const handleClickButton = (value) => {
  amount.value += value;
  if (amount.value > withdrawMax.value) amount.value = withdrawMax.value;
  else {
    if (amount.value > userInfor?.value.me_money) {
      amount.value = userInfor?.value.me_money || 0;
    }
    if (amount.value < withdrawMin.value) amount.value = 0;
  }
};

const handleResetAmount = () => (amount.value = 0);

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
  if (bankNumber?.value.length < 1) {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccountnumber"),
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

  store.commit("handleUpdateLoading", true);

  const res = await store.dispatch("withdrawAction", data);
  if (res?.is_success) {
    await handleGetMe();
    await handleGetListWithDraw();
    await store.dispatch("showAlert", {
      type: "success",
      message: t("withdrawRequestSuccess"),
    });
    amount.value = 0;
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

<template>
  <div class="container">
    <div class="card">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("totalBalance") }}</h3>
          <p class="item-sub">{{ $t("desTotalBalance") }}</p>
        </div>
        <div class="col-lg-6">
          <input
            class="item-input"
            type="text"
            disabled
            :value="userInfor?.me_money ? convertMoney(userInfor?.me_money) : 0"
          />
        </div>
        <hr />
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("withdrawAmount") }}</h3>
          <p class="item-sub">{{ $t("withdrawAmount") }}</p>
        </div>
        <div class="col-lg-6 text-right">
          <input :value="convertMoney(amount)" class="item-input" disabled />
          <div class="price-group mt-3">
            <button
              v-for="(price, index) in prices"
              :key="index"
              class="btn-price"
              @click="handleClickButton(price)"
            >
              ₩ {{ convertMoney(price) }}
            </button>
            <button class="btn-price" @click="handleResetAmount">
              {{ $t("correction") }}
            </button>
          </div>
        </div>

        <hr />
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("withdrawal") }}</h3>
          <p class="item-sub">{{ $t("desWithdrawal") }}</p>
        </div>
        <div class="col-lg-6">
          <div>
            <!--            <label class="user-bank" for="">{{ $t("bankName") }}</label>-->
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
                  {{ bankName ? $t(bankName.toUpperCase()) : $t("bankName") }}
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
          <div class="mt-3">
            <label class="user-bank" for="">{{ $t("banknumber") }}</label>
            <input
              class="item-input enable-input mt-1"
              type="number"
              v-model="bankNumber"
            />
          </div>
          <div class="mt-3">
            <label class="user-bank" for="">{{ $t("accountHolder") }}</label>
            <input
              class="item-input enable-input mt-1"
              type="text"
              v-model="accountHolder"
            />
          </div>
        </div>
        <hr />
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="mr-2 btn-deposit"
          variant="contained"
          @click="handleSubmit"
        >
          {{ $t("withdraw") }}
        </button>
        <!-- <Button @click="() => router.push('/')">
          {{ $t("cancel") }}
        </Button> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title h3 {
  margin: 2rem 0;
}
.label {
  color: var(--textSecondPlayG3);
}
.dropdown {
  padding: 12px 14px;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #6a6675;
  background: #fff;
  position: relative;

  .dropdown-option-label {
    font-size: 14px;
    opacity: 0.9;
    cursor: pointer;
    color: #000;
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
.admin-bank {
  .title-info {
    color: var(--textSecondPlayG3);
  }

  .detail-info {
    font-size: 1.5rem;
    @media (max-width: 1200px) {
      font-size: 1rem;
    }
  }
}
.user-bank {
  color: var(--textSecondPlayG3);
}

.card {
  padding: 32px 0;
  margin-top: 32px;
  border: 0;
  background: transparent;
  .item-title {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    color: var(--textPlayG3);
  }

  .item-sub {
    font-size: 0.875rem;
    color: var(--textSecondPlayG3);
    text-align: left;
  }

  .item-input {
    font-family: Manrope, sans-serif;
    border-radius: 4px;
    padding: 12px 14px;
    width: 100%;
    outline: none;
    color: var(--textPlayG3);
    background: #a9a9a9;
    font-weight: 600;
    font-size: 18px;
  }
  .enable-input {
    background: #fff;
    color: #000;
  }

  .correction {
    font-size: 0.8rem;
    text-decoration-line: underline;
    padding: 10px;
    color: var(--textSecondPlayG3);

    &:hover {
      color: var(--textPlayG3);
      transform: scale(0.98);
    }
  }

  .btn-price {
    width: 7rem;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid var(--neutral-200, #e4e4e7);
    margin: 6px 7px;
    color: var(--textPlayG3);

    &:hover {
      color: var(--textPlayG3);
      background-color: var(--primaryPlayG3);
      transform: scale(0.98);
      border: 1px solid var(--primaryPlayG3);
    }

    @media (max-width: 375px) {
      width: 5rem;
    }
  }
  .btn-deposit {
    background: var(--primaryPlayG3) !important;
    color: var(--textPlayG3);
    border-radius: 8px;
    padding: 12px 24px;
    transition: all linear 0.2s;

    &:hover {
      opacity: 0.8;
      transform: scale(0.97);
      transition: all linear 0.2s;
    }
  }

  hr {
    border: 1px solid #e4e4e7;
    margin: 48px 0;
  }
}

//@media (max-width: 768px) {
//  .price-group {
//    display: grid;
//    flex-wrap: wrap;
//    grid-template-columns: 50% 50%;
//  }
//}
</style>
