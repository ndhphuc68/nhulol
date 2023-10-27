<script setup>
import { languages } from "@/components/PlayG1/Header/data";
import Diamond from "@/assets/PlayG1/icon/header/diamond.vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Button from "@/components/PlayG1/customs/Button/index.vue";

const i18n = useI18n();
const store = useStore();
const router = useRouter();
const auth = computed(() => store.state.auth.auth);
const user = {
  amount: 0,
};

const lang = ref({
  key: i18n.locale.value,
  image: languages.find((item) => item.key === i18n.locale.value).image,
});
const handleClickLang = (option) => {
  i18n.locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    image: option.image,
  };
};
const handleOpenModalLogin = () => {
  store.commit("handleToggle", "login");
};

const handleOpenModalSignup = () => {
  store.commit("handleToggle", "signUp");
};
</script>

<template>
  <div class="wrapper-auth">
    <div class="dropdown d-none d-md-flex">
      <button
        aria-expanded="false"
        class="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        type="button"
      >
        <img :src="lang.image" alt="lang" /> {{ lang.key }}
      </button>
      <ul class="dropdown-menu">
        <li
          v-for="(item, index) in languages"
          :key="index"
          @click="handleClickLang(item)"
        >
          <a class="dropdown-item" href="#">
            <img :src="item.image" alt="img" />
            {{ item.key }}
          </a>
        </li>
      </ul>
    </div>
    <div v-if="!auth" class="btn-auth">
      <button @click="handleOpenModalLogin">{{ $t("login") }}</button>
      <button @click="handleOpenModalSignup">{{ $t("signup") }}</button>
    </div>
    <div v-else class="diamond">
      <div class="user d-none d-md-block">
        <h5>testuser1 testuser1</h5>
      </div>
      <div class="d-flex align-center">
        <Diamond />
        <div>
          <span class="balance d-block">{{ $t("balance") }} </span>
          <span class="d-block amount"
            >{{ user.amount > 0 ? user.amount : "10.000.000.000.000" }}
          </span>
        </div>
        <div class="ml-2">
          <Button
            variant="contained"
            :style="{ padding: '5px 10px' }"
            :on-click="
              () => {
                router.push('deposit');
              }
            "
          >
            +
          </Button>
        </div>
        <button class="ml-6 d-none d-md-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2.75005H5.88C5.08747 2.71472 4.31319 2.99475 3.72661 3.52886C3.14002 4.06297 2.78888 4.80768 2.75 5.60005V18.4C2.78888 19.1924 3.14002 19.9371 3.72661 20.4712C4.31319 21.0054 5.08747 21.2854 5.88 21.25H12"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.99875 12H21.2188"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.25 12L17.25 16"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.25 12L17.25 8"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.balance {
  font-size: 0.75rem;
  color: var(--text-second);
}

.wrapper-auth {
  display: flex;
  align-items: center;

  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
    border: 1px solid #bebaba;
    border-radius: 50%;
  }

  .user {
    margin: 0 24px;
    max-width: 95.95px;
    h5 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .amount {
    display: -webkit-box;
    max-width: 105.28px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-toggle {
    text-transform: uppercase;
    border: 1px solid #e4e4e7;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  a.dropdown-item {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .btn-auth {
    margin: 0 0.8rem;
    display: flex;

    button {
      height: 3rem;
      padding: 0 1rem;
      border-radius: 0.6rem;
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0;
      text-align: left;
      border: #e4e4e7;
      background: #fff;

      &:hover {
        background: var(--primary);
        color: var(--bg);
      }
    }
  }

  .language {
    .btn-secondary {
      background: transparent !important;
    }

    .dropdown-menu {
      .dropdown-item {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
    }

    .dropdown-item {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }

  .diamond {
    display: flex;
    align-items: center;
    margin-left: 10px;

    svg {
      margin-right: 0.5rem;
    }
  }
}
</style>
<style lang="scss">
.wrapper-auth {
  .dropdown-menu {
    min-width: 6.5rem !important;
  }
}
</style>