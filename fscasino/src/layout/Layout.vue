<template>
  <div class="container-fluid">
    <Header />
    <Navbar />
    <slot>
      <router-view />
    </slot>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
</script>

<style>
.container-fluid,
.container,
.row,
.col {
  padding: 0;
  margin: 0;
  margin: auto;
}
</style>
