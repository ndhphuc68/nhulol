<script setup>
// import { defineEmits } from "vue";
import AuthGroup from "@/components/SCCasino/AuthGroup";
import { useStore } from "vuex";

// const $emit = defineEmits(["handleToggleSidebar"]);
const store = useStore();

const handleToggleSidebar = (status) => {
  store.commit("handleToggleSidebar", status);
};
</script>

<template>
  <header>
    <div class="header-container">
      <div class="menu-group">
        <button @click="handleToggleSidebar(true)">
          <i class="pi pi-align-justify" style="font-size: 1.5rem"></i>
        </button>
      </div>
      <div class="logo">
        <img alt="logo" src="@/assets/SCCasino/logo/logo.png" />
      </div>
      <div>
        <AuthGroup />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: var(--header-height-SCCasino);
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;

  .header-container {
    width: 100%;
    max-width: 1440px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0 1.25rem;

    .menu-group {
      display: none;
    }

    .logo {
      width: 254px;

      img {
        width: 100%;
      }
    }
  }
}

@media (max-width: 1024px) {
  header {
    .header-container {
      .menu-group {
        display: block;

        button {
          align-items: center;
          display: flex;
        }
      }

      .logo {
        width: 180px;
      }
    }
  }
}

@media (max-width: 768px) {
  header {
    .header-container {
      .logo {
        width: 116px;
      }
    }
  }
}
</style>
