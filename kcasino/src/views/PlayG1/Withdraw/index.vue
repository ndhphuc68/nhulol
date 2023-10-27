<template>
  <div class="container">
    <h2>{{ $t("withdraw") }}</h2>
    <div class="card">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("totalBalance") }}</h3>
          <p class="item-sub">{{ $t("desTotalBalance") }}</p>
        </div>
        <div class="col-lg-6">
          <input
            class="item-input disable-input"
            type="text"
            disabled
            :value="userInfor.me_money ? convertMoney(userInfor.me_money) : 0"
          />
        </div>
        <hr />
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <h3 class="item-title">{{ $t("withdrawAmount") }}</h3>
          <p class="item-sub">{{ $t("desWithdrawAmount") }}</p>
        </div>
        <div class="col-12 col-lg-6 text-right">
          <input
            :value="convertMoney(amount)"
            class="item-input disable-input"
            disabled
          />
          <button class="correction" @click="handleResetAmount">
            {{ $t("correction") }}
          </button>
          <div class="price-group">
            <button
              v-for="(price, index) in prices"
              :key="index"
              class="btn-price"
              @click="handleClickButtonPrice(price)"
            >
              {{ convertMoney(price) }}
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
        <Button class="mr-2" variant="contained" @click="handleSubmit">
          {{ $t("withdraw") }}
        </Button>
        <Button @click="() => router.push('/')">
          {{ $t("cancel") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, onMounted} from "vue";
import { convertMoney } from "@/utils";
import Button from "@/components/PlayG1/customs/Button/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const router = useRouter();
const userInfor = computed(() => store.state.user.userInfor);
const amount = ref(0);
const bankName = ref(userInfor?.value.me_bank_name);
const bankNumber = ref(userInfor.value.me_bank_number);
const accountHolder = ref(userInfor?.value.me_bank_account);
const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];
const mIdx = localStorage.getItem("mIdx")
  ? localStorage.getItem("mIdx")
  : sessionStorage.getItem("mIdx")
  ? sessionStorage.getItem("mIdx")
  : null;
const withdrawMax = computed(() => store.getters.getWithdrawMax);
const withdrawMin = computed(() => store.getters.getWithdrawMin);
const transaction = computed(() => store.getters.getTransaction)

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
const handleClickButtonPrice = (value) => {
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
    amount.value=0;
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

onMounted(()=> {
  transaction.value === "YES" && router.push('/')
})

</script>

<style lang="scss" scoped>
.title h3 {
  margin: 2rem 0;
}
.disable-input {
  background: #e4e4e7;
  font-size:14px;
}

.dropdown {
  padding: 12px 14px;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #e4e4e7;
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

.card {
  padding: 32px;
  margin-top: 32px;
  @media (max-width: 375px) {
    padding: 1rem;
  }

  .item-title {
    font-size: 1.25rem;
  }

  .item-sub {
    font-size: 0.875rem;
    color: var(--text-second);
  }

  .item-input {
    border-radius: 4px;
    border: 1px solid var(--neutral-200, #e4e4e7);
    padding: 12px 14px;
    width: 100%;
    outline: none;
  }

  .correction {
    font-size: 0.8rem;
    text-decoration-line: underline;
    padding: 10px;

    &:hover {
      color: var(--primaryPlayG1);
      transform: scale(0.98);
    }
  }

  .btn-price {
    padding: 8px 16px;
    border-radius: 38px;
    border: 1px solid var(--neutral-200, #e4e4e7);
    margin: 6px 7px;

    &:hover {
      color: #ffffff;
      background-color: var(--primaryPlayG1);
      transform: scale(0.98);
    }
    @media (max-width: 568px) {
      font-size: 14px;
      padding: 4px 8px;
      margin: 6px 4px;
    }
  }

  hr {
    border: 1px solid #e4e4e7;
    margin: 48px 0;
    @media (max-width: 375px) {
      margin: 1.5rem 0;
    }
  }
}
</style>
