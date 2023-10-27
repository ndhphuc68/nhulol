<template>
  <div class="container">
    <div class="info">
      <h3>{{ $t("generalInfo") }}</h3>
      <div class="content">
        <div class="field">
          <label> {{ $t("id") }}</label>
          <p>{{ auth?.me_account }}</p>
        </div>
        <div class="field">
          <label>{{ $t("nickname") }}</label>
          <p>{{ auth.me_nickname }}</p>
        </div>
        <div class="field">
          <label>{{ $t("phoneNumber") }}</label>
          <p>{{ auth.me_phone }}</p>
        </div>
        <div class="field">
          <label>{{ $t("registInfo") }}</label>
          <p>{{ auth?.me_join_done }}</p>
        </div>
        <div class="field">
          <label>{{ $t("connectionInfo") }}</label>
          <p>ON</p>
        </div>
        <div class="field">
          <label>{{ $t("dateOfRegist") }}</label>
          <p>{{ auth?.me_created }}</p>
        </div>
        <div class="field">
          <label>{{ $t("lastAccessDate") }}</label>
          <p>{{ auth?.me_last_date }}</p>
        </div>
        <div class="field">
          <label>{{ $t("country") }}</label>
          <p>{{ auth.country }}</p>
        </div>
      </div>
    </div>
    <div class="info">
      <h3>{{ $t("bankAccountInfo") }}</h3>
      <div class="content">
        <div class="field">
          <label>{{ $t("bankName") }}</label>
          <p>{{ auth?.me_bank_name }}</p>
        </div>
        <div class="field">
          <label> {{ $t("id") }}</label>
          <p>{{ auth?.me_bank_number }}</p>
        </div>
        <div class="field">
          <label>{{ $t("accountHolder") }}</label>
          <p>{{ auth?.me_bank_account }}</p>
        </div>
        <div class="field">
          <label>{{ $t("totalBalance") }}</label>
          <p>₩ {{ convertMoney(auth?.me_money) }}</p>
        </div>
      </div>
      <div class="d-flex mt-3 justify-end">
        <button
          class="d-flex align-items-center"
          @click="$emit('handleChangeTab', 1)"
        >
          <Edit class="me-1" />{{ $t("edit") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { convertMoney } from "@/utils";
import Edit from "@/assets/CasinoClub/icon/svg/Edit";

const store = useStore();
const auth = computed(() => store.state.auth.auth);
</script>

<style scoped lang="scss">
.container {
  position: relative;
  top: -80px;
  z-index: 1;
  padding: 0 8%;
  margin-bottom: 50px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 22px;

  .info {
    h3 {
      margin-bottom: 10px;
    }

    .content {
      padding: 32px;
      border-radius: 20px;
      border: 1px solid var(--rectangle-100, #f5f5f5);
      background: var(
        --glass-gradient,
        linear-gradient(
          202deg,
          rgba(250, 250, 250, 0.4) 0%,
          rgba(250, 250, 250, 0) 100%
        )
      );
      backdrop-filter: blur(7.5px);

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 22px;

      .field {
        label {
          color: #a1a1aa;
          font-size: 14px;
        }

        p {
          color: #3f3f46;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }

  button {
    border-radius: 20px;
    border: 1px solid #9e9e9e;
    padding: 8px 20px;

    color: #757575;
    font-size: 14px;
    transition: all 0.5s;

    &:hover {
      scale: 1.02;
      svg {
        path {
          fill: #fff !important;
        }
      }
    }

    &:focus {
      scale: 0.95;
    }
  }
}

@media (max-width: 768px) {
  .container {
    margin-top: 50px;
    padding: 0 12px;
    top: 0;
    grid-template-columns: repeat(1, 1fr);

    .info {
      h3 {
        color: var(--primaryCasinoClub);
      }
    }
  }
}
</style>
