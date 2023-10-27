<script setup>
import AuthGroup from "@/components/SCCasino/AuthGroup";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);

const handleToggleSidebar = (status) => {
  store.commit("handleToggleSidebar", status);
};
</script>

<template>
  <header>
    <div
      class="header-container"
      :style="customPage?.logo_pos === '2' ? 'flex-direction: row-reverse' : ''"
    >
      <div class="menu-group">
        <button @click="handleToggleSidebar(true)">
          <i class="pi pi-align-justify" style="font-size: 1.5rem"></i>
        </button>
      </div>
      <router-link
        :to="{ name: '' }"
        class="logo"
        :class="customPage?.logo_pos === '1' ? 'd-none d-lg-block' : ''"
      >
        <img
          :src="customPage?.logo_image && customPage.logo_image"
          v-if="customPage.logo_pos !== '1'"
        />
      </router-link>
      <div class="logo" v-if="customPage?.logo_pos === '1'">
        <img :src="customPage?.logo_image && customPage.logo_image" />
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
  z-index: 9;
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

    @media (max-width: 375px) {
      padding: 0 1rem;
    }

    .menu-group {
      display: none;
    }

    .logo {
      width: 254px;
      height: 85px;

      img {
        //height: 100%;
        object-fit: contain;
        //width: 100%;
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
        display: flex;
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
