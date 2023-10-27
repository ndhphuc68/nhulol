<script setup>
import LiveItem from '@/views/Components/LiveItem'
import ListCompanies from './ListCompanies'
import {lives} from '@/views/data'
</script>

<template>
  <div>
    <ListCompanies/>
    <div class="text-right my-3 search">
      <v-text-field prepend-icon="mdi-magnify" variant="solo" :label="$t('search')"></v-text-field>
    </div>
    <v-row>
      <v-col v-for="(live, index) in lives" :key="index" class="v-col-md-6 v-col-lg-4" cols="12">
        <LiveItem :hasPlayButton="true" :live="live"/>
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