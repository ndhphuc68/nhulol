<script setup>
import LiveItem from '@/views/Components/LiveItem'
import {lives} from '@/views/data'
</script>

<template>
  <v-row>
    <v-col v-for="(live, index) in lives" :key="index" class="v-col-md-6 v-col-lg-4" cols="12">
      <LiveItem :live="live"/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>