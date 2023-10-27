<template>
  <div class="container">
    <div class="card-list" >
      <div class = "card-item card-feedback" v-for="feedback in feedbacks" :key="feedback.id">
        <img class="icon" alt = "" :src="require(`@/assets/icon/home/${feedback.image}`)"/>
        <div class="card-item-text">
          <div>
            <p class="introduce">
              {{feedback.description}}
            </p>
          </div>
          <div>
            <h6 class="name">
              {{feedback.name}}
            </h6>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>
<script setup>
import {feedbacks} from '@/utils/datas'
</script>
<style scoped>
.container {
  margin-top: 48px;
  text-align: left;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
}

.card-list {
  display: flex;
  margin-top: 32px;
  justify-content: space-between;
  padding:0 24px 24px 24px;
  align-items: center;
}
.card-item {
  width: 33.33333%;
  display: flex;
  /*margin: 0 24px;*/
  justify-content: center;
  position: relative;
}
.card-feedback:not(:last-child)::after{
  content: '';
  position: absolute;
  width: 59px;
  height: 0px;
  left:calc(90%);
  top: 50%;
  border: 1px solid #E4E4E7;
  transform: rotate(90deg);
}
.card-item-text {
  margin-left: 12px;
}
.card-item-top img{
  margin-right: 16px;
}
.name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: var(--text);
}
.introduce {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--text-second)

}
.icon {
  width: 40px;
  height: 40px;
}
</style>