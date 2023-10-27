<script setup>
import {reactive, ref} from 'vue'
import BannerPage from '@/components/G2casino/BannerPage'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import toastMessage from '@/utils/toast'
import {useStore} from 'vuex'

const store = useStore()
const payload = reactive({
    username: '',
    password: ''
})
const checked = ref(true)


const onSubmit = () => {
    console.log(payload)
    store.commit('handleLogin', {name: 'haiml', amount: 123123})
    toastMessage.success('login success !');
}
</script>

<template>
    <div class="login-container">
        <BannerPage :page="$t('login')"/>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-12">
                    <img class="banner-img" alt="banner-login" src="@/assets/G2casino/banner/banner-login.png"/>
                </div>
                <div class="col-md-6 col-12">
                    <div class="title-group">
                        <h1>
                            {{ $t('welcomeback') }}
                        </h1>
                        <p>Yawl bilge fer execution jennys dock. Gaff lass bounty o'nine rig spyglass topmast shiver
                            gabion.</p>
                    
                    </div>
                    <form @submit.prevent="onSubmit">
                        <div class="form-item">
                            <label for="username">{{ $t('email') }}</label>
                            <InputText type="text" v-model="payload.username"/>
                        </div>
                        <div class="form-item">
                            <label for="username">{{ $t('password') }}</label>
                            <Password v-model="payload.password" toggleMask :pt="{
                                panel: { class: 'panelPasswordLogin' }
                            }"/>
                        </div>
                        <div class="form-bottom d-flex justify-content-between">
                            <div>
                                <Checkbox inputId="remain-pass" v-model="checked" :binary="true"/>
                                <label for="remain-pass" class="ms-2"> {{ $t('rememberPassword') }} </label>
                            </div>
                            <router-link to="/">
                                {{ $t('forgetPassword') }}
                            </router-link>
                        </div>
                        <div class="form-item">
                            <Button type="submit" class="button">{{ $t('login') }}</Button>
                        </div>
                    </form>
                    <div class="form-bottom d-flex">
                        <p class="me-2">{{ $t('dontHaveAccount?') }}</p>
                        <router-link to="/signup">
                            {{ $t('signup') }}
                        </router-link>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    .container {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    
    .title-group {
        text-align: left;
        margin-top: 1rem;
    }
    
    .banner-img {
        max-width: 100%;
        max-height: 600px;
    }
    
    form {
        .form-item {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 1.25rem 0;
            
            input {
                width: 100%;
            }
            
            label {
                margin-bottom: 1rem;
            }
        }
    }
    
}

@media (max-width: 768px) {
    .login-container {
        .banner-img {
            max-height: 350px;
        }
    }
}
</style>

<style lang="scss">
.login-container {
    .form-item {
        .p-password {
            width: 100%;
            
            input {
                width: 100%;
                padding-right: 2.5rem;
            }
        }
        
        .button {
            background-color: var(--primaryG2Casino);
            width: 100%;
            justify-content: center;
            color: #ffffff;
        }
    }
}

.panelPasswordLogin {
    display: none;
}
</style>