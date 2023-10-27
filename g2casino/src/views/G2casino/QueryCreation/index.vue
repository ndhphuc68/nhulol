<script setup>
import {ref} from 'vue'
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import BannerPage from "@/components/G2casino/BannerPage/index.vue";


const name = ref('');
const description = ref('');
const cellphone = ref('')

const checkCharacterCount = () => {
    console.log(description)
    if (description.value.length > 10) {
        description.value = description.value.slice(0, 10);
    }
}
</script>

<template>
    <BannerPage :page="$t('queryCreation')"/>
    <div class="container">
        <div class="title-page">
            <div>
                <div class="d-flex justify-content-between">
                    <h1>{{ $t('queryCreation') }}</h1>
                    <router-link to="help-center" class="btn-back">
                        <span> {{$t('back')}}  </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4.00195 7.33398L6.41862 9.58398" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.00195 7.33333L6.41862 5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.83496 7.33398H12.0016C14.2516 7.33398 16.0016 9.08398 16.0016 11.1673C16.0016 13.2507 14.1683 15.0007 12.0016 15.0007" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </router-link>
                </div>
                <p>{{ $t('helpCenterContent') }}</p>
            </div>
        </div>
        <div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t('name') }}</h4>
                        <p>{{ $t('desNameHelp') }}</p>
                    </div>
                
                </div>
                <div class="col-lg-6">
                    <InputText class="input" type="text" v-model="name" :placeholder="$t('name')"/>
                </div>
            </div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t('cellPhone') }}</h4>
                        <p>{{ $t('desCellPhone') }}</p>
                    </div>
                
                </div>
                <div class="col-lg-6">
                    <InputText class="input" type="text" v-model="cellphone" :placeholder="$t('phone')"/>
                </div>
            </div>
            <div class="row item-help">
                <div class="col-lg-6">
                    <div class="title-help">
                        <h4>{{ $t('description') }}</h4>
                        <p>{{ $t('desHelp') }}</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <Textarea @change="checkCharacterCount" class="input" v-model="description" autoResize row
                              item-helps="5" cols="30"
                              :placeholder="$t('description')"/>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    margin-bottom: 3rem;
    margin-top: 3rem;
    
    .title-page {
        text-align: left;
        .btn-back {
            display: flex;
            align-items: center;
            border-radius: 8px;
            border: 1px solid var(--gray-300, #D0D5DD);
            background: var(--white, #FFF);
            padding: 0 0.8rem;
            text-decoration: none;
            color: var(--textG2Casino);
            
            &:hover {
                opacity: 0.8;
            }
        }
    }
    
    .title-help {
        text-align: left;
    }
    
    .item-help {
        border-bottom: 1px solid #E4E4E7;
        padding: 2.5rem 0;
        margin-bottom: 3rem;
        
        p {
            color: var(--text-secondG2Casino)
        }
    }
}

.input {
    width: 100%
}
</style>