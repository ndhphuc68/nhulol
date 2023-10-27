<template>
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
        <p>{{ $t("yawlBilge") }}</p>
      </div>
      <form action="">
        <div class="d-flex flex-column mb-3">
          <label for="email">{{ $t("email") }}</label>
          <input
            id="email"
            v-model="user.email"
            :placeholder="$t('enterEmail')"
            type="text"
            @input="handleChangeInput"
          />
          <span v-if="regexEmail">báo lỗi</span>
        </div>
        <div class="d-flex flex-column mb-3">
          <label for="password">Password</label>
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
          <div class="forgotPass">
            <span>{{ $t("forgotPassword") }}</span>
          </div>
        </div>
        <div class="submitLogin">
          <input :value="$t('login')" type="submit" @click="handleSubmit" />
        </div>
      </form>
      <div class="noLogin text-center mt-3">
        <span>{{ $t("dontHaveAccount?") }}</span>
        <span>{{ $t("SignUpFree") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const user = reactive({
  email: "",
  password: "",
});

console.log(user);
const regexEmail = ref(false);

const handleChangeInput = () => {
  ValidateEmail(user.email);
};

const handleSubmit = (e) => {
  e.preventDefault();
  ValidateEmail(user.email);
  console.log(user);
};

const ValidateEmail = (inputText) => {
  // eslint-disable-next-line
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    regexEmail.value = false;
  } else {
    regexEmail.value = true;
  }
};
</script>

<style lang="scss" scoped>
.popup-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
</style>