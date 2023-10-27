<template>
  <div class="user-info">
    <div class="info-item">
      <h4> My page info </h4>
      <div class="details">
        <div class="detail-item" v-for="item in menus" :key="item.title">
          <p class="detail-item-title">{{item.title}}</p>
          <h4 class="detail-item-content">{{item.content}}</h4>
        </div>
      </div>
    </div>


    <div class="info-item">
      <h4> Bank Account Info </h4>
      <div class="detail-item" v-for="item in banks" :key="item.title">
        <p class="detail-item-title">{{item.title}}</p>
        <h4 class="detail-item-content">{{item.content}}</h4>
      </div>
    </div>

  </div>
</template>
<script setup>
const banks = [
  {
    title : 'bank name',
    content : 'test user 1',

  }
  ,
  {
    title : 'bank account',
    content : 'test user 1',

  },
  {
    title : 'Account Holder',
    content : 'test user 1',

  },
  {
    title : 'Total balance',
    content : 'On',

  },
]
const menus = [ {
  title : 'Id',
  content : 'test user 1',
},
  {
    title : 'Id',
    content : 'test user 1',

  }
  ,
  {
    title : 'Id',
    content : 'test user 1',

  },
  {
    title : 'Id',
    content : 'test user 1',

  },
  {
    title : 'Id',
    content : 'test user 1',
  }

]
</script>
<style scoped>
.user-info {
  margin: 16px ;
  display: flex;
}
.details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.detail-item {
  width: 50%;
  margin: 24px 0;
}
.info-item {
  border: 1px solid #E4E4E7;
  border-radius: 12px;
  padding:0 12px;
  margin: 0 12px;
}
.detail-item-title {
  font-size: 14px;
  line-height: 19px;
  color: var(--text-second);

}
.detail-item-content{
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: var(--text);
  margin-top: 4px;
}
</style>