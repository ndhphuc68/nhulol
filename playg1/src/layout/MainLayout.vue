<template>
  <div class="wrapper-main">
    <div class="sidebar-wrapper" :class="{ off: !isOpenSidebar }">
      <Sidebar class="sidebar" />
      <div class="overlay" @click="isOpenSidebar = false"></div>
    </div>
    <div class="main">
      <Header>
        <div class="group-toggle-menu">
          <button v-if="!isOpenSidebar" @click="isOpenSidebar = true">
            <img
              alt="menu-icon"
              class="icon-item mr-2"
              src="@/assets/PlayG1/icon/commons/menu.png"
            />
          </button>
          <button class="wrapper-logo">
            <img
              :src="images.logo"
              alt="logo-do-play"
              class="logo w-100 h-100"
            />
          </button>
        </div>
      </Header>
      <div class="page">
        <router-view />
        <Footer />
      </div>
    </div>

    <NavbarMobile class="navbar-mobile" />
  </div>
</template>
<script setup>
import Sidebar from "@/components/PlayG1/Sidebar";
import Header from "@/components/PlayG1/Header";
import Footer from "@/components/PlayG1/Footer";
import { ref } from "vue";
import images from "@/assets/PlayG1";
import NavbarMobile from "@/components/PlayG1/NavbarMobile";

const isOpenSidebar = ref(true);
</script>

<style scoped>
.wrapper-main {
  display: flex;
  max-width: 1440px;
  margin: auto;
}

.main {
  width: 100%;
  .wrapper-logo {
    width: 96px;
    margin-left: 5px;
  }
}

.page {
  padding: 32px;
  overflow: hidden;
}

.icon-item {
  width: 24px;
  height: 24px;
}

@media (max-width: 1024px) {
  .sidebar-wrapper {
    .sidebar {
      transition: all linear 0.2s;
      opacity: 1;
    }

    .overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 4;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      opacity: 1;
      transition: all linear 0.2s;
    }

    &.off {
      .sidebar {
        width: 0;
        opacity: 0;
      }

      .overlay {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  .group-toggle-menu {
    display: flex;
    align-items: center;
  }

  .main {
    margin-bottom: 88px;
  }

  .navbar-mobile {
    display: flex;
  }
}

@media (min-width: 1025px) {
  .page {
    margin-left: 241px;
  }

  .group-toggle-menu {
    display: none;
  }

  .navbar-mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 20px;
  }
}
</style>

<style lang="scss">
table.custom {
  .in-mobile {
    display: none;
  }

  tr {
    border-bottom: 1px solid #e4e4e7;
  }

  th,
  td {
    padding: 32px 24px;
    font-size: 0.875rem;
    text-align: center;
  }

  td {
    &.complete {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #f0fdf4;
        color: #15803d;
        text-align: center;
      }
    }

    &.failed {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #fef2f2;
        color: #b91c1c;
        text-align: center;
      }
    }

    &.pending {
      .value {
        padding: 6px 10px;
        border-radius: 45px;
        background: #fffbeb;
        color: #b45309;
        text-align: center;
      }
    }

    .value {
      display: flex;
      justify-content: center;

      span {
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

@media (max-width: 768px) {
  table.custom {
    border-collapse: separate;
    border-spacing: 0 1em;

    .in-mobile {
      display: block;
    }

    .in-desktop {
      display: none;
    }

    .table-titles {
      display: none;
    }

    tr {
      border: unset;
      box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    }

    td {
      display: flex;
      padding: 12px 10px;
    }

    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 5px;

      .value {
        justify-content: space-between;

        span {
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          max-width: 150px;
          white-space: nowrap;
        }
      }
    }

    td:nth-child(even) {
      border-radius: 4px;
      background: #fafafa;
    }

    td:nth-child(1) {
      .cell {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          top: 90%;
          left: 0;
          border-bottom: 1px solid #e4e4e7;
        }
      }
    }
  }
}
</style>
