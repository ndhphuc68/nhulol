<template>
    <section id="profile">
        <BannerPage :page="$t('profile')" />
        <Infomation />
        <div class="line" />
        <BankInfomation />
    </section>
</template>

<script setup>
import Infomation from '@/views/G2casino/Profile/Components/Infomation'
import BankInfomation from '@/views/G2casino/Profile/Components/BankInfomation'
import BannerPage from '@/components/G2casino/BannerPage'
</script>

<style scoped lang="scss">
#profile {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    .line {
        width: 100%;
        height: 1px;
        background: #E4E4E7;
        margin-bottom: 40px;
    }

    @media (max-width: 768px) {
        .line {
            margin-bottom: 24px;
        }
    }
}
</style>