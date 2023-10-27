<template>
    <div class="container mb-3 p-2">
      <div class="top">
        <h1 class="title">{{$t('partnership')}}</h1>
      </div>
      <div class="v-row mr-sm-10 ml-sm-10 mt-7">
        <div class="v-col-12 v-col-sm-6">
          <div class="card-item d-flex align-center flex-row">
            <img :src="require(`@/assets/logo/partnership/skype.png`)"/>
            <div>
              <h4 class="partner-name">
                Skype
              </h4>
              <p>
                {{ data?.SKYPE_ID }}
              </p>
            </div>
          </div>
        </div>
        <div class="v-col-12 v-col-sm-6">
          <div class="card-item d-flex align-center flex-row">
            <img :src="require(`@/assets/logo/partnership/wechat.png`)"/>
            <div>
              <h4 class="partner-name">
                Wechat
              </h4>
              <p>
                {{ data?.WECHAT_ID }}
              </p>
            </div>
          </div>
        </div>
        <div class="v-col-12 v-col-sm-6">
          <div class="card-item d-flex align-center flex-row">
            <img :src="require(`@/assets/logo/partnership/line.png`)"/>
            <div>
              <h4 class="partner-name">
                Line
              </h4>
              <p>
                {{ data?.LINE_ID }}
              </p>
            </div>
          </div>
        </div>
        <div class="v-col-12 v-col-sm-6">
          <div class="card-item d-flex align-center flex-row">
            <img :src="require(`@/assets/logo/partnership/telegram.png`)"/>
            <div>
              <h4 class="partner-name">
                Telegram
              </h4>
              <p>
                {{ data?.TELEGRAM_ID }}
              </p>
            </div>
          </div>
        </div>
        <div class="v-col-12 v-col-sm-6">
          <div class="card-item d-flex align-center flex-row">
            <img :src="require(`@/assets/logo/partnership/kakaotalk.png`)"/>
            <div>
              <h4 class="partner-name">
                Kakaotalk
              </h4>
              <p>
                {{ data?.KAKAO_TALK_ID }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from "vue";

const store = useStore()
const data = computed(() => store.state.partnership.data)

</script>

<style scoped>
.top {
  margin: 0 auto;
}
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--text);
  text-align: center;
}

.card-item {
  border: 1px solid #E4E4E7;
  border-radius: 8px;
  padding: 16px;
  height: 90px;
}

.card-item img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.sub-title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: var(--text-second);
  text-align: center;
  margin-top: 10px;
}

.partner-name {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: var(--text);
}

@media (max-width: 414px) {
  .partner-name{
    font-size: 16px;
  }

  .card-item p{
    font-size: 12px;
  }

  .card-item img{
    width: 30px;
    height: 30px;
    margin-right: 4px;
  }
}
</style>