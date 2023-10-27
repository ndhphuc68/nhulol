<template>
  <Sidebar v-model:visible="visible" class="p-sidebar-left">
    <div class="row">
      <div @click="handleCloseModal(item.key);visible = false" :class="item.url && 'd-none'" :key="index"
           class="col-12 mb-4" v-for="(item, index) in menu">
        <component
            class="icon-item"
            :is="item.component"
            v-if="item.component"
        />
        <span class="ms-3">{{ item.name }}</span>
      </div>
      <div @click="handleCloseModal(item.key);visible = false" :class="item.url && 'd-none'" :key="index"
           class="col-12 mb-4" v-for="(item, index) in moreMenu">
        <component
            class="icon-item"
            :is="item.component"
            v-if="item.component"
        />
        <span class="ms-3">{{ item.name }}</span>
      </div>
    </div>
  </Sidebar>
  <section class="navbar-mobile container d-flex justify-content-center align-items-center d-lg-none position-relative">
    <button class="pi pi-align-justify position-absolute" @click="visible = true"></button>
    <img width="" :src="Images.logo" alt="logo">
  </section>
  <section class="container row d-lg-flex d-none">
    <div
        @click="handleCloseModal(menu_item.key)"
        v-for="(menu_item, idx) in menu"
        :key="idx"
        class="col menu-item-navbar"
    >
      <component
          class="icon-item"
          :is="menu_item.component"
          v-if="menu_item.component"
      />
      <img :src="menu_item.url" alt="menu icon" v-if="menu_item.url"/>
      <div>{{ menu_item.name }}</div>
    </div>
    <div class="col more">
      <div class="col menu-item-navbar" @click="handleToggleMoreMenu">
        <moreIcon class="icon-item"/>
        <div>More</div>
      </div>
      <div class="more-menu" v-if="toggleMoreMenu">
        <div
            @click="handleClickMoreMenuItem(menu_item.key)"
            v-for="(menu_item, idx) in moreMenu"
            :key="idx"
            class="col more-item-navbar"
        >
          <component class="icon-item" :is="menu_item.component"/>
          <div>{{ menu_item.name }}</div>
        </div>
        <div class="box" @click="handleToggleMoreMenu"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {menu, moreMenu} from "./data";
import {handleCloseModal} from "@/utils";
import moreIcon from "@/assets/icons/icon-navbar/more.vue";
import {ref} from "vue";
import Sidebar from "primevue/sidebar";
import {Images} from "@/const/Image";

const visible = ref(false);

const toggleMoreMenu = ref(false);

const handleToggleMoreMenu = () =>
    (toggleMoreMenu.value = !toggleMoreMenu.value);

const handleClickMoreMenuItem = (modal) => {
  handleCloseModal(modal);
  toggleMoreMenu.value = false;
};
</script>
<style lang="scss">
.navbar-mobile {
  button {
    left: 15px;
    margin: auto 0;
    font-size: 1.5rem
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
      width: 100%;
      height: 100%;
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
