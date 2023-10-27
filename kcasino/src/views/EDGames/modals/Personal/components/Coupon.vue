<template>
  <div class="deposit-history">
    <v-table class="table">
      <thead class="table-header">
      <tr>
        <th class="text-center" v-for="(item,index) in columnsCoupon" :key="index">
          {{ $t(item) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          class="data-row"
          v-for="(item, index) in dataCoupon"
          :key="index"
      >
        <td>{{ index+1 }}</td>
        <td class="user-name" >{{ item.title }}</td>
        <td class="amount" >{{ item.code }}</td>
        <td><span class="status" :class="item.state"> {{ item.state }} </span></td>
        <td> {{ converTime(item.duration) }}</td>
        <td class="action">
          <button :ref="setPopupRef(index)" @click="handleViewAction(index)">...</button>
          <div class="action-group" v-show="indexShowAction === index">
            <button class="action-item">{{ $t("viewdetails") }}</button>
            <button class="action-item">{{ $t("delete") }}</button>
          </div>
          </td>
      </tr>
      </tbody>
    </v-table>

<!--    table moble-->

    <div class="table-mobile">
      <div class ="card-item" v-for="(row, index) in dataCoupon" :key="row.id">
        <div class="mobile-column">
          <template  v-for="(item, indexColum) in columnsCoupon"   :key="indexColum" >
            <div class="column-css text-left" v-if="item !== 'Action'"> {{indexColum != 0? $t(item) :  "no."+ index +1 }} </div>
          </template>
        </div>
        <div class="mobile-row">
          <div class="action">
            <button :ref="setPopupRefMobile(index)" @click="handleViewAction(index)">...</button>
            <div class="action-group" v-show="indexShowAction === index">
              <button class="action-item">{{ $t("viewdetails") }}</button>
              <button class="action-item">{{ $t("delete") }}</button>
            </div>
          </div>
          <div class="user-name" >{{ row.title }}</div>
          <div class="amount" >{{ row.code }}</div>
          <div><span class="status" :class="row.state"> {{ row.state }} </span></div>
          <div> {{ converTime(row.duration) }}</div>
        </div>
      </div>
    </div>
    <div class="paging">
      <button class="button-next" >
        <img alt="img" src="@/assets/icon/arrow-letf.png"/>
        <p>{{'previous'}}</p>

      </button>
      <div>
        <button class="number-page active"> 1</button>
        <button class="number-page "> 2</button>
        <button class="number-page "> 3</button>
        <button class="number-page "> ...</button>
        <button class="number-page "> 8</button>
        <button class="number-page "> 9</button>
        <button class="number-page "> 10</button>
      </div>
      <button class="button-next">
        <img alt="img" src="@/assets/icon/arrow-icon.png"/>
        <p>{{'next'}}</p>
      </button>
    </div>
  </div>

</template>
<script setup>
// import { onMounted, onUnmounted, ref} from 'vue'
import { dataCoupon, columnsCoupon} from '../data'
import {useStore} from 'vuex'
import {converTime,mixin} from "@/utils";

// const store = useStore()
const { setPopupRef, setPopupRefMobile, indexShowAction } = mixin();

const handleViewAction = (index)=>{
  if(  indexShowAction.value === index)  indexShowAction.value = -1;
  else  indexShowAction.value = index;
}

</script>
<style scoped>
.action {
  position: relative;
}
.column-css {
  /*position: relative;*/
  /*position: absolute;*/
  width: 100%;
}
.column-css:nth-child(1)::after {
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 30%;
  background-color: rgba(0,0,0,0.03);
  opacity: 0.8;
  border-radius: 4px;
  position: absolute;
}
.action button {
  padding: 5px 10px;
}
.action-group {
  right: 0;
  display: flex;
  position: absolute;
  background: #FAFAFA;
  border: 1px solid #52525B;
  border-radius: 8px;
  bottom: 25px;
}
.action-item {
  font-style: normal;
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
  color: var(--text);
}
.deposit-history {
  width: 100%;
}

.data-row td {
  color: var(--text-second);
}

.table-header {
  background: #F7F7F9;
}

.table-header th {
  color: var(--text-second) !important;
}

.number-page {
  width: 40px;
  height: 40px;
  color: var(--text-second);
  border-radius: 8px;
}

.paging {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #EAECF0;
}

.paging img {
  width: 20px;
  height: 20px;
}

.paging .button-next {
  width: 113px;
  height: 36px;
  background: var(--bg);
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-next p {
  color: var(--text);
  margin-left: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}

.number-page.active {
  background-color: var(--primary-light);
  color: var(--primary);
}
th {
  text-align: center;

}
td {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
}
.user-name {
  font-weight: normal;
  color: var(--text);
}
.status {
  padding: 6px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  border-radius: 45px;
  text-transform: capitalize;
}
.amount {
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
  line-height: 22px
}
.status.available {
  background: #F0FDF4;
  color: #15803D;
}
.status.PENDING {
  background:  #FFFBEB;
  color: #B45309;
}
.status.unavailable {
  background: #FEF2F2;
  color: #B91C1C;
}

.table-mobile {
  display: none;
}
@media (max-width: 1024px) {
  .table {
    display: none;
  }

  .table-mobile {
    display: block;
  }

  .mobile-column {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mobile-row {
    text-align: right !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-item {
    display: flex;
    position: relative;
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #E4E4E7;
    border-radius: 5px;
    justify-content: space-between;
  }

  .mobile-column div {
    padding: 8px;

  }

  .mobile-row div {
    padding: 8px;

  }
  .paging {
    display: none;
  }

}
</style>