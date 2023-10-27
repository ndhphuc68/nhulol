<template>
  <div class="guide-item">
    <h4 class="title-guide">Holdem</h4>
    <div>
      <h3>{{$t('rule')}}</h3>

      <p>{{$t('holdemRule')}}</p>

      <h3>{{$t('rank')}}</h3>

      <p><img src="@/assets/gameRule/handrank.jpg" width="700" height="408"></p>
      <p>{{$t('holdemRank')}}</p>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.guide-item{
  width: 100%;
}
.title-guide {
  margin-top: 16px;
  color: var(--primary);
}
</style>