<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { deleteCookie } from "@/utils/cookie";
import { logoutRequest } from "@/api/auth/request";
import { convertMoney } from "@/utils";
import Diamond from "@/assets/Play4G/icon/Header/diamond.vue";
import Logout from "@/assets/Play4G/icon/Header/logout.vue";
import DropdownLang from "@/components/Play4G/AuthGroup/DropdownLang.vue";
import Profile from "@/assets/Play4G/icon/Header/profile.vue";

const store = useStore();
const auth = computed(() => store.state.auth.auth);
const userInfor = computed(() => store.state.user.userInfor);
const router = useRouter();
const handleLogout = async () => {
  store.commit("handleAuth");
  localStorage.removeItem("_slg");
  localStorage.removeItem("mIdx");
  sessionStorage.clear();
  await store.dispatch("clearIntervalAction");
  await store.dispatch("clearIntervalPingAction");
  deleteCookie("MDS");
  deleteCookie("CID");
  deleteCookie("mIdx");
  await logoutRequest();
  await router.push("/");
  location.reload();
};
const handleLogin =()=> {
  store.commit("handleToggle",'login');
}
const handleSignup =()=> {
  store.commit("handleToggle",'signUp');
}
</script>

<template>
  <div class="auth-container">
    <div class="d-none d-lg-block mr-4">
      <DropdownLang />
    </div>
    <div v-if="!auth">
      <button class="btn-text btn-login" @click="handleLogin">
        {{ $t("login") }}
      </button>
      <button class="btn-contained btn-signup" @click="handleSignup">
        {{ $t("signup") }}
      </button>
    </div>
    <div v-else class="diamond-group">
      <component :is="Diamond" />
      <div class="user">
        <h5 class="btn-hover">{{ userInfor?.me_account }}</h5>
        <span class="btn-hover amount"
          >₩ {{ convertMoney(userInfor?.me_money) }}</span
        >
        <ul class="user-action">
          <li class="user-action-item">
            <router-link
              class="link btn-hover d-flex justify-content-between"
              :to="{ name: 'Profile' }"
              >{{ $t("profile") }}
              <component class="ms-3" :is="Profile" />
            </router-link>
          </li>
          <li class="user-action-item">
            <button
              class="btn-login btn-hover d-flex justify-content-between"
              @click="handleLogout"
            >
              <span>{{ $t("logout") }}</span>
              <component class="ms-3" :is="Logout" />
            </button>
          </li>
        </ul>
      </div>
      <router-link :to="{ name: 'Deposit' }" class="btn-deposit">
        <i class="pi pi-plus" style="font-size: 0.7rem"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-container {
  display: flex;
  align-items: center;

  .btn-login,
  .user,
  .btn-signup {
    margin-right: 0.875rem;
    color: #fff;
    text-decoration: none;
  }
  
  .btn-signup{
    background-color: var(--primaryPlay4G);
    padding: 10px 24px;
    border-radius: 10px;
    margin-right: 0;
  }

  .user {
    margin: 0 0.8rem;
    max-width: 90px;

    h5 {
      width: 100%;
      color: var(--textSecondPlayG3);
      font-size: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .amount {
      white-space: nowrap;
      max-width: 105.28px;
      font-size: 0.825rem;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .diamond-group {
    display: flex;
    align-items: center;
    position: relative;

    .btn-deposit {
      background-color: var(--primaryPlayG3);
      padding: 0 0.4rem;
      color: #ffff;
      border-radius: 5px;
    }

    .user {
      cursor: pointer;

      &:hover {
        .user-action {
          display: block;

          @media (max-width: 1200px) {
            display: none;
          }
        }
      }
    }

    .user-action {
      position: absolute;
      z-index: 5;
      display: none;
      top: 100%;
      left: -30px;
      list-style: none;
      background-color: #1a1c20;
      padding: 1rem;
      border-radius: 8px;

      .user-action-item {
        padding: 0.875rem;

        .btn-login {
          margin-right: 0 !important;
          width: 100%;
        }
      }

      .link {
        display: block;
        text-decoration: none;
        color: var(--textPlayG3);
      }
    }
  }
}
</style>
