<template>
  <div class="loading" v-if="isLoading">
    <!--    <button class="loading-close" @click="handleCloseModal">-->
    <!--      <img alt="btn-close" src="@/assets/icon/close-icon.png"/>-->
    <!--    </button>-->
    <div>
      <Loading />
    </div>
  </div>
  <div>
    <!-- <div class="logoInnerWrap">
      <img src="@/assets/logo/sidebar/kcasino.png" />
    </div> -->
    <div class="login-container">
      <div class="login-item login-item-banner">
        <img alt="login" src="@/assets/banner/sign-banner.png" />
      </div>
      <div class="login-item login3">
        <div class="form-login">
          <div class="title">
            <h3>{{ $t("memberlogin") }}</h3>
            <p>{{ $t("welcomeback") }}</p>
          </div>
          <section class="login-wrapper3">
            <form id="login">
              <label for="emailAddress">{{ $t("account") }}</label>
              <input
                type="text"
                :placeholder="$t('account')"
                id="emailAddress"
                v-model="user.account"
              />
              <label for="password">{{ $t("password") }}</label>
              <input
                :type="isHide ? 'text' : 'password'"
                :placeholder="$t('password')"
                id="password"
                v-model="user.password"
              />
              <div @click="isHide = !isHide" class="iconHideShow">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.14434 5.99984C2.52944 6.53094 3.3187 7.53168 4.35798 8.40298C5.43558 9.3064 6.6974 9.99984 8.00019 9.99984C9.30298 9.99984 10.5648 9.3064 11.6424 8.40298C12.6817 7.53168 13.4709 6.53094 13.856 5.99984C13.4709 5.46874 12.6817 4.468 11.6424 3.5967C10.5648 2.69327 9.30298 1.99984 8.00019 1.99984C6.6974 1.99984 5.43558 2.69327 4.35798 3.5967C3.3187 4.468 2.52944 5.46874 2.14434 5.99984ZM3.50137 2.57493C4.67585 1.59029 6.23771 0.666504 8.00019 0.666504C9.76267 0.666504 11.3245 1.59029 12.499 2.57493C13.6849 3.56913 14.5623 4.69793 14.9677 5.26184C15.2867 5.70542 15.2867 6.29426 14.9677 6.73784C14.5623 7.30174 13.6849 8.43055 12.499 9.42474C11.3245 10.4094 9.76267 11.3332 8.00019 11.3332C6.23771 11.3332 4.67586 10.4094 3.50137 9.42474C2.3155 8.43055 1.43806 7.30174 1.03264 6.73784C0.713729 6.29426 0.713729 5.70542 1.03264 5.26184C1.43806 4.69793 2.3155 3.56913 3.50137 2.57493Z"
                    fill="#71717A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.00019 7.33317C8.73657 7.33317 9.33352 6.73622 9.33352 5.99984C9.33352 5.26346 8.73657 4.6665 8.00019 4.6665C7.26381 4.6665 6.66686 5.26346 6.66686 5.99984C6.66686 6.73622 7.26381 7.33317 8.00019 7.33317ZM8.00019 8.6665C9.47295 8.6665 10.6669 7.4726 10.6669 5.99984C10.6669 4.52708 9.47295 3.33317 8.00019 3.33317C6.52743 3.33317 5.33352 4.52708 5.33352 5.99984C5.33352 7.4726 6.52743 8.6665 8.00019 8.6665Z"
                    fill="#71717A"
                  />
                </svg>
              </div>
              <p v-show="isWrong" class="textErr">{{ $t("errorPassword") }}</p>
              <div class="keepSingedIn align-center">
                <input type="checkbox" v-model="checkBox" name="" id="" />
                <span>{{ $t("keepmesignedin") }}</span>
              </div>
              <button @click="handleLogin" class="submitButton" type="submit">
                {{ $t("login") }}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading";
import { setCookie } from "@/utils/cookie";
import { useI18n } from "vue-i18n";
import { encryptDataV2 } from "@/utils/encrypt";
import { getPingRequest } from "@/api/getPing";

const { t } = useI18n();
const store = useStore();
const isHide = ref(false);
const isWrong = ref(false);
const checkBox = ref(false);
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
    // await getPingRequest()
    isLoading.value = false;
    store.commit("handleToggle", "login");
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
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
    isLoading.value = false;
  }
};

// onMounted(() => {
//   sessionStorage == true ?handleLogin() :''
// })
</script>

<style scoped>
#login {
  position: relative;
}

.login-container {
  display: flex;
}

.login-container .login-item {
  width: 50%;
}

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

.loading-close {
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 80px;
  display: flex;
  right: 200px;
  width: 56px;
  height: 56px;
  background: #ffff;
  border-radius: 50%;
  z-index: 10;
}

.loading-close img {
  width: 30px;
  height: 30px;
}

.login3 {
  padding: 24px 48px;
  text-align: center;
}

.logoInnerWrap {
  text-align: start;
  margin-left: 10px;
  margin-top: 25px;
}

.logoInnerWrap img {
  width: 200px;
  object-fit: contain;
}

.form-login {
  width: 100%;
  margin: auto;
  /* margin-top: 70px; */
}

.title h3 {
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  margin: 5px 0;
  color: #000;
}

.title p {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #52525b;
  margin: 0;
}

form {
  /*width: 328px;*/
  /*height: 284px;*/
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}

label {
  display: block;
  margin-top: 32px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #18181b;
}

input {
  border-radius: 4px;
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 12px;
  border: 1px solid #000;
  color: #000 !important;
  margin-top: 5px;
}

.wrongInput {
  border: 1px solid #ef4444;
}

::placeholder {
  color: #e5e5e5;
}

button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

.iconHideShow {
  position: absolute;
  right: 10px;
  top: 162px;
  cursor: pointer;
}

.textErr {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: #dc2626;
}

.keepSingedIn {
  display: flex;
  margin: 24px 0;
}

.keepSingedIn span {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #18181b;
  padding-left: 8px;
}

.keepSingedIn input {
  width: 16px;
  height: 16px;
  background: #cc9a6c;
}

.submitButton {
  padding: 6px 12px;
  border: none;
  width: 100%;
  height: 44px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  background: #cc9a6c;
  border-radius: 4px;
  color: #ffff;
  margin: 0;
}

@media (max-width: 768px) {
  .login-container {
    justify-content: center;
  }

  .login-item-banner {
    display: none;
  }

  .login-container .login-item {
    width: 100%;
  }

  .form-login {
    width: 100%;
  }
}

@media (max-width: 375px) {
  .login3 {
    padding: 0;
  }
}
</style>
