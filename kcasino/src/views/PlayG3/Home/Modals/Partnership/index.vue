<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const data = computed(() => store.state.partnership.data);
</script>

<template>
  <div class="mt-3">
    <div class="top">
      <h1 class="title">{{ $t("partnership") }}</h1>
    </div>
    <div class="v-row mr-sm-10 ml-sm-10 mt-7">
      <div class="v-col-md-6">
        <div class="card-item d-flex align-center flex-row">
          <img :src="require(`@/assets/PlayG3/logo/partnership/skype.png`)" />
          <div>
            <h4 class="partner-name">Skype</h4>
            <p>
              {{ data?.SKYPE_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-md-6">
        <div class="card-item d-flex align-center flex-row">
          <img :src="require(`@/assets/PlayG3/logo/partnership/wechat.png`)" />
          <div>
            <h4 class="partner-name">Wechat</h4>
            <p>
              {{ data?.WECHAT_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-md-6">
        <div class="card-item d-flex align-center flex-row">
          <img :src="require(`@/assets/PlayG3/logo/partnership/line.png`)" />
          <div>
            <h4 class="partner-name">Line</h4>
            <p>
              {{ data?.LINE_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-md-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG3/logo/partnership/telegram.png`)"
          />
          <div>
            <h4 class="partner-name">Telegram</h4>
            <p>
              {{ data?.TELEGRAM_ID }}
            </p>
          </div>
        </div>
      </div>
      <div class="v-col-md-6">
        <div class="card-item d-flex align-center flex-row">
          <img
            :src="require(`@/assets/PlayG3/logo/partnership/kakaotalk.png`)"
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

<style scoped lang="scss">
.top {
  margin: 0 auto;
}

.title {
  font-size: 24px;
  line-height: 33px;
  color: var(--textPlayG3);
  text-align: center;
}

.card-item {
  border: 1px solid #78787a;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
  height: 90px;
  p {
    font-size: 0.7rem;
    color: var(--textSecondPlayG3);
    margin-bottom: 0;
  }
}

.card-item img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.partner-name {
  font-size: 20px;
  line-height: 27px;
  color: var(--textPlayG3);
  
  @media (max-width: 375px) {
    font-size: 16px;
  }
}
</style>
