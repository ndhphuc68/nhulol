<template>
  <div class="listWrap2" :class="[props.data.flag, props.data.listType]">
    <div v-if="props.data.withButtons" class="buttonWrap">
      <button v-for="(btn, idx) in props.data.withButtons"
              @click="btn.evt(btn.key)"
              :key="idx">{{ t(btn.key) }}</button>
    </div>
    <div class="caption flexCenter">
      <div class="col" v-for="(col, idx) in props.data?.cols" :key="idx">
        {{ t(col.key) }}
      </div>
    </div>
    <div class="rows flexCenter" v-if="data.list.length == 0">
      {{ t('noData') }}<img class="loading" src="@/assets/gif/loading.gif"/>
    </div>
    <div v-if="props.data.flag != 'historyList'">
      <div style="width: 100%; min-height: 350px; display: flex; flex-direction: column;">
        <div class="rows flexCenter hoverEvent" :class="`row${rIdx}`" v-for="(row, rIdx) in selectCols" :key="rIdx" @click.stop="fn.detailView(props.data.flag, row, $event, rIdx)">
          <div class="col" :class="`col${idx}`" v-for="(col, idx) in props.data.cols" :key="idx">
          <span style="color: #a2a5aa;" v-if="col.type == 'btn'">
            <button class="colButton" :class="[`btn${rIdx}`, {'disable' : col.btnTx == 'use' && checkBtnText(col.btnTx, row) != 'use'}]" @click.stop="col.evt(props.data.flag, row, $event, rIdx)">
              {{ t(checkBtnText(col.btnTx, row)) }}
            </button>
          </span>
            <div v-else>
              <span v-if="col.key != 'no'" style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{ getRowData(row, col) || rIdx }}</span>
              <span v-else style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{((curPage - 1) * 7) + (rIdx + 1) }}</span>
            </div>
          </div>
        </div>
        <div class="columns flexCenter hoverEvent" :class="`column${rIdx}`" v-for="(row, rIdx) in selectCols" :key="rIdx" @click.stop="fn.detailView(props.data.flag, row, $event, rIdx, true)">
          <div class="col" :class="`col${idx}`" v-for="(col, idx) in props.data.cols" :key="idx">
            <span v-if="col.type != 'btn'">{{ t(col.key) }}</span>
            <span style="color: #a2a5aa;" v-if="col.type == 'btn'">
            <button class="colButton" :class="[`btn${rIdx}`, {'disable' : col.btnTx == 'use' && checkBtnText(col.btnTx, row) != 'use'}]" @click.stop="col.evt(props.data.flag, row, $event, rIdx, true)">
              {{ t(checkBtnText(col.btnTx, row)) }}
            </button>
          </span>
            <div v-else>
              <span v-if="col.key != 'no'" style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{ getRowData(row, col) || rIdx }}</span>
              <span v-else style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{((curPage - 1) * 7) + (rIdx + 1) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="width: 100%; min-height: 350px; display: flex; flex-direction: column;">
        <div class="rows flexCenter hoverEvent" :class="`row${rIdx}`" v-for="(row, rIdx) in data.list" :key="rIdx" @click.stop="fn.detailView(props.data.flag, row, $event, rIdx)">
          <div class="col" :class="`col${idx}`" v-for="(col, idx) in props.data.cols" :key="idx">
          <span style="color: #a2a5aa;" v-if="col.type == 'btn'">
            <button class="colButton" :class="[`btn${rIdx}`, {'disable' : col.btnTx == 'use' && checkBtnText(col.btnTx, row) != 'use'}]" @click.stop="col.evt(props.data.flag, row, $event, rIdx)">
              {{ t(checkBtnText(col.btnTx, row)) }}
            </button>
          </span>
            <div v-else>
              <span v-if="col.key != 'no'" style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{ getRowData(row, col) || rIdx }}</span>
              <span v-else style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{((curPage - 1) * 15) + (rIdx + 1) }}</span>
            </div>
          </div>
        </div>
        <div class="columns flexCenter hoverEvent" :class="`column${rIdx}`" v-for="(row, rIdx) in data.list" :key="rIdx" @click.stop="fn.detailView(props.data.flag, row, $event, rIdx, true)">
          <div class="col" :class="`col${idx}`" v-for="(col, idx) in props.data.cols" :key="idx">
            <span v-if="col.type != 'btn'">{{ t(col.key) }}</span>
            <span style="color: #a2a5aa;" v-if="col.type == 'btn'">
            <button class="colButton" :class="[`btn${rIdx}`, {'disable' : col.btnTx == 'use' && checkBtnText(col.btnTx, row) != 'use'}]" @click.stop="col.evt(props.data.flag, row, $event, rIdx, true)">
              {{ t(checkBtnText(col.btnTx, row)) }}
            </button>
          </span>
            <div v-else>
              <span v-if="col.key != 'no'" style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{ getRowData(row, col) || rIdx }}</span>
              <span v-else style="color: #a2a5aa;" :class="getStatusColor(row, col)">{{((curPage - 1) * 15) + (rIdx + 1) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagenation">
      <button class="arrowButton" style="margin-top: -2px;" @click.stop = "clickJump(0)" :class="{'disable' : firstPage == 0}">
        <img src="@/assets/modal/icon_arrow_left2.png"/>
      </button>
      <button class="arrowButton" style="margin-top: -2px;" @click.stop = "clickJump(1)" :class="{'disable' : firstPage == 0}">
        <img src="@/assets/modal/icon_arrow_left.png"/>
      </button>
      <div v-if="props.data.flag != 'historyList'" style="display: flex; flex-direction: row">
        <button class="pageButton" v-for="(idx) in getMaxPageCount()" :class="{'selected' : firstPage + idx == curPage}" :key="idx" @click.stop = "clickPage(firstPage + idx)">
          {{firstPage + idx}}
        </button>
      </div>
      <div v-else>
        <button class="pageButton selected">
          {{curPage}}
        </button>
      </div>
      <button class="arrowButton" style="margin-top: -2px;" @click.stop = "clickJump(2)" :class="{'disable' : firstPage == totalPageCount - maxPageCount}">
        <img src="@/assets/modal/icon_arrow_right.png"/>
      </button>
      <button v-if="props.data.flag != 'historyList'" class="arrowButton" style="margin-top: -2px;" @click.stop = "clickJump(3)" :class="{'disable' : firstPage == totalPageCount - maxPageCount}">
        <img src="@/assets/modal/icon_arrow_right2.png"/>
      </button>
    </div>
  </div>
</template>
<script setup>
import {onBeforeMount, onBeforeUnmount, ref, computed, defineAsyncComponent} from 'vue';
import { data, fn } from '@/views/list/list.js'
import moment from 'moment';
import moment_tz from 'moment-timezone'

import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { utils } from '@/utils/common';
import {fn as transactionFn} from "@/views/transaction/transaction";
import {notify} from "@kyvg/vue3-notification";

const store = useStore();
const { t } = useI18n();
const props = defineProps(['data']);

const totalPageCount = computed(() => {
  return Math.ceil(data.list.length / 7);
});
const selectCols = computed(() => {
  let firstIdx =  7 * (curPage.value - 1);
  let endIDx = firstIdx + 7;
  return data.list.slice(firstIdx, endIDx);
});

const firstPage = ref(0);
const maxPageCount = ref(5);
const curPage = ref(1);
const totalCnt = ref(7);
let intervalList;

onBeforeMount(async () => {
  data.selectedFlag = props.data.flag;

  data.list = [];

  if(props.data.flag != 'historyList')
    await fn.getList(props.data.flag);
  else
  {
    await fn.getHistoryList(props.data.flag, 0);
  }

  clearInterval(intervalList);

  if(props.data.flag != 'historyList')
  {
    intervalList = setInterval(async () => {
      await fn.getList(props.data.flag);
    }, 5000);
  }
  else
  {
    intervalList = setInterval(async () => {
      await fn.getHistoryList(props.data.flag, curPage.value - 1);
    }, 5000);
  }

});
onBeforeUnmount(() => {
  data.selectedFlag = '';
  data.list = [];
  clearInterval(intervalList);
})

const getRowData = (row, col) => {
  let tx = '-';
  //console.log(row);
  //console.log(col);
  switch (col.type) {
    case 'string': {
      if(col.key == 'depositRequestUser' || col.key == 'withdrawRequestUser' || col.key == 'title'
              || col.key == 'sender' || col.key == 'publishData' || col.key == 'Baccarat' || col.key == 'gameName'){
        tx = row?.[col.objKey];
      }
      else
      if(row[col.objKey] == undefined){
        tx = row?.[col.objKey];
      }
      else {
        tx = t(row?.[col.objKey]);
      }
      break;
    }

    //case 'date': tx = moment(row[col.objKey] * 1000).format('YYYY-MM-DD HH:mm:ss');
    case 'date': tx = moment(row[col.objKey] * 1000 - (1000 * 60 * 540)).format('YYYY-MM-DD HH:mm:ss');
      if(tx == 'Invalid date' || tx == '1970-01-01 00:00:00')
        tx = '-';
      break;
    case 'number': tx = utils.setNumberFormat(String(row[col.objKey]));
      break;
    case 'status': tx = row[col.objKey] == 0 ? t(col.statusTx[0]) : t(col.statusTx[1]);
      break;
    case 'check': tx = row['mm_read_date'] > 0 ? t('check') : t('notCheck');
      break;
    default: tx = row[col.objKey];
  }
  return tx;
}

const getStatusColor = (row, col) => {
  let cls = '';
  //console.log(row);
  //console.log(col);
  if(col.key == 'status' && col?.type == "status"){
    cls = row[col.objKey] == 0 ? 'orange' : 'green';
  }
  if(col.key == 'status' && col?.type == "string"){
    //console.log(col.objKey);
    //console.log(row[col.objKey]);

    if(row[col.objKey] == undefined) {
      cls += 'blue';
      return cls;
    }

    let status = row[col.objKey].toLowerCase();

    if(status.indexOf('request') > -1){
      cls += 'blue';
    } else if(status.indexOf('admin_cancel') > -1){
      cls += 'red';
    } else if(status.indexOf('process')){
      cls += 'orange';
    } else {
      cls += 'green';
    }
  }

  return cls;
}

const getMaxPageCount = () => {
  if(totalPageCount.value < 5)
  {
    return totalPageCount.value;
  }
  else
  {
    return maxPageCount.value;
  }
}

const clickPage = (idx) => {
  if(curPage.value == idx)
    return;

  curPage.value = idx;
}

const clickJump = async (idx) => {
  if(idx == 0) // 맨 처음으로
  {
    if(props.data.flag != 'historyList')
    {
      if(firstPage.value == 0)
      {
        curPage.value = firstPage.value + 1;
        return;
      }

      firstPage.value = 0;
      curPage.value = firstPage.value + 1;
      maxPageCount.value = 5;
    }
    else
    {
      if(curPage.value > 1)
      {
        curPage.value = 1;
        fn.getHistoryList(props.data.flag, curPage.value - 1);
      }
    }
  }
  else if(idx == 1) // 5페이지 앞으로
  {
    if(props.data.flag != 'historyList')
    {
      if(firstPage.value == 0)
      {
        curPage.value = firstPage.value + 1;
        return;
      }

      firstPage.value = firstPage.value - 5;
      curPage.value = firstPage.value + 1;
      maxPageCount.value = 5;
    }
    else
    {
      if(curPage.value > 1)
      {
        curPage.value -= 1;
        fn.getHistoryList(props.data.flag, curPage.value - 1);
      }
    }
  }
  else if(idx == 2) // 5페이지 뒤로
  {
    if(props.data.flag != 'historyList')
    {
      if(getMaxPageCount() < 5)
      {
        curPage.value = getMaxPageCount();
        return;
      }

      if(firstPage.value == totalPageCount.value - getMaxPageCount())
        return;

      firstPage.value = firstPage.value + 5;
      curPage.value = firstPage.value + 1;
      if(totalPageCount.value - firstPage.value < 5)
        maxPageCount.value = totalPageCount.value - firstPage.value;
      else
        maxPageCount.value = 5;
    }
    else
    {
      curPage.value += 1;
      let resLength = await fn.getHistoryList(props.data.flag, curPage.value - 1);

      if(resLength <= 0)
      {
        curPage.value -= 1;

        notify({
          title: t('notice'),
          text: t('historyLastPage'),
          type: 'warn', // success warn error  default
        });
      }
    }
  }
  else if(idx == 3) // 맨 끝으로
  {
    if(getMaxPageCount() < 5)
    {
      curPage.value = getMaxPageCount();
      return;
    }

    if(firstPage.value == totalPageCount.value - getMaxPageCount())
      return;

    maxPageCount.value = totalPageCount.value % 5;
    firstPage.value = totalPageCount.value - maxPageCount.value;
    curPage.value = totalPageCount.value;
  }
}

const checkBtnText = (btnTx, row) => {
  if(btnTx == 'use' && props.data.flag == 'couponList')
  {
    if(Date.now() > row.mc_end_date * 1000 && row.mc_use_date == 0)
    {
      return 'expiration';
    }
    else if(row.mc_use_date > 0)
    {
      return 'notAvailable'
    }
    else
    {
      return 'use';
    }
  }
  else
  {
    return btnTx;
  }
}



</script>
<style>
.listWrap2 {
  height: calc(100% - 50px);
  padding: 20px;
  overflow-y: auto;
}
.listWrap2.historyList {
  height: calc(100% - 60px);
  padding: 0px 5px;
  overflow-y: auto;
}
.listWrap2 .caption {
  justify-content: start;
}
.listWrap2.community .caption {
  justify-content: start;
}
.listWrap2 .rows {
  color: #a2a5aa;
  font-size: 12px;
  line-height: 12px;
  border-bottom: 1px solid #2d2d2d;
  justify-content: start;
  gap: 0px;
  transition: all 0.5s cubic-bezier(.36,-0.64,.34,1.76);
  cursor: pointer;
  padding-top: 2px;
  padding-bottom: 5px;
}
.listWrap2 .columns {
  display: none;
}
.listWrap2 .caption .col {
  color: #ffffff;
  font-size: 14px;
}
.listWrap2.community .caption .col:first-child, .listWrap2.community .rows div:first-child {
  width: 102px;
}
.listWrap2.community .caption .col:nth-child(2), .listWrap2.community .rows div:nth-child(2) {
  width: 250px;
  text-align: start;
}
.listWrap2.community .caption .col:last-child, .listWrap2.community .rows div:last-child {
  width: 102px;
}
.listWrap2.community .caption div, .listWrap2.community .rows div {
  text-align: center;
}

.listWrap2 .colButton{
  color: #00ccfc;
}
.listWrap2 .colButton.disable{
  color: #a2a5aa;
}

.listWrap2 .detailView {
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #a2a5aa;
  border-bottom: 1px solid #2d2d2d;
  white-space: pre-line;
}
.listWrap2 .detailView p {
  color: #a2a5aa;
}
.listWrap2 .buttonWrap {
  float: right;
}
.listWrap2 .loading {
  position: absolute;
  margin-left: 230px;
}
.listWrap2 .pagenation{
  width: 100%;
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.listWrap2 .arrowButton{
  width: 35px;
  height: 31px;
  background-image: url("../../assets/modal/modal_arrow_box.png");
  display: flex;
  justify-content: center;
  align-items: center;
}
.listWrap2 .pageButton{
  width: 35px;
  height: 31px;
  background-image: url("../../assets/modal/modal_arrow_box.png");
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
}

.listWrap2 .pageButton.selected{
  background-image: url("../../assets/modal/modal_page_box.png");
}

.listWrap2 .caption{
  background-image: unset;
  background-color: #2d2d2d;
}

.listWrap2 .buttonWrap button{
  width: 140px;
  height: 40px;
  background-image: url("../../assets/box/blueInputBox2.png");
  background-size: 100% 100%;
  margin-bottom: 10px;
}

.listWrap2 .caption .col, .listWrap2 .rows .col{
  display: flex;
  justify-content: center;
  align-items: center;
}

.listWrap2.couponList .caption .col:nth-child(1), .listWrap2.couponList .rows .col:nth-child(1){
  width: 5%;
}
.listWrap2.couponList .caption .col:nth-child(2), .listWrap2.couponList .rows .col:nth-child(2){
  width: 10%;
}
.listWrap2.couponList .caption .col:nth-child(3), .listWrap2.couponList .rows .col:nth-child(3){
  width: 15%;
}
.listWrap2.couponList .caption .col:nth-child(4), .listWrap2.couponList .rows .col:nth-child(4){
  width: 15%;
}
.listWrap2.couponList .caption .col:nth-child(5), .listWrap2.couponList .rows .col:nth-child(5){
  width: 15%;
}
.listWrap2.couponList .caption .col:nth-child(6), .listWrap2.couponList .rows .col:nth-child(6){
  width: 15%;
}
.listWrap2.couponList .caption .col:nth-child(7), .listWrap2.couponList .rows .col:nth-child(7){
  width: 15%;
}
.listWrap2.couponList .caption .col:nth-child(8), .listWrap2.couponList .rows .col:nth-child(8){
  width: 10%;
}

.listWrap2.depositList .caption .col:nth-child(1), .listWrap2.depositList .rows .col:nth-child(1), .listWrap2.withdrawList .caption .col:nth-child(1), .listWrap2.withdrawList .rows .col:nth-child(1){
  width: 10%;
}
.listWrap2.depositList .caption .col:nth-child(2), .listWrap2.depositList .rows .col:nth-child(2), .listWrap2.withdrawList .caption .col:nth-child(2), .listWrap2.withdrawList .rows .col:nth-child(2){
  width: 20%;
}
.listWrap2.depositList .caption .col:nth-child(3), .listWrap2.depositList .rows .col:nth-child(3), .listWrap2.withdrawList .caption .col:nth-child(3), .listWrap2.withdrawList .rows .col:nth-child(3){
  width: 30%;
}
.listWrap2.depositList .caption .col:nth-child(4), .listWrap2.depositList .rows .col:nth-child(4), .listWrap2.withdrawList .caption .col:nth-child(4), .listWrap2.withdrawList .rows .col:nth-child(4){
  width: 10%;
}
.listWrap2.depositList .caption .col:nth-child(5), .listWrap2.depositList .rows .col:nth-child(5), .listWrap2.withdrawList .caption .col:nth-child(5), .listWrap2.withdrawList .rows .col:nth-child(5){
  width: 15%;
}
.listWrap2.depositList .caption .col:nth-child(6), .listWrap2.depositList .rows .col:nth-child(6), .listWrap2.withdrawList .caption .col:nth-child(6), .listWrap2.withdrawList .rows .col:nth-child(6){
  width: 15%;
}

.listWrap2.helpList .caption .col:nth-child(1), .listWrap2.helpList .rows .col:nth-child(1){
  width: 10%;
}
.listWrap2.helpList .caption .col:nth-child(2), .listWrap2.helpList .rows .col:nth-child(2){
  width: 40%;
  white-space: pre-line;
}
.listWrap2.helpList .caption .col:nth-child(3), .listWrap2.helpList .rows .col:nth-child(3){
  width: 20%;
}
.listWrap2.helpList .caption .col:nth-child(4), .listWrap2.helpList .rows .col:nth-child(4){
  width: 10%;
}
.listWrap2.helpList .caption .col:nth-child(5), .listWrap2.helpList .rows .col:nth-child(5){
  width: 20%;
}

.listWrap2.letterList .caption .col:nth-child(1), .listWrap2.letterList .rows .col:nth-child(1){
  width: 10%;
}
.listWrap2.letterList .caption .col:nth-child(2), .listWrap2.letterList .rows .col:nth-child(2){
  width: 10%;
}
.listWrap2.letterList .caption .col:nth-child(3), .listWrap2.letterList .rows .col:nth-child(3){
  width: 40%;
  white-space: pre-line;
}
.listWrap2.letterList .caption .col:nth-child(4), .listWrap2.letterList .rows .col:nth-child(4){
  width: 20%;
}
.listWrap2.letterList .caption .col:nth-child(5), .listWrap2.letterList .rows .col:nth-child(5){
  width: 10%;
}
.listWrap2.letterList .caption .col:nth-child(6), .listWrap2.letterList .rows .col:nth-child(6){
  width: 10%;
}

.listWrap2.historyList .caption .col:nth-child(1), .listWrap2.historyList .rows .col:nth-child(1){
  width: 5%;
}
.listWrap2.historyList .caption .col:nth-child(2), .listWrap2.historyList .rows .col:nth-child(2){
  width: 10%;
}
.listWrap2.historyList .caption .col:nth-child(3), .listWrap2.historyList .rows .col:nth-child(3){
  width: 15%;
}
.listWrap2.historyList .caption .col:nth-child(4), .listWrap2.historyList .rows .col:nth-child(4){
  width: 15%;
}
.listWrap2.historyList .caption .col:nth-child(5), .listWrap2.historyList .rows .col:nth-child(5){
  width: 15%;
}
.listWrap2.historyList .caption .col:nth-child(6), .listWrap2.historyList .rows .col:nth-child(6){
  width: 15%;
}
.listWrap2.historyList .caption .col:nth-child(7), .listWrap2.historyList .rows .col:nth-child(7){
  width: 15%;
}
.listWrap2.historyList .caption .col:nth-child(8), .listWrap2.historyList .rows .col:nth-child(8){
  width: 10%;
}

.red {
  color: red;
}
.blue {
  color: cyan;
}
.green {
  color: green;
}
.orange {
  color: orange;
}

@media (max-width: 1024px) {
  .listWrap2 {
    height: calc(100% - 100px);
  }

  .listWrap2 .buttonWrap button{
    width: 100px;
    height: 30px;
  }

  .listWrap2 .caption{
    display: none;
  }

  .listWrap2 .rows{
    display: none;
  }
  .listWrap2 .columns{
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #a2a5aa;
    font-size: 14px;
    line-height: 14px;
    border-bottom: 1px solid #2d2d2d;
    align-items: start;
    justify-content: center;
    transition: all 0.5s cubic-bezier(.36,-0.64,.34,1.76);
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .listWrap2 .columns .col{
    display: flex;
    gap: 10px;
    min-height: 20px;
    white-space: pre-line;
  }
}
</style>