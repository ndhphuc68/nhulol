<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import banners from "@/assets/Doplay/banners";
import Button from "@/components/DoPlay/Customs/Button";
import { useI18n } from "vue-i18n";
import { encryptDataV2 } from "@/utils/encrypt";
import { getPingRequest } from "@/api/getPing";
import { setCookie } from "@/utils/cookie";

const { t } = useI18n();
const checkBox = ref(false);
const store = useStore();
const user = ref({
  account: "",
  password: "",
});
const isLoading = ref(false);
const userInfor = computed(() => store.state.user.userInfor);

const handleGetMe = async () => {
  await store.dispatch("getMeAction", {
    memberIdx: userInfor.value.me_idx,
  });
};

const handleGetListDeponsit = async () => {
  await store.dispatch("getListDepositAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.nickname,
  });
};

const handleGetListWithDraw = async () => {
  await store.dispatch("getListWithDrawAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.nickname,
  });
};

const handleGetListMessage = async () => {
  await store.dispatch("getListMessageAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.nickname,
  });
};

const handleGetListHelp = async () => {
  await store.dispatch("getListHelpAction", {
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.nickname,
  });
};

const handleFetchLogin = async () => {
  await handleGetMe();
  await handleGetListDeponsit();
  await handleGetListWithDraw();
  await handleGetListMessage();
  await handleGetListHelp();
};

const handleLogin = async (e) => {
  e.preventDefault();
  if (user.value.account.length < 1) {
    store.dispatch("showAlert", {
      type: "error",
      message: t("signuperroraccount"),
    });

    return;
  }

  if (user.value.password.length < 1) {
    store.dispatch("showAlert", {
      type: "error",
      message: t("signuperrorpassword"),
    });

    return;
  }
  await store.commit("handleUpdateLoading", true);
  isLoading.value = true;
  const res = await store.dispatch("loginAction", user.value);
  if (store.state.auth.auth && res.is_success) {
    if (checkBox.value) {
      localStorage.setItem("mIdx", res.mIdx);
      localStorage.setItem("_slg", encryptDataV2(JSON.stringify(user.value)));
    } else {
      setCookie("mIdx", res.mIdx);
      sessionStorage.setItem("mIdx", res.mIdx);
    }
    await handleFetchLogin();
    await getPingRequest();
    store.commit("handleToggle", "login");
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
    await store.commit("handleUpdateLoading", false);
    const myInterval = setInterval(handleFetchLogin, 10000);
    const intervalPing = setInterval(
      () => getPingRequest(userInfor.value.me_idx),
      5000
    );
    await store.dispatch("startIntervalAction", myInterval);
    await store.dispatch("startIntervalPingAction", intervalPing);
  } else {
    await store.commit("handleUpdateLoading", false);
    if (res?.error_code == "-100004") {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_code_100004"),
      });
    } else if (res?.error_code == "-100005") {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_code_100005"),
      });
    } else if (res?.error_code == "-100006") {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_code_100006"),
      });
    }
    else if (res?.error_code == "-100007") {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_code_100007"),
      });
    }
    else if (res?.error_code == "-100008") {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_code_100008"),
      });
    } else {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("login_failed"),
      });
    }
    isLoading.value = false;
  }
};

const handleOpenSignup = () => {
  store.commit("handleToggle", "login");
  store.commit("handleToggle", "signUp");
};
</script>

<template>
  <div class="d-flex justify-center">
    <div class="banner v-col-6 d-none d-md-block h-100">
      <img class="w-100 h-100" :src="banners.login" alt="banner" />
    </div>
    <div
      class="login-form v-col-12 v-col-md-6 h-100 d-flex align-center justify-center flex-column w-100"
    >
      <div class="login-title">
        <h5>{{ $t("login") }}</h5>
      </div>
      <form class="form-content w-100">
        <v-col cols="12" sm="12">
          <!-- error in  hint=""-->
          <div class="form-item">
            <label>{{ $t("account") }}</label>
            <input v-model="user.account" type="text" class="form-control" />
          </div>
          <div class="form-item mb-2">
            <label>{{ $t("password") }}</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
            />
          </div>
          <div>
            <v-checkbox
              v-model="checkBox"
              color="secondary"
              :label="$t('keepmesignedin')"
            ></v-checkbox>
          </div>
          <div class="d-flex justify-space-evenly">
            <Button class="btn-login" variant="contained" :onClick="handleLogin"
              >{{ $t("login") }}
            </Button>
            <!--            <Button class="btn-login" variant="contained">{{ $t("guest-mail") }}</Button>-->
          </div>
          <div class="form-item d-flex justify-center">
            <p>{{ $t("no-account") }}</p>
            <span @click="handleOpenSignup"> &nbsp;{{ $t("signup") }}</span>
          </div>
        </v-col>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 1120px;
  max-height: 100vh;
  max-width: 100vw;
}

.banner {
  img {
    object-fit: cover;
  }
}

.login-title {
  padding-bottom: 22px;
  width: 95%;
  margin: 0 auto 0;
  border-bottom: 1px solid var(--primaryDoplay);
}

.login-title h5 {
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
  font-weight: 700;

  @media (max-width: 375px) {
    font-size: 18px;
  }
}

.form-item {
  margin: 35px 0;
  @media (max-width: 375px) {
    margin: 15px 0;
  }
  p {
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }
  span {
    color: #e592ed;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    cursor: pointer;
    @media (max-width: 375px) {
      font-size: 12px;
    }
  }
  label {
    @media (max-width: 375px) {
      font-size: 13px;
    }
  }
}

.btn-login {
  width: 42%;
  @media (max-width: 375px) {
    font-size: 13px;
  }
}

input {
  color: black;
  height: 45px;
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #dee2e6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

label {
  color: #52525b;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>

<style lang="scss">
.v-selection-control .v-label {
  @media (max-width: 375px) {
    font-size: 13px;
  }
}
</style>
