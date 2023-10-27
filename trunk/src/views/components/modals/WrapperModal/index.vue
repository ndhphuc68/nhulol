<template>
  <div class="wrapper">
    <div>
      <div>
        <img class ="logo" src="@/assets/logo/sidebar/kcasino.png" alt ="" />
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
  .wrapper {
    width: 1128px;
    height:  734px;
  }
  .logo {
    width: 191px;
    height: 53px;
  }

</style>