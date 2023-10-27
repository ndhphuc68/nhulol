<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { deleteCookie } from "@/utils/cookie";
import { logoutRequest } from "@/api/auth/request";
import { convertMoney } from "@/utils";
import Diamond from "@/assets/PlayG3/icon/header/diamon.vue";
import Logout from "@/assets/PlayG3/icon/header/logout.vue";
import DropdownLang from "@/components/PlayG3/AuthGroup/DropdownLang.vue";
import Profile from "@/assets/SCCasino/icon/navbar-bottom/profile.vue";

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
</script>

<template>
  <div class="auth-container">
    <div class="d-none d-lg-block mr-4">
      <DropdownLang />
    </div>
    <div class="group-btn" v-if="!auth">
      <RouterLink class="btn-text btn-login" :to="{ name: 'Login' }">
        {{ $t("login") }}
      </RouterLink>
      <RouterLink class="btn-contained btn-signup" :to="{ name: 'Signup' }">
        {{ $t("signup") }}
      </RouterLink>
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
    color: var(--textPlayG3);
    text-decoration: none;
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
    
    @media (max-width: 375px) {
      svg{
        width: 16px;
        height: 16px;
      }
    }

    .btn-deposit {
      background-color: var(--primaryPlayG3);
      padding: 0 0.4rem;
      color: #ffff;
      border-radius: 5px;
      
      @media (max-width: 375px) {
        padding: 0 .3rem;
      }
    }

    .user {
      cursor: pointer;

      @media (max-width: 375px) {
        margin: 0.3rem;

        h5, .amount{
          font-size: 0.5rem;
        }
      }

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
