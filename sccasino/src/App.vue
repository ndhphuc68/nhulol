<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
:root {
  --primarySCCasino: #0189ff;
  --bgSCCasino: #ffffff;
  --textSCCasino: #18181b;
  --text-secondSCCasino: #7a7a7a;
}

input {
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
}

.primary-button {
  border-radius: 8px;
  background: var(--primarySCCasino);
  color: var(--bgSCCasino);
  padding: 8px 40px;
  transition: all linear 0.2s;

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
    transition: all linear 0.2s;
  }
}
</style>
