<template>
  <router-view />
  <Modal />
</template>

<script setup>
import "@/css/global.css";
import Modal from "@/components/Modal";
</script>

<style lang="scss">
:root {
  --black: #000;
  --white: #fff;
  --pink: #d23449;
  --red: #d23449;
  --light-gradient: #de6777;
  --neutral-200: #e4e4e7;
  --neutral-50: #fafafa;
  --light-red: #f1c0c7;
  --black-200: #f2f2f2;
  --black-500: #a6a6a6;
  --black-600: #7a7a7a;
  --black-700: #545454;
  --neutral-300: #d4d4d8;
  --pink-100: #f9e2e5;
}

#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black);
  background: var(--white);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

button {
  border: none;
  background: transparent;
}

.primary-button {
  border-radius: 100px;
  background: #de6777;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  color: var(--white);
  padding: 8px 48px;
}

.default-button {
  border-radius: 100px;
  border: 1px solid #a6a6a6;
  background: var(--white);
  color: #a6a6a6;
  padding: 8px 48px;
}

.title-section {
  font-family: "Poppins-Bold";
  font-size: 32px;
  font-weight: 900;
  color: #545454;
  @media (max-width: 992px) {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
