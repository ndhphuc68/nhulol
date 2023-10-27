<template>
  <div class="gameSelectWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img style="width: 120px; cursor: pointer;" src="" @click="refresh()" alt="logo"/>
      </div>
    </div>
    <div class="gameSelectFormWrap">
      <div class="gameSelectInnerFormWrap">
        <div class="gameCategoryGroup">
          <button class="gameCategoryButton" v-for="(menu) in gameCategoryMenu" :class="{'selected' : menu == selectedCategory}" @click.stop="clickCategory(menu)">
            <span>{{t(menu)}}</span>
          </button>
        </div>
        <div v-if="selectedCategory == 'liveCasino'" class="gameSelectButtonGroup liveCasino">
          <button class="gameSelectButton liveCasino" v-for="(menu, idx) in gameData.liveCasinoAbleCompanyList" @click.stop="clickGame(menu, menu.idx)" :disabled="isLoading">
            <img  class="thumnail" style="position: absolute;" :src="getIcon(menu.idx)"/>
            <div class="gameInfo">
              <span>{{t(menu.key)}}</span>
              <div v-if="isLoading && selectedIdx == menu.idx" >
                <pulse-loader></pulse-loader>
               </div>
              <div v-else>
                <button class="gamePlayButton" @click.stop="clickGame(menu, menu.idx)" :disabled="isLoading">{{t('play')}}</button>
              </div>
            </div>
          </button>
          <button class="gameSelectButton liveCasino disable" v-for="(menu, idx) in gameData.liveCasinoDisableCompanyList">
            <div v-if="menu.isLoading == true" style="position: absolute; width: 100%; display: flex; justify-content: center; align-items: center; z-index: 100;" >
              <pulse-loader></pulse-loader>
            </div>
            <img style="position: absolute;" :src="getIcon(menu.idx)" :style="{'opacity': menu.isLoading ? '0.5' : '1' }"/>
            <div class="gameInfo">
              <span>{{t(menu.key)}}</span>
              <button class="gamePlayButton">{{t('play')}}</button>
            </div>
          </button>
        </div>
        <div v-if="selectedCategory == 'slotGame'" style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; gap: 20px;">
          <div class="slotGameCompanyButtonGroup pc">
            <div v-for="(menu, idx) in gameData.slotCityAbleCompanyList" :key="idx">
              <button class="slotGameCompanyButton" :class="{'selected' : menu.provider_id == selectedSlotCompany}" @click.stop="clickSlotCompany(menu.provider_id, menu.provider_logo)">
                <img v-if="menu.provider_logo != undefined" :src="menu.provider_logo"/>
                <img v-else src="@/assets/footer/footer-14.png"/>
                <!--<span v-else>{{t(menu.title)}}</span>-->
              </button>
            </div>
            <div v-for="(menu, idx) in gameData.slotAbleCompanyList" :key="idx">
              <button class="slotGameCompanyButton" :class="{'selected' : menu.provider_id == selectedSlotCompany}" @click.stop="clickSlotCompany(menu.provider_id, menu.provider_logo)">
                <img :src="menu.provider_logo"/>
              </button>
            </div>
            <div v-for="(menu, idx) in gameData.slotCityDisableCompanyList" :key="idx">
              <button class="slotGameCompanyButton disable" :class="{'selected' : menu.provider_id == selectedSlotCompany}">
                <div v-if="menu.isLoading == false" style="position: absolute; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                  <pulse-loader></pulse-loader>
                </div>
                <img v-if="menu.provider_logo != undefined" :src="menu.provider_logo"/>
                <!--<span v-else>{{t(menu.title)}}</span>-->
                <img v-else src="@/assets/footer/footer-14.png"/>
              </button>
            </div>
            <div v-for="(menu, idx) in gameData.slotDisableCompanyList" :key="idx">
              <button class="slotGameCompanyButton disable" :class="{'selected' : menu.provider_id == selectedSlotCompany}">
                <div v-if="menu.isLoading == false" style="position: absolute; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                  <pulse-loader></pulse-loader>
                </div>
                <img :src="menu.provider_logo"/>
              </button>
            </div>
          </div>
          <div class="slotGameCompanyButtonGroup mobile">
            <swiper
                :slides-per-view="2.5" :space-between="1" :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" navigator style="position: relative;" >
                <!--:slides-per-view="2.5" :space-between="1" :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" navigator style="position: relative;" @swiper="onSwiper">-->
              <swiper-slide  v-for="(menu, idx) in gameData.slotCityAbleCompanyList" :key="idx">
                <button class="slotGameCompanyButton" :class="{'selected' : menu.provider_id == selectedSlotCompany}" @click.stop="clickSlotCompany(menu.provider_id, menu.provider_logo)">
                  <img v-if="menu.provider_logo != undefined" :src="menu.provider_logo"/>
                  <img v-else src="@/assets/footer/footer-14.png"/>
                  <!--<span v-else>{{t(menu.title)}}</span>-->
                </button>
              </swiper-slide>
              <swiper-slide  v-for="(menu, idx) in gameData.slotAbleCompanyList" :key="idx">
                <button class="slotGameCompanyButton" :class="{'selected' : menu.provider_id == selectedSlotCompany}" @click.stop="clickSlotCompany(menu.provider_id, menu.provider_logo)">
                  <img :src="menu.provider_logo"/>
                </button>
              </swiper-slide>
              <swiper-slide  v-for="(menu, idx) in gameData.slotCityDisableCompanyList" :key="idx">
                <button class="slotGameCompanyButton disable" :class="{'selected' : menu.provider_id == selectedSlotCompany}">
                  <div v-if="menu.isLoading == false" style="position: absolute; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                    <pulse-loader></pulse-loader>
                  </div>
                  <img v-if="menu.provider_logo != undefined" :src="menu.provider_logo"/>
                  <img v-else src="@/assets/footer/footer-14.png"/>
                  <!--<span v-else>{{t(menu.title)}}</span>-->
                </button>
              </swiper-slide>
              <swiper-slide  v-for="(menu, idx) in gameData.slotDisableCompanyList" :key="idx">
                <button class="slotGameCompanyButton disable" :class="{'selected' : menu.provider_id == selectedSlotCompany}">
                  <div v-if="menu.isLoading == false" style="position: absolute; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                    <pulse-loader></pulse-loader>
                  </div>
                  <img :src="menu.provider_logo"/>
                </button>
              </swiper-slide>
            </swiper>
          </div>
          <div class="slotGameCategoryButtonGroup pc">
            <div v-for="(menu, idx) in seletedSlotCategoryList" :key="idx" style="height: 100%;">
              <button class="slotGameCategoryButton" :class="{'selected' : idx == selectedSlotCategory}" @click.stop="clickSlotCategory(idx)">
                <span>{{t(menu)}}</span>
              </button>
            </div>
            <div class="gameSearchGroup">
              <img style="width: 19px; margin-left: 10px;" src="../../assets/icon/search_icon.png"/>
              <input style="overflow: scroll; margin-right: 5px; padding: unset;" v-model="searchSlotText" :placeholder="t('searchGame')"/>
            </div>
          </div>
          <div class="slotGameCategoryButtonGroup mobile">
            <div class="gameSearchGroup">
              <img style="width: 19px; margin-left: 10px;" src="../../assets/icon/search_icon.png"/>
              <input style="overflow: scroll; margin-right: 5px; padding: unset;" v-model="searchSlotText" :placeholder="t('searchGame')"/>
            </div>
          </div>
          <div class="gameSelectButtonGroup slotGame pc">
            <button class="gameSelectButton slotGame" v-for="(menu, idx) in seletedSlotGameList"  @click.stop="clickGame(menu, idx)" :disabled="isLoading">
              <div v-if="isLoading && selectedIdx == idx" style="position: absolute; width: 168px; height: 112px; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                <pulse-loader></pulse-loader>
              </div>
              <div v-if="menu.provider_logo != undefined">
              <img class="thumnail" style="position: relative; width: 168px; height: 112px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }"
                   :src="menu.isLoading ? (menu?.game_image || menu?.gameimage) :  menu?.provider_logo"
                   loading="lazy" @load="menu.isLoading = true;" @error="errorImg(menu)"/>
              </div>
              <div v-else >
                <img class="thumnail" style="position: relative; width: 168px; height: 112px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }"
                      :src="menu?.gameimage"
                      loading="lazy" @load="menu.isLoading = true;" @error="errorImg(menu)"/>
              </div>
              <span >
                <div class="thumtext"> {{getSlotGameName(menu)}} </div>
              </span>
            </button>
          </div>
          <div class="gameSelectButtonGroup slotGame mobile">
            <button class="gameSelectButton slotGame" v-for="(menu, idx) in seletedSlotGameList_Mobile"  @click.stop="clickGame(menu, idx)" :disabled="isLoading">
              <div v-if="isLoading && selectedIdx == idx" style="position: absolute; width: 168px; height: 112px; display: flex; justify-content: center; align-items: center; z-index: 100;" >
                <pulse-loader></pulse-loader>
              </div>
              <!--<img style="position: relative; width: 168px; height: 112px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }"
                   :src="menu.isLoading ? (menu?.game_image || menu?.gameimage) : menu?.provider_logo"
                   loading="lazy" @load="menu.isLoading = true;" @error="errorImg(menu)"/>
              <span>{{getSlotGameName(menu)}}</span>-->
              <div v-if="menu.provider_logo != undefined">
                <img class="thumnail" style="position: relative; width: 168px; height: 112px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }"
                     :src="menu.isLoading ? (menu?.game_image || menu?.gameimage) :  menu?.provider_logo"
                     loading="lazy" @load="menu.isLoading = true;" @error="errorImg(menu)"/>
              </div>
              <div v-else >
                <img class="thumnail" style="position: relative; width: 168px; height: 112px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }"
                     :src="menu?.gameimage"
                     loading="lazy" @load="menu.isLoading = true;" @error="errorImg(menu)"/>
              </div>
              <span >
                <div class="thumtext"> {{getSlotGameName(menu)}} </div>
              </span>
            </button>
          </div>
        </div>
        <div v-if="selectedCategory == 'miniGame'" class="gameSelectButtonGroup miniGame">
          <button class="gameSelectButton miniGame" v-for="(menu, idx) in miniGameMenu"  @click.stop="clickGame(menu, idx)" :class="{'disable' : !enableGameMenu.includes(menu.gameCode)}" :disabled="isLoading">
            <div v-if="isLoading && selectedIdx == idx" style="position: absolute; width: 168px; height: 168px; display: flex; justify-content: center; align-items: center; z-index: 100;" >
              <pulse-loader></pulse-loader>
            </div>
            <img style="position: absolute; width: 168px; height: 168px;" :style="{'opacity': isLoading && selectedIdx == idx ? '0.5' : '1' }" :src="getIcon(idx)"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {modals, toggleShow} from "@/utils/modals";
import { data as gameData} from "@/views/game/game";

import store from '@/store';
import {computed, onMounted, ref, reactive} from "vue";

import { useI18n } from 'vue-i18n';
import {notify} from "@kyvg/vue3-notification";
import {getCookie} from "@/utils/cookie";
import { useRoute } from 'vue-router';
import {fn as listFn} from "@/views/list/list";
import {fn as transactionFn} from "@/views/transaction/transaction";
import {fn as gameFn} from '@/views/game/game.js';
import {fn as LoginFn, fn as loginFn} from "@/views/login/login";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {themeUtils} from "@/const/themeData";

const i18n = ref(useI18n());
const route = useRoute();
const { t } = useI18n();

const selectedCategory = ref('liveCasino');
const selectedSlotCompany = ref(undefined);
const selectedSlotCompanyLogo = ref(undefined);
const selectedSlotCategory = ref(0);
const searchSlotText = ref(undefined);
const memberIdx = computed(() => {
  return store.getters['user/getUserInfo']['me_idx'];
});

let windowObject = ref(undefined);
const isLoading = ref(false);
const selectedIdx = ref(-1);

const swipeOpt = reactive({
  modules: [Navigation, A11y],
  autoDelay: {}
});

const currentGameKey = ref(false);

const props = defineProps({
  modalType: {
    type: String,
    default: undefined
  },
});

const gameCategoryMenu = [
  "liveCasino",
  "slotGame",
  "miniGame",
];

const slotCategoryMenu = [
  { key: "Slots"},
  { key: "Virtual Sports"},
  { key: "Casino"},
  { key: "Live Casino"},
  { key: "Fishing"},
  { key: "Lobby"},
  { key: "Promo"},
  { key: "Table"},
]

let windowOpen = undefined;

const miniGameMenu = [
  { key: "ENTRY_POWERBALL", api: "", flag: "gamePlay", gameCode: ""},
  { key: "BBIN", api: "", flag: "gamePlay", gameCode: ""},
  { key: "GAME_PLAY_ODDEVEN", api: "", flag: "gamePlay", gameCode: ""},
  { key: "GAME_PLAY_RPS", api: "", flag: "gamePlay", gameCode: ""},
  { key: "BUSTABIT", api: "", flag: "gamePlay", gameCode: ""},
];

const enableGameMenu = computed(() => {
  let tempList = [];

  for(let idx in gameData.list)
  {
    if(gameData.list[idx].ga_status == 'ACTIVE')
      tempList.push(gameData.list[idx].ga_code);
  }

  return tempList;
});

const seletedSlotCategoryList = computed(() => {
  let categoryList = undefined;

  for(let idx in gameData.slotGameList)
  {
    let item = gameData.slotGameList[idx];

    if(item.provider == selectedSlotCompany.value)
    {
      if(item.category.includes('Fishing') ) {
        let filtered = undefined;
        filtered = item.category.filter((element) => element !== 'Fishing');
        categoryList =  filtered;
      }
      else if(item.category.includes('Casino') ) {
        let filtered = undefined;
        filtered = item.category.filter((element) => element !== 'Casino');
        categoryList =  filtered;
      }
      else {
        categoryList = item.category;
      }
    }
  }
  return categoryList;
});

const seletedSlotGameList = computed(() => {
  let tempList = [];
  let apiRoot = undefined;
  let providerLogo = undefined;

  let gameList = undefined;

  for(let idx in gameData.slotGameList)
  {
    let item = gameData.slotGameList[idx];

    if(item.provider == selectedSlotCompany.value)
    {
      gameList = item.data;
      apiRoot = item.apiRoot;
      providerLogo = item.provider_logo;
    }
  }

  for(let idx in gameList)
  {
    let item = gameList[idx];

    if((apiRoot == 'SLD' && item.category == seletedSlotCategoryList.value[selectedSlotCategory.value]) || apiRoot == 'SCI')
    {
      if(searchSlotText.value != undefined && searchSlotText.value.length > 0 )
      {
        if(apiRoot != undefined && item.apiRoot != undefined) {
          let itemTitle = item.apiRoot == 'SLD' ? item.game_title : item.gametitle;
          let itemName = item.apiRoot == 'SLD' ? item.game_name.toLowerCase() : item.gamename.toLowerCase();
          let searchText = searchSlotText.value.toLowerCase();
          if (itemName.includes(searchText) || itemTitle.includes(searchText)) {
            item['apiRoot'] = apiRoot;
            item['provider_logo'] = providerLogo;
            tempList.push(item);
          }
        }
      }
      else
      {
        item['apiRoot'] = apiRoot;
        item['provider_logo'] = providerLogo;
        tempList.push(item);
      }
    }
  }

  return tempList;

});

const seletedSlotGameList_Mobile = computed(() => {
  let tempList = [];
  let apiRoot = undefined;
  let providerLogo = undefined;

  let gameList = undefined;

  for(let idx in gameData.slotGameList)
  {
    let item = gameData.slotGameList[idx];

    if(item.provider == selectedSlotCompany.value)
    {
      gameList = item.data;
      apiRoot = item.apiRoot;
      providerLogo = item.provider_logo;
    }
  }

  for(let idx in gameList)
  {
    let item = gameList[idx];

    if((apiRoot == 'SLD' && item.category == seletedSlotCategoryList.value[selectedSlotCategory.value]) || apiRoot == 'SCI')
    {
      if(searchSlotText.value != undefined && searchSlotText.value.length > 0 )
      {
        let itemTitle = item.apiRoot == 'SLD' ? item.game_title : item.gametitle;
        if(item.apiRoot != undefined){
          let itemName = item.apiRoot == 'SLD' ? item.game_name.toLowerCase() : item.gamename.toLowerCase();
          let searchText = searchSlotText.value.toLowerCase();
          if(itemName.includes(searchText) || itemTitle.includes(searchText))
          {
            item['apiRoot'] = apiRoot;
            item['provider_logo'] = providerLogo;
            tempList.push(item);
          }
        }
      }
      else
      {
        item['apiRoot'] = apiRoot;
        item['provider_logo'] = providerLogo;
        tempList.push(item);
      }
    }
  }

  return tempList;
});

onMounted( () => {
  selectedCategory.value = props.modalType;
  selectedSlotCompany.value = 1001;
  selectedSlotCompanyLogo.value = undefined;
  //selectedSlotCompany.value = gameData.slotCityCompanyList[0].provider_id;
  //selectedSlotCompanyLogo.value = gameData.slotCityCompanyList[0].provider_logo;
});

const getIcon = (idx) => {
  if(i18n.value.locale == 'ko')
  {
    if (selectedCategory.value == 'liveCasino')
      return require("@/assets/gameBanner/gameBanner4_" + (idx) + ".png");
    else if(selectedCategory.value == 'slotGame')
      return require("@/assets/slotGameBanner/slot_banner_" + (idx) + ".png");
    else if(selectedCategory.value == 'miniGame')
      return require("@/assets/gameBanner/gameBanner3_" + (idx + 1) + ".png");
  }
  else {
    if (selectedCategory.value == 'liveCasino')
      return require("@/assets/gameBanner/gameBanner1_" + (idx) + ".png");
    else if(selectedCategory.value == 'slotGame')
      return require("@/assets/slotGameBanner/slot_banner_" + (idx) + ".png");
    else if(selectedCategory.value == 'miniGame')
      return require("@/assets/gameBanner/gameBanner3_" + (idx + 1) + ".png");
  }
}

const emits = defineEmits(['hide']);

const hide = () => {
  emits('hide');
}

const clickCategory = (key) => {
  selectedCategory.value = key;
}

const clickSlotCompany = (provider_id, provider_logo) => {
  selectedSlotCompany.value = provider_id;
  selectedSlotCompanyLogo.value = provider_logo;
  selectedSlotCategory.value = 0;
}

const clickSlotCategory = (idx) => {
  selectedSlotCategory.value = idx;
}

const getLoadingStatus = (menu) => {
  //console.log(isLoading.value);
  let isEnable = false;

  if (enableGameMenu.value.includes(menu.gameCode)) {
    isEnable = isLoading.value;
  }

  return isEnable;

}

const timer = ref(undefined)

const clickGame = async (menu, idx) => {
  isLoading.value = true;
  selectedIdx.value = idx;

  if (store.getters["user/getSessionId"] == undefined) {
    let loginInfo = getCookie("CID");
    if (loginInfo) {
      try {
        await loginFn.login(loginInfo);
      } catch (e) {
        console.error(e);
        return;
      }
    }
    else {
      console.error('no loinged');
      return;
    }
  }

  if (selectedCategory.value == "liveCasino") {
    if (menu.api.length <= 0) {
      isLoading.value = false;
      return;
    }
    //console.log('click');

    let domain;

    if (process.env.NODE_ENV == "development") {
      domain = location.origin;
    } else {
      domain = process.env.VUE_APP_META_API_URL;
      //domain = location.origin + ":20001";
    }

    const res = await fetch(`${domain}/game/${menu.api}`, {
      credentials: "include",
      method: "GET",
    }).then((res) => res.text());

    if(res == '로그인 세션 없음.') {
      await LoginFn.logout(true);

      notify({
        title: t('notice'),
        text: '로그인 정보가 없습니다.',
        type: 'error', // success warn error  default
      });

      setTimeout(function() {
        themeUtils.refresh();
      }, 2000);

      return;
    }

    let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
    let res2 = res.replace(/['"]+/g, "");

    //if (res2?.length > 0 && selectedIdx.value != idx) {
    //  windowObject.value = !route.meta.isMobile ? window.open(res2, "huniz", config) : window.open(res2, "huniz");
    //}
    if(!route.meta.isMobile) {
      window.open(res2, "huniz", config);
    }
    else {
      window.open(res2, "huniz");
    }


  } else if (selectedCategory.value == "slotGame") {
    let domain;
    let gameCode;

    if (process.env.NODE_ENV == "development") {
      domain = location.origin;
    } else {
      domain = location.origin + ":20001";
    }

    if (menu.apiRoot == "SLD") {
      gameCode = `${menu.apiRoot}_${menu.id}/play`;
      //console.log(gameCode);
    } else if (menu.apiRoot == "SCI") {
      gameCode = `${menu.apiRoot}_${menu.provider_id}_${menu.gamesymbol}/play`;
      //console.log(menu.apiRoot);
      //console.log(menu.provider_id);
      //console.log(menu.gamesymbol);
      //console.log(gameCode);
    }

    const res = await fetch(`${domain}/game/${gameCode}`, {
      credentials: "include",
      method: "GET",
    }).then((res) => res.text());

    if(res == '로그인 세션 없음.') {
      await LoginFn.logout(true);

      notify({
        title: t('notice'),
        text: '로그인 정보가 없습니다.',
        type: 'error', // success warn error  default
      });

      setTimeout(function() {
        themeUtils.refresh();
      }, 2000);

      return;
    }

    let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";

    let res2 = res.replace(/['"]+/g, "");

    if (res2?.length > 0) {
      if (!route.meta.isMobile) {
        window.open(res2, "huniz", config);
      } else {
        window.open(res2, "huniz");
      }
    }
  }
  isLoading.value = false;
  selectedIdx.value = -1;
};


const getSlotGameName = (menu) => {
  if(menu.apiRoot == "SLD")
  {
    if(i18n.value.locale == 'ko')
      return menu?.game_title;
    else
      return menu?.game_name;
  }
  else if(menu.apiRoot == "SCI")
  {
    if(i18n.value.locale == 'ko')
      return menu?.gametitle;
    else
      return menu?.gamename;
  }

}

const errorImg = (menu) => {
  if(menu.apiRoot == 'SLD')
    menu.game_image = menu.provider_logo;
  else
    menu.gameimage = menu.provider_logo;
}

</script>
<style>
.gameSelectWrap2 .logoWrap {
  height: 68px;
  width: 1114px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/gameModal/logo_box.png");
  background-size: cover;
}
.gameSelectWrap2 .logoInnerWrap {
  height: 66px;
  width: 1112px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/gameModal/logo_innerbox.png");
  background-size: cover;
}
.gameSelectWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.gameSelectWrap2 .gameSelectFormWrap {
  position: relative;
  width: 100%;
  height: calc(100% - 68px);
  margin: 0 auto;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
.gameSelectWrap2 .gameSelectInnerFormWrap {
  width: 1112px;
  position: relative;
  height: calc(100% - 2px);
  margin: 0 auto;
  background-color: #010509;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
}
.gameSelectWrap2 .gameSelectSelectTitle{
  background-image: linear-gradient(to top, rgba(199, 199, 199, 1), rgba(255, 255, 255, 1), #97a7b3), linear-gradient(to top, #22dcfd, #1c91e2, #5865b9), linear-gradient(to bottom, #d3ba8f, #d3ba8f);
  font-size: 18px;
  font-weight: bold;
  color: #d3ba8f;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 15px;
}

.gameSelectWrap2 .gameSelectButton{
  position: relative;
  width: 262px;
  height: 146px;
  object-fit: contain;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to top, #2684b5, #1c91e2, #5865b9);
  border-image-slice: 1;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.gameSelectWrap2 .gameSelectButton.disable{
  opacity: 0.5;
  cursor: not-allowed;
}

.gameSelectWrap2 .gameSelectButton.liveCasino{
  width: 262px;
  height: 146px;

  overflow:hidden;
}


.gameSelectWrap2 .gameSelectButton.liveCasino:hover .thumnail {

  transform: scale(1.2);
  transition: 0.4s;
}

.gameSelectWrap2 .gameSelectButton.slotGame{
  width: 170px;
  height: 142px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  position: relative;
  overflow:hidden;
}

.gameSelectWrap2 .gameSelectButton.slotGame span{
  width: 100%;
  height: 30px;
  background-color: #051a2c;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: "----";
}

.gameSelectWrap2 .gameSelectButton:hover .thumnail{
  /*overflow: visible;*/
  transform: scale(1.2);
  transition: 0.4s;
}

.gameSelectWrap2 .gameSelectButton {
  display: flex;
  flex: 0 0 auto;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.3s;
  font-size: 2.5rem;
  font-weight:bold;
  color: #9D9993;
}

.gameSelectWrap2 .gameSelectButton:hover .thumtext {
  animation: textLoop 5s linear infinite;
  padding-right: 1.4881vw;
  /*animation-play-state: paused;*/
  cursor: pointer;
}
.gameSelectWrap2  .thumtext {
  /*animation: textLoop 5s linear infinite;
  padding-right: 1.4881vw;*/
  animation-play-state: paused;
}

@keyframes textLoop {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-70%, 0, 0);
    transform: translate3d(-70%, 0, 0);
  }
}

.gameSelectWrap2 .gameSelectButton.miniGame{
  width: 170px;
  height: 170px;
}

.gameSelectWrap2 .gameSelectButtonGroup{
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: start;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  gap: 10px;
  column-gap: 10px;
  margin-bottom: 20px;
}

.gameSelectWrap2 .gameSelectButtonGroup.liveCasino{
  padding-left: 10px;
  padding-right: 10px;
}

.gameSelectWrap2 .gameSelectButtonGroup.slotGame, .gameSelectWrap2 .gameSelectButtonGroup.miniGame{
  padding-left: 15px;
  padding-right: 15px;
}

.gameSelectWrap2 .gameSelectButtonGroup.mobile{
  display: none;
}

.gameSelectWrap2 .gameCategoryGroup{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.gameSelectWrap2 .gameCategoryButton{
  width: 161px;
  height: 41px;
  background-image: linear-gradient(to bottom, #0678b6, #064f8f, #02346e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.gameSelectWrap2 .gameCategoryButton.selected{
  background-image: linear-gradient(to bottom, #00c3fc, #006cd5, #133085), linear-gradient(to bottom, #020a13, #020a13);
}

.gameSelectWrap2 .gameInfo{
  position: relative;
  width: 100%;
  height: 35px;
  bottom: -38%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
}

.gameSelectWrap2 .gameInfo span{
  font-weight: unset;
  color: #a6adbc !important;
}

.gameSelectWrap2 .gamePlayButton{
  width: 106px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #008fe1;
  background-color: #020c15;
  border: 1px solid #184671;
}
.gameSelectWrap2 .gameSelectButton:hover{
  opacity: 1;
}
.gameSelectWrap2 .gameSelectButton.disable:hover{
  animation: none;
  opacity: 0.5;
}

.gameSelectWrap2 .slotGameCompanyButtonGroup{
  width: 93%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 10px;
}

.gameSelectWrap2 .slotGameCompanyButtonGroup.mobile{
  display: none;
  flex-wrap: nowrap;
}

.gameSelectWrap2 .slotGameCompanyButton{
  font-size: 12px;
  width: 138px;
  height: 50px;
  line-height: 100%;
  box-shadow: 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0 0 0 1px #606060;
  background-image: linear-gradient(to bottom, #434343, #1c1c1c), linear-gradient(to bottom, #2d2d2d, #2d2d2d);
  display: flex;
  justify-content: center;
  align-items: center;
}

.gameSelectWrap2 .slotGameCompanyButton.disable{
  opacity: 0.5;
  cursor: not-allowed;
}

.gameSelectWrap2 .slotGameCompanyButton img{
  height: 88%;
}

.gameSelectWrap2 .slotGameCompanyButton.selected{
  box-shadow: 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0 0 0 1px #519ace;
  background-image: linear-gradient(to bottom, #00c3fc, #0078ec, #1a41b4), linear-gradient(to bottom, #cc001b, #cc001b);
}

.gameSelectWrap2 .slotGameCategoryButtonGroup{
  width: 93%;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  box-shadow: 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0 0 0 1px #606060;
  background-image: linear-gradient(to bottom, #434343, #1c1c1c), linear-gradient(to bottom, #2d2d2d, #2d2d2d);
}

.gameSelectWrap2 .slotGameCategoryButtonGroup.mobile{
  display: none;
}

.gameSelectWrap2 .slotGameCategoryButton{
  font-size: 12px;
  padding: 15px 25px;
  height: 100%;
  line-height: 100%;
}

.gameSelectWrap2 .slotGameCategoryButton.selected{
  box-shadow: 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0 0 0 1px #519ace;
  background-image: linear-gradient(to bottom, #00c3fc, #0078ec, #1a41b4), linear-gradient(to bottom, #cc001b, #cc001b);
}

.gameSelectWrap2 .gameSearchGroup{
  width: 200px;
  height: 90%;
  font-size: 12px;
  border: solid 0 #000;
  background-color: #020c15;
  margin-left: auto;
  margin-right: 2px;
  display: flex;
  justify-content: start;
  align-content: center;
  flex-direction: row;
  gap: 5px;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

@media (max-width: 1024px) {
  .gameSelectWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .gameSelectWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .gameSelectWrap2 .gameSelectFormWrap {
    width: 100%;
    height: calc(100% - 68px);
    overflow-y: auto;
  }
  .gameSelectWrap2 .gameSelectInnerFormWrap {
    position: relative;
    width: calc(100% - 2px);
    height:calc(100% - 2px);
    overflow-y: auto;
  }
  .gameSelectWrap2 .gameSelectButton{
    width: 48%;
  }
  .gameSelectWrap2 .gameSelectButtonGroup{
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    height: unset;
    margin-bottom: 10px;
  }

  .gameSelectWrap2 .gameSelectButtonGroup.slotGame{
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    height: unset;
    margin-bottom: 10px;
  }

  .gameSelectWrap2 .gameSelectButton.slotGame img{
    width: 100% !important;
    height: 100% !important;
  }

  .gameSelectWrap2 .gameSelectButton.slotGame{
    width: 43vw;
    height: calc(26vw + 30px);
  }

  .gameSelectWrap2 .gameCategoryGroup{
    gap: 0px;
    justify-content: space-around;
  }

  .gameSelectWrap2 .gameCategoryButton{
    width: 30%;
  }

  .gameSelectWrap2 .slotGameCompanyButtonGroup.pc{
    display: none;
  }
  .gameSelectWrap2 .slotGameCompanyButtonGroup.mobile{
    display: flex;
    width: 96%;
  }
  .gameSelectWrap2 .slotGameCompanyButton{
    padding: unset;
    width: 120px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gameSelectWrap2 .slotGameCategoryButtonGroup.pc{
    display: none;
  }
  .gameSelectWrap2 .slotGameCategoryButtonGroup.mobile{
    display: flex;
  }

  .gameSelectWrap2 .gameSelectButtonGroup.pc{
    display: none;
  }
  .gameSelectWrap2 .gameSelectButtonGroup.mobile{
    display: flex;
    padding-left: 3.7vw;
    padding-right: 3.7vw;
  }

  .gameSelectWrap2 .gameSearchGroup{
    width: calc(100% - 4px);
  }
}
</style>