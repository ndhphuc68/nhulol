<template>
    <div class="wrap-profile">
        <h1>{{ $t('profile') }}</h1>
        <div class="content-profile">
            <MyInfo/>
            <BankInfo/>
        </div>
    </div>
</template>

<script setup>
import MyInfo from '@/views/PlayG1/Profile/Components/MyInfo/index.vue'
import BankInfo from '@/views/PlayG1/Profile/Components/BankInfo/index.vue'
</script>

<style lang="scss" scoped>
.wrap-profile {
    
    h1 {
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 20px;
    }
    
    .content-profile {
        display: grid;
        grid-template-columns: calc(50% - 12px) calc(50% - 12px);
        grid-gap: 24px;
    }
    
    @media (max-width: 1140px) and (min-width: 1024px) {
        .content-profile {
            grid-template-columns: 100%;
            grid-gap: 12px;
        }
        
    }
    
    @media (max-width: 768px) {
        .content-profile {
            grid-template-columns: 100%;
        }
    }
}
</style>