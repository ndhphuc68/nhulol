<script setup>
import {navList} from "./data";
import AuthGroup from "@/components/PlayG3/AuthGroup";
import {ref, watch, computed} from "vue";
import Sidebar from "@/components/PlayG3/Sidebar";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {convertMoney} from "@/utils";
import {SSRRequest} from "@/api/axios";
import {useI18n} from "vue-i18n";

const store = useStore();
const location = useRoute();
const isViewToggle = ref(false);
const userInfo = computed(() => store.state.user.userInfor);
const customPage = computed(() => store.state.customPage.styles);
const {t} = useI18n();

watch(isViewToggle, () => {
  if (isViewToggle.value) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "visible";
  }
});

const isPartner = computed(() =>
  store.state.user.userInfor.me_partnership_code ? true : false
);
const doPartnerConvert = () => {
  let config = "width=1550, height=800";

  let url =
      process.env.VUE_APP_META_API_URL +
      `/admin/partner/check_login/${userInfo?.value.me_account}?frontLogin=true`;
  window.open(url, "partner", config);
}

const doSettlement = async () => {
  store.commit("handleUpdateLoading", true)
  if (userInfo?.value.partnerSettleAmount == 0) {
    await store.dispatch('showAlert', {
      type: 'error',
      message: t('no_commission'),
    });
    store.commit("handleUpdateLoading", false)
    return;
  }
  
  let dataFrm = [];
  
  dataFrm.partnerCode = userInfo?.value.me_partnership_code;
  dataFrm.memberIdx = userInfo?.value.me_idx;
  dataFrm.account = userInfo?.value.me_account;
  const res = await SSRRequest({
    url: '/api/partnership/settlement',
    method: 'POST',
    dataFrm
  });
  
  if (res?.error == false) {
    if (res.data.transactionMoney == 0) {
      await store.dispatch('showAlert', {
        type: 'error',
        message: t('no_commission'),
      });
    } else {
      await store.dispatch('showAlert', {
        type: 'error',
        message: t('settlement_error'),
      });
    }
  } else {
    await store.dispatch('showAlert', {
      type: 'success',
      message: t('settlement_success'),
    });
  }
  store.commit("handleUpdateLoading", false)
}
</script>

<template>
  <header class="header">
    <div class="header-container container">
      <div class="logo-group">
        <button
          class="btn-menu"
          @click="isViewToggle = !isViewToggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M7 8.5H17M7 12.5H17M7 16.5H17"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <router-link :to="{ name: 'Home' }" class="d-block btn-hover">
          <img
            class="logo"
            :src="
              customPage.logo_image
                && customPage.logo_image
            "
          />
        </router-link>
      </div>
      <nav class="navbar-menu">
        <template v-for="(nav, index) in navList">
          <RouterLink
            class="nav-item btn-hover"
            :class="{ active: location?.name === nav?.name }"
            :to="{ name: nav?.name }"
            :key="index"
            v-if="!nav?.isOnlySidebar"
          >
            <component class="nav-icon mr-1" :is="nav?.icon"/>
            <span>
              {{ $t(nav?.text) }}
            </span>
          </RouterLink>
        </template>
      </nav>
      <div>
        <AuthGroup/>
      </div>
    </div>
    <!--        <div class=" d-block d-lg-none">-->
    <!--            <div>-->
    <!--               -->
    <!--            </div>-->
    <!--        </div>-->
    <!--    -->
    <Sidebar
      :isViewToggle="isViewToggle"
      class="sidebar"
      :class="{ open: isViewToggle }"
      :handleToggleSidebar="
        () => {
          isViewToggle = !isViewToggle;
        }
      "
    />
  
  </header>
  <section class="partnership container d-flex justify-space-between align-center py-1 px-1" v-if="isPartner">
    <div></div>
    <div class="d-flex align-center">
      <div>
        <div class="commission">{{ $t("commission") }}</div>
        <div class="money-partner">₩ {{ convertMoney(userInfo?.partnerSettleAmount) }}</div>
      </div>
      <div class="list-btn-partner d-flex align-center">
        <div>
          <button class="btn-partner mx-2 mx-sm-4" @click="doPartnerConvert()">{{ $t("partnerPage") }}</button>
        </div>
        <div>
          <button class="btn-partner" @click="doSettlement()">{{ $t("settlement") }}</button>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
.destop-partner {
  .btn-partner {
    padding: 5px 10px;
    font-size: 14px;
    background: #28a59f;
    color: var(--bg);
    border-radius: 4px;
    // text-transform: uppercase;
  }
}


.header {
  background-color: #130c25;
  height: var(--height-header-PlayG3);
  
  .header-container {
    display: flex;
    justify-content: space-between;
    margin: auto;
    height: 100%;
    align-items: center;
    max-width: 1440px;
    width: 98%;
    font-size: 90%;
    
    .logo-group {
      display: flex;
      align-items: center;
      max-width: 150px;
      
      .btn-menu {
        svg {
          width: 3rem;
          height: 3rem;
        }
      }
      
      img {
        width: 145px;
      }
    }
    
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .nav-item {
        text-decoration: none;
        font-style: unset;
        color: var(--textSecondPlayG3);
        padding: 0 0.75rem;
        display: flex;
        align-items: center;
        position: relative;
        
        .nav-icon {
          width: 1rem;
          height: 1rem;
        }
        
        span {
          font-size: 1.025rem;
        }
        
        &:hover,
        &.active {
          color: var(--primaryPlayG3);
          
          &:after {
            content: "";
            position: absolute;
            background-color: var(--primaryPlayG3);
            bottom: -150%;
            left: 0;
            width: 100%;
            height: 2px;
          }
        }
      }
    }
  }
}

.sidebar {
  left: -300px;
  transition: all linear 0.3s;
  //animation: closeSidebar  linear 0.3s;
  &.open {
    left: 0;
    //animation: openSidebar  linear 0.3s;
  }
}

.navbar-menu{
  display: flex;
  
  @media (max-width: 1300px) {
    display: none !important;
  }
}

.btn-menu, .sidebar{
  display: none;
  
  @media (max-width: 1300px) {
    display: block;
  }
}

//@keyframes openSidebar {
//    from {
//        left: -300px
//    }
//    to {
//        left: 0
//    }
//}
//@keyframes closeSidebar {
//    from {
//        left: 0
//    }
//    to {
//        left: -300px
//    }
//}

@media (max-width: 768px) {
  .header {
    .header-container {
      .logo-group {
        .logo {
          max-width: 120px;
          @media(max-width: 374px){
            display: none;
          }
        }
      }
    }
  }
}


@media (max-width: 375px) {
  .header {
    .header-container {
      .logo-group {
        .logo {
          max-width: 85px;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.list-btn-partner {
  @media(max-width: 375px) {
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
  @media(max-width: 576px) {
    font-size: 13px;
    padding: 0.5rem;
    
  }
  @media(max-width: 375px) {
    width: 7rem;
    padding: 0.3rem;
    margin: 0.2rem 0;
  }
}

.commission {
  font-size: 13px;
  @media(max-width: 576px) {
    font-size: 12px;
  }
}

.money-partner {
  text-align: center;
  font-weight: 600;
  color: var(--primaryPlayG3);
  font-size: 18px;
  @media(max-width: 576px) {
    font-size: 14px;
  }
}
</style>
