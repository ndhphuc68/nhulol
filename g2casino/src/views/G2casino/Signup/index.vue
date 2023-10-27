<script setup>
import {ref} from 'vue'
import BannerPage from '@/components/G2casino/BannerPage'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import Button from 'primevue/button';
import PickBank from './PickBank'
import {useForm} from 'vee-validate';
import toastMessage from "@/utils/toast";
import {schemaSignup} from './schema'

const {handleSubmit, useFieldModel, resetForm, errors} = useForm({validationSchema: schemaSignup});
const [email, nickname, password, confirmPassword, phone, accountHolder, bankName, bankAccount, partnerCode] = useFieldModel(['email', 'nickname', 'password', 'confirmPassword', 'phone', 'accountHolder', 'bankName', 'bankAccount', 'partnerCode']);

const isViewPickBank = ref(false);

const handleToggleViewPickBank = () => {
    isViewPickBank.value = !isViewPickBank.value;
};

const handleChangeBankName = (name) => {
    if (name) {
        bankName.value = name;
    }
};

const onSubmit = handleSubmit((values) => {
    console.log(values)
    toastMessage.success('Signup success')
    resetForm()
})

</script>

<template>
    <div class="signup-container">
        <BannerPage :page="$t('signup')"/>
        <PickBank v-if="isViewPickBank" :handle-change-bank-name="handleChangeBankName"
                  :handle-close="handleToggleViewPickBank"/>
        <div class="container">
            <form @submit.prevent="onSubmit">
                <div class="row">
                    <div class="title-group">
                        <h1>
                            {{ $t('signup') }}
                        </h1>
                        <p>Yawl bilge fer execution jennys dock. Gaff lass bounty o'nine rig spyglass topmast shiver
                            gabion.</p>
                    
                    </div>
                    <div class="col-md-6 col-12">
                        
                        <div class="form-item">
                            <label for="username">{{ $t('email') }}</label>
                            <InputText type="text" v-model="email" :class="{'p-invalid' :errors?.email}"/>
                            <small class="p-error" id="text-error">{{ errors?.email || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="username" :class="{'p-invalid' :errors?.username}">{{ $t('nickname') }}</label>
                            <InputText type="text" v-model="nickname"/>
                            <small class="p-error" id="text-error">{{ errors?.nickname || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="username" :class="{'p-invalid' :errors?.username}">{{ $t('password') }}</label>
                            <Password v-model="password" toggleMask :pt="{
                                panel: { class: 'panelPasswordLogin' }
                            }"/>
                            <small class="p-error" id="text-error">{{ errors?.password || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="confirmPassword"
                                   :class="{'p-invalid' :errors?.confirmPassword}">{{ $t('confirmPassword') }}</label>
                            <Password v-model="confirmPassword" toggleMask :pt="{
                                panel: { class: 'panelPasswordLogin' }
                            }"/>
                            <small class="p-error" id="text-error">{{ errors?.confirmPassword || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="username" :class="{'p-invalid' :errors?.phone}">{{ $t('phoneNumber') }}</label>
                            <InputText type="text" v-model="phone"/>
                            <small class="p-error" id="text-error">{{ errors?.phone || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="accountHolder"
                                   :class="{'p-invalid' :errors?.accountHolder}">{{ $t('accountHolder') }}</label>
                            <InputText type="text" v-model="accountHolder"/>
                            <small class="p-error" id="text-error">{{ errors?.accountHolder || '&nbsp;' }}</small>
                        </div>
                    
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-item" @click="handleToggleViewPickBank">
                            <label for="bankName" :class="{'p-invalid' :errors?.bankName}">{{ $t('bankName') }}</label>
                            <InputText type="text" v-model="bankName"/>
                            <small class="p-error" id="text-error">{{ errors?.bankName || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="bankAccount" :class="{'p-invalid' :errors?.bankAccount}">{{
                                    $t('bankAccount')
                                }}</label>
                            <InputText type="text" v-model="bankAccount"/>
                            <small class="p-error" id="text-error">{{ errors?.bankAccount || '&nbsp;' }}</small>
                        </div>
                        <div class="form-item">
                            <label for="partnerCode" :class="{'p-invalid' :errors?.partnerCode}">{{
                                    $t('partnerCode')
                                }}</label>
                            <InputText type="text" v-model="partnerCode"/>
                            <small class="p-error" id="text-error">{{ errors?.partnerCode || '&nbsp;' }}</small>
                        </div>
                        <div class="form-bottom d-flex">
                            <Button type="submit" class="button">{{
                                    $t('signup')
                                }}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.signup-container {
    .container {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    
    .title-group {
        text-align: left;
        margin-top: 1rem;
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

</style>

<style lang="scss">
.signup-container {
    .button {
        background-color: var(--primaryG2Casino);
        justify-content: center;
        margin-left: auto;
        color: #ffffff;
    }
    
    .form-item {
        .p-password {
            width: 100%;
            
            input {
                width: 100%;
                padding-right: 2.5rem;
            }
        }
    }
}

.panelPasswordLogin {
    display: none;
}
</style>