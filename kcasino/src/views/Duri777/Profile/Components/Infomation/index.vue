<template>
  <section id="profile-info">
    <BannerPage :page="$t('profile')" />
    <Infomation />
    <div class="line" />
    <BankInfomation />
    <div class="d-flex justify-center mt-4">
      <button class="btn-edit btn-hover" @click="$emit('handleChangeTab', 1)">
        {{ $t("edit") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import Infomation from "@/views/Duri777/Profile/Components/Infomation/MyInfo.vue";
import BankInfomation from "@/views/Duri777/Profile/Components/Infomation/BankInfo.vue";
import BannerPage from "@/components/Duri777/BannerPage";
</script>

<style scoped lang="scss">
#profile-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  .line {
    width: 100%;
    height: 1px;
    background: #e4e4e7;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .line {
      margin-bottom: 24px;
    }
  }

  .btn-edit {
    background: var(--primaryG2Casino);
    padding: 10px 30px;
    color: #fff;
    border-radius: 8px;
  }
}
</style>
