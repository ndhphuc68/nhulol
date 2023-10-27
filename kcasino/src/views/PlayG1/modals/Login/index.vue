<template>
<!--  <div class="loading" v-if="isLoading">-->
<!--    &lt;!&ndash;    <button class="loading-close" @click="handleCloseModal">&ndash;&gt;-->
<!--    &lt;!&ndash;      <img alt="btn-close" src="@/assets/icon/close-icon.png"/>&ndash;&gt;-->
<!--    &lt;!&ndash;    </button>&ndash;&gt;-->
<!--    <div>-->
<!--      <Loading />-->
<!--    </div>-->
<!--  </div>-->
  <div class="popup-login">
    <div class="login-item img-wrap">
      <img
        alt="login"
        src="../../../../assets/PlayG1/banner/banner_login.png"
      />
    </div>
    <div class="login-item login-info">
      <div class="title">
        <h3>{{ $t("welcomeBack!") }}</h3>
      </div>
      <form action="">
        <div class="d-flex flex-column mb-3">
          <label for="account">{{ $t("account") }}</label>
          <input
            id="account"
            v-model="user.account"
            :placeholder="$t('enterUserId')"
            type="text"
            @input="handleChangeInput"
          />
          <!--          <span v-if="regexEmail">báo lỗi</span>-->
        </div>
        <div class="d-flex flex-column mb-3">
          <label for="password">{{ $t("password") }}</label>
          <input
            id="password"
            v-model="user.password"
            :placeholder="$t('enterPassword')"
            type="password"
          />
        </div>
        <div class="d-flex flex-wrap justify-content-between mb-3">
          <div class="rememberPass d-flex">
            <input id="check-in" type="checkbox" />
            <label for="check-in">{{ $t("rememberPassword") }}</label>
          </div>
<!--          <div class="forgotPass">-->
<!--            <span>{{ $t("forgotPassword") }}</span>-->
<!--          </div>-->
        </div>
        <div class="submitLogin">
          <input :value="$t('login')" type="submit" @click="handleLogin" />
        </div>
      </form>
      <div class="noLogin text-center mt-3">
        <span>{{ $t("dontHaveAccount?") }}</span>
        <span
            @click="
              handleCloseModal('signUp');
              handleCloseModal('login');
            "
        >{{ $t("SignUpFree") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { encryptDataV2 } from "@/utils/encrypt";
import { setCookie } from "@/utils/cookie";
import { getPingRequest } from "@/api/getPing";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {handleCloseModal} from "@/utils";

const user = ref({
  account: "",
  password: "",
});
const { t } = useI18n();
const isLoading = ref(false);
const checkBox = ref(false);
const store = useStore();
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
    await store.dispatch('getBankAction')
    await handleFetchLogin();
    // await getPingRequest()
    isLoading.value = false;
    store.commit("handleToggle", "login");
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
    store.commit("handleUpdateLoading", false);
    document.querySelector("html").style.overflowY = "scroll";
    const myInterval = setInterval(handleFetchLogin, 10000)
    const intervalPing = setInterval(() => getPingRequest(userInfor.value.me_idx), 5000)
    await store.dispatch('startIntervalAction', myInterval)
    await store.dispatch('startIntervalPingAction', intervalPing)
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
    }
    else {
      await store.dispatch("showAlert", {
        type: "error",
        message: t("login_failed"),
      });
    }
    store.commit("handleUpdateLoading", false);
  }
};

// const ValidateEmail = (inputText) => {
//   // eslint-disable-next-line
//   const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (inputText.match(mailformat)) {
//     regexEmail.value = false;
//   } else {
//     regexEmail.value = true;
//   }
// };
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  padding: 32px;

  .img-wrap {
    width: auto;
    margin: auto;
  }

  .rememberPass input {
    margin-right: 0.5rem;
  }

  .submitLogin input {
    padding: 12px;
    background-color: #1e3eb3;
    border-radius: 8px;
    color: #ffffff;
    border: 0;
    width: 100%;
  }

  input {
    padding: 12px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 6px;

    &:focus-visible {
      outline: none;
    }
  }

  .noLogin {
    color: #585963;

    span:last-child {
      color: #1e3eb3;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .forgotPass {
    color: #1e3eb3;
    text-decoration-line: underline;
  }
}

@media (max-width: 991px) {
  .popup-login {
    display: flex;
    flex-direction: column;

    .login-item img {
      width: 100%;
      height: 100%;
    }
  }
}
@media (max-width: 375px) {
  .popup-login {
    padding: 15px;
  }
}
</style>