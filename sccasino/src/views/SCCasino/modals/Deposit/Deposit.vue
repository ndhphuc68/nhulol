<template>
  <div>
    <article class="deposit-top text-start p-3">
      <div class="title">
        {{ $t("confirmation") }}
      </div>
      <div class="list-item">
        <div>{{ $t("transactionWarning") }}</div>
      </div>
    </article>
    <div class="deposit-bottom mt-12">
      <div class="left">
        <article class="bottom-item p-4">
          <div class="title-bottom p-4 text-center">
            {{ $t("holdingmoney") }}
          </div>
          <div class="py-5 text-center">
            <div class="money">
              {{ userInfor.me_money ? convertMoney(userInfor.me_money) : 0 }}
            </div>
            <div>{{ $t('won') }}</div>
          </div>
        </article>
        <article class="bottom-item p-4 depositor">
          <div class="title-bottom p-4 text-center">
            {{ $t("depositor") }}
          </div>
          <div class="my-5">
            <input
              type="text"
              placeholder="Enter"
              :value="depositor"
              disabled
            />
          </div>
        </article>
      </div>
      <article class="bottom-item p-4 text-center">
        <div class="title-bottom p-4">{{ $t("changeamount") }}</div>
        <div class="my-5">
          <input type="number" placeholder="0" v-model="amount" />
        </div>
        <div class="list-money">
          <button
            v-for="money in listMoney"
            :key="money"
            @click="() => handleClickChangeAmount(money)"
          >
            {{ convertMoney(money) }} {{ $t('won') }}
          </button>
        </div>
        <div class="mt-4 text-end">
          <button
            class="me-3"
            @click="() => handleClickChangeAmount(-amount + 999999999)"
          >
            {{ $t("max") }}
          </button>
          <button class="reset" @click="() => handleClickChangeAmount(-amount)">
            {{ $t("reset") }}
          </button>
        </div>
      </article>
    </div>
    <div class="mt-4 text-center">
      <button class="primary-button" @click="depositAction">
        {{ $t("apply") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { convertMoney } from "@/utils/SCCasino";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
// const userInfor = computed(() => store.state.user.userInfor);
// const depositor = computed(() => store.state.user.userInfor.me_bank_account);
const depositor = ref("test");
const userInfor = ref({
  me_idx: "123123",
  me_invite_code: "123123",
  me_nickname: "test",
  me_money: 123123123,
});
const listMoney = [10000, 30000, 50000, 100000, 1000000, 5000000];
const amount = ref(0);

const handleClickChangeAmount = (value) => {
  amount.value += value;
  if (amount.value > 999999999) amount.value = 999999999;
};

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

<style scoped lang="scss">
.deposit-top {
  border-bottom: 1px solid var(--300, #e0e0e0);
  .title {
    font-weight: 600;
    color: #d23449;
  }
  .list-item {
    padding: 1rem;

    @media (max-width: 992px) {
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
    grid-gap: 34px;

    .depositor {
      border: 1px solid var(--400, #42a5f5);
      background: var(--50, #e3f2fd);

      .title-bottom {
        border-bottom: 1px solid var(--400, #42a5f5);
      }

      input {
        border: 1px solid var(--400, #42a5f5);
        background: var(--bgSCCasino);
      }
    }
  }
  .bottom-item {
    border-radius: 12px;
    border: 1px solid #e3e3e3;
    background: #fafafa;
  }
  .title-bottom {
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  .money {
    font-size: 30px;
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
    &:hover {
      background: #e3e3e3;
      color: var(--pink);
    }
    &.reset {
      border: 1px solid var(--400, #42a5f5);
      background: var(--100, #bbdefb);
      color: var(--pink);
      &:hover {
        color: var(--white);
      }
    }
  }
}
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 0.75px solid #a1a1aa;
}

.v-btn__content {
  font-weight: 700;
}
</style>
