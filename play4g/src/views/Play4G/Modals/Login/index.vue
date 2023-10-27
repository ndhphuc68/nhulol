<script setup>
import {ref, computed} from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {setCookie} from "@/utils/cookie";
import {encryptDataV2} from "@/utils/encrypt";
import {useRouter} from "vue-router";

const {t} = useI18n();
const router = useRouter();
const store = useStore();
const user = ref({
  account: "",
  password: "",
});
const checkBox = ref(false);
const userInfo = computed(() => store.state.user.userInfor);

const handleGetMe = async () => {
  await store.dispatch("getMeAction", {
    memberIdx: userInfo.value.me_idx,
  });
};

const handleGetListDeponsit = async () => {
  await store.dispatch("getListDepositAction", {
    memberIdx: userInfo.value.me_idx,
    inviteCode: userInfo.value.me_invite_code,
    nickName: userInfo.value.nickname,
  });
};

const handleGetListWithDraw = async () => {
  await store.dispatch("getListWithDrawAction", {
    memberIdx: userInfo.value.me_idx,
    inviteCode: userInfo.value.me_invite_code,
    nickName: userInfo.value.nickname,
  });
};

const handleGetListMessage = async () => {
  await store.dispatch("getListMessageAction", {
    memberIdx: userInfo.value.me_idx,
    inviteCode: userInfo.value.me_invite_code,
    nickName: userInfo.value.nickname,
  });
};

const handleGetListHelp = async () => {
  await store.dispatch("getListHelpAction", {
    memberIdx: userInfo.value.me_idx,
    inviteCode: userInfo.value.me_invite_code,
    nickName: userInfo.value.nickname,
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
    setCookie("CID", JSON.stringify(user.value));
    await store.dispatch("showAlert", {
      type: "success",
      message: t("login_success"),
    });
    store.commit("handleUpdateLoading", false);
    await router.push("/");
    // const myInterval = setInterval(handleFetchLogin, 10000)
    // const intervalPing = setInterval(() => getPingRequest(userInfo.value.me_idx), 5000)
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
    } else if (res?.error_code == "-100008") {
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


const handleOpenSignup = () => {
  store.commit('handleToggle', 'login');
  store.commit('handleToggle', 'signUp');
}
</script>

<template>
  <div class="login-container">
    <div class="d-flex group-login">
      <div
        class="d-flex justify-content-center align-content-center flex-column form-login"
      >
        <div class="title-group">
          <h1>
            {{ $t("login") }}
          </h1>
          <p class="description-login">{{$t('descriptionLogin')}}</p>
        
        </div>
        <form>
          <div class="form-item">
            <label for="username">{{ $t("account") }}</label>
            <span class="p-input-icon-left w-100">
               <i class="pi pi-user "></i>
                <InputText type="text" v-model="user.account"/>
            </span>
          </div>
          <div class="form-item">
            <label for="username">{{ $t("password") }}</label>
            <span class="p-input-icon-left w-100">
               <i class="pi pi-lock icon-password"></i>
              <Password
                v-model="user.password"
                toggleMask
                :panel-style="{borderRadius: '70px'}"
                :pt="{
                  panel: { class: 'panelPasswordLogin' },
                }"
              />
            </span>
          </div>
          <div class="form-item">
            <button type="submit" class="button btn-rounded" @click="handleLogin">{{
                $t("login")
              }}
            </button>
          </div>
        </form>
        <div class="form-bottom d-flex align-center">
          <p class="ma-0 mr-2">{{ $t("dontHaveAccount?") }}</p>
          <button @click="handleOpenSignup" class="btn-signup btn-text">
            {{ $t("signup") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  margin: 0 auto;
  
  
  .title-group {
    text-align: left;
  }
  
  .description-login {
    color: var(--text-desc);
    font-size: 0.870rem;
  }
  
  form {
    width: 100%;
    
    .form-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: 1.25rem 0;
      
      input {
        width: 100%;
        background: var(--inputFillPlay4G);
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
        margin-bottom: 0.5rem;
      }
      .icon-password {
        z-index:1;
      }
    }
  }
  
  .form-bottom {
    font-size: 0.875rem;
    color: var(--text-desc)
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
        background: var(--inputFillPlay4G);
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
      background: var(--primaryPlay4G);
    }
    
    .button {
      background-color: var(--primaryPlay4G);
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
<style lang="scss">
.login-container {
  .p-inputtext.p-component {
    border-radius: 74px;
  }
  .p-inputtext.p-component.p-password-input {
    padding-left:40px;
  }
}
</style>
