<script setup>
import SlotItem from '@/views/Components/GameItem'
import ListCompanies from './ListCompanies'
import {slots} from '@/views/data'
</script>

<template>
  <div>
    <ListCompanies/>
    <div class="text-right my-3 search">
      <v-text-field prepend-icon="mdi-magnify" variant="solo" :label="$t('search')"></v-text-field>
    </div>
    <v-row>
      <v-col v-for="(slot, index) in slots" :key="index" class="v-col-lg-2" cols="3">
        <SlotItem :game="slot"/>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.search {
  width: 50%
}

@media (max-width: 768px) {
  .search {
    width: 90%
  }
}
</style>