<template>
  <div class="guideModalWrap2" :class="{ 'mobile': utils.isMobile() }">
    <div class="bgBox" @click.stop="hide()" :class="{ 'loginBg': modals['login'] }"></div>
    <div class="modalBox" :style="props.styles">
      <div class="modalCloseBtn" @click.stop="hide()">
        <img src="@/assets/icon/x-button.png" alt="닫기이미지"/>
      </div>
      <div class="modalHeader" :class="['normal']">
        <div class="modalInerHeader" :class="['normal']">
            <img src="" alt="logo"/>
        </div>
      </div>
      <div class="modalContentsBG">
        <div class="modalContents" :class="[ 'useScroll', 'normal']">
          <div class="modalCategory">
            <div class="modalInnerCategory">
              <div v-for="(tabName, idx) in guideModalMenus" style="display: flex; flex-direction: row; ">
                <button class="category"
                        @click.stop="tabClick(tabName)"
                        :key="idx"
                        :class="[{'on': tabName == selectGameName}, 'normal']">
                <span style="height: 42px; line-height: 42px; font-size: 14px;">
							  		{{ t(tabName) }}
							  </span>
                  <img v-if="tabName == selectGameName" src="@/assets/modal/modal_header_underline.png"/>
                  <div v-else style="width: 100%; height: 2px;"></div>
                </button>
                <img v-if="idx != guideModalMenus.length - 1" src="@/assets/modal/modal_header_line.png">
              </div>
            </div>
          </div>
          <div class="modalInner">
            <div class="guideWrap" style="white-space: pre-line;">

              <div v-if="selectGameName == 'baccarat'">
                <p>{{t('baccarat_rule_1')}}</p><br/>
                <h3>{{t('baccarat_rule_h1')}}</h3>
                <ul>
                  <li>{{t('baccarat_rule_desc1')}}</li>
                </ul>
                <p><img align="absmiddle" src="../../assets/gameRule/bakara_05.png" width="101" height="128"> + <img align="absmiddle" src="../../assets/gameRule/bakara_02.png" width="101" height="128"></p>
                <ul>
                  <li>{{t('baccarat_rule_desc2')}}</li>
                </ul>
                <p><img align="absmiddle" src="../../assets/gameRule/bakara_03.png" width="101" height="128"> + <img align="absmiddle" src="../../assets/gameRule/bakara_04.png" width="101" height="128"> + <img align="absmiddle" src="../../assets/gameRule/bakara_05.png" width="101" height="128"></p><br/>
                <h3>{{t('baccarat_rule_h2')}}</h3>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th width="50%">{{t('baccarat_rule_desc3')}}</th>
                    <th width="50%">{{t('baccarat_rule_desc4')}}</th>
                  </tr>
                  <tr>
                    <td>0, 1, 2, 3, 4, 5</td>
                    <td>{{t('baccarat_rule_desc5')}}</td>
                  </tr>
                  <tr>
                    <td>6, 7</td>
                    <td>{{t('baccarat_rule_desc6')}}</td>
                  </tr>
                  <tr>
                    <td>8, 9</td>
                    <td>{{t('baccarat_rule_desc7')}}</td>
                  </tr>
                  </tbody></table>
                <p>{{t('baccarat_rule_2')}}</p><br/>
                <h3>{{t('baccarat_rule_h3')}}</h3>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th width="50%">{{t('baccarat_rule_desc8')}}</th>
                    <th width="50%">{{t('baccarat_rule_desc9')}}</th>
                  </tr>
                  <tr>
                    <td>0,1,2,3,4,5</td>
                    <td>{{t('baccarat_rule_desc5')}}</td>
                  </tr>
                  <tr>
                    <td>6,7</td>
                    <td>{{t('baccarat_rule_desc6')}}</td>
                  </tr>
                  <tr>
                    <td>8,9</td>
                    <td>{{t('baccarat_rule_desc7')}}</td>
                  </tr>
                  </tbody></table>
                <p>{{t('baccarat_rule_3')}}</p><br/>
                <h3>{{t('baccarat_rule_h4')}}</h3>
                <p><img src="../../assets/gameRule/bakara_06.jpg" width="493" height="360"></p>
                <p>{{t('baccarat_rule_desc10')}}</p>
              </div>

              <div v-if="selectGameName == 'blackjack'">
                <h3>{{t('blackjack_rule_title_1')}}</h3>
                <p>{{t('blackjack_rule_1')}}</p>
                <p>{{t('blackjack_rule_2')}}</p>
                <h3>{{t('blackjack_rule_title_2')}}</h3>
                <ul>
                  <li>{{t('blackjack_rule_list_1_1')}}
                  </li><li>{{t('blackjack_rule_list_1_2')}}
                </li><li>{{t('blackjack_rule_list_1_3')}}
                </li><li>{{t('blackjack_rule_list_1_4')}}
                </li><li>{{t('blackjack_rule_list_1_5')}}
                </li><li>{{t('blackjack_rule_list_1_6')}}
                </li></ul>
                <h3>{{t('blackjack_rule_title_3')}}</h3>
                <ul>
                  <li>{{t('blackjack_rule_list_2_1')}}
                  </li><li>{{t('blackjack_rule_list_2_2')}}
                </li><li>{{t('blackjack_rule_list_2_3')}}
                </li></ul>
                <h3>{{t('blackjack_rule_title_4')}}</h3>
                <ul>
                  <li>{{t('blackjack_rule_list_3_1')}}
                  </li><li>{{t('blackjack_rule_list_3_2')}}
                </li><li>{{t('blackjack_rule_list_3_3')}}
                </li><li>{{t('blackjack_rule_list_3_4')}}
                </li><li>{{t('blackjack_rule_list_3_5')}}
                </li><li>{{t('blackjack_rule_list_3_6')}}
                </li><li>{{t('blackjack_rule_list_3_7')}}
                </li><li>{{t('blackjack_rule_list_3_8')}}
                </li></ul>
                <h3>{{t('blackjack_rule_title_5')}}</h3>
                <p>{{t('blackjack_rule_3')}}</p>
                <h3>{{t('blackjack_rule_title_6')}}</h3>
                <p>{{t('blackjack_rule_4')}}</p>
                <p>{{t('blackjack_rule_5')}}</p>
                <h3>{{t('blackjack_rule_title_7')}}</h3>
                <p>{{t('blackjack_rule_6')}}</p>
                <p>{{t('blackjack_rule_7')}}</p>
                <p>{{t('blackjack_rule_8')}}</p>
              </div>
              <div v-if="selectGameName == 'roulette'">
                <ul>
                  <li>{{t('roulette_rule_list_1')}}</li>
                  <li>{{t('roulette_rule_list_2')}}</li>
                  <li>{{t('roulette_rule_list_3')}}</li>
                </ul>
                <h3>{{t('roulette_rule_title_1')}}</h3>
                <p>{{t('roulette_rule_1')}}</p>
                <p>{{t('roulette_rule_2')}}</p>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th width="50%">{{t('roulette_rule_table_1')}}</th>
                    <th width="50%">{{t('roulette_rule_table_2')}}</th>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_3')}}</th>
                    <td>1:35</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_4')}}</th>
                    <td>1:17</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_5')}}</th>
                    <td>1:11</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_6')}}</th>
                    <td>1:8</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_7')}}</th>
                    <td>1:5</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_8')}}</th>
                    <td>1:2</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_9')}}</th>
                    <td>1:35</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_10')}}</th>
                    <td>1:2</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_11')}}</th>
                    <td rowspan="3">1:2</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_12')}}</th>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_13')}}</th>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_15')}}</th>
                    <td rowspan="3">1:1</td>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_16')}}</th>
                  </tr>
                  <tr>
                    <th>{{t('roulette_rule_table_14')}}</th>
                  </tr>
                  </tbody></table>
              </div>
              <div v-if="selectGameName == 'sicbo'">
                <ul>
                  <li>{{t('sicbo_rule_list_1')}}</li>
                  <li>{{t('sicbo_rule_list_2')}}</li>
                  <li>{{t('sicbo_rule_list_3')}}</li>
                  <li>{{t('sicbo_rule_list_4')}}</li>
                </ul>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th style="width: 20%; !important;">{{t('sicbo_rule_table_1')}}</th>
                    <th style="width: 60%; !important;">{{t('sicbo_rule_table_2')}}</th>
                    <th style="width: 20%; !important;">{{t('sicbo_rule_table_3')}}</th>
                  </tr>
                  <tr>
                    <th colspan="3">{{t('sicbo_rule_table_1_0')}}</th>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_1_1')}}</td>
                    <td>{{t('sicbo_rule_table_1_5')}}</td>
                    <td>1:1</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_1_2')}}</td>
                    <td>{{t('sicbo_rule_table_1_6')}}</td>
                    <td>1:1</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_1_3')}}</td>
                    <td>{{t('sicbo_rule_table_1_7')}}</td>
                    <td>1:1</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_1_4')}}</td>
                    <td>{{t('sicbo_rule_table_1_8')}}</td>
                    <td>1.1</td>
                  </tr>
                  <tr>
                    <td>4 or 17</td>
                    <td>{{t('sicbo_rule_table_1_9')}}</td>
                    <td>1:50</td>
                  </tr>
                  <tr>
                    <td>5 or 16</td>
                    <td>{{t('sicbo_rule_table_1_10')}}</td>
                    <td>1:18</td>
                  </tr>
                  <tr>
                    <td>6 or 15</td>
                    <td>{{t('sicbo_rule_table_1_11')}}</td>
                    <td>1:14</td>
                  </tr>
                  <tr>
                    <td>7 or 14</td>
                    <td>{{t('sicbo_rule_table_1_12')}}</td>
                    <td>1:12</td>
                  </tr>
                  <tr>
                    <td>8 or 13</td>
                    <td>{{t('sicbo_rule_table_1_13')}}</td>
                    <td>1:8</td>
                  </tr>
                  <tr>
                    <td>9, 10, 11 or 12</td>
                    <td>{{t('sicbo_rule_table_1_14')}}</td>
                    <td>1:6</td>
                  </tr>
                  <tr>
                    <th colspan="3">{{t('sicbo_rule_table_2_0')}}</th>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_1')}}</td>
                    <td>{{t('sicbo_rule_table_2_7')}}</td>
                    <td>1:150</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_2')}}</td>
                    <td>{{t('sicbo_rule_table_2_8')}}</td>
                    <td>1:24</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_3')}}</td>
                    <td>{{t('sicbo_rule_table_2_9')}}</td>
                    <td>1:8</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_4')}}</td>
                    <td>{{t('sicbo_rule_table_2_10')}}</td>
                    <td>1:5</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_5')}}</td>
                    <td>{{t('sicbo_rule_table_2_11')}}</td>
                    <td>1:7</td>
                  </tr>
                  <tr>
                    <td rowspan="3">{{t('sicbo_rule_table_2_6')}}</td>
                    <td>{{t('sicbo_rule_table_2_12')}}</td>
                    <td>1:1</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_13')}}</td>
                    <td>1:2</td>
                  </tr>
                  <tr>
                    <td>{{t('sicbo_rule_table_2_14')}}</td>
                    <td>1:3</td>
                  </tr>
                  </tbody></table>
              </div>
              <div v-if="selectGameName == 'dragontiger'">
                <p>{{t('dragontiger_rule_1')}} <br></p>
                  <p><strong>{{t('dragontiger_rule_2')}}</strong></p>
                <p>{{t('dragontiger_rule_3')}}</p>
              </div>
              <div v-if="selectGameName == 'bullfight'">
                <h3>{{t('bullfight_rule_title_1')}}</h3>
                <p>{{t('bullfight_rule_1')}}</p>
                <h3>{{t('bullfight_rule_title_2')}}</h3>
                <ul>
                  <li>{{t('bullfight_rule_list_1_1')}}</li>
                  <li>{{t('bullfight_rule_list_1_2')}}</li>
                  <li>{{t('bullfight_rule_list_1_3')}}</li>
                  <li>{{t('bullfight_rule_list_1_4')}}</li>
                </ul>
                <h3>{{t('bullfight_rule_title_3')}}</h3>
                <ul>
                  <li>{{t('bullfight_rule_list_2_1')}}</li>
                  <li>{{t('bullfight_rule_list_2_2')}}
                    <blockquote>
                      <h4>{{t('bullfight_rule_title_4')}}</h4>
                      <p class="box">{{t('bullfight_rule_list_2_2_1')}}</p>
                      <p class="box">{{t('bullfight_rule_list_2_2_2')}}</p>
                    </blockquote>

                  </li>
                  <li>{{t('bullfight_rule_list_2_3')}}</li>
                </ul>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th colspan="4">{{t('bullfight_rule_table_1_0')}}</th>
                  </tr>
                  <tr>
                    <th colspan="2" width="50%">{{t('bullfight_rule_table_1_1')}}</th>
                    <th colspan="2" width="50%">{{t('bullfight_rule_table_1_2')}}</th>
                  </tr>
                  <tr>
                    <th style="width: 25% !important;">{{t('bullfight_rule_table_1_3')}}</th>
                    <th style="width: 25% !important;">{{t('bullfight_rule_table_1_4')}}</th>
                    <th style="width: 25% !important;">{{t('bullfight_rule_table_1_3')}}</th>
                    <th style="width: 25% !important;">{{t('bullfight_rule_table_1_5')}}</th>
                  </tr>
                  <tr>
                    <td>No Bull ~ Bull6</td>
                    <td>{{t('bullfight_rule_table_1_6')}}</td>
                    <td>No Bull ~ Bull6</td>
                    <td>{{t('bullfight_rule_table_1_9')}}</td>
                  </tr>
                  <tr>
                    <td>Bull7 ~ Bull9</td>
                    <td>{{t('bullfight_rule_table_1_7')}}</td>
                    <td>Bull7 ~ Bull9</td>
                    <td>{{t('bullfight_rule_table_1_10')}}</td>
                  </tr>
                  <tr>
                    <td>BullBull</td>
                    <td>{{t('bullfight_rule_table_1_8')}}</td>
                    <td>BullBull</td>
                    <td>{{t('bullfight_rule_table_1_11')}}</td>
                  </tr>
                  </tbody></table>
                <ul>
                  <li>{{t('bullfight_rule_list_3_1')}}</li>
                  <li>{{t('bullfight_rule_list_3_2')}}</li>
                </ul>
                <p>{{t('bullfight_rule_2')}}</p>
                <table width="100%" border="0" cellpadding="1" cellspacing="1">
                  <tbody><tr>
                    <th colspan="3">{{t('bullfight_rule_table_2_0')}}</th>
                  </tr>
                  <tr>
                    <th style="width: 40% !important;">{{t('bullfight_rule_table_1_3')}}</th>
                    <th style="width: 20% !important;">{{t('bullfight_rule_table_2_1')}}</th>
                    <th style="width: 40% !important;">{{t('bullfight_rule_table_2_2')}}</th>
                  </tr>
                  <tr>
                    <td>{{t('bullfight_rule_table_2_3')}}</td>
                    <td>{{t('bullfight_rule_table_2_4')}}</td>
                    <td rowspan="2">{{t('bullfight_rule_table_2_5')}}</td>
                  </tr>
                  </tbody></table>
              </div>
              <div v-if="selectGameName == 'mahjong'">
                <h3>{{t('mahjong_rule_title_1')}}</h3>
                <p>{{t('mahjong_rule_1')}}</p>
                <ul>
                  <li>{{t('mahjong_rule_list_1_1')}}</li>
                  <li>{{t('mahjong_rule_list_1_2')}}</li>
                  <li>{{t('mahjong_rule_list_1_3')}}</li>
                  <li>{{t('mahjong_rule_list_1_4')}}</li>
                </ul>
                <h3>{{t('mahjong_rule_title_2')}}</h3>
                <p>{{t('mahjong_rule_2')}}</p>
                <ul>
                  <li>{{t('mahjong_rule_list_2_1')}}</li>
                  <li>{{t('mahjong_rule_list_2_2')}}</li>
                  <li>{{t('mahjong_rule_list_2_3')}}
                    <table width="100%" border="0" cellpadding="1" cellspacing="1">
                      <tbody><tr>
                        <th style="width: 15% !important;">{{t('mahjong_rule_table_1')}}</th>
                        <th style="width: 85% !important;">{{t('mahjong_rule_table_2')}}</th>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>{{t('mahjong_rule_table_3')}}</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>{{t('mahjong_rule_table_4')}}</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>{{t('mahjong_rule_table_5')}}</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>{{t('mahjong_rule_table_6')}}</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>{{t('mahjong_rule_table_7')}}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>{{t('mahjong_rule_table_8')}}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>{{t('mahjong_rule_table_9')}}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>{{t('mahjong_rule_table_10')}}</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>{{t('mahjong_rule_table_11')}}</td>
                      </tr>
                      <tr>
                        <td>0</td>
                        <td>{{t('mahjong_rule_table_12')}}</td>
                      </tr>
                      </tbody></table>
                  </li>
                  <li>{{t('mahjong_rule_list_2_4')}}</li>
                </ul>
              </div>
              <div v-if="selectGameName == 'holdem'">
                <h3>{{t('rule')}}</h3>

                <p>{{t('holdemRule')}}</p>

                <h3>{{t('rank')}}</h3>

                <p><img src="../../assets/gameRule/handrank.jpg" width="700" height="408"></p>
                <p>{{t('holdemRank')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { modals, activeModal, toggleShow } from '@/utils/modals';
import { guideModalMenus } from "@/const/menu";
import { useI18n } from "vue-i18n";
import { utils } from "@/utils/common";
import { ref } from "vue";
const { t } = useI18n();
const selectGameName = ref('baccarat');

const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: undefined
  },
});

const hide = () => {
  toggleShow('gameGuide');
}

const tabClick = (key) => {
  selectGameName.value = key;
}
</script>
<style scoped>

.guideModalWrap2 .frameBottomLeft, .guideModalWrap2 .frameBottomRight, .guideModalWrap2 .frameBottomLogo {
  position: absolute;
  z-index: 10;
  bottom: 0px;
}
.guideModalWrap2 .frameBottomRight {
  right: 0;
}
.guideModalWrap2 .frameBottomLogo {
  width: 100%;
  text-align: center;
  margin-bottom: 31px;
}

.guideModalWrap2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}

.guideModalWrap2 .bgBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.guideModalWrap2 .modalBox {
  position: relative;
  width: auto;
  height: auto;
  color: #decb95 !important;
  background-color: black;
  background-size: 100% 100%;
  overflow: hidden;
  z-index: 3;
}

.guideModalWrap2 .modalBox .modalHeader.normal {
  height: 68px;
  width: 1022px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_box.png");
  background-size: cover;
}
.guideModalWrap2 .modalBox .modalInerHeader.normal {
  height: 66px;
  width: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-image: url("../../assets/modal/logo_innerbox_big.png");
  background-size: cover;
}
.guideModalWrap2 .modalBox .modalHeader .title {
  font-size: 14px;
  position: relative;
  top: 3px;
  line-height: 0;
  color: #decb95 !important;
}

.guideModalWrap2 .modalCloseBtn {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 10px;
  right: 15px;
}

.guideModalWrap2 .modalCloseBtn img{
  cursor: pointer;
}

.guideModalWrap2 .modalContentsBG
{
  position: relative;
  width: 100%;
  height: 658px;
  margin: 0 auto;
  background-image: url("../../assets/modal/list_box.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.guideModalWrap2 .modalContents.normal {
  width: 1020px;
  height: 656px;
  margin: 0 auto;
  background-color: black;
  background-size: 100% 100%;
}

.guideModalWrap2 .modalContents .modalCategory {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/modal/modal_header_frame.png");
}
.guideModalWrap2 .modalContents .modalInnerCategory {
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: start;
  align-items: center;
  background-image: url("../../assets/modal/modal_header_innerframe.png");
}
.guideModalWrap2 .modalContents .modalCategory .category.normal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-image: url("../../assets/box/modal-tab-on.png");
  background-size: 100% 100%;
  width: 125px;
  height: 45px;
  gap: 3px;
  transform: scale(0.98);
}
.guideModalWrap2 .modalContents .modalCategory .category.on {
  background-image: url("../../assets/box/modal-tab-off.png");
  background-size: 100% 100%;
}

.guideModalWrap2 .modalContents .modalCategory .category.on span {
  color: #00ccfc !important;
}

.guideModalWrap2 .modalInner {
  width: auto;
  height: calc(100% - 50px);
  overflow-y: auto;
  padding: 10px;
}

.guideModalWrap2 button {
  background: unset !important;
}

.guideModalWrap2 .guideWrap p{
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 150%;
}
.guideModalWrap2 .guideWrap h3{
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  color: #00ccfc;
}
.guideModalWrap2 .guideWrap h4{
  display: block;
  font-size: 1.05em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.guideModalWrap2 .guideWrap ul{
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.guideModalWrap2 .guideWrap li{
  display: list-item;
  text-align: -webkit-match-parent;
}
.guideModalWrap2 .guideWrap table{
  background-color: #0678b6;
}
.guideModalWrap2 table{
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
  border-color: grey;
}
.guideModalWrap2 tbody{
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.guideModalWrap2 tr{
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.guideModalWrap2 .guideWrap th{
  padding: 10px;
  background-color: #064f8f;
  color: #ffffff;
}
.guideModalWrap2 .guideWrap td{
  padding: 5px;
  background-color: #02346e;
  color: #ffffff;
  text-align: center;
}
.guideModalWrap2 th{
  width: 50%;
  display: table-cell;
  vertical-align: inherit;
  font-weight: bold;
  text-align: center;
}
.guideModalWrap2 td{
  display: table-cell;
  vertical-align: inherit;
}

@media (max-width: 1024px) {
  .guideModalWrap2 .modalBox {
    width: 100% !important;
    height: 100% !important;
  }

  .guideModalWrap2 .modalBox .modalHeader.normal {
    height: 68px;
    width: 100%;
  }
  .guideModalWrap2 .modalBox .modalInerHeader.normal {
    height: 66px;
    width: calc(100% - 2px);
  }

  .guideModalWrap2 .modalContentsBG{
    height: calc(100% - 68px);
  }

  .guideModalWrap2 .modalContents.normal {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 0 auto;
    background-color: black;
    background-size: 100% 100%;
  }

  .guideModalWrap2 .modalContents .modalCategory{
    height: 6.25rem;
  }

  .guideModalWrap2 .modalContents .modalInnerCategory{
    flex-wrap: wrap;
    height: 6.125rem;
  }

  .guideModalWrap2 .modalContents .modalInnerCategory div{
    width: 25%;
  }

  .guideModalWrap2 .modalContents .modalCategory .category.normal{
    width: 100%;
  }

  .guideModalWrap2 .modalContents .modalInner{
    height: calc(100% - 100px);
  }
}


</style>