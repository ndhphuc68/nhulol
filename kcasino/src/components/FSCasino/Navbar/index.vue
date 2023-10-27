<template>
  <Sidebar v-model:visible="visible" class="p-sidebar-left">
    <div v-if="store.state.auth.auth" class="row">
      <div class="d-flex flex-row align-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M13.4375 9.375C13.4375 10.0549 13.2359 10.7195 12.8582 11.2848C12.4805 11.8501 11.9436 12.2907 11.3155 12.5508C10.6874 12.811 9.99619 12.8791 9.32938 12.7464C8.66257 12.6138 8.05007 12.2864 7.56932 11.8057C7.08858 11.3249 6.76119 10.7124 6.62855 10.0456C6.49592 9.37881 6.56399 8.68765 6.82417 8.05953C7.08434 7.4314 7.52494 6.89454 8.09023 6.51682C8.65552 6.13911 9.32013 5.9375 10 5.9375C10.9114 5.93853 11.7851 6.30103 12.4295 6.94546C13.074 7.58989 13.4365 8.46364 13.4375 9.375ZM18.125 10C18.125 11.607 17.6485 13.1779 16.7557 14.514C15.8629 15.8502 14.594 16.8916 13.1093 17.5065C11.6247 18.1215 9.99099 18.2824 8.41489 17.9689C6.8388 17.6554 5.39106 16.8815 4.25476 15.7452C3.11846 14.6089 2.34463 13.1612 2.03112 11.5851C1.71762 10.009 1.87852 8.37535 2.49348 6.8907C3.10844 5.40605 4.14985 4.1371 5.486 3.24431C6.82214 2.35152 8.39303 1.875 10 1.875C12.1542 1.87727 14.2195 2.73403 15.7427 4.25727C17.266 5.78051 18.1227 7.84581 18.125 10ZM16.875 10C16.874 9.07464 16.6864 8.15898 16.3234 7.30778C15.9604 6.45659 15.4295 5.68734 14.7624 5.04604C14.0952 4.40475 13.3056 3.90457 12.4408 3.57544C11.5759 3.2463 10.6536 3.09496 9.72891 3.13047C6.04922 3.27266 3.11485 6.3375 3.125 10.0195C3.12853 11.6957 3.74674 13.3124 4.8625 14.5633C5.3169 13.9042 5.8941 13.339 6.5625 12.8984C6.61949 12.8608 6.68724 12.8429 6.75539 12.8474C6.82353 12.8519 6.88832 12.8786 6.93985 12.9234C7.78921 13.6581 8.87466 14.0624 9.99766 14.0624C11.1207 14.0624 12.2061 13.6581 13.0555 12.9234C13.107 12.8786 13.1718 12.8519 13.2399 12.8474C13.3081 12.8429 13.3758 12.8608 13.4328 12.8984C14.1021 13.3387 14.6801 13.904 15.1352 14.5633C16.2564 13.3078 16.8758 11.6833 16.875 10Z"
            fill="#DE6777"
          />
        </svg>
        <span class="text-user">&emsp;{{ userInfor?.me_account }}</span>
      </div>
      <div class="d-flex flex-row mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 21"
          fill="none"
        >
          <path
            d="M9.0625 6.75H9.375V9.875H9.0625C8.6481 9.875 8.25067 9.71038 7.95765 9.41735C7.66462 9.12433 7.5 8.7269 7.5 8.3125C7.5 7.8981 7.66462 7.50067 7.95765 7.20765C8.25067 6.91462 8.6481 6.75 9.0625 6.75ZM11.5625 11.125H10.625V14.25H11.5625C11.9769 14.25 12.3743 14.0854 12.6674 13.7924C12.9604 13.4993 13.125 13.1019 13.125 12.6875C13.125 12.2731 12.9604 11.8757 12.6674 11.5826C12.3743 11.2896 11.9769 11.125 11.5625 11.125ZM18.125 10.5C18.125 12.107 17.6485 13.6779 16.7557 15.014C15.8629 16.3502 14.594 17.3916 13.1093 18.0065C11.6247 18.6215 9.99099 18.7824 8.41489 18.4689C6.8388 18.1554 5.39106 17.3815 4.25476 16.2452C3.11846 15.1089 2.34463 13.6612 2.03112 12.0851C1.71762 10.509 1.87852 8.87535 2.49348 7.3907C3.10844 5.90605 4.14985 4.6371 5.486 3.74431C6.82214 2.85152 8.39303 2.375 10 2.375C12.1542 2.37727 14.2195 3.23403 15.7427 4.75727C17.266 6.28051 18.1227 8.34581 18.125 10.5ZM14.375 12.6875C14.375 11.9416 14.0787 11.2262 13.5512 10.6988C13.0238 10.1713 12.3084 9.875 11.5625 9.875H10.625V6.75H10.9375C11.3519 6.75 11.7493 6.91462 12.0424 7.20765C12.3354 7.50067 12.5 7.8981 12.5 8.3125C12.5 8.47826 12.5659 8.63723 12.6831 8.75444C12.8003 8.87165 12.9592 8.9375 13.125 8.9375C13.2908 8.9375 13.4497 8.87165 13.5669 8.75444C13.6842 8.63723 13.75 8.47826 13.75 8.3125C13.75 7.56658 13.4537 6.85121 12.9262 6.32376C12.3988 5.79632 11.6834 5.5 10.9375 5.5H10.625V4.875C10.625 4.70924 10.5592 4.55027 10.4419 4.43306C10.3247 4.31585 10.1658 4.25 10 4.25C9.83424 4.25 9.67527 4.31585 9.55806 4.43306C9.44085 4.55027 9.375 4.70924 9.375 4.875V5.5H9.0625C8.31658 5.5 7.60121 5.79632 7.07377 6.32376C6.54632 6.85121 6.25 7.56658 6.25 8.3125C6.25 9.05842 6.54632 9.77379 7.07377 10.3012C7.60121 10.8287 8.31658 11.125 9.0625 11.125H9.375V14.25H8.75C8.3356 14.25 7.93817 14.0854 7.64515 13.7924C7.35212 13.4993 7.1875 13.1019 7.1875 12.6875C7.1875 12.5217 7.12166 12.3628 7.00445 12.2456C6.88723 12.1283 6.72826 12.0625 6.5625 12.0625C6.39674 12.0625 6.23777 12.1283 6.12056 12.2456C6.00335 12.3628 5.9375 12.5217 5.9375 12.6875C5.9375 13.4334 6.23382 14.1488 6.76127 14.6762C7.28871 15.2037 8.00408 15.5 8.75 15.5H9.375V16.125C9.375 16.2908 9.44085 16.4497 9.55806 16.5669C9.67527 16.6842 9.83424 16.75 10 16.75C10.1658 16.75 10.3247 16.6842 10.4419 16.5669C10.5592 16.4497 10.625 16.2908 10.625 16.125V15.5H11.5625C12.3084 15.5 13.0238 15.2037 13.5512 14.6762C14.0787 14.1488 14.375 13.4334 14.375 12.6875Z"
            fill="#DE6777"
          />
        </svg>
        &emsp;
        <div class="d-flex flex-column">
          <span class="text-user">{{ $t("totalbalance") }}</span>
          <span class="text-price"
            >₩ {{ convertMoney(userInfor?.me_money) }}</span
          >
        </div>
      </div>
      <div
        @click="
          handleCloseModal('betting');
          visible = false;
        "
        class="d-flex flex-row align-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M17.5 10C17.5 11.4649 17.0711 12.8978 16.2661 14.1217C15.4611 15.3456 14.3153 16.3069 12.9701 16.887C11.625 17.4672 10.1394 17.6407 8.69683 17.3861C7.25421 17.1316 5.91772 16.4602 4.85234 15.4547C4.79263 15.3983 4.74462 15.3307 4.71105 15.2557C4.67748 15.1807 4.65901 15.0998 4.65668 15.0177C4.65436 14.9356 4.66824 14.8538 4.69752 14.7771C4.7268 14.7003 4.77092 14.6301 4.82734 14.5704C4.9413 14.4498 5.0985 14.3794 5.26435 14.3747C5.34648 14.3724 5.42825 14.3863 5.50501 14.4155C5.58177 14.4448 5.65201 14.4889 5.71172 14.5454C6.60527 15.3883 7.72742 15.9493 8.93796 16.1582C10.1485 16.367 11.3938 16.2145 12.5181 15.7197C13.6425 15.2249 14.5961 14.4097 15.2598 13.376C15.9236 12.3424 16.2679 11.136 16.25 9.90769C16.232 8.67939 15.8524 7.48362 15.1587 6.46981C14.465 5.45599 13.488 4.66907 12.3496 4.20739C11.2112 3.7457 9.96203 3.62972 8.75812 3.87394C7.5542 4.11815 6.44895 4.71174 5.58047 5.58052C5.30469 5.85942 5.04531 6.13364 4.79297 6.4063L6.06719 7.68286C6.1547 7.77027 6.2143 7.88168 6.23846 8.00298C6.26261 8.12428 6.25023 8.25003 6.20289 8.36429C6.15554 8.47856 6.07536 8.5762 5.97249 8.64487C5.86962 8.71354 5.74869 8.75014 5.625 8.75005H2.5C2.33424 8.75005 2.17527 8.6842 2.05806 8.56699C1.94085 8.44978 1.875 8.29081 1.875 8.12505V5.00005C1.8749 4.87636 1.91151 4.75543 1.98017 4.65256C2.04884 4.54969 2.14649 4.4695 2.26076 4.42216C2.37502 4.37481 2.50076 4.36243 2.62207 4.38659C2.74337 4.41075 2.85478 4.47035 2.94219 4.55786L3.90625 5.52348C4.15781 5.25083 4.41719 4.97661 4.69219 4.69927C5.74069 3.64897 7.07723 2.93336 8.53262 2.643C9.98801 2.35264 11.4968 2.50059 12.8681 3.06811C14.2394 3.63564 15.4114 4.59724 16.236 5.83119C17.0605 7.06514 17.5004 8.51597 17.5 10ZM10 5.62505C9.83424 5.62505 9.67527 5.69089 9.55806 5.8081C9.44085 5.92531 9.375 6.08429 9.375 6.25005V10C9.37497 10.1079 9.40287 10.214 9.45599 10.3079C9.50911 10.4019 9.58563 10.4804 9.67812 10.536L12.8031 12.411C12.8735 12.4533 12.9515 12.4812 13.0327 12.4934C13.1139 12.5055 13.1967 12.5015 13.2764 12.4816C13.356 12.4617 13.431 12.4264 13.497 12.3775C13.563 12.3287 13.6187 12.2673 13.6609 12.1969C13.7032 12.1265 13.7312 12.0485 13.7433 11.9673C13.7554 11.8861 13.7514 11.8033 13.7316 11.7237C13.7117 11.644 13.6763 11.5691 13.6275 11.5031C13.5786 11.4371 13.5173 11.3814 13.4469 11.3391L10.625 9.64614V6.25005C10.625 6.08429 10.5592 5.92531 10.4419 5.8081C10.3247 5.69089 10.1658 5.62505 10 5.62505Z"
            fill="#DE6777"
          />
        </svg>
        <span class="text-user best-his">&emsp;{{ $t("bettingHistory") }}</span>
      </div>
    </div>
    <hr v-if="store.state.auth.auth" />
    <div class="row">
      <div
        @click="
          handleCloseModal(item.key);
          visible = false;
        "
        :class="item.url && 'd-none'"
        :key="index"
        class="col-12 mb-4 icon-mobile"
        v-for="(item, index) in menu"
      >
        <component
          class="icon-item col-2"
          :is="item.component"
          v-if="item.component"
        />
        <span class="col">{{ $t(item.name) }}</span>
      </div>
      <div
        @click="
          handleCloseModal(item.key);
          visible = false;
        "
        :class="item.url && 'd-none'"
        :key="index"
        class="col-12 mb-4 icon-mobile"
        v-for="(item, index) in moreMenu"
      >
        <component
          class="icon-item col-2"
          :is="item.component"
          v-if="item.component"
        />
        <span class="col">{{ $t(item.key) }}</span>
      </div>
    </div>
    <hr />
    <div class="row">
      <div
        v-if="store.state.auth.auth"
        @click="handleLoggout"
        class="d-flex flex-row align-center mb-2 logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.75 16.875C8.75 17.0408 8.68415 17.1997 8.56694 17.3169C8.44973 17.4342 8.29076 17.5 8.125 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H8.125C8.29076 2.5 8.44973 2.56585 8.56694 2.68306C8.68415 2.80027 8.75 2.95924 8.75 3.125C8.75 3.29076 8.68415 3.44973 8.56694 3.56694C8.44973 3.68415 8.29076 3.75 8.125 3.75H3.75V16.25H8.125C8.29076 16.25 8.44973 16.3158 8.56694 16.4331C8.68415 16.5503 8.75 16.7092 8.75 16.875ZM17.3172 9.55781L14.1922 6.43281C14.1048 6.34531 13.9934 6.2857 13.8721 6.26154C13.7508 6.23739 13.625 6.24977 13.5108 6.29711C13.3965 6.34446 13.2988 6.42464 13.2302 6.52751C13.1615 6.63038 13.1249 6.75132 13.125 6.875V9.375H8.125C7.95924 9.375 7.80027 9.44085 7.68306 9.55806C7.56585 9.67527 7.5 9.83424 7.5 10C7.5 10.1658 7.56585 10.3247 7.68306 10.4419C7.80027 10.5592 7.95924 10.625 8.125 10.625H13.125V13.125C13.1249 13.2487 13.1615 13.3696 13.2302 13.4725C13.2988 13.5754 13.3965 13.6555 13.5108 13.7029C13.625 13.7502 13.7508 13.7626 13.8721 13.7385C13.9934 13.7143 14.1048 13.6547 14.1922 13.5672L17.3172 10.4422C17.3753 10.3841 17.4214 10.3152 17.4529 10.2393C17.4843 10.1635 17.5005 10.0821 17.5005 10C17.5005 9.91787 17.4843 9.83654 17.4529 9.76066C17.4214 9.68479 17.3753 9.61586 17.3172 9.55781Z"
            fill="#DE6777"
          />
        </svg>
        <span class="text-user">&emsp;{{ $t("logout") }}</span>
      </div>
      <div
        v-if="!store.state.auth.auth"
        class="d-flex flex-row justify-content-evenly"
      >
        <span
          @click="
            handleCloseModal('login');
            visible = false;
          "
          class="login"
          >{{ $t("login") }}</span
        >&#124;<span
          @click="
            handleCloseModal('signUp');
            visible = false;
          "
          class="register"
          >{{ $t("register") }}</span
        >
      </div>
    </div>
  </Sidebar>
  <section
    class="navbar-mobile container d-flex justify-content-center align-items-center d-lg-none position-relative"
  >
    <button
      class="pi pi-align-justify position-absolute"
      @click="visible = true"
    ></button>
    <img
      width=""
      :src="layout?.logo_image ? layout?.logo_image : null"
    />
  </section>
  <section
    class="container row d-lg-flex d-none py-2"
    style="background: #fff; border-radius: 6px"
  >
    <div
      v-if="layout.logo_pos === '1'"
      @click="handleCloseModal(menu[4].key)"
      class="col menu-item-navbar d-flex flex-column justify-center align-center"
    >
      <component
        class="icon-item"
        :is="menu[4].component"
        v-if="menu[4].component"
      />
      <img :src="menu[4].url" alt="menu icon" v-if="menu[4].url" />
      <div>{{ menu[4].name ? $t(menu[4].name) : "" }}</div>
    </div>
    <div
      @click="handleCloseModal(menu_item.key)"
      v-for="(menu_item, idx) in menu"
      :key="idx"
      class="col menu-item-navbar d-flex flex-column justify-center align-center"
      :class="[
        path === `/${menu_item.key}` ? 'navbar-active' : '',
        menu_item.url
          ? layout.logo_pos === '' || layout.logo_pos === '0'
            ? 'd-flex'
            : 'd-none'
          : '',
      ]"
    >
      <component
        class="icon-item"
        :is="menu_item.component"
        v-if="menu_item.component"
      />
      <img
        :src="layout.logo_image ? layout.logo_image : null"
        v-if="menu_item.url"
      />
      <div>{{ menu_item.name ? $t(menu_item.name) : "" }}</div>
    </div>
    <div class="col more">
      <div
        class="col menu-item-navbar d-flex flex-column justify-center align-center"
        @click="handleToggleMoreMenu"
      >
        <moreIcon class="icon-item" />
        <div>{{ $t("more") }}</div>
      </div>
      <div class="more-menu" v-if="toggleMoreMenu">
        <div
          @click="handleClickMoreMenuItem(menu_item.key)"
          v-for="(menu_item, idx) in moreMenu"
          :key="idx"
          class="col more-item-navbar d-flex flex-column justify-center align-center"
        >
          <component class="icon-item" :is="menu_item.component" />
          <div class="text-center">{{ $t(menu_item.key) }}</div>
        </div>
        <div class="box" @click="handleToggleMoreMenu"></div>
      </div>
    </div>
    <div
      v-if="layout.logo_pos === '2'"
      @click="handleCloseModal(menu[4].key)"
      class="col menu-item-navbar d-flex flex-column justify-center align-center"
    >
      <component
        class="icon-item"
        :is="menu[4].component"
        v-if="menu[4].component"
      />
      <img :src="menu[4].url" alt="menu icon" v-if="menu[4].url" />
      <div>{{ menu[4].name ? $t(menu[4].name) : "" }}</div>
    </div>
  </section>
</template>

<script setup>
import { menu, moreMenu } from "./data";
import { convertMoney, handleCloseModal } from "@/utils";
import moreIcon from "@/assets/FSCasino/icons/icon-navbar/more.vue";
import { computed, ref, watch } from "vue";
import Sidebar from "primevue/sidebar";
import { Images } from "@/const/Image";
import { useStore } from "vuex";
import { deleteCookie } from "@/utils/cookie";
import { logoutRequest } from "@/api/auth/request";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();
const path = computed(() => route.path);
const userInfor = computed(() => store.state.user.userInfor);
const layout = computed(() => store.state.customPage.styles);

const visible = ref(false);
const toggleMoreMenu = ref(false);
const handleToggleMoreMenu = () =>
  (toggleMoreMenu.value = !toggleMoreMenu.value);

const handleClickMoreMenuItem = (modal) => {
  handleCloseModal(modal);
  toggleMoreMenu.value = false;
};

watch(visible, (val) => {
  val
    ? (document.querySelector("html").style.overflowY = "hidden")
    : (document.querySelector("html").style.overflowY = "scroll");
});

const handleLoggout = async () => {
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
  location.reload();
};
</script>
<style lang="scss">
.p-sidebar-left {
  .p-sidebar {
    @media(max-width: 375px) {
      width: 15rem !important;
    }

  }
  .icon-mobile {
    svg path {
      fill: #de6777;
    }
  }

  .text-user {
    color: #545454;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .text-price {
    color: #545454;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .logout,
  .best-his {
    cursor: pointer;
  }

  .login {
    color: #545454;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .register {
    color: #eb4c4c;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

.navbar-mobile {
  button {
    left: 15px;
    margin: auto 0;
    font-size: 1.5rem;
  }

  img {
    width: 120px;
  }
}

.menu-item-navbar {
  padding-bottom: 1rem !important;
  border-bottom: 2px solid var(--white);

  &:nth-child(5) {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
    color: var(--pink);
    border-bottom: 2px solid var(--pink);

    &:nth-child(5) {
      border-bottom: none;
    }

    svg path {
      fill: #de6777;
    }
  }
}

.navbar-active {
  color: var(--pink);
  border-bottom: 2px solid var(--pink);

  svg path {
    fill: #de6777;
  }
}

.more {
  position: relative;

  .more-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    z-index: 9;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    border: 0.5px solid #e3e3e3;

    .more-item-navbar {
      padding: 1rem;
      border: 0.5px solid #e3e3e3;
      width: 140px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
        color: var(--pink);

        svg path {
          fill: #de6777;
        }
      }
    }
  }

  .box {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>

<style>
.p-sidebar-header {
  justify-content: flex-start !important;
}
</style>
