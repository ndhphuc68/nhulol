<script setup>
import { datafooter, datasitemap } from "@/components/SCCasino/Footer/data";
import { gameGuideTabs } from "@/utils/datas";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const customPage = computed(() => store.state.customPage.styles);

const listCompany = () => {
  if (customPage.value.footer_banners) {
    return JSON.parse(customPage.value.footer_banners).filter(
      (cp) => cp.onoff == 1
    );
  } else return [];
};

const handleOpenGameGuide = (index) => {
  store.commit("handleToggle", "gameGuide");
  store.commit("handleActiveGuideMenu", index);
};

const handleOpenModalFAQAndCooperation = (key) => {
  if (key === "noticeEventFAQ") {
    store.commit("handleToggle", "noticeEventFAQ");
    store.commit("handleActiveTab", 1);
  } else {
    store.commit("handleToggle", "partnership");
  }
};

const handleClickTabGame = (key) => {
  store.commit("handleUpdateTabGame", key);
};
</script>

<template>
  <footer>
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-3 col-12">
          <router-link :to="{ name: '' }" class="logo-footer">
            <img
              :src="
                customPage.logo_image
                  ? customPage.logo_image
                  : require('@/assets/SCCasino/logo/logo.png')
              "
              alt="Logo"
              class="img-fluid"
            />
          </router-link>
          <div class="desc">
            COPYRIGHT 2023, {{ customPage?.front_title ? customPage?.front_title :'SCCasino' }}. ALL RIGHTS RESERVED. GAMBLING CAN BE
            ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT
            TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-12 mt-3">
          <div class="title">
            <h3>{{ $t("helpCenter") }}</h3>
            <ul class="list-item">
              <li
                class="items"
                v-for="(item, index) in datafooter"
                :key="index"
              >
                <button @click="handleOpenModalFAQAndCooperation(item.key)">
                  <component :is="item.icon" />
                  <span>{{ $t(item.text) }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-4 col-5 mt-3">
          <div class="title">
            <h3>{{ $t("sitemap") }}</h3>
          </div>
          <div class="list-sitemap d-flex flex-column">
            <router-link
              :to="{ name: '' }"
              @click="handleClickTabGame(index)"
              v-for="(item, index) in datasitemap"
              :key="index"
              class="tab-game-item"
            >
              {{ $t(item.text) }}
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-7 mt-3">
          <div class="title">
            <h3>{{ $t("betrule") }}</h3>
          </div>
          <div class="list-sitemap">
            <span
              @click="handleOpenGameGuide(index)"
              v-for="(item, index) in gameGuideTabs.titles"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
      <div class="companies">
        <div class="company-item" v-for="item in listCompany()" :key="item.key">
          <img
            :src="require(`@/assets/logo/logo-footer/${item.key}.png`)"
            alt="logo"
            class="logo-company"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: #233d69;
  padding: 3rem 0;

  .logo-footer {
    text-align: left;
    margin-bottom: 1rem;

    img {
      height: 4.5rem;
    }
  }

  .desc {
    color: #a1a1aa;
    font-size: 0.7rem;
    text-align: left;
  }

  .list-item {
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    padding: 0;

    .items {
      &:first-child {
        margin-right: 50px;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        margin: 0 5px;

        svg {
          background-color: #fafafa;
          border-radius: 100%;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          margin-bottom: 0.5rem;
        }

        span {
          color: #a1a1aa;
        }
      }
    }
  }

  .title {
    h3 {
      color: #e9e9eb;
      padding: 0.3rem 0;
      text-align: left;
      @media (max-width: 375px) {
        font-size: 14px;
      }
    }
  }

  .list-sitemap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    gap: 0.5rem;
    .tab-game-item,
    span {
      text-decoration: none;
      color: #e4e4e7;
      cursor: pointer;
      @media (max-width: 375px) {
        font-size: 10px;
      }
    }
  }

  .companies {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
  }

  .company-item {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 85px;
    background: #fff;
    border-radius: 8px;
  }

  .logo-company {
    width: 120px;
    height: 70px;
    @media (max-width: 375px) {
      padding: 10px;
    }
  }
}

@media (max-width: 1300px) {
  .companies {
    grid-template-columns: repeat(5, 1fr) !important;
  }
}

@media (max-width: 1100px) {
  .companies {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .companies {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 576px) {
  .companies {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
