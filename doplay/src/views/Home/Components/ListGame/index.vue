<script setup>
import GameItem from '@/views/Components/GameItem'
import {lives} from '@/views/data'
</script>

<template>
  <v-row>
    <v-col v-for="(live, index) in lives" :key="index" class="v-col-lg-2" cols="3">
      <GameItem :live="live"/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>