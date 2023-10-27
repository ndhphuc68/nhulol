<script setup>
import { Images } from "@/const/Image";
import Input from "@/components/Input";
import { ref } from "vue";
import { Icons } from "@/const/Icons";
import { useI18n } from "vue-i18n";
import { handleCloseModal } from "@/utils";

const { t } = useI18n();

const dataLogin = ref({
  username: "",
  password: "",
});

const error = ref({
  username: "",
  password: "",
});

const handleValidate = () => {
  let check = true;
  if (!dataLogin.value.username) {
    error.value.username = t("error-user-name");
    check = false;
  }
  if (!dataLogin.value.password) {
    error.value.password = t("error-user-password");
    check = false;
  }
  return check;
};

const handleLogin = () => {
  if (handleValidate()) {
    console.log(13232);
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
      <div class="w-100 ps-lg-3 form">
        <span class="title-login">Login</span>
        <hr />
        <Input
          :placeholder="$t('username')"
          class="mt-4"
          :stylesInput="{ 'border-radius': '20px' }"
          :icon="'user'"
          v-model="dataLogin.username"
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
          v-model="dataLogin.password"
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
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Remember me
            </label>
          </div>
          <div>
            <span>Forget password?</span>
          </div>
        </div>
        <button
          @click="handleLogin"
          type="button"
          class="btn-modal mb-4 btn-login w-100 py-2"
        >
          Login
        </button>
        <button type="button" class="btn-modal mb-3 btn-guest w-100 py-2">
          Guest Mail
        </button>
        <div class="d-flex flex-row justify-content-center register-line">
          <span>Don’t have an account?</span>
          <span
            @click="
              handleCloseModal('signup');
              handleCloseModal('login');
            "
            >&nbsp;Register</span
          >
        </div>
      </div>
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
        padding: 45px;
      }
      padding-right: 70px;

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
