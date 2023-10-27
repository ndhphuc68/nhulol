<template>
  <div class="container-auth">
    <div class="lang-group">
      <Select
        :default="currentLang"
        :height="'50px'"
        :minWidth="'120px'"
        :options="options"
        :tabIndex="0"
        @input="handleSelectInput"
      />
    </div>
    <div class="btn-login d-none d-lg-block" v-if="!auth">
      <button @click="handleCloseModal('login')">{{ $t("login") }}</button>
      <button @click="handleCloseModal('signUp')">{{ $t("register") }}</button>
    </div>
    <div v-else class="user d-none d-lg-flex">
      <div class="px-3">
        <div>
          <img
            src="@/assets/FSCasino/icons/total-balance.png"
            height="17"
            width="16"
            alt="icon"
          />
          <span style="font-size: 12px">{{ $t("total-balance") }}</span>
        </div>
        <div class="money text-center font-weight-bold">
          {{ convertMoney(userInfor?.me_money) }} {{ $t("won") }}
        </div>
      </div>
      <div class="betting px-3" @click="handleCloseModal('betting')">
        <img
          src="@/assets/FSCasino/icons/betting-history.png"
          height="25"
          width="25"
          alt="icon"
        />
        <span class="ms-1">{{ $t("betting-btn") }}</span>
      </div>
      <div class="px-3">
        <div class="name-account">
          <img
            src="@/assets/FSCasino/icons/user-icon.png"
            height="25"
            width="24"
            alt="icon"
          />
          {{ userInfor?.me_account }}
        </div>
      </div>
      <div class="loggout">
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          :title="$t('logout')"
          @click="handleLoggout"
        >
          <img
            src="@/assets/FSCasino/icons/logout-icon.png"
            height="20"
            width="20"
            alt="icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, defineProps, watch } from "vue";
import { useI18n } from "vue-i18n";
import Select from "@/components/FSCasino/Customs/Select";
import { handleCloseModal } from "@/utils";
import images from "@/assets";
import { deleteCookie } from "@/utils/cookie";
import { useRouter } from "vue-router";
import { logoutRequest } from "@/api/auth/request";
import { convertMoney } from "@/utils";

const store = useStore();
const i18n = useI18n();
const router = useRouter();

const props = defineProps({
  handleToggleSidebar: {
    type: Function,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const options = [
  {
    key: "ko",
    value: {
      text: "KO",
      img: images.ko,
    },
  },
  {
    key: "en",
    value: {
      text: "EN",
      img: images.en,
    },
  },
  {
    key: "th",
    value: {
      text: "TH",
      img: images.th,
    },
  },
  // {
  //   key: "mon",
  //   value: {
  //     text: "MO",
  //     img: require("@/assets/icon/languages/mon.jpg"),
  //   },
  // },
];

const auth = computed(() => store.state.auth.auth);
const userInfor = computed(() => store.state.user.userInfor);
const currentLang = ref(computed(() => i18n?.locale?.value));
const tabGame = computed(() => store.state.games.tab);

// pls no delete
watch(tabGame, () => {});

const handleSelectInput = (option) => {
  i18n.locale.value = option.key;
  localStorage.setItem("lang", option.key);
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
  await router.push("/");
  location.reload();
};
</script>
<style scoped lang="scss">
.auth-action {
  padding: 10px;
  display: flex;
}

.container-auth {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1024px) {
  .container-auth {
    flex-wrap: wrap;
  }
}

.btn-login {
  button {
    font-weight: 600;
    background: var(--white);
    padding: 0 1.5rem;

    &:hover {
      color: var(--pink);
    }

    &:first-child {
      border-right: 2px solid #000;
    }
  }
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  .name-account {
    font-weight: 700;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .money {
    color: #de6777;
  }
  .betting {
    border-right: 2px solid #000;
    border-left: 2px solid #000;
    &:hover {
      cursor: pointer;
    }
  }

  .loggout {
    margin-left: 15px;
  }
}

.auth-action .login-btn {
  margin-right: 10px;
}

.lang-group {
  display: flex;
  align-items: center;
  margin-right: 10px;
  /*border: 1px solid rgba(0, 0, 0, 0.05);*/
  padding: 0 10px;
  width: 120px;
}

.lang-group img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .container {
    flex-wrap: wrap;
  }

  .auth-action {
    flex-wrap: wrap;
  }

  .signup-btn {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .auth-action button:nth-child(1) {
    text-align: left;
    padding-left: 5px;
    margin-bottom: 5px;
  }

  .auth-action button {
    width: 100%;
  }

  .auth-action .login-btn {
    margin-right: 0;
  }

  .lang-group,
  .user {
    margin-left: 10px;
  }
}
</style>
<style>
.v-input__details {
  display: none;
}

.v-field__outline {
  --v-field-border-width: 0px;
}

.v-field__input {
  padding-top: 0;
}

.v-select__selection-text {
  display: flex;
  align-items: center;
}

.v-field--variant-underlined {
  --v-field-padding-bottom: 0px;
}

.v-field__append-inner {
  display: none;
}
</style>
