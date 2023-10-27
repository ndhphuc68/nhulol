<script setup>
import {computed, ref} from 'vue'
import Baccarat from './components/Baccarat'
import Blackjack from './components/Blackjack'
import Roulette from './components/Roulette'
import Sicbo from './components/Sicbo'
import Dragontiger from './components/Dragontiger'
import Bullfight from './components/Bullfight'
import Mahjong from './components/Mahjong'
import Holdem from './components/Holdem'

const currentTabIdx = ref(0);
const items = [
  "Baccarat",
  "Blackjack",
  "Roulette",
  "Sicbo",
  "Dragontiger",
  "Bullfight",
  "Mahjong",
  "Holdem"
];
const contents = [Baccarat, Blackjack, Roulette, Sicbo, Dragontiger, Bullfight, Mahjong, Holdem];
const tab = computed(() => items[currentTabIdx.value]);
const content = computed(() => contents[currentTabIdx.value]);

function handleChangeTab(idx) {
  currentTabIdx.value = idx;
}
</script>

<template>
  <div class="bet-rule">
    <v-tabs
        v-model="currentTabIdx"
        bg-color="transparent"
        color="basil"
        grow
    >
      <v-tab
          v-for="(item, index) in items"
          :key="item"
          :value="item"
          @click="handleChangeTab(index)"
      >
        {{ $t(item) }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          v-for="item in items"
          :key="item"
          :value="item"
      >
        <v-card
            color="basil"
            flat
        >
          <KeepAlive>
            <component :is="content"/>
          </KeepAlive>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<style lang="scss" scoped>
.bet-rule {
  .v-btn.v-tab {
    border: 1px solid #D4D4D8;
  }

  .v-btn.v-tab--selected {
    background-color: var(--primary) !important;
    border: 1px solid var(--primary);
  }

  .text-basil {
    color: #FFFFFF !important;
  }
}

</style>