<template>
  <div class="select" placeholder="select">
    <div>123123</div>
    <div class="select-menu d-none">
      <div class="select-item">
        <div>123123123123</div>
        <div>123123123123</div>
        <div>123123123123</div>
        <div>123123123123</div>
        <div>123123123123</div>
        <div>123123123123</div>
        <div>123123123123</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.select {
  height: 35px;
  border: 1px solid;
  display: flex;
  align-items: center;
  position: relative;

  .select-menu {
    width: 100%;
    position: absolute;
    z-index: 9;
    bottom: -100px;
    background: #fff;
    height: 100px;
    overflow-y: scroll;

    .select-item {
      padding: 5px 10px;
    }
  }

  &:hover {
    .select-menu {
      display: block !important;
    }
  }
}
</style>
