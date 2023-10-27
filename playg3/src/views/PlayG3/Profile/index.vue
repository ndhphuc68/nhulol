<template>
  <section id="profile">
    <BannerPage :page="$t('profile')" />
    <Infomation />
    <div class="line" />
    <BankInfomation />
  </section>
</template>

<script setup>
import Infomation from "../Profile/Components/Infomation";
import BankInfomation from "../Profile/Components/BankInfomation";
</script>

<style scoped lang="scss">
#profile {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  .line {
    width: 100%;
    height: 1px;
    background: rgba(82, 82, 91, 1);
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .line {
      margin-bottom: 24px;
    }
  }
}
</style>
