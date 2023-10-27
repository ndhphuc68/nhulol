<template>
  <section id="sidebar" :class="sidebar ? 'active-sidebar' : ''">
    <div class="container d-flex align-items-center h-100">
      <div class="menu w-100">
        <div class="d-lg-none d-block p-3 text-end cancel">
          <IconCancel @click="handleToggleSidebar(false)" />
        </div>
        <div class="infomation" v-if="auth">
          <div>{{ auth.name }}</div>
          <div>
            {{ $t("totalbalance") }}
            <span>{{ convertMoney(auth.me_money) }} ₩</span>
          </div>
          <div>{{ $t("bettingHistory") }}</div>
        </div>
        <div
          v-for="(item, index) in menuSidebar"
          :key="index"
          class="item"
          :class="item.IsMobile && 'd-none'"
        >
          <div
            class="d-flex justify-center align-center w-100 h-100"
            :class="activeSidebar === index ? 'active' : ''"
            @click="handleActiveSidebar(item, index)"
          >
            {{ $t(item.text) }}
          </div>
        </div>
        <div class="justify-center align-center more w-100 d-none d-lg-flex">
          <div
            class="menu-item-navbar d-flex flex-column justify-center align-center w-100"
            @click="handleToggleMoreMenu(true)"
          >
            <div>{{ $t("more") }}</div>
          </div>
          <div class="more-menu" v-if="toggleMoreMenu">
            <div
              @click="handleClickMoreMenuItem(itemMore)"
              v-for="(itemMore, idx) in menuMore"
              :key="idx"
              class="col more-item-navbar d-flex flex-column justify-center align-center"
            >
              <div class="text-center">{{ $t(itemMore.text) }}</div>
            </div>
            <div class="box" @click="handleToggleMoreMenu(false)"></div>
          </div>
        </div>
        <div v-if="!auth" class="justify-space-between auth p-3 group-btn">
          <button class="btn-casino btn-login">
            {{ $t("login") }}
          </button>
          <button class="btn-casino btn-signup">
            {{ $t("register") }}
          </button>
        </div>
        <div v-if="auth" class="logout d-lg-none d-block" @click="handleLogout">
          {{ $t("logout") }}
          <IconLogout class="ms-2" />
        </div>
      </div>
      <div
        class="overlay"
        v-if="sidebar"
        @click="handleToggleSidebar(false)"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { menuSidebar, menuMore } from "./data";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { convertMoney } from "@/utils";
import { useRouter } from "vue-router";
import IconLogout from "@/assets/CasinoClub/icon/svg/Logout.vue";
import IconCancel from "@/assets/CasinoClub/icon/svg/Cancel.vue";

const store = useStore();
const router = useRouter();
const auth = computed(() => store.state.auth.auth);
const sidebar = computed(() => store.state.auth.sidebar);
const activeSidebar = computed(() => store.state.auth.activeSidebar);
const toggleMoreMenu = ref(false);

const handleActiveSidebar = (item, idx) => {
  if (item.href) {
    router.push({ name: item.name });
  } else {
    console.log(item);
  }
  store.commit("handleActiveSidebar", idx);
  store.commit("handleToggleSidebar", !sidebar.value);
};

const handleToggleMoreMenu = (active) => {
  toggleMoreMenu.value = active;
};

const handleToggleSidebar = () => {
  store.commit("handleToggleSidebar", !sidebar.value);
};

const handleClickMoreMenuItem = (item) => {
  if (item.href) {
    router.push({ name: item.name });
    store.commit("handleActiveSidebar", null);
  } else {
    // handleCloseModal(modal);
    console.log(item);
  }

  toggleMoreMenu.value = false;
};

const handleLogout = () => {
  store.commit("handleAuth", null);
};
</script>

<style lang="scss" scoped>
#sidebar {
  height: 75px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.menu {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;

  .item {
    div {
      cursor: pointer;
    }
  }

  .active {
    color: var(--primaryCasinoClub);
    border-bottom: 2px solid var(--primaryCasinoClub);
  }
}

.auth {
  display: none;
}

.infomation {
  display: none;
}

.more {
  position: relative;
  cursor: pointer;

  .more-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    z-index: 9;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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

@media (max-width: 991px) {
  #sidebar {
    position: fixed;
    background: #fff;
    left: -270px;
    top: 0;
    z-index: 23;
    height: 100vh;
    width: 270px;
    bottom: 0;
    overflow: auto;
    transition: all 0.5s;
  }

  .container {
    align-items: normal !important;
    padding: 0;
  }
  .menu {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;
    background: #fff;

    .item {
      display: block !important;
      padding: 12px 20px;
      font-weight: 500;
      transition: all 0.5s;

      div {
        justify-content: start !important;
      }

      &:hover {
        transform: scale(1.05);
      }
    }

    .active {
      color: #000;
      border-bottom: 0;
    }
  }

  .overlay {
    width: 100vw;
    display: block;
    height: 100%;
    position: fixed;
    inset: 0;
    right: 0;
    top: 0;
    z-index: 1;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .auth {
    display: flex;
  }

  .active-sidebar {
    left: 0 !important;
  }

  .infomation {
    display: block;
    padding: 0 20px 20px 20px;
    border-bottom: 1px solid #e9ecef;
  }

  .logout {
    border-top: 1px solid #e9ecef;
    padding: 20px;
    cursor: pointer;
  }

  .cancel {
    cursor: pointer;
    svg {
      width: 25px;
      height: 25px;
      transition: all 0.5s;

      &:hover {
        transform: scale(0.9);
      }
    }
  }
  .group-btn {
    .btn-login {
      color: #000;
    }
  }
}
</style>
