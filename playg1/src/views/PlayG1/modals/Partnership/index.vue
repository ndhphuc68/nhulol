<template>
  <div class="container">
    <div class="top">
      <h1 class="title">Partnership</h1>
      <p class="sub-title">
        Please check the wrong information or missing information.
      </p>
    </div>
    <div class="v-row mr-sm-10 ml-sm-10 mt-7">
      <div class="v-col-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG1/logo/partnership/skype.png`)"
            alt="card"
          />
          <div>
            <h4 class="partner-name">Skype</h4>
            <p>
              {{ data?.SKYPE_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG1/logo/partnership/wechat.png`)"
            alt="wechat"
          />
          <div>
            <h4 class="partner-name">Wechat</h4>
            <p>
              {{ data?.WECHAT_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG1/logo/partnership/line.png`)"
            alt="line"
          />
          <div>
            <h4 class="partner-name">Line</h4>
            <p>
              {{ data?.LINE_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG1/logo/partnership/telegram.png`)"
            alt="telegram"
          />
          <div>
            <h4 class="partner-name">Telegram</h4>
            <p>
              {{ data?.TELEGRAM_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG1/logo/partnership/kakaotalk.png`)"
            alt="kakaotalk"
          />
          <div>
            <h4 class="partner-name">Kakaotalk</h4>
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
import { useStore } from "vuex";

const store = useStore();
const data = {
  KAKAO_TALK_ID: "KAKAO_TALK_ID",
  TELEGRAM_ID: "TELEGRAM_ID",
  LINE_ID: "LINE_ID",
  WECHAT_ID: "WECHAT_ID",
  SKYPE_ID: "SKYPE_ID",
};
</script>

<style scoped>
.container {
  margin: 20px auto;
}

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
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
  height: 90px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transform: scale(0.98);
    transition: transform linear 0.3s;
  }
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

@media (max-width: 520px) {
  .partner-name {
    font-size: 16px;
  }

  p {
    font-size: 13px;
    margin-bottom: 0;
  }
}
</style>