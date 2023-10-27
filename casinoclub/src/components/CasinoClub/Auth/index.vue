<template>
  <section id="auth" class="d-flex">
    <Language />
    <div class="btn-group d-none d-md-block" v-if="!auth">
      <button class="btn-casino btn-login h-100">{{ $t("login") }}</button>
      <button class="btn-casino btn-signup h-100 ml-5">
        {{ $t("register") }}
      </button>
    </div>
    <div v-else class="profile d-lg-flex d-none align-items-center">
      <div class="balance">
        {{ $t("totalbalance") }}:
        <span>{{ convertMoney(auth.me_money) }}</span> ₩
      </div>
      <div class="name d-flex">
        <p>{{ auth.name }}</p>
        <IconLogout @click="handleLogout" />
      </div>
    </div>
  </section>
</template>
<script setup>
import Language from "./language.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { convertMoney } from "@/utils";
import IconLogout from "@/assets/CasinoClub/icon/svg/Logout.vue";

const store = useStore();
const auth = computed(() => store.state.auth.auth);

const handleLogout = () => {
  store.commit("handleAuth", null);
};
</script>

<style scoped lang="scss">
.profile {
  color: var(--white-grey);

  div {
    border-right: 1px solid #7a7a7a;
    padding: 0 10px;

    &:last-child {
      border-right: none;
    }
  }

  .balance {
    span {
      font-weight: 600;
    }
  }

  .betting {
    cursor: pointer;
  }

  .name {
    p {
      display: block;
      max-width: 80px;
      width: fit-content;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 0;
    }

    svg {
      cursor: pointer;
      margin-left: 10px;
    }
  }

  span {
    color: var(--primaryCasinoClub2);
  }
}
</style>
