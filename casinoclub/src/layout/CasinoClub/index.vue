<template>
  <div class="container-fluild main">
    <Header />
    <Sidebar />
    <slot>
      <router-view />
    </slot>
    <Footer />
  </div>
</template>

<script setup>
// import Header from "@/components/Header";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import Header from "@/components/CasinoClub/Header";
import Footer from "@/components/CasinoClub/Footer";
import Sidebar from "@/components/CasinoClub/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@/css/CasinoClub/common.scss";
</script>

<style lang="scss">
.container, .row, .container-fluild {
  margin: auto;
}
</style>
