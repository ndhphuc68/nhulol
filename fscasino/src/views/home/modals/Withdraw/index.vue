<template>
  <section>
    <article class="deposit-top text-start px-3 py-3">
      <div class="title">
        <img src="@/assets/icons/warning-icon.png" alt="warning" />
        Confirmation/Must read
      </div>
      <ul class="list-item">
        <li v-for="idx in 6" :key="idx">
          Lorem Ipsom Lorem Ipsom Lorem Ipsom asd asd asd asd asd asd asd asasd
          asd á dá {{ idx }}
        </li>
      </ul>
    </article>
    <div class="deposit-bottom mt-3">
      <article class="bottom-item px-3 py-3">
        <div class="title-bottom pt-3 pb-4">Current holding money</div>
        <div class="py-5">
          <div class="money">0</div>
          <div>{{ $t('won') }}</div>
        </div>
      </article>
      <article class="bottom-item px-3 py-3">
        <div class="title-bottom pt-3 pb-4">Changing Amount</div>
        <div class="my-3">
          <input type="text" placeholder="0" v-model="amount" />
        </div>
        <div class="list-money">
          <button
            v-for="money in listMoney"
            :key="money"
            @click="() => handleClickChangeAmount(money)"
          >
            {{ money }} {{ $t('won') }}
          </button>
        </div>
        <div class="mt-3 text-end">
          <button
            class="me-3"
            @click="() => handleClickChangeAmount(-amount + 999999999)"
          >
            MAX
          </button>
          <button class="reset" @click="() => handleClickChangeAmount(-amount)">
            Reset
          </button>
        </div>
      </article>
      <article class="bottom-item px-3 py-3">
        <div class="title-bottom pt-3 pb-4">Withdrawer</div>
        <div class="my-3">
          <input type="text" placeholder="Enter" />
        </div>
      </article>
    </div>
    <div class="mt-5">
      <button class="primary-button">Apply</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const listMoney = [10000, 30000, 50000, 100000, 1000000, 5000000];
const amount = ref(0);

const handleClickChangeAmount = (value) => {
  amount.value += value;
  if (amount.value > 999999999) amount.value = 999999999;
};
</script>

<style lang="scss" scoped>
.deposit-top {
  background: url("@/assets/bg-deposit.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  .title {
    font-weight: 600;
    color: #d23449;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style-type: circle;
    padding: 1rem 2rem 0.5rem 2rem;
    font-size: 14px;
    li {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .list-item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    grid-column-gap: 3rem;
  }
}
.deposit-bottom {
  display: grid;
  grid-template-columns: 25% 46% 25%;
  justify-content: space-between;
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
    color: var(--pink);
    font-weight: 600;
  }
  .list-money {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem 1rem;
  }
  button {
    border-radius: 20px;
    border: 1px solid #e3e3e3;
    padding: 0.5rem 1.5rem;
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
}
</style>
