<template>
  <RouterView />
  <!--    <ModalPage />-->
  <ModalPage />
</template>


<script>
// import ModalPage from '@/components/modal/ModalPage'
import ModalPage from "@/components/PlayG1/modal/ModalPage";

//
export default {
  name: "App",
  components: { ModalPage },
};
</script>
<style>
@font-face {
  font-family: "Inter-Black";
  src: url("@/assets/PlayG1/fonts/Inter-Black.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Inter-Bold";
  src: url("@/assets/PlayG1/fonts/Inter-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Inter-ExtraBold";
  src: url("@/assets/PlayG1/fonts/Inter-ExtraBold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Inter-ExtraLight";
  src: url("@/assets/PlayG1/fonts/Inter-ExtraLight.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Inter-Medium";
  src: url("@/assets/PlayG1/fonts/Inter-Medium.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Inter-Regular";
  src: url("@/assets/PlayG1/fonts/Inter-Regular.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Inter-SemiBold";
  src: url("@/assets/PlayG1/fonts/Inter-SemiBold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Inter-Thin";
  src: url("@/assets/PlayG1/fonts/Inter-Thin.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

:root {
  --primary: #254ee0;
  --bg: #ffffff;
  --text: #18181b;
  --text-second: #a1a1aa;
  --black: #000000;
  --neutral: #52525b;

  /*--bg: #18181B;*/
  /*--text:#FFFFFF;*/
  /*--text-second : #d6d6d6;*/

  --primary-light: #f3e8dd;
  --btn-w: 60em;
  --btn-hover-bg: linear-gradient(to top, #607d8d, #1c2529);
}
</style>