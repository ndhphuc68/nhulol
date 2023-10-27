<template>
  <div class="container">
    <div class="lang-group">
      <Select
        :width="'120px'"
        :height="'50px'"
        :options="options"
        :isMobile="props.isMobile"
        :handleToggleSidebar="props.handleToggleSidebar"
        :tabIndex="0"
        @input="handleSelectInput"
        :default="currentLang"
      />
    </div>

    <div class="auth-action" v-if="!auth">
      <!--    <button class="login-btn" @click="handleOpenLogin('login')">-->
      <button class="login-btn" @click="handleOpenLogin('login')">
        {{ $t("login") }}
      </button>
      <button class="signup-btn" @click="handleOpenLogin('signUp')">
        {{ $t("signup") }}
      </button>
    </div>
    <div v-else class="user">
      <div>
        <div class="name-account">
          {{ userInfor?.me_account }}
        </div>
        <div class="title">
          {{ $t("welcome") }}
        </div>
      </div>
      <div class="loggout">
        <button @click="handleLoggout">
          <v-tooltip
              activator="parent"
              location="bottom"
          >{{ $t("logout") }}</v-tooltip>
          <img src="@/assets/icon/logout-icon.png" height="21" width="20" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, defineProps, watch } from "vue";
import { useI18n } from "vue-i18n";
import Select from "@/components/EDGames/customs/Select";
import images from "@/assets";
import { deleteCookie } from "@/utils/cookie";
import { useRouter } from "vue-router";
import { logoutRequest } from "@/api/auth/request";

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
  /*  {
    key: "mon",
    value: {
      text: "MO",
      img: require("@/assets/icon/languages/mon.jpg"),
    },
  },*/
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
  // await getWithdrawAllWhenCloseGame()
  // tabGame?.value.window.close()
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

const handleOpenLogin = (payload) => {
  if (props.isMobile) {
    props.handleToggleSidebar();
  }
  store.commit("handleToggle", payload);
};
</script>
<style scoped>
.auth-action {
  padding: 10px;
  display: flex;
}

.container {
  display: flex;
}

.login-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 12px 24px;
  align-items: center;
  width: 120px;
  height: 51px;
  color: #cc9a6c;
  background: var(--bg);
  /* Neutral / 200 */
  border: 1px solid #e4e4e7;
  border-radius: 5px;
  margin-right: 20px;
}

.signup-btn {
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  width: 120px;
  height: 51px;
  background: #cc9a6c;
  border-radius: 5px;
  justify-content: center;
  color: var(--bg);
}

.user {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 12px 0;
}

.name-account {
  font-weight: 700;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  font-size: 14px;
  line-height: 19px;
  color: #52525b;
  font-weight: 400;
  margin-top: 5px;
}

.loggout {
  margin-left: 25px;
  margin-top: 10px;
}

.auth-action .login-btn {
  margin-right: 10px;
}

.lang-group {
  display: flex;
  align-items: center;
  margin-right: 10px;
  /*border: 1px solid rgba(0, 0, 0, 0.05);*/
  /* padding: 0 10px; */
  width: 120px;
}

.lang-group img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .auth-action,
  .container {
    flex-direction: column;
  }

  .auth-action button:nth-child(1) {
    margin-bottom: 5px;
  }
}

@media (max-width: 768px) {
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
