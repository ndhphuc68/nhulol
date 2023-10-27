<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import Diamond from "@/assets/Duri777/icon/Header/Diamond";
import { deleteCookie } from "@/utils/cookie";
import Button from "@/components/Duri777/Custom/Button/index.vue";
import { convertMoney } from "@/utils";
import More from "@/assets/Duri777/icon/More";
import { logoutRequest } from "@/api/auth/request";
import { SSRRequest } from "@/api/axios";
import Profile from "@/assets/Duri777/icon/Header/profile.vue";
import Deposit from "@/assets/Duri777/icon/Header/deposit.vue";
import Withdraw from "@/assets/Duri777/icon/Header/withdraw.vue";
import HistoryBetting from "@/assets/Duri777/icon/Header/history-betting.vue";
import GameGuide from "@/assets/Duri777/icon/Header/game-guide.vue";
import HelpCenter from "@/assets/Duri777/icon/Header/help-center.vue";
import Message from "@/assets/Duri777/icon/Header/message.vue";
import Coupon from "@/assets/Duri777/icon/Header/coupon.vue";
// import { logoutRequest } from "@/api/auth/request";

const { locale, t } = useI18n();
const store = useStore();
const auth = computed(() => store.state.auth.auth);
const userInfo = computed(() => store.state.user.userInfor);
const customPage = computed(() => store.state.customPage.styles);
const transaction = computed(() => store.getters.getTransaction)
const router = useRouter();
const location = useRoute();
const activeNavbar = ref(false);
const navs = computed(() => [
  {
    key: "Profile",
    href: "profile",
    icon: Profile,
    text: t("profile"),
    name: "Profile",
    // isOpenInMobile: true,
  },
  {
    key: "Deposit",
    href: "deposit",
    icon: Deposit,
    text: t("deposit"),
    name: "Deposits",
  },
  {
    key: "Withdrawal",
    href: "withdrawal",
    icon: Withdraw,
    text: t("withdraw"),
    name: "Withdrawal",
  },
  {
    key: "Coupon",
    href: "coupon",
    icon: Coupon,
    text: t("coupon"),
    name: "Coupon",
  },
  {
    key: "BettingHistory",
    href: "betting-history",
    icon: HistoryBetting,
    text: t("bettingHistory"),
    name: "BettingHistory",
  },
  {
    key: "HelpCenter",
    href: "help-center",
    icon: HelpCenter,
    text: t("helpCenter"),
    name: "HelpCenter",
  },
  {
    key: "Message",
    href: "message",
    icon: Message,
    text: t("message"),
    name: "Message",
  },
  {
    key: "GameGuide",
    href: "game-guide",
    icon: GameGuide,
    text: t("gameGuide"),
    name: "GameGuide",
  },
]);

const languages = ref([
  {
    key: "ko",
    text: "한글",
    sub: "Korean",
    idx: 1,
  },
  {
    key: "en",
    text: "English",
    sub: "English",
    idx: 2,
  },
  {
    key: "th",
    text: "แบบไทย",
    sub: "Thai",
    idx: 3,
  },
]);

const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);

const lang = ref({
  key: locale.value,
});

watch(activeNavbar, (val) => {
  val
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});

const handleActive = (active) => {
  activeNavbar.value = !active;
};

const handleNavigate = (href) => {
  router.push({ name: href });
  activeNavbar.value = false;
};

const handleClickLang = (option) => {
  locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    lang: option.text,
  };
};

const handleLogout = async () => {
  store.commit("handleAuth");
  localStorage.removeItem("_slg");
  localStorage.removeItem("mIdx");
  sessionStorage.clear();
  await store.dispatch("clearIntervalAction");
  await store.dispatch("clearIntervalPingAction");
  deleteCookie("MDS");
  deleteCookie("CID");
  deleteCookie("mIdx");
  await logoutRequest();
  store.commit("resetUser");
  await router.push("/");
  window.location.reload();
};

const doPartnerConvert = () => {
  let config = "width=1550, height=800";

  let url =
      process.env.VUE_APP_META_API_URL +
      `/admin/partner/check_login/${userInfo?.value.me_account}?frontLogin=true`;
  window.open(url, "partner", config);
};

const doSettlement = async () => {
  let config = "width=1200, height=800";

  let url =
      process.env.VUE_APP_META_API_URL +
      `/admin/partner/check_login/settlement/${userInfo?.value.me_account}`;
  window.open(url, "partner", config);
};
</script>

<template>
  <header>
    <div
      class="header-container"
      :style="customPage.logo_pos === '2' ? 'flex-direction: row-reverse' : ''"
    >
      <button class="logo-group" @click="handleNavigate('Home')">
        <img :src="customPage.logo_image ? customPage.logo_image : require('@/assets/Duri777/logo/logo-g2.png')" />
      </button>
      <nav class="navbar">
        <template v-for="(nav, index) in navs" :key="index">
          <span :class="transaction==='YES' && (nav?.key==='Deposit' || nav?.key==='Withdrawal') ? 'd-none':''">
          <button
            class="nav-item"
            :class="{ active: nav?.name === location?.name }"
            @click="handleNavigate(nav?.name)"
          >
            <component class="nav-icon mr-1" :is="nav?.icon" />
            {{ nav?.text }}
          </button>
            </span>
        </template>
      </nav>
      <div class="d-flex flex-column">
        <div class="header-right" :class="auth ? 'flex-row-reverse' : ''">
          <div v-if="!auth" class="btn-auth">
            <RouterLink :to="{ name: 'Login' }">{{ $t("login") }}</RouterLink>
            <RouterLink :to="{ name: 'Signup' }">{{ $t("signup") }}</RouterLink>
          </div>
          <div v-else class="diamond ml-6">
            <Diamond class="diamond-icon" />
            <div class="user d-none d-md-block">
              <h5>{{ userInfo?.me_account }}</h5>
              <ul class="user-action">
                <li>
                  <router-link
                    class="link d-flex justify-content-between"
                    to="profile"
                  >
                    <span>
                      {{ $t("profile") }}
                    </span>
                    <component :is="Profile" />
                  </router-link>
                </li>
                <li>
                  <button
                    class="d-none d-md-flex justify-content-between"
                    @click="handleLogout"
                  >
                    <span>{{ $t("logout") }}</span>
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
                </li>
              </ul>
              <div class="d-flex align-center">
                <div>
                  <!--                                        <span class="balance d-block">{{ $t("balance") }} </span>-->
                  <span class="d-block amount"
                    >{{ convertMoney(userInfo?.me_money) }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="transaction ==='NO'">
              <Button
                variant="contained"
                :style="{ padding: '0 10px' }"
                :on-click="
                  () => {
                    transaction ==='NO' && router.push({ name: 'Deposits' });

                  }
                "
              >
                +
              </Button>
            </div>
          </div>
          <div class="language">
            <img src="@/assets/Duri777/icon/globe.png" alt="lang" />
            <div class="custom-select-language">
              <div class="dropdown">
                <button
                  aria-expanded="false"
                  class="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  <!--                                <img :src="lang.image" alt="lang"/> {{ lang.key }}-->
                  <span>{{ lang.key }}</span>
                </button>
                <ul class="dropdown-menu">
                  <li
                    v-for="(item, index) in languages"
                    :key="index"
                    @click="handleClickLang(item)"
                  >
                    <button class="dropdown-item d-flex flex-column">
                      <!--                                        <img :src="item.image" alt="img"/>-->
                      {{ item.text }}
                      <span>
                        {{ item?.sub }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div @click="handleActive(activeNavbar)" class="more">
            <More />
          </div>
          <div class="wrap-nav-mobile" :class="activeNavbar ? 'active' : ''">
            <div class="overlay" @click="handleActive(activeNavbar)" />
            <div class="nav-mobile" :class="activeNavbar ? 'active-nav' : ''">
              <div class="logo-mobile" @click="() => router.push('/')">
                <img
                  alt="logo"
                  :src="
                    customPage.logo_image
                      ? customPage.logo_image
                      : require('@/assets/Duri777/logo/logo-g2.png')
                  "
                />
              </div>
              <div class="item" v-for="(nav, index) in navs" :key="index">
                <button class="nav-item" @click="handleNavigate(nav?.name)" :class="transaction==='YES' && (nav?.key==='Deposit' || nav?.key==='Withdrawal') ? 'd-none':''">
                  {{ nav?.text }}
                </button>
              </div>
              <div v-if="!auth" class="btn-auth btn-auth-mb">
                <RouterLink
                  :to="{ name: 'Login' }"
                  @click="activeNavbar = false"
                  >{{ $t("login") }}
                </RouterLink>
                <RouterLink
                  :to="{ name: 'Signup' }"
                  @click="activeNavbar = false"
                  >{{ $t("signup") }}
                </RouterLink>
              </div>
              <div v-else class="diamond diamond-mb">
                <div class="user d-flex align-center">
                  <h5 class="mr-2">{{ userInfo?.me_account }}</h5>
                  <div class="text-left">
                    <button @click="handleLogout">
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
                <div class="d-flex align-center mt-4">
                  <Diamond />
                  <div style="color: #000000">
                    <span class="d-block amount mx-2"
                      >{{ convertMoney(userInfo?.me_money) }}
                    </span>
                  </div>
                  <div class="ml-2" v-if="transaction ==='NO'">
                    <Button
                      variant="contained"
                      :style="{ padding: '0 10px' }"
                      @click="
                        () => {
                          transaction ==='NO' && router.push('/page-deposit');
                          activeNavbar = false;
                        }
                      "
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div v-if="isPartner" class="d-flex flex-column mt-2">
                <div class="d-flex flex-column mb-2">
                  <span class="text-dark">{{ $t("commission") }}</span>
                  <div class="money-content">
                    <span class="text-dark">
                      ₩{{ convertMoney(userInfo?.partnerSettleAmount) }}
                    </span>
                  </div>
                </div>
                <button @click="doPartnerConvert()" class="btn-partner mb-2">
                  {{ $t("partnerPage") }}
                </button>
                <button @click="doSettlement()" class="btn-partner">
                  {{ $t("settlement") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="partnership">
    <section
      class="partnership container d-flex justify-space-between align-center py-1 px-1"
      v-if="isPartner"
    >
      <div></div>
      <div class="list-partner d-flex align-center">
        <div>
          <div class="commission">{{ $t("commission") }}</div>
          <div class="money-partner">
            ₩ {{ convertMoney(userInfo?.partnerSettleAmount) }}
          </div>
        </div>
        <div class="d-flex align-center list-btn-partner">
          <div>
            <button
              class="btn-partner mx-2 mx-sm-4"
              @click="doPartnerConvert()"
            >
              {{ $t("partnerPage") }}
            </button>
          </div>
          <div>
            <button class="btn-partner" @click="doSettlement()">
              {{ $t("settlement") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
header {
  background-color: #040816;
  color: #ffffff;
  padding: 1.5rem 0;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    width: 95%;
    margin: 0 auto;

    .logo-group {
      background-color: transparent;
      border: unset;
      outline: unset;

      img {
        //height: 100%;
        height: 75px;
        width: auto;
      }
    }

    .navbar {
      align-items: flex-end;

      .nav-item {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        background-color: transparent;
        color: #ffffff;
        outline: unset;
        border: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:hover {
          opacity: 0.7;
          transform: scale(0.99);
          transition: all linear 0.2s;
          color: var(--primaryG2Casino);
        }

        &.active {
          color: var(--primaryG2Casino);
        }
      }
    }

    .more {
      display: none;

      @media (max-width: 1160px) {
        display: block;
        margin-left: 1rem;
      }
    }

    .btn-partner {
      padding: 5px 10px;
      font-size: 14px;
      background: #28a59f;
      color: var(--bg);
      border-radius: 4px;
      // text-transform: uppercase;
    }

    .header-right {
      display: flex;
      align-items: center;

      .diamond {
        display: flex;
        align-items: center;
        position: relative;

        &:hover {
          .user {
            .user-action {
              display: block;
            }
          }
        }

        &::after {
          content: "";
          position: absolute;
          width: 150px;
          height: 30px;
          //background: #0F172A;
          right: 0;
          top: 40px;

          @media (max-width: 1161px) {
            display: none;
          }
        }

        .diamond-icon {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        .user {
          margin: 0 0.5rem;

          h5 {
            margin: 0;
            max-width: 85px;
            overflow: hidden;
            font-size: 1rem;
            text-overflow: ellipsis;
          }

          .user-action {
            position: absolute;
            right: 0;
            top: 52px;
            background: #ffffff;
            box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
            border-radius: 5px;
            z-index: 1;
            display: none;
            text-align: left;
            list-style-type: none;
            padding: 1rem;

            li {
              padding: 0.5rem 1rem;
              color: var(--textG2Casino);
              font-weight: 700;

              .link {
                text-decoration: none;
                color: var(--textG2Casino);
              }

              &:hover {
                opacity: 0.8;
              }

              button {
                span {
                  margin-right: 0.5rem;
                }
              }
            }
          }

          .amount {
            max-width: 85px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .btn-auth {
        color: #ffffff;
        padding-right: 2rem;
        display: flex;
        align-items: center;

        a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          display: block;

          &:hover {
            opacity: 0.7;
            transform: scale(0.99);
            transition: all linear 0.2s;
          }

          &:last-child {
            background: #254ee0;
            padding: 0.7rem 0.8rem;
            border-radius: 6px;
            margin-left: 1rem;
          }
        }
      }

      .dropdown {
        position: static;
      }

      .language {
        display: flex;
        align-items: center;
        position: relative;

        &:focus-visible,
        .dropdown-language:focus-visible {
          outline: none;
        }

        .dropdown-menu {
          min-width: 7rem;
          transform: unset !important;
          top: 40px !important;
          left: -30px !important;

          .dropdown-item {
            span {
              font-size: 0.8rem;
            }
          }
        }

        .dropdown-toggle {
          border: none;
          color: #fafafa;

          span {
            text-transform: uppercase;
          }
        }

        img {
          width: 24px;
          margin-right: 5px;
        }
      }

      .wrap-nav-mobile {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 5;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s all ease-in-out;

        .language {
          .dropdown-toggle {
            text-transform: uppercase;
            border-radius: 20px;
            background: #fafafa;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            padding: 6px 12px;
          }

          .dropdown-menu {
            top: -20px;
            left: -165px;
            width: 50% !important;
            margin-top: 0;
            padding: 4px;

            .dropdown-item {
              padding: 4px;
              font-size: 14px;
              text-transform: uppercase;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          img {
            width: 24px;
            margin-right: 5px;
          }
        }

        @media (max-width: 1160px) {
          .overlay {
            width: 100%;
            height: 100%;
            position: fixed;
            cursor: pointer;
            z-index: 4;
            background: rgba(0, 0, 0, 0.6);
          }

          .nav-mobile {
            width: 240px;
            height: 100%;
            overflow: auto;
            background: #ffffff;
            position: fixed;
            top: 0;
            left: -300px;
            z-index: 9;
            transition: 0.5s all ease-in-out;
            padding: 10px 30px;

            &::-webkit-scrollbar {
              display: none;
            }

            .logo-mobile {
              display: flex;
              justify-content: left;
              padding: 20px 0;

              img {
                width: 100px;
                height: auto;
              }
            }

            .item {
              margin: 2rem 0;
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              letter-spacing: 0em;
              text-align: left;
              cursor: pointer;

              button {
                color: #a1a1aa;
                text-decoration: none;
              }
            }
          }

          .active-nav {
            left: 0;
          }

          .btn-auth {
            display: block;
            flex-direction: column;
            padding-right: 0;

            a {
              width: 100%;
              margin: 0;
              box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
              padding: 0.7rem 1.5rem;
              border-radius: 6px;

              &:first-child {
                background: #ffffff;
                color: #000000;
                margin-bottom: 1rem;
              }
            }
          }

          .diamond-mb {
            display: block;
          }
        }
      }

      @media (max-width: 1160px) {
        .btn-auth,
        .diamond {
          display: none;
        }
      }

      .active {
        transition: 0.5s all ease-in-out;
        opacity: 1 !important;
        visibility: visible !important;
      }
    }
  }
}

@keyframes view {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.navbar-mobile {
  display: none;
}

@media (max-width: 1160px) {
  .destop-partner {
    display: none !important;
  }
  header {
    .navbar {
      display: none;
    }

    .navbar-mobile {
      display: block;
    }

    .header-container {
      .header-right {
        flex-direction: row !important;

        .nav-mobile {
          .user {
            margin: 0;

            h5 {
              color: var(--textG2Casino);
              text-align: left;
              font-weight: 700;
            }

            &:after {
              display: none;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
}
</style>
<style scoped lang="scss">
.partnership {
  background-color: #040816;
}

.list-btn-partner {
  @media (max-width: 374px) {
    flex-direction: column;
  }
}

.btn-partner {
  border: none !important;
  padding: 0.5rem 2rem;
  background: #28a59f;
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  @media (max-width: 576px) {
    font-size: 13px;
    padding: 0.5rem;
  }
  @media (max-width: 374px) {
    font-size: 12px;
    padding: 0.3rem;
    width: 8rem;
    margin: 0.2rem 0;
  }
}

.commission {
  font-size: 13px;
  color: #b9b7b7;
  @media (max-width: 576px) {
    font-size: 12px;
  }
}

.money-partner {
  text-align: center;
  font-weight: 600;
  color: var(--primaryG2Casino);
  font-size: 18px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>

<style>
.nav-item.active svg path,
.nav-item:hover svg path {
  fill: var(--primaryG2Casino);
}

.user-action .link svg path {
  fill: #a1a1aa;
}
</style>
