<script setup>
import AuthGroup from '@/components/AuthGroup'
import images from "@/assets";
import banners from "@/assets/banners";
import Line from "@/views/Home/Components/Line";
import ListLive from "@/views/Home/Components/ListLive";
</script>

<template>
  <div class="container">
    <v-row>
      <v-col class="d-flex align-center v-col-md-6 v-col-lg-8" cols="12">
        <img :src="images.announcement" alt="noti" class="announcement-icon"/>
        <p class="noti">Tincidunt orci odio imperdiet lorem est. Sagittis condimentum amet egestas elementum egestas
          velit.</p>
      </v-col>
      <v-col class="d-none d-md-block v-col-md-6 v-col-lg-4" cols="4">
        <AuthGroup/>
      </v-col>
    </v-row>
    <Line>
      <img :src="images.logo" alt="logo" class="logo"/>
    </Line>
    <div class="home-item">
      <img :src="banners.banner1" alt="banner" class="home-banner"/>
    </div>
    <Line>
      <p class="home-title">DOPLAY LIVE CASINO</p>
    </Line>
    <ListLive/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.announcement-icon {
  width: 48px;
  height: 48px;
}

.noti {
  font-size: 16px;
}

.home-item {
  margin: 24px 0;
}

.home-banner {
  width: 1162px;
  height: 609px;
}

.logo {
  height: 48px;
}

.home-title {
  color: var(--primary);
  font-size: 36px;
  font-weight: 800;
}
</style>