<script setup>
import { languages } from "@/components/Duri/Header/data";
import Diamond from "@/assets/Duri/icon/header/diamond.vue";
import {ref, computed, watch, onMounted} from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { deleteCookie } from "@/utils/cookie";
import Button from "@/components/Duri/customs/Button/index.vue";
import { convertMoney } from "@/utils";
import { logoutRequest } from "@/api/auth/request";

const i18n = useI18n();
const store = useStore();
const router = useRouter();
const auth = computed(() => store.state.auth.auth);
const userInfor = computed(() => store.state.user.userInfor);

const lang = ref({
  key: i18n.locale.value,
  text: languages.find((item) => item.key === i18n.locale.value).text,
  image: languages.find((item) => item.key === i18n.locale.value).image,
});

watch(
  i18n.locale,
  () =>
    (lang.value = {
      key: i18n.locale.value,
      text: languages.find((item) => item.key === i18n.locale.value).text,
      image: languages.find((item) => item.key === i18n.locale.value).image,
    })
);
const handleClickLang = (option) => {
  i18n.locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    text: option.key,
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

const handleLoggout = async () => {
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
  store.commit("resetUser");
  await router.push("/");
  location.reload();
};
</script>

<template>
  <div class="wrapper-auth">
    <div class="dropdown d-none d-xl-flex">
      <button
        aria-expanded="false"
        class="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        type="button"
      >
        <img width="20" height="20" :src="lang.image" alt="lang" />&ensp;{{
          lang.text
        }}
      </button>
      <ul class="dropdown-menu">
        <li
          v-for="(item, index) in languages"
          :key="index"
          @click="handleClickLang(item)"
        >
          <a class="dropdown-item" href="#">
            <img width="20" height="20" :src="item.image" alt="img" />
            &ensp;{{ item.text }}
          </a>
        </li>
      </ul>
    </div>
    <div v-if="!auth" class="btn-auth">
      <button @click="handleOpenModalLogin">{{ $t("login") }}</button>
      <button @click="handleOpenModalSignup">{{ $t("signup") }}</button>
    </div>
    <div v-else class="diamond">
      <div class="user d-none d-md-block">
        <h5>{{ userInfor?.me_account }}</h5>
      </div>
      <div class="d-flex align-center auth-info">
        <Diamond />
        <div>
          <span class="balance d-block text-center">{{ $t("balance") }} </span>
          <span class="d-block amount">
            ₩{{ convertMoney(userInfor?.me_money) }}
          </span>
        </div>
        <div class="ml-2">
          <Button
            variant="contained"
            :style="{ padding: '5px 10px' }"
            :on-click="
              () => {
                router.push('/Deposit-page');
              }
            "
          >
            +
          </Button>
        </div>
        <button class="ml-6 d-none d-md-block " type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="$t('logout')" @click="handleLoggout">
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

  @media (max-width: 541px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 55px;
  }
}

.auth-info {
  @media (max-width: 768px) {
    border: 1px solid #e4e4e7;
    padding: 0.5rem;
    border-radius: 10px;
  }
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
  }

  .user {
    margin: 0 24px;
    max-width: 150px;

    h5 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .amount {
    display: -webkit-box;
    max-width: 105.28px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .dropdown-toggle {
    text-transform: uppercase;
    border: 1px solid #e4e4e7;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  a.dropdown-item {
    display: flex;
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
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0;
      text-align: left;
      border: #e4e4e7;
      background: #fff;

      &:last-child {
        background-color: var(--primaryPlayG1);
        color: #fff;
        margin-left: 0.5rem;
      }

      &:hover {
        background: var(--primaryPlayG1);
        color: var(--bg);
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
  }

  @media (max-width: 768px) {
    .btn-auth {
      margin: 0 0 0 10px;

      button {
        font-size: 14px;
      }
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
</style>
