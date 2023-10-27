<script setup>
import Input from "@/components/SCCasino/Input";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { handleCloseModal } from "@/utils/SCCasino";
import { useStore } from "vuex";
import IconArrowLeft from "@/assets/SCCasino/icon/IconArrowLeft.vue";
import { Images } from "@/const/SCCasino/Images";
import { setCookie } from "@/utils/cookie";
import { encryptDataV2 } from "@/utils/encrypt";
import { getPingRequest } from "@/api/getPing";

const { t } = useI18n();

const user = ref({
  account: "",
  password: "",
});
const isLoading = ref(false);
const checkBox = ref(false);
const store = useStore();
const userInfor = computed(() => store.state.user.userInfor);

const error = ref({
  username: "",
  password: "",
});

// const handleValidate = () => {
//   let check = true;
//   if (!user.value.username) {
//     error.value.username = t("error-user-name");
//     check = false;
//   }
//   if (!user.value.password) {
//     error.value.password = t("error-user-password");
//     check = false;
//   }
//   return check;
// };

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
    isLoading.value = false;
    store.commit("handleToggle", "login");
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
    store.commit("handleUpdateLoading", false);
    document.querySelector("html").style.overflowY = "scroll";
    const myInterval = setInterval(handleFetchLogin, 10000);
    const intervalPing = setInterval(
      () => getPingRequest(userInfor.value.me_idx),
      5000
    );
    await store.dispatch("startIntervalAction", myInterval);
    await store.dispatch("startIntervalPingAction", intervalPing);
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

const onCloseModal = () => {
  store.commit("handleActiveSidebar", 0);
  handleCloseModal("login");
};
</script>

<template>
  <div class="d-flex flex-row login-main">
    <div class="login-img desktop">
      <h2>{{ $t("wellcomBack") }}</h2>
      <img :src="Images?.login" alt="login" />
    </div>
    <div class="login-img mobile">
      <h2>{{ $t("wellcomBack") }}</h2>
      <img :src="Images?.login" alt="login" />
      <IconArrowLeft @click="onCloseModal" />
    </div>
    <div class="login-form d-flex align-items-center col-lg-6 col-12">
      <!--      <div class="login-close">-->
      <!--        <button @click="handleCloseModal('login')">-->
      <!--          <img class="icon-close" :src="Icons.close" alt="close" />-->
      <!--        </button>-->
      <!--      </div>-->
      <form class="w-100 px-8 form">
        <span class="title-login">{{ $t("login") }}</span>
        <hr />
        <Input
          :placeholder="$t('userName')"
          class="mt-4"
          :stylesInput="{ 'border-radius': '8px' }"
          :icon="'user'"
          v-model="user.account"
          @input="error.username = ''"
        />
        <div v-if="error.username" class="w-100 d-flex justify-content-start">
          <span class="text-danger">{{ error.username }}</span>
        </div>
        <Input
          :placeholder="$t('password')"
          class="mt-2"
          :icon="'eye'"
          :stylesInput="{ 'border-radius': '8px' }"
          v-model="user.password"
          :type="'password'"
          @input="error.password = ''"
        />
        <div
          v-if="error.password"
          class="w-100 mb-3 d-flex justify-content-start"
        >
          <span class="text-danger">{{ error.password }}</span>
        </div>
        <div
          class="d-flex justify-content-between align-items-center mt-3 mb-4 forget-remember"
        >
          <div class="check-box">
            <div class="round">
              <input type="checkbox" v-model="checkBox" id="checkbox" />
              <label for="checkbox"></label>
            </div>
            <span>{{ $t("rememberMe") }}</span>
          </div>
          <!-- <div>
                      <span>{{ $t("forgetPassword") }}</span>
                    </div> -->
        </div>
        <button
          @click="handleLogin"
          type="submit"
          class="btn-modal mb-4 btn-login w-100 py-2"
        >
          {{ $t("login") }}
        </button>
        <!-- <button type="button" class="btn-modal mb-3 btn-guest w-100 py-2">
                  {{ $t("guest-mail") }}
                </button> -->
        <div class="d-flex flex-row justify-content-center register-line">
          <span>{{ $t("no-account") }}</span>
          <span
            @click="
              handleCloseModal('signUp');
              handleCloseModal('login');
            "
            >&nbsp;{{ $t("signup") }}</span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-main {
  height: 700px;
  overflow-y: auto;

  .col-6 {
    padding: 0;
  }

  .login-img {
    height: 100%;
    position: relative;

    h2 {
      width: 250px;
      position: absolute;
      left: 46px;
      top: 42%;
      z-index: 2;
      color: var(--bgSCCasino);
      font-size: 40px;
      font-weight: 600;
      text-align: left;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      position: relative;
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0189ff;
      z-index: 1;
      opacity: 0.85;
    }
  }

  .mobile {
    display: none;
    h2 {
      @media (max-width: 375px) {
        font-size: 35px;
      }
    }
  }

  .login-form {
    position: relative;

    .login-close {
      position: absolute;
      right: 15px;
      top: 15px;

      .icon-close {
        width: 30px;
        height: 30px;
      }
    }

    .form {
      @media screen and (max-width: 991.98px) {
        padding: 30px;
      }

      @media (max-width: 375px) {
        padding: 30px !important;
      }

      .text-danger {
        font-size: 12px;
      }

      hr {
        border: 1px solid var(--light-gradient);
      }

      .title-login {
        color: var(--primarySCCasino);
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .btn-modal {
        border-radius: 8px;
        border: 1px solid var(--primarySCCasino);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
        font-size: 16px;
        font-weight: 600;
      }

      .btn-login {
        background: var(--primarySCCasino);
        color: var(--bgSCCasino);
      }

      .btn-guest {
        color: var(--primarySCCasino);
      }

      .register-line {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        @media (max-width: 375px) {
          font-size: 12px;
        }
        span {
          &:last-child {
            color: var(--primarySCCasino);
            cursor: pointer;
          }
        }
      }

      .forget-remember {
        label,
        span {
          color: var(--black-700);
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }

        span:last-child {
          cursor: pointer;
        }
      }

      .check-box {
        position: relative;
        display: flex;
        align-items: center;

        .round label {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 50%;
          cursor: pointer;
          width: 18px;
          height: 18px;
          left: 0;
          position: absolute;
          top: 3px;
        }

        .round label:after {
          border: 2px solid #fff;
          border-top: none;
          border-right: none;
          content: "";
          height: 6px;
          left: 3px;
          opacity: 0;
          position: absolute;
          top: 4px;
          transform: rotate(-45deg);
          width: 10px;
        }

        .round input[type="checkbox"] {
          visibility: hidden;
        }

        .round input[type="checkbox"]:checked + label {
          background-color: var(--primarySCCasino);
          border-color: var(--primarySCCasino);
        }

        .round input[type="checkbox"]:checked + label:after {
          opacity: 1;
        }

        span {
          margin-left: 15px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    flex-direction: column !important;
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
      height: 260px;

      img {
        height: 100%;
      }

      h2 {
        top: 35%;
      }

      svg {
        position: absolute;
        top: 40px;
        left: 46px;
        z-index: 1;
        cursor: pointer;
      }
    }

    .login-form {
      position: relative;
      width: 100%;

      form {
        padding: 30px;
      }

      .login-close {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    form {
      padding: 60px 30px !important;
    }
  }

  @media (max-width: 375px) {
    h2 {
      font-size: 30px !important;
      width: 180px !important;
    }
  }
}
</style>

<style>
.p-checkbox-box {
  border-radius: 50% !important;
}
</style>
