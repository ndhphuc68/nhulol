<script setup>
import { convertMoney } from "@/utils/PlayG3";
import { useStore } from "vuex";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";

const { t } = useI18n();
const amount = ref(0);
const store = useStore();
// const router = useRouter();
// const userInfor = computed(() => store.state.user.userInfor);
// const depositor = computed(() => store.state.user.userInfor.me_bank_account);
const depositor = "test deposit";

const prices = [10000, 30000, 50000, 100000, 300000, 500000, 1000000];

const userInfor = ref({
  me_money: 1231231,
  me_idx: 1223,
  me_invite_code: "TEST",
  me_nickname: "test",
});

const handleClickButton = (price) => (amount.value += price);

const handleResetAmount = () => (amount.value = 0);

const depositAction = async () => {
  const data = {
    Money: amount.value,
    Name: depositor.value,
    IsAndroid: true,
    WidthDrawPass: "",
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  };

  if (data.Money <= 0) return;

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
            :value="
              userInfor?.value?.me_money
                ? convertMoney(userInfor?.value?.me_money)
                : 0
            "
          />
        </div>
        <hr />
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("depositAmount") }}</h3>
          <p class="item-sub">{{ $t("desDepositAmount") }}</p>
        </div>
        <div class="col-lg-6 text-right">
          <input :value="convertMoney(amount)" class="item-input" disabled />
          <button class="correction" @click="handleResetAmount">
            {{ $t("correction") }}
          </button>
          <div class="price-group">
            <button
              v-for="(price, index) in prices"
              :key="index"
              class="btn-price"
              @click="handleClickButton(price)"
            >
              ₩ {{ convertMoney(price) }}
            </button>
          </div>
        </div>

        <hr />
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h3 class="item-title">{{ $t("depositor") }}</h3>
          <p class="item-sub">{{ $t("desDepositor") }}</p>
        </div>
        <div class="col-lg-6">
          <input class="item-input" type="text" disabled :value="depositor" />
        </div>
        <hr />
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="mr-2 btn-deposit"
          variant="contained"
          @click="depositAction"
        >
          {{ $t("deposit") }}
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
    border-radius: 4px;
    padding: 12px 14px;
    width: 100%;
    outline: none;
    color: var(--textPlayG3);
    background: #1a1c20;
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
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid var(--neutral-200, #e4e4e7);
    margin: 6px 7px;
    color: var(--textPlayG3);
    transition: all 0.5s;

    &:hover {
      color: var(--textPlayG3);
      background-color: var(--primaryPlayG3);
      transform: scale(0.95);
      border: 1px solid var(--primaryPlayG3);
      transition: all 0.5s;
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

@media (max-width: 768px) {
  .price-group {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 50% 50%;
  }
}
</style>
