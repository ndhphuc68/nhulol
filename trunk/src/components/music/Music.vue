<template>
  <div>
  </div>
</template>
<script setup>
import { computed, watch, defineProps, onUnmounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  musicType: {
    type: String,
    default: undefined
  }
});
let audioObj = undefined;
let alarmObj = undefined;
let bgmObj = undefined;
const musics = {
  "message": require("@/assets/sound/message.mp3"),
  /*"bg1": require("@/assets/music/bg_1.mp3"),
  "b": require("@/assets/music/Banker_win.mp3"),
  "p": require("@/assets/music/player_win.mp3"),
  "tie": require("@/assets/music/tie.mp3"),
  "nomore": require("@/assets/music/no_more_bet.mp3"),
  "betStart": require("@/assets/music/betting_start.mp3"),
  "chipSound": require("@/assets/music/chip_sound.mp3"),
  "cardSound1": require("@/assets/music/card_sound.wav"),
  "cardSound2": require("@/assets/music/card_sound.wav"),
  "betConfirm": require("@/assets/music/bet_confirm.mp3"),
  "click": require("@/assets/music/click.mp3"),
  "allin": require("@/assets/music/all-in.mp3"),
  "call": require("@/assets/music/call.mp3"),
  "check": require("@/assets/music/check.mp3"),
  "raise": require("@/assets/music/raise.mp3"),
  "flop": require("@/assets/music/flop-card.mp3"),
  "turn": require("@/assets/music/trun-card.mp3"),
  "river": require("@/assets/music/river-card.mp3"),
  "showdown": require("@/assets/music/show-down.mp3"),
  "youwin": require("@/assets/music/you win.mp3"),
  "fold": require("@/assets/music/fold.mp3"),
  "timer": require("@/assets/music/alam.mp3"),
  "stop": undefined,*/
};
const selected = computed(() => props.musicType);
watch(selected, (type) => {
  if(type){
    if(type == 'stop')
    {
      alarmObj?.pause();
      alarmObj = undefined;
      return;
    }
    else
    {
      audioObj = type == 'bg1' && store.getters.getBgmObj?.volume ? store.getters.getBgmObj : new Audio(musics[type]);
      if(type == 'bg1'){
        audioObj.loop = true;
        bgmObj = audioObj;
        store.commit('setBgmObj', bgmObj);
      }
      if(type == "timer")
        alarmObj = audioObj;

      audioObj.play();
    }
  }
},{
  deep: true
});
onUnmounted(() => {
  audioObj?.pause();
  bgmObj?.pause();
  //store.commit('setBgmObj', undefined);
})
</script>