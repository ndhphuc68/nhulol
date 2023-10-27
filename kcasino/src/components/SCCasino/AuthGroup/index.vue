<script setup>
import { languages } from "@/components/SCCasino/Header/data";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import Button from "@/components/SCCasino/customs/Button";
import { deleteCookie } from "@/utils/cookie";
import { logoutRequest } from "@/api/auth/request";

const i18n = useI18n();
const store = useStore();
const auth = computed(() => store.state.auth.auth);
const userInfor = computed(() => store.state.user.userInfor);

const lang = ref({
  key: i18n.locale.value,
  image: languages.find((item) => item.key === i18n.locale.value)?.image,
});
const handleClickLang = (option) => {
  i18n.locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    image: option.image,
  };
};
const handleOpenModalLogin = () => {
  store.commit("handleToggle", "login");
};

const handleOpenModalSignup = () => {
  store.commit("handleToggle", "signUp");
};

const handleLogout = async () => {
  store.commit("handleAuth");
  localStorage.removeItem("_slg");
  localStorage.removeItem("mIdx");
  sessionStorage.clear();
  store.commit("clearWithDraw");
  store.commit("clearDeposit");
  store.commit("clearMessage");
  store.commit("clearHelpCenter");
  store.commit("resetUser");
  store.commit("clearAuthInfor");
  await store.dispatch("clearIntervalAction");
  await store.dispatch("clearIntervalPingAction");
  deleteCookie("MDS");
  deleteCookie("CID");
  deleteCookie("mIdx");
  await logoutRequest();
  location.reload();
};
</script>

<template>
  <div class="wrapper-auth">
    <div class="dropdown">
      <button
        aria-expanded="false"
        class="btn dropdown-toggle d-flex align-items-center"
        data-bs-toggle="dropdown"
        type="button"
      >
        <img :src="lang?.image" alt="lang" /> {{ lang.key }}
      </button>
      <ul class="dropdown-menu">
        <li
          v-for="(item, index) in languages"
          :key="index"
          @click="handleClickLang(item)"
        >
          <button class="dropdown-item" style="text-transform: uppercase">
            <img :src="item?.image" alt="img" />
            {{ item.key }}
          </button>
        </li>
      </ul>
    </div>
    <div v-if="!auth" class="btn-auth d-none d-md-block">
      <Button variant="outlined" :on-click="handleOpenModalLogin">{{
        $t("login")
      }}</Button>
      <Button variant="contained" :on-click="handleOpenModalSignup">{{
        $t("signup")
      }}</Button>
    </div>
    <div v-else class="diamond">
      <div class="user d-none d-md-block">
        <div>{{ userInfor?.me_account }}</div>
      </div>
      <div class="d-flex align-center">
        <button class="ml-6 d-none d-md-block" @click="handleLogout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2.75005H5.88C5.08747 2.71472 4.31319 2.99475 3.72661 3.52886C3.14002 4.06297 2.78888 4.80768 2.75 5.60005V18.4C2.78888 19.1924 3.14002 19.9371 3.72661 20.4712C4.31319 21.0054 5.08747 21.2854 5.88 21.25H12"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.99875 12H21.2188"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.25 12L17.25 16"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.25 12L17.25 8"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.balance {
  font-size: 0.75rem;
  color: var(--text-second);
}

.wrapper-auth {
  display: flex;
  align-items: center;

  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
    border: 1px solid #bebaba;
    border-radius: 50%;
    @media (max-width: 375px) {
      width: 1rem;
      height: 1rem;
    }
  }

  .user {
    margin: 0 24px;
    max-width: 95.95px;
    div {
      font-weight: 600;
    }

    h5 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0;
    }
  }

  .amount {
    display: -webkit-box;
    max-width: 105.28px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-toggle {
    text-transform: uppercase;
    border: 1px solid #e4e4e7;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 375px) {
      font-size: 12px;
    }
    img {
      @media (max-width: 375px) {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  a.dropdown-item {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .btn-auth {
    margin: 0 0.8rem;
    display: flex;

    button {
      height: 3rem;
      padding: 0 1rem;
      border-radius: 0.6rem;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0;
      margin: 0 0.3rem;
      text-align: left;

      &:nth-child(1) {
        border: 1px solid #ccc;
      }
    }
  }

  .language {
    .btn-secondary {
      background: transparent !important;
    }

    .dropdown-menu {
      .dropdown-item {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
    }

    .dropdown-item {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }

  .diamond {
    display: flex;
    align-items: center;
    margin-left: 10px;

    svg {
      margin-right: 0.5rem;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }
}
</style>
<style lang="scss">
.wrapper-auth {
  .dropdown-menu {
    min-width: 6.5rem !important;
  }
}

.dropdown-item {
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
</style>
