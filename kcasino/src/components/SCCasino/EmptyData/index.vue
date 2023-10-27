<script setup>

</script>

<template>
  <div class="no-data-page" style="text-align: center;">
    <div>
      <img src="@/assets/icon/no-data.png" height="383" width="512" alt="nodata"/>
    </div>
    <div class="des"> {{$t('nodata')}}</div>
  </div>
</template>

<style scoped lang="scss">
.no-data-page {
  padding: 2rem 1rem;
  .des {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 600;
    margin-top: 1rem;
  }
}
</style>