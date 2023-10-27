<script setup>
// import { Images } from "@/const/Image";
import Input from "@/components/CasinoClub/Input";
import { ref, computed } from "vue";
// import { Icons } from "@/const/Icons";
import { useI18n } from "vue-i18n";
import { handleCloseModal } from "@/utils";
// import { useStore } from "vuex";
// import { setCookie } from "@/utils/cookie";
// import { encryptDataV2 } from "@/utils/encrypt";
// import { getPingRequest } from "@/api/getPing";

const { t } = useI18n();

const user = ref({
  account: "",
  password: "",
});
// const isLoading = ref(false);
const checkBox = ref(false);
// const store = useStore();
// const userInfor = computed(() => store.state.user.userInfor);

const error = ref({
  username: "",
  password: "",
});

// const handleGetMe = async () => {
//   await store.dispatch("getMeAction", {
//     memberIdx: userInfor.value.me_idx,
//   });
// };
//
// const handleGetListDeponsit = async () => {
//   await store.dispatch("getListDepositAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };
//
// const handleGetListWithDraw = async () => {
//   await store.dispatch("getListWithDrawAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };
//
// const handleGetListMessage = async () => {
//   await store.dispatch("getListMessageAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };
//
// const handleGetListHelp = async () => {
//   await store.dispatch("getListHelpAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };
//
// const handleFetchLogin = async () => {
//   await handleGetMe();
//   await handleGetListDeponsit();
//   await handleGetListWithDraw();
//   await handleGetListMessage();
//   await handleGetListHelp();
// };

const handleLogin = async (e) => {
  // e.preventDefault();
  // if (user.value.account.length < 1) {
  //   store.dispatch("showAlert", {
  //     type: "error",
  //     message: t("signuperroraccount"),
  //   });
  //
  //   return;
  // }
  //
  // if (user.value.password.length < 1) {
  //   store.dispatch("showAlert", {
  //     type: "error",
  //     message: t("signuperrorpassword"),
  //   });
  //
  //   return;
  // }
  // store.commit("handleUpdateLoading", true);
  // const res = await store.dispatch("loginAction", user.value);
  // if (store.state.auth.auth && res.is_success) {
  //   if (checkBox.value) {
  //     localStorage.setItem("mIdx", res.mIdx);
  //     localStorage.setItem("_slg", encryptDataV2(JSON.stringify(user.value)));
  //   } else {
  //     setCookie("mIdx", res.mIdx);
  //     sessionStorage.setItem("mIdx", res.mIdx);
  //   }
  //   await handleFetchLogin();
  //   // await getPingRequest()
  //   isLoading.value = false;
  //   store.commit("handleToggle", "login");
  //   setCookie("CID", JSON.stringify(user.value));
  //   await store.dispatch("showAlert", {
  //     type: "success",
  //     message: t("login_success"),
  //   });
  //   store.commit("handleUpdateLoading", false);
  //   document.querySelector("html").style.overflowY = "scroll";
  //   const myInterval = setInterval(handleFetchLogin, 10000);
  //   const intervalPing = setInterval(
  //       () => getPingRequest(userInfor.value.me_idx),
  //       5000
  //   );
  //   await store.dispatch("startIntervalAction", myInterval);
  //   await store.dispatch("startIntervalPingAction", intervalPing);
  // } else {
  //   if (res?.error_code == "-100004") {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_code_100004"),
  //     });
  //   } else if (res?.error_code == "-100005") {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_code_100005"),
  //     });
  //   } else if (res?.error_code == "-100006") {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_code_100006"),
  //     });
  //   }
  //   else if (res?.error_code == "-100008") {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("error_code_100008"),
  //     });
  //   }
  //   else {
  //     await store.dispatch("showAlert", {
  //       type: "error",
  //       message: t("login_failed"),
  //     });
  //   }
  //   store.commit("handleUpdateLoading", false);
  // }
};
</script>

<template>
  <main class="login-main">
    <div class="login-form">
      <img
        class="w-100"
        src="../../../assets/CasinoClub/logo/logo.png"
        alt="logo"
      />
      <div class="title-login mt-2">{{ $t("login") }}</div>
      <hr class="w-100" />
      <form class="form w-100">
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
          class="d-flex justify-content-between align-items-center mt-3 forget-remember"
        >
          <v-checkbox
            v-model="checkBox"
            :label="$t('keepmesignedin')"
          ></v-checkbox>
        </div>
        <button
          @click="handleLogin"
          type="submit"
          class="btn-modal mb-4 btn-login w-100 py-2"
        >
          {{ $t("login") }}
        </button>
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
  </main>
</template>

<style scoped lang="scss">
.login-main {
  height: 700px;
  background-image: url("../../../assets/CasinoClub/background/bg-login.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
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
  hr {
    border: 1px solid var(--primaryCasinoClub);
  }

  .title-login {
    color: var(--primaryCasinoClub);
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .login-form {
    background-color: #fff;
    width: fit-content;
    padding: 64px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 767.98px) {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

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
      }
      .text-danger {
        font-size: 12px;
      }

      .btn-modal {
        border-radius: 20px;
        border: 1px solid var(--neutral-200);
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
        font-size: 16px;
        font-weight: 600;
      }

      .btn-login {
        background: var(--primaryCasinoClub);
        color: #fff;
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
            color: var(--primaryCasinoClub);
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
