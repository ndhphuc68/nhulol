<script setup>
import { ref, computed } from "vue";
// import BannerPage from "@/components/G2casino/BannerPage";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
// import { setCookie } from "@/utils/cookie";
// import { encryptDataV2 } from "@/utils/encrypt";
// import { getPingRequest } from "@/api/getPing";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const store = useStore();
const user = ref({
  account: "",
  password: "",
});
const checkBox = ref(false);
// const userInfor = computed(() => store.state.user.userInfor);

// const handleGetMe = async () => {
//   await store.dispatch("getMeAction", {
//     memberIdx: userInfor.value.me_idx,
//   });
// };

// const handleGetListDeponsit = async () => {
//   await store.dispatch("getListDepositAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };

// const handleGetListWithDraw = async () => {
//   await store.dispatch("getListWithDrawAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };

// const handleGetListMessage = async () => {
//   await store.dispatch("getListMessageAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };

// const handleGetListHelp = async () => {
//   await store.dispatch("getListHelpAction", {
//     memberIdx: userInfor.value.me_idx,
//     inviteCode: userInfor.value.me_invite_code,
//     nickName: userInfor.value.nickname,
//   });
// };

// const handleFetchLogin = async () => {
//   await handleGetMe();
//   await handleGetListDeponsit();
//   await handleGetListWithDraw();
//   await handleGetListMessage();
//   await handleGetListHelp();
// };

const handleLogin = async (e) => {
  e.preventDefault();
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
  //   // store.commit("handleToggle", "login");
  //   setCookie("CID", JSON.stringify(user.value));
  //   await store.dispatch("showAlert", {
  //     type: "success",
  //     message: t("login_success"),
  //   });
  //   store.commit("handleUpdateLoading", false);
  //   router.push("/");
  //   document.querySelector("html").style.overflowY = "scroll";
  //   // const myInterval = setInterval(handleFetchLogin, 10000)
  //   // const intervalPing = setInterval(() => getPingRequest(userInfor.value.me_idx), 5000)
  //   // await store.dispatch('startIntervalAction', myInterval)
  //   // await store.dispatch('startIntervalPingAction', intervalPing)
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
  //   } else {
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
  <div class="login-container">
    <div class="d-flex group-login">
      <div
        class="d-flex justify-content-center align-content-center flex-column w-50 form-login"
      >
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
            <div class="check-box">
              <div class="round">
                <input type="checkbox" v-model="checkBox" id="checkbox" />
                <label for="checkbox"></label>
              </div>
              <span class="ml-4">{{ $t("rememberPassword") }}</span>
            </div>
          </div>
          <div class="form-item">
            <Button type="submit" class="button" @click="handleLogin">{{
              $t("login")
            }}</Button>
          </div>
        </form>
        <div class="form-bottom d-flex">
          <p class="me-2">{{ $t("dontHaveAccount?") }}</p>
          <router-link :to="{ name: 'Signup' }" class="btn-signup">
            {{ $t("signup") }}
          </router-link>
        </div>
      </div>
      <div class="w-50 d-flex image-login">
        <img
          class="banner-img-desktop w-100"
          alt="banner-login"
          src="@/assets/PlayG3/images/image-login-desktop.png"
        />
        <img
          class="banner-img-mobile w-100"
          alt="banner-login"
          src="@/assets/PlayG3/images/image-login-mobile.png"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;
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
    /* max-height: 600px; */
  }

  form {
    width: 100%;
    padding-right: 10%;
    .form-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: 1.25rem 0;

      input {
        width: 100%;
        background: var(--fill-input, #1a1c20);
        border: none;
        color: var(--textPlayG3);

        &:hover,
        &:focus,
        &:focus-visible,
        &:active {
          border: none;
          outline: none;
          box-shadow: none;
        }
      }

      label {
        margin-bottom: 1rem;
      }

      button {
        background: var(--primaryPlayG3);
        border: none;
        transition: all 0.5s;

        &:hover,
        &:focus,
        &:focus-visible,
        &:active {
          border: none;
          outline: none;
          box-shadow: none;
        }

        &:hover {
          opacity: 0.8;
          transition: all 0.5s;
        }

        &:active {
          transform: scale(0.95);
          transition: all 0.5s;
        }
      }
    }
  }
  .form-bottom {
    .btn-signup {
      color: var(--primaryPlayG3);
      text-decoration: none;
    }

    .check-box {
      position: relative;
      display: flex;
      align-items: center;

      .round label {
        background-color: #fff;
        border: 1px solid #ccc;
        cursor: pointer;
        border-radius: 2px;
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
        background-color: var(--primaryPlayG3);
        border-color: var(--primaryPlayG3);
      }

      .round input[type="checkbox"]:checked + label:after {
        opacity: 1;
      }
    }
  }
  .image-login {
    .banner-img-mobile {
      display: none;
      max-height: 350px;
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    width: 100%;
    font-size: 90%;

    .group-login {
      flex-direction: column-reverse;

      .form-login {
        width: 94% !important;
        margin: 0 auto;
        padding: 50px 0;

        form {
          padding: 0 !important;
        }
      }
      .image-login {
        width: 100% !important;
        .banner-img-desktop {
          display: none !important;
        }
        .banner-img-mobile {
          display: block !important;
        }
      }
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
        background: var(--fill-input, #1a1c20);
        border: none;
        color: var(--textPlayG3);
        cursor: auto;

        &:hover,
        &:focus,
        &:focus-visible,
        &:active {
          /* border: none; */
          outline: none;
          box-shadow: none;
        }
      }

      svg {
        cursor: pointer;
      }
    }

    .p-highlight {
      background: var(--primaryG2Casino);
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

.red {
  background: red;
}
</style>
