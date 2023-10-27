<template>
  <div class="container">
    <div class="footer-top">
      <div class="footer-item">
        <img
          class="logo"
          alt="log"
          :src="
            customPage?.logo_image
              ? customPage.logo_image
              : require('../../../assets/logo/sidebar/kcasino.png')
          "
        />
        <p>COPYRIGHT 2023, {{ customPage?.front_title ? customPage?.front_title : "EDGames" }}. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE.
        </p>
      </div>
      <div class="footer-item">
        <h4>{{ customPage?.front_title ? customPage?.front_title : "EDGames" }}</h4>
        <div class="v-row">
          <div class="v-col-6 d-flex align-center">
            <div
              class="d-flex flex-column align-center justify-center item-edgame"
              @click="handleOpenModalServiceCenter"
            >
              <img alt="logo" src="@/assets/logo/footer/Headset.png" />
              <span>{{ $t("faqs") }}</span>
            </div>
          </div>
          <div class="v-col-6 d-flex align-center">
            <div
              class="d-flex flex-column align-center justify-center item-edgame"
              @click="handleOpenModalPartnership"
            >
              <img alt="logo" src="@/assets/logo/footer/Users.png" />
              <span>{{ $t("partnership") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-item">
        <div class="v-row">
          <div class="about-item v-col-6">
            <div>
              <a
                ><h5>{{ $t("best-rule") }}</h5></a
              >
              <div class="about-item-menu">
                <a
                  class="btn-hover"
                  @click="handleOpenModal(index)"
                  v-for="(item, index) in gameGuideTabs.titles"
                  :key="index"
                >
                  <span>{{ item }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="about-item v-col-6">
            <div>
              <h5>{{ $t("site-map") }}</h5>
              <div class="about-item-menu">
                <a class="btn-hover" @click="handleScrollTabGame(0)"
                  ><span>{{ $t("live") }}</span></a
                >
                <a class="btn-hover" @click="handleScrollTabGame(1)"
                  ><span>{{ $t("slot") }}</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="w-100" />
    <div class="footer-bottom" style="margin-top: 15px">
      <div class="companies-wrapper">
        <div v-if="listCompany().length > 0" class="companies">
          <div
            class="company-item btn-hover"
            v-for="company in listCompany()"
            :key="company.key"
          >
            <div class="logo-footer">
              <img
                :src="require(`@/assets/logo/logo-footer/${company.key}.png`)"
                alt="logo"
                class="logo-company"
              />
            </div>
          </div>
        </div>
        <!--        <div class="company-item" v-for="company in companies.slice(0,6)" :key="company.id">-->
        <!--          <button>-->
        <!--            <img alt="" :src = "require(`@/assets/logo/companies/${company.image}`)" />-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script setup>
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

const handleScrollTabGame = (index) => {
  store.commit("handleUpdateTabGame", index);
  store.commit("handleActiveSidebar", index);
  const element = document.getElementById("tabGame");
  element.scrollIntoView({ behavior: "smooth" });
};

const handleOpenModalServiceCenter = () => {
  store.commit("handleToggle", "notice");
  store.commit("handleActiveMenu", 1);
};

const handleOpenModalPartnership = () => {
  store.commit("handleToggle", "partnership");
};

const handleOpenModal = (idx) => {
  if (store.state.auth.auth) {
    store.commit("handleToggle", "gameGuide");
    store.commit("handleActiveGuideMenu", idx);
  } else store.commit("handleToggle", "login");
};
</script>
<style scoped>
.container {
  background: #353c4a;
  padding: 32px;
  margin-top: 30px;
  color: var(--bg);
  max-width: 100%;
  overflow: hidden;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-item {
  width: 30%;
}

.logo {
  width: 191px;
  height: 43px;
}

.about-item-menu {
  display: flex;
  flex-direction: column;
}

.item-edgame {
  border: 1px solid #e4e4e7;
  height: 120px;
  width: 120px;
  border-radius: 4px;
  cursor: pointer;
}

.item-edgame:hover {
  transform: scale(1.03);
}

.item-edgame span {
  font-size: 14px;
}

.item-edgame img {
  height: 24px;
  width: 24px;
}

.logo-service {
  max-width: 100px;
  max-height: 119px;
}

.logo-service:nth-child(2) {
  margin: 0 12px;
}

.footer-about {
  width: 35%;
  display: flex;
  justify-content: space-around;
}

h4,
h5 {
  margin-bottom: 24px;
}

.footer-item p {
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
}

.about-item-menu a {
  margin: 8px 0;
}

hr {
  width: 1199px;
  height: 0;
  border: 1px solid #52525b;
}

.company {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
}

.companies {
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
.company-item:hover {
  transform: scale(1.03);
}
.company-item button {
  height: 100%;
}

.logo-company {
  width: 120px;
  height: 70px;
}

@media (max-width: 1300px) {
  .companies {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1100px) {
  .companies {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-item {
    width: 100%;
    margin: 10px 0;
  }

  .companies {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .companies {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
}

@media (max-width: 375px) {
  .logo-footer {
    padding: 10px;
  }
}
</style>
