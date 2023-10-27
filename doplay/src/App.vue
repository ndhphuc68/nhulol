<template>
  <v-app>
    <router-view/>
    <ModalPage/>
  </v-app>
</template>
<script>
import '@/css/common.css';
import ModalPage from '@/components/Modal/ModalPage'

export default {
  name: 'App',
  components: {ModalPage}
}
</script>

<style>
:root {
  --primary: #E180EA;
  --bg: #FFFFFF;
  --text: #18181B;
  --text-second: #A1A1AA;

  /*--bg: #18181B;*/
  /*--text:#FFFFFF;*/
  /*--text-second : #d6d6d6;*/

  --primary-light: #F3E8DD;
  --btn-w: 60em;
  --btn-hover-bg: linear-gradient(to top, #607d8d, #1c2529);
}
</style>
