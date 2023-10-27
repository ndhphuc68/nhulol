<template>
<div class="wrapper-alert" @click.self="props.handleClose">
  <div class="content">
      <button class="btn-close" @click="props.handleClose"></button>
    <div class="des">{{des}}</div>
    <div class="list-btn">
      <button class="btn-yes" @click="handleClickAccept">{{$t('yes')}}</button>
      <button class="btn-no" @click="props.handleClose">{{$t('no')}}</button>
    </div>
  </div>
</div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  des: String,
  handleClose:Function,
  handleAccept:Function,
  idx: Number
})

const handleClickAccept = () => {
  props.handleAccept()
  props.handleClose()
}

</script>

<style scoped>
.wrapper-alert {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.content {
  max-width: 500px;
  margin: auto;
  margin-top: 30vh;
  background: #fff;
  border-radius: 5px;
  border: 2px solid #6d6d6d;
  position: relative;
  padding: 15px;
}
.btn-close {
  position: absolute;
  top: 5px;
  right: 10px;
  padding: 10px;
}
.des {
  margin: 35px 0;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  color: red;
  text-align: center;
}
.list-btn {
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.list-btn button {
  padding: 5px 20px;
  border: 1px solid #000;
  border-radius: 5px;
}
.list-btn button:hover {
}
.btn-yes {
  margin-right: 20px;
}
</style>