<template>
  <nav class="sidebar" :class="class">
    <img alt="logo"  class="logo" src= "../../assets/logo/sidebar/kcasino.png"/>
    <div class="sidebar-content">
      <div class="sidebar-group menu1">
        <div class="sidebar-item" v-for="item in menus1" :key="item.icon">
          <img class="icon-item" alt="icon" :src="require(`@/assets/icon/sidebar/${item.icon}`)"/>
          <span class="text-item"> {{item.text}} </span>
        </div>
      </div>
      <hr />
      <div  class =" submenu"  :class="{active: openMenu2}">
        <div class="sidebar-group menu2">
          <div class="sidebar-item" v-for="item in menus2" :key="item.icon">
            <img class="icon-item" alt="icon"  :src="require(`@/assets/icon/sidebar/${item.icon}`)"/>
            <span class="text-item"> {{item.text}} </span>
          </div>
        </div>
        <div class="daily-group">
          <div>
            <div class="title-item">
              <h6>Daily Withdraw</h6>
            </div>
            <ul>
              <li class="item-daily" v-for="item in dailyWithdraws" :key="item.id">
                <p class = "item-daily-date"> {{formatDate(item.date)}} </p>
                <p class = "item-daily-name"> {{item.name}} </p>
                <p class = "item-daily-money">  {{item.money}} </p>
              </li>
            </ul>
          </div>
          <div>
            <div class="title-item">
              <h6>Daily Withdraw</h6>
            </div>
            <ul>
              <li class="item-daily"  v-for="item in sailyDeposits" :key="item.id">
                <p class = "item-daily-date"> {{formatDate(item.date)}} </p>
                <p class = "item-daily-name"> {{item.name}} </p>
                <p class = "item-daily-money">  {{item.money}} </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button @click="toggleMenu2" class="toggle-more-menu">
        <img class="icon-item" alt="icon"  src="../../assets/icon/sidebar/menu.png">
      </button>
    </div>
  </nav>
</template>
<script setup>
import {defineProps, ref} from 'vue'
import moment from "moment";

  const props = defineProps({
    class: String,
  });
  const openMenu2 = ref(false)
 import {menus1 ,menus2, dailyWithdraws, sailyDeposits} from '@/utils/menus';

  function toggleMenu2 (){
    openMenu2.value = !openMenu2.value
  }
const formatDate = (dateString) =>{
  const formattedDate = moment(dateString, 'MM/DD/YY').format('MM/DD/YY');
  return formattedDate;
}
</script>
<style>
.sidebar {
  background-color: var(--bg);
  min-width: 241px;
  padding: 10px 20px;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar.horizontal{
  display: flex;
  height: 200px;
  align-items: center;
  max-width: 78.75rem;
  overflow-y: unset;
}
.sidebar.horizontal .sidebar-content{
  display: flex;
  align-items: center;
}
.sidebar.horizontal .sidebar-group.menu1{
  flex-direction: row;
  align-items: flex-start;
}
.sidebar.horizontal .submenu{
  display: none;
}
.sidebar.horizontal .submenu.active{
  display: flex;
  position: absolute;
  top:80px;
  background-color: var(--bg);
  right:0;
  box-shadow: #c2c2c2 1px 4px 0px;
  border-radius: 5px;
  overflow-y: scroll;
  max-height: 70vh;
  min-width: 241px;
  padding: 10px 20px;
}
.daily-group {
  margin : 0 auto;
  width: 100%;
}
.toggle-more-menu{
  display: none;
}
.sidebar.horizontal .toggle-more-menu{
  display: block;

 }
.sidebar.horizontal hr{
  display: none;
}

.sidebar .logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 193px;
  height: 48px;
  left: 24px;
  top: 24px;
  margin: 0 auto;

}
.sidebar-content{
  margin-top: 24px;
  position: relative;
}
.sidebar .icon-item {
  width: 24px;
  height: 24px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 5px;
}
.title-item {
  width: 100%;
  background-color: #CC9A6C;
  padding: 10px 8px;
  gap: 10px;
}
.item-daily {
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
}
.item-daily p {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--text-second);
}
.item-daily-name {
  width: 59px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-item {
  color: var(--text-second);
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
}
hr {
  width: 193px;
  height: 0px;
  border: 1px solid #CC9A6C;
  margin: 12px auto;

}
.sidebar .sidebar-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;

}
.sidebar .sidebar-item:hover {
  cursor: pointer;
  opacity: 0.8;
}
.sidebar .sidebar-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

}
.submenu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}
</style>