<script setup>
import { ref, computed } from "vue";
import BannerPage from "@/components/G2casino/BannerPage";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { setCookie } from "@/utils/cookie";
import { encryptDataV2 } from "@/utils/encrypt";
import { getPingRequest } from "@/api/getPing";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const store = useStore();
const user = ref({
  account: "",
  password: "",
});
const checkBox = ref(false);
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
  store.commit("handleUpdateLoading", true);
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
    // await getPingRequest()
    // store.commit("handleToggle", "login");
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
    store.commit("handleUpdateLoading", false);
    router.push("/");
    document.querySelector("html").style.overflowY = "scroll";
    // const myInterval = setInterval(handleFetchLogin, 10000)
    // const intervalPing = setInterval(() => getPingRequest(userInfor.value.me_idx), 5000)
    // await store.dispatch('startIntervalAction', myInterval)
    // await store.dispatch('startIntervalPingAction', intervalPing)
  } else {
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
    store.commit("handleUpdateLoading", false);
  }
};
</script>

<template>
  <div class="login-container">
    <BannerPage :page="$t('login')" />
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-12">
          <img
            class="banner-img"
            alt="banner-login"
            src="@/assets/G2casino/banner/banner-login.png"
          />
        </div>
        <div class="col-md-6 col-12">
          <div class="title-group">
            <h1>
              {{ $t("welcomeback") }}
            </h1>
            <!--                        <p>Yawl bilge fer execution jennys dock. Gaff lass bounty o'nine rig spyglass topmast shiver-->
            <!--                            gabion.</p>-->
            <!--                    -->
          </div>
          <form>
            <div class="form-item">
              <label for="username">{{ $t("account") }}</label>
              <InputText type="text" v-model="user.account" />
            </div>
            <div class="form-item">
              <label for="username">{{ $t("password") }}</label>
              <Password
                v-model="user.password"
                toggleMask
                :pt="{
                  panel: { class: 'panelPasswordLogin' },
                }"
              />
            </div>
            <div class="form-bottom d-flex justify-content-between">
              <div>
                <Checkbox
                  inputId="remain-pass"
                  v-model="checkBox"
                  :binary="true"
                />
                <label for="remain-pass" class="ms-2">
                  {{ $t("rememberPassword") }}
                </label>
              </div>
              <!--              <router-link to="/">-->
              <!--                {{ $t("forgetPassword") }}-->
              <!--              </router-link>-->
            </div>
            <div class="form-item">
              <Button type="submit" class="button" @click="handleLogin">{{
                $t("login")
              }}</Button>
            </div>
          </form>
          <div class="form-bottom d-flex">
            <p class="me-2">{{ $t("dontHaveAccount?") }}</p>
            <router-link to="/signup">
              {{ $t("signup") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  .container {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .title-group {
    text-align: left;
    margin-top: 1rem;
  }

  .banner-img {
    max-width: 100%;
    max-height: 600px;
  }

  form {
    .form-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: 1.25rem 0;

      input {
        width: 100%;
      }

      label {
        margin-bottom: 1rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    .banner-img {
      max-height: 350px;
    }
  }
}
</style>

<style lang="scss">
.login-container {
  .form-item {
    .p-password {
      width: 100%;

      input {
        width: 100%;
        padding-right: 2.5rem;
      }
    }

    .button {
      background-color: var(--primaryG2Casino);
      width: 100%;
      justify-content: center;
      color: #ffffff;
    }
  }
}

.panelPasswordLogin {
  display: none;
}
</style>
