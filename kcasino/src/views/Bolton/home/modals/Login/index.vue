<script setup>
import { Images } from "@/const/Image";
import Input from "@/components/Bolton/Input";
import { ref, computed } from "vue";
import { Icons } from "@/const/Icons";
import { useI18n } from "vue-i18n";
import { handleCloseModal } from "@/utils";
import { useStore } from "vuex";
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
</script>

<template>
  <div class="d-flex flex-row row login-main h-100">
    <div class="login-img col-6 d-lg-block d-none">
      <img :src="Images.login" alt="login" />
    </div>
    <div class="login-form d-flex align-items-center col-lg-6 col-12">
      <div class="login-close">
        <button @click="handleCloseModal('login')">
          <img class="icon-close" :src="Icons.close" alt="close" />
        </button>
      </div>
      <form class="w-100 ps-lg-3 form">
        <div class="title-login text-center">{{ $t("login") }}</div>
        <hr />
        <Input
            :placeholder="$t('account')"
            class="mt-4"
            :stylesInput="{ 'border-radius': '20px' }"
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
            :stylesInput="{ 'border-radius': '20px' }"
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
          <v-checkbox
              v-model="checkBox"
              :label="$t('keepmesignedin')"
          ></v-checkbox>
          <!--          <div>-->
          <!--            <span>{{ $t("forgetPassword") }}</span>-->
          <!--          </div>-->
        </div>
        <button
            @click="handleLogin"
            type="submit"
            class="btn-modal mb-4 btn-login w-100 py-2"
        >
          {{ $t("login") }}
        </button>
        <!--        <button type="button" class="btn-modal mb-3 btn-guest w-100 py-2">-->
        <!--          {{ $t("guest-mail") }}-->
        <!--        </button>-->
        <div class="d-flex flex-row justify-content-center register-line">
          <span>{{ $t("no-account") }}</span>
          <span
              @click="
              handleCloseModal('signUp');
              handleCloseModal('login');
            "
          >&nbsp;{{ $t("register") }}</span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-main {
  .col-6 {
    padding: 0;
  }

  .login-img {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .login-form {
    position: relative;

    .login-close {
      position: absolute;
      right: 10px;
      top: 10px;

      .icon-close {
        width: 30px;
        height: 30px;
      }
    }

    .form {
      @media screen and (max-width: 991.98px) {
        padding: 40px;
      }
      padding-right: 70px;
      @media(max-width: 375px){
        padding: 3rem 0.5rem;
      }
      .text-danger {
        font-size: 12px;
      }

      hr {
        border: 1px solid var(--light-gradient);
      }

      .title-login {
        color: var(--light-gradient);
        font-size: 22px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .btn-modal {
        border-radius: 20px;
        border: 1px solid var(--neutral-200);
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
        font-size: 16px;
        font-weight: 600;
      }

      .btn-login {
        background: var(--light-gradient);
        color: var(--white);
      }

      .btn-guest {
        border: 1px solid var(--light-red);
        background: var(--white);
        color: var(--red);
      }

      .register-line {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        span {
          &:last-child {
            color: var(--red);
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
    }
  }
}
</style>
