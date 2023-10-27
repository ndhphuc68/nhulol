<template>
  <div class="container">
    <div class="games-header">
      <div>
        <h6 class="title">{{$t("game")}}</h6>
        <h5 class="title-sub">{{$t("EDCASINOGameList")}}</h5>
      </div>
      <p class="game-description">
        Lorem ipsum dolor sit amet consectetur. Elit tincidunt nulla amet euismod malesuada amet.
      </p>
    </div>
    <div class="card-list" >
        <GameItem class="card-item" v-for="(game,index) in games" :game = "game" :key="game.id_game" @click="handleOpenGameMenu('game',index)"/>
    </div>
  </div>
</template>
<script setup>
import GameItem from './GameItem'
import {games} from '@/utils/datas'

import { useStore} from 'vuex'

const store = useStore()

  const handleOpenGameMenu = (payload,index) => {
    if(store.state.auth.auth){
      store.commit("handleUpdateTabGame",index)
      store.commit("handleToggle",payload)
    }else{
      store.commit("handleToggle",'login')
    }
  }

// const LoginAction = async () => {
//   await store.dispatch('loginAction',{
//     account: "testuser1",
//     password: "1111111"
//   })
//   }
//
//   LoginAction()

</script>
<style scoped>
.container {
  margin-top: 25px
}

.games-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.game-description {
  width: 456px;
  height: 54px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: var(--text-second);

}

.title {
  color: #CC9A6C;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
}

.title-sub {
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 55px;
  text-align: center;
  color: var(--text)
}
.card-list {
  display: flex;
  margin: 23px -20px 0 ;
  overflow: auto;
}
.card-list::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.card-item {
  width: 33.33333%;
  min-width: 313px;
}

@media (max-width: 1024px)  and (min-width: 769px){
  .container {
    margin-top: 12px;
  }
}
@media  (max-width: 768px) {
  .card-list {
    flex-wrap: wrap;
    justify-content : center;
  }
  .card-item {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 22px;
  }
  .title-sub {
    font-weight: 700;
    font-size: 24px;
  }

  .game-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
  }
  .card-list {
    margin-top: 0;
  }


}
</style>