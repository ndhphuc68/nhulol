<template>
    <div class="container">
        <div class="d-flex align-center justify-content-between">
            <h2>{{ $t('queryCreation') }}</h2>
            <button class="btn-query" @click="handleNavigateHelpCenter">
                <span>{{ $t('back') }}</span>
                <svg class="ml-2" fill="none" height="20" viewBox="0 0 20 20" width="20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00195 7.33301L6.41862 9.58301" stroke="black" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M4.00195 7.33333L6.41862 5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M4.83459 7.33301H12.0013C14.2513 7.33301 16.0013 9.08301 16.0013 11.1663C16.0013 13.2497 14.1679 14.9997 12.0013 14.9997"
                        stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="card">
            <div class="row">
                <div class="col-lg-6">
                    <h3 class="item-title">{{ $t('name') }}</h3>
                    <p class="item-sub">{{ $t('desNameHelp') }}</p>
                </div>
                <div class="col-lg-6">
                    <input class="item-input" type="text"/>
                </div>
                <hr/>
            </div>
            <div class="row">
                <div class="col-lg-6 ">
                    <h3 class="item-title">{{ $t('cellPhone') }}</h3>
                    <p class="item-sub">{{ $t('desCellPhone') }}</p>
                </div>
                <div class="col-lg-6 text-right">
                    <input class="item-input"/>
                </div>
                
                <hr/>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <h3 class="item-title">{{ $t('description') }}</h3>
                    <p class="item-sub">{{ $t('desHelp') }}</p>
                </div>
                <div class="col-lg-6">
                    <textarea v-model="description" class="item-input" cols="40" rows="5"
                              @input="checkCharacterCount"></textarea>
                </div>
                <hr/>
            </div>
            <div class="d-flex justify-content-end">
                <Button class="mr-2" variant="contained">
                    {{ $t('send') }}
                </Button>
                <Button>
                    {{ $t('cancel') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from 'vue'
import Button from '@/components/PlayG1/customs/Button/index.vue'
import {useRouter} from "vue-router";

const router = useRouter();
const description = ref('')

const checkCharacterCount = (event) => {
    if (description.value.length > 300) {
        description.value = description.value.slice(0, 300);
    }
}
const handleNavigateHelpCenter = () => {
    router.push('helpCenter');
}
</script>

<style lang="scss" scoped>
.title h3 {
    margin: 2rem 0;
}

.btn-query {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    
    &:hover {
        cursor: pointer;
        color: var(--primary);
        opacity: 0.8;
        transform: scale(0.97);
        
        svg path {
            stroke: var(--primary);
        }
    }
}

.card {
    padding: 32px;
    margin-top: 32px;
    
    .item-title {
        font-size: 1.25rem;
    }
    
    .item-sub {
        font-size: 0.875rem;
        color: var(--text-second);
    }
    
    .item-input {
        border-radius: 4px;
        border: 1px solid var(--neutral-200, #E4E4E7);
        padding: 12px 14px;
        width: 100%;
        outline: none;
    }
    
    
    hr {
        border: 1px solid #E4E4E7;
        margin: 48px 0;
    }
    
    
}

</style>